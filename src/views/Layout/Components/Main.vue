<!--
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-04 15:13:29
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-04 16:24:41
 * @FilePath: /vue-cars/vue-cars-admin/src/views/Layout/Components/Main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="main-wrap">
        <router-view />
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
#main-wrap {
    height: 100%;
    background: #fff;
    @include webkit(box-sizing, border-box);
}
</style>