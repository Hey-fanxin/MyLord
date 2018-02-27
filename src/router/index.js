import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Page1 from '@/components/Page1'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
            path: '/page1',
            name: 'page1',
            component: Page1
        }
    ]
})
