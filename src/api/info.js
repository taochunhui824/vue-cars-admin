/*
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-10 20:25:15
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-10 22:05:52
 * @FilePath: /vue-cars/vue-cars-admin/src/api/info.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import service from "@/utils/request";
/**
 * @description 获取分类列表
*/
export function GetInfo(){
    return service({
        url: '/news/getCategory/',
        method: 'get'
    })
}

/**
 * @description 添加一级分类
*/
export function AddFirst(data){
    return service({
        url: '/news/addFirstCategory/',
        method: 'post',
        data
    })
}

/**
 * @description 删除当前分类
*/
export function DelCategory(data){
    return service({
        url: '/news/deleteCategory/',
        method: 'post',
        data
    })
}