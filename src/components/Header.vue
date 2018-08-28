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
      <router-link to="/" class="logo"> Let's share</router-link>
      <router-link to="create">
        <i class="edit el-icon-edit"></i>
      </router-link>
      <img class="myIcon" :src="userIcon" alt="我的头像">
       <div class="menu">
<span to="" class="set" @click='setName'> 设置昵称</span>
<router-link to="/icon" class="set"> 修改头像</router-link>
<span to="" class="set" @click='setPassword'> 修改密码</span>
<router-link to="/myartical" class="set"> 我的文章</router-link>
<router-link to="/" class="set"> 注销登陆</router-link>


       
       
       
        
       </div>
    </div>
   
  </header>
</template>
<script>
import AV from 'leancloud-storage';

export default {
  data() {
    return {
     
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    userIcon() {
      return this.$store.state.iconUrl
        ? this.$store.state.iconUrl
        : 'http://pe45ech9f.bkt.clouddn.com/defaultIcon.jpg';
    },
  },
  methods:{

 
       setName() {
        this.$prompt('请输入您的昵称（只含有汉字、数字、字母、下划线且不能以下划线开头和结尾）', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
          inputErrorMessage: '昵称格式不正确'
        }).then(({ value }) => {
          console.log(this.$store.state.user)
          console.log(this.$store.state.informId)

 var todo = AV.Object.createWithoutData(this.$store.state.user, this.$store.state.informId);
  todo.set('dearName', value);
  todo.save();
this.$store.commit('setDearName',value)

  // var allArtical=AV.Object.extend('allArtical')

          this.$message({
            type: 'success',
            message: '你的昵称是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },

     

      
       setPassword() {
        this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          console.log(this.$store.state.user)
          console.log(this.$store.state.informId)
          console.log(this.$store.state.password)

//修改个人信息里的密码
 var todo = AV.Object.createWithoutData(this.$store.state.user, this.$store.state.informId);
  todo.set('password', value);
  todo.save();


//修改login里面的密码,先获取数据表里的id
   var query = new AV.Query('login');
    query.find().then(res => {
      console.dir(res);
   let userIndex=res.findIndex((item,index)=>{
return item.attributes.username==this.$store.state.user
   })
   console.log(userIndex)
   let id=res[userIndex].id
   console.log(id)
   //拿到id后修改login里的密码
    var todo = AV.Object.createWithoutData('login', id);
  todo.set('password', value);
  todo.save();

    });

  

          this.$message({
            type: 'success',
            message: '你的新密码是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
  }
};
</script>

<style lang="less">
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
  position:relative;
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
    margin-right: 40px;
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
   .menu{
    position: absolute;
    top:100%;
 right:0;
    display:block;
    width: 86px;
    border: 1px solid rgba(0,0,0,.3);
    text-align:center;
    box-sizing: border-box;
    border-radius: 5px;
    z-index:1000;
   .set{
      text-decoration: none;
    color: #149739;
    margin:10px 0;
    font-size:18px;
   }
   .set:hover{
     color:white;
     background-color: #149739;
   }
  }
}

</style>
