<template>
  <v-flex xs9 offset-xs3>
      <v-layout>
          <token-config></token-config>
          <page-config></page-config>
      </v-layout>   
  </v-flex>
  
</template>
<script>
import TokenConfig from './TokenConfig'
import PageConfig from './PageConfig'
  export default {
      components : {PageConfig,TokenConfig},
    data () {
        return {}
    }
  }
</script>