<template>
    <div class="menu" @click='offMask'>
        <span to="" class="set" @click='setName'> 设置昵称</span>
        <router-link to="/icon" class="set"> 修改头像</router-link>
        <span to="" class="set" @click='setPassword'> 修改密码</span>
        <router-link to="/myartical" class="set"> 我的文章</router-link>
        <span to="/" class="set" @click='logOff'> 注销登陆</span>
    </div>
</template>
<script>
import fetch from '@/components/fetch.js';
export default {
  data() {
    return {};
  },
  methods: {
    offMask() {
      this.$emit('hideMask', false);
    },
    //element-ui的弹框
    setName() {
      this.$prompt(
        '请输入您的昵称（只含有汉字、数字、字母、下划线且不能以下划线开头和结尾）',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
          inputErrorMessage: '昵称格式不正确',
        }
      )
        .then(({ value }) => {
          //更新个人class里的个人数据里的昵称
          fetch.updateData(this.$store.state.user, this.$store.state.informId)  
          //将刚刚更改的昵称保存到store和localStorage
          this.$store.commit('setDearName',value)
          window.localStorage.setItem('setDearName', value);
          //更新allArtical里用户名为当前用户名的文章数据条里的dearname
          //首先遍历整个allArtical，找到用户名为当前用户名的所有数据条的id，放到一个空数组里
          var idArr = [];
          fetch.getClassData('allArtical')
          .then(res => {
            res.forEach((item, index) => {
              if (item.attributes.username == this.$store.state.user) {
                idArr.push(item.id);
              }
            });
            //更新每一个id对应的数据条里的dearname
            idArr.forEach(item => {
              fetch.updateData('allArtical',item,'dearname',value)
            });
            //判断当前页面是不是主页，如果是主页，为了能让中间的内容部分重新获取更新后的数据，要刷新一下页面，如果不是主页，当切换到主页时，中间的部分会在created时自动获取数据，因此不用刷新页面
            if(window.location.hash == '#/main') {
              //一定要设置延迟，要不然数据还在上传的时候刷新页面了，上传就中断了
          setTimeout(()=>{
                window.location.reload();
          },1000)
            }
          });
          this.$message({
            type: 'success',
            message: '你的昵称是: ' + value,
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '昵称未更改',
          });
        });
    },
    setPassword() {
      this.$prompt('请输入新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
fetch.getClassData('logIn')
          .then(res => {
            let userIndex = res.findIndex((item, index) => {
              return item.attributes.username == this.$store.state.user;
            });
            let id = res[userIndex].id;
            fetch.updateData('login',id,'password',value)
          });
          this.$message({
            type: 'success',
            message: '你的新密码是: ' + value,
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入',
          });
        });
    },
    //注销操作，跳转到初始页面，这里用replace不是push，重置localStorage里的内容，登录状态设置为false，注意false字符串格式，最后刷新
    logOff() {
      this.$router.replace('/');
      window.localStorage.setItem('ifLogin', 'false');
      window.localStorage.setItem('setUser', '');
      window.localStorage.setItem('saveUrl', '');
      window.localStorage.setItem('getId', '');
      window.localStorage.setItem('setDearName', '');
      window.location.reload();
    },
  },
};
</script>
<style lang="less">
.menu {
  top: 100%;
  display: block;
  width: 86px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  box-sizing: border-box;
  border-radius: 5px;
  z-index: 1000;
  .set {
    text-decoration: none;
    color: #149739;
    margin: 10px 0;
    font-size: 18px;
    cursor: pointer;
  }
  .set:hover {
    color: white;
    background-color: #149739;
  }
}
</style>
