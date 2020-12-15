<template>
  <div class="container">
    <Nuxt />
  </div>
</template>

<script>
export default {
  created () {
    // Подгружаем список контактов
    this.$store.dispatch('setUsers')
  }
}
</script>
