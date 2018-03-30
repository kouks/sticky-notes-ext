
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

    chrome.runtime.onMessage.addListener((request, sender, respond) => {
      console.log(request, sender, respond)

      respond('asd')
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

    chrome.runtime.sendMessage({ recipient, event, payload }, (response) => {
      console.log(response);
    });
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
