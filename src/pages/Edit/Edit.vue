<template>
  <div id="edit">
    <h1>编辑文章</h1>
    <h3>文章标题</h3>
    <el-input v-model="title" class="title"></el-input>
    <p class="msg">限30个字</p>
    <h3>内容简介</h3>
    <el-input type="textarea" class="description" v-model="description" :autosize="{ minRows: 2, maxRows: 6}"></el-input>
    <p class="msg">限300个字</p>
    <h3>文章内容</h3>
    <el-input type="textarea" class="content" v-model="content" :autosize="{ minRows: 4, maxRows: 30}"></el-input>
    <p class="msg">限3000个字</p>
    <p class="ifShow">
      <label>是否展示到首页</label>
      <el-switch v-model="ifShow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </p>
    <el-button @click="onCreate" class="confirm">确定</el-button>
  </div>
</template>
<script>
import fetch from '@/components/fetch.js';
export default {
  data() {
    return {
      title: '',
      description: '',
      content: '',
      ifShow: true,
      articalId: '',
      saveTime: '',
    };
  },
  methods: {
    notice(content, type) {
      this.$message({
        showClose: true,
        message: content,
        type: type,
      });
    },
    onCreate() {
      if (this.title && this.description && this.content) {
        var publishTime = new Date();
        var saveTime = publishTime.getTime();
        fetch
          .updateArtical(
            this.$store.state.user,
            this.articalId,
            this.title,
            this.description,
            this.content,
            saveTime,
            this.$store.state.iconUrl,
            this.$store.state.user,
            this.$store.state.dearName,
            this.ifShow
          )
          .then(() => {
            this.notice('编辑成功', 'success');
            fetch.getClassData('allArtical').then(res => {
              var index = res.findIndex(item => {
                return item.attributes.saveTime == this.saveTime;
              });
              if (index != -1) {
                var delId = res[index].id;
                fetch
                  .deleteData('allArtical', delId)
                  .then(() => {}, function(error) {
                    // 删除失败
                  });
              }
            });
          });
        if (this.ifShow) {
          fetch.createArtical(
            'allArtical',
            this.title,
            this.description,
            this.content,
            saveTime,
            this.$store.state.iconUrl,
            this.$store.state.user,
            this.$store.state.dearName,
            this.ifShow
          );
        }
        setTimeout(() => {
          this.$router.push('/main');
        }, 500);
      } else {
        if (!this.title) {
          this.notice('标题不能为空', 'warning');
        }
        if (!this.description) {
          this.notice('简介不能为空', 'warning');
        }
        if (!this.content) {
          this.notice('文章内容不能为空', 'warning');
        }
      }
    },
    getEditData() {
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
      params[e[3][0]] = e[3][1];
      this.articalId = params.id;
      fetch.getDetailData(params.user, params.id).then(
        res => {
          this.title = res.attributes.title;
          this.description = res.attributes.description;
          this.content = res.attributes.content;
          this.ifShow = res.attributes.ifShow;
          this.saveTime = res.attributes.saveTime;
        },
        function(error) {
          // 异常处理
        }
      );
    },
  },
  created() {
    this.getEditData();
  },
};
</script>   
<style lang="less">
@import '../../assets/base.less';

#edit {
  display: flex;
  padding: 0 5%;
  flex-direction: column;
  height: 100%;
  h1 {
    text-align: center;
  }
  h3 {
    font-size: 24px;
  }
  .title {
    font-size: 30px;
  }
  .description {
    font-size: 22px;
  }
  .content {
    font-size: 18px;
  }
  .msg {
    text-align: right;
    font-size: 16px;
    color: #999;
  }
  .confirm {
    color: @bgColor;
  }
  .confirm:hover {
    color: white;
    background-color: @bgColor;
  }
  .ifShow {
    padding: 10px;
  }
}
</style>
