<template>
    <div class="plist">
        <section class="navigation">
            <router-link to="/">Home</router-link>
            {{routeUrl}}
        </section>
        <section class="list-title">
            <h2>{{listData.title}}</h2>
            <p>{{listData.desc}}</p>
            <p class="flex">
                <span>By: {{listData.author}}</span>
                <span>Star: {{listData.star}}</span>
            </p>
        </section>
        <section class="list-content">
            <!-- 无二级分类 -->
            <dl v-if="listData.arr=='one'" class="flex flex-start row list-item">
                <dd class="flex" v-for="(item,index) of listData.items" :key="index">
                    <router-link v-if="item.flag=='true'" class="flex-item tc" target="_blank" :to="item.url">
                        <i class="ic-lock"></i>
                        <p>{{item.title}}</p>
                    </router-link>
                    <router-link v-else class="flex-item tc" :to="'/article/'+listData.subType+','+item.url">
                        <i class="ic-lock"></i>
                        <p>{{item.title}}</p>
                    </router-link>
                </dd>
            </dl>
            <!-- 有二级分类 -->
            <dl v-else class="flex flex-start row list-item" v-for="(item,index) of listData.items" :key="index">
                <dt>{{item.step}}</dt>
                <dd class="flex" v-for="(itema,indexa) of item.item" :key="indexa">
                    <router-link v-if="itema.flag=='true'" class="flex-item tc" target="_blank" :to="itema.url">
                        <i class="ic-lock"></i>
                        <p>{{itema.title}}</p>
                    </router-link>
                    <router-link v-else-if="!itema.url" class="flex-item tc ano" to="#">
                        <i class="ic-lock ic-lock-open"></i>
                        <p>{{itema.title}}</p>
                    </router-link>
                    <router-link v-else class="flex-item tc" :to="'/article/'+listData.subType+','+itema.url">
                        <i class="ic-lock"></i>
                        <p>{{itema.title}}</p>
                    </router-link>
                </dd>
            </dl>
        </section>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        inject: ['reload'],
        computed: {
            ...mapState({
                'listData': state => state.list.list
            }),
            routeUrl() {
                return this.$route.params.id.split('-').join('/');
            }
        },
        watch: {
            '$route': 'reload'
        },
        created() {
            this.getTableData();
        },
        methods: {
            getTableData() {
                this.$store.dispatch('list/getList','/app/data/' + this.routeUrl + '/index.json');
            }
        }
    }
</script>

<style lang="scss" scoped>
.plist{
    .list-content{
        padding: 20px 20px 100px 20px;
        .list-item{
            dt{
                width: 100%;
                margin-top:20px;
                color: $bg1-color;
                &:before{
                    content: '';
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background-color: $bg1-color;
                    display:inline-block;
                    margin-right: 5px;
                    margin-bottom: 2px;
                }
            }
            dd{
                width: 25%;
                margin-top:20px;
                a{
                    margin: 0 10px;
                    padding:0 10px 10px 10px;
                    border:1px solid #eee;
                    p{
                        margin-top:10px;
                    }
                    &:hover{
                        color:$bg1-color;
                        i{
                            color:#a8edcc;
                            border:1px solid #a8edcc;
                        }
                    }
                }
            }
            @media screen and (max-width: 1200px){
                dd{
                    width: 50%;
                }
            }
        }
    }
}
</style>
