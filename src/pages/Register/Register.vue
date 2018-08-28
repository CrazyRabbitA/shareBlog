<template>
  <div id="login">
    <div class="wrap">
      <h4>用户名</h4>
      <el-input v-model="username" placeholder="用户名只能包含字母、数字、下划线，且必须以字母开头"></el-input>
      <h4>密码</h4>
      <el-input v-model="password" type="password" placeholder="密码不少于4位"></el-input>
      <el-button size="medium" @click="regist" class="log">立即注册</el-button>
      <p class="notice">已有账号？
        <router-link to="/login">立即登录</router-link>
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
      ifLogin: this.$store.state.ifLogin,
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
    regist() {
      if (
        this.loginData.some(item => {
          return item.attributes.username == this.username;
        })
      ) {
        this.notice('用户名已存在', 'warning');
      } else {
        var name = /^[a-zA-Z][a-zA-Z0-9_]*$/;
        if (!name.test(this.username)) {
          this.notice('用户名不符合规范', 'error');
          this.username = '';
          this.password = '';
        }
        if (name.test(this.username) && this.password.length <= 3) {
          this.notice('亲～密码太短啦', 'warning');
        } else if (name.test(this.username) && this.password.length > 3) {
          var TestObject = AV.Object.extend('login');
          var testObject = new TestObject();
          testObject
            .save({
              password: this.password,
              username: this.username,
            })
            .then(res => {
              let payload = {};
              payload.user = this.username;
              payload.password=this.password
              payload.status = true;
              this.$store.commit('setUser', payload);
              this.$store.commit('ifLogin', payload);
              this.$router.push({ path: '/icon' });
              this.notice('注册成功', 'success');

              var TestObject = AV.Object.extend(this.username);
              var testObject = new TestObject();
              testObject
                .save({
                  password: this.password,
                  username: this.username,
                })
                .then(() => {
                  //拿到存储用户基本信息的数据条的id,并且存到状态管理里面
                  var query = new AV.Query(this.$store.state.user);
                  query.find().then(res => {
                    // console.dir(res[0].id)
                    this.$store.commit('getId', res[0].id);
                    // console.dir(this.$store.state)
                  console.log(this.$store.state.user)
                  console.log(this.$store.state.informId)
                  

                  });
                });

              this.getLoginData();
            });
        }
      }
    },
  },
  created() {
    this.getLoginData();
    this.username=''
    this.password=''

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
      width: 400px;
    }
    .log:hover {
      color: white;
      background-color: #149739;
    }
  }
}
@media screen and (max-width: 460px) {
  .wrap {
    h4,
    input,
    p,
    .log {
      width: 270px !important;
    }
  }
}
</style>