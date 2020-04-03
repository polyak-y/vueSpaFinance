<template>
  <v-card
    color="cyan darken-3" 
    dark
    height="100%"
    :loading="loadingData ? '#fff' : null"
  >

    <v-card-title>
      <h3 class="vp_h3">Редактировать категорию</h3>
    </v-card-title>

    <v-card-text class="ma-0 pb-0">
      <v-form @submit.prevent="submitHandler" id="categoryEdit">
         <v-select
          :items="getCategories"
          :disabled="loadingData"
          label="Выберите категорию" 
          v-model="category"     
          @change="changeHandler"
          :error-messages="
            !$v.category.required && $v.category.$dirty ? ['Поле не должно быть пустым'] : null
          "
        ></v-select>

        <v-text-field
          label="Новое название (необязательно)"
          :disabled="loadingData" 
          name="title"
          v-model.lazy="title"        
        />        
        
        <v-text-field
          label="Лимит"
          type="number"
          :disabled="loadingData" 
          name="limit"
          v-model.lazy.number="$v.limit.$model"
          :error="(!$v.limit.required && $v.limit.$dirty) || (!$v.limit.minValue)"
          :error-messages=" 
            !$v.limit.required && $v.limit.$dirty ? ['Поле не должно быть пустым'] : 
            !$v.limit.minValue && $v.limit.$dirty ? [`Минимальное значение ${$v.limit.$params.minValue.min} рублей`]: null
          "
        />        
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn 
        class="myButton"
        text  
        type="submit"
        form="categoryEdit"    
      >Обновить</v-btn> 
    </v-card-actions>  
  </v-card> 
</template>

<script>
  import { required, minValue } from 'vuelidate/lib/validators';

  export default {
    props: ['loadingData', 'categories'],
    data: () => ({
      items: [],
      title: '',
      category: '',
      limit: '', 
    }),
    computed: {
      getCategories () {
        return this.categories.map(({ title, id }) => {
          return {
            text: title,
            value: id
          }
        })
      }
    },
    methods: {
      changeHandler () {
        const findCat = this.categories.find(elem => elem.id === this.category);
        this.limit = findCat.limit;
        this.title = findCat.title;
      },
      async submitHandler() {
        this.$v.$touch();

        if(!this.$v.$invalid) {

          try {
            await this.$store.dispatch('categoryUpdate', {
              idCategory: this.category, 
              limit: this.limit,
              title: this.title
            });

            const editCategory = {
              id: this.category,
              limit: this.limit,
              title: this.title
            }
            
            this.$emit('editCategory', editCategory)

            this.$v.$reset();
            this.category = "";
            this.limit = "";
            this.title = "";            

            this.$store.dispatch('snackBarVisible', 'Категория обновлена');
          } catch (e) {}           
        }     
      }
    },
    validations: {
      category: {
        required           
      },
      limit: {
        required,
        minValue: minValue(100)
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

  .myButton {
    text-transform: none;
    letter-spacing: 0.5px;
  }
</style>