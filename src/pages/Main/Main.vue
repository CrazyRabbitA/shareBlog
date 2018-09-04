<template>
  <div id="index">
    <section class="item" v-for='blog in blogs' :key="blog.id" :data-blog-id=blog.id>
      <router-link class="user" :to="{path:'/otherspace',query:{
       user:blog.attributes.username,
       random:Math.random()*100000000 
     }}" tag='div'>
        <img :src="blog.attributes.iconUrl" alt="个人头像" style="width:60px;height:60px;">
        <p>{{blog.attributes.dearname?blog.attributes.dearname:blog.attributes.username}}</p>
        <span>{{blog.attributes.saveTime|formatTime}}</span>
      </router-link>
      <router-link class="blog" :to="{path:'/artical',query:{user:'allArtical',
   id:blog.id,
  random:Math.random()*100000000
   }}" tag="div">
        <p class="title">{{blog.attributes.title}}</p>
        <p class="description">{{blog.attributes.description}}</p>
      </router-link>
    </section>
  </div>
</template>
<script>
import fetch from '@/components/fetch.js';
export default {
  data() {
    return {
      blogs: [],
    };
  },
  methods: {
    getBlog() {
      fetch.getClassData('allArtical').then(res => {
        res.reverse();
        this.blogs = res;
      });
    },
  },
  created() {
    this.getBlog();
  },
};
</script>
<style lang='less'>
.item {
  width: 100%;
  display: flex;
  .user {
    width: 112px;
    border-radius:15px;
    text-align: center;
    img {
      border-radius: 50%;
      border: 1px solid transparent;
      cursor: pointer;
    }
    p {
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    span {
      right: 0;
      color: grey;
      font-size: 12px;
    }
  }
  .user:hover{
    background-color: #97c4ea;
  }
  .blog {
    display: flex;
    flex-direction: column;
    flex: 1;
    border-radius:10px;

    .title {
      font-size: 18px;
      line-height: 40px;
      font-weight: 600;
      padding: 5px;
      cursor: pointer;
    }
    .description {
      font-size: 13px;
      color: #999;
      padding: 5px;
      flex: 1;
      border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    }
  }
  .blog:hover {
    background-color: rgba(168, 255, 199, 0.3);
  }
}
</style>
