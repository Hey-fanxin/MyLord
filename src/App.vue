<template>
    <div class="layout" id="app">
        <Layout>
            <HeaderBar></HeaderBar>
            <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
                <router-view/>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>

<script>
    import HeaderBar from './layout/HeaderBar';
    import {Layout} from 'iview';

    export default {
        name: 'App',
        components:{
            [HeaderBar.name]: HeaderBar,
            [Layout.name]: Layout,
            [Layout.Header.name]: Layout.Header,
            [Layout.Content.name]: Layout.Content,
            [Layout.Footer.name]: Layout.Footer,
        }
    }
</script>

<style>
    #app{
        background: #f7f7f7;
    }
    .layout{
        border: 0px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .layout-footer-center{
        text-align: center;
    }
</style>
