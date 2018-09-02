import AV from 'leancloud-storage'
export default {
  // 输入class名，获取数据
  getClassData (className) {
    var query = new AV.Query(className)
    return query.find()
  },
  //输入class名和id，获取数据
  getDetailData(className,id){
    var query = new AV.Query(className)
    return query.get(id)
  },
  // 在login中保存账号密码
  saveInLogin (username, password) {
    var TestObject = AV.Object.extend('logIn')
    var testObject = new TestObject()
    return testObject.save({
      'password': password,
      'username': username
    })
  },
  // 创建一个新的class,在个人信息里存入用户名和密码
  setNewClass (className) {
    var TestObject = AV.Object.extend(className)
    var testObject = new TestObject()
    return testObject.save({
      'username': className
    })
  },
  //已知class名和id，更新具体数据条中的iconUrl,第三个参数是更改属性名，第四个参数是属性值
  updateData(className,id,iconUrl,url){
    var todo = AV.Object.createWithoutData(className,id);
    todo.set(iconUrl, url);
    return todo.save()
  },
  //删除某个数据条
  deleteData(className,id){
    var todo = AV.Object.createWithoutData(className,id);
    return todo.destroy()
  },
  //创建文章
  createArtical(className,title,description,content,saveTime,iconUrl,username,dearname,ifShow){
    var TestObject = AV.Object.extend(className);
    var testObject = new TestObject();
    return testObject.save({
        'title':title,
        'description':description,
        'content':content,
        'saveTime':saveTime,
        'iconUrl':iconUrl,
        'username':username,
        'dearname':dearname,
        'ifShow':ifShow,
  })
  },
  //更新文章
  updateArtical(className,id,title,description,content,saveTime,iconUrl,username,dearname,ifShow){
    var todo = AV.Object.createWithoutData(className,id);
    todo.set('title', title);
    todo.set('description', description);
    todo.set('content', content);
    todo.set('saveTime', saveTime);
    todo.set('iconUrl', iconUrl)
    todo.set('username',username);
    todo.set('dearname', dearname);
    todo.set('ifShow', ifShow);
    return todo.save()
  },
}
