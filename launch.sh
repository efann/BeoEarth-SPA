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

pushd ./containers/postgresql

POSTGRES_USER=$1
POSTGRES_PASS=$2
POSTGRES_DBNAME=$3
ENV_FILE=../config/.env

cp ../config/.env-template "${ENV_FILE}"

sed -i "s/<user>/${POSTGRES_USER}/g" "${ENV_FILE}"
sed -i "s/<password>/${POSTGRES_PASS}/g" "${ENV_FILE}"
sed -i "s/<database>/${POSTGRES_DBNAME}/g" "${ENV_FILE}"

# From https://stackoverflow.com/questions/48495663/docker-compose-env-file-not-working
# It appears env_file is ignored when you add environment after it.
cp "${ENV_FILE}" .env

echo "Postgres User: ${POSTGRES_USER}"
echo "Postgres Password: ${POSTGRES_PASS}"
echo "Postgres Database: ${POSTGRES_DBNAME}"

sudo docker stop postgis
sudo docker rm postgis

sudo docker volume prune -f

sudo docker-compose -v

echo "docker build"
sudo docker-compose build --force-rm

echo "docker up"
sudo docker-compose up -d

sudo docker-compose logs -t

popd

sudo docker exec -it postgis bash