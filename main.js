import * as fs from "fs";
import matter from "gray-matter";
import { unified } from "unified";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";

const META_FILES = [
  '__CHOSEN__',
  '__HIDDEN__',
]

async function build(inputDir, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const file of fs.readdirSync(inputDir)) {
    await processFile(`${inputDir}/${file}`, outputDir)
  }
}

async function processFile(file, outputDir) {
  if (file.endsWith('.md')) await processMarkdown(file, outputDir);
  if (file.endsWith('.html')) await processHtml(file, outputDir);
  await processMetaFile(file, outputDir);
}

async function processMarkdown(file, outputDir) {
  const link = getFileLink(file, '.md');
  const content = fs.readFileSync(file).toString()

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

  fs.writeFileSync(`${outputDir}/${link}.html`, html);
}

async function processHtml(file, outputDir) {
  const link = getFileLink(file, '.html');
  fs.copyFileSync(file, `${outputDir}/${link}.html`);
}

async function processMetaFile(file, outputDir) {
  const filename = getFileLink(file, '')
    .substring(1) // curring the leading slash

  if (!META_FILES.includes(filename)) return;

  fs.copyFileSync(file, `${outputDir}/${filename}`);
}

function getFileLink(path, type) {
  const lastSlash = path.lastIndexOf('/');
  const linkStart = lastSlash === -1 ? 0 : lastSlash
  const linkEnd = path.length - type.length;

  return path.substring(linkStart, linkEnd);
}

(async () => {
  await build('./articles', './build')
})();
