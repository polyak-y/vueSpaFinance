import firebase from 'firebase/app';
import 'firebase/database';

export default {
  actions: {
    async createRecord ({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid');
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (err) {
        commit('setError', err);
        throw error;
      }
    },
    async fetchRecords ({ dispatch, commit }) {
      try {
        const idUser = await dispatch('getUid');
        const res =  await firebase.database().ref(`/users/${idUser}/records`).once('value');
        const records = res.val() || [];

        return Object.entries(records).map(([key, value]) => {
          return {
            id: key,
            ...value
          }
        });
      } catch (err) {
        commit('setError', err);
        throw error;
      }
    },
    async fetchRecordById ({ dispatch, commit }, idRecord) {
      try {
        const idUser = await dispatch('getUid');
        const res =  await firebase.database().ref(`/users/${idUser}/records`).child(idRecord).once('value');
        const record = res.val();

        return {id: idRecord, ...record};
      } catch (err) {
        commit('setError', err);
        throw error;
      }
    }
  },  
}