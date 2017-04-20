<template>
<div class="page">
  <page-content class="bodys">
    <div class="content-block logincont-bg">
        <p v-if=" store_id === 0">
            <router-link :to="{ path: 'login' }">
                <m-button class="login" size="small" :bordered="true">
                    马上登录
                </m-button>
            </router-link>
        </p>
        <div v-else>
            <div class="grid_icon img-logo">
                <router-link :to="{path:'selfcenter'}">
                    <img :src="store_img" alt="">
                </router-link>
            </div>
            <p class="grid_label name-title">
                {{store_name}}
                <icons icon="nan" style="color:#69C6FF" v-if="store_sex == '男'">
                </icons>
                <icons icon="nv" style="color:#F187B8" v-if="store_sex == '女'">
                </icons>
                <span style="color:#666666" v-if="store_sex == '保密'">
                    保密
                </span>
            </p>
        </div>
    </div>
    <div class="content-padded cols">
        <div class="row row-cont">
            <div class="rowss">
                <icons icon="yuyue" style="color:#F94B4E">
                </icons>
                我的预约
            </div>
            <div class="rowss">
                <icons icon="lipeirexian" style="color:#71B1FC">
                </icons>
                理赔报案
            </div>
        </div>
    </div>
    <list class="list-con">
        <div slot="title"></div>
        <!-- <list-item :link="true">
            <div class="item-media">
                <icons icon="youxiaobaodan" style="color:#F5A846"></icons>
            </div>
            <div class="item-content">
                <div class="item-title-row">
                    <div class="item-title">
                        我的保单
                    </div>
                </div>
            </div>
        </list-item> -->
        <!-- <router-link :to="{path:'reservation'}"> -->
            <list-item :link="true" @click.native="routers({path:'reservation'})">
                <div class="item-media">
                    <icons icon="dingzhi" style="color:#FD986A"></icons>
                </div>
                <div class="item-content">
                    <div class="item-title-row">
                        <div class="item-title">
                            定制方案
                        </div>
                        <div class="item-after">
                        </div>
                    </div>
                </div>
            </list-item>
        <!-- </router-link> -->
        <list-item :link="true">
            <div class="item-media">
                <icons icon="shoucang" style="color:#F4C23F">
                </icons>
            </div>
            <div class="item-content">
                <div class="item-title-row">
                    <div class="item-title">
                        我的收藏
                    </div>
                    <div class="item-after">
                    </div>
                </div>
            </div>
        </list-item>
        <!-- <router-link :to="{path:'feedback'}"> -->
            <list-item :link="true" @click.native="routers({path:'feedback'})">
                <div class="item-media">
                    <icons icon="yijianfankui01" style="color:#79CF68">
                    </icons>
                </div>
                <div class="item-content">
                    <div class="item-title-row">
                        <div class="item-title">
                            意见反馈
                        </div>
                        <div class="item-after">
                        </div>
                    </div>
                </div>
            </list-item>
       <!--  </router-link> -->

        <!-- <list-item :link="true">
        <div class="item-media"><icon icon="clear"></icon></div>
        <div class="item-content">
        <div class="item-title-row">
        <div class="item-title">我的评测报告</div>
        <div class="item-after"></div>
        </div>
        </div>
        </list-item> -->
    </list>
</page-content>
</div>
</template>

<script>
import Content from '../components/content'
import Icons from '../components/icon'
import { List, ListItem } from '../components/list'
import Icon from '../components/icons'
import { Button, ButtonGroup } from '../components/buttons'
import store from '../directives/localStorage.js'

export default {
  components: {
    'page-content': Content,
    Icon,
    ButtonGroup,
    'm-button': Button,
    List,
    ListItem,
    Icons
  },
  data(){
    return{
      store_id: (store.read('uid') == null || store.read('uid') == undefined ) ? 0 :  1,
      store_img:(store.read('user_img') == null || store.read('user_img') == undefined || store.read('user_img') == "" ) ?  "http://www.ybbuys.com/appserver/static/img/default_touxiang.png" : store.read('user_img'),
      store_name:(store.read('user_name') == null || store.read('user_name') == undefined  || store.read('user_name') == "") ? "匿名" : store.read('user_name'),
      store_sex:(store.read('user_sex') == null || store.read('user_sex') == undefined  || store.read('user_sex') == "保密" ) ? "保密" : store.read('user_sex')
    }
    
  },
  activated(){
      this.store_id = (store.read('uid') == null || store.read('uid') == undefined ) ? 0 :  1,
      this.store_img = (store.read('user_img') == null || store.read('user_img') == undefined || store.read('user_img') == "" ) ?  "http://www.ybbuys.com/appserver/static/img/default_touxiang.png" : store.read('user_img'),
      this.store_name = (store.read('user_name') == null || store.read('user_name') == undefined  || store.read('user_name') == "") ? "匿名" : store.read('user_name'),
      this.store_sex = (store.read('user_sex') == null || store.read('user_sex') == undefined  || store.read('user_sex') == "保密" ) ? "保密" : store.read('user_sex')
      document.title = "我的";
  },
  mounted(){
    document.title = "我的";
  },
  methods: {
    routers(router){
      this.$router.push(router);
    }
  }
}
</script>
<style>
.icons {
  font-size: 24px;
  color: #3cc51f;
}
.rows{
  text-align: center;
  line-height: 2rem;
}

.logincont-bg{
  background: #8ADA54;
  padding: 0.8rem 0;
  text-align: center;
}
.login{
  border: 1px solid #ffffff ;
  color: #ffffff !important;
}
.row-cont{
  background: #ffffff
}
.list-con{
  margin-top:0.5rem;
}
.img-logo{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background:#fff;
  border:1px solid #fff;

    margin: 0 auto;
}
.img-logo>a>img{
  border-radius: 50%;
      display: block;
    width: 100%;
    height: 100%;
}
.name-title{
  color: #fff;
  font-size: 0.9rem;
   line-height: 1.2rem;
}
.rowss .iconfont, .name-title .iconfont,.item-media .iconfont{
      font-size: 1.2rem;
    line-height: 1.2rem;
}
.col-33{
      width: 29.333333333333332%;
    margin-left: 2%;
    display: inline-block;
}
.rowss {
    text-align: center;
    font-size: 0.7rem;
    padding:.3rem 0;
    width: 49%;
    display: inline-table;
}
</style>

