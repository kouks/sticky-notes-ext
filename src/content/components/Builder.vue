<template>
  <div class="note-builder">
    <div class="note-builder-cover" ref="cover">
      <div class="note-mock" ref="note" :style="styles">{{ data.body }}</div>
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

  mounted () {
    this.registerMouseEvents()
  },

  methods: {
    /*
     * Registering mouse evens on the cover element.
     */
    registerMouseEvents () {
      this.$refs.cover.onmousedown = (e) => this.onMouseDown(e)
      this.$refs.cover.onmousemove = (e) => this.onMouseMove(e)
      this.$refs.cover.onmouseup = (e) => this.onMouseUp(e)
    },

    /*
     * The mousedown event.
     */
    onMouseDown (e) {
      this.dragging = true
      console.log(this.data)

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
     * The mousemove event.
     */
    onMouseMove (e) {
      if (! this.dragging) {
        return
      }

      this.styles.width = (e.clientX - this.start.x) + 'px'
      this.styles.height = (e.clientY - this.start.y) + 'px'

      this.$forceUpdate()
    },

    /*
     * The mouseup event.
     */
    onMouseUp () {
      // If the position is absolute, we need to save the page Y instead of the
      // client Y coord.
      if (this.data.position === 'absolute') {
        this.styles.top = this.page.y + 'px'
      }

      this.$emit('done', {
        body: this.data.body,
        styles: this.styles
      })

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
