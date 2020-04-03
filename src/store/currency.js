import firebase from 'firebase/app';
import 'firebase/database';

export default {
  actions: {
    async fetchCurrency ({ commit }) {
      try{
        let data;
        const res = await firebase.database().ref('/currency').once('value');
        const currency = res.val();
        data = currency;

        if((new Date().getDate() !== new Date(currency.info.server_time).getDate()) || 
           (new Date().getMonth() !== new Date(currency.info.server_time).getMonth())) {
            console.log('Обновляем валюты')
            const key = process.env.VUE_APP_FIXER;
            const res = await fetch(`https://fcsapi.com/api-v2/forex/base_latest?symbol=USD&type=forex&access_key=${key}`);
            const currency = await res.json();
            data = currency;
            await firebase.database().ref('/currency').set(currency); 
        }

        return data; 
      } catch(err) {
        console.log('Ошибка получения валют!')
        commit('setError', err);
        throw error;
      }      
    }
  }
} 