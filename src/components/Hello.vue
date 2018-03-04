<template>
  <div>
    <router-link to="/test">{{ message }}</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'Hello World'
    }
  }
}
</script>
