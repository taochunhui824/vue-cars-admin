/*
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-03 15:30:48
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-09 22:16:15
 * @FilePath: /vue-cars/vue-cars-admin/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from "vue-router";
import Layout from '../views/Layout/index.vue'
import { useStore } from 'vuex'
const routes = [
    {
        path: "/",
        redirect: "Login",
        meta: {
            hidden: true
        }
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            hidden: true
        },
        component: () => import("../views/Login/index.vue")
    },
    {
        path: "/layout",
        name: "Layout",
        meta: {
            title: "控制台",
            icon: "console",
            iconClass: "Service",
        },
        component: Layout,
        children: [
            {
                path: "/home",
                name: "Home",
                meta: {
                    title: "首页",
                    hidden: true
                },
                component: () => import("../views/Home/index.vue"),
            }
        ]
    },
    {
        path: "/info",
        name: "Info",
        meta: {
            title: "信息管理",
            icon: "console",
            iconClass: "ChatDotSquare",
        },
        component: Layout,
        children: [
            {
                path: "/infoIndex",
                name: "InfoIndex",
                meta: {
                    title: "信息列表",
                    hidden: true
                },
                component: () => import("../views/Info/index.vue"),
            },{
                path: "/infoCategoty",
                name: "InfoCategoty",
                meta: {
                    title: "信息分类",
                    hidden: true
                },
                component: () => import("../views/Info/category.vue"),
            }
        ]
    },
    {
        path: "/user",
        name: "User",
        meta: {
            title: "用户管理",
            icon: "console",
            iconClass: "User",
        },
        component: Layout,
        children: [
            {
                path: "/userIndex",
                name: "UserIndex",
                meta: {
                    title: "用户列表",
                    hidden: true
                },
                component: () => import("../views/User/index.vue"),
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const store = useStore()

//路由守卫，跳转前获取token，存在即跳转，否则就返回登陆
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if(!token && to.path !== '/login') {
        next('/login')
    } else {
        if(to.path === '/login'){
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            store.commit('nav/setToken', '')
            store.commit('nav/setUsername', '')
            next()
        }else{
            next()
        }
    }
})

export default router;
