* Generally speaking, code has to adhere to the drupal coding standards:
 * [https://www.drupal.org/coding-standards]()
 * IDE’s like PhpStorm include predefined schemes for drupal.
* Write documentation for all functions according to [https://www.drupal.org/node/1354#functions]() especially document all parameters.
* Additional to the given technical naming conventions for variables and functions, variables and functions should have “good” speaking names.
* Configuration variables should never be hardcoded. They should be exposed as administrative forms and saved as drupal config settings.
* Use drupal 8 concepts instead of drupalisms of earlier versions. Use new APIs like configuration, services, plugins and events where appropriate. Whenever a function is implemented in the .module file double check if there is not a new way to do it.
* Never use `\Drupal::` in object oriented contexts, always inject services instead.
* Avoid the use of deprecated methods, have a look at comments of deprecated methods, to find out what should be used instead.
* Source code must be written in plain english.
 * All variable names, function names and comments must be in english
 * Text strings must be translatable and in english
 * Configs must be exported with langcode en
