<template>
  <v-container fluid>
    <v-divider></v-divider>
    <v-row class="vp_countTitle">
      <v-col 
        cols="12" 
        md="12"
        class="d-flex align-center title"        
      >
        <h2>Детали</h2>
      </v-col>      
    </v-row>
    <v-divider></v-divider>
    <transition name="fade" mode="out-in">
      <Loader v-if="loading" />

      <div v-else-if="!loading && !record" class="noRecord elevation-3 mt-5">
        Записи c id <strong>{{ $route.params.id }}</strong> не существует
      </div>

      <v-row v-else>
        <v-col cols="12" md="6">     
          <Breadcrumbs :breadcrumbs="breadcrumbs" />
          <CardDetail :record="record"/>       
        </v-col>
      </v-row> 
    </transition>
  </v-container>
</template>

<script>
  import Breadcrumbs from '../components/Breadcrumbs';
  import CardDetail from '../components/CardDetail';

  export default {
    name: 'detail',
    metaInfo () {
      return {
        title: 'Детали'
      }  
    },
    data: () => ({      
      record: null,
      loading: true,
      breadcrumbs: [],
    }),
    components: {
      Breadcrumbs,
      CardDetail
    },
    async mounted () {
      const record = await this.$store.dispatch('fetchRecordById', this.$route.params['id']);
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);
      
      this.record = {
        ...record,
        categoryName: category.title
      }

      this.breadcrumbs = [
        {
          text: 'История',
          disabled: false,
          to: '/history',
        },  
        {
          text: this.record.type === 'income' ? 'доход' : 'расход',
        },
      ];

      this.loading = false;
    }
  }
</script>

<style lang="scss">
  .vp_countTitle {
    .title {
      background: rgba(255, 255, 255, .8);

      h2 {
        font-size: 27px;
      }
    }   
  }

  .noRecord {
    height: 200px;
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: pre;
  }

  .wrapBread {
    
    .v-breadcrumbs__divider {
      padding-left: 3px!important;
      padding-right: 3px!important;
      margin-bottom: -3px;
    }
  }

  .textBread {
    font-weight: bold;
    font-size: 17px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
