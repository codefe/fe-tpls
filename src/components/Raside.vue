<template>
    <div class="raside">
        <section v-if="curUrl=='article'">
            <h3>章节目录</h3>
            <Ritems :lists="listData.items" :purl="purl" :url="curPara" :flag="listData.arr?'one':'step'" />
        </section>
        <section v-else>
            <h3>热点推荐</h3>
            <ul class="flex flex-start row raside-hot">
                <li v-for="(ra,index) of filterDataHot" :key="index">
                    <router-link :class="{ano: !ra.url}" :to="'/list/'+ra.url">
                        <figure class="flex column">
                            <p class="zoomImg" :style="'background-image:url('+ra.img+')'"></p>
                            <figcaption>{{ra.name}}</figcaption>
                        </figure>
                    </router-link>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Ritems from '@/components/Ritems.vue'
export default {
    inject: ['reload'],
    components: {
        Ritems
    },
    data () {
        return {
            curUrl: '',
            purl: ''
        }
    },
    computed: {
        ...mapState({
            'listData': state => JSON.parse(JSON.stringify(state.article.lista))
        }),
        ...mapGetters('header', {
            'filterDataHot': 'filterDataHot'
        }),
        curPara(){
            return this.$route.params.id && this.$route.params.id.split(',')[1]
        }
    },
    watch: {
        '$route': 'getPath'
    },
    methods: {
        getPath () {
            this.curUrl = this.$route.name
            this.purl = this.$route.params.id && this.$route.params.id.split(',')[0]
            this.reload()
        }
    }
}
</script>

<style lang="scss" scoped>
.raside{
    h3{
        line-height: 44px;
        background-color: #fbfbfb;
        padding-left: 20px;
        border-bottom: 1px solid #e8e8e8;
    }
    .raside-hot{
        li{
            width: 145px;
            margin: 20px 0 0 20px;
        }
        figure{
            p{
                border-radius: 5px;
                height: 80px;
            }
            figcaption{
                height: 20px;
                margin-top:5px;
            }
        }
        
    }
}
</style>
