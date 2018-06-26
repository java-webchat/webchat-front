import Vue from 'vue'
import Router from 'vue-router'

import {getCookie} from '../util/util'

import  Page404 from '../views/page404'
import Login from  '../views/user/Login'
import Register from  '../views/user/Register'
import Home from  '../views/Home'
import Index from  '../views/index'
import ChatRoom from  '../views/chat/ChatRoom'
import Robot from  '../views/chat/Robot'

 
Vue.use(Router)


/*
懒加载
export default new Router({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: 'index',
            component: resolve => require(['../views/ArticleList'], resolve),
            nee
        },
        {
            path: '/detail',
            name: 'detail',
            component: resolve => require(['../views/ArticleDetail'], resolve)  ,
            meta: {
                scrollToTop: true
            }
        },
        {
            path: '*',
            name: 'page404',
            component: resolve => require(['../views/page404.vue'], resolve)
        }

    ]
})
*/

const routes = [
    {
        path: '*',
        name: 'Index',
        component: Index,
        meta: {
            requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },

    {
        path : '/login',
        name : 'Login',
        component : Login,
        meta: {
            requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path : '/register',
        name : 'Register',
        component : Register,
        meta: {
            requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path : '/home',
        name : 'Home',
        component : Home,
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path : '/chatroom',
        name : 'ChatRoom',
        component : ChatRoom,
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path : '/robot',
        name : 'Robot',
        component : Robot,
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
];



const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (getCookie('ACCESS_TOKEN')) {
            next();
        } else {
            next({
                path: '/index',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        next();
    }
})

export default router;