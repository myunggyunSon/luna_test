export const renameKey = (obj, oldKey, newKey) => {
  obj[newKey] = obj[oldKey]
}

export const addKey = (obj, key) => {
  obj['key'] = key
}
