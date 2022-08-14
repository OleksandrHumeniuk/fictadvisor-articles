import { readFile, writeFile, copyFile } from "fs/promises";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import getFileLink from "./getFileLink.js";
import postProcess from "./postProcess.js";

async function processFile(file, outputDir, metaFiles) {
    if (file.endsWith('.md')) await processMarkdownFile(file, outputDir);
    if (file.endsWith('.html')) await processHtmlFile(file, outputDir);
    await processMetaFile(file, outputDir, metaFiles);
}

async function processMarkdownFile(file, outputDir) {
    const link = getFileLink(file, '.md');
    const content = (await readFile(file)).toString();

    const { data, content: article } = matter(content);
    const serialized = String(
        await unified()
            .use(remarkParse)
            .use(remarkHtml)
            .process(article)
    )

    const html = `<html>
      <head>
          <title>${data.title}</title>
          <comment>${data.author}</comment>
      </head>
      <body>
          ${serialized}
      </body>
  </html>`;

    const destFile = `${outputDir}/${link}.html`;
    await writeFile(destFile, html);
    await postProcess(destFile);
}

async function processHtmlFile(file, outputDir) {
    const link = getFileLink(file, '.html');
    const destFile = `${outputDir}/${link}.html`;
    await copyFile(file, destFile);
    await postProcess(destFile);
}

async function processMetaFile(file, outputDir, metaFiles) {
    const filename = getFileLink(file, '')
        .substring(1) // the leading slash

    if (!metaFiles.includes(filename)) return;

    await copyFile(file, `${outputDir}/${filename}`);
}

export default processFile;
