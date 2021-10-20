#!/bin/bash

#
# BeoEarth SPA
# Copyright(c) 2009-2021, Beowurks
# Original Author: Eddie Fann
# License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
#
#

# The server port must not be 8080 as it could conflict with other Tomcat servers. Nor
# can it be 80 or 443 as it would conflict with Apache.
declare -r SERVER_PORT=8788
# The Postgres port cannot be 5432 as it could conflict with existing PostgreSQL database servers.
declare -r POSTGRES_PORT=5999

if [[ -z "${GOOGLE_KEY_DEV}" ]] || [[ -z "${GOOGLE_KEY_PROD}" ]]; then
    echo -e "GOOGLE_KEY_DEV and GOOGLE_KEY_PROD should be defined as an environmental variables.\n"

    echo -e "From https://mkyong.com/linux/how-to-set-environment-variable-in-ubuntu/"
    echo -e "sudo nano /etc/environment"
    echo -e "Add the lines"
    echo -e "\tGOOGLE_KEY_DEV=\"<value>\""
    echo -e "\tGOOGLE_KEY_PROD=\"<value>\""
    echo -e "Then save and re-login."

    exit 1
fi

declare -r GOOGLE_KEY_DEV="${GOOGLE_KEY_DEV}"
declare -r GOOGLE_KEY_PROD="${GOOGLE_KEY_PROD}"

echo -e "GOOGLE_KEY_DEV set to ${GOOGLE_KEY_DEV}"
echo -e "GOOGLE_KEY_PROD set to ${GOOGLE_KEY_PROD}"
