/*
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-03 19:56:48
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-04 12:42:16
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
    timeout: 15000,
    headers: {
        'content-Type': 'application/json;charset=utf-8'
    }
})
//请求拦截
service.interceptors.request.use((config)=>{
    return config
})
//响应拦截
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