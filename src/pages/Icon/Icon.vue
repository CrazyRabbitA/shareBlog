<template>
  <div id="selectIcon">
    <h4>选择我的头像</h4>
    <div class="wrap">
      <img :src="url" alt="选择你的头像" v-for="(url,index) in iconUrl" :key="index" style="width:80px;height:80px" class="icon" @click=selectIcon(url)>
    </div>
  </div>
</template>
<script>
import fetch from '@/components/fetch.js';

export default {
  data() {
    return {
      icons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    };
  },
  computed: {
    //用于选择的图标的外链地址组成的数组
    iconUrl() {
      return this.icons.map(item => {
        return (item = 'http://pe45ech9f.bkt.clouddn.com/' + item + '.jpg');
      });
    },
  },
  methods: {
    selectIcon(url) {
      this.$confirm('选择该图标作为头像吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
      })
        .then(() => {
          this.saveImg(url);
          //如果是从注册页进入该icon页，则选完图标后跳转到main
          //如果从别的页面进入该icon页，选完图标后后退到之前页面
          //延迟一秒执行是为了让数据库的数据来得及更新
          setTimeout(() => {
            if (window.location.hash == '#/icon?regist=true') {
              this.$router.push('/main');
            } else {
              this.$router.go(-1);
            }
          }, 1000);
          this.$message({
            type: 'success',
            message: '设置头像成功',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '请重新选择',
          });
        });
    },
    saveImg(url) {
      //头像链接保存到store和localStorage
      this.$store.commit('saveUrl', url);
      window.localStorage.setItem('saveUrl', url);
      fetch.updateData(
        this.$store.state.user,
        this.$store.state.informId,
        'iconUrl',
        url
      );
      //更新allArtical里的头像链接
      //首先获取所有allArtical里用户名为当前用户名的数据条的id
      var idArr = [];
      fetch.getClassData('allArtical').then(res => {
        res.forEach((item, index) => {
          if (item.attributes.username == this.$store.state.user) {
            idArr.push(item.id);
          }
        });
        //然后更新每个id对应的数据条里的头像链接
        idArr.forEach(item => {
          fetch.updateData('allArtical', item, 'iconUrl', url);
        });
      });
    },
  },
};
</script>
<style lang='less'>
#selectIcon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    font-size: 20px;
    color: #149739;
    margin-top: 10vh;
  }
  .wrap {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    .icon {
      margin: 5px;
      border-radius: 20%;
      cursor: pointer;
      box-sizing: border-box;
    }
    .icon:hover {
      border: 3px solid #149739;
    }
  }
}
@media screen and (min-width: 400px) {
  .wrap {
    width: 360px !important;
  }
}
</style>
