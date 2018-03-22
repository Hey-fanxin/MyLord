<template>

    <div>

      <button :disabled="isDisabled" @click="hello">Button</button>
      <p>{{cliDis}}</p>

      <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="checkedNames">
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
      <label for="mike">Mike</label>
      <br>
      <span>Checked names: {{ checkedNames }}</span>
      <br />
      <p>{{ total }}</p>
      <button-counter @increment="incrementTotal"></button-counter>
      <button-counter @increment="incrementTotal"></button-counter>
    </div>
</template>

<script>
import Vue from 'vue'

Vue.component('button-counter', {
  template: '<button @click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
var myDirective = Vue.directive('button-counter');
export default {

  name: 'Page1',

  data () {
    return {
      isDisabled: false,
      msg:'hello',
      checkedNames: [],
      total:0
    }
  },
  methods: {
    incrementTotal: function(){
      this.total +=1
    },
    hello: function(){
      console.log(this._isVue)
    }
  },
  computed: {
    cliDis:function(){
        console.log('a')
        return Date.now()
      }
  }
}
</script>

<style lang="css" scoped>
</style>