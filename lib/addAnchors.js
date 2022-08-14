import {parse} from 'node-html-parser/dist/nodes/html.js';
import slug from './slug.js';

function addAnchors(html) {
  const root = parse(html);

  [
    root.querySelectorAll('h1'),
    root.querySelectorAll('h2'),
    root.querySelectorAll('h3'),
    root.querySelectorAll('h4'),
    root.querySelectorAll('h5'),
    root.querySelectorAll('h6'),
  ].flat().forEach((h) => {
    const anchor = slug(h.text);
    h.setAttribute('id', anchor);
  });

  return root.toString();
}

export default addAnchors;
