#!/bin/bash
DIRECTORY="/var/www/html/api-realstate"
systemctl stop api-realstate
#[ -d "$DIRECTORY" ] && find $DIRECTORY ! -name $DIRECTORY ! -name 'appspec.yml' ! -name 'scripts' ! -name '..' ! -name '.' -type d,f -exec rm -rf {} +
