import Vue from 'vue'

// Word limit filter.
Vue.filter('limit', (value, length, trail = '...') => {
  if (length >= value.length) {
    return value
  }

  if (value.charAt(length) === ' ') {
    return value.slice(0, length) + trail
  }

  let words = value.slice(0, length).split(' ')

  return words.slice(0, -1).join(' ') + trail
})
