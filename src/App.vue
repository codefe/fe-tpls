<template>
  <div id="app">
    <Header/>
    <section class="flex">
      <section class="flex-sideLeft"><Aside/></section>
      <section class="flex-item"><router-view v-if="isRouterAlive" class="fadeInUp"/></section>
      <section class="flex-sideRight"><Raside/></section>
    </section>
    <Footer/>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Aside from '@/components/Aside.vue';
import Raside from '@/components/Raside.vue';
import Footer from '@/components/Footer.vue';
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  components: {
    Header,
    Aside,
    Raside,
    Footer
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style lang="scss">
html, body{
  margin: 0;
  padding: 0;
}
.flex-sideLeft{
  width:140px;
  border-right:1px solid #e8e8e8;
  background-color:#fbfbfb;
  text-shadow:1px 1px 0 #fff;
}
.flex-sideRight{
  width:350px;
  border-left:1px solid #e8e8e8;
}
</style>
