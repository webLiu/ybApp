<template>
    <div class="img-upload">
        <input type="file" accept="image/*" 
               @change="selectImg($event)"
               ref='up-input' 
               class="inputs">
  <!--       <div class="img-preview">
            <img :src="previewSrc" v-show="showImg">
        </div> -->
        <div class="crop-box" v-show="showCover">
            <div class="cut-box" ref='cut-box' @touchstart="tStart($event)" @touchmove="tMove($event)" @touchend="tEnd($event)">
                <img class="source-img" ref='simg' v-bind:style="imgStyle" @load="initImg()">
                <div class="top-outline"></div>
            </div>
            <canvas ref='cutter' class="hide" :width="size" :height="size"></canvas>
            <div class="btn-box">
                <!-- 此处用 @click 因为 v-touch 与页面内touch事件冲突 -->
                <div class="crop-btn" @click="getCrop()">确定</div>
                <div class="crop-btn cancel" @click="cancel()">取消上传</div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from '../../directives/webpack-zepto'
import store from '../../directives/localStorage.js'
    export default {

        props:{
            size:{
                type:Number,
                default: 300
            }
        },
      
        data() {
            return {
                showCover: false,
                //showImg:false,
                imgStyle:{
                    left: '0px',
                    top: '0px',
                    width: '100%',
                    paddingTop: '80%'
                },
                initPos:{
                    top: 0,
                    left: 0
                },
                initTouchPos:{
                    x:0,
                    y:0
                },
                previewSrc:'',
                showSize:0
            }
        },
        methods: {
            selectImg(e) {
                this.showSize = document.getElementsByTagName('body')[0].scrollWidth * 0.8;
                var _vm = this;
                var cutBox = this.$refs.cutBox;
                var simg = this.$refs.simg;
                _vm.imgStyle.paddingTop = '0px';
                _vm.imgStyle.height = this.showSize+ 'px';
                var simg = this.$refs.simg;
                var file = e.target.files[0];
                var fr = new FileReader();
                fr.readAsDataURL(file);
                fr.onload = () => {
                    simg.src = fr.result;
                    this.previewSrc = fr.result;
                    this.showCover = true
                }
            },

            initImg(){
                var simg = this.$refs.simg;
                  
                var nW = simg.naturalWidth;

                var nH = simg.naturalHeight;



                if( nW - nH > 0 ){
                    // 横向长方形
                    var ratio = this.showSize / nH;
                    this.imgStyle.height =  this.showSize + 'px'
                    this.imgStyle.width = nW * ratio + 'px'
                    this.imgStyle.top = '0px';
                    this.imgStyle.left = (nH - nW) / 2 * ratio + 'px';
                    this.initPos.top = 0;
                    this.initPos.left = (nH - nW) / 2 * ratio;
                }else{
                    // 纵向长方形以及正方形

                    var ratio = this.showSize / nW;

                    this.imgStyle.width = this.showSize + 'px';
                    this.imgStyle.height = nH * ratio + 'px';
                    this.imgStyle.left = '0px';
                    this.imgStyle.top = (nW - nH) / 2 * ratio + 'px';

                    this.initPos.left = 0;
                    this.initPos.top = (nW - nH) / 2 * ratio;  
                }
            },
            getCrop(){
                var _vm = this;
                var simg = this.$refs.simg;
                var nW = simg.naturalWidth;
                var nH = simg.naturalHeight;
                var oSize = nW > nH ? nH : nW;
                var x = (- parseInt(this.imgStyle.left) / this.size)  * oSize ;
                var y = (- parseInt(this.imgStyle.top) / this.size)  * oSize ;

                var img = new Image();
                var cutter = this.$refs.cutter;
                var ctx = cutter.getContext('2d');

                img.src = this.previewSrc;
                ctx.drawImage(img,x,y,oSize,oSize,0,0,this.size,this.size);
                // 预览效果
                this.previewSrc = cutter.toDataURL();
                //this.showImg = true
                this.showCover = false
                
                // ajax Upload
                
                    var api = 'http://www.ybbuys.com/appserver/mo_data/uploadimg';
                    var data = this.previewSrc; 
                    var uid = store.read("uid"); 
                    $.ajax({
                        url:api,
                        type:'POST',
                        data:{
                            base64:data,
                            uid:uid
                        },
                        xhrFields: {
                            withCredentials: true
                         },
                        success:function(res){
                            if(res.errno > 0){
                                alert('上传失败请重试')
                            }else{
                                alert('头像上传成功')
                               store.write("user_img",res.data.user_img);
                               setTimeout(()=>{
                                 window.location.reload();
                               },500)

                            }
                            
                        },
                        error:function(){
                            alert('网络不好,请稍后重试')
                        }
                    })
               
            },
            cancel(){
                this.showCover = false
            },
            tStart(e){
                e.preventDefault();
                this.initTouchPos ={
                    x:e.touches[0].clientX,
                    y:e.touches[0].clientY
                }
            },
            tMove(e){
                e.preventDefault();
                var simg = this.$refs.simg;
                var cW = simg.clientWidth;
                var cH = simg.clientHeight;
                if(cW - cH > 0){
                    var maxOffset = cW - cH;
                    var offsetLeft = e.touches[0].clientX - this.initTouchPos.x;
                    var left = this.initPos.left + offsetLeft;
                    left = left > 0 ? 0 : left;
                    left = left + maxOffset < 0 ? -maxOffset : left;
                    this.imgStyle.left = left + 'px';
                }else{
                    var maxOffset = cH - cW;
                    var offsetTop = e.touches[0].clientY - this.initTouchPos.y;
                    var top = this.initPos.top + offsetTop;
                    top = top > 0? 0: top;
                    top = top + maxOffset < 0 ? -maxOffset: top;
                    this.imgStyle.top = top + 'px';
                }
            },
            tEnd(e){
                e.preventDefault();
                this.initPos = {
                    top: parseInt(this.imgStyle.top),
                    left: parseInt(this.imgStyle.left)
                }
                this.initTouchPos = {
                    x:0,
                    y:0
                }
            },
        }
       
    }
