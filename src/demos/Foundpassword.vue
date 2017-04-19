<template>
  <div class="page">
    <page-content>
      <form-list>
        <form-item>
          <div class="item-content">
            <div class="item-input">
              <input type="tel" placeholder="您的手机号码" v-model="tel">
            </div>
          </div>
        </form-item>
        <form-item>
          <div class="item-content">
            <div class="item-input">
              <input type="tel" placeholder="短信验证码" v-model="code">
            </div>
             <div class="item-after code">
              <!-- <m-button :disabled="disabled" @click="phoneCode()">{{timeCode}}</m-button> -->
              <button class="button button-default button-medium" id="code" :disabled="disabled" @click="phoneCode()">{{timeCode}}</button>
            </div>
          </div>
        </form-item>
        <form-item>
          <div class="item-content">
            <div class="item-input">
              <input type="password" placeholder="您的新密码" v-model="password">
            </div>
          </div>
        </form-item>
        <form-item>
          <div class="item-content">
            <div class="item-input">
              <input type="password" placeholder="重复新密码" v-model="passwordok">
            </div>
          </div>
        </form-item>
      </form-list>
      <div class="content-block content-padded">
        <div class="row">
          <div class="col-90 col-h"><m-button size="large" @click.native="next()" >提交</m-button></div>
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
import $ from '../directives/webpack-zepto'
export default {
  components: {
    'page-content':Content,
    Icon,
    'm-button': Button,
    'form-list': Form,
    FormItem,
    Toast
  },
  data () {
    return {
      tel:"",
      code: "",
      password:"",
      passwordok:"",
      show: false,
      showSuccess: false,
      showError: false,
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
    next(){
      var self = this;
      const tel = this.tel,
            code = this.code,
            password = this.password;
      if(tel == ''){
        this.showToast(2,"请输入手机号码");
      }else if(code == ''){
        this.showToast(2,"请输入短信验证码");
      }else if(this.password.length == 0){
         this.showToast(2,"请输入新的密码");
      }else if(this.passwordok.length == 0){
         this.showToast(2,"请再次输入新的密码");
      }else if(this.password !== this.passwordok){
        this.showToast(2,"两次密码不一致");
      }else{
       
        $.ajax({
            type:'POST',
            url:'http://www.ybbuys.com/appserver/mo_data/foundpwd',
            xhrFields: {
                withCredentials: true
             },
            data:{
              tel:self.tel,
              code: self.code,
              password:self.password
            },
            success:function (backData) {
                if(backData.errno > 0){
                  self.showToast(2,backData.errmsg);
                }else{
                  self.showToast(1,"手机号码修改成功");
                  setTimeout(function(){
                    window.history.back();
                  },4000)
                }

            }
          })
       //this.path = "settingpassword"

      }
    },
    phoneCode(){
      var self = this;
      const time = self.time;

      if(this.tel == ''){
        this.showToast(2,"请输入手机号码");
      }else{
        // console.log(time)

        $.ajax({
            type:'POST',
            url:'http://www.ybbuys.com/appserver/mo_data/foundpwdcode',
            xhrFields: {
                withCredentials: true
             },
            data:{
              tel:self.tel
            },
            success:function (backData) {
                if(backData.errno > 0){
                  self.showToast(2,backData.errmsg);
                }else{
                  self.showToast(1,"验证码已经发送，请在两分钟内输入");
                  self.Countdown(time);
                }
            }
          })
        // this.Countdown(time);

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
.bodys{
  background: #ECECEC;
}
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
