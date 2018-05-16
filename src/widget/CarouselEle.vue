<template>
    <div class="carsuselbox">
        <Carousel autoplay v-model="value2" loop>
            <CarouselItem>
                <div class="demo-carousel">1</div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">2</div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">1</div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">2</div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">1</div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">2</div>
            </CarouselItem>
        </Carousel>
    </div>
</template>
<script>
import {Carousel, CarouselItem} from 'iview';
export default {
    name: 'CarouselEle',
    data () {
        return {
            value2:0
        }
    },
    components:{
        Carousel,
        CarouselItem,
    }
}
</script>
<style>
    .carsuselbox{
        position: relative;
    }
    .demo-carousel{
        width: 100;
        height:200px;
        text-align: center;
        line-height: 200px;
        background: #506b9e;
    }
</style>


