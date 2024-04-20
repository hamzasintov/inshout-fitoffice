#!/bin/bash

# navigate to project folder
cd /home/ubuntu/inshout-fitOffice

# To stop already running project
pm2 stop inshout-fitOffice

pm2 delete inshout-fitOffice

# for project start
pm2 start --name inshout-fitOffice npm -- start