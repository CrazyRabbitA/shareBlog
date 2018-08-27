getLoginData() {
    var query = new AV.Query('login');
    query.find().then(res => {
      console.dir(res);
      this.loginData = res;
    });
  }

  var TestObject = AV.Object.extend('login');
  var testObject = new TestObject();
  testObject
    .save({
      password: this.password,
      username: this.username,
    })

      // 第一个参数是 className，第二个参数是 objectId
  var todo = AV.Object.createWithoutData('Todo', '5745557f71cfe40068c6abe0');
  // 修改属性
  todo.set('content', '每周工程师会议，本周改为周三下午3点半。');
  // 保存到云端
  todo.save();