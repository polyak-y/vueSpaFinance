<template>
  <v-container fluid>
    <v-divider></v-divider>

    <v-row class="vp_countTitle">
      <v-col 
        cols="12" 
        md="12"
        class="d-flex align-center title justify-space-between"        
      >
        <h2>Планирование</h2>
        <h2>{{ info.bill | myCurrencyFilter }}</h2>
      </v-col>      
    </v-row>

    <v-divider></v-divider>
    
    <transition name="fade" mode="out-in">
      <Loader v-if="loading"></Loader>

      <p v-else-if="!loading && !categories.length" class="noCategory">
        Категории отсутствуют
        <v-btn 
          color="#fff"
          outlined
          class="myButtonNoCategory mt-2" 
          text 
          to="/categories">Добавить</v-btn>
      </p>

      <v-row v-else>
        <v-col cols="12" md="12">
          <div 
            v-for="cat in categories" 
            :key="cat.id"
            class="mb-3"
          >
            <span><strong>{{ cat.title }}:</strong> потрачено {{ cat.spend | myCurrencyFilter}} из {{ cat.limit | myCurrencyFilter}}</span>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-progress-linear           
                  :color="cat.progressColor"
                  height="30"
                  :value="cat.progressPersent"
                  striped
                  v-on="on"
                >
                  <strong>{{ Math.ceil(cat.progressPersent) }}%</strong>
                </v-progress-linear>
              </template>
              <span>{{ textTooltip(cat.limit, cat.spend) }}</span>
            </v-tooltip>          
          </div>
        </v-col>
      </v-row>   
    </transition> 
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import currencyFilter from '../filters/currency.filter'

  export default {
    name: 'planning',
    metaInfo () {  
      return {
        title: 'Планирование'
      }    
    },
    data: () => ({
      loading: true,
      categories: [],
    }),
    computed: {
      ...mapGetters([
        'info'
      ]),     
      textTooltip () {        
        return (limit, spend) => {
          return limit - spend > 0 
            ? `Осталось ${currencyFilter(limit - spend)}` 
            : `Превышено на ${currencyFilter(spend - limit)}`;
        }        
      }
    },
    methods: {
      ...mapActions([
        'fetchRecords',
        'fetchCategories'
      ]),
    },
    async mounted () {
      try{
        const records = await this.fetchRecords();
        const categories = await this.fetchCategories();

        this.categories = categories.map(cat => {
          const spend = records.filter(rec => rec.categoryId === cat.id) //фильтруем по категории
                               .filter(rec => rec.type === 'outcome') //фильтруем по расхоам
                               .reduce((total, record) => (total += +record.amount), 0); //общая сумма расходов
          const persent = spend * 100 / cat.limit;
          const progressPersent = persent > 100 ? 100 : persent;
          const progressColor = persent < 60 
            ? 'green' 
            : persent < 100 
              ? 'yellow'
              : 'red';

          return {
            ...cat,
            progressPersent,
            progressColor,
            spend
          }
        });

        this.loading = false;
      } catch (e) {}      
    }
  }
</script>

<style lang="scss" scoped>
  .vp_countTitle {
    .title {
      background: rgba(255, 255, 255, .8);

      h2 {
        font-size: 27px;
      }
    }   
  }

  .noCategory {
    font-size: 20px;
    min-height: 200px;
    margin-bottom: 0;    
    background: #0D47A1 ;
    color: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

   .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>