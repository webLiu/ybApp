<template>
  <div class="page">
    <page-content class="new-bg">
      <div class="appiont-head">
        <h1 class="appiont-tt1">预约顾问 免费定制</h1>
        <h2 class="ui-f15 ui-fcw">花最少的钱  获最优保障</h2>
        <img src="http://m.huize.com/activities/yuyue/bdym/images/bg2.png"  alt="" class="appiont-img1">
      </div>
      <section class="formce">
          <h2>今日已有<span class="fc10" id="acContainter">2801</span>人预约顾问</h2>
          <h3 class="ui-tac">现在预约，优惠高达<span class="fc10">30%</span></h3>
          <form-list>
            <form-item>
                <div class="item-content">
                  <div class="item-input">
                    <input type="text" placeholder="您的称呼" v-model="name"/>
                  </div>
                  <div class="item-after manwuman">
                    <button :class="'button button-default button-medium ' + btnactivesMan" @click="man(1)">先生</button>
                    <button :class="'button button-default button-medium ' + btnactiveswuMan"  @click="man(0)">女士</button>
                  </div>
                </div>
              </form-item>
            <form-item>
                <div class="item-content">
                  <div class="item-input">
                    <input type="tel" placeholder="手机号" v-model="tel">
                  </div>
                </div>
              </form-item>
              <form-item>
                <div class="item-content">
                  <div class="item-input">
                   <!--  <input type="text" placeholder="预约时间" v-model="date2" @click="" > -->
                    <input type="text" v-model="date2" @click="$refs.c2.open()" readonly>
                  </div>
                </div>
              </form-item>
            </form-list>
            <div class="content-block content-padded">
              <div class="row">
                <div class="col-90 col-h">
                  <m-button size="large" @click.native="submit()">提交预约</m-button>
                </div>
              </div>
            </div>
            <div class="form-txt">
              <i class="icon2"></i>
              <span class="ui-fc6">预约后一个工作日内，顾问会与您联系</span>
          </div>
      </section>
      <section class="part-one">
        <div class="appiont-tt2"><span>服务流程</span></div>
        <div class="appoint-list">
              <div class="box">
                      <div class="li">
                              <i><img src="http://m.huize.com/activities/yuyue/bdym/images/icon-1.png" alt=""/></i><br>
                              免费预约
                      </div>
                      <img src="http://m.huize.com/activities/yuyue/bdym/images/icon-4.png" alt="" class="img"/>
                      <div class="li">
                              <i><img src="http://m.huize.com/activities/yuyue/bdym/images/icon-2.png" alt=""/></i><br>
                              分析需求
                      </div>
                      <img src="http://m.huize.com/activities/yuyue/bdym/images/icon-4.png" alt="" class="img">
                      <div class="li">
                              <i><img src="http://m.huize.com/activities/yuyue/bdym/images/icon-3.png" alt=""/></i><br>
                              定制方案
                      </div>

              </div>
          </div>
          <div class="appoint-list2">
                  <div class="li">
                          <h3>精准分析风险</h3>
                          <img src="http://m.huize.com/activities/yuyue/bdym/images/pic1.png" alt="" class="img1">
                          <p>十年家庭风险保障数据，评测有依据</p>
                  </div>
                  <div class="li">
                          <h3>不花冤枉钱</h3>
                          <img src="http://m.huize.com/activities/yuyue/bdym/images/pic2.png" alt="" class="img2">
                          <p>资深顾问，量身定制高性价比产品</p>
                  </div>
                  <div class="li">
                          <h3>省力更省心</h3>
                          <img src="http://m.huize.com/activities/yuyue/bdym/images/pic3.png" alt="" class="img1">
                          <p>私人顾问，全程一对一服务</p>
                  </div>
                  <div class="appoint-txt">
                          <p>
                                  我们承诺：<br>您的信息仅供接收预约服务所用，您的隐私将被严格保密
                          </p>
                  </div>
          </div>
      </section>   
    </page-content>
    <toast ref="t1" :text="oktext"></toast>
    <toast ref="t2" :text="errtext" type="error"></toast>
    <popup :show-title-bar="false" ref="c2">
      <calendar :date="date2" @change="(d) => {(date2 = d) && $refs.c2.close()}"></calendar>
    </popup>
  </div>
</template>

<script>
import Content from '../components/content'
import { Button } from '../components/buttons'
import { List, ListItem } from '../components/list'
import Icon from '../components/icons'
import { Form, FormItem } from '../components/form'
import Toast from '../components/toast'
import Popup from '../components/popup'
import { Calendar } from '../components/calendar'
import store from '../directives/localStorage.js'

