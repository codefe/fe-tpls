import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  saveScrollPosition: true, //在启用html5 history模式的时候生效
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savePosition) {// 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
    if (savePosition) {
    	return savePosition;
    } else {
      	return { x: 0, y: 0 }
    }
  },
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/Home.vue')
		},
		{
			path: '/list/:id',
			name: 'list',
			component: () => import('@/views/List.vue')
		},
		{
			path: '/article/:id',
			name: 'article',
			component: () => import('@/views/Article.vue')
		},
		{
			path: '/items/:id',
			name: 'items',
			component: () => import('@/views/Items.vue')
		}
	]
})
