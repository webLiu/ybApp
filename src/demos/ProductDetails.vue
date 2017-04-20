<template>
  <div class="page">
    <page-footer>
          <div class="row row-cont btn-fot" >
            <div :class="'col-50 rows Collection ' + active" @click="Collections()">{{Collection}}</div>
            <router-link :to="{path:'reservation'}">
             <div class="col-40 rows reservation">立即预约</div>
            </router-link>
          </div>
    </page-footer>
    <page-content class="bodys">
      <list>
        <list-item>
          <div class="item-content">
            <div class="item-title-row">
              <div class="item-title">被保人年龄</div>
              <div class="item-after">0-100周岁</div>
            </div>
          </div>
        </list-item>
        <list-item>
          <div class="item-content">
            <div class="item-title-row">
              <div class="item-title">保障期限</div>
              <div class="item-after">10年</div>
            </div>
          </div>
        </list-item>
        <list-item>
          <div class="item-content">
            <div class="item-title-row">
              <div class="item-title">保障额度</div>
              <div class="item-after">100万</div>
            </div>
          </div>
        </list-item>
      </list>

      <list class="Interest">
        <list-item>
            <div class="item-content">
              <div class="item-title-row">
                <div class="item-after" style="margin-left:0">保障权益</div>
              </div>
            </div>
          </list-item>
          <list-item @click.native="shows(0)">
            <div class="item-content">
              <div class="item-title-row">
                <div class="item-title">意外身故</div>
                <div class="item-after">200万元</div>
              </div>
            </div>
          </list-item>
          <list-item v-show="showOne">
              <div class="item-content">
                <div class="item-title-row">
                  <div class="item-title tg-color">174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起</div>
                  <div class="item-after money-color" ></div>
                </div>
              </div>
            </list-item>


          <list-item  @click.native="shows(1)">
            <div class="item-content">
              <div class="item-title-row">
                <div class="item-title">意外医疗</div>
                <div class="item-after">30%</div>
              </div>
            </div>
          </list-item>
          <list-item v-show="showTwo">
              <div class="item-content">
                <div class="item-title-row">
                  <div class="item-title tg-color">174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起</div>
                  <div class="item-after money-color" ></div>
                </div>
              </div>
            </list-item>


          <list-item  @click.native="shows(2)">
            <div class="item-content">
              <div class="item-title-row">
                <div class="item-title">保险分红</div>
                <div class="item-after">200万元</div>
              </div>
            </div>
          </list-item>
           <list-item v-show="showThree">
              <div class="item-content">
                <div class="item-title-row">
                  <div class="item-title tg-color">174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起174元起</div>
                  <div class="item-after money-color" ></div>
                </div>
              </div>
            </list-item>
      </list>
      
        
      <list class="Interest">
        <list-item>
            <div class="item-content">
              <div class="item-title-row">
                <div class="item-title" style="border:0">产品特色</div>
              </div>
            </div>
          </list-item>
          <list-item  v-for="item in 5" >
            <div class="item-content">
              <div class="item-title-row">
                <img v-bind:src="src" width="100%" class="img-border">
              </div>
            </div>
        </list-item>
      </list>
      <div class="pro-grids">
        <a href="javascript:;" class="grid">
          <div class="grid_icon">
            <icons icon="icon45"></icons>
          </div>
          <p class="grid_label">
            投保须知
          </p>
        </a>
        <a href="javascript:;" class="grid">
          <div class="grid_icon">
            <icons icon="lipeiliucheng"></icons>
          </div>
          <p class="grid_label">
            理赔服务
          </p>
        </a>
        <a href="javascript:;" class="grid">
          <div class="grid_icon">
            <icons icon="changjianwenti"></icons>
          </div>
          <p class="grid_label">
            常见问题
          </p>
        </a> 
      </div>
   </page-content>
    <toast ref="t1" :text="oktext"></toast>
    <toast ref="t2" :text="errtext" type="error"></toast>
  </div>
</template>

<script>
import Content from '../components/content'
import { Button } from '../components/buttons'
import { List, ListItem } from '../components/list'
import Icon from '../components/icons'
import { Footer, SecondFooter, FooterItem } from '../components/footer'
import Toast from '../components/toast'
import store from '../directives/localStorage.js'
import Icons from '../components/icon'
export default {
  components: {
    'page-content':Content,
    Icon,
    'm-button': Button,
    'page-footer': Footer,
    SecondFooter,
    List,
    ListItem,
    Toast,
    Icons
  },
  data () {
    return {
      name:'feel',
      wechat:"ls1125075101",
      tel:13138873797,
      gender:'男',
      src: 'http://www.ybbuys.com/appserver/static/img/default_touxiang.png',
      oktext:"",
      errtext:"",
      Collection:"收藏",
      active:"",
      showOne:false,
      showTwo:false,
      showThree:false,
    }
  },
  methods: {
    showToast (type,text) {
       type === 1 ? this.$refs.t1.open() : this.$refs.t2.open();
      type === 1 ? this.oktext = text : this.errtext = text;
    },
    shows(index){

      switch(index){
          case 0:
        if(this.showOne == false){
          this.showOne = true 
        }else{
          this.showOne = false 
        }
          break;
          case 1:
        if(this.showTwo == false){
          this.showTwo = true 
        }else{
          this.showTwo = false 
        }
          break;
          default:
          if(this.showThree == false){
            this.showThree = true 
          }else{
            this.showThree = false 
          }
      }
    },
    Collections(){
      if(this.Collection == "收藏"){
        this.Collection = "已收藏";
        this.active = "active";
        this.showToast (1,"产品收藏成功")
      }else{
        this.Collection = "收藏";
        this.active = ""
        this.showToast (1,"产品收藏已取消")
      }
    }

  }
}
</script>

<style lang="less">
// Color variables (appears count calculates by raw css)
@color0: #ffffff; // Appears 2 times
@color1: #ececec; // Appears 2 times

// Width variables (appears count calculates by raw css)
@width0: 100%; // Appears 2 times


.list-bg {
  background: @color1;
}
.img-border {
  border-radius: 5px;
  border:1px solid #EDEDED;
}
.g-core-image-upload-btn {
  height: 100%;
  position: absolute !important;
  width: @width0;
  z-index: 999999;
}
.Interest {
  margin-top:0.5rem;
}
.btn-fot {
  margin-left: 0;
  width: @width0;
}
.Collection {
  background: #F98D34;
  color: @color0;
  line-height: 3rem;
  margin-left: 0 !important;
  width: 40%!important;
  float: left;
}
.reservation {
  background: #FA633C;
  color: @color0;
  line-height: 3rem;
  margin-left: 0 !important;
  width: 60%!important;
  float: right;
}

.active {
  background: @color1;
}

.pro-grids>.grid{
  background:#fff;
  position: relative;
    float: left;
    padding: 20px 10px;
    width: 33.33333333%;
    text-decoration: none;
}
.pro-grids>.grid>.grid_icon{
  text-align: center;
  width: 28px;
    height: 28px;
    margin: 0 auto;
}
.pro-grids>.grid>.grid_icon .iconfont{
  font-size: 1.6rem;
    line-height: 1.6rem;

}
.pro-grids>.grid>.grid_label {
    display: block;
    text-align: center;
    color: #000;
    font-size: 14px;
}
</style>
