<!--
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-04 15:13:23
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-04 15:45:05
 * @FilePath: /vue-cars/vue-cars-admin/src/views/Layout/Components/Header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="header-wrap">
        头部
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        

        return {}
    }
})
</script>

<style lang="scss" scoped>
#header-wrap {
    // position: fixed;
    // left: 250px;
    // right: 0;
    // top: 0;
    height: 75px;
    background-color: #fff;
    @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .1));
}
</style>