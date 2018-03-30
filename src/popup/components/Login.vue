<template>
  <div class="app-container">
    <header class="app-header is-primary">
      <span class="app-title is-1">Login</span>
    </header>

    <navbar />

    <main class="app-content is-centered">
      <form class="app-form">
        <div class="app-form-field has-addons">
          <span class="app-form-addon"><i class="fas fa-envelope"></i></span>
          <input id="email" class="app-form-input" type="text">
        </div>

        <div class="app-form-field has-addons">
          <span class="app-form-addon"><i class="fas fa-key"></i></span>
          <input id="email" class="app-form-input" type="text">
        </div>

        <div class="app-form-controls">
          <button type="button" class="app-button is-primary">Login</button>
          <button type="button" class="app-button is-link">No account yet</button>
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
