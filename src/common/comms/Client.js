import Server from './Server'

/**
 * The client comms object inherits functions from the server, overriding only
 * the init function.
 */
export default Object.assign(Object.assign({}, Server), {
  /**
   * @var {Port} port - The chrome messaging port
   */
  port: null,

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
  },

  /**
   * Sends a new message to a provided recipient.
   *
   * @param {string} destination - The destination
   * @param {Object} payload - The payload to be sent
   * @returns {void}
   */
  send (destination, payload) {
    let [recipient, event] = destination.split('/')

    this.port.postMessage({ recipient, event, payload })
  },
})
