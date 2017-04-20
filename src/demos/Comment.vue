<template>

  <div class="page">
     <page-footer>
        <div class="bottom-bar border-1px-up">
          <div class="btn-input" @click="Comment()">
            <div class="placeholder">发表评论</div>
              <div class="replyText">
              {{allowcomment}}条评论
              </div>
            </div>
            <div class="item icon-like"  @click="articlelike()">
              <icons icon="zan"></icons><span :id="'articlelike' + aid">{{like}}</span>
            </div>
            <div class="item"><icons icon="shoucang"></icons></div>
            <div class="item icon-share"></div>
        </div>
    </page-footer>  
    <page-content class="bodys list-bgs">
      <div>
        <rtcontent :title="title" :time="dateDiff(new Date(timeFormatter(createtime)).getTime())" :author="author" :html="html" :view="view"></rtcontent>
      </div>
       <list class="title-jh">
         <div slot="title"></div>
        <list-item>
            <div class="item-content">
              <div class="item-title-row">
                <div class="item-title"><icons icon="huore" style="color:#D62525"></icons>热门评论</div>
              </div>
            </div>
          </list-item>
       </list>    

       <list>
          <list-item v-for="(index,item) in articledata.length">
            <div class="item-media img-title"><img class="logos" :src="articledata[item].pic" width="88"></div>
            <div class="item-content" style="width:100%">
              <div class="item-title-row">
                <div class="item-title">{{articledata[item].nickname}}</div>
              </div>
              <div class="item-text" v-html="articledata[item].comment"></div>
              <div class="item-subtitle btm-btn">
                <div>{{dateDiff(new Date(timeFormatter(articledata[item].createtime)).getTime())}}</div>
                <div v-on:click="likes(articledata[item].id)">
                  <icons icon="zan"></icons>
                  <span :id="'like'+ articledata[item].id">{{articledata[item].dig}}</span>
                </div> 
                <div @click="call(articledata[item].uid)"><icons icon="pinglun"></icons></div>
              </div>
            </div>

          </list-item>
          <div class="shafa" v-show="sfshow">还没有评论，快来抢沙发吧！</div>
        </list>

       <div class="content-block content-padded">
          <div class="row">
            <div class="col-90 col-h"><m-button size="large" @click.native="routers({path:'allcommentitem',query:{ aid:aid,allowcomment:allowcomment,articlelike:like}})">全部评论</m-button></div>
          </div>
        </div>
           <sendwords ref="sendwords" :uid="uid" :aid="aid" :pic="pic" :belongid="belongid" :nickname="nickname" :texts="texts"></sendwords>
    </page-content>       

    <toast ref="t1" :text="oktext"></toast>
    <toast ref="t2" :text="errtext" type="error"></toast>
  </div>
</template>

