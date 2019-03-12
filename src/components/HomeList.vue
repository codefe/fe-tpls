<template>
    <div class="home-list">
        <dl class="flex flex-start row" v-for="(item,index) of filterData" :key="index">
            <dt>{{item.name}}</dt>
            <dd v-for="(rs,i) of item.items" :key="i">
                <router-link :class="{ano: !rs.url}" :to="'/list/'+rs.url">
					<figure class="flex column">
						<p class="zoomImg" :style="'background-image:url('+rs.img+')'"></p>
						<figcaption>{{rs.name}}</figcaption>
					</figure>
				</router-link>
            </dd>
        </dl>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters('header', {
			'filterData': 'filterData'
		})
	}
}
</script>

<style lang="scss" scoped>
.home-list{
		dl{
			margin-bottom: 30px;
		}
		dt{
        width: 100%;
        padding: 0 20px;
        height: 45px;
        line-height: 45px;
				border-bottom: 1px solid #eee;
				color: $bg1-color;
				&:before{
					content: '»';
					margin-right:5px;
				}
    }
    dd{
				margin-bottom: 20px;
				figure{
					height: 120px;
					width: 100%;
					padding:0 20px;
					margin: 20px 0;
					p{
						border-radius: 5px;
					}
					figcaption{
						margin-top: 10px;
					}
				}
		}
		@media screen and (min-width: 1200px) {
        dd{
            width: 33.33333333%;
            &:nth-child(3n){
                border-right:0;
            }
        }
    }
    @media screen and (min-width: 1600px) {
        dd{
            width: 25%;
            &:nth-child(4n){
                border-right:0;
            }
        }
    }
    @media screen and (max-width: 1200px) {
        dd{
            width: 50%;
            &:nth-child(2n){
                border-right:0;
            }
        }
    }
}
</style>
