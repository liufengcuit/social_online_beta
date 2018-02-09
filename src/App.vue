<template>
  <div id="app">
  	<top></top>
	<main-frame v-if="mainFrame"></main-frame>
  </div>
</template>

<script>
import Top from './components/Top.vue'
import MainFrame from './components/MainFrame.vue'
export default {
  name: 'App',
  created(){
    this.$router.push("/")
  },
  computed:{
    mainFrame(){
      return this.$store.state.mainFrame
    }
  },
  components:{
  	Top,
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
  margin-bottom: 20px;
}
</style>