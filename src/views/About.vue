<template>
  <div class="about">
    <h1>This is an about page</h1>
    <detail/>
  </div>
</template>
<script lang="ts">
// import { Vue } from 'vue-class-component';
// 最新版本暂时有问题 [bug] https://github.com/vuejs/vue-loader/issues/1740
import { ref, defineComponent } from 'vue';
import Detail from './Detail';

export default defineComponent({
  name: 'About',
  components: {
    Detail
  },
})
</script>
