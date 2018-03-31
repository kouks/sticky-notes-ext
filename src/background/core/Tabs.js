
export default {
  /**
   * Eetrieves the current tab.
   *
   * @returns {Promise} - To be resolved upon retrieval
   */
  getActive () {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => resolve(tabs.pop()))
    })
  }
}
