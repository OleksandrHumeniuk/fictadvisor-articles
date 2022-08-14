import { readFile, writeFile } from "fs/promises";
import addAnchors from "./addAnchors.js";

async function postProcess(file) {
    const content = (await readFile(file)).toString();
    const html = addAnchors(content);
    await writeFile(file, html);
}

export default postProcess;
