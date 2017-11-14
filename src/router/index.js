import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Config from '../components/Config'
import Spy from '../components/Spy'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path : "/spy",
      name : "Spy",
      component : Spy
    },
    {
      path : '/config',
      name : 'Config',
      component : Config
    },
    {path : '*', redirect : '/home'}
  ],
  mode: 'history',
})
