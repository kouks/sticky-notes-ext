
export default {
  notes: [],
  elements: [],

  flush () {
    this.notes = []
    this.elements.forEach(el => el.remove())
  },

  render (note) {
    this.notes.push(note)

    this.createNoteElement(note)
  },

  createNoteElement (note) {
    let el = document.createElement('div')
    let styles = JSON.parse(note.styles)

    el.innerText = note.body

    for (let key in styles) {
      el.style[key] = styles[key]
    }

    document.querySelector('body').appendChild(el)
    this.elements.push(el)
  }
}
