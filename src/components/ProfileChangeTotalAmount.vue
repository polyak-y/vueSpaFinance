<template>
  <v-card>
    <v-card-title>
      <h5>Изменить сумму на расходы</h5>
    </v-card-title>

    <v-card-text class="ma-0 pb-0">
      <v-form @submit.prevent="submitHandler" id="profieBill">             
        <v-text-field
          label="Сумма для расходов"
          type="number"
          name="bill"
          v-model.lazy.number="$v.bill.$model"
          :error="(!$v.bill.required && $v.bill.$dirty) || (!$v.bill.minValue)"
          :error-messages=" 
            !$v.bill.required && $v.bill.$dirty ? ['Поле не должно быть пустым'] : 
            !$v.bill.minValue && $v.bill.$dirty ? [`Минимальное значение ${$v.bill.$params.minValue.min} рублей`]: null
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
        form="profieBill"    
      >Изменить</v-btn> 
    </v-card-actions>  
  </v-card>
</template> 

<script>
  import { required, minValue } from 'vuelidate/lib/validators';

  export default {
    data () {
      return {
        bill: null
      }
    },
    mounted () {
      this.bill = this.getTotal.bill
    },
    computed: {
      getTotal () {
        return this.$store.getters.info
      }
    },
    methods: {
      async submitHandler() {
        this.$v.$touch();       

        if(!this.$v.$invalid) {
          try {
            await this.$store.dispatch('updateInfo', {bill: this.bill});
            this.$store.dispatch('snackBarVisible', 'Данные успешно изменены!')
          } catch(e) {}          
        }     
      }
    },
    validations: {
      bill: {
        required,
        minValue: minValue(1000)           
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