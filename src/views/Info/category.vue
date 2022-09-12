<!--
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-04 23:04:54
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-10 22:38:02
 * @FilePath: /vue-cars/vue-cars-admin/src/views/Info/category.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="cartegory">
        <!-- 搜索栏 -->
        <div class="header">
            <el-button type="primary" @click="">新增一级分类</el-button>
        </div>
        <!-- 内容部分 -->
        <div class="container">
            <el-row :gutter="30">
                <el-col :span="8">
                    <div class="category">
                        <el-table :data="infoData" stripe style="width: 100%" row-key="id" border :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                            <el-table-column prop="category_name" label="分类名称" />
                            <el-table-column label="操作">
                                <template #default="scope">
                                    <el-button link type="primary">编辑</el-button>
                                    <el-button link type="primary">添加子级</el-button>
                                    <el-button link type="danger" @click="delCategoryComfirm(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="header title">一级分类编辑</div>
                    <div class="info_form">
                        <div class="df aic">
                            <label class="label">一级分类名称:</label>
                            <el-input type="text" placeholder="请输入一级分类名称" style="width: 200px" v-model="categoryName">
                            </el-input>
                        </div>
                        <div class="df aic mt20">
                            <label class="label">二级分类名称:</label>
                            <el-input type="text" placeholder="请输入二级分类名称" style="width: 200px" v-model="categoryName">
                            </el-input>
                        </div>
                        <el-button type="primary" @click="addItem" :loading="addItemLoading">确定</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { GetInfo, AddFirst, DelCategory } from '@/api/info'
import { ElMessage } from 'element-plus'
import { global } from '../../utils/global'
export default defineComponent({
    setup () {
        //数据
        const categoryName = ref('')
        const delId = ref('')
        const addItemLoading = ref(false)
        const infoData = ref([])
        const { confirm } = global()

        //生命周期
        onMounted(() => {
            getInfoList()
        })
        //新增一级分类
        const addItem = () => {
            addItemLoading.value = true
            if (!categoryName.value)
            {
                ElMessage({
                    type: 'error',
                    message: "分类名称不能为空"
                })
                addItemLoading.value = false
                return false
            }
            AddFirst({ categoryName: categoryName.value }).then((res) => {
                if (res.resCode === 0) {
                    categoryName.value = ''
                    ElMessage({
                        type: 'success',
                        message: res.message
                    })
                    addItemLoading.value = false
                    infoData.value.push(res.data)
                }
            }).catch((err) => {
                console.log(err)
                categoryName.value = ''
                addItemLoading.value = false
            })
        }
        //获取分类列表数据
        const getInfoList = ()=> {
            GetInfo().then((res)=>{
                infoData.value = res.data.data
            }).catch((err)=>{
                console.log(err)
            })
        }
        //删除当前分类
        const delCategoryComfirm = (param)=> {
            console.log(param,param.id)
            delId.value = param.id
            confirm({
                content: "确定删除该条分类吗",
                tip: "提示",
                type: "warning",
                fn: delCategory,
                catch: ()=> {
                    delId.value = ''
                }
            })
        }

        const delCategory = ()=> {
            DelCategory({ categoryId: delId.value }).then((res)=>{
                ElMessage({
                    type: 'success',
                    message: res.message
                })
                console.log(infoData.value)
                infoData.value = infoData.value.filter(item => item.id != delId.value)
            }).catch((err)=>{

            })
        }

        return {
            delId,
            infoData,
            categoryName,
            addItemLoading,
            addItem,
            getInfoList,
            delCategory,
            delCategoryComfirm
        }
    }
})
</script>

<style lang="scss">
.container {
    .title {
        margin-top: 10px;
        line-height: 30px;
        padding-left: 20px;
    }

    .info_form {
        padding-left: 20px;
        margin-top: 30px;

        label {
            margin-right: 10px;
        }

        .el-button {
            margin-top: 30px;
        }
    }
    .category {
        margin-top: 10px;
    }
}
</style>