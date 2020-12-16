<template>
  <!-- Обертка модалки -->
  <div v-if="isVisible" class="modal-wrapper" @click.self="close">
    <!-- Модалка -->
    <div class="modal">
      <!-- Шапка модалки -->
      <div class="modal__header content">
        <slot name="header" />
      </div>

      <!-- Тело модалки -->
      <div class="modal__body content">
        <slot name="body" />
      </div>
    </div>
    <!-- Конец модалки -->
  </div>
</template>

<script>
export default {
  name: 'ModalAddUser',
  props: {
    // Состояние отображения
    isVisible: {
      default: false,
      type: Boolean
    }
  },

  methods: {
    // Закрываем модалку
    close () {
      this.$emit('close')
    }
  }
}
</script>
