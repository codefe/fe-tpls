<template>
    <div class="flex row flex-start items">
        <a target="_blank" class="flex ani-line" :href="item.url" v-for="(item, index) of tableData" :key="index">
            <img :src="item.img">
            <span class="flex-item">{{item.name}}</span>
        </a>
    </div>
</template>

<script>
export default {
    props: {
        tableData: Array
    }
};
</script>

<style lang="scss" scoped>
.items {
    margin-bottom: 100px;
    a{
        height:80px;
        padding: 10px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        &:hover{
            box-shadow: 0 0 3px 3px rgba(0,0,0,.05) inset;
        }
        img{
            width: auto;
            height: 100%;
            margin-right: 20px;
        }
    }
    @media screen and (min-width: 1200px) {
        a{
            width: 33.33333333%;
            &:nth-child(3n){
                border-right:0;
            }
        }
    }
    @media screen and (min-width: 1600px) {
        a{
            width: 25%;
            &:nth-child(4n){
                border-right:0;
            }
        }
    }
    @media screen and (max-width: 1200px) {
        a{
            width: 50%;
            &:nth-child(2n){
                border-right:0;
            }
        }
    }
}
</style>
