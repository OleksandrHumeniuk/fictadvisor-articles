---
title: How to create article with Markdown
author: ALEGATOR1209
---

[FictAdvisor](https://fictadvisor.com) is capable to parse, process and display Markdown code. 

# 1. Creating article file

All articles must be stored in the `articles` folder of this repository.
No nested directories are allowed as they will be ignored during the build.

File name must be concise, unique (within `articles` folder) and end with `.md` marking that it's a Markdown file.

Be careful when choosing filename because it will be used as a _path to the article_ (with `.md` ending trimmed).

# 2. Metadata

At the start of the file a _metadata section_ should be placed. That's where article title and authors are.
Format of the metadata section is following:
```
---
title: Article Title
authors: Article Authors
---
```

# 3. Content

Content of the article can be written according to the general [Markdown rules](https://www.markdownguide.org/basic-syntax/). But there are a few moments to mention:

* Inserting images or links, the full URL must be provided. For now, articles builder ignores files, placed in `articles` directory, that do not end with `.md`, `.html` or are not special `__HIDDEN__` and `__CHOSEN__` files. Therefore, media files must be uploaded to the external hosting (e.g. [Imgur](https://imgur.com/)). Same applied when linking other Fict Advisor pages, URL path must be full.
* Article can be enriched with custom HTML to include some special formatting or styling.
* Anchors to the headers are not supported for now. 

# 4. Page management

All articles are listed at the `https://fictadvisor.com/articles`. Two special files are present to alter this behavior.

Article can be included into the featured articles list that is displayed at the Fict Advisor front page by including it into `__CHOSEN__` file.

Articles, included in the `__HIDDEN__` file aren't displayed at the `/articles` page, but still can be accessed with the direct link. It's useful for drafts.

In both cases, you should include articles in both files using it's pathname (filename without extension) separated by the line break. For example, to list articles in files `sample1.html` and `sample2.md` as featured, you should add following lines to the `__CHOSEN__` file:

```
sample1
sample2
```
