Depending on, whether you have a composer, command-line, drush-make or UI based workflow, the method of downloading themes and modules differs.

### Composer
Composer is a package manager for PHP and is the future standard for managing the dependencies of your Drupal 8 site and extensions. Go to the [Drupal documentation](https://www.drupal.org/docs/develop/using-composer/using-composer-with-drupal) for more information.

If you have composer installed, go to the root of your site (there should be a `composer.json` file) and install modules by typing
```terminal
$ composer require drupal/[shortname of module]
```
into the command line.

For example:

```terminal
$ composer require drupal/entity_browser
```

You can also specify a version constraint here. Again refer to the [Drupal documentation about that topic](https://www.drupal.org/node/2718229#adding-modules) to learn more.

### Command line
To install extensions via the command line, without using composer, you need to have [drush](http://www.drush.org/en/master/) installed. With this tool, you can manage your site in different ways, e.g. importing/exporting database dumps, updating translations, clearing the cache and also downloading and enabling modules or themes.

The command to download an extension is
```terminal
$ drush dl [extension]
```
which will download the latest recommended release for your Drupal version.

For example:
```terminal
$ drush dl entity_browser
```

Execute
```terminal
$ drush help dl
```
for all available options.

### Drush make
The drush-make workflow was the most used one, which involved not checking in all your dependencies into your repository,
but downloading them in the deployment process. It is now replaced by composer and is regarded deprecated.

### UI
You can also install modules and themes via the UI, but we _strongly_ advise against that.
If you are still insisting, here is how to do that:

First you have to enable the `Update Manager` module by going to the `Extend` page, selecting the checkbox near it and clicking on `Install` at the bottom of the page. Then go to
[https://example.org/admin/modules/install]().  
Here you can either paste a URL to an archival file on drupal.org, or browse your computer to select one.
After clicking on install, the module will be downloaded and installed.
