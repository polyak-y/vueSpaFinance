import firebase from 'firebase/app';
import 'firebase/database';
 
export default {
  state: {
    info: {}
  },
  getters: {
    info (state) {
      return state.info
    }
  },
  mutations: {
    setInfo (state, payload) {
      state.info = payload;
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo ({ dispatch, commit, getters }, data) {
      try {
        const idUser = await dispatch('getUid');
        await firebase.database().ref(`/users/${idUser}/info`).update(data)
        commit('setInfo', {...getters.info, ...data});
      } catch (err) {
        commit('setError', err); 
        throw error
      }
    },
    async fetchInfo ({ dispatch, commit }) {
      try{
        const idUser = await dispatch('getUid')
        const dataFetch = await firebase.database().ref(`/users/${idUser}/info`).once('value');
        const info = await dataFetch.val();
        commit('setInfo', info);
      } catch (err) {
        commit('setError', err); 
        throw error
      }      
    }
  }
}