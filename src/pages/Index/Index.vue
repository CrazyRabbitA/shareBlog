<template>
  <div id="index">
    <section class="item" v-for='blog in blogs' :key="blog.id" :data-blog-id=blog.id>
      <!-- <div class="user"> -->
      <div class="user">
        <img :src="blog.attributes.iconUrl" alt="个人头像" style="width:60px;height:60px;">
        <p>{{blog.attributes.dearname?blog.attributes.dearname:blog.attributes.username}}</p>
        <span>{{blog.attributes.publishTime|formatTime}}</span>
      </div>
      <!-- </div> -->
      <div class="blog">
        <p class="title">{{blog.attributes.title}}</p>
        <p class="description">{{blog.attributes.description}}</p>
      </div>
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
    text-align: center;
    img {
      border-radius: 50%;
      border: 1px solid transparent;
      cursor: default;
    }
    p {
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: default;
    }
    span {
      right: 0;
      color: grey;
      font-size: 12px;
    }
  }
  .blog {
    display: flex;
    flex-direction: column;
    flex: 1;
    .title {
      font-size: 18px;
      line-height: 40px;
      font-weight: 600;
      padding: 5px;
      cursor: default;
    }
    .description {
      font-size: 13px;
      color: #999;
      padding: 5px;
      flex: 1;
      border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
