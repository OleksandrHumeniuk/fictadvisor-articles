---
title: How to create article with Markdown
author: ALEGATOR1209
---

[FictAdvisor](https://fictadvisor.com) is capable to parse, process and display 
Markdown code. 

# 1. Creating article file

All articles must be stored in the `articles` folder of this repository.
No nested directories are allowed as they will be ignored during the build.

File name must be concise, unique (within `articles` folder) and end with `.md` marking that it's a Markdown file.

Be careful when choosing filename because it will be used as a path to the article (with `.md` ending trimmed).

# 2. Metadata

At the start of the file a _metadata section_ should be placed. That's where article title and authors are.
Format of the metadata section is following:
```
---
title: Article Title
authors: Article Authors
---
```
