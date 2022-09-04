<!--
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-04 15:13:15
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-04 23:08:21
 * @FilePath: /vue-cars/vue-cars-admin/src/views/Layout/Components/Nav.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="nav-warp">
        <el-menu router class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
            @close="handleClose" background-color="#344a5f" text-color="#fff" active-text-color="#fff" unique-opened>
            <template v-for="(item, index) in routers">
                <el-sub-menu v-if="!item.meta.hidden" :key="index" :index="index">
                    <template #title>
                        <el-icon>
                            <location />
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
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
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
        const route = useRoute()
        const routers = router.getRoutes()
        console.log(router.getRoutes());
        const isCollapse = ref(false)
        const handleOpen = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const handleClose = (key, keyPath) => {
            console.log(key, keyPath)
        }

        return {
            handleOpen,
            handleClose,
            isCollapse,
            routers
        }
    }
})
</script>

<style lang="scss" scoped>
#nav-warp {
    // position: fixed;
    // top: 0;
    // left: 0;
    width: $navMenu;
    background-color: #344a5f;

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: $navMenu;
        height: 100vh;
    }
}
</style>