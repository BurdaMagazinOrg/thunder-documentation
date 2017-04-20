You can install extensions via the UI or the command line.

### UI
Modules can be installed by going to [https://example.org/admin/modules](), or by clicking on `Extend` in the menu at the top.  
Here you can search for them, by entering the name in the filter box at the top.  
To actually install a module, select the checkbox next to it, scroll to the bottom and click `Install`. You might be warned that another module needs to be enabled, because it is required for the module of your interest. By clicking on `continue`, Drupal will take care of that.

Themes can be installed by going to [https://example.org/admin/appearance](), or by clicking on `Appearance` in the menu at the top.  
Here you can scroll to the theme, you would like to install and click on `Install` to install it, or click on `Install and set as default` to use the theme for your site, after installing it.  
At the bottom of this page, you can also decide which installed theme you would like to use as admin theme.

### Command line
To install a theme or module at the command line, you need to have [drush](http://www.drush.org/en/master/) installed.  
The command to install a module or theme is:
```terminal
$ drush en [extension]
```  
To use a theme, you still have to either set it as default or use it as admin theme.
