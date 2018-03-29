<template>
  <div class="app-container">
    <header class="app-header is-primary">
      <span class="app-title is-1">Login</span>
    </header>

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
          <button type="button" class="app-button is-primary is-block">Login</button>
          <button type="button" class="app-button is-link is-block">No account yet</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  //
}
</script>
