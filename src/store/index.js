export const state = () => ({
  users: []
})

export const mutations = {
  setUsers (state, users) {
    state.users = users
  }
}

export const actions = {
  setUsers ({ commit }) {
    const users = [{ name: 'user1', id: 1, customFields: [] }, { name: 'user2', id: 2, customFields: [] }]
    commit('setUsers', users)
  }
}
