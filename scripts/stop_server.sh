#!/bin/bash
DIRECTORY="/var/www/html/api-orbita"
systemctl stop api-orbita
#[ -d "$DIRECTORY" ] && find $DIRECTORY ! -name $DIRECTORY ! -name 'appspec.yml' ! -name 'scripts' ! -name '..' ! -name '.' -type d,f -exec rm -rf {} +
