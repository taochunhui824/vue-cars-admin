<!--
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-04 15:13:23
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-07 22:01:22
 * @FilePath: /vue-cars/vue-cars-admin/src/views/Layout/Components/Header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="header-wrap">
        <el-icon :size="30">
            <Operation />
        </el-icon>
        <div class="header-box">
            <div class="header-box-user">
                <img src="../../../assets/logo.png">
                <span>管理员</span>
            </div>
            <el-icon :size="30" @click="delToken">
                <SwitchButton />
            </el-icon>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router';
export default defineComponent({
    setup () {
        
        const router = useRouter()

        const delToken = ()=>{
            localStorage.removeItem('token')
            router.push('/login')
        }

        return {
            delToken
        }
    }
})
</script>

<style lang="scss" scoped>
#header-wrap {
    // position: fixed;
    // left: 250px;
    // right: 0;
    // top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 75px;
    background-color: #fff;
    @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .1));
    .el-icon {
        cursor: pointer;
        padding-left: 10px;
        margin-top: -15px;
    }
    .header-box {
        display: flex;
        align-items: center;
        .header-box-user {
            display: flex;
            align-items: center;
            margin-top: -15px;
            img {
                height: 30px;
                margin-right: 15px;
            }
        }
        .el-icon {
            padding-left: 40px;
            padding-right: 20px;
        }
    }
}
</style>