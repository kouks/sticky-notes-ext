
const Store = {
  /**
   * @var {string} type - The store type to be used
   */
  type: 'sync',

  /**
   * Retrieves a value from the storage.
   *
   * @param {string} key - The key to be retrieved
   * @return {Promise} - Resolved upon retrieval
   */
  get (key) {
    return new Promise((resolve) => {
      chrome.storage[this.type].get(key, val => resolve(val[key]))
    })
  },

  /**
   * Saves a value on the storage.
   *
   * @param {string} key - The key to be set
   * @param {string} value - The value to be set
   * @return {Promise} - After writing is done
   */
  set (key, value) {
    return new Promise((resolve) => {
      chrome.storage[this.type].set({ [key]: value }, () => resolve())
    })
  },

  /**
   * Sets the type of store to be used.
   *
   * @private
   * @param {string} type - The store type
   * @returns {self} - This object reference
   */
  _type (type) {
    this.type = type

    return this
  }
}

export default {
  /**
   * @var {Store} sync - The sync store driver
   */
  sync: Object.assign({}, Store._type('sync')),

  /**
   * @var {Store} local - The local store driver
   */
  local: Object.assign({}, Store._type('local'))
}