</script>
<style lang="less">
    @import 'normalize.css';
    @maincolor: green;
    .img-upload{
        .hide{
             display:none
        }
    
        .inputs{
            width: 100%;
            height: 100%;
            cursor: pointer;
            font-size: 30px;
            outline: medium none;
            position: absolute;
            filter:alpha(opacity=0);
            -moz-opacity:0;
            opacity:0; 
            left:0px;
            top: 0px;
            z-index:6
        }
    }
    .img-preview{
        text-align: center;
    }
    .img-preview>img{
        max-width: 100%;
    }
    .crop-box {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
        background-color: #fff;
        z-index: 7;

        .cut-box {
            position: absolute;
            top: 4rem;
            left: 0;
            right: 0;
            width: 80%;
            padding-top: 80%;
            margin: auto;
            font-size: 0;
        }
        .top-outline {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 1px solid @maincolor;
            box-shadow: 0 0 0 999px rgba(233,233,233, .6);
        }
        .source-img {
            position: absolute;
            top: 0;
            left: 0;
        }
        .btn-box{
            position: absolute;
            left: 0;right: 0;
            padding: 10%;
            bottom: 0;
            line-height: 2.2rem;
            background-color: rgb(233,233,233);
        }
        .crop-btn {
            background-color: #fff;
            text-align: center;
            transition: all ease 0.3s;
            margin-bottom: 1rem;
            border: 1px solid @maincolor;
            color: @maincolor;
            &:active{
                background-color: @maincolor;
                color: #fff;
            }
            &.cancel{
                background-color: #fff;
                border: 1px solid @maincolor;
            }
            &.cancel:active{
                background-color: @maincolor;
                color: #fff;
            }
        }
    }
</style>