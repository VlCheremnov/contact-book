export const state = () => ({
  users: null
})

export const mutations = {
  setUsers (state, users) {
    state.users = users
  }
}

export const actions = {
  setUsers ({ commit }) {
    const users = {
      1: { name: 'user1', customFields: { Телефон: '+79963320562', email: 'check@gmail.ri' } },
      2: { name: 'user2', customFields: [] }
    }
    commit('setUsers', users)
  }
}
