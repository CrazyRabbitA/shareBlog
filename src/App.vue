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
    },
    methods:{
      refreshStore(){
console.log('刷新页面了')
console.log(this.$store)
    let a=window.localStorage.getItem('ifLogin')
    let b=window.localStorage.getItem('setUser')
    let c=window.localStorage.getItem('saveUrl')
    let d=window.localStorage.getItem('getId')
    let e=window.localStorage.getItem('setDearName')

    
    this.$store.commit('ifLogin',a)
    this.$store.commit('setUser',b)
    this.$store.commit('saveUrl', c)
    this.$store.commit('getId',d)
    this.$store.commit('setDearName',e)
      }
    },
    created(){
this.refreshStore()
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
padding:20px 15% 0 15%;
 }
}
@media screen and (max-width:420px){

#app {
 display:flex;
 flex-direction: column;
 height:100vh;
 #middle{
flex: 1;
padding:20px 5px 0 5px;
 }
}
}
</style>
