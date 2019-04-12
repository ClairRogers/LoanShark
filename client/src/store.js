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
    activeProfile: {},
    messages: [],
    activeAg: {},
    activeMessage: {},
    activeDeals: [],
    completedDeals: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setSearchResults(state, data) {
      state.searchResults = data
    },
    setActiveProfile(state, data) {
      state.activeProfile = data
    },
    setMessages(state, data) {
      state.messages = data
    },
    setActiveAg(state, data) {
      state.activeAg = data
    },
    setActiveMessage(state, data) {
      state.activeMessage = data
    },
    setActiveDeals(state, data) {
      state.activeDeals = data
    },
    setCompletedDeals(state, data) {
      state.completedDeals = data
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
    //#region USER
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
    removeFriend({ commit, dispatch }, payload) {
      api.put('users/' + payload.userId + '/remove', payload)
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

    updateRating({ commit, dispatch }, payload) {
      api.put('users/' + payload._id, payload)
        .then(res => {
          console.log(res.data)
        })
    },

    // getUser({ commit, dispatch }, payload) {
    //   api.get('users/' + payload)
    //     .then(res => {
    //       commit('setUser', res.data)
    //     })
    // },

    //endregion

    //#region AGREEMENTS
    initiateAgreement({ commit, dispatch }, payload) {
      api.post('agreements/', payload)
        .then(res => {
          console.log('agreement initiated')
          commit('setActiveAg', res.data)
        })

    },
    getMessages({ commit, dispatch }) {
      api.get('/agreements/negotiations')
        .then(res => {
          commit('setMessages', res.data)
        })
    },

    getActiveDeals({ commit, dispatch }) {
      api.get('/agreements/active')
        .then(res => {
          commit('setActiveDeals', res.data)
        })
    },

    getCompletedDeals({ commit, dispatch }) {
      api.get('/agreements/closed')
        .then(res => {
          commit('setCompletedDeals', res.data)
        })
    },

    editAgreement({ commit, dispatch }, payload) {
      api.put('/agreements/' + payload._id, payload)
        .then(res => {
          let blank = {}
          commit('setActiveAg', blank)
          dispatch('getMessages')
        })
    },

    acceptAgreement({ commit, dispatch }, payload) {
      api.put('/agreements/' + payload._id, payload)
        .then(res => {
          commit('setActiveAg', res.data)
          dispatch('getMessages')
        })
    },

    deleteAg({ commit, dispatch }, payload) {
      api.delete('/agreements/' + payload._id)
        .then(res => {
          dispatch('getMessages')
        })
    },

    closeAg({ commit, dispatch }, payload) {
      api.delete('/agreements/' + payload._id)
        .then(res => {
          commit('setActiveAg', res.data)
          dispatch('getActiveDeals')
          dispatch('getCompletedDeals')
        })
    },

    setActiveAg({ commit, dispatch }, payload) {
      commit('setActiveAg', payload)
    },

    //#endregion
    //#start MESSAGE
    setActiveMessage({ commit, dispatch }, payload) {
      commit('setActiveMessage', payload)
    },

    //#endregion
    //payload for rate User needs to include the Id for the user being rated, a number for the score, and a session.uid
    //payload: {profileId: , score:}
    rateUser({ commit, dispatch }, payload) {
      api.put('users/' + payload.profileId, payload)
        .then(res => {
          commit('setActiveProfile', res.data)
        })
    }


  }





})
