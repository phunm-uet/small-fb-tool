
<template>
  <v-app id="app">
    <nagigation></nagigation>
    <toolbar></toolbar>
    <main>
      <v-content>
        <v-container fluid fill-height>
          <v-layout>
            <router-view/>
          </v-layout>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>

import Toolbar from './components/common/Toolbar'
import Nagigation from './components/common/Navigation'
  export default {
    name: 'app',
    components : {Toolbar,Nagigation},
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
