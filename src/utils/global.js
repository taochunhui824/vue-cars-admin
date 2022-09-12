/*
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-10 16:43:18
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-10 22:19:01
 * @FilePath: /vue-cars/vue-cars-admin/src/utils/global.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//消息弹框组件
import { ElMessageBox } from 'element-plus';
export function global () {
    const confirm = (params) => {
        ElMessageBox.confirm(
            params.content,
            params.tip || '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: params.type || 'warning',
            }
        ).then(() => {
            params.fn && params.fn()
        })
        .catch(() => {
            params.catch && params.catch()
        })
    }
    return {
        confirm
    }
}