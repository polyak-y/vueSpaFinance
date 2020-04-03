<template>
  <v-navigation-drawer
    :value="drawer"
    app
    clipped
    :mini-variant.sync="miniProps" 
    permanent
  >
      <v-list>
        <template v-for="(link, ind) in links">     
           <v-tooltip right :key="ind" :disabled="!miniProps" color="#000">  
              <template v-slot:activator="{ on }">
                <v-list-item 
                  v-on="on"     
                  link 
                  :to="link.url"
                  exact-active-class="active"
                  exact
                  @click.stop="$emit('miniHandler')"
                >
                  <v-list-item-action>
                    <v-icon>{{ link.icon }}</v-icon>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>{{ link.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <span>{{ link.title }}</span>
           </v-tooltip>
        </template>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    props: ['drawer', 'mini'],
    data: () => ({
      links: [
        { title: 'Счет', url: '/', icon: 'mdi-cash-usd-outline' },
        { title: 'История', url: '/history', icon: 'mdi-history' },
        { title: 'Планирование', url: '/planning', icon: 'mdi-account-cash-outline' },
        { title: 'Новая запись', url: '/record', icon: 'mdi-record-rec' },
        { title: 'Категория', url: '/categories', icon: 'mdi-shape-outline' },
      ]
    }),
    computed: {
      miniProps() {
        return this.mini
      }
    }
  }
</script>