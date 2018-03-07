
var note = document.createElement('textarea')
var div = document.createElement('div')
var body = document.querySelector('body')
var creating = false
var startY = 0
var startX = 0

window.onload = function () {
  div.innerText = 'asad'
  div.style.position = 'fixed'
  div.style.width = '100%'
  div.style.height = '100%'
  div.style.background = 'rgba(0, 0, 0, .3)'
  div.style.zIndex = 1000
  div.style.top = 0
  body.appendChild(div)

  div.addEventListener('mousedown', test)
  div.addEventListener('mousemove', test2)
  div.addEventListener('mouseup', test3)
}

function test (e) {
  note.style.position = 'fixed'
  note.style.background = 'white'
  note.style.top = e.clientY + 'px'
  note.style.left = e.clientX + 'px'
  note.style.zIndex = 1001
  startY = e.clientY
  startX = e.clientX
  creating = true
  body.appendChild(note)
}

function test2 (e) {
  if (! creating) return;
  note.style.width = (e.clientX - startX) + 'px'
  note.style.height = (e.clientY - startY) + 'px'
}

function test3 (e) {
  creating = false
}
