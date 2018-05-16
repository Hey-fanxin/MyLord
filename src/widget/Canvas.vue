<template>
<div>
    <!-- <div class="canvasbox">
        <canvas id='canvasbox' style="background-color: transparent;width: 100%;position: absolute;height: 400px;"></canvas>
    </div> -->
    <div id = "canvasbox2" class="canvasbox2">
    </div>
</div>
    
</template>
<script>
//import {} from 'iview';
//import '../assets/js/canvas';
import $ from 'jquery';
import '../assets/js/canvas_3d';
export default {
    name: 'Canvas',
    data() {
        return {
            option: {
                dom: 'canvasbox',    //画布id
                cw: 1500,            //画布宽
                ch: 900,             //画布高
                ds: 100,             //点的个数
                r: 1,                //圆点半径
                cl: '#495060',       //粒子线颜色
                dis: 100             //触发连线的距离
            },
            
        }
    },
    mounted: function(){
        //var dotline = new Dotline(this.option).start();
        new Renderer().start();
    },
}
</script>
<style>
    .canvasbox{
        position: relative;
        height: 400px;
    }
    .canvasbox2{
        position: relative;
        height: 750px;
    }
</style>
