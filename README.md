# README.md file for BeoEarth SPA

###Setup for Linode Server
####Installations
####Setup Java 11
* add-apt-repository ppa:openjdk-r/ppa \
  _add the OpenJDK repository if not already done._
* apt update
* change-java-version 8
* change-java-version 11

####Install Maven
* apt purge maven*
* wget https://www-us.apache.org/dist/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz -P /tmp \
  _Download maven 3.6.3_  
* sudo tar xf /tmp/apache-maven-*.tar.gz -C /opt \
  _Untar downloaded file to /opt_
* sudo update-alternatives --install /usr/bin/mvn mvn /opt/apache-maven-3.6.3/bin/mvn 363 \
  _Install the alternative version for the mvn in your system_  
* sudo update-alternatives --config mvn \
  _Check if your configuration is ok. You may use your current or the 3.6.3 whenever you wish, running the command below._

####Install NPM
_From https://github.com/nodesource/distributions/blob/master/README.md#debinstall_
* curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
* apt install -y nodejs

####Install Git
* apt install git

####Installing Docker
_From https://phoenixnap.com/kb/how-to-install-docker-on-ubuntu-18-04_
* apt purge docker docker-engine docker.io
* apt install docker.io
* systemctl start docker
* systemctl enable docker

####Installing Docker Compose
_Don’t use apt install docker-compose as the package installed won’t be the latest and has issues. For example,
docker-compose -v_\
_docker-compose version 1.8.0, build unknown docker-compose version 1.8.0, build unknown_ \
_For reference: https://docs.docker.com/compose/install/ and click on Linux tab._
* curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
* chmod +x /usr/local/bin/docker-compose

####Setup for Apache
_You will need to enable reverse proxy for Apache_
* a2enmod proxy
* a2enmod proxy_http
* systemctl restart apache2