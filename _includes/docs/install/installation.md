We will use thunder project scaffold for installing thunder distribution.

You can create Thunder project with the following command:
```
# composer create-project burdamagazinorg/thunder-project ~/www
```
That will create ```www``` folder in the home directory of thunder user and that will be the directory for the site.

Also, all required libraries and modules will be fetched and it will also create "docroot" directory.
That directory will be used as docroot directory for site and it has to be added in Apache configuration for site.

We will create new Apache configuration for site. As a starting point, we will use existing default configuration provided with Apache installation. To do that execute following commands:

```
# sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/thunder-install-docs.conf
# sudo ln -s /etc/apache2/sites-available/thunder-install-docs.conf /etc/apache2/sites-enabled/thunder-install-docs.conf
```

Now configuration adjustment is required. You can open configuration file with your favorite editor (vi, nano, etc.).
Ensure that you need root rights for that. In this documentation, we will use most common editor ```vi```.

```
# sudo vi /etc/apache2/sites-available/thunder-install-docs.conf
```

You can edit configuration as it suits your system and need or you can use full configuration provided here:
```
<VirtualHost *:80>
        ServerName thunder-install-docs.org
        ServerAlias *.thunder-install-docs.org

        ServerAdmin info@thunder-install-docs.org
        DocumentRoot /home/thunder/www/docroot

        ErrorLog ${APACHE_LOG_DIR}/thunder-install-docs-error.log
        CustomLog ${APACHE_LOG_DIR}/thunder-install-docs-access.log combined

        <Directory "/home/thunder/www/docroot">
                Options FollowSymLinks
                AllowOverride All
                Require all granted
        </Directory>
</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
```

After configuration changes Apache restart is required:

```
# sudo service apache2 restart
```

Now when you open your site page ```www.thunder-install-docs.org``` it should start the installation of Thunder.
For that process, you can take look at [Thunder installation video tutorial](https://youtu.be/7iNKJIMTcMI?t=125) provided on [ThunderCMS YouTube channel](https://www.youtube.com/channel/UCCHCG7B6EQG2wUeiOVLVzPA). One exception to the video tutorial is that you have to provide MySQL database name (thunder) and credentials that you have set at creation of MySQL user.

After you have finished installation of Thunder, still few changes should be made.
