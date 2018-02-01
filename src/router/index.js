import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const top = r => require.ensure([], () => r(require('@/components/Top.vue')), 'top')
const group = r => require.ensure([], () => r(require('@/pages/Groups.vue')), 'group')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'top',
      component: top
    },
    {
      path: '/group',
      name: 'group',
      component: group
    }
  ]
})