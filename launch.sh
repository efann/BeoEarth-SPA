#!/bin/bash

#
# BeoEarth SPA
# Copyright(c) 2009-2021, Beowurks
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

if [ $# -ne 2 ]; then
  echo -e "\n============================================================================================="
  echo -e "Example usage:"
  echo -e "  ./launch.sh <database> <password>"
  echo -e "This will generate a database with a username of the same name using the password parameter."
  echo -e "In addition, this script will set the external access ports for the server and database."
  echo -e "=============================================================================================\n"
  exit
fi

declare -r POSTGRES_USER=$1
declare -r POSTGRES_PASS=$2

declare -r POSTGRES_DBNAME=${POSTGRES_USER}

# Load variables from launch.bash
source launch.bash || exit 1

declare -r CONFIG_DIR="./containers/config"
declare -r ENV_FILE=".env"
declare -r APACHE_SITES_DIR="/etc/apache2/sites-available"

# Apache files
declare -r CONF_FILE_DEV="000-default.conf"
declare -r CONF_FILE_PROD="beoearth-spa.com-le-ssl.conf"
declare -r CONF_FILE_TEST="fannenterprises.com-le-ssl.conf"

declare -r VAR_FILES_DEV="/var/www/local/public_html/"
declare -r VAR_FILES_PROD="/var/www/beoearth-spa.com/public_html/"

CONF_FILE="${CONF_FILE_DEV}"
VAR_FILES="${VAR_FILES_DEV}"
PROD_MODE=false
# If the CONF_FILE_TEST exists, then we're running on the production server
if [ -f "${APACHE_SITES_DIR}/${CONF_FILE_TEST}" ]; then
  CONF_FILE="${CONF_FILE_PROD}"
  VAR_FILES="${VAR_FILES_PROD}"

  PROD_MODE=true
fi

# From https://stackoverflow.com/questions/48546124/what-is-linux-equivalent-of-host-docker-internal
declare -r HOST_IP_ADDRESS=$(hostname -I | awk '{print $1;}')

# Turns out, that I can use localhost rather than the ip address for Apache Web Server.
# Which makes sense as it's running on the same system and not inside a container.
declare -r HOST_IP_FOR_APACHE='localhost'

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
sed -i "s/<host_ip_address>/${HOST_IP_ADDRESS}/g" "${ENV_FILE}"
sed -i "s/<server_port>/${SERVER_PORT}/g" "${ENV_FILE}"
sed -i "s/<postgres_port>/${POSTGRES_PORT}/g" "${ENV_FILE}"

APP_VERSION=$(date +%Y).0.0.$(git rev-list --all --count)
sed -i "s/<react_app_version>/${APP_VERSION}/g" "${ENV_FILE}"

if [ ${PROD_MODE} = "true" ]; then
  sed -i "s/<react_app_map_key>/${GOOGLE_KEY_PROD}/g" "${ENV_FILE}"
else
  sed -i "s/<react_app_map_key>/${GOOGLE_KEY_DEV}/g" "${ENV_FILE}"
fi

popd

echo -e "Current folder is $(pwd)"

# From https://stackoverflow.com/questions/48495663/docker-compose-env-file-not-working
# It appears env_file is ignored when you add environment after it.
cp -v "${CONFIG_DIR}/${ENV_FILE}" ./containers/postgresql
cp -v "${CONFIG_DIR}/${ENV_FILE}" ./server
cp -v "${CONFIG_DIR}/${ENV_FILE}" ./client

# Test Properties need to have actual values as there are no environment variables set.
# The testing is not run in a container. I could set environment variables in .bashrc,
# but that would prevent the flexibility of passing parameters to this script.
echo -e "Generating test properties"
TEST_PROPERTIES=./server/src/test/resources/application.properties
cp -v ./server/src/main/resources/application.properties ${TEST_PROPERTIES}

sed -i "s/\${HOST_IP_ADDRESS}/${HOST_IP_ADDRESS}/g" "${TEST_PROPERTIES}"
sed -i "s/\${POSTGRES_DBNAME}/${POSTGRES_DBNAME}/g" "${TEST_PROPERTIES}"
sed -i "s/\${POSTGRES_USER}/${POSTGRES_USER}/g" "${TEST_PROPERTIES}"
sed -i "s/\${POSTGRES_PASS}/${POSTGRES_PASS}/g" "${TEST_PROPERTIES}"
sed -i "s/\${POSTGRES_PORT}/${POSTGRES_PORT}/g" "${TEST_PROPERTIES}"

echo -e "Using ${CONF_FILE} to copy to ${APACHE_SITES_DIR}"

APACHE_CONF="${APACHE_SITES_DIR}/${CONF_FILE}"
sudo cp -v "./containers/apache/${CONF_FILE}" "${APACHE_CONF}"

sudo sed -i "s/<host_ip_address>/${HOST_IP_FOR_APACHE}/g" "${APACHE_CONF}"
sudo sed -i "s/<server_port>/${SERVER_PORT}/g" "${APACHE_CONF}"

sudo a2dissite ${CONF_FILE}
sudo a2ensite ${CONF_FILE}

if [ ${PROD_MODE} = "true" ]; then
  sudo a2dissite beoearth.com-le-ssl.conf
fi

sudo systemctl restart apache2

# ------------------------------------------------
# Stop & remove all
echo -e "\n====================================================================================="
echo -e "Stopping & removing all containers & volumes"
echo -e "Current folder is $(pwd)\n"

sudo docker stop beoearth-postgres
sudo docker rm beoearth-postgres
sudo docker stop beoearth-server
sudo docker rm beoearth-server

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
echo "Host IP Address: ${HOST_IP_ADDRESS}"
echo "External Port: ${POSTGRES_PORT}"

sudo docker-compose build
sudo docker-compose up -d

popd

# ------------------------------------------------
# Tomcat Container
echo -e "\n====================================================================================="
echo -e "Generating Tomcat Container"

pushd ./server
echo "Current folder is $(pwd)"

mvn clean install

sudo docker-compose build
sudo docker-compose up -d

popd
# sudo docker exec -it beoearth-server bash
# ------------------------------------------------

# ------------------------------------------------
# React Client
echo -e "\n====================================================================================="
echo -e "Generating React Client"

pushd ./client
echo "Current folder is $(pwd)"

echo "You will get warnings about fsevents, which is only relevant if you're on Mac OSX."
echo "Don't run npm install -f as npm ask if you know what you're doing (I don't)."
echo "Reference https://stackoverflow.com/questions/40226745/npm-warn-notsup-skipping-optional-dependency-unsupported-platform-for-fsevents"
npm install

BUILD_FILES='./build'

echo "Removing ${BUILD_FILES}. . . ."
rm -rfv "${BUILD_FILES}"

# You only want to remove the files, not the folder itself
echo "Removing ${VAR_FILES}*. . . ."
# Read the comments below on the asterisk.
sudo rm -rfv "${VAR_FILES}"*

npm run build

# Copy the files under build to the VAR_FILES folder
echo "Running cp -R ${BUILD_FILES}/* ${VAR_FILES}. . . ."

# Weird: the * needs to be outside of the quotes
# https://stackoverflow.com/questions/34254164/what-is-cp-cannot-stat-error-in-unix-i-get-this-error-when-trying-to-copy-thin/51239548
sudo cp -R "${BUILD_FILES}"/* "${VAR_FILES}"

echo "Getting the stats for ${VAR_FILES}"
lcOwner=$(stat -c '%U' "${VAR_FILES}")
lcGroup=$(stat -c '%G' "${VAR_FILES}")

echo "Running chown -R ${lcOwner}:${lcGroup} ${VAR_FILES}"
sudo chown -R "${lcOwner}":"${lcGroup}" "${VAR_FILES}"

popd
