#!/bin/bash

#
# BeoEarth SPA
# Copyright(c) 2009-2020, Beowurks
# Original Author: Eddie Fann
# License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
#
#

if [[ $EUID -eq 0 ]]; then
  echo -e "\nThis script may not be run as root. Exiting. . . .\n\n"
  exit 1
fi

# From https://stackoverflow.com/questions/3976362/bash-scripts-requiring-sudo-password
# Force asking for the password, so you don't have to wait till running the below external scripts.
if [[ ! $(sudo echo 0) ]]; then
  echo -e "sudo password was not correct. Exiting. . . .\n\n"
  exit
fi

if [ $# -eq 0 ]; then
  echo -e "\n============================================================================================="
  echo -e "Example usage:"
  echo -e "  ./launch.sh <database> <password>"
  echo -e "This will generate a database with a username of the same name and the password parameter."
  echo -e "=============================================================================================\n"
  exit
fi

POSTGRES_USER=$1
POSTGRES_PASS=$2
POSTGRES_DBNAME=${POSTGRES_USER}
CONFIG_DIR="./containers/config"
ENV_FILE=".env"

# From https://stackoverflow.com/questions/48546124/what-is-linux-equivalent-of-host-docker-internal
POSTGIS_ADDRESS=$(ip addr show | grep "\binet\b.*\bscope global dynamic\b" | awk '{print $2}' | cut -d '/' -f 1)

# ------------------------------------------------
# Config
pushd "${CONFIG_DIR}"
echo -e "\n====================================================================================="
echo -e "Building Config files"
echo "Current folder is $(pwd)\n"

cp -v .env-template "${ENV_FILE}"

sed -i "s/<user>/${POSTGRES_USER}/g" "${ENV_FILE}"
sed -i "s/<password>/${POSTGRES_PASS}/g" "${ENV_FILE}"
sed -i "s/<database>/${POSTGRES_DBNAME}/g" "${ENV_FILE}"
sed -i "s/<postgis_address>/${POSTGIS_ADDRESS}/g" "${ENV_FILE}"

popd

echo -e "Current folder is $(pwd)"

# From https://stackoverflow.com/questions/48495663/docker-compose-env-file-not-working
# It appears env_file is ignored when you add environment after it.
cp -v "${CONFIG_DIR}/${ENV_FILE}" ./containers/postgresql
cp -v "${CONFIG_DIR}/${ENV_FILE}" ./server

# Test Properties need to have actual values as there are no environment variables set.
# The testing is not run in a container. I could set environment variables in .bashrc,
# but that would prevent the flexibility of passing parameters to this script.
echo -e "Generating test properties"
TEST_PROPERTIES=./server/src/test/resources/application.properties
cp -v ./server/src/main/resources/application.properties ${TEST_PROPERTIES}

sed -i "s/\${POSTGIS_ADDRESS}/${POSTGIS_ADDRESS}/g" "${TEST_PROPERTIES}"
sed -i "s/\${POSTGRES_DBNAME}/${POSTGRES_DBNAME}/g" "${TEST_PROPERTIES}"
sed -i "s/\${POSTGRES_USER}/${POSTGRES_USER}/g" "${TEST_PROPERTIES}"
sed -i "s/\${POSTGRES_PASS}/${POSTGRES_PASS}/g" "${TEST_PROPERTIES}"

# ------------------------------------------------
# Stop & remove all
echo -e "\n====================================================================================="
echo -e "Stopping & removing all containers & volumes"
echo -e "Current folder is $(pwd)\n"

sudo docker stop postgis
sudo docker rm postgis
sudo docker stop tomcat-gis
sudo docker rm tomcat-gis

sudo docker volume prune -f

# ------------------------------------------------
# PostGIS Container
echo -e "\n====================================================================================="
echo -e "Generating PostGIS Container"

pushd ./containers/postgresql
echo "Current folder is $(pwd)"

echo "Postgres User: ${POSTGRES_USER}"
echo "Postgres Password: ${POSTGRES_PASS}"
echo "Postgres Database: ${POSTGRES_DBNAME}"
echo "IP Address: ${POSTGIS_ADDRESS}"

sudo docker-compose build
sudo docker-compose up -d

# sudo docker-compose logs -t

popd

# ------------------------------------------------
# Tomcat Container
echo -e "\n====================================================================================="
echo -e "Generating Tomcat Container"

pushd ./server
echo "Current folder is $(pwd)"

mvn clean install
sudo docker-compose up -d

popd
# ------------------------------------------------

# sudo docker exec -it tomcat bash
