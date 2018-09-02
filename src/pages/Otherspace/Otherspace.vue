<template>
  <div id="myArtical">
    <div class="head">
      <div class="icon">
        <img :src="personData.attributes.iconUrl" alt="头像">
        <span>{{personData.attributes.dearname?personData.attributes.dearname:personData.attributes.username}}</span>
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
          <span class="publish">{{item.attributes.saveTime|formatTime}}</span>
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
    };
  },
  methods: {
    //获取href里的参数
    getData() {
      let s = document.location.href;
      let b = s.indexOf('?');
      let c = s.substring(b + 1);
      let d = c.split('&');
      let e = d.map(item => {
        return (item = item.split('='));
      });
      let params = {};
      params[e[0][0]] = e[0][1];
      params[e[1][0]] = e[1][1];
      fetch.getClassData(params.user)
      .then(res => {
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
    // border: 1px solid #000;
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
    // border: 1px solid #000;
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
