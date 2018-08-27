<template>
  <div id="app">
<Header></Header>
<main id="middle">
  <router-view></router-view>
</main>
  <Footer></Footer>
  </div>

 
</template>

<script>
import Footer from './components/Footer'
import Header from './components/Header'

export default {
  name: 'App',
    data() {
      return {
   
      }
    },
    components:{
      Footer,
      Header,
    }
}
</script>

<style lang="less">
*{
  margin:0;
}
#app {
 display:flex;
 flex-direction: column;
 height:100vh;
 #middle{
flex: 1;
 }

}
</style>
