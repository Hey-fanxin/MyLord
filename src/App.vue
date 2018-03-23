<template>
    <div class="layout" id="app">
        <Layout>
            <HeaderBar></HeaderBar>
            <Content class="layout-conent">
                <router-view/>
            </Content>
            <Footer class="layout-footer-center">2015-2018 &copy; My Resume Data</Footer>
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
    .layout-conent{
        padding-top:60px;
        height: 94vh;
        background: #fff;
        box-sizing: border-box;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
