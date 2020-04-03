<template>
   <v-card 
    color="blueColor" 
    dark
    height="100%"
  > 
    <v-card-title>
      <h3 class="vp_h3">Счет в валюте</h3>
    </v-card-title>

    <v-card-text>      
      <template  
        v-for="(cur, ind) in currencies"      
      >
        <span 
          :key="ind" 
          class="vp_summa py-4"
        >
          {{getCurrency(cur) | myCurrencyFilter(cur)}}
        </span>
        <v-divider :key="cur"></v-divider>
      </template>     
    </v-card-text>   
   </v-card>
</template>

<script>
export default {
  props: ['rates'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR', 'UAH']
  }),
  computed: {
    base() { //переводим имеющиеся у нас рубли в доллары
      return this.$store.getters.info.bill / this.rates['RUB']
    } 
  },
  methods: {
    getCurrency (currency) {
      return Math.ceil(this.base * this.rates[currency]);
    }
  }
}
</script>

<style lang="scss" scoped>
  .vp_h3 {
    color: #fff;
    font-size: 18px;
    font-weight: normal;
  }

  .vp_summa {
    color: #fff;
    font-size: 16px;
    display: inline-block;
  }
</style>