<template>
    <header class="flex head">
        <h1><router-link to="/">前端</router-link></h1>
        <nav class="flex">
            <section class="head-nav head-bg">
                <span>教程</span>
                <section class="popmenu flex">
                    <section class="flex-item flex column flex-start" v-if="menuData.length">
                        <dl class="flex flex-start popmenu-dl" v-for="(item,index) of menuData[menuCur].child" :key="index">
                            <dt>{{item.name}}</dt>
                            <dd class="flex-item">
                                <router-link :class="{ano: !itema.url}" :to="'/list/'+itema.url" v-for="(itema,indexa) of item.child" :key="indexa">{{itema.name}}</router-link>
                            </dd>
                        </dl>
                    </section>
                    <ul class="flex column flex-start flex-nav-tab" @click="changeMenuCur($event)">
                        <li :class="menuCur==index?'cur':null" v-for="(item,index) of menuData" :key="index" :id="index">{{item.name}}</li>
                    </ul>
                </section>
            </section>
            <section class="head-nav head-login">
                <em class="ovhd">8</em>
                <span class="head-img"><i class="ic-ren"></i></span>
                <ul class="popmenu">
                    <li><a href="#">我的作品</a></li>
                    <li><a href="#">我的收藏</a></li>
                    <li><a href="#">我的简历</a></li>
                    <li><a href="#">修改资料</a></li>
                    <li class="exit"><a href="#">退出登录</a></li>
                </ul>
            </section>
        </nav>
    </header>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default{
  data() {
      return {
          loading: true,
          menuCur: 0
      };
  },
  computed: {
    ...mapState({
      'menuData': state => state.header.list
    })
  },
  created () {
    this.getTableData().then((rs) => {
        this.loading = false;
    }).catch((err) => {
        console.log(err);
    });
  },
  methods: {
    ...mapActions('header', {
      'getTableData': 'getMenu'
    }),
    changeMenuCur($event) {
        this.menuCur = $event.target.id;
    }
  }
};
</script>
<style lang="scss" scoped>
.head{
    background: #f8f8f8;
    height: 90px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 1px 3px rgba(100,100,100,0.1);
    padding:0 20px;

    h1{
        padding:20px 0 0 20px;
        width:120px;
        font-size:28px;
        font-weight: 400;
        border-right:1px solid #e8e8e8;
        img{
            border-radius: 50%;
        }
    }
    .head-bg{
        background-image:linear-gradient($bg1-color,$bg2-color,$bg1-color);
        width:120px;
        height:90px;
        span{
            display:block;
            padding-left:30px;
            width:100%;
            height:100%;
            position:relative;
            line-height:90px;
            color:#fff;
            &:after, &:before{
                content:"";
                width:15px;
                height:1px;
                background:#fff;
                position:absolute;
                top:45px;
                transition:all 0.5s;
            }
            &:after{
                right:17px;
                transform:rotate(45deg);
            }
            &:before{
                right:27px;
                transform:rotate(-45deg);
            }
        }
        &:hover {
            span{
                color:#ff0;
                &:after{
                    right:27px;background:#ff0;
                }
                &:before{
                    right:17px;background:#ff0;
                }
            }
            .popmenu{
                height:320px;left:-500px;
                .popmenu-dl{
                    margin: 10px 10px 0 10px;
                    line-height: 1.8;
                    dt{
                        width:60px;
                        color:#999;
                    }
                    dd{
                        a{
                            margin-right: 15px;
                            display:inline-block;
                        }
                    }
                }
                .flex-nav-tab{
                    width:121px;
                    border-left:1px solid #ddd;
                    li{
                        padding-left:20px;
                        border-bottom:1px solid #ddd;
                        &.cur{
                            color:#01c26f;
                            border-left:2px solid #01c26f;
                        }
                    }
                }
            }
        }
    }
    .head-login{
        &:hover .popmenu{
            height:200px;
        }
        em{
            position:absolute;
            right:15px;
            top:15px;
            width:20px;
            height:20px;
            z-index:5;
            background-color:$red;
            color:#fff;
            line-height:20px;
            text-align: center;
            font-size:10px;
            padding:0 5px;
            border-radius:50%;
            font-style:normal;
        }
        .popmenu{
            text-align: center;
        }
        .head-img{
            display:block;
            width:50px;
            height:50px;
            border-radius:50%;
            border:1px solid #ddd;
            overflow:hidden;
            position:absolute;
            left:50%;
            top:50%;
            margin:-25px 0 0 -25px;
            .ic-ren{
                color:#13d478;
                position:absolute;
                left:50%;
                top:50%;
                margin-left:-12px;
                width:24px;
                height:12px;
                border-left:solid 1px currentColor;
                border-right:solid 1px currentColor;
                border-top:solid 1px currentColor;
                border-bottom:solid 1px transparent;
                border-radius:12px 12px 0 0;
                &:before{
                    content:'';
                    position:absolute;
                    left:5px;
                    top:-12px;
                    width:12px;
                    height:12px;
                    border-radius:50%;
                    border:solid 1px currentColor;
                }
            }
        }
    }
    .head-nav{
        border-left:1px solid #01c26f;
        position:relative;
        cursor:pointer;
        min-width: 100px;
        .popmenu{
            height:0px;
            position:absolute;
            top:90px;
            left:-1px;
            right:-1px;
            background:#fff;
            border-radius:0 0 4px 4px;
            border:0px solid #ddd;
            overflow:hidden;
            line-height:40px;
            transition:all 0.5s;
            z-index:999;
            .exit{
                border-top:1px solid #ddd;
            }
        }
        &:hover .popmenu{
            border:1px solid #ddd;
            border-top:0;
            box-shadow: 0 2px 3px 1px rgba(100,100,100,0.1);
        }
        li:hover{
            background-color:#f1f1f1;
        }
    }
}
</style>
