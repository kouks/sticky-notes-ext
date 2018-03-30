
export default {
  /**
   * @var {Object} ports - All the comm ports sorted by a url key
   */
  ports: {},

  /**
   * Initialize the server. Note that the server acts as a client also.
   *
   * @returns {void}
   */
  init () {
    chrome.extension.onConnect.addListener((port) => {
      this.ports[port.sender.url] = port

      port.onMessage.addListener((message) => {
        Object.values(this.ports).forEach(port => port.postMessage(message))
      })
    })
  }
}
