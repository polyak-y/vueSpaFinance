<template>
  <v-card
    color="cyan darken-3"
    height="100%"
  >
    <v-card-title>
      <h3 class="vp_h3">Курс валют</h3>
    </v-card-title>
      
    <v-card-text>     

      <v-simple-table class="myTable">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Валюта</th>
              <th class="text-left">Курс</th>
              <th class="text-left">Дата</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cur, ind) of currencies" :key="ind">
              <td>{{ ind+1 }}</td>
              <td>{{ rates[cur] | myCurrencyFilter(cur) }}</td>
              <td>{{ new Date(date) | myDate('date') }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text> 
  </v-card>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data() {
    return {
      currencies: ['USD', 'RUB',  'EUR', 'UAH']
    }
  }
}
</script>

<style lang="scss">
   .vp_h3 {
    color: #fff;
    font-size: 18px;
    font-weight: normal;
  }

  .myTable {

    table {
      table-layout: fixed!important;
    }    
  }
</style>