<template>
  <span :class="'icon iconfont icon-' + icon"></span>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
@import 'iconfont.css';
</style>
