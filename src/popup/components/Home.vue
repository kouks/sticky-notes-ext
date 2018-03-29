<template>
  <div class="app-container">
    <header class="app-header is-primary">
      <span class="app-title is-1">Dashboard</span>
    </header>

    <nav class="app-nav">
      <router-link to=""><i class="fas fa-user"></i></router-link>
      <router-link to=""><i class="fas fa-list"></i></router-link>
      <router-link to=""><i class="fas fa-envelope"></i></router-link>
    </nav>

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

    <button class="app-add-note">
      <i class="fas fa-plus"></i>
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      notes: [
        { id: 1, body: 'Need to read this', uri: 'pavelkoch.io' },
        { id: 1, body: 'Nice article about machin learning', uri: 'pavelkoch.io/contact' },
        { id: 1, body: 'Nice article about machine learning', uri: 'pavelkoch.io/contact' },
        { id: 1, body: 'Nice article about machine learning', uri: 'pavelkoch.io/contact' },
        { id: 1, body: 'Nice article about machine learning', uri: 'pavelkoch.io/contact' }
      ]
    }
  }
}
</script>
