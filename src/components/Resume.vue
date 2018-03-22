<template>
  <div>
      <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
      <Button type="default" v-on:click="getResume" >Resume</Button>
  </div>
</template>

<script>
    import {Button, Input} from 'iview'
    import axios from 'axios'

    export default {
        name: 'Resume',
        data() {
            return {
                value:''
            }
        },
        methods: {
            getResume: function(){
                axios.get('/db/resume')
                    .then((res) => {
                        console.log(res);
                        this.value = res.data.name
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        components: {
            [Button.name]: Button,
            [Input.name]: Input
        }
    }
</script>
<style>

</style>
