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
  },

  mounted () {
    document.addEventListener('click', this.toggleDropdown)
  },

  methods: {
    toggleDropdown (e) {
      const dropdown = e.target.closest('.dropdown')
      const dropdownList = this.$el.querySelectorAll('.dropdown.active')
      if (dropdown) { /* если клик по выпадашке - открывем */
        dropdown.classList.add('active')
      } else if (dropdownList && dropdownList.length) { /* иначе закрываем все выпадашки */
        dropdownList.forEach((item) => {
          item.classList.remove('active')
        })
      }
    }
  }
}
</script>
