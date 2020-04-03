<template>
  <v-card
    color="blueColor" 
    dark
    height="100%"
    class="myCard"
  >

    <v-card-title>
      <h3 class="vp_h3">Создать новую категорию</h3>
    </v-card-title> 

    <v-card-text class="ma-0 pb-0">
      <v-form @submit.prevent="submitHandler" id=formCategoryCreate>
        <v-text-field
          label="Название"
          name="title"
          type="text"
          v-model.lazy="$v.title.$model"
          :error="!$v.title.required && $v.title.$dirty"
          :error-messages="
            !$v.title.required && $v.title.$dirty ? ['Поле не должно быть пустым!'] : null
          "
        />

        <v-text-field
          label="Лимит"
          type="number"
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

    <v-card-actions class="bottomBlockCard">
      <v-spacer></v-spacer>
      <v-btn 
        text         
        class="myButton"  
        type="submit"
        form="formCategoryCreate"  
      >Создать</v-btn>
    </v-card-actions>  
  </v-card> 
</template>

<script>
  import { required, minValue } from 'vuelidate/lib/validators';

  export default {
    data: () => ({
      title: '',
      limit: 100,
    }),

    methods: {
      submitHandler() {
        this.$v.$touch();
        if(!this.$v.$invalid) {
          this.$store.dispatch('createCategory', {
            title: this.title,
            limit: this.limit
          })
          .then(category => {
            this.title = "";
            this.limit = 100;
            this.$v.$reset();
            this.$store.dispatch('snackBarVisible', 'Категория была создана!');
            this.$emit('created', category)
          })
          .catch(e => {})          
        }     
      }
    },
    validations: {
      title: {
        required,
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

  .myCard {
    display: flex;
    flex-direction: column;
  }

  .bottomBlockCard {
    margin-top: auto;
  }

  .myButton {
    text-transform: none;
    letter-spacing: 0.5px;
  }
</style>