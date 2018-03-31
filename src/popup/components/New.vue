<template>
  <div class="app-container">
    <header class="app-header is-primary">
      <span class="app-title is-1">New Note</span>
    </header>

    <navbar />

    <main class="app-content is-centered">
      <form class="app-form">
        <div class="app-form-field">
          <textarea
            class="app-form-textarea"
            placeholder="Note body..."
            rows="3"
            v-model="form.body"
          ></textarea>
        </div>

        <div class="app-form-color-picker">
          <div
            v-for="color in colors"
            :class="[form.backgroundColor === color.bg ? 'is-selected' : '']"
            :style="{ backgroundColor: color.bg }"
            @click="selectColor(color)"
          ><span :style="{ color: color.text }">A</span></div>
        </div>

        <div class="app-form-choice">
          <button
            type="button"
            :class="['app-choice', form.position === 'absolute' ? 'is-selected' : '']"
            @click="selectPosition('absolute')"
          >Absolute</button>
          <button
            type="button"
            :class="['app-choice', form.position === 'fixed' ? 'is-selected' : '']"
            @click="selectPosition('fixed')"
          >Fixed</button>
        </div>

        <hr class="is-subtle">

        <div class="app-form-controls">
          <button
            type="button"
            class="app-button is-primary"
            @click="createNote()"
          >Add</button>
          <router-link
            type="button"
            class="app-button is-link"
            to="/"
          >Cancel</router-link>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import Client from '@/common/comms/Client'
import Navbar from '@/popup/components/partials/Navbar'

export default {
  components: { Navbar },

  data () {
    return {
      form: {
        body: '',
        color: 'whitesmoke',
        backgroundColor: '#e37682',
        position: 'absolute'
      },
      colors: [
        { bg: '#e37682', text: 'whitesmoke' },
        { bg: '#5f4d93', text: 'whitesmoke' },
        { bg: '#333', text: 'whitesmoke' },
        { bg: '#f4f4f4', text: '#333' }
      ]
    }
  },

  methods: {
    createNote () {
      Client.send('content/create-note', this.form)
    },

    selectColor (color) {
      this.form.color = color.text
      this.form.backgroundColor = color.bg
    },

    selectPosition (position) {
      this.form.position = position
    }
  }
}
</script>
