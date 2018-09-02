<template>
  <header>
    <div v-if='!isLogin' class="no-login">
      <router-link to="/" class="logo"> Let's share</router-link>
      <p>精品博客汇聚</p>
      <div class="btns">
        <router-link to='login'>
          <el-button class="turnBig">立即登录</el-button>
        </router-link>
        <router-link to='register'>
          <el-button class="turnBig">注册账号</el-button>
        </router-link>
      </div>
    </div>
    <div v-if='isLogin' class="isLogin">
      <router-link to="/main" class="logo"> Let's share</router-link>
      <router-link to="create">
        <i class="edit el-icon-edit"></i>
      </router-link>
      <img class="myIcon" :src="userIcon" alt="我的头像" @click="show=!show">
    </div>




    <transition name="slide-fade">
   <Menu  v-if="show" class="showMenu" @hideMask='hide'></Menu>    
    </transition>
    <div class="mask" @click="show=!show" v-if="show"></div>
  </header>
</template>
<script>
import AV from 'leancloud-storage';
import Menu from '@/pages/Menu/Menu'
export default {
  data() {
    return {
     show:false,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin=='true';
    },
    userIcon() {
      return this.$store.state.iconUrl
        ? this.$store.state.iconUrl
        : 'http://pe45ech9f.bkt.clouddn.com/defaultIcon.jpg';
    },
  },
  methods:{
    hide(){
      console.log('隐藏mask')
      this.show=false
    }
  },
  components:{
    Menu,
  }
 
};
</script>

<style lang="less" scoped>

header{
  position:relative;
  

.no-login {
  padding: 0 12% 30px 12%;
  background: #149739;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    color: #fff;
    font-size: 35px;
    margin: 60px 0 0 0;
    text-transform: uppercase;
    text-decoration: none;
  }

  p {
    margin: 15px 0 0 0;
    color: #fff;
  }

  .btns {
    margin-top: 20px;
    .turnBig {
      color: #149739;
    }
    .turnBig:hover {
      transform: scale(1.2, 1.2);
      transition: all 0.3s;
      color: white;
      background-color: #149739;
    }
  }

  button {
    margin: 20px 5px 0;
  }
}

.isLogin {
  display: flex;
  align-items: center;
  background: #149739;
  .logo {
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 40px;
    text-transform: uppercase;
    text-align: center;
    flex: 1;
    text-decoration: none;
  }

  .edit {
    color: #fff;
    font-size: 30px;
  }

  .myIcon {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    cursor: pointer;
    border-radius: 50%;
    margin-left: 15px;
    margin-right: 10%;
    animation: rotate 4s linear infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.showMenu{
  position:absolute;
  top:100%;
  right:8%;
  z-index:1000;
}
  /* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.mask{
  background-color: transparent;
  width: 100%;
  height: 100%;
  position:fixed;
  left:0;
  top:0;
}
}
</style>
