<template>
  <v-container fluid>
    <v-divider></v-divider>
    <v-row class="vp_countTitle">
      <v-col 
        cols="12" 
        md="12"
        class="d-flex align-center title"        
      >
        <h2>Категории</h2>
      </v-col>      
    </v-row>
    <v-divider></v-divider>
    <transition name="fade" mode="out-in">
      <Loader v-if="loading" />

      <v-row v-else>
        <v-col cols="12" md="6">
          <CategoryCreate 
            @created="addNewCategory" 
          />
        </v-col>

        <v-col cols="12" md="6">
          <p v-if="!loading && !categories.length" class="addCategory">Добавьте категорию!</p>

          <CategoryEdit 
            v-else
            @editCategory="editCategory"
            :categories="categories" 
            :loadingData="loading" 
          />
          
        </v-col>
      </v-row>
    </transition>
  </v-container>  
</template>

<script>
  import CategoryCreate from '../components/CategoryCreate';
  import CategoryEdit from '../components/CategoryEdit';

  export default {
    name: 'categories',
    metaInfo () {
      return {
        title: 'Категории'
      }      
    },
    data: () => ({
      categories: [],
      loading: true
    }),
    components: {
      CategoryCreate,
      CategoryEdit
    },
    methods: {
      addNewCategory (category) {
        this.categories.push(category);      
      },
      editCategory (newCat) {
        const findCategory = this.categories.find(cat => cat.id === newCat.id);
        findCategory.limit = newCat.limit;
        if (newCat.title ) findCategory.title = newCat.title;   
      }
    },
    async mounted () {
      this.categories = await this.$store.dispatch('fetchCategories'); 
      this.loading = false;
    },
  
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

  .addCategory {
    font-family: 'MODDigitalStripCyrillicBold';
    font-size: 15px;
    margin-bottom: 0;    
    background: #00838f;
    color: #fff;
    height: 100%;
    display: flex;
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