


/**
 * Create slug
 * @param {*} name 
 * @returns slug
 */


export const createSlug = (name) => { 
return name.split(" ").join("-").toLowerCase();
}

