<template>
  <div class="app-container">
    <aside :style="style" class="app-notification is-success">
      <span>
        <i class="fas fa-check"></i>&nbsp;
        Note successfully created.
      </span>
    </aside>

    <header class="app-header is-primary">
      <span class="app-title is-1">Dashboard</span>
    </header>

    <navbar />

    <main class="app-content" v-if="notes.length > 0">
      <ul class="app-list">
        <li class="app-list-item" v-for="note in notes">
          <div class="app-list-controls is-pulled-right">
            <!-- <i class="fas fa-pen-square"></i> -->
            <!-- &nbsp; -->
            <i class="fas fa-ban" @click="removeNote(note.id)"></i>
          </div>
          <strong>{{ note.body | limit(25) }}</strong><br>
          <a class="is-size-7 has-text-primary">{{ note.url }}</a>
        </li>
      </ul>
    </main>

    <section class="app-content is-centered" v-else>
      No notes on this site yet.
    </section>

    <router-link to="/new" class="app-add-note">
      <i class="fas fa-plus"></i>
    </router-link>
  </div>
</template>

<script>
import Comms from '@/common/comms/Client'
import Navbar from '@/popup/components/partials/Navbar'

export default {
  components: { Navbar },

  data () {
    return {
      style: { transform: 'translateY(-56px)' },
      notes: []
    }
  },

  mounted () {
    this.loadNotes()
  },

  methods: {
    /*
     * Loading all the notes from the background script.
     */
    loadNotes () {
      Comms.send('background/load-notes')
        .then((notes) => { this.notes = notes })
    },

    /*
     * Sending a request to the background script to remove a note.
     */
    removeNote (id) {
      Comms.send('background/remove-note', { id })
        .then(() => {
          this.notes = this.notes.filter(note => note.id !== id)
        })
    }
  }
}
</script>
