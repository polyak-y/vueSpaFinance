import firebase from 'firebase/app';
import 'firebase/database';

export default {
  actions: {
    async fetchCategories ({ commit, dispatch }) {
      try {
        const idUser = await dispatch('getUid');
        const res =  await firebase.database().ref(`/users/${idUser}/categories`).once('value');
        const categories = res.val() || [];

        return Object.entries(categories).map(([key, value]) => {
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
    async fetchCategoryById ({ commit, dispatch }, idCategory) {
      try {
        const idUser = await dispatch('getUid');
        const res =  await firebase.database().ref(`/users/${idUser}/categories`).child(idCategory).once('value');
        const category = res.val();

        return {id: idCategory, ...category}
      } catch (err) {
        commit('setError', err);
        throw error;
      }
    },
    async createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        const idUser = await dispatch('getUid');
        const category = await firebase.database().ref(`/users/${idUser}/categories`).push({title, limit});
        return {
          id: category.key,
          title, 
          limit, 
        }
      } catch(err) {
        commit('setError', err)
        throw error;
      }
    },
    async categoryUpdate ({ dispatch }, { idCategory, limit, title}) {
      try {
        const idUser = await dispatch('getUid');

        const catUpdate = {limit}
        if (title) catUpdate.title = title;

        await firebase.database().ref(`/users/${idUser}/categories/${idCategory}`).update(catUpdate)
      } catch (err) {
        commit('setError', err)
        throw error;
      }
    },
    async deleteAllCategory ({dispatch, commit}) {
      try {
        const idUser = await dispatch('getUid');
        await firebase.database().ref(`/users/${idUser}/categories`).remove();
        await firebase.database().ref(`/users/${idUser}/records`).remove();        
      } catch (err) {
        commit('setError', err)
        throw error;
      }
    }
  }
}