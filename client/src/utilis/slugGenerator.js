/**
 * Create slug
 * @param {*} name
 * @returns slug
 */

export const slugGenerator = (name) => {
  return name.split(" ").join("-").toLowerCase();
};

