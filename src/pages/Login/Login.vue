<template>
    <div id="login">
        <div class="wrap">
            <h4>用户名</h4>
            <el-input v-model="username" placeholder="请输入用户名"></el-input>
            <h4>密码</h4>
            <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
            <el-button size="medium" @click="logIn" class="log">立即登陆</el-button>
            <p class="notice">没有账号？
                <router-link to="/register">注册新用户</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import AV from 'leancloud-storage';

export default {
  data() {
    return {
      username: '',
      password: '',
      loginData: [],
      ifLogin:this.$store.state.ifLogin,
      iconUrl:''
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

    getLoginData() {
      var query = new AV.Query('login');
      query.find().then(res => {
        // console.dir(res);
        this.loginData = res;
      });
    },

    logIn() {
      console.dir(this.loginData);
      if (
        !this.loginData.some(item => {
          return item.attributes.username == this.username;
        })
      ) {
        this.notice('用户名不存在', 'error');
        this.password = '';
        this.username = '';
      } else {
        this.loginData.forEach(item => {
          if (
            item.attributes.username == this.username &&
            item.attributes.password == this.password
          ) {    
               let payload={}
    payload.user=this.username
    payload.status=true
    this.$store.commit('ifLogin',payload)
    this.$store.commit('setUser',payload)
              this.$router.push({ path: '/' });
            this.notice('登陆成功', 'success');
                var query = new AV.Query(this.username);
    query.find().then(res => {
      console.dir(res);
    this.$store.commit('saveUrl', res[0].attributes.imgUrl)
    });

        
          } else if (
            item.attributes.username == this.username &&
            item.attributes.password != this.password
          ) {
            this.notice('密码不正确', 'error');
            this.password = '';
          }
        });
      }
    },
  },
  created() {
    this.getLoginData();
  },
};
</script>

<style lang="less">
@import url('../../assets/base.less');

#login {
  display: flex;
  justify-content: center;
  padding-top: 30px;
  .wrap {
    display: flex;
    flex-direction: column;
    h4 {
      margin: 10px 0 5px;
      width: 400px;
    }

    p {
      margin: 5px 0;
      width: 400px;
    }

    input {
      width: 400px;
    }

    .error {
      font-size: 12px;
      color: #f00;
    }

    button {
      margin-top: 30px;
    }

    .notice {
      font-size: 12px;
      color: @textLighterColor;
      text-align: center;
      margin-top: 30px;

      a {
        color: @themeColor;
      }
    }
    .log {
      color: #149739;
      width:400px;
    }
    .log:hover {
      color: white;
      background-color: #149739;

      transition: all 0.3s;
    }
  }
}

@media screen and (max-width: 460px) {
  .wrap {
    h4 {
      margin: 10px 0 5px;
      width: 270px !important;
    }
    input {
      width: 270px !important;
    }
    .log{
      width: 270px !important;
  }
  p{
      width: 270px !important;

  }
  }
}
</style>
