<template>
  <header :class="{login: isLogin, 'no-login': !isLogin}">
    <template v-if='!isLogin'>
      <h1>Let's share</h1>
      <p>精品博客汇聚</p>
      <div class="btns">
        <el-button >立即登录</el-button>
        <el-button>注册账号</el-button>
      </div> 
    </template>
    <template v-if='isLogin'>
      <h1>Let's share</h1>
      <i class="edit el-icon-edit"></i>
      <img class="avatar" src="../assets/o_logo.png" alt="">          
    </template>
  </header>
</template>

<script>

    export default {
        data(){
            return {
                 isLogin: true,
            }
        }
    }
</script>

<style lang="less">

header.no-login {
  padding: 0 12% 30px 12%;
  background: #149739;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: #fff;
    font-size: 40px;
    margin: 60px 0 0 0;
    text-transform: uppercase;
  }

  p {
    margin: 15px 0 0 0;
    color: #fff;
  }
  
  .btns {
    margin-top: 20px;
  }

  button {
    margin: 20px 5px 0;
  }
} 


header.login {
  display: flex;
  align-items: center;
  background: #149739;

  h1 {
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 40px;
    text-transform: uppercase;
    text-align: center;
    flex: 1;
  }

  .edit {
    color: #fff;
    font-size: 30px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-left: 15px;
    margin-right:40px;
    animation: rotate 2s linear infinite;
  }
  @keyframes rotate {
    0%{
transform: rotate(0deg)
    }
    100%{
transform: rotate(360deg)
    }

  }
}

</style>
