<template>
	<view>
		<!-- <mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback"> -->
			<waterfallTouring :list="dataList"></waterfallTouring>
		<!-- </mescroll-body> -->
	</view>
</template>

<script>
	import tcontent from '@/components/content/tcontent.vue'
	
	import waterfallTouring from '@/components/module/complete_waterfall_touring.vue';
	import allList from './data';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		data() {
			return {
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				dataList: [],
			}
		},
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components:{
			waterfallTouring,
			tcontent
		},
		methods:{
			/*下拉刷新的回调 */
			downCallback() {
				//联网加载数据
				this.loadData(1);
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网加载数据
				this.loadData(page.num);
			},
			loadData(pageNo) {
				// 模拟接口
				let pageSize = 10;
				let dataList = allList.slice((pageNo - 1) * pageSize, pageNo * pageSize);
				this.mescroll.endByPage(dataList.length, Math.ceil(allList.length / pageSize)); //必传参数(当前页的数据个数, 总页数)
				if (pageNo == 1) {
					this.dataList = dataList;
				} else {
					this.dataList = this.dataList.concat(dataList);
				}
			},
			onJumpWebview(url){
				// #ifdef H5
				window.open(url);
				// #endif
				// #ifndef H5
				this.$store.commit("setWebViewUrl", url);
				uni.navigateTo({
					url: '/pages/template/webView'
				});
				// #endif
			},
		}
	}
</script>

<style>
	@import '@/style/mixin.scss';
	
</style>
