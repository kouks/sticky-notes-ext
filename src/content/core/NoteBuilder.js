
export default {
  /**
   * @var {Node} cover - The cover element
   */
  cover: document.createElement('div'),

  /**
   * @var {Node} note - The note element
   */
  note: document.createElement('div'),

  /**
   * @var {bool} creating - Determines if the note is now being created
   */
  creating: false,

  /**
   * @var {function} resolve - Resolves the promise
   */
  resolve: null,

  /**
   * @var {Object} data - The data passed from the form
   */
  data: {},

  /**
   * @var {int} top - The top offset
   */
  top: 0,

  /**
   * @var {int} left - The left offset
   */
  left: 0,

  /**
   * @var {int} width - The note width
   */
  width: 0,

  /**
   * @var {int} height - The note height
   */
  height: 0,

  /**
   * Begins the note creation.
   *
   * @param {Object} data - The data passed from the form
   * @returns {Promise} - Resolved after creation is finished
   */
  create (data) {
    this.data = data

    this.createCover()
    this.createNote()
    this.listenForMouseEvents()

    return new Promise((resolve) => {
      this.resolve = resolve
    })
  },

  /**
   * Creates the cover element.
   *
   * @returns {void}
   */
  createCover () {
    this.cover.style.position = 'fixed'
    this.cover.style.top = 0
    this.cover.style.left = 0
    this.cover.style.width = '100%'
    this.cover.style.height = '100%'
    this.cover.style.background = 'rgba(0, 0, 0, 0.6)'
    this.cover.style.zIndex = 1000

    document.querySelector('body').appendChild(this.cover)
  },

  /**
   * Creates the note element.
   *
   * @returns {void}
   */
  createNote () {
    this.note.style.backgroundColor = this.data.backgroundColor
    this.note.style.color = this.data.color
    this.note.style.position = 'absolute'
    this.note.style.display = 'none'
    this.note.innerText = this.data.body

    this.cover.appendChild(this.note)
  },

  /**
   * Assigns listeners to mouse events.
   *
   * @returns {void}
   */
  listenForMouseEvents () {
    this.cover.onmousedown = e => this.mouseDown(e)
    this.cover.onmousemove = e => this.mouseMove(e)
    this.cover.onmouseup = e => this.mouseUp(e)
  },

  /**
   * The mouse down event listener.
   *
   * @param {Event} e - The event data
   * @returns {void}
   */
  mouseDown (e) {
    this.creating = true

    this.note.style.display = 'block'

    this.note.style.left = (this.left = e.clientX) + 'px'
    this.note.style.top = (this.top = e.clientY) + 'px'
  },

  /**
   * The mouse move event listener.
   *
   * @param {Event} e - The event data
   * @returns {void}
   */
  mouseMove (e) {
    if (! this.creating) {
      return
    }

    this.width = e.clientX - this.left
    this.height = e.clientY - this.top

    this.note.style.width = this.width + 'px'
    this.note.style.height = this.height + 'px'
  },

  /**
   * The mouse up event listener.
   *
   * @returns {void}
   */
  mouseUp () {
    this.creating = false

    this.resolve({
      body: this.data.body,
      styles: {
        position: 'absolute',
        backgroundColor: this.data.backgroundColor,
        color: this.data.color,
        left: this.left + 'px',
        top: this.top + 'px',
        width: this.width + 'px',
        height: this.height + 'px',
        zIndex: 1000
      }
    })

    this.cover.remove()
  }
}
