<template>
    <div class="ritems" v-if="lists && lists.length>0">
        <section v-if="flag=='one'">
            <dl>
                <dd v-for="(rc,index) in lists" :key="index" :class="{articleDdCur: url==rc.url}">
                    <a v-if="rc.flag=='true'" target="_blank" :href="rc.url">{{rc.title}}</a>
                    <a v-else-if="!rc.url" class="ano" href="#">{{rc.title}}</a>
                    <router-link v-else :to="'/article/'+purl+','+rc.url">{{rc.title}}</router-link>
                </dd>
            </dl>
        </section>
        <section v-else>
            <dl v-for="(ra,a) of lists" :key="a">
                <dt>{{ra.step}}</dt>
                <dd v-for="(rb,b) of ra.item" :key="b" :class="{articleDdCur: url==rb.url}">
                    <a v-if="rb.flag=='true'" target="_blank" :href="rb.url">{{rb.title}}</a>
                    <a v-else-if="!rb.url" class="ano" href="#">{{rb.title}}</a>
                    <router-link v-else :to="'/article/'+purl+','+rb.url">{{rb.title}}</router-link>
                </dd>
            </dl>
        </section>
    </div>
</template>

<script>
    export default {
        props: ['lists','flag','url','purl']
    }
</script>

<style lang="scss" scoped>
.ritems{
    p{
        display: none;
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
}
</style>