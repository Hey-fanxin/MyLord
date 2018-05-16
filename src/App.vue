<template>
    <div class="layout" id="app" >
        <canvas id='canvasbox' style="background-color: transparent;width: 100%;position: absolute;height: 100vh; top:0;left:0;"></canvas>
        <Layout>
            <HeaderBar></HeaderBar>
            <Content class="layout-conent" id="layout_con">
                <router-view/>
            </Content>
            <Footer class="layout-footer-center">2015-2018 &copy; My Resume Data</Footer>
        </Layout>
  
    </div>
</template>

<script>
    import HeaderBar from './layout/HeaderBar';
    import {Layout} from 'iview';
    import './assets/js/canvas';
    export default {
        name: 'App',
        data() {
            return {
                option: {
                    dom: 'canvasbox',    //画布id
                    cw: 1500,            //画布宽
                    ch: 900,             //画布高
                    ds: 100,             //点的个数
                    r: 1,                //圆点半径
                    cl: '#f8f8f9',       //粒子线颜色
                    dis: 100             //触发连线的距离
                }
            }
        },
        mounted: function(){
            var dotline = new Dotline(this.option).start();
        },
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
        background: #333;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
