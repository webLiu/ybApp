<template>
  <div class="page">
    <page-content>
      <form-list>
        <form-item>
          <div class="item-content">
            <div class="item-input">
              <input type="tel" placeholder="请输入新手机号码" v-model="tel">
            </div>
          </div>
        </form-item>
        <form-item>
          <div class="item-content">
            <div class="item-input">
              <input type="tel" placeholder="新手机号码短信验证码" v-model="code">
            </div>
             <div class="item-after code">
              <!-- <m-button :disabled="disabled" @click="phoneCode()">{{timeCode}}</m-button> -->
              <button class="button button-default button-medium" id="code" :disabled="disabled" @click="phoneCode()">{{timeCode}}</button>
            </div>
          </div>
        </form-item>
      </form-list>
      <div class="content-block content-padded">
        <div class="row">
          <div class="col-90 col-h"><m-button size="large" @click.native="post()" >提交</m-button></div>
        </div>
      </div>
    </page-content>
    <toast ref="t1" :text="oktext"></toast>
    <toast ref="t2" :text="errtext" type="error"></toast>
    
  </div>
</template>


<script>
import Content from '../components/content'
import { Button } from '../components/buttons'
import Icon from '../components/icons'
import { Form, FormItem } from '../components/form'
import Toast from '../components/toast'
import PopWindow from '../components/popwindow'
import $ from '../directives/webpack-zepto'
import store from '../directives/localStorage.js'
export default {
  components: {
    'page-content':Content,
    Icon,
    'm-button': Button,
    'form-list': Form,
    FormItem,
    PopWindow,
    Toast
  },
  data () {
    return {
      tel:"",
      store_id:store.read("uid"),
      oldtel:(store.read('user_tel') == null || store.read('user_tel') == undefined  || store.read('user_tel') == "" ) ? "" : store.read('user_tel'),

      code: "",
      oktext:"",
      errtext:"",
      timeCode:"获取短信验证码",
      disabled:false,
      time:120,
      path:null
    }
  },
  methods: {
    showToast (type,text) {
      type === 1 ? this.$refs.t1.open() : this.$refs.t2.open();
      type === 1 ? this.oktext = text : this.errtext = text;
    },
    post(){
      var self = this;

      if(self.tel == ''){
        this.showToast(2,"请输入手机号码");
      }else if(self.code == ''){
        this.showToast(2,"请输入短信验证码");
      }else{

       $.ajax({
            type:'POST',
            url:'http://vues.com:81/mo_data/replacetel',
            xhrFields: {
                withCredentials: true
             },
            data:{
              newtel:self.tel,
              oldtel:self.oldtel,
              uid:self.store_id,
              code:self.code
            },
            success:function (backData) {
                if(backData.errno > 0){
                  self.showToast(2,backData.errmsg);
                }else{
                  //console.log(backData)
                  
                  store.write("user_tel",backData.data.newtel);
                  self.showToast(1,"手机号码修改成功");
                  setTimeout(function(){
                    window.history.back();
                  },3000)
                }
            }
          })

      }
    },
    phoneCode(){
      var self = this;
      const time = self.time;
      if(this.tel == ''){
        this.showToast(2,"请输入新手机号码");
      }else{
        

        $.ajax({
            type:'POST',
            url:'http://vues.com:81/mo_data/replacetelcode',
            xhrFields: {
                withCredentials: true
             },
            data:{
              newtel:self.tel,
              oldtel:self.oldtel,
              uid:self.store_id
            },
            success:function (backData) {
                if(backData.errno > 0){
                  self.showToast(2,backData.errmsg);
                }else{
                  //console.log(backData)
                  self.showToast(1,"短信已发送，请在两分钟内输入");
                  self.Countdown(time); 
                }
            }
          })



        //this.Countdown(time);

      }
    },
    Countdown(time){
      const code = document.getElementById('code')
        if(time == 0){
          code.setAttribute("class", "button button-default button-medium"); 
          this.disabled = false;
          this.timeCode = "重新获取验证码"
        }else{
          code.setAttribute("class", "button button-default button-medium disabled"); 
          this.disabled = true;
          this.timeCode = "重新发送("+time+")";
          time--;
          setTimeout(() =>{
            this.Countdown(time)
          },1000)
        }
        
    }
  }
}
</script>

<style>
.list-append{
  padding: 0 !important;
}
.col-h{
  float:none !important;
  margin:0.5rem auto !important;
}
.rows-1{
  text-indent: 3%;
}
.code{
  margin-right:3rem;
}
.protocol{
  color: #528EEE;
}
</style>
