import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const group = r => require.ensure([], () => r(require('@/pages/Groups.vue')), 'group')
const privates = r => require.ensure([], () => r(require('@/pages/Private.vue')), 'private')

export default new Router({
  routes: [
    {
      path: '/group',
      name: 'group',
      component: group
    },
    {
      path: '/privates',
      name: 'privates',
      component: privates
    }
  ]
})