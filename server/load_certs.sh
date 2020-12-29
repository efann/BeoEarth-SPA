#!/bin/bash

#
# BeoEarth SPA
# Copyright(c) 2009-2020, Beowurks
# Original Author: Eddie Fann
# License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
#
#

CERT_TMP_DIR="certificates.tmp"
TOMCAT_DIR="/usr/local/tomcat/conf"

# From https://medium.com/@raupach/how-to-install-lets-encrypt-with-tomcat-3db8a469e3d2

# Copy the certificates if they exist.
if [ -d "${CERT_TMP_DIR}" ]; then

  cp -v "${CERT_TMP_DIR}/cert.pem" "${TOMCAT_DIR}/cert.pem"
  cp -v  "${CERT_TMP_DIR}/chain.pem" "${TOMCAT_DIR}/chain.pem"
  cp -v  "${CERT_TMP_DIR}/privkey.pem" "${TOMCAT_DIR}/privkey.pem"

  cp -v "${CERT_TMP_DIR}/server.xml" "${TOMCAT_DIR}/server.xml"
else
  echo -e "${CERT_TMP_DIR} does not exist, so skipping."
fi
