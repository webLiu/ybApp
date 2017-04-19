<template>
  <div class="page">
    <page-content class="bodys">
      <list>
       <div slot="title"></div>
    <list-item :link="true">
      <img-crop></img-crop> 
          <div class="item-media name-class">头像</div>
          <div class="item-content">
            <div class="item-title-row">
              <div class="item-title"></div>
              <div class="item-after"><div class="item-media right-img-content"><img v-bind:src="store_img" width="44" class="img-border"></div></div>
            </div>
          </div>
      
    </list-item>
    <list-item :link="true" @click.native="showPrompt()">
        <div class="item-media name-class">名字</div>
          <div class="item-content">
            <div class="item-title-row">
              <div class="item-title"></div>
              <div class="item-after" >{{store_name}}</div>
            </div>
          </div>
    </list-item>
   
    <list-item :link="true" @click.native="routers({path:'settingtel'})">
          <div class="item-media name-class">手机号码</div>
           <div class="item-content">
            <div class="item-title-row">
              <div class="item-title"></div>
              <div class="item-after">{{store_tel}}</div>
            </div>
          </div>
    </list-item>
   
    <list-item :link="true" @click.native="showActions()">
          <div class="item-media name-class">性别</div>
            <div class="item-content">
            <div class="item-title-row">
              <div class="item-title"></div>
              <div class="item-after">{{store_sex}}</div>
            </div>
          </div>
    </list-item>
    <list-item :link="true">
        <div class="item-media name-class">地区</div>
          <div class="item-content">
            <div class="item-title-row">
              <div class="item-title"></div>
              <div class="item-after">{{area}}</div>
            </div>
        </div>
    </list-item>
    </list>
    <div class="content-block content-padded">
        <div class="row">
          <div class="col-90 col-h"><m-button size="large" type="danger" @click.native="signout()">退出登录</m-button></div>
        </div>
    </div>

  </page-content>

    <prompt  :title="'名字'" :content="'修改您的名字！'" :input="input" :on-ok="onPrompt" ref="prompt"></prompt>
    <actions ref="actions">
      <action-group>
        <action-button @click.native="save(1)">男</action-button>
        <action-button class="color-danger"  @click.native="save(2)">女</action-button>
        <action-button @click.native="save(0)">保密</action-button>
      </action-group>
    </actions>
    <toast ref="t1" :text="oktext"></toast>
    <toast ref="t2" :text="errtext" type="error"></toast>
  </div>

  
</template>

<script>
import Content from '../components/content'
import { Button } from '../components/buttons'
import { List, ListItem } from '../components/list'
import Icon from '../components/icons'
import { Prompt } from '../components/modal'
import { Actions, ActionButton, ActionGroup } from '../components/actions'
import $ from '../directives/webpack-zepto'
import Toast from '../components/toast'
import store from '../directives/localStorage.js'
import ImgCrop from '../components/imgcrop'

