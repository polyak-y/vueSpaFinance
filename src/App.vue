<template>
  <v-app>    
    <component :is="layout"></component>     
    <SnackBar />
  </v-app>
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout';
import MainLayout from './layouts/MainLayout';
import Page404Layout from './layouts/Page404Layout';
import SnackBar from './utils/SnackBar';
import messages from './utils/messages';

  export default {
    computed: {
      layout() {
        return `${(this.$route.meta.layout || 'empty')}-layout`
      },
      error () {
        return this.$store.getters.error;
      }
    },
    watch: {
      error(fbError) {
        console.log('fbError', fbError.code)
        this.$store.dispatch('snackBarVisible', (messages[fbError.code] || 'Что-то пошло не так'))
      }
    },
    components: {
      EmptyLayout,
      MainLayout,
      Page404Layout,
      SnackBar
    }
  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: 'True Lies';
    src: url('./fonts/TrueLies.eot');
    src: url('./fonts/TrueLies.eot?#iefix') format('embedded-opentype'),
        url('./fonts/TrueLies.woff2') format('woff2'),
        url('./fonts/TrueLies.woff') format('woff'),
        url('./fonts/TrueLies.ttf') format('truetype'),
        url('./fonts/TrueLies.svg#TrueLies') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'MODDigitalStripCyrillicBold';
    src: url('./fonts/MODDigitalStripCyrillicBold-Bold.eot');
    src: url('./fonts/MODDigitalStripCyrillicBold-Bold.eot?#iefix') format('embedded-opentype'),
        url('./fonts/MODDigitalStripCyrillicBold-Bold.woff2') format('woff2'),
        url('./fonts/MODDigitalStripCyrillicBold-Bold.woff') format('woff'),
        url('./fonts/MODDigitalStripCyrillicBold-Bold.ttf') format('truetype'),
        url('./fonts/MODDigitalStripCyrillicBold-Bold.svg#MODDigitalStripCyrillicBold-Bold') format('svg');
    font-weight: bold;
    font-style: normal;
}


</style>