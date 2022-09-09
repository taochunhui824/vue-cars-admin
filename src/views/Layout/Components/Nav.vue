<!--
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-04 15:13:15
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-09 21:06:24
 * @FilePath: /vue-cars/vue-cars-admin/src/views/Layout/Components/Nav.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="nav-warp">
        <h1 class="logo">
            <img src="../../../assets/logo.png" :style="isCollapse ? 'height: 30px;' : 'height: 60px;'">
        </h1>
        <el-menu router class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#344a5f" text-color="#fff" active-text-color="#f56c6c" unique-opened>
            <template v-for="(item, index) in routers">
                <el-sub-menu v-if="!item.meta.hidden" :key="index" :index="index">
                    <template #title>
                        <el-icon>
                            <component :is="item.meta.iconClass" style="width: 20px; height:20px;"/>
                        </el-icon>
                        <span>{{item.meta.title}}</span>
                    </template>
                    <el-menu-item  v-for="items in item.children" :key="items.path" :index="items.path">{{items.meta.title}}</el-menu-item>
                </el-sub-menu>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    Message
} from '@element-plus/icons-vue'

export default defineComponent({
    components: { Location, Setting, Document, IconMenu, Message },
    setup () {
        const router = useRouter()
        const routers = router.getRoutes()
        const store = useStore()
        //computed 监听
        const isCollapse = computed(()=> store.state.nav.isCollapse)

        return {
            isCollapse,
            routers
        }
    }
})
</script>

<style lang="scss" scoped>
#nav-warp {
    background-color: #344a5f;
    height: 100%;
    .el-menu {
        border-right: none;
    }
    .logo {
        text-align: center;
        padding: 18px 0 28px 0;
        img {
            margin: 0 auto;
        }
    }
}
</style>