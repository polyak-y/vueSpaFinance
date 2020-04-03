<template>
  <v-container fluid class="historyWrap">
    <v-divider></v-divider>

    <v-row class="vp_countTitle">
      <v-col 
        cols="12" 
        md="12"
        class="d-flex align-center title"        
      >
        <h2>История записей</h2>
      </v-col>      
    </v-row>
    <v-divider></v-divider>

    <transition name="fade" mode="out-in">
      <Loader v-if="loadingTable"/>

      <v-row v-else>
        <v-col cols="12">       
          <HistoryChart :dataChart="dataChart" v-if="dataChart.length"/>
        </v-col>

        <v-col cols="12">
          <HistoryTable 
            :tableData="tableData"
          />
        </v-col>
      </v-row>
    </transition>
  </v-container>
</template>

<script>
  import HistoryTable from '../components/HistoryTable';
  import HistoryChart from '../components/HistoryChart';
  import { mapActions } from 'vuex';
  import dateFilter from '../filters/date.filters';
  import curencyFilter from '../filters/currency.filter';

  export default {
    name: 'history',
    metaInfo () {
      return {
        title: 'История'
      }      
    },
    data: () => ({
      loadingTable: true,
      tableData: [],
      dataChart: [],
    }),
    methods: {
      ...mapActions([
        'fetchRecords',
        'fetchCategories'
      ]),
      createDataChart (records, categories) {
        const allOutcome = records.filter(rec => rec.type === 'outcome')
                                  .reduce((total, elem) => total += elem.amount, 0);

        return categories.map(cat => {
          const filterCategory = records.filter(rec => cat.id === rec.categoryId && rec.type === 'outcome'); //все record одной категории
          const allRecordSum = filterCategory.reduce((total, elem) => total += elem.amount, 0) //сумма всех расходов по данной категории

          return {
            name: cat.title,
            selected: true,
            y: allRecordSum * 100 /allOutcome,  
            allSum: curencyFilter(allRecordSum)       
          }
        });  
      }
    },
    async mounted () {
      const records = await this.fetchRecords();
      const categories = await this.fetchCategories();

      this.tableData = records.map((rec, index) => {
        const category =  categories.find(cat => rec.categoryId === cat.id);
        return {
          id: rec.id,
          num: index + 1,
          amount: curencyFilter(rec.amount),
          date: dateFilter(new Date(rec.date)),
          category: category.title,
          type: rec.type === 'outcome' ? 'Расходы' : 'Доходы',    
        }
      });

      this.dataChart = this.createDataChart(records, categories);
      this.loadingTable = false;
    },
    components: {
      HistoryTable,
      HistoryChart
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

  .historyWrap {
    padding-bottom: 100px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>