import Vue from 'vue'

/*
 * Vue filter that limits the number of words in a text by a specified character
 * length.
 */
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
