#### Configure Apache server

We need to enable several modules required by Apache to fulfill all requirements for site. Execution of the following command should enable all required modules:

```
# sudo a2enmod rewrite ssl fastcgi proxy_fcgi
```

After that ```php-fpm``` configuration should be enabled for Apache and restart of ```apache2``` service has to be made in order to apply of configuration changes for it.
```
# sudo a2enconf php7.0-fpm
# sudo service apache2 restart
```

#### Configure MySQL database

Start MySQL client to execute SQL statements required for installation of Thunder.

```
# sudo mysql -u root -p
```

Following SQL statement should be executed to create a database that will be used by Thunder:

```
mysql> CREATE DATABASE thunder;
```

For next command you have to specify a password for your user, so replace ```[PASSWORD]``` with the password you want:
```
mysql> CREATE USER 'thunder'@'localhost' IDENTIFIED BY '[PASSWORD]';
```

To grant all access rights required for proper site functioning, following statement should be executed.
```
mysql> GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, CREATE TEMPORARY TABLES ON thunder.* TO 'thunder'@'localhost';
```

Since all required configuration is finished, you can exit MySQL client by typing ```exit```. With that MySQL database configuration requirements are changed.

#### Configure PHP

It would be also nice to additionally tweak OPcache configuration for PHP FPM service. You should open OPcache configuration file:
```
# sudo vi /etc/php/7.0/fpm/conf.d/10-opcache.ini
```

And add following configuration at end of it:
```
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=4000
opcache.revalidate_freq=60
opcache.fast_shutdown=1
```

After all configuration changes are done for PHP FPM service, we should restart ```php7.0-fpm``` service:
```
# sudo service php7.0-fpm restart
```