export const state = () => ({
  // Список контактов
  users: null,

  // Список старых полей
  oldFields: {}
})

export const mutations = {
  // Инициализируем контакты
  initUsers (state, users) {
    state.users = users
  },

  // Создаем метку для отката поля
  setRevertFields (state, { key, field }) {
    state.oldFields[key] = field
  },

  // Удаляем метку для отката поля
  removeRevertFields (state, key) {
    delete state.oldFields[key]
  }
}

export const actions = {
  // Инициализируем контакты
  initUsers ({ commit }) {
    // Список контактов
    const users = localStorage.getItem('users') || null

    if (!users) {
      return
    }

    commit('initUsers', JSON.parse(users))
  },

  // Добавляем контакт
  addUser ({ commit, dispatch }, name) {
    // Список контактов
    const jsonUsers = localStorage.getItem('users')
    const users = (jsonUsers) ? JSON.parse(jsonUsers) : {}
    // id будующего юзера
    const id = +Date.now()

    // Создаем новый контакт
    users[id] = { name, customFields: {} }

    // Записываем
    localStorage.setItem('users', JSON.stringify(users))

    dispatch('initUsers')
  },

  // Удаляем контакт
  deletUser ({ commit, dispatch }, id) {
    // Список контактов
    const jsonUsers = localStorage.getItem('users')
    const users = (jsonUsers) ? JSON.parse(jsonUsers) : {}

    // Удаляем
    delete users[id]

    // Записываем
    localStorage.setItem('users', JSON.stringify(users))

    dispatch('initUsers')
  },

  updateField ({ commit, dispatch }, { id, user }) {
    // Список контактов
    const users = JSON.parse(localStorage.getItem('users')) || {}

    // Изменяем контакт
    users[id] = user

    // Записываем
    localStorage.setItem('users', JSON.stringify(users))

    dispatch('initUsers')
  },

  revertField ({ state, commit, dispatch }, { id, key }) {
    // Список контактов
    const users = JSON.parse(localStorage.getItem('users')) || {}
    users[id].customFields[key] = state.oldFields[key]

    // Записываем
    localStorage.setItem('users', JSON.stringify(users))

    // Удаляем метку для отката поля
    commit('removeRevertFields', key)

    dispatch('initUsers')
  }
}
