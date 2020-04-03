import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import ru from 'vuetify/es5/locale/ru'

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ru },
    current: 'ru'
  },
  theme: {
    themes: {
      light: {
        primary: colors.green.darken1,
        error: colors.red.darken1, // #FFCDD2
        secondary: colors.pink, // #3F51B5        
        blueColor: colors.deepPurple.darken2
      },
    },
  },
});
