<template>
  <v-app-bar
      app
      clipped-left
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="handlerDrawer" />
      
      <span>{{date | myDate('datetime')}}</span>

      <v-spacer></v-spacer>

      <v-menu bottom :offset-y="true">
        <template v-slot:activator="{ on }">
          <v-btn
            color="#fff"
            text
            v-on="on"
            class="myButton"
          >  
            {{ info.name }}
            <v-icon right dark>mdi-chevron-down </v-icon>          
          </v-btn>
        </template>
  
        <v-list dense>
          <v-list-item link to="/profile">
            <v-list-item-title>Профиль</v-list-item-title>
          </v-list-item>
          
          <v-list-item link @click="logout">
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>  
</template>

<script>
import { mapGetters } from 'vuex';

  export default {
    data: () =>({
      date: new Date(),
      clearDate: null
    }),
    computed: {
      ...mapGetters([
        'info'
      ])
    },
    methods: {
      handlerDrawer() {
        this.$emit('drawerToggle');
      },
      logout() {
        this.$store.dispatch('logout').then(() => {
           this.$router.push('/login?message=logout')
        })
        .catch(err => {
          console.log(err)
        })       
      }
    },
    mounted() {
      this.clearDate = setInterval(() => {
        this.date = new Date();
      }, 1000)
    },
    beforeDestroy() {      
      clearInterval(this.clearDate);
    }

  }
</script>

<style lang="scss" scoped>
  .myButton {
    text-transform: none;
    letter-spacing: 0.5px;
  }
</style>