export default {
  components: {
    'page-content':Content,
    Icon,
    'm-button': Button,
    List,
    ListItem,
    Calendar,
    'form-list': Form,
    FormItem,
    Toast,
    Popup
  },
  data () {
    return {
      tel:"",//手机号码
      name:"",//称呼
      gender:'先生',
      src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
      oktext:"",
      errtext:"",
      btnactivesMan:"",
      btnactiveswuMan:"btn-actives",
      date2: this.getNowFormatDate(),//预约时间
    }
  },
  methods: {
    showToast (type,text) {
      type === 1 ? this.$refs.t1.open() : this.$refs.t2.open();
      type === 1 ? this.oktext = text : this.errtext = text;
    },
    submit(){
        if(this.name == ""){
           this.showToast(0,'请输入您的称呼！')
        }else if(this.tel == ""){
           this.showToast(0,"请输入您的手机号码")
        }else if(this.date2 == ""){
           this.showToast(0,"请输入预约时间")
        }else{
          this.showToast(1,"预约申请成功，一个工作日后工作人员顾问将与您联系请您耐心等待!")
        }
        
    },
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                
        return currentdate;
    },
    man(index){
      if(index == 0){
        this.gender = "女士"
        this.btnactiveswuMan = "";
        this.btnactivesMan = "btn-actives"
      }else{
        this.gender = "先生"
        this.btnactiveswuMan = "btn-actives";
        this.btnactivesMan = ""
      }
    }

  }
}
</script>

<style lang="less">
// Color variables (appears count calculates by raw css)
@color0: #ffffff; // Appears 8 times
@color1: #c8c8c8; // Appears 2 times

// Width variables (appears count calculates by raw css)
@width1: 93.75%; // Appears 2 times
@width4: 100%; // Appears 2 times


h1,h2,h3,img {
  margin: 0;
  padding: 0;
}
.new-bg {
  background-image: url("../assets/new-bg.png");
}
.appiont-head {
  text-align: center;
}
.appiont-tt1 {
  color: @color0;
  font-size: 1.8rem;
  padding-top: .76rem;
}
.ui-fcw {
  color: @color0;
  font-size: .6rem;
}
.appiont-img1 {
  height: 7.5rem;
  padding-bottom: 24px;
  padding-top: .1rem;
  width: 90%;
}
.formce {
  background-color: @color0;
  margin: 0 auto;
  width: @width1;
  h2 {
    font-size:24px;
    line-height: 2.5rem;
    text-align: center;
  }
}
.fc10 {
  color: #f99035;
}
.ui-tac {
  font-size: .8rem;
  text-align: center;
}
.manwuman {
  margin: 0;
  min-width: 7.5rem !important;
  text-align: right;
}
.btn-actives {
  background: @color0;
  border:1px solid @color1;
  color: @color1;
}
.form-txt {
  padding: 0 2.5% .5rem;
}
.ui-fc6 {
  color: #666666;
}
.part-one {
  margin: 0 auto 1rem;
  width: @width1;
}
.appiont-tt2 {
  font-size: .26rem;
  line-height: .26rem;
  margin-top: .56rem;
  position: relative;
  text-align: center;
  &:before {
    border-top: 1px solid @color0;
    content: '';
    left: 0;
    position: absolute;
    top: 50%;
    width: @width4;
  }
  span {
    background-color: #547AD0;
    color: @color0;
    display: inline-block;
    padding: 0 .2rem;
    position: relative;
  }
}
.appoint-list {
  margin-top: .3rem;
  overflow: hidden;
  text-align: center;
  .box {
    display: inline-block;
  }
  .li {
    color: @color0;
    float: left;
    padding: 0 1rem;
    text-align: center;
  }
  i {
    display: inline-block;
    height: 30px;
    margin-bottom: .2rem;
    width: 24px;
    img {
      width: @width4;
    }
  }
  .img {
    float: left;
    margin-top: 20px;
    width: 11px;
  }
}
.appoint-list2 {
  background-color: #F3F8FF;
  margin-top: .67rem;
  text-align: center;
  .li {
    background-color: @color0;
    margin-bottom: .2rem;
    padding-bottom: .6rem;
  }
  h3 {
    font-size: 1.5rem;
    padding-top: .4rem;
  }
  .img1 {
    margin-right: 3rem;
  }
  .img2 {
    margin-left: 3rem;
  }
  img {
    padding: .44rem 0 .22rem;
    width: 9rem;
  }
  p {
    font-size: .8rem;
  }
}
.appoint-txt {
  padding: .7rem;
  &:before {
    content: "";
  }
  p {
    color: #435c93;
    font-size: 0.65rem;
    text-align: left;
  }
}
div .col-h{
  width:90%;
  margin:0 auto;
}
</style>