export default {
  components: {
    'page-content':Content,
    Icon,
    'm-button': Button,
    Prompt,
    List,
    ListItem,
    Actions,
    Toast,
    ActionButton,
    ActionGroup,
    ImgCrop
  },
  mounted(){
    var self = this;
    // $.ajax({
    //         type:'GET',
    //         url:'http://restapi.amap.com/v3/ip?key=08257b42a92e5a550d38dd8e98f67683&ip=119.122.74.198',
    //         success:function (backData) {
    //           if(backData.status == 1){
    //             self.area =  backData.province + backData.city;
    //           }else{
    //             self.area = "定位出错请重试";
    //           }
    //         }
    //     })
  
  },
  data () {
    return {
      input: '',
      store_id:store.read("uid"),
      store_tel:(store.read('user_tel') == null || store.read('user_tel') == undefined  || store.read('user_tel') == "" ) ? "" : store.read('user_tel'),

      store_img:(store.read('user_img') == null || store.read('user_img') == undefined || store.read('user_img') == "" ) ?  "http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png" : store.read('user_img'),

      store_name:(store.read('user_name') == null || store.read('user_name') == undefined  || store.read('user_name') == "") ? "匿名" : store.read('user_name'),

      store_sex:(store.read('user_sex') == null || store.read('user_sex') == undefined  || store.read('user_sex') == "保密" ) ? "保密" : store.read('user_sex'),

      sex:0,
      area:"",
      oktext:"",
      errtext:"",
    }
  },
  methods: {
    routers(router){
      this.$router.push(router);
    },
    showActions () {
      this.$refs.actions.open()
    },
    save (index) {
      console.log(index)
      var self = this;
      switch(index){
        case 0:
          this.store_sex = "保密"
          this.$refs.actions.close()
          this.sex = 0
        break;
        case 1:
          this.store_sex = "男"
          this.$refs.actions.close()
          this.sex = 1
          break;
        default:
        this.store_sex = "女"
        this.$refs.actions.close()
        this.sex = 2
      }
      $.ajax({
            type:'POST',
            url:'http://vues.com:81/mo_data/modata',
            xhrFields: {
                withCredentials: true
             },
            data:{
              type:2,
              uid:self.store_id,
              sex:self.sex
            },
            success:function (backData) {
                console.log(backData);
                if(backData.errno == 0){
                  self.showToast(1,"修改成功");
                  if(backData.data.sex == 0){
                    store.write("user_sex","保密");
                    self.store_sex = "保密";
                  }else if(backData.data.sex == 1){
                    store.write("user_sex","男");
                    self.store_sex = "男";
                  }else{
                    store.write("user_sex","女");
                    self.store_sex = "女";
                  }

                  

                }else{
                  self.showToast(2,backData.errmsg)
                }
               
            }
        })
    },
    showToast (type,text) {
      type === 1 ? this.$refs.t1.open() : this.$refs.t2.open();
      type === 1 ? this.oktext = text : this.errtext = text;
    },
    showPrompt () {
      this.$refs.prompt.open()
    },
    onPrompt (input) {
  
      var self = this;
      if(input == ''|| input.indexOf(" ") >= 0 || input.length > 15){
        this.showToast(2,"名字长度为1 - 15个字符，不能含有空格");
      }else if(this.store_id == null || this.store_id == undefined){
        this.showToast(2,"没有权限请重新登录");
      }else{

        $.ajax({
            type:'POST',
            url:'http://vues.com:81/mo_data/modata',
            xhrFields: {
                withCredentials: true
             },
            data:{
              type:1,
              uid:self.store_id,
              name:input
            },
            success:function (backData) {
                //console.log(backData);
                if(backData.errno == 0){
                  self.showToast(1,"名字修改成功");
                  store.write("user_name",backData.data.name);
                  self.store_name = backData.data.name;
                  self.input = '';
                }else{
                  self.showToast(2,backData.errmsg)
                }
               
            }
        })
      }
      this.input = '';  
    },
    onClick (index) {
      console.log('click' + index)
      this.modal = false
    }, 
    signout(){
        store.remove("uid");
        store.remove("user_img");
        store.remove("user_name");
        store.remove("user_sex");
        store.remove("user_tel");
        setTimeout(()=>{
          window.history.back();
        },2000)
        this.showToast(1,'已退出当前账号')
    }

  },
}
</script>

<style>
.list-bg{
  background: #ECECEC;
}
.img-border{
  border-radius: 5px;
  border:1px solid #EDEDED;
}
.name-class{
  width:30%;
  justify-content: flex-start !important;
}
.g-core-image-upload-btn {
    position: absolute !important;
    z-index: 999999;
    width: 100%;
    height: 100%;
}
.list-con{
  background: #fff
}
.upload-btn{
    width: 80%;
    margin: 2rem auto;
    border: 1px solid green;
    background-color: #fff;
    color: green;
    line-height: 2rem;
    text-align: center;
}
</style>
