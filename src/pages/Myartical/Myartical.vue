<template>
    <div id="myArtical">
        <div class="head">
            <div class="icon">
                <img :src="this.$store.state.iconUrl" alt="头像" style="width:100px;height:100px;">
                <span>{{this.$store.state.dearName?this.$store.state.dearName:personData.attributes.username}}</span>
            </div>
            <canvas></canvas>
        </div>

        <section class="articals" v-for="item in articalData">
            <p>{{item.attributes.title}}</p>
            <p>{{item.attributes.content}}</p>

        </section>

    </div>
</template>

<script>
import AV from 'leancloud-storage';

export default {
  data() {
    return {
        personData:null,
        articalData:null,
    };
  },
  methods: {
    getData() {
console.log(this.$store.state.user)
console.log(this.$store.state.dearName)

   var query = new AV.Query(this.$store.state.user);
      query.find().then(res => {
        console.dir(res);
        this.personData=res[0]
        console.dir(this.personData)
        this.articalData=res.slice(1).reverse()
        console.dir(this.articalData)
      });

    },
  },
  created(){
      this.getData()
  }
};
</script>
<style lang="less">
#myArtical {
  display: flex;
  flex-direction: column;
  .head {
      display:flex;
    width: 100%;
    border: 1px solid #000;
    .icon {
      width: 100px;
      border: 1px solid #000;
      text-align:center;
    }
  }
  .articals {
    width: 100%;
    border: 1px solid #000;
  }
}
</style>
