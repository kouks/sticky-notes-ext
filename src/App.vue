<template>
  <div class="conatiner" style="width: 200px; height: 400px">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  //
}
</script>

<style lang="sass">
.fade-enter-active, .fade-leave-active
  transition-property: opacity
  transition-duration: .3s

.fade-enter-active
  transition-delay: .3s

.fade-enter, .fade-leave-active
  opacity: 0
</style>
