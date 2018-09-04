<template>
  <div id="myArtical">
    <div class="head">
      <div class="icon">
        <img :src="this.$store.state.iconUrl" alt="头像">
        <span>{{this.$store.state.dearName?this.$store.state.dearName:this.$store.state.user}}</span>
      </div>
    </div>
    <router-link :to="{path:'/artical',query:{
               user:item.attributes.username,
               id:item.id,
               random:Math.random()*100000000 
             }}" v-for="item in articalData" :key="item.id" class="articals">
      <div class="date">
        <span class="day">{{splitDate(item.attributes.saveTime).date}}</span>
        <span class="month">{{splitDate(item.attributes.saveTime).month}}月</span>
        <span class="year">{{splitDate(item.attributes.saveTime).year}}</span>
      </div>
      <div class="content">
        <h3>
          {{item.attributes.title}}
        </h3>
        <p>{{item.attributes.description}}</p>
        <div class="actions">
          <router-link :to="{path:'/edit',query:{
               user:item.attributes.username,
               id:item.id,
              publishTime:item.attributes.saveTime,
               random:Math.random()*100000000
             }}" class="green">
            编辑</router-link>
          <a href="#" class="green" @click.prevent="delateArtical(item.attributes.username,item.id,item.attributes.title)">删除</a>
          <span class="publish">{{item.attributes.saveTime|formatTime}}</span>
          <span v-if=!item.attributes.ifShow class="ifShow">未发布</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import fetch from '@/components/fetch.js';
export default {
  data() {
    return {
      personData: null,
      articalData: null,
      delId: '',
    };
  },
  methods: {
    getData() {
      fetch.getClassData(this.$store.state.user).then(res => {
        this.personData = res[0];
        this.articalData = res.slice(1).reverse();
      });
    },
    splitDate(dataStr) {
      let dateObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr);
      return {
        date: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear(),
      };
    },
    delateArtical(user, id, title) {
      this.$confirm('确定删除该文章吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.delateFromBase(user, id, title);
          this.$message({
            type: 'success',
            message: '文章删除成功',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '删除失败',
          });
        });
    },
    delateFromBase(user, id, title) {
      //从class里删除
      fetch.deleteData(user, id).then(() => {
        this.getData();
      });
      //从allArtical里删除
      fetch.getClassData('allArtical').then(res => {
        var index = res.findIndex(item => {
          return item.attributes.title == title;
        });
        var delId = res[index].id;
        fetch.deleteData('allArtical', delId).then(() => {});
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style lang="less">
@import '../../assets/base.less';
#myArtical {
  display: flex;
  flex-direction: column;
  .head {
    display: flex;
    width: 100%;
    .icon {
      width: 100px;
      text-align: center;
      border-radius: 20px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid transparent;
      }
    }
  }
  .articals {
    width: 100%;
    display: flex;
    margin: 20px 0 0 0;
    text-decoration: none;
    .date {
      margin: 0 15px;
      span {
        display: block;
        color: @textLighterColor;
        text-align: center;
      }
      .day {
        font-size: 40px;
      }
    }
    .content {
      flex: 1;
      h3 {
        line-height: 50px;
        color: #333;
      }
      p {
        font-size: 14px;
        color: #333;
        cursor: pointer;
      }
      .green {
        color: rgba(0, 153, 51, 0.6);
        text-decoration: none;
        border-radius: 4px;
      }
      .green:hover {
        color: white;
        background-color: rgba(0, 153, 51, 0.6);
      }
      .publish {
        color: #999;
      }
      .ifShow {
        color: #ff4acb;
      }
    }
  }
}
</style>
