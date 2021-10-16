<template>
	<view v-show="i === index" >
		<mescroll-body :ref="'mescrollRef'+i" @init="mescrollInit" :top="top" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="answerList">
				<view class="card" v-for="(item,index) in list" :key="index" @click="toQuestionsDetail(item)">
					<view class="avatar">
						<image lazy-load :src="item.avatar?item.avatar:'/static/images/userImg.svg'"></image>
					</view>
					
					<view class="cradR">
						<view class="authorBox">
							<text class="authorName">{{item.account_name}}</text>
							<text class="date">{{item.create_at.slice(0,10)}}</text>
						</view>
						<view class="content">
							 {{item.title}}
						</view>
						<view class="lookAnswers">
							{{item.reply_count>10000?((item.reply_count-(item.reply_count%1000))/10000+'w'):item.reply_count}}
							<view class="answers">
								回答
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	import MescrollMoreItemMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js';
	
	export default {
		name:"mine-answer-list",
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		components: {
		},
		props:{
			i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
				type: Number,
				default(){
					return 0
				}
			},
			top: {
				type: Number,
				default(){
					return 64
				}
			}
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
					noMoreSize: 10, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
					  use : true ,
					  icon : null ,
					  tip : "暂无相关数据",
					  btnText : "",
					  fixed: false,
					  top: "100rpx",
					  zIndex: 99
					}
				}
			}
		},
		watch: {
		},
		methods: {
			// 跳转问题详情
			toQuestionsDetail(item){
				var question_id = item.question_id
				uni.navigateTo({
					url: '/pages_questions/questionsDetail/questionsDetail?question_id=' + question_id
				});
			},
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
					url = '/user/followquestion/list?page=' + pageNum + '&count=' + pageSize
				} else if(this.i == 1){
					url = '/user/answerquestion/list?page=' + pageNum + '&count=' + pageSize
				} else {
					url = '/user/askquestion/list?page=' + pageNum + '&count=' + pageSize
				}
				this.HTTP.request({
					url: url,
					success: res => {
						// 接口返回的当前页数据列表 (数组)
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						// 接口返回的当前页数据列表 (数组)
						if (!res.data.data || !res.data.data.list || res.data.data.list.length == 0){
							that.list = [];
							that.mescroll.endBySize(0, 0);
							return
						}
						let curPageData = res.data.data.list;
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
					},
					fail: () => {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr();
					}
				});
			}
		}
	}
</script>

<style lang="scss">

// 问答列表
.answerList{
	margin-top: 90rpx;
	.card{
		margin: 28rpx 28rpx;
		margin-bottom: 0rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #edeff2;
		display: flex;
		.avatar{
			border-radius: 50%;
			background-image: url('/static/images/userImg.svg');
			background-repeat: no-repeat;
			// background-position: 50%;
			// border-radius: 50%;
			background-size:68rpx 68rpx;
			// overflow: hidden;
			image{
				width: 68rpx;
				height: 68rpx;
				border-radius: 50%;
			}
			
		}
		.cradR{
			width: 100%;
			padding-left: 16rpx;
			.authorBox{
				display: flex;
				align-items: center;
				justify-content:space-between;
				width: 100%;
				.authorName{
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909399;
					line-height: 40rpx;
		
				}
				.date{
					height: 40rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #C9CAD1;
					line-height: 40rpx;
		
				}
			}
			.content{
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #303133;
				line-height: 44rpx;
				margin-top: 8rpx;
				text-align: justify;
			}
			.lookAnswers{
				margin-top: 20rpx;
				width: 100%;
				display: flex;
				justify-content: flex-end;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #606266;
				line-height: 34rpx;
		
				.answers{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #606266;
					line-height: 34rpx;
		
				}
			}
		}
	}
}

</style>
