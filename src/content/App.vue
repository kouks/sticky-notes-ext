<template>
  <div class="sticky-notes-app">
    <note
      v-for="note in notes"
      :key="note.id"
      :data="note"
    />

    <builder
      v-show="builder.active"
      :data="builder.data"
      @done="saveNote"
    />
  </div>
</template>

<script>
import Comms from '@/common/comms/Client'
import Note from '@/content/components/Note'
import Builder from '@/content/components/Builder'

export default {
  components: { Note, Builder },

  data () {
    return {
      notes: [],

      builder: {
        active: false,
        data: {}
      }
    }
  },

  mounted () {
    this.listenForNoteBuilding()
    this.listenForNoteRendering()
  },

  methods: {
    /*
     * We listen for any event that requires this component to re-render notes.
     */
    listenForNoteRendering () {
      Comms.on('render-notes', ({ request }) => {
        this.notes = request
      })
    },

    /*
     * We listen for the popup form submission and start creating a new note.
     */
    listenForNoteBuilding () {
      Comms.on('create-note', ({ request }) => {
        this.builder.active = true
        this.builder.data = request
      })
    },

    /*
     * Upon finishing creation of the note, save it on the database and refresh
     * all notes.
     */
    saveNote (note) {
      this.builder.active = false

      Comms.send('background/save-note', note)
        .then(() => Comms.send('background/load-notes'))
        .then(notes => Comms.send('content/render-notes', notes))
    }
  }
}
</script>
