<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 回答列表 -->
		<mescroll-body  ref="mescrollRef" @init="mescrollInit" @down="downCallback"  @up="upCallback" :down="downOption" :up="upOption"  >
			<view class="answersList">
				<view class="answersCardBox" v-for=" (item,index) in answersList" :key="index" >
					<view class="answersCardTop">
						<view class="answersAuthor">
							<image lazy-load :src="item.avatar?item.avatar:'/static/images/userImg.svg'" mode=""></image>
							<view class="userName">
								{{item.account_id}}
							</view>
						</view>
						<view class="answersDate">
							{{item.create_at.slice(0,10)}}
						</view>
					</view>
					<view class="answersCardContent">
						<mp-html ref="parse" v-if="answersList" style="overflow: hidden;" lazy-load :tag-style="style"
						 :html="item.content "></mp-html>
					</view>
					<view class="answersCardBottom">
						<view class="acbr">
							<view class="answersLike" @click="like(item,index) in answersList">
								<image src="/static/images/aLike.svg" v-if="item.option == 0 || item.option == 2" mode=""></image>
								<image src="/static/images/aLikeActive.svg" v-if="item.option == 1" mode=""></image>
								<text>{{item.like == 0 ? '赞同' : item.like}}</text> 
							</view>
							
							<view class="answersDisLike" @click="disLike(item,index) in answersList">
								<image src="/static/images/aDisLike.svg" v-if="item.option == 0 || item.option == 1" mode=""></image>
								<image src="/static/images/aDisLikeActive.svg" v-if="item.option == 2" mode=""></image>
								<text>{{item.dislike == 0 ? '踩' : item.dislike}}</text>
							</view>
						</view>
					</view>
					<view class="answersLine">
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		data() {
			return {
				question_id:'',
				answersList:{},
				style: {
					img: 'border-radius: 16rpx'
				},
				downOption:{
					use:false
				},
			};
		},
		mixins: [MescrollMixin],
		onLoad(question_id) {
			this.question_id = question_id.question_id
		},
		methods:{
			// 点赞
			like(e,index){
				var that = this
				var answer_id = e.$orig.answer_id
				this.HTTP.request({
					url: '/answers/like',
					data: {
						answer_id: answer_id,
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
						that.answersList[index].like++
					}
				});
			},
			// 点踩
			disLike(e,index){
				var answer_id = e.$orig.answer_id
				var that = this
				this.HTTP.request({
					url: '/answers/dislike',
					data: {
						answer_id: answer_id,
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
						that.answersList[index].disLike++
					}
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
				let pageSize = page.size; // 页长, 默认每页10条
				this.HTTP.request({
					url: '/answers/list?page=' + pageNum + '&count=' + pageSize,
					data: {
						question_id: this.question_id,
						
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
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						// let totalPage = res.data.data.list;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = res.data.data.total;
						// 接口返回的是否有下一页 (true/false)
						// let hasNext = res.data.data.list;
										
						//设置列表数据
						if (page.num == 1) this.answersList = []; //如果是第一页需手动置空列表
						this.answersList = this.answersList.concat(curPageData); //追加新数据
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

<style lang="scss" scoped>
	// 回复列表
	.answersList{
		margin: 0px 28rpx;
		.answersCardBox{
			margin-top: 20rpx;
			.answersCardTop{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;
				.answersAuthor{
					display: flex;
					align-items: center;
					image{
						width: 68rpx;
						height: 68rpx;
						border-radius: 50%;
					}
					.userName{
						height: 28rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #303133;
						line-height: 28rpx;
						margin-left: 16rpx;
					}
				}
				.answersDate{
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #C9CAD1;
					line-height: 24rpx;
	
				}
			}
			.answersCardContent{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
				line-height: 42rpx;
				margin-bottom: 20rpx;
			}
			.answersCardBottom{
					display:flex;
					justify-content: flex-end;
					margin-bottom: 20rpx;
					.acbr{
						
						display: flex;
						align-items: center;
						.answersLike{
							margin-right: 40rpx;
							display: flex;
							align-items: center;
							image{
								width: 44rpx;
								height: 44rpx;
							}
							text{
								width: 48rpx;
								font-size: 20rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #606266;
	
							}
						}
						.answersDisLike{
							display: flex;
							align-items: center;
							image{
								width: 44rpx;
								height: 44rpx;
							}
							text{
								// width: 48rpx;
								font-size: 20rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #606266;
							
							}
						}
					}
				
			}
			.answersLine{
				width: 100%;
				height: 2rpx;
				background: #EDEFF2;
	
			}
		}
		.moreAnswers{
			text-align: center;
			height: 28rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #0091FF;
			line-height: 28rpx;
			margin-top: 32rpx;
			margin-bottom: 80rpx;
		}
	}
</style>
