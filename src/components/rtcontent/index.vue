<template>
 
  <div class="title-time-content">
    <h2 class="title-connet">
      {{title}}
    </h2>
    <p class="author">
      <span><icons icon="zuozhe"></icons> {{author}}</span>&nbsp;&nbsp;&nbsp;<span>{{time}}</span>&nbsp;&nbsp;&nbsp;<span><icons icon="dazhongicon02"></icons> {{view}}</span>
    </p>
    <div class="html-cont" v-html="html"></div>
      <span style="color:#333333;line-height:1.5;font-size:12px;">
        <strong>（本文内容和图片均来自网络，如侵犯了您的权益，请联系我们删除。）</strong>
      </span>
  </div>
</template>

<script>
import Icons from '../../components/icon'
export default {
  props: {
    title: {
      type: String,
      default:"",
      required: true
    },
    time: {
      type: String,
      default:"",
      required: true
    },
    author: {
      type: String,
      default:"匿名",
      required: true
    },
    view: {
      type: Number,
      default:0,
      required: true
    },
    html: {
      type: String,
      default:"<p>网络错误<p>",
      required: true
    }
  },
   components: {
    Icons
  },

}
</script>
<style type="text/css">

    p{
      margin: 0;
    }
    .title-connet{
            font-weight: 400;
        font-size: 24px;
    }
  .title-time-content{
    background: #fff;
    
    width: 95%;
    margin:0 auto;
  }
  .author{
    color: #8C8C8C;
  }
  .author em:nth-child(2),.author em:nth-child(3){
    margin-left:.5rem;
  }
  .html-cont{
    margin-top: 18px;
    overflow-x: hidden;
  }
  img{
        max-width: 100%;
    max-height: 100%;
    height: auto !important;
  }
</style>