<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="wrapBread pl-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>

      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :to="item.to"
          :disabled="item.disabled"
        > 
          <span class="textBread">{{ item.text }}</span>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
  export default {
    name: 'breadcrumbs',
    props: {
      breadcrumbs: Array
    }
  }
</script>