<script>
import Content from '../components/content'
import { Button } from '../components/buttons'
import Icon from '../components/icons'
import Toast from '../components/toast'
import { List, ListItem } from '../components/list'
import Rtcontent from '../components/rtcontent'
import $ from '../directives/webpack-zepto'
import Icons from '../components/icon'
import Sendwords from '../components/sendwords'
import { Footer, SecondFooter, FooterItem } from '../components/footer'
import store from '../directives/localStorage.js'
export default {
  components: {
    'page-content':Content,
    Icon,
    'm-button': Button,
    Rtcontent,
    Toast,
    List,
    ListItem,
    'page-footer': Footer,
    SecondFooter,
    Sendwords,
    Icons
  },
    mounted() {

          this.id = this.$route.query.id;
          var self = this;
          $.ajax({

            type:'GET',
            url:'http://www.ybbuys.com/appserver/article/article?id='+self.id+'',
            xhrFields: {
                withCredentials: true
             },
            success:function (backData) {
                if(backData.errno > 0){
                  window.history.back();
                }else{
                 self.title = backData.data.title;
                 self.createtime = backData.data.createtime;
                 self.author = backData.data.author;
                 self.view = backData.data.view;

                 //
                 if(backData.data.content.indexOf('<span style="line-height:1.5;"><strong><span style="color:#333333;line-height:1.5;font-size:12px;"><strong>（本文内容和图片均来自网络，如侵犯了您的权益，请联系我们删除</strong></span><span style="color:#333333;line-height:1.5;font-size:12px;"><strong>。）</strong></span></strong></span>') > 0){

                      backData.data.content = backData.data.content.replace('<span style="line-height:1.5;"><strong><span style="color:#333333;line-height:1.5;font-size:12px;"><strong>（本文内容和图片均来自网络，如侵犯了您的权益，请联系我们删除</strong></span><span style="color:#333333;line-height:1.5;font-size:12px;"><strong>。）</strong></span></strong></span>','')
                  
                  
                 }else if(backData.data.content.indexOf('<a href="http://www.bxd365.com/">') > 0){
                  backData.data.content = backData.data.content.replace('<a href="http://www.bxd365.com/">','')
                  backData.data.content = backData.data.content.replace('</a>','')
                }
                 self.html = backData.data.content
                 self.aid = backData.data.id;
                 self.allowcomment = backData.data.allowcomment;
                 self.like = backData.data.like;
          
                  $.ajax({
                      type:'POST',
                      url:'http://www.ybbuys.com/appserver/comment/commentthree',
                      xhrFields: {
                          withCredentials: true
                       },
                      data:{
                       aid:self.aid,
                      },
                      success:function (backData) {
                          if(backData.errno == 0){
                              self.articledata = backData.data.data
                              
                          }else{
                            //console.log(backData.errmsg)
                            self.sfshow = true
                          }
                         
                      }
                  })


                };
                
            }
          })
         
      
  },
  data () {
    return {
      sfshow:false,
      uid:(store.read('uid') == null || store.read('user_img') == undefined || store.read('user_img') == "" ) ?  "" : store.read('uid'),
      nickname:(store.read('user_name') == null || store.read('user_name') == undefined  || store.read('user_name') == "") ? "匿名" : store.read('user_name'),
      pic:(store.read('user_img') == null || store.read('user_img') == undefined || store.read('user_img') == "" ) ?  "http://www.ybbuys.com/appserver/static/img/default_touxiang.png" : store.read('user_img'),
      aid:0,
      belongid:"",
      oktext:"",
      errtext:"",
      title:"",
      createtime:"",
      author:"",
      view:0,
      html:'',
      like:0,
      allowcomment:"",
      username:"",
      articledata:[],
      createtime:"",
      firetIn:true
    }
  },
  methods: {
    routers(router){
      this.$router.push(router);
    },
    texts(data){
      console.log(data);
      if(data.errno == 0){
        
      
        if(this.articledata.length<3){

          this.articledata.push(data.data.data);

        }

        this.allowcomment = parseInt(this.allowcomment) + 1;
        this.showToast(1,"评论成功");
        this.sfshow = false;
      }
    },
    call(call){
      this.belongid = call;
      if(this.aid == 0){
        this.showToast(2,"网络错误")
      }else if(this.uid == null||this.uid == undefined||this.uid==""){
       this.showToast(2,"登录以后才能发表评论哦");
      }else if(this.belongid == ""||this.belongid==null||this.belongid == undefined){
        this.showToast(2,"当前评论不存在");
      }else{
        this.$refs.sendwords.open();
      }
    },
    timeFormatter(value) {
        var da = new Date(value.replace("/Date(", "").replace(")/" , "").split( "+")[0]);
        return da.getFullYear() + "-" + ((da.getMonth() + 1) < 10 ? "0" + (da.getMonth() + 1):(da.getMonth() + 1))+ "-" + (da.getDate() < 10 ? "0" + da.getDate():da.getDate()) + " " + (da.getHours()<10?"0"+da.getHours():da.getHours()) + ":" + (da.getMinutes()<10?"0"+da.getMinutes():da.getMinutes()) ;//+ ":" + (da.getSeconds()<10?"0"+da.getSeconds():da.getSeconds())
    },
    dateDiff(hisTime){
        var now = new Date().getTime(),
            diffValue = now - hisTime,
            result='',
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            halfamonth = day * 15,
            month = day * 30,
            year = month * 12,

            _year = diffValue/year,
            _month =diffValue/month,
            _week =diffValue/(7*day),
            _day =diffValue/day,
            _hour =diffValue/hour,
            _min =diffValue/minute;

            if(_year>=1) result=parseInt(_year) + "年前";
            else if(_month>=1) result=parseInt(_month) + "个月前";
            else if(_week>=1) result=parseInt(_week) + "周前";
            else if(_day>=1) result=parseInt(_day) +"天前";
            else if(_hour>=1) result=parseInt(_hour) +"个小时前";
            else if(_min>=1) result=parseInt(_min) +"分钟前";
            else result="刚刚";
            return result;
    },
    Comment(){

      if(this.aid == 0){
        this.showToast(2,"网络错误")
      }else if(this.uid == null||this.uid == undefined||this.uid==""){
       this.showToast(2,"登录以后才能发表评论哦");
      }else{
        this.$refs.sendwords.open()
      }
    },
   
    showToast (type,text) {
      type === 1 ? this.$refs.t1.open() : this.$refs.t2.open();
      type === 1 ? this.oktext = text : this.errtext = text;
    },
    timeFormatter(value) {
        var da = new Date(value.replace("/Date(", "").replace(")/" , "").split( "+")[0]);
        return da.getFullYear() + "-" + ((da.getMonth() + 1) < 10 ? "0" + (da.getMonth() + 1):(da.getMonth() + 1))+ "-" + (da.getDate() < 10 ? "0" + da.getDate():da.getDate()) + " " + (da.getHours()<10?"0"+da.getHours():da.getHours()) + ":" + (da.getMinutes()<10?"0"+da.getMinutes():da.getMinutes()) ;//+ ":" + (da.getSeconds()<10?"0"+da.getSeconds():da.getSeconds())
    },
    dateDiff(hisTime){
        var now = new Date().getTime(),
            diffValue = now - hisTime,
            result='',
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            halfamonth = day * 15,
            month = day * 30,
            year = month * 12,

            _year = diffValue/year,
            _month =diffValue/month,
            _week =diffValue/(7*day),
            _day =diffValue/day,
            _hour =diffValue/hour,
            _min =diffValue/minute;

            if(_year>=1) result=parseInt(_year) + "年前";
            else if(_month>=1) result=parseInt(_month) + "个月前";
            else if(_week>=1) result=parseInt(_week) + "周前";
            else if(_day>=1) result=parseInt(_day) +"天前";
            else if(_hour>=1) result=parseInt(_hour) +"个小时前";
            else if(_min>=1) result=parseInt(_min) +"分钟前";
            else result="刚刚";
            return result;
    },
    top(){
      console.log(document.body)
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    likes(id){
      var self = this,
          uid = this.uid,
          aid = this.aid;

      if(aid == 0){
        this.showToast(2,"网络错误")
      }else if(uid == null||uid == undefined||uid==""){
       this.showToast(2,"登录以后才能发表评论哦");
      }else{
        $.ajax({
          type:'POST',
          url:'http://www.ybbuys.com/appserver/comment/commentlike',
          xhrFields: {
              withCredentials: true
           },
          data:{
           uid:uid,
           aid:aid,
           id:id
          },
          success:function (backData) {
              console.log(backData);
              if(backData.errno == 0){
                  $('#like'+id+'').html(parseInt($('#like'+id+'').html())+1);
                  $('#like'+id+'').prev().css({"color":"#2d68af","font-size":"1.2rem","line-height":0});
              }
          }
        })
      }
      

    },
    articlelike(){
      var aid = this.aid,
          uid = this.uid;
        if(aid == 0){
          this.showToast(2,"网络错误")
        }else if(uid == null||uid == undefined||uid==""){
         this.showToast(2,"登录以后才能点哦");
        }else{
          $.ajax({
            type:'POST',
            url:'http://www.ybbuys.com/appserver/comment/articlelikeid',
            xhrFields: {
                withCredentials: true
             },
            data:{
             uid:uid,
             aid:aid
            },
            success:function (backData) {
              console.log(backData)
                if(backData.errno == 0){
                    $('#articlelike'+aid+'').html(parseInt($('#articlelike'+aid+'').html())+1);
                    $('#articlelike'+aid+'').prev().css({"color":"#2d68af","font-size":"1.2rem","line-height":0});
                }
            }
          })
        }
    }
    // signout(){
    //     store.remove("Token");
    //     setTimeout(()=>{
    //       window.history.back();
    //     },2000)
    //     this.showToast(1,'已成功退出')
    // }

  },
}
</script>

<style>
.list-bgs{
  background: #fff;
}

.img-title{
    align-items: flex-start!important;
   }
   .logos{
    border-radius: 44px !important;
   }
   .call{
    color: #51D6F7 !important;
   }
    .btm-btn{
          display: -webkit-box; 
          -webkit-box-orient: horizontal ;
          line-height: .75rem;
    }
    .btm-btn div:nth-child(1){
      -webkit-box-flex: 6;
    }
    .btm-btn div:nth-child(2){
      -webkit-box-flex: 2 ;
      text-align: right;
    }
    .btm-btn div:nth-child(3){
      -webkit-box-flex: 2 ;
      text-align: right;
    }
    .face {
        position: relative;
        top: 3px;
        width: 18px!important;
        height: 18px!important;
    }
    .shafa{
      width: 90%;
      text-align: center;
      padding: 10px 0;
      background: #F8F8F8;
      color: #C4C4C4;
      margin: 20px auto;
      font-size: 16px;
    }






    .list-bgs,.allscroll{
  background: #fff !important;
}

.bottom-bar {
  display: -webkit-box;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 55px;
    line-height: 55px;
    color: #A3A3A3;
    background-color: #EDEEF1;
}
.btn-input {
    display: -webkit-box;
    -webkit-box-flex: 1;
    background-color: #fff;
    border-radius: 4px;
    height: 36px;
    margin: 9px 12px;
    line-height: 36px;
    padding: 0 10px;
    font-size: 14px;
}
.bottom-bar .btn-input .placeholder {
    color: #9f9f9f;
    text-align: left;
}
.bottom-bar .btn-input .replyText {
    -webkit-box-flex: 1;
    text-align: right;
    color: #9f9f9f;
}
.bottom-bar .item.icon-like.liked,  .qunact-toolbar .item.icon-like.liked {
    color: #2d68af;
}
.bottom-bar .item.icon-like, .item.icon-like {
    color: #777;
    font-size: 14px;
    width: auto;
}
.bottom-bar .item, .qunact-toolbar .item {
    display: block;
    position: relative;
    width: 47px;
    background: center center no-repeat;
    background-size: 25px 25px;
}
 .call{
    color: #51D6F7 !important;
   }
 .bottom-bar .item.icon-largess,  .qunact-toolbar .item.icon-largess {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABR5JREFUaAXtWF1oXEUUPmc2P5vYQJtqpRYrNmi10voTUYmIsQgV/AFfSsGUIoJB8EGo7t3tKlzU7N0NmmdRUUQUTfGvIsYnKaVKpdVWClWirVBsSQ15iWZNN3uP3yROsptdd2d3pwFhBzZz78w53znfnDNn5oao2Zor0FyB5gr8n1aAbZ2Nx4NNwhKIcD+RrLPVq0eOmf6A3tcsnEynE7/YYFgR0SRCoiMgcLkNqCsZTQhk+mzIKBujIdPLK01C+yVCVyzYru6lFREWaqkO5V4CEQmV0Oc2yFZEOqI9AwD9wAbQnQxnWfFOpNV7NphWe0QDCXa5l0jvYxYfIb+0EWL6tVVFdg0NeUdtSGgZayIGMJbM3MH58E0h2WrG3PWcx0K91r06kvA8b7oW3JqJaHDfFzUzO/w4UT5BQj21GCwvCwJEH0dUy4up1HMny8tUHq2LiIHU6RZPZh5AvxvJtwOkus2cVc90nIQ/VVF6J+0nfiung9Lfi31yrNxc4ZhVrnvx4JBieb29fe1Hvj84YwAYeYDnL/VvdHQ0cvTEmV4l4TYJaQvGNhLLKgiswlkAyjQF6SliPkOKfuho5WO+750zWIW9jng2l3mQ8vJMSLIdc1UXvKqANhCLp7TDaDwNhc+E1Sed7avHCkktzDf213shfZPkZDfWZwAFZYNBG0aNMc//1VtFZElZusBogCQ/MPP3VDaWSH3FpMYiHPm2re3Zk77PuADYN98fbcvmTt8lebkP0XtEcuFtWhskam5VmWrEpYhUwudpOPMdAI8glc5ShCY4jFwQyU8oFf1LJNsF7TUhqx6ScDP2Rh/8vRtud1RC1XOXICKVTEoXnNsO57aiNK+jvJadm1cIw+ySIjYQUjQP0udQHKqSWFKs/GR1sleGMLMooa18a2c0vl4pfmLeWTNV1PM4jF6fSSWuYVavFE018OKMCDboz5mX4if0PkmnEm8B+LFSMjzeGVX9KKendcVTFB5swPciVWdEsEG3xJ8P+g06nP2wmMwCCVNyR0ZGOpB9cSPfaO+MiHYknKMDXjLdZ5wyZJj4lI5EIYmJC7MHsEew2d00p0RQgbpQSseWk9l0bffNy0mgINzvhsICimMiGrSUzODgYE7P6HTSkXBNQmPXeCBqldKGb5WLGH0D58ePZhZ7ZiOevzHvup+cnNuMc2Y/Um2/GcftZRvuL09iAVrNWD29EyIw/G4m2Pd0NQdSqdhxyOhfUfMSqbUgvqtosMYXJ6mFQ7DX99+O1mh7XnxeT/iqenQLddxEROiWmdnzv3uJYLwQHOfI4UwQ36vHcC/bg5R6qnieCHrXYay26/9yELy7IaKB8S2CTXxnoQ3sh0nzjsvlBpGwaN7MueidpJYLRxrFcBQRfDIxfcEki1VLO6ZIfjIOKlKHQw5T5n2xF8Ylkx5CSBHA+psbIkzvDweJgUpuBEFM36v0r6ThCxRnCz1cMlHDgKPUEn1m1N0Qi4aioQ27iYjQPTgLTgGvKLVwQH6P+1ZGG4ong0cllHJnBQ5EuUHLNNLcEIEHONC0M8sdugxj80Qk5Bvh8M5GnK2k6yi1KplYmTkrIrhLnV8Zd0qt2Nq2IgL4stWm1GzxCC6EV5oRlObFZzNm2VvZttojLao9Npe/uAMn9xpL4wtiQrfjP4WeKP4TG31PTbpaGP/U07Zt9KzLXjL56tVz4ewwQO/Fxl5vA16vzL/pdFCTGBrae7ZenKZecwWaK9BcgeYKNFfAdgX+Aebbw6e3WRxWAAAAAElFTkSuQmCC);
}

.bottom-bar .item.icon-share,  .qunact-toolbar .item.icon-share {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABHhJREFUaAXtWGtoHFUUvmdmk81Sa0tUKoJii78UKSJiQP3R4rOi0SJJEArVH021VdK4ycxs0V7tdmc2tKXElv4qAUGqUUGpD4KUCk0f4o8IokTB4oq2W8UmSpJ9JJnjGUvCdOfuzOzsZoIwCyEz53zn8Z1z77l3l7HoE1UgqkBUgagCUQWCVwCCm/q35Hy4uVC+8AxZSGtubP6kt7e34N/aH1LyB6sPVSj9fAJN8336O375j9I3u3cfuLU+j07rUIgg4qMLoZHhXbPz5fPK68b6BVkj/odCxJko3oKzeFpV9UWCTkxtkmUiYiWJKxHwMzWlb60tZTF6GYkQFWQx08QhRTPeEKfnXxoSEUC3lBDNNxVVP8b5qZgbzk0XEhG3FK7qaAi8WCid+zSbza70RjsRS3qODA8Py2Njv7TN49yoM3QVCbBvY5DYlMnsulQFIRQ3nAjnR64rFv9pN4E9SbvgMYasVRjZRQgMfpWg6QldT/7gArtG1TAiimGswkncCcB20blxwzVRgrwAm5RkeNZIa1/5Ma+byODgYPxiflpDk/XQOl/lJ6hfDBWlDAhbDUM77mUjewHc9Jq2/86/pwojNEY7Cdfihg2ok5HB5ocefLg4OnryjJuPwB1RUsYOhuZ+IrEUBBw5U3eO3nvPHa90dHTMO5QkCERE1fS3TcSdIodLKaMhcCLR0trFefdMZZyazxFFyxxeDhJW4rQHn5op/fVuJQnrvSYi/Sn9CC2lHSJHockQHhHF8k2E7kMvMRNfFjkJVQbspCieLyLWdKKz4YDIQZgy2iNf3NQae14U0/OSxvlQS6GYf49WaELkICwZTa1jiXjb9r6+DXOimJ5EiuW8SpvsbpFxWDIAaU9WV99yi+c6fq1rB5vEXKNPbLeE7Drqwhzd/7cN6Kkhu1z07NoRujv10JJq6LVDlIRIRiSmGEjPDWTUEZG+Ula1I5wPXj9TmsrR8F5daeT2TgmUGcL3CGycjtsJQJwkvEpj29dgueob8lIT22Ts1cbcYtl1VTtSLE9v9ksCAH4iAh+ZIH287rbVY93d3bP2IP2q3ked9UWE/IzHpKbH9+1N5uw+vJ6rEqHb7NNexhR0RAY5m8kop9ywQG2hjnh+aLyOJuLxds57r3iCKwBCItbV/LeL01V/qqGA3zEZtmf3qWcr/AV+paJ8mIjfvIXzF4pBnAiJ/J6f2UhLYYXTIVg3zz2JlrYs5+J57rTxltB4PZSIK69xDqY3WowQEqG9cZ8DDuwKTZGugYzypUMXWEBfmwCTdEYcpHkQ2ItlKCbC2O12r9T2S02yvCGdVn60y/0+I/0SRx2ugEOJdv8WQ099UKEI9Comgrh2wRuRuCyx5o3pdDIQiQU/9v+0xyYkkNt1vf+0XV7Ps3AkUgH/I0IkygSggMnxeoIAY58v2gPLYUx6oJEkLN9VOgK00a2lIPXouvr1YhIBH9atbe28kJvoBIZrAFe8o6df/TOgq9rMNC1zP30n76rNKkJHFYgqEFUgqkBUgf9vBf4FY3dgXlJPycsAAAAASUVORK5CYII=);
}
</style>
