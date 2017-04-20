<template>
  <div class="page">
    <page-content>
      <form-list class="toplogin">
        <form-item>
          <div class="item-content">
            <div class="item-input">
              <input type="text" placeholder="手机号" v-model="tel">
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
      </form-list>
      <div class="content-block content-padded">
        <div class="row">
          <div class="col-90 col-h"><m-button size="large" @click.native="login()">登录</m-button></div>
        </div>
      </div>
      <div class="content-padded cols">

          <div class="row row-cont">
            <div class="col-51 rows-1 protocol">
              <router-link :to="{ path: 'register' }">立即注册</router-link>
            </div>
            <div class="col-51 rows-2 protocol">
               <router-link :to="{ path: 'foundpassword' }">忘记密码？</router-link>
            </div>
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
import $ from '../directives/webpack-zepto'
import { Form, FormItem } from '../components/form'
import Toast from '../components/toast'
import store from '../directives/localStorage.js'
export default {
  components: {
    'page-content':Content,
    'm-button': Button,
    'form-list': Form,
    FormItem,
    Toast
  },
  data () {
    return {
      tel: "",
      password:"",
      oktext:"",
      errtext:"",
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
            password = this.password;

      if(tel == ''){
        this.showToast(2,"请输入手机号");
      }else if(password == ''){
        this.showToast(2,"请输入密码");
      }else{
        $.ajax({
            type:'POST',
            url:'http://www.ybbuys.com/appserver/login',
            xhrFields: {
                withCredentials: true
             },
            data:{
              tel:this.tel,
              password:this.password
            },
            success:function (backData) {
               if(backData.errno !== 0){
                self.showToast(2,backData.errmsg);
               }else{
                self.showToast(1,backData.data.ok);
                store.write('uid',backData.data.uid);
                store.write("user_tel",backData.data.tel);
                store.write("user_img",backData.data.img);
                store.write("user_name",backData.data.name);
                if(backData.data.sex == 0){
                  store.write("user_sex","保密");
                }else if(backData.data.sex == 1){
                  store.write("user_sex","男");
                }else{
                  store.write("user_sex","女");
                }
                 setTimeout(function(){
                    window.history.back();
                  },3000)
               };


            }
        })
        //this.showToast(1,'登录成功')
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
  text-align: left;
  text-indent: 2%;
}
.rows-2{
  text-align: right;
}
.protocol a{
  color: #528EEE;
}
.toplogin{
  margin-top: 20px;
}
.col-51 {
  width: 49%;
  display: inline-block;
}
</style>
