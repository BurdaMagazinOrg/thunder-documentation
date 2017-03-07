# Coding Guidelines


## Basic rules


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


## Developing new features with Git

Development of new features should take place in a feature branch of the module in question. After development is complete, a pull-request has to be opened, which needs to be peer-reviewed and merged by **another person**.

If you want to develop for Thunder-owned module, please fork the github repository and open a pull-request for the feature or bugfix. It will then be peer-reviewed and merged by a team member of the repository.


## Drupal versioning

Versioning has to follow the drupal versioning specification:
[https://www.drupal.org/documentation/version-info/numbers]()

If changes are introduced, which could break existing installations, e.g. by breaking the API, removing significant functionalities, or rewriting the module, a new major version has to be released.


## Tests

Writing tests is essential for high-quality software. Everyone has to understand that writing test saves time and money in the long run.


#### Writing a new feature

Best practice for developing a new feature is to start with the implementation of the tests. For each acceptance criteria in a user-story, implement some tests which covers them. If all the tests succeed you can be confident that your feature works like expected.  


#### Resolving an issue

Before resolving an issue, implement a test which covers this issue. After that, resolve the issue until all failing tests are fixed.


#### Large codebase, but no tests.

If you have an existing project but no tests, don’t worry, you can easily start. Write tests while resolving issues and your test coverage will grow with every bug.


#### Choose the right testing-framework

For high-level integration tests we recommend to write test in Behat. But Behat is not always a good decision. Maybe you want to test an API or a small part of code then PHPUnit is the better choice. So think about it before start writing the tests.
