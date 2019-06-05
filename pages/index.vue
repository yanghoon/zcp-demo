<template>
  <div></div>
</template>

<script>
export default {
  fetch ({ params, redirect }) {
    // References
    // - https://github.com/nuxt/nuxt.js/issues/1843#issuecomment-368274910
    redirect(301, '/scenario')
  }
}
</script>

<style>
</style>