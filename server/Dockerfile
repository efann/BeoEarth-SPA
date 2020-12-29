# Read https://medium.com/@zhao.li/how-to-understand-building-images-with-docker-compose-24cbdbc0641f
# on creating an image that uses the Dockerfile
FROM library/tomcat:9.0.36-jdk11

WORKDIR /scripts
COPY load_certs.sh .
COPY settings/server.ssl.xml .

RUN chmod +x load_certs.sh
RUN ./load_certs.sh
