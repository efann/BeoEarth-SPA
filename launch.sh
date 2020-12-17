#!/bin/bash

if [[ $EUID -eq 0 ]]
then
  echo -e "\nThis script may not be run as root. Exiting. . . .\n\n"
  exit 1
fi

# From https://stackoverflow.com/questions/3976362/bash-scripts-requiring-sudo-password
# Force asking for the password, so you don't have to wait till running the below external scripts.
if [[ ! $(sudo echo 0) ]]; then
  echo -e "sudo password was not correct. Exiting. . . .\n\n"
  exit;
fi

POSTGRES_USER=$1
POSTGRES_PASS=$2
POSTGRES_DBNAME=${POSTGRES_USER}
CONFIG_DIR="./containers/config"
ENV_FILE=".env"

# ------------------------------------------------
# Stop & remove all
echo "Current folder is $(pwd)"

sudo docker stop postgis
sudo docker rm postgis
sudo docker stop tomcat
sudo docker rm tomcat

sudo docker volume prune -f

# ------------------------------------------------
# Config
pushd "${CONFIG_DIR}"
echo "Current folder is $(pwd)"

cp -v .env-template "${ENV_FILE}"

sed -i "s/<user>/${POSTGRES_USER}/g" "${ENV_FILE}"
sed -i "s/<password>/${POSTGRES_PASS}/g" "${ENV_FILE}"
sed -i "s/<database>/${POSTGRES_DBNAME}/g" "${ENV_FILE}"

popd

echo "Current folder is $(pwd)"

# From https://stackoverflow.com/questions/48495663/docker-compose-env-file-not-working
# It appears env_file is ignored when you add environment after it.
cp -v "${CONFIG_DIR}/${ENV_FILE}" ./containers/postgresql
cp -v "${CONFIG_DIR}/${ENV_FILE}" ./server

# ------------------------------------------------
# PostGIS Container
pushd ./containers/postgresql
echo "Current folder is $(pwd)"

echo "Postgres User: ${POSTGRES_USER}"
echo "Postgres Password: ${POSTGRES_PASS}"
echo "Postgres Database: ${POSTGRES_DBNAME}"

sudo docker-compose build
sudo docker-compose up -d

# sudo docker-compose logs -t

popd

# ------------------------------------------------
# Tomcat Container

pushd ./server
echo "Current folder is $(pwd)"

mvn clean install
sudo docker-compose up -d

popd
# ------------------------------------------------

# sudo docker exec -it tomcat bash