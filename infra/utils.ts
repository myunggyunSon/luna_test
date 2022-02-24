export const renameKey = (obj, oldKey, newKey) => {
  obj[newKey] = obj[oldKey]
}

export const addKey = (obj, key) => {
  obj['key'] = key
}

export enum TaxBillStatus {
  MATCHING = 0,
  NOT_RECEIVED = 1,
  ADJUST_REQUEST = 2,
}
