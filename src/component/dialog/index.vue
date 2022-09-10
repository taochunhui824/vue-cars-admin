<template>
    <div>
        <el-dialog v-model="dialog_info_flag" title="新增" :before-close="close" width="580px">
            <el-form :model="form">
                <el-form-item label="类型:" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="Zone No.1" value="shanghai" />
                        <el-option label="Zone No.2" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="标题:" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item label="概况:" :label-width="formLabelWidth">
                    <el-input v-model="form.desc" placeholder="请输入内容" show-word-limit type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="close">取消</el-button>
                    <el-button type="primary" @click="dialog_info = false">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent, ref, watch, reactive } from 'vue'

export default defineComponent({
    props: {
        flag: {
            type: Boolean,
            default: false
        }
    },
    setup (props, { emit }) {
        //数据
        const dialog_info_flag = ref(false)
        const formLabelWidth = '70px'

        const form = reactive({
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
        })

        const close = () => {
            dialog_info_flag.value = false
            emit('update:flag', false)
        }

        watch(() => props.flag, (val) => {
            dialog_info_flag.value = val
        });

        return {
            dialog_info_flag,
            close,
            form,
            formLabelWidth
        }
    }
})
</script>

<style scoped>

</style>