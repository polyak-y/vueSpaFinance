<template>
  <v-container fluid> 
    <v-divider></v-divider>

    <v-row class="vp_countTitle">
      <v-col cols="12" class="d-flex align-center rightTitle">
        <h2>Счет</h2>
      </v-col>    
    </v-row>

    <v-divider></v-divider>

    <transition name="fade" mode="out-in">
      <Loader v-if="loading"></Loader>

      <v-row v-else>
        <v-col cols="12" md="4">
          <HomeBill
            :rates="currency.response"
          ></HomeBill> 
        </v-col>

        <v-col cols="12" md="8">
          <HomeCurrency
            :rates="currency.response"
            :date="currency.info.server_time"
          ></HomeCurrency>
        </v-col>
      </v-row>
    </transition>
  </v-container>
</template>

<script>
  import HomeBill from '../components/HomeBill';
  import HomeCurrency from '../components/HomeCurrency';

export default {
  name: 'home',
  metaInfo () {
    return {
      title: 'Счет'
    }
  }, 
  data: () => ({
    loading: true,
    currency: null
  }),
  mounted() {
    this.getCurrency();
  },
  methods: {
    getCurrency() {
      this.loading = true;
      
      this.$store.dispatch('fetchCurrency')
      .then(currency => {
        this.currency = currency;
        this.loading = false;
      })      
    }
  },
  components: {
    HomeBill,
    HomeCurrency
  },

}
</script>

<style lang="scss" scoped>
  .vp_countTitle {
    .rightTitle {
      background: rgba(255, 255, 255, .8);

      h2 {
        font-size: 27px;
      }
    }
    
    .leftTitle {
      background: rgba(255, 255, 255, .8);
    }    
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
