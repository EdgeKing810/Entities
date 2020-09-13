#!/bin/bash

git pull origin master
npm i
npm run-script build
cp /var/www/kinesis.games/build/favicon.ico build/
chown -R root:www-data .
systemctl reload apache2
