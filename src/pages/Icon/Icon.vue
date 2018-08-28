<template>
    <div id="selectIcon">

  <h4>选择我的头像</h4>
<div class="wrap">
  <img :src="url" alt="选择你的头像" v-for="(url,index) in iconUrl" :key="index" style="width:80px;height:80px" class="icon" @click=selectIcon(url)>
</div>
    </div>
</template>
1.jpg
<script>
    import AV from 'leancloud-storage';
    export default {
        data(){
            return {
                icons:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
            
            }
        },
        computed:{
            iconUrl(){
                return  this.icons.map(item=>{
                   return  item='http://pe45ech9f.bkt.clouddn.com/'+item+'.jpg'
                })
            }
        },
        methods:{
                  selectIcon(url) {
                      
        this.$confirm('选择该图标作为头像吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
             this.saveImg(url)
                    this.$router.go(-1)
            
          this.$message({
            type: 'success',
            message: '设置头像成功'
          })           
          }).catch(() => {
          this.$message({
            type: 'info',
            message: '请重新选择'
          });          
        });
      },
      saveImg(url){
          this.$store.commit('saveUrl',url)
          console.dir(this.$store.state.iconUrl)
        var className=this.$store.state.user
        var id=this.$store.state.informId
        var todo = AV.Object.createWithoutData(className,id)
        todo.set('imgUrl',url)
        todo.save()
       
      }
        },
        created(){
 
        }
    
        

}
    
</script>
<style lang='less'>
#selectIcon{
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
h4{
font-size:20px;
color:#149739;
margin-top:10vh;
}
.wrap {
    display: flex;
    flex-wrap: wrap;
    width:80%;
 
    .icon{
        margin:5px;
        border-radius:20%;
        cursor: pointer;
        box-sizing: border-box;
    }
    .icon:hover {
border:3px solid #149739;
    }
}
}
@media screen and (min-width:400px){
    .wrap{
        width:360px !important; 
    }
}
</style>
