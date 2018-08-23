<template>
  <div id="app">

<Header></Header>

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

<style >
#app {
 
}
</style>
