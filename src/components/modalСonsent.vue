<template>
  <!-- Обертка модалки -->
  <div v-if="isVisible" class="modal-wrapper" @click.self="close">
    <!-- Модалка -->
    <div class="modal">
      <!-- Шапка модалки -->
      <div class="modal__header content">
        <h3>{{ title }}</h3>
      </div>

      <!-- Тело модалки -->
      <div class="modal__body content">
        <button class="button button-danger button-lg" @click="success">
          Подтвердить
        </button>
      </div>
    </div>
    <!-- Конец модалки -->
  </div>
</template>

<script>
export default {
  props: {
    // Ивент при success
    action: Function,
    // Заголовок
    title: String,
    // Состояние отображения
    isVisible: Boolean,
    // Аргументы
    args: String
  },

  methods: {
    // Закрываем модалку
    close () {
      this.$emit('close')
    },

    // Успешное сохранение
    success () {
      this.action(this.args)
      this.close()
    }
  }
}
</script>
