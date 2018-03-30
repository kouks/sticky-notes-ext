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
            <i class="fas fa-pen-square"></i>
            &nbsp;
            <i class="fas fa-ban"></i>
          </div>
          <strong>{{ note.body | limit(25) }}</strong><br>
          <a class="is-size-7 has-text-primary">{{ note.uri }}</a>
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
import Navbar from '@/popup/components/partials/Navbar'

export default {
  components: { Navbar },

  data () {
    return {
      style: { transform: 'translateY(-56px)' },
      notes: [
        { id: 1, body: 'Need to read this', uri: 'pavelkoch.io' },
        { id: 1, body: 'Nice article about machin learning', uri: 'pavelkoch.io/contact' },
        { id: 1, body: 'Nice article about machine learning', uri: 'pavelkoch.io/contact' },
        { id: 1, body: 'Nice article about machine learning', uri: 'pavelkoch.io/contact' },
        { id: 1, body: 'Nice article about machine learning', uri: 'pavelkoch.io/contact' }
      ]
    }
  },

  mounted () {
    // this.$nextTick(() => {
    //   this.style = { transform: 'translateY(0)' }

    //   window.setTimeout(() => {
    //     this.style = { transform: 'translateY(-56px)' }
    //   }, 3000)
    // })
  }
}
</script>
