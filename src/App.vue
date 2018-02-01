<template>
  <div id="app">
<!-- 	<other-message-type :messages="{'type':'redbag'}"></other-message-type>
	<self-message-type :messages="{'type':'text'}"></self-message-type>
	<other-message-type :messages="{'type':'text'}"></other-message-type>
	<self-message-type :messages="{'type':'text'}"></self-message-type>
	<other-message-type :messages="{'type':'image'}"></other-message-type>
	<self-message-type :messages="{'type':'redbag'}"></self-message-type>
	<other-message-type :messages="{'type':'text'}"></other-message-type>
	<self-message-type :messages="{'type':'image'}"></self-message-type>
	<other-message-type :messages="{'type':'text'}"></other-message-type>
	<other-message-type :messages="{'type':'text'}"></other-message-type> -->
	<main-frame></main-frame>
  </div>
</template>

<script>
import OtherMessageType from './components/OtherMessageType.vue'
import SelfMessageType from './components/SelfMessageType.vue'
import MainFrame from './components/MainFrame.vue'
export default {
  name: 'App',
  components:{
  	OtherMessageType,
  	SelfMessageType,
  	MainFrame
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*background: #3e7bab*/
}
</style>