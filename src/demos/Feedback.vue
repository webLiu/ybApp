<template>
  <div class="page">
    <!-- <page-header>
      <header-link @click.native="post()">提交</header-link>
    </page-header> -->
    <page-content class="bodys">
    <form-list>
      <form-item>
          <div class="item-content">
            <div class="item-input">
              <textarea class="textareas" v-model="rest" :disabled="disabled" maxlength="200" placeholder="非常感谢您的反馈，最少不能低于10个字符"></textarea>
            </div>
          </div>

        </form-item>
        <p class="textlen">{{rest.length}}/200</p>
        <div class="btn">
          <m-button  @click.native="post()">提交</m-button>
        </div>
    </form-list>
    </page-content>       
    <toast ref="t1" :text="oktext"></toast>
    <toast ref="t2" :text="errtext" type="error"></toast>
  </div>
</template>

<script>
import { Header, HeaderLink, HeaderTitle, SecondHeader } from '../components/header'
import Content from '../components/content'
import { Button } from '../components/buttons'
import Icon from '../components/icons'

import { Form, FormItem } from '../components/form'
import Toast from '../components/toast'
import store from '../directives/localStorage.js'

export default {
  components: {
    'page-header': Header,
    SecondHeader,
    HeaderLink,
    HeaderTitle,
    'page-content':Content,
    Icon,
    'm-button': Button,
    'form-list': Form,
    FormItem,
    Toast,
  },
  data () {
    return {
      src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
      oktext:"",
      errtext:"",
      rest:"",
      disabled: false
    }
  },
  methods: {
    showToast (type,text) {
      type === 1 ? this.$refs.t1.open() : this.$refs.t2.open();
      type === 1 ? this.oktext = text : this.errtext = text;
    },
    // signout(){
    //     store.remove("Token");
    //     setTimeout(()=>{
    //       window.history.back();
    //     },2000)
    //     this.showToast(1,'已成功退出')
    // }
    post(){
      if(this.rest.length < 10){
        this.showToast(0,'最少不能低于10个字符')
      }else{
        setTimeout(()=>{
          window.history.back();
        },2000)
        this.showToast(1,'反馈成功，非常感谢您的反馈')
      }
    }
  }
}
</script>

<style>
.textareas{
  border:1px solid #ECECEC !important;
  border-radius: 5px !important;
  text-indent: 2%;
  margin-top:.75rem !important;
}
.textlen{
  margin: 0;padding: 0;width: 90%;margin: 0 auto;text-align: right;
}
.btn{
  width: 90%;margin:0 auto;
}
.btn a{
 height: 2.4rem !important;
  line-height: 2.4rem !important;

}
</style>
