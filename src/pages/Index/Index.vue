<template>
  <div id="index">
 <section class="item" v-for='blog in blogs' :key="blog.id" :data-blog-id=blog.id>
   <div class="user">
     <img :src="blog.attributes.iconUrl" alt="个人头像" style="width:60px;height:60px;">
     <p>{{blog.attributes.dearName?blog.attributes.dearName:blog.attributes.user}}</p>
   </div>
   <div class="blog">
     <p class="title">{{blog.attributes.title}}</p>
     <p class="description">{{blog.attributes.description}}</p>
   </div>
 </section>
  </div>
</template>

<script>
import AV from 'leancloud-storage';
  export default {
    data(){
      return{
        blogs:[],
     


      }
    },
    methods:{
      getBlog(){
          
      var query = new AV.Query('allArtical');
      query.find().then(res => {
        console.dir(res);
        this.blogs= res;
      });
    },
    onPageChange(){

    }
      
    },
    created(){
      this.getBlog()
    }

  }
</script>

<style lang='less'>
.item{
  width: 100%;
  // border: 1px solid #000;
  display:flex;
  .user{
    padding:5px 5px 5px 20px;
    width: 10wh;
    // border: 1px solid #000;
img{
  border-radius:10px;
}
p{
  text-align:center;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
  }
  .blog{
    display:flex;
    flex-direction: column;
flex:1;
.title{
  font-size:18px;
  height:40px;
  line-height:40px;
  font-weight:600;
  padding:5px;
  border-bottom:solid 1px rgba(0,0,0,0.1)
}
.description{
  font-size:13px;
  color:#999;
  padding:5px;
  flex:1;
}
  }
}
</style>
