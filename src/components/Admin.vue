<template>
    <div class="admin-con-box">
        <div v-if="Need_to_verify">
            <div class="search-box">
                <Input v-model="searchPerson" placeholder="日期/人名" 
                    @on-enter="searchFind"
                >
                    <Button slot="append" icon="ios-search"
                        @click="searchFind"
                    ></Button>
                </Input>
            </div>
            <div class="showcustombtn">
                <Button type="primary" @click="showCustomList">Primary</Button>
            </div>
            <div class="tableBox">
                <div v-if="showCustom">
                    <Table :height="tableHeight" :loading="loading" border :columns="columnsCustom" :data="customData"></Table>
                </div>
                <br />
                <Table  :height="tableHeight" :loading="loading" border :columns="columnsInfo" :data="leaveData"></Table>
            </div>
            <div class="page-box">
                <Page :total="count" show-sizer
                    @on-change="pageChange" 
                    @on-page-size-change="pageSizeChange"
                ></Page>
            </div>
        </div>
        
    </div>
</template>
<script>
    import {Table, Page, Icon, Button, Input} from 'iview';
    import axios from 'axios';
    import Cookies from 'js-cookie';

    //  可视区的高度
    const h = document.body.clientHeight||document.documentElement.clientHeight;
    export default {
        name: 'Admin',

        data () {
            return {
                tableHeight: '',       // 表格的高度
                Need_to_verify : false,  // 页面必须在登录状态显示
                searchPerson: '',   // 搜索条件
                loading: true,      // 加载进度显示
                columnsCustom:[
                    {
                        title: "Name",
                        key:    "username",
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.username)
                            ]);
                        }
                    },
                    {
                        title:  "Mail",
                        key:    "mail",
                    },
                    {
                        title: "Time",
                        key:    "creattime",
                        sortable: true
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                class: 'ivu-btn ivu-btn-error ivu-btn-small',
                                on: {
                                    click: () => {
                                        this.removeCustom(params.index)
                                    }
                                }  
                            }, 'Delete')
                        }
                    }
                ],
                columnsInfo: [
                    {
                        title: 'Name',
                        key: 'username',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.username)
                            ]);
                        }
                    },
                    {
                        title: 'Time',
                        key: 'creattime',
                        sortable: true
                    },
                    {
                        title: 'Title',
                        key: 'content',
                        className: 'table-info-column'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    class:'ivu-btn ivu-btn-primary ivu-btn-small',
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    class: 'ivu-btn ivu-btn-error ivu-btn-small',
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                customData:[],
                leaveData: [],
                page: 0,
                count:0,
                pageamount:10,
                showCustom:false
            }
        },
        beforeCreate(){
            // 组件创建之前
        },
        created(){
            //  组件创建
        },
        mounted(){
            // 组件安装
            this.getData()
        },
        methods: {
            searchFind() {
                if(!this.searchPerson == ''){
                    this.getData({
                        searchPerson: this.searchPerson,
                        page: 0,
                        pageamount: this.pageamount
                    })
                }else{
                    this.getData()
                }
            },
            getData(json = {page: this.page,pageamount: this.pageamount, searchPerson: this.searchPerson}) {
                axios.post('/db/leaveData',{
                    params: json
                })
                .then((r) => {
                    if(r.data.status == '-10'){
                        this.$Modal.error({
                            title: r.data.title,
                            content: "必须先登录！！",
                            okText:"去登录",
                            onOk: () => {
                                this.$router.push({
                                    path: '/login',
                                    name: 'Login'
                                });
                            }
                        });
                    }else{
                        this.Need_to_verify = true;
                        this.leaveData = r.data.result;
                        this.count = parseInt(r.data.count);
                        this.loading = false;
                    }
                })
            },
            show (index) {
                var con = this.leaveData[index].content;
                let str = '<ul class="modal-info-list">';
                for(let i=0; i<con.length; i++){
                    str +=`<li>
                        <p class="modal-info-list-desc">${con[i].desc}</p>
                        <p class="modal-info-list-time">${con[i].time}</p>
                    </li>`;
                }
                str += '</ul>';
                this.$Modal.info({
                    scrollable:true,
                    width:700,
                    title: 'User Info',
                    content: `Name：${this.leaveData[index].username}<br>Time：${this.leaveData[index].creattime}<br>content: ${str}`
                })
            },
            remove (index) {
                //this.leaveData.splice(index, 1);
                var item = this.leaveData[index];
                axios.post('/db/deleteMany',{
                    username: item.username
                }).then((r) => {
                    if(r.data ==1){
                        this.leaveData.splice(index, 1);
                        this.$Message.success('删除成功!');
                    }
                    
                })
            },
            pageChange (n) {
                this.page = (n -1);
                this.getData()
            },
            pageSizeChange (n) {
                this.pageamount = n;
                if(n != 10){
                    this.tableHeight = (h-161-69-60)
                }else{
                    this.tableHeight = ''
                }
                this.getData()
            },
            showCustomList(ev) {
                this.showCustom = !this.showCustom;
                if(this.showCustom && this.customData.length == 0){
                    let name = Cookies.get('name')
                    axios.post('/db/customlist',{name:name})
                        .then((res)=>{
                            this.customData = res.data;
                        })
                }
            },
            removeCustom (i){

                let list = this.customData[i];
                axios.post('/db/deleteCustom',{username: list.username})
                .then((r)=>{
                    console.log(r)
                    if(r.data == -1){
                        this.$Message.success('当前用户正在登陆中不能删除!');  
                    }
                    if(r.data == 1){
                        this.customData.splice(i, 1);
                        this.$Message.success('删除成功!'); 
                    }
                })
            }
        },
        components: {
            Table,
            Page,
            Icon,
            Button,
            Input,
        }
    }
</script>
<style lang="less">
    body{
        padding:0;
        margin:0;
    }
    .admin-con-box{
        position: relative;
        width:80%;
        height:85vh;
        margin:10px auto;

        .search-box{
            width: 400px;
            height:50px;
        }
        .page-box{
            text-align: right;
            padding-top: 10px;
        }
    }
    .ivu-table-body .table-info-column div{
        height: 50px;
    }
    .modal-info-list li{
        list-style: none;
        border-bottom: 1px solid rgb(203, 203, 204);
        padding:8px 4px;
    }
    .modal-info-list-desc{
        color:rgb(26, 23, 23);
    }
    .modal-info-list-time{
        text-align: right;
    }
    .showcustombtn{
        position: absolute;
        right: 0;
        top: 0;
    }
</style>
 