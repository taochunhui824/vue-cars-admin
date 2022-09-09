<!--
* @Author: taochunhui 814995688@qq.com
* @Date: 2022-09-03 15:47:01
 * @LastEditors: taochunhui 814995688@qq.com
 * @LastEditTime: 2022-09-09 22:03:22
* @FilePath: /vue-cars/vue-cars-admin/src/views/Login/index.vue
* @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="login">
        <div class="form-wrap">
            <ul class="menu-tab">
                <li v-for="item in menu_switch_item" :key="item.type" :class="{ 'current': current_menu === item.type }"
                    @click="toggleMenu(item.type)">
                    {{ item.label }}
                </li>
            </ul>
            <!-- /**表单 */ -->
            <el-form :model="form" :rules="form_rules" ref="loginRef">
                <el-form-item prop="name">
                    <label class="form-label">用户名</label>
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item prop="password">
                    <label class="form-label">密码</label>
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item prop="passwords" v-show="current_menu === 'register'">
                    <label class="form-label">确认密码</label>
                    <el-input type="password" v-model="form.passwords"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <div style="width: 100%;">
                        <label class="form-label">验证码</label>
                        <el-row :gutter="10">
                            <el-col :span="14">
                                <el-input type="text" v-model="form.code"></el-input>
                            </el-col>
                            <el-col :span="10">
                                <el-button type="success" class="el-button-block" :disabled="code_disabled" :loading="code_loading" @click="getSms">{{
                                        code_text
                                }}</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" class="el-button-block login-btn" :disabled="submit_disabled"
                        @click="submitForm('loginRef')">{{ current_menu === "login" ? "登录" : "注册" }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
    
<script>
import sha1 from 'js-sha1'
import { defineComponent, reactive, ref, unref } from "vue";
import { validate_email, validate_password } from "@/utils/validate";
import { GetSms, Register, Login } from '@/api/login'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
export default defineComponent({
    setup (props, context) {
        const menu_switch_item = reactive([
            { type: "login", label: "登录" },
            { type: "register", label: "注册" }
        ])

        let current_menu = ref(menu_switch_item[0].type);

        const form = reactive({
            name: "",
            password: "",
            passwords: "",
            code: "",
        });

        const active = ref(0); //当前激活的tab下标
        let loginRef = ref(null)
        let code_text = ref("获取验证码");
        let code_loading = ref(false);
        let code_disabled = ref(false);
        let timer = ref(null);
        let submit_disabled = ref(true);//登陆按钮禁用状态
        const router = useRouter()
        const store = useStore()

        /**
         * 自定义检验规则
         */
        // 检验邮箱
        const validate_name_rules = (rule, value, callback) => {
            let regEmail = validate_email(value);
            if (value === "") {
                callback(new Error("请输入邮箱"));
            } else {
                callback();
            }
        };
        // 检验密码
        const validate_password_rules = (rule, value, callback) => {
            let regPassword = validate_password(value);
            let passwords_value = form.passwords;
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (!regPassword) {
                callback(new Error("请入 >=6 并且 <= 20 位的密码，包含数字、字母"));
            } else if (passwords_value && passwords_value !== value) {
                callback(new Error("两次密码不一致，请重新输入"));
            } else {
                callback();
            }
        };
        // 检验确认密码
        const validate_passwords_rules = (rule, value, callback) => {
            let password_value = form.password;
            if (current_menu.value === "login") {
                callback();
                return false;
            } 
            if (value === "") {
                callback(new Error("请输入确认密码"));
            } else if (password_value !== value) {
                callback(new Error("两次密码不一致，请重新输入"));
            } else {
                callback();
            }
        };
        // 检验验证码
        const validate_code_rules = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入验证码"));
            } else if (value.length !== 6) {
                callback(new Error("请输入长度为6位数的验证码"));
            } else {
                callback();
            }
        };
        // 检验规则
        const form_rules = reactive({
            name: [{ validator: validate_name_rules, trigger: "blur" }],
            password: [{ validator: validate_password_rules, trigger: "blur" }],
            passwords: [{ validator: validate_passwords_rules, trigger: "blur" }],
            code: [{ validator: validate_code_rules, trigger: "blur" }],
        });

        // 切换样式方法
        const toggleMenu = ((type) => {
            current_menu.value = type;
            clearCountDown() //清楚倒计时
            resFomrData()
        })

        //清除倒计时
        const resFomrData = () => {
            loginRef.value.resetFields() //清空form
        }
        
        //验证码倒计时
        const countDown = (number) => {
            //判断定时器是否存在，存在即清楚
            if(timer.value) {clearInterval(timer.value)}
            let time = number  
            timer.value = setInterval(() => {
                time--
                if(time === 0) {
                    clearInterval(timer.value)
                    code_disabled.value = false
                    code_text.value = '再次发送'
                }else{
                    code_text.value = `倒计时${time}秒`
                }
            }, 1000);
        }

        //获取验证码
        const getSms = () => {
            if (form.name == '') {
                ElMessage({
                    type: 'error',
                    message: '邮箱不能为空'
                })
                return false
            }
            if (!validate_email(form.name)) {
                ElMessage({
                    type: 'error',
                    message: '邮箱格式有误，请重新输入！！'
                })
                return false
            }
            code_disabled.value = true
            code_text.value = '发送中'
            let smsData = {
                username: form.name,
                module: current_menu.value
            }
            GetSms(smsData).then((res) => {
                console.log(res)
                ElMessage({
                    type: 'success',
                    message: res.message
                })
                //启用登陆或注册按钮
                submit_disabled.value = false
                //调定时器，验证码倒计时
                countDown(60)
            }).catch(err => {
                console.log(err)
                code_disabled.value = false
                code_text.value = '重新获取'
            })
        }

        //清楚倒计时
        const clearCountDown = ()=>{
            //还原验证码按钮默认状态
            code_disabled.value = false
            code_text.value = '获取验证码'
            //清楚倒计时
            clearInterval(timer.value)
        }

        // 提交表单
        const submitForm = () => {
            const form = unref(loginRef);
            if (!form) return
            try {
                form.validate()
                console.log(current_menu.value);
                current_menu.value === 'login' ? login() : register()
            } catch (error) {}
        }

        //注册
        const register = ()=> {
            let registerData = {
                username: form.name,
                password: sha1(form.password),
                code: form.code
            }
            Register(registerData).then((res) => {
                console.log(res)
                ElMessage({
                    type: 'success',
                    message: res.message
                })
                toggleMenu('login')
            }).catch(error => {
                console.log(error)
            })
        }

        //登陆
        const login = ()=> {
            let loginData = {
                username: form.name,
                password: sha1(form.password),
                code: form.code
            }
            Login(loginData).then((res) => {
                console.log(res)
                ElMessage({
                    type: 'success',
                    message: res.message
                })
                // 将token进行保存
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("username", res.data.username)
                // 将token，user存储到vuex中
                store.commit('nav/setToken', res.data.token)
                store.commit('nav/setUsername', res.data.username)
                //登陆成功页面跳转
                router.push('/home')
            }).catch(error => {
                console.log(error)
            })
        }

        return {
            loginRef,
            menu_switch_item,
            toggleMenu,
            active,
            form,
            code_text,
            form_rules,
            current_menu,
            submitForm,
            getSms,
            submit_disabled,
            code_loading,
            code_disabled
        };
    },
});
</script>
    
<style lang="scss" scoped>
#login {
    height: 100vh;
    background-color: #344a5f;
}

.form-wrap {
    width: 300px;
    padding-top: 100px;
    margin: auto;
}

.menu-tab {
    text-align: center;

    li {
        display: inline-block;
        padding: 10px 24px;
        margin: 0 10px;
        color: #fff;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;

        &.current {
            background-color: rgba(0, 0, 0, .1);
        }
    }
}

.form-label {
    display: block;
    color: #fff;
    font-size: 14px;
}
</style>
    