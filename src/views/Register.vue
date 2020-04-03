<template>  
  <v-card class="elevation-5">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title  class="toolBarTitle">
        <img src="../assets/accountant.svg" alt="" class="imgTitle">
        <span>Домашняя бухгалтерия</span>
      </v-toolbar-title>      
    </v-toolbar>

    <v-card-text class="pb-0 ma-0">
      <v-form id="registerForm" @submit.prevent="submitHandler"> 
        <v-text-field
          label="Имя"
          name="name"
          prepend-icon="mdi-account"
          v-model.lazy="$v.name.$model"
          :error="!$v.name.required && $v.name.$dirty"
          :error-messages="!$v.name.required && $v.name.$dirty ? 'Поле не должно быть пустым!' : null"
          type="text"
        />
        
        <v-text-field
          label="Email"
          name="email"
          prepend-icon="mdi-at"
          v-model.lazy="$v.email.$model"
          :error="!$v.email.required && $v.email.$dirty"
          :error-messages="
            !$v.email.required && $v.email.$dirty ? 'Поле не должно быть пустым!' : 
            !$v.email.email ? ['Неккоректный email'] : null
          "
          type="text"
        />

        <v-text-field     
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"    
          label="Пароль"
          name="password"
          prepend-icon="mdi-lock"
          :type="showPassword ? 'text' : 'password'"
          v-model.lazy="$v.password.$model"
          :error="!$v.password.minLength && $v.password.$dirty"
          :error-messages=" 
            !$v.password.required && $v.password.$dirty ? ['Поле не должно быть пустым'] : 
            !$v.password.minLength ? [`Минимальная длинна пароля ${$v.password.$params.minLength.min} символов`] : null
          "
        />
        
        <v-text-field
          :append-icon="showPasswordRepeat ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPasswordRepeat = !showPasswordRepeat"    
          label="Повторите пароль"
          name="repeatPassword"
          v-model.lazy="$v.repeatPassword.$model"
          prepend-icon="mdi-lock"
           :type="showPasswordRepeat ? 'text' : 'password'"
          :error="!$v.repeatPassword.sameAsPassword && $v.repeatPassword.$dirty"
          :error-messages="!$v.repeatPassword.sameAsPassword && $v.repeatPassword.$dirty ? ['Пароли не совпадают'] : null"
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn 
      :loading="loading"
      :disabled="loading"
      form="registerForm" 
      color="primary" 
      type="submit"
      class="myButton">Регистрация</v-btn>
    </v-card-actions>

     <v-card-actions class="pt-0">
      <v-spacer></v-spacer>
      <span class="mr-2">Уже есть аккаунт?</span>  
      <v-btn 
        text
        color="primary" 
        to="/login" 
        class="myButtonReg"
      >Войти</v-btn>
    </v-card-actions>
  </v-card> 
</template>

<script>
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'
 
export default {
  name: 'register',
  metaInfo () {  
    return {
      title: 'Регистрация'
    }      
  },
  data: () => ({
    email: '',
    name: '',
    password: '',
    repeatPassword: '',
    showPassword: false,
    showPasswordRepeat: false,
    loading: false,
  }),
   methods: {
    submitHandler() {
      this.$v.$touch();
      if(!this.$v.$invalid) {
        this.loading = true;

        const formData = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('register', formData)
          .then(() => {
            this.$router.push('/')
            this.loading = false;
          })
          .catch(err => this.loading = false);        
      }     
    }
  },
  validations: {
    email: {
      required,
      email      
    },
    name: {
      required
    },
    password: {
      required,
      minLength: minLength(7)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
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