<template>
  <div>
    <!-- Шапка -->
    <nuxt-link to="/" tag="header" class="header header_small pointer">
      <!-- Заголовок -->
      <h2 class="header__title">
        <i class="header__icon fas fa-chevron-left" /> {{ user.name }}
      </h2>

      <!-- Выпадающее меню -->
      <div class="dropdown header__side" @click.prevent>
        <!-- Заголовок выпадашки -->
        <div class="dropdown__title header__title">
          <i class="fas fa-ellipsis-v" />
        </div>

        <!-- Итемы выпадашки -->
        <div class="dropdown__list list">
          <!-- Изменить имя -->
          <div class="dropdown__item card content">
            <i class="fas fa-pen dropdown__icon" /> Изменить имя
          </div>
          <!-- Удалить -->
          <div class="dropdown__item card content">
            <i class="fas fa-times dropdown__icon" /> Удалить
          </div>
          <!-- Вернуть последнее изменение -->
          <div class="dropdown__item card content">
            <i class="fas fa-pen dropdown__icon" /> Вернуть последнее изменение
          </div>
        </div>
        <!-- Конец итемов -->
      </div>
      <!-- Конец выпадающего меню-->
    </nuxt-link>
    <!-- Конец шапки -->
    <div class="">
      <template v-if="user">
        <div class="list">
          <div v-for="(value, name) in user.customFields" :key="name + value" class="card content">
            <div>
              <div class="card__name">
                {{ name }}:
              </div>
              <div>{{ value }}</div>
            </div>
          </div>

          <div v-if="!isEdit" class="card content">
            <i class="fas fa-plus" /> Добавить поле
          </div>
        </div>
      </template>
      <template v-else class="text-muted">
        Контакт не найден
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',

  data: () => ({
    isEdit: false
  }),

  computed: {

    // Текущий контакт
    user: {
      get () {
        return this.$store.state.users[this.userId]
      }
    },

    // Id контакта
    userId: {
      get () {
        return this.$route.params.id
      }
    }
  }
}
</script>
