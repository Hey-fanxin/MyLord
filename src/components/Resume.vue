<template>
    <div class="container">
        <div>
            <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
            <Button type="default" v-on:click="getResume" >Resume</Button>
        </div>
        <div style="margin-bottom:30px;">
            <Input v-model="value2" placeholder="Enter something..." style="width: 300px" />
            <Button type="default" v-on:click="getResume2" >Resume</Button>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="Name" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name" style="width: 300px" ></Input>
            </FormItem>
            <FormItem label="Desc" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>    
        
    </div>
</template>

<script>
    import {Button, Input, Form, FormItem, Row, Col} from 'iview';
    import axios from 'axios';
    import moment from 'moment';

    export default {
        name: 'Resume',
        data() {
            return {
                value:'',
                value2:'',
                formValidate: {
                    name: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        axios.post('/db/writeMany',{
                            username: this.formValidate.name,
                            content: {
                                desc: this.formValidate.desc,
                                time: moment().format('YYYY-MM-DD hh:mm:ss').toString()
                            }
                            
                        }).then((result) => {
                            console.log(result)
                            if(result.data == '1'){
                                this.$Message.success('添加成功');
                                this.handleReset('formValidate')
                            }else{
                                this.$Message.error('添加失败!');
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
            getResume: function(){
                axios.get('/db/resume')
                    .then((res) => {
                        console.log(res);
                        this.value = res.data.name
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getResume2: function(){
                axios.get('/db/luande')
                    .then((res) => {
                        console.log(res);
                        this.value = res.data.name
                    })
                    .catch(function (error) {
                        console.log(error,'err');
                    });
            }
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

</style>
