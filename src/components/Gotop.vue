<template>
    <div class="quick_menu">
        <a href="javascript:void(0)" @click="gotop"><i class="ic-up"></i></a>
    </div>
</template>

<script>
    export default {
        methods: {
            gotop() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
.quick_menu{
    width:40px;
    position:fixed;
    right:20px;
    bottom:100px;
    z-index:9999;
    background: #fbfbfb;
    box-shadow: 0 0 3px 3px rgba(0,0,0,.1);
    text-align:center;
    a{
        display:block;
        height:40px;
        line-height:40px;
        color:#01c26f;
        font-size:10px;
        font-weight:800;
        &:hover{
            background-color:#01c26f;
            color:#fff;
        }
        .ic-up{
            position:absolute;
            left:9px;
            top:15px;
            width:20px;
            height:20px;
            border-top:solid 3px currentColor;
            border-right:solid 3px currentColor;
            transform:rotate(-45deg);
        }
    }
}
</style>