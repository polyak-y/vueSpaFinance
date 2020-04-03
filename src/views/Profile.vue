<template>
  <v-container fluid>
    <v-divider></v-divider>
    <v-row class="vp_countTitle">
      <v-col 
        cols="12" 
        md="12"
        class="d-flex align-center title"        
      >
        <h2>Профиль</h2>
      </v-col>      
    </v-row>
    <v-divider></v-divider>

    <v-row>
      <v-col cols="12" md="4">
        <ProfileChangeName />
      </v-col>
      
      <v-col cols="12" md="4">
        <ProfileChangeTotalAmount />
      </v-col>
      
      <v-col cols="12" md="4">
        <ProfileDelete />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import ProfileChangeName from '../components/ProfileChangeName';
  import ProfileChangeTotalAmount from '../components/ProfileChangeTotalAmount';
  import ProfileDelete from '../components/ProfileDelete';

  export default {
    name: 'profile',
    metaInfo () {
      return {
        title: 'Профиль'
      }      
    },
    components: {
      ProfileChangeName,
      ProfileChangeTotalAmount,
      ProfileDelete
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
</style>