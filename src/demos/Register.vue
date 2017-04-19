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
              <input type="password" placeholder="密码" v-model="password">
            </div>
          </div>
        </form-item>
        <form-item>
          <div class="item-content">
            <div class="item-input">
              <input type="password" placeholder="确认密码" v-model="passwordok">
            </div>
          </div>
        </form-item>
      </form-list>
      <div class="content-block content-padded">
        <div class="row">
          <div class="col-90 col-h"><m-button size="large" @click.native="login()">注册</m-button></div>
        </div>
      </div>
      <div class="content-padded cols">

          <div class="row row-cont">
            <div class="col-100 rows-1">
            注册即视为同意
            <span class="protocol" @click="$refs.p.open()">乙宝客户协议</span>
            </div>
          </div>
  
    </div> 
    </page-content>
    <toast ref="t1" :text="oktext"></toast>
    <toast ref="t2" :text="errtext" type="error"></toast>

    <pop-window ref="p">
      <h2 class="demos-sub-title">协议</h2>
      <div class="content-padded">
        <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
        <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
        <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
        <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
        <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
        <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
        <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
        <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
        <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
        <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
        <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
        <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
        <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
        <p>
          <m-button @click.native="$refs.p.close()">关闭</m-button>
        </p>
      </div>
    </pop-window>
  </div>
</template>


<script>
import Content from '../components/content'
import { Button } from '../components/buttons'
import Icon from '../components/icons'
import { Form, FormItem } from '../components/form'
import Toast from '../components/toast'
import $ from '../directives/webpack-zepto'
import PopWindow from '../components/popwindow'
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
      code: "",
      password:"",
      passwordok: "",
      oktext:"",
      errtext:"",
      timeCode:"获取短信验证码",
      disabled:false,
      time:120
    }
  },
  methods: {
    showToast (type,text) {
      type === 1 ? this.$refs.t1.open() : this.$refs.t2.open();
      type === 1 ? this.oktext = text : this.errtext = text;
    },
    login(){
       var self = this;
      const tel = this.tel,
            code = this.code,
            password = this.password,
            passwordok = this.passwordok;

      if(tel == ''){
        this.showToast(2,"请输入您的手机号码");
      }else if(code == ''){
        this.showToast(2,"请输入短信验证码");
      }else if(password == ''){
        this.showToast(2,"请输入密码");
      }else if(passwordok == ''){
        this.showToast(2,"请输入重复密码");
      }else if(passwordok !== password){
        this.showToast(2,"两次密码不一致");
         this.password = "";
         this.passwordok = "";
      }else{
        //this.showToast(1,'注册成功')
       
        $.ajax({
            type:'POST',
            url:'http://vues.com:81/user/register',
            xhrFields: {
                withCredentials: true
             },
            data:{
              type:1,
              tel:self.tel,
              code:self.code,
              password:self.password
            },
            success:function (backData) {
                if(backData.errno > 0){
                 
                  self.showToast(2,backData.errmsg);

                }else{
                  self.showToast(1,backData.data.reg);
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
        this.showToast(2,"请输入手机号码");
      }else{

        $.ajax({
            type:'POST',
            url:'http://vues.com:81/user/register',
            xhrFields: {
                withCredentials: true
             },
            data:{
              type:0,
              tel:self.tel
            },
            success:function (backData) {

                if(backData.errno > 0){
                  self.showToast(2,backData.errmsg);
                }else{
                  if(backData.errno > 0){
                  self.showToast(2,backData.errmsg);
                }else{
                  //console.log(backData)
                  self.showToast(1,"短信已发送，请在两分钟内输入");
                  self.Countdown(time); 
                }
            }}
          })
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
    },
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
