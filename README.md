# Thunder documentation

## Contributing to the documentation
The documentation is structured, so that it automatically aggregates documentation files and builds the sidebar nav.

New Pages should be placed into the root (or a new subdirectory in root).
- If it should have aggregated documentation and sidebarnav, a new file has to be created in the `_data` directory.
  - For its content, please refer to the other files there.
- In your new page, add "FrontMatter"

```
---
title: Documentation
slug: docs
description: "Technical documentation"
---
```

- and provide following snippet

```
{% assign items=site.data[page.slug] %}
{% include page-with-sidebar.html items=items %}
```

- Now every include you specified in your `_data` file (which are located in `_includes`) will be included in your new page

## Working with the Documentation locally

1. install Bundler and Jekyll with `gem install jekyll bundler`
2. Install dependencies with `bundle install`
3. Execute jekyll server with `bundle exec jekyll serve`

For more information on Github-Pages, see: https://help.github.com/categories/github-pages-basics/

For more information about Jekyll, see: https://jekyllrb.com/docs/home/
