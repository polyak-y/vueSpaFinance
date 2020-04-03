<template>
  <div>
    <h2 class="header">Страница не найдена!</h2>
    <img src="../assets/page-not-found.svg" alt="">
    <p class="btnWrap">
      <v-btn 
        class="myButton"
        outlined
        text to="/"
        color="secondary"
      >На главную</v-btn>
    </p>    
  </div>
</template>

<script>
export default {
  name: 'notFound',
  metaInfo () {  
    return {
      title: 'Page 404'
    }    
  },
}
</script>

<style lang="scss" scoped>
  .header {
    font-family: 'MODDigitalStripCyrillicBold';
    font-weight: 500;
    font-size: 35px;
    text-align: center;
    color: #382D71;
  }

  .myButton {
    border: 1px solid #E45D9D!important;
  }

  .btnWrap {
    text-align: center;
  }
</style>