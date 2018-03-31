<template>
  <div class="note" :style="styles">
    {{ data.body }}
  </div>
</template>

<script>
export default {
  props: ['data'],

  computed: {
    styles () {
      return JSON.parse(this.data.styles)
    }
  }
}
</script>

<style scoped>
.note {
  box-shadow: 0px 0px 12px -3px rgba(0, 0, 0, .7);
  padding: 10px;
  transition: .3s opacity ease;
  z-index: 1000;
}

.note:hover {
  opacity: 0.2;
}
</style>
