#### Protect access configuration files

You should change "settings.php" and "services.yml" access rights to read-only.

```
# chmod a-w /home/thunder/www/docroot/sites/default/settings.php
# chmod a-w /home/thunder/www/docroot/sites/default/services.yml
```

#### Enable SSL

In order to make your site more secure for your users, you should enable HTTPS access. As certificate authority, you can use [Let’s Encrypt](https://letsencrypt.org).
One of simplest ways to use it on Ubuntu 16.04 is with [Certbot](https://certbot.eff.org). Certbot will handle renewal of certificates and it will also make the necessary modifications to your Apache configuration.
