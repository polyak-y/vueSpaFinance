import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default {    
  actions: {
    async login ({ commit }, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch(err) {     
        commit('setError', err)   
        throw error
      }
    },

    async register ({ dispatch, commit }, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 100000,
          name: name
        });
      } catch(err) { 
        commit('setError', err);         
        throw error
      }
    },

    getUid () {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },

    async logout({ commit }) {
      try {
        await firebase.auth().signOut();
        commit('clearInfo')
      } catch(err) {
        commit('setError', err);
        throw error;
      }
    }
  }
}