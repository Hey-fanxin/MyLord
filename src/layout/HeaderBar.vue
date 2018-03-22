<template>
    <Header :style="{position: 'fixed', width: '100%', zIndex:999}">
        <Menu mode="horizontal" theme="dark">
            <div class="container">
                <div class="layout-logo">
                    <Icon type="social-bitcoin" size=30></Icon>
                </div>
                <div class="layout-nav">
                    <li v-for="(item, index) in items" :key="index"
                        class="ivu-menu-item"
                        @mouseenter="showActive(index)"
                        @mouseleave="hiddenActive(index)" 
                        :class="{active:item.isActive}"
                        :name="index"
                    >
                        <span></span>
                        <a :href="item.href" v-if="item.icon">
                            <Icon :type="item.text" size=18></Icon>
                        </a>
                        <a :href="item.href" v-else>{{item.text}}</a>
                    </li>
                </div>
            </div>    
        </Menu>
    </Header>
</template>

<script>
    import {Icon,Menu} from 'iview';

    export default {
        name: 'HeaderBar',
        data(){
            return {
                items: [
                    {href: '/', text: 'Home', isActive: false},
                    {href: '/works', text: 'Works', isActive: false},
                    {href: '/resume', text: 'Resume', isActive: false},
                    {href: '/email', text: 'email-unread', isActive: false, icon: true},
                    {href: '/admin', text: 'happy', isActive: false, icon: true},
                ]
            }
        },
        methods: {
            showActive: function(i){
                this.items[i].isActive = true;
            },
            hiddenActive: function(i){
                this.items[i].isActive = false
            }
        },
        components: {
            [Icon.name]: Icon,
            [Menu.name]: Menu,
            [Menu.Item.name]: Menu.Item
        }
    }
</script>

<style scoped>
    .layout-nav>li>span{
        position: absolute;
        left:49%;
        bottom: 1px;
        width: 2%;
        height: 1px;
        background: #10f8ff;
        opacity: 0;
        z-index: 10;
        box-shadow: #10f8ff 1px 1px;
    }
    .layout-nav>li>a{
        font-size: 16px
    }
    .layout-nav>.active>span{
        animation: myfirst .4s linear .1s infinite alternate;
    }
    @keyframes myfirst
    {
        0%   {width:2%; left:49%; opacity: 0}
        25%  {width:50%; left:25%; opacity: .5}
        50%  {width:100%; left:0; opacity: .9}
        75%  {width:50%; left:25%; opacity: .5}
        100% {width:2%; left:49%; opacity: 0;}
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: linear-gradient(rgb(16, 16, 90), #10f8ff, rgb(60, 143, 43));
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
        text-align: center;
        line-height: 30px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
</style>