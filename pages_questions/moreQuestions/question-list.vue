<template>
	<view v-show="i === index" >
		<mescroll-body :ref="'mescrollRef'+i" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="questionList">
				<view class="jxbox" v-if="type == 'selected'" @click="toDetail">
					<view class="one">
						{{chiose.title}}
					</view>
					<view class="two">
						<image class="tx" :src="chiose.avatar" mode=""></image>
						<view class="xqbox">
							<view class="name">
								{{chiose.account_name}}
							</view>
							<view class="zsbox">
								<image class="zs" src="@/static/images/zs.png" mode=""></image>
								<view class="zstext">精选</view>
							</view>
						</view>
					</view>
					<view class="three">
						{{chiose.answer}} 
					</view>
				</view>
				<view class="card" v-for="(item,index) in list" :key="index" @click="toQuestionsDetail(item)">
					<view class="btn" v-if="index == 2 && type == 'selected'" @click.stop="toConsultation">
						<image src="@/static/images/gg1.png" mode=""></image>
					</view>
					<view class="btn" v-if="index == 2 && type == 'newest'" @click.stop="toConsultation">
						<image src="@/static/images/gg2.png" mode=""></image>
					</view>
					<view class="title">
						{{item.title}}
					</view>
					<view class="content">
						<mp-html ref="parse" container-style="contentText" lazy-load :tag-style="style"
						 :html="item.content"></mp-html>
					</view>
					<view class="authorBox">
						<view class="author">
							<image lazy-load :src="item.avatar?item.avatar:'/static/images/userImg.svg'"></image>
							<text>{{item.account_name}}</text>
						</view>
						<view class="lookAnswers">
							<view class="look">
								{{item.read}}人看过
							</view>
							<view class="answers">
								{{item.reply_count}}回答
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
			keyword:{ 
				type: String,
				default(){
					return ''
				}
			},
		},
		data() {
			return {
				type:'',
				list: [],
				style: {
					img: 'border-radius: 16rpx'
				},
				downOption:{
					auto:false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				chiose:{},
				upOption:{
					auto:false, // 不自动加载
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
			keyword(newVal, old) {
				this.keyword = newVal;
				this.mescroll.resetUpScroll();
			}
		},
		methods: {
			toConsultation(){
				this.HTTP.request({
					url: '/bulter/consulting',
					method: 'POST',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						var info = res.data.data
						console.log(info, '管家列表')
						if(info.history.length > 0){
							uni.navigateTo({
								url:'/pages_im/chatroom/chatroom?search_id=' + info.search_id,
							})
						}else{
							uni.navigateTo({
								url:'/pages_im/problem/problem?bulter_id=' + info.bulter_id,
							})
						}
					}
				});
			},
			//跳转精选问答详情页
			toDetail(){
				var question_id = this.chiose.question_id
				uni.navigateTo({
					url: '/pages_questions/questionsDetail/questionsDetail?question_id=' + question_id
				});
			},
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
				
				let t = 'newest'
				if(this.i == 0){
					t ='selected'
				}
				this.type = t
				this.HTTP.request({
					url: '/questions/seemore?page=' + pageNum + '&count=' + pageSize,
					data: {
						state_id: this.state_id,
						city_id: this.city_id,
						type: t,
						title: this.keyword
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						if (!res.data.data || !res.data.data.list || res.data.data.list.length == 0){
							that.list = [];
							that.mescroll.endBySize(0, 0);
							return
						}
						this.chiose = res.data.data.chiose
						console.log(this.chiose,'问答详情')
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
				
				
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			}
		}
	}
</script>

<style lang="scss" scoped>
.jxbox{
	width: 750rpx;
	background-image: url(@/static/images/wdbj.png);
	background-repeat:no-repeat;
	background-size:100% 100%;
	height: 404rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	.one{
		width: 480rpx;
		min-height: 88rpx;
		margin-top: 30rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.two{
		margin-top: 30rpx;
		height: 68rpx;
		display: flex;
		align-items: center;
		.tx{
			width: 68rpx;
			height: 68rpx;
			border-radius: 50%;
			overflow: hidden;
		}
		.xqbox{
			margin-left: 8rpx;			
			.name{
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #303133;
			}
			.zsbox{
				display: flex;
				align-items: center;
				.zs{
					width: 32rpx;
					height: 32rpx;
				}
				.zstext{
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #606266;
				}
			}
		}
	}
	.three{
		width: 646rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 3;
		text-align:justify;
		text-justify:inter-ideograph;
		display: flex;
		align-items: center;
		margin-top: 30rpx;
	}
}
// 问答列表

// 问答列表
.questionList{
	.card{
		margin: 28rpx 28rpx;
		margin-bottom: 0rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #edeff2;
		.btn{
			width: 694rpx;
			height: 240rpx;
			border-radius: 12rpx;
			margin-bottom: 28rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.title{
			font-size: 34rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			line-height: 48rpx;
	
		}
		.content{
			font-size: 30rpx;
			font-family: PingFangSC-Light, PingFang SC;
			font-weight: 300;
			color: #606266;
			line-height: 42rpx;
			margin-top: 12rpx;
			.contentText{
				overflow: hidden;
				text-align: justify;
			}
		}
		.authorBox{
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.author{
				display: flex;
				align-items: center;
				image{
					width: 48rpx;
					height: 48rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}
				text{
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #303133;
					line-height: 34rpx;
	
				}
			}
			.lookAnswers{
				display: flex;
				align-items: center;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
				line-height: 34rpx;
				.look{
					margin-right: 16rpx;
				}
			}
		}

	}
}

</style>
