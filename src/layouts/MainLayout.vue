<template>
  <div class="fill-height mainLayout">
    <main-nav-bar 
      @drawerToggle="toggleDrawer"
    ></main-nav-bar>

    <main-side-bar 
      @miniHandler="miniHandler" 
      :drawer="drawer" 
      :mini="mini">
    </main-side-bar>  

    <Loader v-if="loading"></Loader>
    
    <v-content v-else class="fill-height">
           
      <router-view></router-view>   

      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            class="floatButton"
            absolute
            dark
            fab
            bottom
            right
            color="secondary"
            to="/record"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Создать запись</span>
      </v-tooltip>
      
    </v-content>    

    <v-footer app class="footer">
      <span class="footerText">&copy; 2020 by MadCoder</span> 
    </v-footer>
  </div>
</template>

<script>
  import SideBar from '../components/SideBar';
  import NavBar from '../components/NavBar';
  import Loader from '../components/Loader';

  export default { 
    data() {
      return {
        drawer: true,
        mini: false,
        loading: true,
      }      
    },
    async mounted () {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }

      this.loading = false;
    },
    methods: {
      toggleDrawer() {
        this.drawer = !this.drawer
        this.mini = !this.mini
      },
      miniHandler() {
        if(!this.mini) {
          this.mini = false;
        }        
      }
    },
    components: {
      'mainSideBar': SideBar,
      'mainNavBar': NavBar,
      Loader,
    }
  }
</script>

<style lang="scss" scoped>
  .floatButton {
    bottom: 0!important;
  }

  .mainLayout {
    background: url('../assets/fon.jpg') no-repeat;
    background-size: cover;
    position: relative;
  }

  .mainLayout:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(255, 255, 255, .8);
    pointer-events: none;
  }

  .footer {
    display: flex;
    justify-content: center;
  }

  .footerText {
     font-family: 'True Lies';
  }
</style>