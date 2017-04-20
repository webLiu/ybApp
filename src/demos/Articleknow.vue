<template> 
  
       <div class="page">
          <page-content>
            <scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
                     <div class="content-padded">
                     <!-- listview数据渲染一张图片 -->
                      <list v-for="(index,item) in json.length">
                          
                          <div slot="title"></div>
                          <list-item @click.native="routers({path:'comment',query: { id:json[item].id}})" > 

                            <div class="item-content">
                              <div class="item-title-row">
                                <div class="item -title">{{json[item].title}}</div>
                              </div>
                              <div class="item-subtitle item-text-color">
                                {{json[item].abstract.slice(0,60)+'...'}}
                              </div>
                              <div class="item-subtitle item-text-color">
                                <span>{{dateDiff(new Date(timeFormatter(json[item].createtime)).getTime())}}</span> 
                                <span>{{json[item].author}}</span> 
                                <span><icons icon="dazhongicon02"></icons> {{json[item].view}}</span>
                              </div>
                            </div>
                             <div class="item-media right-img-content right-contwo">
                              <img v-if="json[item].picurl == ''" src="http://www.ybbuys.com/appserver/static/img/default.jpg" class="imgs">
                              <img v-else v-bind:src="json[item].picurl" class="imgs">
                             </div>

                          </list-item>
                         </list>
                        </div>
                  </scroll> 
              <toast ref="t1" :text="oktext"></toast>
              <toast ref="t2" :text="errtext" type="error"></toast>
           </page-content>
       </div>


</template>

<script>
import Content from '../components/content'
import Scroll from '../components/scroll'
import $ from '../directives/webpack-zepto'
import { List, ListItem } from '../components/list'
import Toast from '../components/toast'
import store from '../directives/localStorage.js'
import Icons from '../components/icon'

export default {
  components: {
     'page-content':Content,
     Scroll,
     List,
     ListItem,
     Toast,
     Icons
  },
  data () {
    return {
      page:1,
      oktext:"",
      errtext:"",
      json:{}
    }
  },
  mounted(){
    //store.remove('scrollTop')
    var self = this;
    $.ajax({
      type:'GET',
      url:'http://www.ybbuys.com/appserver/article/articlelist?page='+self.page+'&item=1',
      xhrFields: {
          withCredentials: true
       },
      success:function (backData) {
          if(backData.data.data.length <= 0){
            self.showToast(2,"获取数据出错");
          }else{
            self.json = backData.data.data;
             self.page = self.page + 1;
             console.log(self.json)
          };
      }
    })
  },
  // attached(){
  //   this.$els.page.scrollTop = store.read('scrollTop')
  // },
  methods:{
    scroll(){
      
       var scrollTop = this.$els.page.scrollTop;
       store.write('scrollTop',scrollTop);
       
    },
    routers(router){
      this.$router.push(router);
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
    onRefresh (done) {
      let self = this;
      this.page = 1;
      setTimeout(function () {
          $.ajax({
            type:'GET',
            url:'http://www.ybbuys.com/appserver/article/articlelist?page='+self.page+'&item=1',
            xhrFields: {
                withCredentials: true
             },
            success:function (backData) {
                if(backData.length <= 0){
                   console.log("没有更多数据了")
                  done()
                }else{
                  self.json = backData.data.data;
                  done()
                };

            }
          })
              // call done
      }, 2000)
    },
    onInfinite (done) {
      let self = this//要this赋值给self

      setTimeout(function () {
        $.ajax({
            type:'GET',
            url:'http://www.ybbuys.com/appserver/article/articlelist?page='+self.page+'&item=1',
            xhrFields: {
                withCredentials: true
             },
            success:function (backData) {
            console.log(backData)
                if(backData.data.data.length == 0){
                 console.log("没有更多数据了")
                  done()
                }else{
                    for(var i = 0;i<=backData.data.data.length - 1;i++){
                        self.json.push(backData.data.data[i]);
                    }
                     self.page = self.page + 1;
  
                    done()  
                };
            }
          })
        
      }, 2000)
    }
  }
}
</script>
<style type="text/css">
.bodys-cont>.my-page{
bottom:0;
}
