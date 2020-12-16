<template>
  <div v-cloak class="container">
    <Nuxt />
  </div>
</template>

<script>
export default {
  created () {
    // Подгружаем список контактов
    this.$store.dispatch('initUsers')
  }
}
</script>
