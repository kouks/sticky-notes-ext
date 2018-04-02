<template>
  <div class="note-builder">
    <div
      class="note-builder-cover"
      @mousedown="startCreatingNote"
      @mousemove="resizeNote"
      @mouseup="saveNote"
    >
      <div class="note-mock" :style="styles">{{ data.body }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],

  data () {
    return {
      styles: {},
      start: { x: 0, y: 0 },
      page: { y: 0 },
      dragging: false
    }
  },

  methods: {
    /*
     * Start creating the note element upon the mousedown event.
     */
    startCreatingNote (e) {
      this.dragging = true

      this.styles = {
        background: this.data.backgroundColor,
        color: this.data.color,
        position: this.data.position,
        left: e.clientX + 'px',
        top: e.clientY + 'px'
      }

      this.start.x = e.clientX
      this.start.y = e.clientY
      this.page.y = e.pageY
    },

    /*
     * Resize the note every time a user moves their mouse.
     */
    resizeNote (e) {
      if (! this.dragging) {
        return
      }

      this.styles.width = (e.clientX - this.start.x) + 'px'
      this.styles.height = (e.clientY - this.start.y) + 'px'

      this.$forceUpdate()
    },

    /*
     * Save the note upon finishing dragging the note.
     */
    saveNote () {
      // If the position is absolute, we need to save the page Y instead of the
      // client Y coord.
      if (this.data.position === 'absolute') {
        this.styles.top = this.page.y + 'px'
      }

      this.$emit('done', {
        body: this.data.body,
        styles: this.styles
      })

      // Reset the data and prepare to create another note.
      this.dragging = false
      this.styles = {}
    }
  }
}
</script>

<style scoped>
.note-mock {
  padding: 10px;
}

.note-builder-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  z-index: 1000;
}
</style>
