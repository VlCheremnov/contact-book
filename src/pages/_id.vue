<template>
  <div>
    <!-- Модалка для редактирования/добавления поля -->
    <modal :is-visible="!!isEdit" @close="closeModal">
      <!-- Шапка модалки -->
      <template v-slot:header>
        <h3>{{ (isEdit == 'new')?'Добавить поле':'Редактировать' }}</h3>
      </template>

      <!-- Тело модалки -->
      <template v-slot:body>
        <!-- Ключ для поля -->
        <label class="field">
          <div class="field__label">Поле</div>
          <input v-model="newField.name" type="text" class="field__input">
        </label>
        <!-- Значение поля -->
        <label class="field">
          <div class="field__label">Значение</div>
          <input v-model="newField.value" type="text" class="field__input">
        </label>

        <div class="button button-success" @click="updateField(isEdit)">
          Сохранить
        </div>
      </template>
    </modal>
    <!-- Конец модалки редактирования/добавления -->

    <!-- Модалка с подтверждением -->
    <modal-consent :is-visible="consentModal.visible" :args="consentModal.args" :title="consentModal.title" :action="consentModal.action" @close="closeConsentModal" />

    <!-- Шапка -->
    <nuxt-link to="/" tag="header" class="header header_small pointer">
      <!-- Заголовок -->
      <h2 class="header__title">
        <!-- eslint-disable-next-line -->
        <i class="header__icon fas fa-chevron-left" /> {{ user.name || ' ' }}
      </h2>
    </nuxt-link>
    <!-- Конец шапки -->

    <!-- Контент -->
    <template v-if="user.name">
      <!-- Список полей -->
      <div class="list">
        <!-- Поле -->
        <div v-for="(field, key) in user.customFields" :key="key" class="card content">
          <!-- Данные -->
          <div>
            <div class="card__name">
              {{ field.name }}:
            </div>
            <div>{{ field.value }}</div>
          </div>

          <!-- Действия -->
          <div class="side">
            <i v-if="$store.state.oldFields[key]" title="Откатить последнее изменения" class="card__action pointer fas fa-undo-alt" @click="openConsentModal(`Откатить последнее изменения?`, revertField, key)" />
            <i title="Изменить" class="card__action pointer fas fa-pen" @click="editField(field, key)" />
            <i title="Удалить" class="card__action pointer fas fa-times" @click="openConsentModal(`Удалить ${field.name}?`, deleteField, key)" />
          </div>
        </div>

        <!-- Добавить новое поле -->
        <div class="card content pointer" @click="isEdit = 'new'">
          <!-- eslint-disable-next-line -->
          <i class="fas fa-plus" />   Добавить поле
        </div>
      </div>
      <!-- Конец списка-->
    </template>

    <!-- Если не нашли контакт -->
    <template v-else>
      <div class="text-muted content">
        Контакт не найден
      </div>
    </template>
  </div>
</template>

<script>
// Модалка
import modal from '~/components/modal'
// Модалка подтверждения
import consentModal from '~/mixins/consentModal'

export default {
  name: 'User',

  components: {
    modal
  },

  // Миксин для модалки подтверждения
  mixins: [consentModal],

  data: () => ({
    // Состояние модалки
    isEdit: false,
    // Данные нового поля
    newField: {}
  }),

  computed: {

    // Текущий контакт
    user: {
      get () {
        return (this.$store.state.users[this.userId]) ? JSON.parse(JSON.stringify(this.$store.state.users[this.userId])) : {}
      }
    },

    // Id контакта
    userId: {
      get () {
        return this.$route.params.id
      }
    }
  },

  methods: {
    // Обновляем контакт
    updateUser () {
      this.$store.dispatch('updateField', { user: this.user, id: this.userId })

      this.closeModal()
    },

    // Обновляем поле
    updateField (key) {
      if (!key || key === 'new') { // Если не нашли ключ - создаем его
        key = +Date.now()
      } else { // Если есть, то сохраняем данные поля
        this.$store.commit('setRevertFields', { field: this.user.customFields[key], key })
      }

      // Сеттим данные
      this.user.customFields[key] = this.newField
      // Обновляем контакт
      this.updateUser()
    },

    // Сеттим данные для модалки редактирования полей
    editField ({ name, value }, key = 'new') {
      this.newField.name = name
      this.newField.value = value
      this.isEdit = key
    },

    // Удаляем поле
    deleteField (key) {
      delete this.user.customFields[key]
      // Обновляем контакт
      this.updateUser(this.user)
    },

    // Отменяем полседнее едйствие
    revertField (key) {
      this.$store.dispatch('revertField', { key, id: this.userId })
    },

    // Закрываем модалку редактирования полей
    closeModal () {
      this.isEdit = false
      this.newField = {}
    }
  }
}
</script>
