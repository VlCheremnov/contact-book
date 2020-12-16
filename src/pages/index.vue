<template>
  <div>
    <!-- Шапка -->
    <header class="header">
      <!-- Заголовок -->
      <h1 class="header__title">
        Список контактов
      </h1>
    </header>

    <!-- Основной контент -->
    <main class="main list">
      <template v-if="$store.state.users">
        <!-- Карточка -->
        <nuxt-link
          v-for="(card, id) in $store.state.users"
          :key="id"
          :to="`/${id}`"

          class="card content"
        >
          <!-- Иконка -->
          <img class="card__icon" src="contacts.svg" alt="Контакт">

          <!-- Имя -->
          <span class="card__name">{{ card.name }}</span>
        </nuxt-link>
        <!-- Конец карточки -->
      </template>

      <!-- Если нет контактов -->
      <div v-else class="text-muted card">
        <span class="card__name">Вы еще не добавили контакт :(</span>
      </div>
    </main>
    <!-- Конец основного контента-->
  </div>
</template>

<script>
/* eslint-disable- */

export default {
  data: () => ({
    cards: []
  })
}
</script>
