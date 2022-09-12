/*
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-03 19:56:48
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-10 20:22:27
 * @FilePath: /vue-cars/vue-cars-admin/src/utils/request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import axios from 'axios'
import { ElMessage } from 'element-plus'

// const BASEURL = process.env.NODE_ENV === 'prroduction' ? '' : '/devApi'
//创建axios实例
const service = axios.create({
    // process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SRC1 : process.env.VUE_APP_BASE_API1,
    baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SRC1 : process.env.VUE_APP_BASE_API1,
    timeout: 15000
})
//请求拦截-请求接口前，做一些数据处理
service.interceptors.request.use((config)=>{
    //在发送请求前做些什么
    config.headers['Content-Type'] = 'application/json; charset=UTF-8'
    config.headers['ToKen'] = localStorage.getItem('token')
    config.headers['UserName'] = localStorage.getItem('username')
    return config
})
//响应拦截-请求接口后，返回数据进行拦截
service.interceptors.response.use((res)=>{
    //对响应数据做点什么
    let data = res.data
    if(data.resCode != 0){
        ElMessage({
            type: 'error',
            message: data.message
        })
        return Promise.reject(data)
    }else {
        // return Promise.resolve(data)
        return data
    }
},(err)=>{
    //对响应错误做点什么
    return Promise.reject(err)
})

export default service