#!/bin/bash

# navigate to project folder
cd /inshout-fitOffice

# install node and npm
sudo apt-get install curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install nodejs -y
sudo apt-get install npm -y
sudo npm install -g pm2