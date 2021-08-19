<template>
	<view v-show="i === index" style="margin-top: 72%;">
		<mescroll-body :ref="'mescrollRef'+i" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="touring">
				<articleWaterfall :list="list"></articleWaterfall>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js';
	import articleWaterfall from '@/common/article-waterfall/article-waterfall.vue';
	
	export default {
		name:"topiclist-article-waterfall",
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		components: {
			articleWaterfall
		},
		props:{
			i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
				type: Number,
				default(){
					return 0
				}
			},
			topicID:{ 
				type: Number,
				default(){
					return 0
				}
			},
		},
		data() {
			return {
				list: [],
				downOption:{
					auto:false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~', // 提示, // 提示
						btnText: '去看看'
					}
				}
			}
		},
		watch: {
			topicID(newVal, old) {
				this.topicID = newVal;
				this.mescroll.resetUpScroll();
			}
		},
		methods: {
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				// this.mescroll.endSuccess()
			
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			
			/*上拉加载的回调*/
			upCallback(page) {
				if (this.topicID == 0){
					this.mescroll.endSuccess()
					return
				}
				
				if (this.i != this.index){
					this.mescroll.endBySize(0,0)
					return
				}
				var that = this
				// mescroll.setPageSize(6)
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				let url = ''
				if(this.i == 0){
					url = '/topics/articles/recommend?page=' + pageNum + '&count=' + pageSize
				} else {
					url = '/topics/articles/latest?page=' + pageNum + '&count=' + pageSize
				}
				this.HTTP.request({
					url: url,
					data: {
						topic_id:this.topicID,
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						if (!res.data.data.list || res.data.data.list.length == 0){
							return
						}
						// 接口返回的当前页数据列表 (数组)
						if(res.data.data != null){
							let curPageData = res.data.data.list;
							curPageData.forEach((item1, index1) => {
								if (item1.cover_height > 0){
									item1.height = 340*item1.cover_height/item1.cover_width+'rpx'
								} else{
									item1.height = '220rpx'
								}
								item1.avatar = this.Utils.addImageProcess(item1.avatar, false, 80)
								item1.image = this.Utils.addImageProcess(item1.image, false, 40)
							})
							// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
							let curPageLen = curPageData.length;
							// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
							// let totalPage = res.data.data.list;
							// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
							let totalSize = res.data.data.total;
							// 接口返回的是否有下一页 (true/false)
							// let hasNext = res.data.data.list;
											
							//设置列表数据
							
							if (page.num == 1) this.list = []; //如果是第一页需手动置空列表
							this.list = this.list.concat(curPageData); //追加新数据	
							console.log('topicArticleList', this.list)
							
							// 请求成功,隐藏加载状态
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							// this.mescroll.endByPage(curPageLen, totalPage);
											
							//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
							this.mescroll.endBySize(curPageLen, totalSize);
											
							//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
							//this.mescroll.endSuccess(curPageLen, hasNext);
											
							//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
							//如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
							//如果传了hasNext,则翻到第二页即可显示无更多数据.
							//this.mescroll.endSuccess(curPageLen);
											
							// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
							// 建议使用setTimeout,因为this.$nextTick某些情况某些机型不触发
						}
						
					},
					fail: () => {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr();
					}
				});
				
			
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			}
		}
	}
</script>

<style lang="scss" scoped>
// 瀑布流
.touring{
	width: 750rpx;
	background: #f8f8f8;
	margin-top: 24rpx;
	min-height: 1470rpx;
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;
	padding: 0 21rpx 0 21rpx;
}

</style>
