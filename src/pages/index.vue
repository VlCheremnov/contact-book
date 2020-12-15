<template>
  <div class="container">
    <!-- Шапка -->
    <header class="header">
      <!-- Заголовок -->
      <h1 class="header__title">
        Список контактов
      </h1>
    </header>

    <!-- Основной контент -->
    <main class="main list">
      <!-- Карточка -->
      <nuxt-link
        v-for="(card, index) in $store.state.users"
        :key="`card-${index}`"
        :to="`/${card.id}`"

        class="card"
      >
        <!-- Иконка -->
        <img class="card__icon" src="contacts.svg" alt="Контакт">

        <!-- Имя -->
        <span class="card__name">{{ card.name }}</span>
      </nuxt-link>
      <!-- Конец карточки -->
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
