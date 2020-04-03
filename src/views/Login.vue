<template>  
  <v-card class="elevation-5">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title class="toolBarTitle">
        <img src="../assets/accountant.svg" alt="" class="imgTitle">
        <span>Домашняя бухгалтерия</span>
      </v-toolbar-title>      
    </v-toolbar>

    <v-card-text class="ma-0 pb-0">
      <v-form @submit.prevent="submitHandler" id="formLogin">
        <v-text-field
          label="Email"
          name="email"
          prepend-icon="mdi-account"
          type="email"
          v-model.lazy="$v.email.$model"
          :error="!$v.email.required && $v.email.$dirty"
          :error-messages="
            !$v.email.required && $v.email.$dirty ? 'Поле не должно быть пустым!' : 
            !$v.email.email ? ['Неккоректный email'] : null
          "
        />

        <v-text-field
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          label="Пароль"
          name="password"
          prepend-icon="mdi-lock"
          :type="show ? 'text' : 'password'"
          v-model.lazy="$v.password.$model"
          :error="!$v.password.minLength && $v.password.$dirty"
          :error-messages=" 
            !$v.password.required && $v.password.$dirty ? ['Поле не должно быть пустым'] : 
            !$v.password.minLength ? [`Минимальная длинна пароля ${$v.password.$params.minLength.min} символов`] : null
          "
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn 
        color="primary" 
        class="myButton"  
        type="submit"
        form="formLogin"   
        :loading="loading"    
        :disabled="loading"
      >Войти</v-btn>
    </v-card-actions>

    <v-card-actions class="pt-0">
      <v-spacer></v-spacer>
      <span>Нет аккауната?</span>  
      <v-btn 
        text
        color="primary" 
        to="/register" 
        class="myButtonReg"       
      >Зарегистрироваться</v-btn>
    </v-card-actions>
  </v-card> 
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import messages from '../utils/messages';

export default {
  name: 'login',
  metaInfo () {
    return {
      title: 'Вход'
    }
  },
  data: () => ({
    email: '',
    password: '',
    show: false,
    loading: false
  }),
  mounted() {
    if(messages[this.$route.query.message]) {
      this.$store.dispatch('snackBarVisible', messages[this.$route.query.message])
    }
  }, 
  methods: {
    submitHandler() {
      this.$v.$touch();

      if(!this.$v.$invalid) {
        this.loading = true;

        const formData = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('login', formData)
          .then(() => {
            this.$router.push('/');
          })
          .catch(err => {
            console.log('Ошибка входа')
          })   
          .finally(() => {
            this.loading = false
          })      
      }     
    }
  },
  validations: {
    email: {
      required,
      email   
    },
    password: {
      required,
      minLength: minLength(7)
    }
  }
}
</script>

<style lang="scss" scoped>
  .imgTitle {
    height: 45px;
    width: auto;
  }

  .toolBarTitle {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }

  .myButton {
    text-transform: none;
    letter-spacing: 0.5px;
    width: 120px;
  }

  .myButtonReg {
    text-transform: none;
    letter-spacing: 0.5px;
  }
</style>