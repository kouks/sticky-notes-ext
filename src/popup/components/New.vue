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
          ></textarea>
        </div>

        <div class="app-form-color-picker">
          <div class="is-selected" style="background-color: #e37682;"></div>
          <div style="background-color: #5f4d93;"></div>
          <div style="background-color: #333;"></div>
          <div style="background-color: #eee;"></div>
        </div>

        <div class="app-form-choice">
          <button type="button" class="app-choice is-selected">Absolute</button>
          <button type="button" class="app-choice">Fixed</button>
        </div>

        <hr class="is-subtle">

        <div class="app-form-controls">
          <button type="button" class="app-button is-primary">Add</button>
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
import Navbar from '@/popup/components/partials/Navbar'

export default {
  components: { Navbar }
}
</script>
