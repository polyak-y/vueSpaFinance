<template>
  <v-card
    :color="record.type === 'income' 
      ? 'green lighten-5' 
      : 'deep-orange lighten-5'"
  >
    <v-card-title>
      {{record.type === 'income' ? 'Доход' : 'Расход'}}
    </v-card-title>
    <v-card-text>
      <div class="py-3 text--primary">
        <strong>Описание: </strong>
        <span>{{ record.description }}</span>
      </div>
      <v-divider></v-divider>
      <div class="py-3 text--primary">
        <strong>Сумма: </strong>
        <span>{{ record.amount | myCurrencyFilter }}</span>
      </div>
      <v-divider></v-divider>
      <div class="py-3 text--primary">
        <strong>Категория: </strong>
        <span>{{ record.categoryName }}</span>
      </div>
      <v-divider></v-divider>
      <div class="py-3 text--primary">
        <strong>Дата: </strong>
        <span>{{ new Date(record.date) | myDate }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CardDetail',
  props: {
    record: Object
  }
}
</script>