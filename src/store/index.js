/*
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-07 22:51:19
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-09 21:06:11
 * @FilePath: /vue-cars/vue-cars-admin/src/store/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createStore } from 'vuex';
import nav from './nav'

export default createStore({
    modules: {
        nav
    },
});
