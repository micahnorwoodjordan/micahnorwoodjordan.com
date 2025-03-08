#!/usr/bin/bash

set -e  # fail on 1st error

apt install -y nginx

cd /root/micahnorwoodjordan.com/api.micahnorwoodjordan.com && ./mvnw spring-boot:run

cp /root/micahnorwoodjordan.com/api.micahnorwoodjordan.com/nginx.conf /etc/nginx/nginx.conf
systemctl stop nginx
systemctl start nginx


# i accidentally installed the wron java version: https://www.reddit.com/r/javahelp/comments/10bjzn0/i_installed_the_latest_version_of_java_but_when_i/

# FIND ALL JAVA INSTALLATIONS
# find /usr -name java -executable -not -type d -not -type l -ls

# TEMPORARILY SET CORRECT JAVA VERSION (DOES NOT PERSIST THROUG SHELL INSTANCES)
# export PATH=/usr/lib/jvm/java-17-openjdk-amd64/bin:$PATH