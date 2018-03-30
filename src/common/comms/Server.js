
export default {
  /**
   * @var {Object} listeners - The listeners object
   */
  listeners: {},

  /**
   * @var {string} name - The name
   */
  name: '',

  /**
   * @var {Object} ports - All the comm ports sorted by a url key
   */
  ports: {},

  /**
   * Initialize the server. Note that the server acts as a client also.
   *
   * @param {string} name - The server name
   * @returns {void}
   */
  init (name) {
    this.name = name

    chrome.extension.onConnect.addListener((port) => {
      console.log(port, 'Asdasd')
      port.postMessage({ recipient: 'background', event: 'test', payload: 'testasdasddas' })
      this.ports[port.sender.url] = port

      port.onMessage.addListener((message) => {
        if (message.recipient === this.name) {
          return this._dispatch(message)
        }

        Object.values(this.ports).forEach(port => port.postMessage(message))
      })
    })
  },

  /**
   * Assign a listener to provided event.
   *
   * @param {string} name - The server name
   * @param {function} callback - The callback to be invoked
   * @returns {void}
   */
  on (event, callback) {
    if (this.listeners[event] === undefined) {
      return this.listeners[event] = [callback]
    }

    this.listeners[event].push(callback)
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

    Object.values(this.ports).forEach(port => port.postMessage({ recipient, event, payload }))
  },

  /**
   * Dispatches an event.
   *
   * @private
   * @param {Object} message - The message to be dispatched
   * @returns {void}
   */
  _dispatch (message) {
    for (let key in this.listeners) {
      if (key !== message.event) {
        continue;
      }

      this.listeners[key].forEach(listener => listener(message.payload))
    }
  }
}
