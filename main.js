import build from './lib/build.js';

const META_FILES = [
  '__CHOSEN__',
  '__HIDDEN__',
];

(async () => {
  await build('./articles', './build', META_FILES);
})();
