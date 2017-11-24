#### Install AMP (Apache, MySQL and PHP) and more

First, available packages should be fetched with an execution of the following command:

```
# sudo apt-get update
```

#### 1. Web Server

We have used Apache2 server because it's widely used for Drupal sites and also Drupal provides some additional security features only for Apache.
Apache can be installed with the following command:

```
# sudo apt-get install apache2 -y
```

#### 2. Database

Recommended database for Drupal sites is [MySQL](https://www.mysql.com) or an equivalent such as MariaDB or Percona Server.
Since MySQL is most known and widely used database, it will be used also in this documentation and it can be easily installed with the following command:

```
# sudo apt-get install mysql-server mysql-client -y
```

The installation process will require to type-in the password for the database root user. It's suggested to set a strong password,
but also a connection to the MySQL server should be limited only from localhost.

To ensure that MySQL server is properly secured it's advised to execute following command and follow instructions:
```
# sudo mysql_secure_installation
```

#### 3. PHP with required libraries

Next step is to install PHP with all required libraries.
Since we are using latest LTS release of Ubuntu, it comes with PHP 7.0 and that's also the recommended PHP version for Thunder since it has a way better performance compared to older version of PHP (version 5.6).

To install PHP and all required libraries you can execute the following command:
```
# sudo apt-get install php libapache2-mod-fastcgi php-fpm php-mcrypt php-mysql php-gd php-mbstring php-curl php-zip php-xml php-opcache php-apcu -y
```

#### 4. Composer and NodeJS

Composer is used for downloading of project and installation of it. It's a tool for dependency management in PHP. It allows you to declare project dependencies and it will manage (install/update) them.

To install Composer you can read [installation instructions here](https://getcomposer.org/download).
The Composer executable will be fetched in the directory where the installation process is executed, but it would be better to set it in the ```bin``` directory of the user, so that we have that command in the console.

In order to do that, execute following commands:

```
# mkdir ~/bin
# mv ./composer.phar ~/bin/composer
```

By default ```~/bin``` should be defined in your PATH environment variable and composer command should be available after that.
You can verify that by executing:

```
# composer list
```

Additional requirements are NodeJS and ```npm``` command. It's needed for deploying several JavaScript libraries used by Thunder to the correct place.
The ```bower``` is used for that. To install NodeJS on your system, following command can be executed:

```
# sudo apt-get install nodejs nodejs-legacy npm -y
```

#### 5. Git

It's common for Linux operating systems to come with ```git``` already installed. You can verify it with executing the following command:

```
# git --version
```

If the ```git``` command is not available you can install it by executing the following command:

```
# sudo apt-get install git -y
```

#### 6. Drush (optional)

We also recommend installing the ```drush``` command globally for your user, since this command is used for manipulation of Drupal projects and it has very handy tools.

Since Composer is available on the system, installation of drush command globally for the user can easily be done. With following command you will install drush command:
```
# composer global require drush/drush
```

To make all globally installed composer commands available in the console, a path to global composer bin directory has to be added into the PATH environment variable.
You can achieve that with the following command:
```
# export PATH="$HOME/.composer/vendor/bin:$PATH"
```

In order to make global composer commands available next time you log-in, global composer bin path has to be added to PATH environment variable in user's profile file. It can be achieved by executing the following command:
```
# echo 'PATH="$HOME/.composer/vendor/bin:$PATH"' >> ~/.profile
```

To ensure drush command works as expected in the console you can execute the following command:

```
# drush help
```

#### 7. Sendmail (optional)

Your site should be able to send e-mails. In order to do that, an SMTP server is required. The most common SMTP server on Linux based operating systems is ```sendmail```.
To install it, following commands should be executed and instructions followed:

```
# sudo apt-get install sendmail
# sudo sendmailconfig
```

By default, ```sendmail``` allows connections only from localhost and that should be sufficient for your site. You should take care that your SMTP server cannot be misused.
