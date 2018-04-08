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
            <div class="tableBox">
                <Table  :height="tableHeight" :loading="loading" border :columns="columns7" :data="leaveData"></Table>
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
                columns7: [
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
                        key: 'content'
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
                leaveData: [],
                page: 0,
                count:0,
                pageamount:10
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
                    console.log(r)
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
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.leaveData[index].username}<br>Time：${this.leaveData[index].creattime}<br>Address：${this.leaveData[index].content}`
                })
            },
            remove (index) {
                //this.leaveData.splice(index, 1);
                var item = this.leaveData[index];
                axios.post('/db/deleteMany',{
                    username: item.username
                }).then((r) => {
                    this.leaveData.splice(index, 1);
                    this.$Message.success('删除成功!');
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
</style>
 