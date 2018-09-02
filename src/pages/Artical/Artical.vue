<template>
  <div id="detail">
    <section class="user-info">
      <img :src='iconUrl' :alt="username" :title="username" class="icon">
      <div class="wrap">
        <h3>{{title}}</h3>
        <p>●{{dearname?dearname:username}} ●发布于{{publishTime|formatTime}}</p>
      </div>
    </section>
    <section class="article" v-html="markdown"></section>
  </div>
</template>
<script>
import marked from 'marked';
import fetch from '@/components/fetch.js';
export default {
  data() {
    return {
      title: '',
      description: '',
      content: '',
      articalId: '',
      username: '',
      dearname: '',
      publishTime: '',
      iconUrl: '',
    };
  },
  methods: {
    getArtical() {
      let s = document.location.href;
      let b = s.indexOf('?');
      let c = s.substring(b + 1);
      let d = c.split('&');
      let e = d.map(item => {
        return (item = item.split('='));
      });
      let params = {};
      params[e[0][0]] = e[0][1];
      params[e[1][0]] = e[1][1];
      params[e[2][0]] = e[2][1];
      this.articalId = params.id;
      console.dir(params);
      if (params.user != 'allArtical') {
        fetch.getDetailData(this.$store.state.user, params.id).then(
          res => {
            this.title = res.attributes.title;
            this.description = res.attributes.description;
            this.content = res.attributes.content;
            this.publishTime = res.attributes.publishTime;
            this.iconUrl = this.$store.state.iconUrl;
            this.dearname = this.$store.state.dearName;
            this.username = res.attributes.username;
          },
          function(error) {
            // 异常处理
          }
        );
      } else {
        fetch.getDetailData('allArtical', params.id).then(
          res => {
            this.title = res.attributes.title;
            this.description = res.attributes.description;
            this.content = res.attributes.content;
            this.publishTime = res.attributes.saveTime;
            this.iconUrl = res.attributes.iconUrl;
            this.dearname = res.attributes.dearname;
            this.username = res.attributes.username;
          },
          function(error) {
            // 异常处理
          }
        );
      }
    },
  },
  created() {
    this.getArtical();
  },
  computed: {
    markdown() {
      return marked(this.content);
    },
  },
};
</script>

<style lang='less' scoped>
@import '../../assets/base.less';
@import '../../assets/article.less';
#detail {
  .user-info {
    display: flex;
    border-bottom: 1px solid #ebebeb;
    .icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .wrap {
      h3 {
        margin: 5px 0;
      }
      p {
        margin-top: 0;
        font-size: 12px;
        color: @textLighterColor;
      }
    }
  }
  .article {
    padding: 30px 0;
  }
}
</style>
