import Server from './Server'

/**
 * The client comms object inherits functions from the server, overriding only
 * the init function.
 */
export default Object.assign(Server, {
  /**
   * Initialize the client.
   *
   * @param {string} name - The client name
   * @returns {void}
   */
  init (name) {
    this.name = name
    this.port = chrome.extension.connect({ name: 'comms' })

    this.port.onMessage.addListener((message) => {
      if (message.recipient === this.name) {
        this._dispatch(message)
      }
    })
  }
})
