<template>
  <div class="wrapTable">
    <v-data-table
      :page.sync="page"
      :headers="headers"
      :items="tableData"
      :items-per-page="5"
      class="elevation-1"
      loading-text="Загрузка данных, подождите..."
      no-data-text="Отсутствуют данные"
      :footer-props="{      
        itemsPerPageOptions: [5, 10, 15],
      }"
     :show-current-page="true"
    >
      <template v-slot:item.type="{ item }">
        <span 
          class="typeText" 
          :class="{
            'redText': item.type === 'Расходы',
            'greenText': item.type === 'Доходы',
          }"
        >{{ item.type }}</span>
      </template>
      
      <template v-slot:item.open="{ item }">
         <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn text icon color="gray"  v-on="on" @click="clickHandler(item)">
                <v-icon>mdi-open-in-new </v-icon>
              </v-btn>
            </template>
            <span>Подробнее</span>
          </v-tooltip>          
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: 'HistoryTable', 
    props: ['tableData'], 
    data: () => ({
      page: null,
      headers: [
        { text: '#', sortable: false, value: 'num' },
        { text: 'Сумма', sortable: false, value: 'amount' },
        { text: 'Дата', sortable: false, value: 'date' },
        { text: 'Категория', sortable: false, value: 'category' },
        { text: 'Тип', sortable: false, value: 'type' },
        { text: 'Открыть', align: 'center', sortable: false, value: 'open' },          
      ],
    }),
    methods: {
      clickHandler (item) {
        this.$router.push(`/detail/${item.id}`);
      }
    },
    watch: {     
      page (value) {
        if(+this.$route.query.page !== this.page) {
          this.$router.push(`${this.$route.path}?page=${value}`);
        }       
      }
    },
    mounted () {
      this.page = +this.$route.query.page || 1;
    }
  }
</script>

<style lang="scss">

  .typeText {
    font-weight: bold;
    font-size: 15px;
  }

  .redText {
    color: rgb(177, 10, 10);
  }
 
  .greenText {
    color: rgb(17, 179, 17);
  }

  .wrapTable {
    table {
      thead {
        tr {
          th {
            background: #512DA8;
            color: #fff!important;
          }
        }
      }
    }
    
  }
</style>