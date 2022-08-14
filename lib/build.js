import {readdir, mkdir, access} from 'fs/promises';
import processFile from './process.js';

async function build(inputDir, outputDir, metaFiles) {
  try {
    await access(outputDir);
  } catch (e) {
    await mkdir(outputDir);
  }

  for (const file of await readdir(inputDir)) {
    await processFile(`${inputDir}/${file}`, outputDir, metaFiles);
  }
}

export default build;
