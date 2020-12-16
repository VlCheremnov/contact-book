<template>
  <div>
    <!-- Модалка с добавлением контакта -->
    <modal :is-visible="modalVisible" @close="closeModal">
      <!-- Шапка модалки -->
      <template v-slot:header>
        <h3>Добавить контакт</h3>
      </template>

      <!-- Тело модалки -->
      <template v-slot:body>
        <!-- Имя контакта -->
        <div class="field">
          <label for="name" class="field__label">Имя контакта</label>
          <input id="name" v-model="newUser" type="text" class="field__input" :class="{'field__danger': errorName}">
        </div>

        <div class="button button-success" @click="addUser">
          Добавить
        </div>
      </template>
    </modal>
    <!-- Конец модалки с добавлением контакта -->

    <!-- Модалка с подтверждением -->
    <modal-consent :is-visible="consentModal.visible" :args="consentModal.args" :title="consentModal.title" :action="consentModal.action" @close="closeConsentModal" />

    <!-- Шапка -->
    <header class="header">
      <!-- Заголовок -->
      <h1 class="header__title">
        Список контактов
      </h1>

      <!-- Добавить контакт -->
      <div title="Добавить контакт" class="side pointer" @click="modalVisible = true">
        <i class="fas fa-plus" />
      </div>
    </header>

    <!-- Основной контент -->
    <main class="main list">
      <template v-if="users && Object.keys(users).length">
        <!-- Карточка -->
        <nuxt-link
          v-for="(card, id) in users"
          :key="id"
          :to="`/${id}`"

          class="card content"
        >
          <!-- Иконка -->
          <img class="card__icon" src="contacts.svg" alt="Контакт">

          <!-- Имя -->
          <span class="card__name">{{ card.name }}</span>

          <div class="side" @click.prevent="openConsentModal(`Удалить ${card.name}?`, deletUser, id)">
            <i class="fas fa-times" />
          </div>
        </nuxt-link>
        <!-- Конец карточки -->
      </template>

      <!-- Если нет контактов -->
      <div v-else class="text-muted card content">
        <span class="card__name">Вы еще не добавили контакт :(</span>
      </div>
    </main>
    <!-- Конец основного контента-->
  </div>
</template>

<script>
// Модалка
import modal from '~/components/modal'
// Модалка подтверждения
import consentModal from '~/mixins/consentModal'

export default {
  name: 'Home',

  components: {
    modal
  },

  // Миксин для модалки подтверждения
  mixins: [consentModal],

  data: () => ({
    // Состояние модалки
    modalVisible: false,

    // Имя нового контакта
    newUser: '',

    // Состояние ошибки
    errorName: false
  }),

  computed: {
    // Список контактов
    users: {
      get () {
        return this.$store.state.users
      }
    }
  },

  methods: {
    // Добавляем контакт
    addUser () {
      // Включаем ошибку, не ввели имя контакта
      if (!this.newUser) {
        this.errorName = true
        return
      }

      // Добавляем контакт
      this.$store.dispatch('addUser', this.newUser)
      this.closeModal()
    },

    // Закрываем модалку
    closeModal () {
      this.modalVisible = false
      this.newUser = ''
      this.errorName = false
    },

    // Удаляем контакт
    deletUser (id) {
      this.$store.dispatch('deletUser', id)
    }
  }
}
</script>
