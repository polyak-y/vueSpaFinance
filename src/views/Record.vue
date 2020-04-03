<template>
  <v-container fluid>
    <v-divider></v-divider>
    <v-row class="vp_countTitle">
      <v-col 
        cols="12" 
        md="12"
        class="d-flex align-center title"        
      >
        <h2>Новая запись</h2>
      </v-col>      
    </v-row>
    <v-divider></v-divider>
    
    <transition name="fade" mode="out-in">
      <Loader v-if="loading" />

      <v-row v-else> 
        <v-col cols="12" md="8">
          
            <p v-if="!categories.length" class="noCategory" key="empty">
              Категории отсутствуют
              <v-btn 
                color="#fff"
                outlined
                class="myButtonNoCategory mt-2" 
                text 
                to="/categories">Добавить</v-btn>
            </p>

            <v-card
              key="card"
              v-else
              color="blueColor" 
              dark
              height="100%"
              :loading="loading ? '#fff' : null"
            >
              <v-card-title>
                <h3 class="vp_h3">Добавление новой записи</h3>
              </v-card-title>
              <v-card-text class="ma-0 pb-0">
                <v-form @submit.prevent="submitHandler" id="recordForm">
                  <v-select
                    :items="getCategories"
                    :disabled="loading"
                    label="Выберите категорию" 
                    v-model="categorySelect"     
                    :error-messages="
                      !$v.categorySelect.required && $v.categorySelect.$dirty ? ['Поле не должно быть пустым'] : null
                    "
                  ></v-select>

                  <v-radio-group 
                    v-model="type" 
                    dense
                  >
                    <v-radio   
                      label="Доход"
                      :ripple="false"
                      value="income"
                      class="mb-7"
                    ></v-radio>
                    
                    <v-radio          
                      label="Расход"
                      value="outcome"
                      :ripple="false"
                      class="mb-2"
                    ></v-radio>
                  </v-radio-group>
    
                  <v-text-field
                    label="Сумма"
                    type="number"
                    :disabled="loading" 
                    name="amount"
                    v-model.lazy.number="$v.amount.$model"
                    :error="(!$v.amount.required && $v.amount.$dirty) || (!$v.amount.minValue)"
                    :error-messages=" 
                      !$v.amount.required && $v.amount.$dirty ? ['Поле не должно быть пустым'] : 
                      !$v.amount.minValue && $v.amount.$dirty ? [`Минимальное значение ${$v.amount.$params.minValue.min} рубль`]: null
                    "
                  />   

                  <v-text-field
                    label="Описание"
                    name="description"
                    v-model.lazy="$v.description.$model"
                    :error="!$v.description.required && $v.description.$dirty"
                    :error-messages="
                      !$v.description.required && $v.description.$dirty ? ['Поле не должно быть пустым!'] : null
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
                  form="recordForm"    
                >Создать</v-btn> 
              </v-card-actions>  
            </v-card>
          
        </v-col>
      </v-row>    
    </transition>
  </v-container>
</template>

<script>
  import { required, minValue } from 'vuelidate/lib/validators';
  import { mapGetters } from 'vuex';

  export default {
    name: 'record',
    metaInfo () {      
      return {
        title: 'Новая запись'
      }      
    },
    data: () => ({
      loading: true,
      categorySelect: '',
      categories: [],
      amount: 1,
      description: '',
      type: 'outcome'
    }),
     computed: {
      ...mapGetters([
         'info'
      ]),
      getCategories () {
        return this.categories.map(({ title, id }) => {
          return {
            text: title,
            value: id
          }
        })
      },
      canCreateRecord() {
        if(this.type === 'income') return true;
        return this.info.bill >= this.amount;
      }
    },
    methods: {
       async submitHandler() {
        this.$v.$touch();

        if(!this.$v.$invalid) {
          if(this.canCreateRecord) {
            try {
              await this.$store.dispatch('createRecord', {
                categoryId: this.categorySelect,
                amount: this.amount,
                description: this.description,
                type: this.type,
                date: new Date().toJSON()
              })  

              const bill = this.type === 'income' 
                ? this.info.bill + this.amount
                : this.info.bill - this.amount;
              
              await this.$store.dispatch('updateInfo', {bill});
   
              this.categorySelect = '';
              this.amount = 1;
              this.description = '';
              this.type = 'outcome';
              
              this.$v.$reset();
              this.$store.dispatch('snackBarVisible', 'Запись успешно создана!')
              
            } catch(e) {}
                     
          } else {
            this.$store.dispatch('snackBarVisible', `На счете недостаточно ${this.amount - this.info.bill} рублей`)
          }
        }     
      }
    },
    validations: {
      categorySelect: {
        required           
      },
      description: {
        required
      },
      amount: {
        required,
        minValue: minValue(1)
      }
    },
    async mounted () {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
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

  .vp_h3 {
    color: #fff;
    font-size: 18px;
    font-weight: normal;
  }

  .myButton {
    text-transform: none;
    letter-spacing: 0.5px;
  }
 
  .myButtonNoCategory {
    text-transform: none;
    letter-spacing: 0.5px;
    font-size: 18px;
    font-weight: normal;
  }

  .noCategory {
    font-size: 20px;
    min-height: 200px;
    margin-bottom: 0;    
    background: #00838f;
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