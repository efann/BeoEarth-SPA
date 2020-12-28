# README.md file for BeoEarth SPA

###Setup for Linode Server
####Installations
Setup Java 11
* add-apt-repository ppa:openjdk-r/ppa \
  _add the OpenJDK repository if not already done._
* apt update
* change-java-version 8
* change-java-version 11

Install Maven
* apt install mvn

Install Git
* apt install git

Installing Docker \
_From https://phoenixnap.com/kb/how-to-install-docker-on-ubuntu-18-04_
* apt purge docker docker-engine docker.io
* apt install docker.io
* systemctl start docker
* systemctl enable docker

Installing Docker Compose \
_Don’t use apt install docker-compose as the package installed won’t be the latest and has issues. For example,
docker-compose -v_\
_docker-compose version 1.8.0, build unknown docker-compose version 1.8.0, build unknown_ \
_For reference: https://docs.docker.com/compose/install/ and click on Linux tab._
* curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
* chmod +x /usr/local/bin/docker-compose


