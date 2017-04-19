<template>
  <div class="page">
    <page-footer>
      <footer-item v-bind:class="{ 'active' : currentView === 'home' }" @click.native="changeView('home')">
        <icons icon="chanpin"></icons>
        <label>产品</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'information' }" @click.native="changeView('information')">
        <icons icon="yuedureading19"></icons>
        <label>乙肝知识阅读</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'me' }" @click.native="changeView('me')">
        <icons icon="xiaolian"></icons>
        <label>我的</label>
      </footer-item>
    </page-footer>
    <component :is="currentView" keep-alive></component>
  </div>
</template>

<script>
import Page from '../components/page'
import { Footer, Item } from '../components/footer'
import Home from './Home'
import Information from './Information'
import Me from './Me'
import Icons from '../components/icon'
export default {
  components: {
    Page,
    'page-footer': Footer,
    'footer-item': Item,
    'home': Home,
    'information': Information,
    'me': Me,
    Icons
  },
  data () {
    return {
      currentView: 'information'
    }
  },
  methods: {
    changeView (view) {
      this.currentView = view
    }
  }
}
</script>

<style>
*{
  margin:0;padding:0;
}
.my-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 2.8rem;
}
.demo-icon-home {
  background-image: url("../assets/images/home/home.png");
  background-size: 100%;
}
.demo-icon-search {
  background-image: url("../assets/images/home/search.png");
  background-size: 100%;
}
.demo-icon-noti {
  background-image: url("../assets/images/home/button.png");
  background-size: 100%;
}
.demo-icon-me {
  background-image: url("../assets/images/home/person.png");
  background-size: 100%;
}
.item-inner{
  color: #3d4145 !important;
}
</style>
