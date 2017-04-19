<template>
  <div class="my-page">
    <page-content>
      <scroll :on-refresh="onRefresh" :on-infinite="onInfinite">

        <div class='content-padded' id="list">
        <!-- <router-link :to="{ path: 'productDetails' }"> -->
          <list  v-for="(index,item) in items">
            <list-item :link="true" @click.native="router({ path: 'productDetails' })">
              <div class="item-media"><img src="../assets/images/icon-list.png" width="88"></div>
              <div class="item-content">
                <div class="item-title-row">
                  <div class="item-title item-title-color">友邦充裕未来健康险</div>
                </div>
               <!--     -->
                <div class="item-text item-text-color">
                 一般300万 癌症600万
                </div>
                <div class="item-text item-text-color">
                 安排住院
                </div>
                <div class="item-text item-text-color">
                 扩展医药费
                </div>
              </div>
            </list-item>
            <list-item >
              <div class="item-content">
                <div class="item-title-row">
                  <div class="item-title tg-color"></div>
                  <div class="item-after money-color" >174元起</div>
                </div>
              </div>
            </list-item>
          </list>
        <!-- </router-link> -->
          
        </div>
      </scroll> 
    </page-content>
  </div>
</template>
<script>
import Content from '../components/content'
import Scroll from '../components/scroll'
import { List, ListItem } from '../components/list'

export default {
  components: {
    'page-content': Content,
    Scroll,
    List,
    ListItem
  },
  data(){
     return {
      items: ['0', '1', '2', '3', '4'],
      end: 5,
    }
  },
  mounted(){
    document.title = "产品";
  },
  activated(){
    document.title = "产品";
  },
  methods: {
     router(router){
      this.$router.push(router);
    },
    onRefresh (done) {
      let self = this
      setTimeout(()=> {
       let refData = ['0', '1', '2', '3', '4'];
       self.items = refData;
       self.end = 5;
        done()  // call done
      }, 2000)
    },
    onInfinite (done) {
      let self = this//要this赋值给self
      console.log(self.items)
      setTimeout(()=> {
        
        if (self.end < 100) {
          for (let i = self.end; i < self.end + 5; i++) {
            self.items.push(String(i))
          }
        }
        self.end += 5
        done()  // call done()
      }, 2000)
    }
  }
}
</script>
<style type="text/css">
/*字体修改*/
  .item-title-color{
    font-size:.8rem;
  }
  .item-subtitle-color{
    color: #24BA29;
    font-size: 0.4rem !important;
    width: 50%;
    border: 1px solid;
    text-align: center;
    border-radius: 5px;
  }
  .item-text-color{
    font-size: 0.6rem !important;
    color: #A6A6A6 !important;
  }
  .tg-color{
    font-size: 0.7rem ;
    color: #FD6A41;
  }
  .money-color{
    color: #FD6A41 !important;
  }
  .rows{
  text-align: center;
  line-height: 2rem;
}
.nav-secondary{
  top:0 !important;
}
</style>

