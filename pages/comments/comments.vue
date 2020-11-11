<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body"  >
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" :border="true" >
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<u-loading :show="show" class="loading"></u-loading>
		<mescroll-uni v-if='!show' ref="mescrollRef"  @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="replyList">
				<view class="replyContent">
					<view class="reply" v-for="(item,index) in commentsList" :key="index">
						<view class="replyTop">
							<image class="userImg" v-if="!item.avatar" src="../../static/images/userImg.svg" mode=""></image>
							<image class="userImg" v-if="item.avatar" :src="item.avatar" mode=""></image>
							<view class="" style="display: flex;align-items: center; justify-content: space-between;width: 626rpx;">
								<view class="" style="display: flex;align-items: center;">
									<view class="userName">{{item.account_name}}</view>
									<view class="replyTime">
										{{item.create_at}}
									</view>
								</view>
								<view class="">
									<image class="replyLike" src="../../static/images/attLike.svg" v-if="item.like == 0" @click="replyLike(item)"></image>
									<image class="replyLike" src="../../static/images/attLikeA.svg" mode="" v-if="item.like == 1" @click="replyLike(item)"></image>
									<image class="report" src="../../static/images/report.svg" mode="" @click="toReport(item)"></image>
								</view>
								
							</view>
							
						</view>
						<view class="replyBottom">
							{{item.content}}
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
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
					use: false
				},
				show:false
			};
		},
		onLoad(e) {
			console.log('===',e)
			this.article_id = e.article_id
			this.getComments()
		},
		methods:{
			// 获取评论列表
			getComments(){
				uni.request({
					url: this.globalUrl + '/comments/list',
					data: {
						article_id: this.article_id,
						page:1,
						count:8
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						this.commentsList = res.data.data.list
						console.log('comments',res)
					}
				});
			},
			// 评论点赞
			replyLike(e){
				uni.request({
					url: this.globalUrl + '/comments/likes',
					data: {
						id: e.id,
						like:e.like == 0 ? 1 : 0
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log('点赞',res)
						if(res.data.code == 10501){
							uni.navigateTo({
								url: '../login/login'
							});
						}else{
							this.show = true
							setTimeout(()=>{
								this.getComments()
								this.show = false
							},30)
							
							
						}
					}
				});
			},
			// 举报
			toReport(e) {
				let token = uni.getStorageSync('Authorization')
				// console.log('tttt',token)
				if(!token){
					uni.navigateTo({
						url: '../login/login'
					});
				}else{
					uni.navigateTo({
						url:'../report/report?id=' + e.id
					})
				}
			},
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 返回首页
			home() {
				uni.switchTab({
					url: '/pages/index/index'
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
				var that = this
				// mescroll.setPageSize(6)
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页6条
				uni.request({
					url: this.globalUrl + '/comments/list?page=' + pageNum + '&count=' + pageSize,
					data:{
						article_id:that.article_id
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: data => {
						console.log('data', data);
						// 接口返回的当前页数据列表 (数组)
						let curPageData = data.data.data.list;
						console.log('curPageData', curPageData);
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						console.log('curPageLen', curPageLen);
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = data.data.data.total / pageSize;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = data.data.data.total;
						console.log('totalSize', totalSize);
						// 接口返回的是否有下一页 (true/false)
						let hasNext = data.data.data.list;
				
						//设置列表数据
						if (page.num == 1) this.commentsList = []; //如果是第一页需手动置空列表
						this.commentsList = this.commentsList.concat(curPageData); //追加新数据
						console.log('commentsList', this.commentsList);
						// 请求成功,隐藏加载状态
						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						this.mescroll.endByPage(curPageLen, totalPage);
				
						//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
						// this.mescroll.endBySize(curPageLen, totalSize);
				
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
				
			},
				
				
			// 此处仍可以继续写其他接口请求...
			// 调用其他方法...
		}
	}
</script>

<style lang="scss" scoped>
/* 自定义导航栏样式 */
.example-body {
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	font-size: 14px;
	background-color: #aa557f;
	z-index: 9999;
}

.example-body {
	flex-direction: column;
	padding: 15px;
	background-color: #ffffff;
}

.example-body {
	padding: 0;
}

.navBar {
	display: flex;
	z-index: 9999;
}

.slotleft {
	display: flex;
	align-items: center;
}

.fanhui {
	width: 40rpx;
	height: 40rpx;
	margin-left: 40rpx;
	margin-right: 20rpx;
}

.fhsy {
	width: 40rpx;
	height: 40rpx;
}

.slottitle {
	margin-left: 186rpx;
	font-size: 38rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 600;
	color: rgba(0, 0, 0, 1);
}

.button-v-line {
	width: 1px;
	height: 18px;
	background-color: #2f2f2f;
	margin: 0 8px;
}

.loading{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
}

.replyList{
	margin-top: 208rpx;
	.replyContent{
		margin: 0 28rpx;
		.myReply{
			display: flex;
			align-items: center;
			margin-top: 40rpx;
			.userImg{
				width: 68rpx;
				height: 68rpx;
				border-radius: 50%;
				margin-right: 16rpx;
			}
			.replyInput{
				width: 598rpx;
				height: 68rpx;
				background: #F8F8F8;
				border-radius: 17px;
				padding-left: 32rpx;
			}
		}
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
