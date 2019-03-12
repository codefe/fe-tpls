<template>
    <footer>
        <h5>与其在别处仰望 不如在这里并肩</h5>
        <h2 class="flex">
            <section class="abor">
                <router-link to="/">H5</router-link>
                <router-link to="/">C3</router-link>
                <router-link to="/">JS</router-link>
            </section>
            <section></section>
            <section class="abor abor-ml">
                <router-link to="/">React</router-link>
                <router-link to="/">Vue</router-link>
            </section>
        </h2>
        <nav class="flex flex-start">
            <dl class="flex flex-start column">
                <dt>HTML5</dt>
                <dd class="flex flex-start row">
                    <router-link to="/list/html5-svg">SVG</router-link>
                    <router-link to="/list/html5-webgl">WebGL</router-link>
                </dd>
            </dl>
            <dl class="flex flex-start column">
                <dt>CSS3</dt>
                <dd class="flex flex-start row">
                    <router-link to="/list/css3-flex">Flex</router-link>
                    <router-link to="/list/css3-stylus">Stylus</router-link>
                </dd>
            </dl>
            <dl class="flex flex-start column">
                <dt>JavaScript</dt>
                <dd class="flex flex-start row">
                    <router-link to="/list/js-array">数组</router-link>
                    <router-link to="/list/js-model">模式</router-link>
                    <router-link to="/list/js-async">异步</router-link>
                    <router-link to="/list/js-closures">闭包</router-link>
                    <router-link to="/list/js-oop">对象</router-link>
                    <router-link to="/list/js-iteration">迭代</router-link>
                    <router-link to="/list/js-this">this</router-link>
                    <router-link to="/list/js-regex">正则</router-link>
                    <router-link to="/list/js-json">JSON</router-link>
                    <router-link to="/list/js-fetch">Fetch</router-link>
                </dd>
            </dl>
        </nav>
        <section class="flex flex-start links ovhd">
            <span>友情链接：</span>
            <a target="_blank" href="https://reactjs.org/">React</a>
            <a target="_blank" href="https://cn.vuejs.org/">Vue</a>
            <a target="_blank" href="https://www.webpackjs.com/">Webpack</a>
            <a target="_blank" href="http://caibaojian.com/vuepress/">VuePress</a>
            <a target="_blank" href="https://zh.nuxtjs.org/">Nuxt</a>
            <a target="_blank" href="https://cli.vuejs.org/zh/">VueCLI</a>
            <a target="_blank" href="http://element-cn.eleme.io/#/zh-CN">Element</a>
            <a target="_blank" href="https://www.babeljs.cn/">Babel</a>
        </section>
        <section class="flex copy">
            <span>Copyright © 2019 All Rights Reserved.</span>
            <span>沪ICP备021XXXXXXXX号</span>
        </section>
        <Gotop/>
    </footer>
</template>
<script>
import Gotop from '@/components/Gotop.vue';
export default {
    components: {
        Gotop
    },
}
</script>
<style lang="scss" scoped>
footer{
    background-color:#fbfbfb;
    border-top: 1px solid #e8e8e8;
    h5{
        text-align: center;
        letter-spacing: 5px;
        padding:20px;
        font-weight: 400;
    }
    h2{
        background-color:$bg2-color;
        font-size:12px;
        font-weight: 100;
        padding:8px;
        a{
            color:#fff;
            padding:2px 5px;
        }
        .abor a{
            border:1px solid rgba(255,255,255,.5);
            margin-right:15px;
        }
        .abor-ml a{
            margin-right:0;
            margin-left:15px;
        }
    }
    nav{
        padding:0 20px;
        border-bottom:1px solid #ddd;
        dl{
            border-right:1px solid rgba(0,0,0,.1);
            padding:20px 10px;
            width: 180px;
            &:last-child{
                border-right:0;
            }
            dt{
                margin-bottom:10px;
                width:100%;
                &:before{
                    content:'';
                    display:inline-block;
                    margin-right:5px;
                    width:8px;
                    height:8px;
                    border-radius:8px;
                    background-color:rgba(0,0,0,.2);
                }
            }
            dd{
                a{
                    width:50%;
                }
            }
        }
    }
    .links{
        padding:10px 20px;
        border-bottom:1px solid #ddd;
        a{
            margin-right:15px;
        }
    }
    .copy{
        margin:20px 20px 50px 20px;
    }
}
</style>
