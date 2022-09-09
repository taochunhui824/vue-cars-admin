/*
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-07 22:51:19
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-09 22:14:25
 * @FilePath: /vue-cars/vue-cars-admin/src/store/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const state = {
    isCollapse: sessionStorage.getItem('isCollapse') || false,
    token: '',
    username: localStorage.getItem('username') || ''
}
const getters = {
    isCollapse: state => state.isCollapse,
    username: state => state.username
}
const mutations = {
    setIsCollapse (state) {
        state.isCollapse = !state.isCollapse
        sessionStorage.setItem('isCollapse', state.isCollapse)
    },
    setToken(state, value) {
        state.token = value
    },
    setUsername(state, value) {
        state.username = value
    }
}


export default {
    namespaced: true,
    state,
    mutations
}
