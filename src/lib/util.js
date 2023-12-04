/**
 * @param {string} text
 */
export function slugify(text) {
  text = text.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  text = text.toLowerCase(); // convert string to lowercase
  text = text
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return text;
}
