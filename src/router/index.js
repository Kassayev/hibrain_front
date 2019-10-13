import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import getter from '@/components/getEmployees'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/get',
      component: getter
    }
  ]
})
