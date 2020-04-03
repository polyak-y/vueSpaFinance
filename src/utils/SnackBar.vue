<template>
  <v-snackbar
    :value="snackbar"
    right
    top
    :timeout="snackTime"
  >
     {{ snackbarText }}

      <v-btn
        color="secondary"
        class="myButton"
        text
        @click="closeSnack"
      >
        Закрыть       
      </v-btn>
    </v-snackbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'snackbar',
      'snackbarText',
      'snackTime',
    ])
  },
  methods: {
    ...mapActions([
      'closeSnack'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .myButton {
    text-transform: none;
    letter-spacing: 0.5px;
  }
</style>