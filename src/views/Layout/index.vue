<!--
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-04 15:10:56
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-04 16:29:22
 * @FilePath: /vue-cars/vue-cars-admin/src/views/Layout/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="layout-wrap" class="common-layout">
        <el-container>
            <el-aside>
                <LayoutNav />
            </el-aside>
            <el-container>
                <el-header>
                    <LayoutHeader />
                </el-header>
                <el-main>
                    <LayoutMain />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import LayoutHeader from './Components/Header.vue'
import LayoutMain from './Components/Main.vue'
import LayoutNav from './Components/Nav.vue'
export default defineComponent({
    components: {
        LayoutHeader,
        LayoutMain,
        LayoutNav
    },
    setup () {


        return {}
    }
})
</script>

<style lang="scss" scoped>
#layout-wrap {
    background-color: #f7f7f7;

    .el-container {
        display: flex;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        width: $navMenu;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }

    body>.el-container {
        margin-bottom: 40px;
    }

}
</style>