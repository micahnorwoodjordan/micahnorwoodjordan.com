set -e  # fail on first error

apt update

apt install -y unzip nginx

# install node and npm dependencies

# https://stackoverflow.com/questions/35206723/cant-use-nvm-from-bash-script
. ~/.nvm/nvm.sh
. ~/.profile
nvm install 23.9.0 && nvm alias default 23.9.0

# clone repo and install artifacts
# git clone https://github.com/micahnorwoodjordan/micahnorwoodjordan.com.git

cd micahnorwoodjordan.com/micahnorwoodjordan.com/public


# build app
cd
npm install -g @angular/cli@19.2.1
cd micahnorwoodjordan.com/micahnorwoodjordan.com/ && npm install
yes n | ng build --configuration production
cp /root/micahnorwoodjordan.com/micahnorwoodjordan.com/dist/micahnorwoodjordan.com/browser/* /usr/share/nginx/html

# restart nginx
cp /root/micahnorwoodjordan.com/micahnorwoodjordan.com/nginx.conf /etc/nginx/nginx.conf
systemctl stop nginx
systemctl start nginx

echo "deployment complete"
