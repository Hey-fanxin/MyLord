<template>
    <div class="skill-box">
        <Row>
            <i-col span="8" class="skill-l">
                <transition-group name="skillList" tag="ul">
                    <li v-for="(item,index) in skillL" :key="index">
                        <a v-bind:href="item.href"><Button type="default" v-show="item.text">{{item.text}}</Button></a>
                    </li>
                </transition-group>
            </i-col>
            <i-col span="8">
                <SkillBtn v-on:skillClick="skillClick"></SkillBtn>
            </i-col>
            <i-col span="8" class="skill-r">
                <transition-group name="skillList" tag="ul">
                    <li v-for="(item,index) in skillR" :key="index">
                        <a v-bind:href="item.href"><Button type="default" v-show="item.text">{{item.text}}</Button></a>
                    </li>
                </transition-group>    
            </i-col>
        </Row>
    </div>
</template>

<script>
    import SkillBtn from '../widget/SkillBtn';
    import {Button, Row, Col} from 'iview'
    let l = [
        {href: '/react', text: 'React'},
        {href: '/vue', text: 'Vue'},
        {href: '/jq', text: 'JQuery'},
        {href: '/echart', text: 'Echart'},
        {href: '/yii', text: 'Yii'},
    ];
    let r = [
        {href: '/node', text: 'NodeJS'},
        {href: '/css', text: 'Css/3'},
        {href: '/h5', text: 'H5'},
        {href: '/php', text: 'PHP'},
        {href: '/js', text: 'JavaScript'},
    ]
    export default {
        name: 'Skill',

        data(){
            return {
                is: true,
                skillL: l,
                skillR: r
            }
        },
        methods:{
            skillClick: function(){
                if(this.is){
                    this.is = false;
                    this.skillL = this.skillR = [{}]
                }else{
                    console.log(l)
                    this.is = true;
                    this.skillL = l;
                    this.skillR = r;
                }
            },
        },
        components:{
            [SkillBtn.name]: SkillBtn,
            [Button.name]: Button,
            [Row.name]: Row,
            [Col.name]: Col,
        }
    }
</script>

<style scoped>
    .skill-box{
        margin-top: 50px;
    }
    .skill-l>ul>li, .skill-r>ul>li{
        margin-bottom:30px;
        text-align: center;
    }
    .skill-l button, .skill-r button{
        width:40%;
        padding:9px 0;
        font-size: 16px;
        font-weight: bold;
        background: #fff;
    }
    .skillList-enter-active {
        transition: all .3s ease;
    }
    .skillList-leave-active{
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .skillList-enter, .skillList-leave-to{
        transform: translateX(10px);
        opacity: 0;
    }
</style>