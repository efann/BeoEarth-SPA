#!/bin/bash

#
# BeoEarth SPA
# Copyright(c) 2009-2021, Beowurks
# Original Author: Eddie Fann
# License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
#
#

npm run build
pushd build

sudo rm -rf /var/www/local/public_html/*
sudo cp -R * /var/www/local/public_html/

popd
