<template>
  <div>
    <section class="navigation">
        <router-link to="/">Home</router-link>{{para}}
    </section>
    <Items :tableData="tableData"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Items from '@/components/Items.vue'
export default {
  inject: ['reload'],
  components: {
    Items
  },
  computed: {
    ...mapState({
      'tableData': state => JSON.parse(JSON.stringify(state.items.list)).item
    }),
    para () {
      return this.$route.params.id
    }
  },
  watch: {
    '$route': 'reload'
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.dispatch('items/getList', '/app/data/' + this.para + '.json?t='+new Date().getTime())
    }
  }
}
</script>

<style lang="scss" scoped>
.itemsa a{

    width: 30%;
    border:1px solid #f00;
    display:block;

}
</style>
