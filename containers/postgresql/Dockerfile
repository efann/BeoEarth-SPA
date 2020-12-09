# Read https://medium.com/@zhao.li/how-to-understand-building-images-with-docker-compose-24cbdbc0641f
# on creating an image that uses the Dockerfile
FROM kartoza/postgis:12.1

# By the way, from https://hub.docker.com/r/kartoza/postgis/,
# the geocalc.sql will be run against the first database listed in POSTGRES_DBNAME
# It states POSTGRES_DB, but if you look at the scripts under /scripts, it's POSTGRES_DBNAME

# Cause in /scripts/env-data.sh
# Compatibility with official postgres variable
# Official postgres variable gets priority
#if [ -n "${POSTGRES_DB}" ]; then
#	POSTGRES_DBNAME=${POSTGRES_DB}
#fi
