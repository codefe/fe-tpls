<template>
    <ul class="nav-side">
        <li class="flex"><router-link to="/">返回首页</router-link><span>»</span></li>
        <li class="flex"><router-link to="/items/tools">常用工具</router-link><span>»</span></li>
        <li class="flex"><router-link to="/items/study">学习平台</router-link><span>»</span></li>
    </ul>
</template>
<style lang="scss" scoped>
.nav-side{
    padding-bottom:100px;
    li{
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #e8e8e8;
        a{
            flex:1;
            transition: border 300ms;
            text-indent:30px;
        }
        span{
            width:30px;
            color:#bbb;
        }
    }
    .router-link-exact-active.router-link-active{
        border-left:5px solid $bg1-color;
    }
}
</style>
