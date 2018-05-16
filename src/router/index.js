import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Works from '@/components/Works'
import Resume from '@/components/Resume'
import Collect from '@/components/Collect'
import Admin from '@/components/Admin'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NotFoundComponent from '@/components/NotFoundComponent'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        { path: '/works',    name: 'Works',             component: Works},
        { path: '/resume',   name: 'Resume',            component: Resume},
        { path: '/collect',  name: 'Collect',           component: Collect},
        { path: '/login',    name: 'Login',             component: Login},
        { path: '/register', name: 'Register',          component: Register},
        { path: '/admin',    name: 'Admin',             component: Admin},
        { path: '*',         name: 'NotFoundComponent', component: NotFoundComponent}
    ]
})
