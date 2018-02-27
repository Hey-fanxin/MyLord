<template>
    <div class="skill-btn-box" v-on:mouseenter="enter" v-on:mouseleave="out" v-on:click="inSkillClick">
        <div class="skill-btn">
            <img src="../assets/images/jineng-2.png" alt="skill">
        </div>
        <div class="skill-btn-br" :class="{skillMove:isSkillMove}"></div>
        <div class="skill-btn-br2" :class="{skillMove2:isSkillMove2}"></div>
    </div>
</template>

<script>
    export default {
        name: "SkillBtn",
        data(){
            return {
                isSkillMove: false,
                isSkillMove2: false,
            }
        },
        methods:{
            enter: function(){
                this.isSkillMove = true;
                this.isSkillMove2 = true;
            },
            out: function(){
                this.isSkillMove = false
                this.isSkillMove2 = false
            },
            inSkillClick: function(){
                this.$emit('skillClick')
            }
        }
    }
</script>

<style scoped>
    .skill-btn-box{
        position: relative;
        width:250px;
        height:250px;
        background:#10f8ff;
        border:1px solid #b9f781;
        border-radius: 50%;
        margin:80px auto;
    }
    .skill-btn-box>.skill-btn{
        width:100px;
        margin:100px auto;
    }
    .skill-btn-box>.skill-btn-br{
        width:230px;
        height:230px;
        position: absolute;
        left:8px;
        top:8px;
        z-index: 10;
        border:2px solid #269abc;
        border-radius: 50%;
    }
    .skill-btn-box>.skill-btn-br2{
        width:210px;
        height:210px;
        position: absolute;
        left:18px;
        top:18px;
        z-index: 10;
        border:2px solid #0d444a;
        border-radius: 50%;
    }
    .skillMove{
        animation: myfirst_br .5s linear .1s infinite alternate;
        /* Firefox: */
        -moz-animation: myfirst_br .5s linear .1s infinite alternate;
        /* Safari 和 Chrome: */
        -webkit-animation: myfirst_br .5s linear .1s infinite alternate;
        /* Opera: */
        -o-animation: myfirst_br .5s linear .1s infinite alternate;
    }
    .skillMove2{
        animation: myfirst_br2 .5s linear .1s infinite alternate;
        /* Firefox: */
        -moz-animation: myfirst_br2 .5s linear .1s infinite alternate;
        /* Safari 和 Chrome: */
        -webkit-animation: myfirst_br2 .5s linear .1s infinite alternate;
        /* Opera: */
        -o-animation: myfirst_br2 .5s linear .1s infinite alternate;
    }
    @keyframes myfirst_br
    {
        0%   {width:230px; height:230px;left:8px;top:8px;}
        25%  {width:240px; height:240px;left:4px;top:4px;}
        50%  {width:250px; height:250px;left:0px;top:0px;}
        75%  {width:240px; height:240px;left:4px;top:4px;}
        100% {width:230px; height:230px;left:8px;top:8px;}
    }
    @keyframes myfirst_br2
    {
        0%   {width:210px; height:210px;left:18px;top:18px;}
        25%  {width:220px; height:220px;left:14px;top:14px;}
        50%  {width:230px; height:230px;left:8px;top:8px;}
        75%  {width:220px; height:220px;left:14px;top:14px;}
        100% {width:210px; height:210px;left:18px;top:18px;}
    }
</style>