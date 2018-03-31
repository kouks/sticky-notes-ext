import Comms from '@/common/comms/Client'
import NoteBuilder from '@/content/core/NoteBuilder'
import NoteRenderer from '@/content/core/NoteRenderer'

Comms.listen('content')

/*
 * This listener is triggered upon the extension form submission.
 */
Comms.on('create-note', ({ request }) => {
  // Calls the note builder to fake create the note element to determine the
  // note positioning.
  NoteBuilder.create(request)
    .then(note => Comms.send('background/save-note', note))
    .then(() => Comms.send('background/load-notes'))
    .then(notes => Comms.send('content/render-notes', notes))
})

/**
 * Listener that takes notes from the background script and render them on the
 * page.
 */
Comms.on('render-notes', ({ request }) => {
  NoteRenderer.flush()

  request.forEach(note => NoteRenderer.render(note))
})

/**
 * Send message to background about that we want to get all notes for the
 * domain.
 */
Comms.send('background/load-notes')
  .then(notes => Comms.send('content/render-notes', notes))
