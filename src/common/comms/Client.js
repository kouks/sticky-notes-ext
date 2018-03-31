
export default {
  /**
   * @var {Object} listeners - The listeners object.
   */
  listeners: {},

  /**
   * @var {string} name - The server name.
   */
  name: null,

  /**
   * Initialize the server.
   *
   * @returns {void}
   */
  listen (name) {
    this.name = name

    chrome.runtime.onMessage.addListener((request, sender, respond) => {
      if (request.recipient === this.name) {
        this._dispatch(request, respond)
      }
    })
  },

  /**
   * Sends a new message to a provided recipient.
   *
   * @param {string} destination - The destination
   * @param {Object} payload - The payload to be sent
   * @returns {Promise} - The callback promise
   */
  send (destination, payload) {
    let [recipient, event] = destination.split('/')

    return new Promise((resolve) => {
      this._resolveDestination({ recipient, event, payload }, resolve)
    })
  },

  /**
   * Assign a listener to provided event.
   *
   * @param {string} event - The event name
   * @param {function} listener - The listener to be invoked
   * @returns {void}
   */
  on (event, listener) {
    if (this.listeners[event] === undefined) {
      this.listeners[event] = [listener]

      return
    }

    this.listeners[event].push(listener)
  },

  /**
   * Resolves the destination.
   *
   * @private
   * @param {Object} request - The request to be dispatched
   * @param {function} respond - The response callback
   * @returns {void}
   */
  _resolveDestination (request, respond) {
    switch (request.recipient) {
      case this.name:
        this._dispatch(request, respond)
        break;

      case 'background':
      case 'popup':
        this._sendToExtension(request, respond)
        break

      case 'content':
        this._sendToActiveTab(request, respond)
    }
  },

  /**
   * Sends an event the extension.
   *
   * @private
   * @param {Object} request - The request to be dispatched
   * @param {function} respond - The response callback
   * @returns {void}
   */
  _sendToExtension (request, respond) {
    chrome.extension.sendMessage(request, res => respond(res))
  },

  /**
   * Sends an event to an active tab.
   *
   * @private
   * @param {Object} request - The request to be dispatched
   * @param {function} respond - The response callback
   * @returns {void}
   */
  _sendToActiveTab (request, respond) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs.pop().id, request, res => respond(res))
    })
  },

  /**
   * Dispatches an event.
   *
   * @private
   * @param {Object} request - The request to be dispatched
   * @param {function} respond - The response callback
   * @returns {void}
   */
  _dispatch (request, respond) {
    for (let key in this.listeners) {
      if (key !== request.event) {
        continue
      }

      this.listeners[key].forEach(listener => listener({ request: request.payload, respond }))
    }
  }
}
