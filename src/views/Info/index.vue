<!--
 * @Author: taochunhui 814995688@qq.com
 * @Date: 2022-09-04 23:03:55
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-10 21:01:22
 * @FilePath: /vue-cars/vue-cars-admin/src/views/Info/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <!-- 搜索栏 -->
        <div class="header">
            <el-row :gutter="20">
                <el-col :span="4" class="df aic">
                    <label class="lable">类型:</label>
                    <el-select v-model="type" class="m-2" placeholder="请选择">
                        <el-option v-for="item in infoData" :key="item.id" :label="item.category_name" :value="item.category_name" />
                    </el-select>
                </el-col>
                <el-col :span="6" class="df aic">
                    <label class="lable">日期:</label>
                    <el-date-picker v-model="date" type="daterange" range-separator="To" start-placeholder="开始日期"
                        end-placeholder="结束日期" size="default" />
                </el-col>
                <el-col :span="6" class="df aic">
                    <label class="lable">关键字:</label>
                    <el-select v-model="search_key" class="m-2" placeholder="请选择">
                        <el-option v-for="item in searchOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <el-input class="pl10" type="text" placeholder="请选择内容"></el-input>
                    <el-button class="ml10" type="primary">搜索</el-button>
                </el-col>
                <el-col :span="8" class="df aic jcfe">
                    <el-button type="primary" @click="addItem">新增</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 表格数据 -->
        <div class="container">
            <el-table ref="multipleTableRef" border stripe :data="tableData" style="width: 100%"
                :cell-style="{ textAlign: 'center' }" :header-cell-style="{textAlign: 'center'}"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="title" label="标题" width="500"></el-table-column>
                <el-table-column prop="category" label="类别"></el-table-column>
                <el-table-column prop="date" label="日期"></el-table-column>
                <el-table-column prop="user" label="管理员"></el-table-column>
                <el-table-column label="操作">
                    <template #default>
                        <el-button link type="danger" size="small" @click="delItem">删除</el-button>
                        <el-button link type="primary" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 底部分页 -->
        <div class="df aic jcsp footer">
            <el-button @click="delAll">批量删除</el-button>
            <el-pagination :page-sizes="[100, 200, 300, 400]" background
                layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
        <!-- 新增弹窗 -->
        <DialogInfo v-model:flag="dialog_info" />
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import DialogInfo from '../../component/dialog/index.vue'
import { global } from '../../utils/global'
import { GetInfo } from '@/api/info'
export default defineComponent({
    components: { DialogInfo },
    setup () {
        //数据
        const type = ref('');
        const search_key = ref('id')
        const date = ref('')
        const multipleSelection = ref([])
        const dialog_info = ref(false)
        const { confirm } = global()
        const searchOptions = [
            {
                value: 'id',
                label: 'ID',
            },
            {
                value: 'title',
                label: '标题',
            }
        ]
        const infoData = ref([])
        const tableData = [
            {
                title: '大声疾呼贷记卡还是快点哈开机后',
                category: '标题',
                date: '2022-09-10',
                user: '张三'
            }, {
                title: '大声疾呼贷记卡大厦扩大啊黑色短裤和萨卡哈还是快点哈开机后',
                category: '标题',
                date: '2022-09-10',
                user: '王二'
            }, {
                title: '打死了几去我黑uhqwiuhwqekwjqhj',
                category: '标题',
                date: '2022-09-10',
                user: '李四'
            }, {
                title: 'v不会表达不会接口技术风格还是个回复睡',
                category: '标题',
                date: '2022-09-10',
                user: '麻子'
            }
        ]
        //生命周期，挂在完成时执行（页面dom元素完成时，实例完成）
        onMounted(() => {
            getInfoList()
        })
        //表格
        const toggleSelection = (rows) => {

        }
        const handleSelectionChange = (val) => {
            multipleSelection.value = val
        }
        //分页
        const handleSizeChange = (val) => {
            console.log(`${val} items per page`)
        }
        const handleCurrentChange = (val) => {
            console.log(`current page: ${val}`)
        }
        //新增弹窗
        const addItem = () => {
            dialog_info.value = true
        }
        //删除
        const delItem = () => {
            confirm({
                content: "确定删除该条数据吗",
                tip: "警告",
                type: "success",
            })
        }
        const delAll = ()=> {
            confirm({
                content: "确定删除该条数据吗",
                tip: "警告",
                type: "success",
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

        return {
            type,
            infoData,
            multipleSelection,
            tableData,
            toggleSelection,
            handleSelectionChange,
            date,
            search_key,
            searchOptions,
            handleSizeChange,
            handleCurrentChange,
            dialog_info,
            addItem,
            delItem,
            delAll,
            getInfoList
        };
    },
});
</script>

<style lang="scss" scoped>
.footer {
    margin-top: 15px;
}
</style>
