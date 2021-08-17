<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar"  >
			<uni-nav-bar :fixed="true" :status-bar="true" :border="true" >
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="replyList">
				<view class="replyContent">
					<view class="reply" v-for="(item,index) in commentsList" :key="index">
						<view class="replyTop">
							<image class="userImg" lazy-load :src="item.avatar?item.avatar:'/static/images/userImg.svg'" mode=""></image>
							<view class="" style="display: flex;align-items: center; justify-content: space-between;width: 626rpx;">
								<view class="" style="display: flex;align-items: center;">
									<view class="userName">{{item.account_name}}</view>
									<view class="replyTime">
										{{item.create_at.slice(0,10)}}
									</view>
								</view>
								<view class="">
									<image class="replyLike" :src="item.like == 1?'/static/images/attLikeA.svg':'/static/images/attLike.svg'" mode="" @click="replyLike(item, index)"></image>
									<image class="report" src="/static/images/report.svg" mode="" @click="toReport(item)"></image>
								</view>
							</view>
						</view>
						<view class="replyBottom">
							{{item.content}}
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				article_id:'',
				commentsList:[],
				downOption:{
					use: false,
					auto:false
				}
			};
		},
		onLoad(options) {
			this.article_id = options.article_id
		},
		methods:{
			// 评论点赞
			replyLike(item, index){
				let token = uni.getStorageSync('Authorization')
				if(!token){
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
				}
				this.HTTP.request({
					url: '/comments/likes',
					data: {
						id: item.id,
						like: item.like == 0 ? 1 : 0
					},
					method: 'POST',
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
						this.commentsList[index].like = item.like == 0 ? 1 : 0
					}
				});
			},
			// 举报
			toReport(e) {
				let token = uni.getStorageSync('Authorization')
				if(!token){
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
					return
				}
				uni.navigateTo({
					url:'/pages_article/report/report?id=' + e.id
				})
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
				var that = this
				// mescroll.setPageSize(6)
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页6条
				this.HTTP.request({
					url: '/comments/list?page=' + pageNum + '&count=' + pageSize,
					data:{
						article_id:that.article_id
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
						let curPageData = res.data.data.list;
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = res.data.data.total;
				
						//设置列表数据
						if (page.num == 1) this.commentsList = []; //如果是第一页需手动置空列表
						this.commentsList = this.commentsList.concat(curPageData); //追加新数据
						console.log('commentsList', this.commentsList);
						// 请求成功,隐藏加载状态
						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						// this.mescroll.endByPage(curPageLen, totalPage);
				
						//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
						this.mescroll.endBySize(curPageLen, totalSize);
				
						//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
						// this.mescroll.endSuccess(curPageLen, hasNext);
				
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

<style lang="scss" scoped>
	
.replyList{
	.replyContent{
		margin: 0 28rpx;
		.reply{
			margin-top: 32rpx;
			border-bottom: 0.5px solid #edeff2;
			.replyTop{
				display: flex;
				align-items: center;
				.userImg{
					width: 68rpx;
					height: 68rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}
				.userName{
					height: 28rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #303133;
					line-height: 28rpx;
				}
				.replyTime{
					margin-left: 16rpx;
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #C9CAD1;
					line-height: 24rpx;
				}
				.replyLike{
					width: 44rpx;
					height: 44rpx;
				}
				.report{
					margin-left: 28rpx;
					width: 44rpx;
					height: 44rpx;
				}
			}
			.replyBottom{
				// height: 42rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
				line-height: 42rpx;
				margin-left: 84rpx;
				margin-bottom: 32rpx;
			}
		}
	}
}
</style>
