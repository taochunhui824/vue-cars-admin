/*
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-03 15:30:48
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-03 15:55:26
 * @FilePath: /vue-cars/vue-cars-admin/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "login"
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import("../views/Login/index.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
