import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    searchResults: [],
    lends: [],
    borrows: [],
    activeProfile: {},
    messages: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setSearchResults(state, data) {
      state.searchResults = data
    },
    setLends(state, data) {
      state.lends = data
    },
    setBorrows(state, data) {
      state.borrows = data
    },
    setActiveProfile(state, data) {
      state.activeProfile = data
    },
    setMessages(state, data) {
      state.messages = data
    }
  },
  actions: {
    //#region AUTH
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
    },
    authenticate({ commit, dispatch }) {

      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
        .catch(res => {
          console.log('error')
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
    },
    logOut({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          router.push({ name: 'login' })
          let data = {}
          commit('setUser', data)
        })
    },
    //#endregion

    searchUser({ commit, dispatch }, payload) {
      //if statement prevents errors when deleting input
      if (payload) {
        api.get('users/search/' + payload)
          .then(res => {
            res.data.forEach(d => {
              delete d.hash
            })
            commit('setSearchResults', res.data)
          })
      } else {
        commit('setSearchResults', '')
      }
    },
    addFriend({ commit, dispatch }, payload) {
      api.put('users/' + payload._id, payload)
        .then(res => {
          commit('setUser', res.data)
        })

    },
    setActiveProfile({ commit, dispatch }, payload) {
      commit('setActiveProfile', payload)
      router.push({ name: 'profile', params: { profileId: payload._id } })
    },
    deleteUser({ commit, dispatch }, payload) {
      api.delete('users/' + payload)
        .then(res => {
          console.log('successssssssssss')

        })

    },
    editProfile({ commit, dispatch }, payload) {
      api.put('users/' + payload._id, payload)
        .then(res => {
          commit('setUser', res.data)
        })
    },



    //#region AGREEMENTS
    initiateAgreement({ commit, dispatch }, payload) {

      api.post('agreements/', payload)
        .then(res => {
          console.log('agreement initiated')
        })
    },
    getMessages({ commit, dispatch }) {
      api.get('/agreements/negotiations')
        .then(res => {
          commit('setMessages', res.data)
        })
    }
    //#endregion

  }





})
