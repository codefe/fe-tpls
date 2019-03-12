<template>
    <div class="article">
        <section class="navigation">
            <router-link to="/">Home</router-link>
            <router-link :to="'/list/'+routeUrlParent.split('/').join('-')">{{routeUrlParent}}</router-link>
            {{listData.name}}
        </section>
        <section class="list-title">
            <h2>{{listData.title}}</h2>
            <p>{{listData.desc}}</p>
            <p class="flex">
                <span>By: {{listData.author}}</span>
                <span>Star: {{listData.star}}</span>
            </p>
        </section>
        <section class="article-title">
            {{listDataChild.subTitle}}
        </section>
        <section class="article-content" v-html="listDataChild.content"></section>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    computed: {
        ...mapState({
            'listData': state => state.article.lista,
            'listDataChild': state => state.article.listb
        }),
        routeUrl() {
            let url = this.$route.params.id.split(',');
            return url[0].split('-').join('/') + '/' + url[1];
        },
        routeUrlParent() {
            return this.$route.params.id.split(',')[0].split('-').join('/');
        }
    },
    created() {
        this.routeUrl && this.updatepara(['/app/data/' + this.routeUrlParent + '/index.json','/app/data/' + this.routeUrl + '.json']);//传参数
        this.getTableData().then((rs) => {
            // this.loading = false
        }).catch((err) => {
            console.log('article page',err);
        });
    },
    methods: {
        //改变参数
        ...mapMutations('article',['updatepara']),
        //获取数据
        ...mapActions('article', {
            'getTableData': 'getListData'
        })
    }
};
</script>

<style lang="scss">
.article{
    word-wrap:break-word;
    .article-title{
        padding:10px;
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .article-content{
        margin:20px 20px 100px 20px;
        word-wrap:break-word;
        line-height: 1.8;
        pre, blockquote{
            background-color:#fbfbfb;
            border-left:2px solid #eaebb2;
            padding:10px;
            color:#a3a44a;
            white-space: pre-wrap;
            word-break:break-all;
            word-wrap: break-word;
            *white-space:normal;
            overflow: hidden;
        }
        ul{
            list-style-type:circle;
            margin:10px 40px;
        }
        h2, h3{
            border-left:3px solid #01c26f;
            color:#01c26f;
            font-size:14px;
            padding:0 15px;
            margin-top:20px;
            margin-bottom:10px;
            position:relative;
        }
        h4{
            margin:20px 0 20px 30px;
            color:#01c26f;
            font-size:14px;
            font-weight:400;
        }
        table{
            border-collapse: collapse;
            border: none;
            width:100%;
            td,th{
                border: solid #eee 1px;
                text-align:center;
                padding:5px;
            }
            img{
                display:inline-table;
            }
        }
        img{
            max-width:100%;
        }
        a{
            color:#01c26f;
            text-decoration:underline;
            &:after{
                display:inline-table;
                content:'→';
                font-size:14px;
                transform:rotate(-45deg);
            }
        }
    }
}
</style>
