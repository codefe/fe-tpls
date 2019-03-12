<template>
    <div class="raside">
        <section v-if="curUrl=='article'">
            <h3>章节目录</h3>
            <section v-if="listData.arr=='one'">
                <dl>
                    <dd v-for="(rc,c) of listData.items" :key="c" :class="{articleDdCur: curPara==rc.url}">
                        <a v-if="rc.flag=='true'" target="_blank" :href="rc.url">{{rc.title}}</a>
                        <a v-else-if="!rc.url" class="ano" href="#">{{rc.title}}</a>
                        <router-link v-else :to="'/article/'+purl+','+rc.url">{{rc.title}}</router-link>
                    </dd>
                </dl>
            </section>
            <section v-else>
                <dl v-for="(ra,a) of listData.items" :key="a">
                    <dt>{{ra.step}}</dt>
                    <dd v-for="(rb,b) of ra.item" :key="b" :class="{articleDdCur: curPara==rb.url}">
                        <a v-if="rb.flag=='true'" target="_blank" :href="rb.url">{{rb.title}}</a>
                        <a v-else-if="!rb.url" class="ano" href="#">{{rb.title}}</a>
                        <router-link v-else :to="'/article/'+purl+','+rb.url">{{rb.title}}</router-link>
                    </dd>
                </dl>
            </section>
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
export default {
    inject: ['reload'],
    data () {
        return {
            curUrl: '',
            purl: ''
        }
    },
    computed: {
        ...mapState({
            'listData': state => state.article.lista
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
    dt{
        padding-left: 20px;
        border-bottom: 1px dashed #ddd;
        line-height: 40px;
        color: #ccc;
        font-weight: 400;
    }
    dd{
        padding-left: 40px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.articleDdCur a{
            color: $bg1-color;
        }
        a{
            text-decoration: underline;
            transition: all 1s;
            display: block;
            line-height: 35px;
        }
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
