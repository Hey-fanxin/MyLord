<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                    <a class="register" href='/register'>sing up</a>
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem item prop="userName" :error='validErr'>
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password"  :error='validErr'>
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入管理人用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
    import {Input, Button, Form, FormItem, Buttom, Icon, Card} from 'iview';
    import axios from 'axios';
    import Cookies from 'js-cookie';
    export default {
        name: 'Login',
        data () {
            return {
                validErr: "",
                form: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    
                }
            };
        },
        methods: {
            handleSubmit () {
                this.$refs.loginForm.validate((valid) => {
                    
                    if (valid) {
                        axios.post('/db/admin',{
                            "username": this.form.userName,
                            "password": this.form.password,
                        }).then((res) => {
                            if(res.data == -1){
                                this.validErr = ' ';
                                this.$Message.error('Without this user！');
                            }else if(res.data == -2){
                                this.validErr = ' ';
                                this.$Message.error('Password mistake！');
                            }else if(res.data.state == 1){
                                Cookies.set('name',res.data.name);
                                this.$router.push({
                                    path: '/admin',
                                    name: 'Admin'
                                });
                            }
                        })
                    }
                });
            }
        },
        components: {
            Card,
            Form,
            Icon,
            Button,
            Input,
            FormItem,
        }
    }
</script>
<style lang="less">
    
.login{
    width: 100%;
    height: 100%;
    background-image: url('https://file.iviewui.com/iview-admin/login_bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
        padding-top: 200px;
        padding-bottom: 300px;
        width: 300px;
        margin: 0 auto;
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
    .register{
        float: right;
    }
}
</style>
 