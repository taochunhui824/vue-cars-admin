/*
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-03 20:05:19
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-03 20:05:21
 * @FilePath: /vue-cars/vue-cars-admin/src/utils/vlidate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function validate_email(value){
    let regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return regEmail.test(value);
}

export function validate_password(value){
    let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return regPassword.test(value);
}