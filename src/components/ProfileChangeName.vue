<template>
  <v-card>
    <v-card-title>
      <h5>Изменить имя</h5>
    </v-card-title>
    <v-card-text class="ma-0 pb-0">
      <v-form @submit.prevent="submitHandler" id="profileEdit">             
        <v-text-field
          label="Имя"
          name="name"
          v-model.lazy="$v.name.$model"
          :error="!$v.name.required && $v.name.$dirty"
          :error-messages=" 
            !$v.name.required && $v.name.$dirty ? ['Поле не должно быть пустым'] : null
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
        form="profileEdit"    
      >Изменить</v-btn> 
    </v-card-actions>  
  </v-card>
</template> 

<script>
  import { required } from 'vuelidate/lib/validators';

  export default {
    data () {
      return {
        name: ''
      }
    },
    mounted () {
      this.name = this.getName.name
    },
    computed: {
      getName () {
        return this.$store.getters.info
      }
    },
    methods: {
      async submitHandler() {
        this.$v.$touch();       

        if(!this.$v.$invalid) {
          try {
            await this.$store.dispatch('updateInfo', {name: this.name});
            this.$store.dispatch('snackBarVisible', 'Данные успешно изменены!')
          } catch(e) {}          
        }     
      }
    },
    validations: {
      name: {
        required           
      }     
    }
  }
</script>

<style lang="scss" scoped>

  .myButton {
    text-transform: none;
    letter-spacing: 0.5px;
  }

</style>