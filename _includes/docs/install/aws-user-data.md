Here is one example for setup of AWS EC2 Ubuntu 16.04 instance. Script provided here can be copy/pasted in User Data during creation of EC2 instance and it will execute and create everything for you.
After Instance is up and running, it's sufficient just to open the site in the browser and start with the installation process.

There are only three parameters that should be adjusted: ```MYSQL_ROOT_PASSWORD```, ```MYSQL_THUNDER_PASSWORD``` and ```SITE_DOMAIN```.
```
#!/bin/bash
#
# AWS EC2 Instance User Data Script

# You have to fill MySQL root password and MySQL "thunder" user password
# Avoid quotes/apostrophes in the password, but do use lowercase + uppercase + numbers + special chars
MYSQL_ROOT_PASSWORD='?'
MYSQL_THUNDER_PASSWORD='?'

# Also Site Domain should be adjusted
SITE_DOMAIN='thunder-install-docs.org'

# Create required user
adduser --gecos "" --disabled-password thunder
usermod -aG sudo thunder

# Install required Ubuntu packages
echo debconf mysql-server/root_password password $MYSQL_ROOT_PASSWORD | sudo debconf-set-selections
echo debconf mysql-server/root_password_again password $MYSQL_ROOT_PASSWORD | sudo debconf-set-selections

apt-get update
apt-get install apache2 mysql-server mysql-client php libapache2-mod-fastcgi php-fpm php-mcrypt php-mysql php-gd php-mbstring php-curl php-zip php-xml php-opcache php-apcu nodejs nodejs-legacy npm git sendmail expect -y

# Secure MySQL
expect -f - <<-EOF
  set timeout 10
  spawn mysql_secure_installation
  expect "Would you like to setup VALIDATE PASSWORD plugin?"
  send -- "y\r"
  expect "Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG:"
  send -- "1\r"
  expect "New password:"
  send -- "$MYSQL_ROOT_PASSWORD\r"
  expect "Re-enter new password:"
  send -- "$MYSQL_ROOT_PASSWORD\r"
  expect "Do you wish to continue with the password provided?"
  send -- "y\r"
  expect "Remove anonymous users?"
  send -- "y\r"
  expect "Disallow root login remotely?"
  send -- "y\r"
  expect "Remove test database and access to it?"
  send -- "y\r"
  expect "Reload privilege tables now?"
  send -- "y\r"
  expect eof
EOF

# Sandmail setup
expect -f - <<-EOF
  set timeout 10
  spawn sendmailconfig
  expect "Configure sendmail with the existing /etc/mail/sendmail.conf?"
  send -- "y\r"  
  expect "Configure sendmail with the existing /etc/mail/sendmail.mc?"
  send -- "y\r"
  expect "Reload the running sendmail now with the new configuration?"
  send -- "y\r"
  expect eof
EOF

# Setup Apache
sudo a2enmod rewrite ssl actions fastcgi alias
sudo a2enconf php7.0-fpm

cat <<EOF >> /etc/apache2/conf-available/php7.0-fpm.conf

<IfModule mod_fastcgi.c> 
   AddHandler php7-fcgi .php 
   Action php7-fcgi /php7-fcgi 
   Alias /php7-fcgi /usr/lib/cgi-bin/php7-fcgi 
   FastCgiExternalServer /usr/lib/cgi-bin/php7-fcgi -socket /run/php/php7.0-fpm.sock -pass-header Authorization -idle-timeout 3600 
   <Directory /usr/lib/cgi-bin> 
       Require all granted 
   </Directory> 
    <FilesMatch ".+\.ph(p[345]?|t|tml)$"> 
        SetHandler php7-fcgi 
    </FilesMatch> 
</IfModule>
EOF

service apache2 restart

# Setup MySQL
mysql -e "CREATE DATABASE thunder;" -u root --password=$MYSQL_ROOT_PASSWORD
mysql -e "CREATE USER 'thunder'@'localhost' IDENTIFIED BY '$MYSQL_THUNDER_PASSWORD';" -u root --password=$MYSQL_ROOT_PASSWORD
mysql -e "GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, CREATE TEMPORARY TABLES ON thunder.* TO 'thunder'@'localhost';" -u root --password=$MYSQL_ROOT_PASSWORD

# Setup PHP-FPM

cat <<EOF >> /etc/php/7.0/fpm/conf.d/10-opcache.ini

opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=4000
opcache.revalidate_freq=60
opcache.fast_shutdown=1
EOF

service php7.0-fpm restart

# Install Composer and Thundre as "thunder" user
su - -c "php -r \"copy('https://getcomposer.org/installer', 'composer-setup.php');\" && php composer-setup.php && php -r \"unlink('composer-setup.php');\"" thunder
su - -c "mkdir ~/bin && mv ./composer.phar ~/bin/composer" thunder
su - -c "composer global require drush/drush && echo 'PATH=\"\$HOME/.composer/vendor/bin:\$PATH\"' >> ~/.profile" thunder
su - -c "composer create-project burdamagazinorg/thunder-project ~/www --no-interaction --quiet" thunder

# Add Virtual Host to Apache
# Add Virtual Host for 
cat <<EOF >> /etc/apache2/sites-available/$SITE_DOMAIN.conf

<VirtualHost *:80>
        ServerName $SITE_DOMAIN
        ServerAlias *.$SITE_DOMAIN

        ServerAdmin info@$SITE_DOMAIN
        DocumentRoot /home/thunder/www/docroot

        ErrorLog \${APACHE_LOG_DIR}/$SITE_DOMAIN-error.log
        CustomLog \${APACHE_LOG_DIR}/$SITE_DOMAIN-access.log combined

        <Directory "/home/thunder/www/docroot">
                Options FollowSymLinks
                AllowOverride All
                Require all granted
        </Directory>
</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
EOF

ln -s /etc/apache2/sites-available/$SITE_DOMAIN.conf /etc/apache2/sites-enabled/$SITE_DOMAIN.conf

service apache2 restart

# End
```

You still have to execute post installation actions.
