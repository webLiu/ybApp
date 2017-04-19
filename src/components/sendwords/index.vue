<template>
  <div>
    <overlay :show="mutableShow" :click="close"></overlay>
    <transition name="sendwords-modal">
      <div v-if="mutableShow"
           class="sendwords-modal">
        <div class="sendwords-content">
          <form-list>
              <form-item>
                <div class="item-content">
                    <textarea id="position" @blur="blur()"  maxlength="200" placeholder="内容，2-200个字" ></textarea>
                </div>
              </form-item>
              <div class="border-1px"></div>
              <ul class="pub-type" >
                <li class="pub-face" title="添加表情"></li>
                <li class="pub-flex"></li>
                <li class="pub-btn">
                  <button class="pub-cancel" @click="close()">取消</button>
                </li>
                <li class="pub-btn">
                  <button class="pub-publish" @click="publish()">发表</button>
                </li>
              </ul>
          </form-list>
          <slide-wrapper>
              <slide v-for="i in 5" >

                <div :class="'ui-carousel-item face-panel face-panel-'+i">
                  <span v-for="j in 20" :index="(20*(i-1)+(j-1))" :alt="'[em_'+ (20*(i-1)+(j-1))+']'" 
                  @click="emojiadd_remove(20*(i-1)+(j-1))"></span>
                  <span index="-1" alt="" @click="emojiadd_remove(-1)"></span></li>
                </div>
              </slide>
        </slide-wrapper>   
        </div>
      </div>
    </transition>
    <toast ref="t1" :text="oktext"></toast>
    <toast ref="t2" :text="errtext" type="error"></toast>
  </div>
</template>

<script>
import Overlay from '../overlay'
import Toast from '../toast'
import { SlideWrapper, Slide } from '../slide'
import { Form, FormItem } from '../form'
import $ from '../../directives/webpack-zepto'
import { Button } from '../buttons'
export default {
  components: {
    Overlay,
    'form-list': Form,
    'm-button': Button,
    FormItem,
    Toast,
     SlideWrapper,
     Slide
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    uid: {
      type: String,
      default: '',
       required: true
    },
    nickname: {
      type: String,
      default: '匿名',
       required: true
    },
    aid: {
      type: Number,
      default: 0,
      required: true
    },
    belongid: {
      type: String,
      default: '',
      required: true
    },
    pic: {
      type: String,
      default: '',
      required: true
    },
    texts: {
      type: Function,
      default: undefined,
      require: false
    }
  },
  data () {
    return {
      mutableShow: this.show,
      text:"",
      oktext:"" ,
      errtext:"" ,
      emoji:"",
      emojishow:false,
      CaretPos:0,
      fid: 'position',
      start: 0,
      end: 0
    }
  },
  methods: {
    open () {
      this.mutableShow = true
      this.$emit('open', this)
    },
    close () {
      this.mutableShow = false
      this.$emit('close', this)
    },
    showToast (type,text) {
     type === 1 ? this.$refs.t1.open() : this.$refs.t2.open();
      type === 1 ? this.oktext = text : this.errtext = text;
    },
    publish(){
      var self = this;
       var uid = this.uid,
           aid = this.aid,
           nickname = this.nickname,
           belongid = this.belongid,
           pic = this.pic,
           comment = $("#position").val();

      if($("#position").val().length < 2){
          this.showToast(0,"至少输入两个汉字");
      }else{
       $.ajax({
            type:'POST',
            url:'http://vues.com:81/comment/addcomment',
            xhrFields: {
                withCredentials: true
             },
            data:{
             uid:uid,
             aid:aid,
             belongid:belongid,
             pic:pic,
             nickname:nickname,
             comment:comment
            },
            success:function (backData) {
              
                if(backData.errno == 0){
                  
                  self.texts(backData);
                  self.close();
                  self.text = "";

                }else{
                  self.showToast(2,backData.errmsg);
                  self.close();
                  self.text = "";
                }
               
            }
        })
            

     
      }
    },
    showemoji(){
        if(this.emojishow == false){
          this.emojishow = true
        }else{
          this.emojishow = false
        }
    },
    blur(){
      this.fid = 'position';
      this.start = $("#position").get(0).selectionStart;
      this.end = $("#position").get(0).selectionEnd;
      
    },
    emojiadd_remove(index){
        if(index == -1){
            
          if ($('#' + this.fid).length) {
            var text = $('#' + this.fid).val();
            // 获取光标之前的字符串
            var changedText = text.substr(0, this.start);

            var len = changedText.length;
            var reg=/\[em_([0-9]*)\]$/g;
            // 删除表情code块或最后一个字符
            if(reg.test(changedText)){
                changedText=changedText.replace(reg,"");
            }else{
                changedText=changedText.substring(0,changedText.length-1);
            }
            var resText = changedText + text.substr(this.end, text.length);
            $('#' + this.fid).val(resText);
            // 调整光标位置
            this.start = this.end = this.end - (len - changedText.length);
            
        }

        }else if($('#' + this.fid).length){
          var imgCode = "[em_"+index+"]";
          var text = $('#' + this.fid).val();
            // 添加表情code块到光标位置
          var resText = text.substr(0, this.start) + imgCode + text.substr(this.end, this.length);
          $('#' + this.fid).val(resText);
          this.start = this.end = this.end + imgCode.length;
        }
    }
  }
}
</script>

<style lang="less" scoped>
@import './sendwords.less';
</style>
