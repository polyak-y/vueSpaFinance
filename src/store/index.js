import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info';
import currency from './currency';
import category from './category';
import record from './record';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { 
    info,
    auth,
    currency,
    category,
    record
  },
  state: {
    error: null,
    snackbar: false,
    text: '',
    snackTime: 5000,
    clearSnackTime: null
  },
  getters: {
    snackbar(state) {
      return state.snackbar
    },
    snackbarText(state) {
      return state.text;
    },
    error(state) {
      return state.error;
    },
    snackTime (state) {
      return state.snackTime;
    },
    clearSnackTime (state) {
      return state.clearSnackTime;
    }
  },
  mutations: {
    snackBarVisible (state, payload) {
      state.snackbar = true
      state.text = payload
    },

    closeSnack(state) {
      state.snackbar = false
      state.text = ''
    },

    setError (state, error) {
      state.error = error;
    },

    clearError (state) {
      state.error = null
    },

    clearSnackTime (state, payload) {
      state.clearSnackTime = payload
    }
  },
  actions: {
    snackBarVisible({ commit, getters, dispatch }, payload) {
      commit('snackBarVisible', payload);

      const clearSnack = setTimeout(() => {
        dispatch('closeSnack')
      }, getters.snackTime); 

      commit('clearSnackTime', clearSnack);
    }, 

    closeSnack({ commit, getters }) {
      commit('closeSnack');
      clearTimeout(getters.clearSnackTime)
    },
    async deleteProfile ({ commit }) {
      try {
        const user = await firebase.auth().currentUser; 
        await firebase.database().ref(`/users/${user.uid}`).remove();
        await user.delete();
        commit('clearInfo');
      } catch (err) {
        commit('setError', err)
        throw error;
      }
    }
  }
});
