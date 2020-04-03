<template>
  <div class="wrapCard">
    <v-card>
      <v-card-title>
        <h5>Удаление категорий и профиля</h5>
      </v-card-title> 

      <v-card-actions>
        <v-btn 
          class="myButton"
          color="light-blue darken-3"
          dark
          @click="buttonHandler('deleteCategories')"
        >Удалить все категории</v-btn> 
        
        <v-btn 
          class="myButton"
          color="error"
          @click="buttonHandler('deleteProfile')"
        >Удалить профиль</v-btn> 
      </v-card-actions>  
    </v-card>

    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">Вы действительно хотите удалить {{ getNameDelete }}?</v-card-title>

        <v-card-text>
          {{ msg }}          
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            class="myButtonDialog"
            @click="dialog = false"
          >
            Отмена
          </v-btn>

          <v-btn
            color="error"
            text
            class="myButtonDialog"
            @click="deleteHandler"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template> 

<script>
export default {
  data () {
    return {
      dialog: false,
      nameButton: '',    
    }
  },
  computed: {
    getNameDelete () {
      return this.nameButton === 'deleteCategories' ? 'категории' : 'профиль';
    },
    msg () {
      return this.nameButton === 'deleteCategories' 
        ? 'В случае удаления всех категорий, также будут  удалены и все записи по данным категориям!' 
        : 'В случае удаления профиля, все данные по профилю также будут удалены. Восстновление профиля после его удаления невозможно!';
    }
  },
  methods: {
    buttonHandler (name) {      
      this.nameButton = name
      this.dialog = true;      
    },
    deleteHandler () {
      if (this.nameButton === 'deleteCategories') {
        this.deleteCategories();
      } else {
        this.deleteProfile();
      }
    },
    async deleteCategories () {
      try {
        await this.$store.dispatch('deleteAllCategory');
        this.$store.dispatch('snackBarVisible', 'Категории и записи удалены')
        this.dialog = false;   
      } catch(e) {}
      
    },
    async deleteProfile () {
      try {
        await this.$store.dispatch('deleteProfile');
        this.$router.push('/login');
        this.$store.dispatch('snackBarVisible', 'Профиль удален!')
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss" scoped>

  .myButton {
    width: calc(50% - 5px);
    text-transform: none;
    letter-spacing: 0.5px;
  }

  .myButtonDialog {
    text-transform: none;
    letter-spacing: 0.5px;
  }

  .headline {
    font-size: 18px!important;
  }

</style>