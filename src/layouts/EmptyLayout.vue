<template>  
  <v-container class="fill-height myContainer" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <transition appear mode="out-in">
          <router-view></router-view>
        </transition>
      </v-col>
    </v-row>
  </v-container> 
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  .myContainer {
    background: url('../assets/korp.jpg') no-repeat;
    background-size: cover;
  }

 .v-enter-active, .v-leave-active {
    transition: opacity .5s;
  }

  .v-enter, .v-leave-to {
    opacity: 0;
  }


</style>