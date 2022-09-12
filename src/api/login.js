/*
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-03 19:51:15
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-10 20:25:36
 * @FilePath: /vue-cars/vue-cars-admin/src/api/login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from "@/utils/request";
/**
 * @description 获取验证码
*/
export function GetSms(data){
    return service({
        url: '/getSms/',
        method: 'post',
        data
    })
}
/**
 * 注册
*/
export function Register(data){
    return service({
        url: '/register/',
        method: 'post',
        data
    })
}
/**
 * 登陆
*/
export function Login(data){
    return service({
        url: '/login/',
        method: 'post',
        data
    })
}