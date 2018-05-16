<template>
    <div class="registerbox">
        <div id = "canvasbox2" class="canvasbox2"></div>
        <div class="formbox">
            <div class="formcon">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="130">
                    <FormItem label="Name" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name" style="width: 300px" ></Input>
                    </FormItem>
                    <FormItem label="E-mail" prop="mail">
                        <Input v-model="formValidate.mail" placeholder="Enter your e-mail" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="Password" prop="password">
                        <Input type="password" v-model="formValidate.password" placeholder="Password" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="Confirm password" prop="ConfirmPassword">
                        <Input type="password" v-model="formValidate.ConfirmPassword" placeholder="Password" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
    import {Button, Input, Form, FormItem, Row, Col} from 'iview';
    import axios from 'axios';
    import moment from 'moment';
    import '../assets/js/canvas_3d';
    export default {
        name: 'Register',
        data() {
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password again'));
                } else if (value !== this.formValidate.password) {
                    callback(new Error('The two input passwords do not match!'));
                } else {
                    callback();
                }
            };
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    password: '',
                    ConfirmPassword: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    password:[
                        {required: true, message: 'Password cannot be empty', trigger: 'blur'},
                        {type: 'string', min: 6, max: 20,message: "不能少于6个-不能大于20个字符", trigger: 'blur'}
                    ],
                    ConfirmPassword:[
                        {required: true, validator: validatePassCheck, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            handleSubmit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        axios.post('/db/register',{
                            username: this.formValidate.name,
                            password: this.formValidate.ConfirmPassword,
                            mail:     this.formValidate.mail,
                            time: moment().format('YYYY-MM-DD hh:mm:ss').toString()
                        }).then((result) => {
                            console.log(result)
                            if(result.data == 1){
                                this.$Message.success('注册成功');
                                this.$router.push({
                                    path: '/login',
                                    name: 'Login'
                                });
                            }else if(result.data == '-1'){
                                this.$Message.error('此用户名已被占用');
                                this.handleReset('formValidate')
                            }else{
                                this.$Message.error('服务器错 注册失败!');
                            }
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
        },
        mounted: function(){
            new Renderer().start();
        },
        components:{
            Button,
            Input, 
            Form, 
            FormItem, 
            Row, 
            Col
        }
    }
</script>
<style>
    .registerbox{
        position: relative;
        height: 100%;
        overflow: hidden;
    }
    .canvasbox2{
        position: relative;
        height: 100%;
    }
    .formbox{
        position: absolute;
        width: 100%;
        top: 0;
    }
    .formcon{
        width: 450px;
        margin: 200px auto;
    }
</style>
