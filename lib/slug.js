import slugify from 'slugify';

function slug(text) {
  return slugify(text);
}

export default slug;
