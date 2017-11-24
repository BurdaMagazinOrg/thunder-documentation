Writing tests is essential for high-quality software. Everyone has to understand that writing test saves time and money in the long run.


#### Writing a new feature

Best practice for developing a new feature is to start with the implementation of the tests. For each acceptance criteria in a user-story, implement some tests which covers them. If all the tests succeed you can be confident that your feature works like expected.


#### Resolving an issue

Before resolving an issue, implement a test which covers this issue. After that, resolve the issue until all failing tests are fixed.


#### Large codebase, but no tests.

If you have an existing project but no tests, don’t worry, you can easily start. Write tests while resolving issues and your test coverage will grow with every bug.


#### Choose the right testing-framework

For high-level integration tests we recommend to write test in Behat. But Behat is not always a good decision. Maybe you want to test an API or a small part of code then PHPUnit is the better choice. So think about it before start writing the tests.
