import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Works from '@/components/Works'
import Resume from '@/components/Resume'
import Email from '@/components/Email'
import Admin from '@/components/Admin'

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
            path: '/works',
            name: 'Works',
            component: Works
        },
        {
            path: '/resume',
            name: 'Resume',
            component: Resume
        },
        {
            path: '/email',
            name: 'Email',
            component: Email
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin
        }
    ]
})
