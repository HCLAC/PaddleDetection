<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
								<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
							<!-- #endif -->
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">我的回答</view>
			</uni-nav-bar>
		</view>
		<!-- 问答列表 -->
		<view class="answersList">
			<view class="myCollection" :class="isFixed ? 'fixTabs' : 'noFix'" id="selectcard" >
				<!-- <view class="favBox" @click="change" >
					<view class="favBT">
						<view :class="tabCurrent == 0 ?'favText' : 'favText1 '" >
							发布的问题
						</view>
						<view class="favLine" v-if="tabCurrent == 0">
						</view>
					</view>
					
				</view> -->
				<view class="likeBox" @click="change1">
					<view class="likeBT">
						<view :class="tabCurrent == 1 ?'favText' : 'favText1 '">
							关注的问题
						</view>
						<view class="likeLine" v-if="tabCurrent == 1">
						</view>
					</view>
					
				</view>
				<view class="likeBox" @click="change2">
					<view class="likeBT">
						<view :class="tabCurrent == 2 ?'favText' : 'favText1 '">
							回答的问题
						</view>
						<view class="likeLine" v-if="tabCurrent == 2">
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<mescroll-body  ref="mescrollRef" @init="mescrollInit" @down="downCallback"  @up="upCallback" :down="downOption" :up="upOption"  >
			<!-- 用户发布的回答 -->
			<!-- <view class="selectedList" v-if="tabCurrent == 0">
				<view class="card" v-for="(item,index) in selectedList" :key="index" @click="toQuestionsDetail(item)">
					<view class="avatar">
						<image :src="item.avatar" mode="" v-if="item.avatar"></image>
						<image src="../../static/images/userImg.svg" mode="" v-if="!item.avatar"></image>
					</view>
					
					<view class="cradR">
						<view class="authorBox">
							<text class="authorName">{{item.account_name}}</text>
							<text class="date">{{item.create_at.slice(0,10)}}</text>
						</view>
						<view class="content">
							<u-parse ref="parse"  style="overflow: hidden;" lazy-load
							 :html="item.content"></u-parse>
						</view>
						<view class="lookAnswers">
							{{item.reply_count>10000?((item.reply_count-(item.reply_count%1000))/10000+'w'):item.reply_count}}
							<view class="answers">
								回答
							</view>
						</view>
					</view>
				</view>
			</view> -->
			<!-- 用户关注的回答 -->
			<view class="newestList" v-if="tabCurrent == 1">
				<view class="card" v-for="(item,index) in newestList" :key="index" @click="toQuestionsDetail(item)">
					<view class="avatar">
						<image :src="item.avatar" mode="" v-if="item.avatar"></image>
						<image src="../../static/images/userImg.svg" mode="" v-if="!item.avatar"></image>
					</view>
					
					<view class="cradR">
						<view class="authorBox">
							<text class="authorName">{{item.account_name}}</text>
							<text class="date">{{item.create_at.slice(0,10)}}</text>
						</view>
						<view class="content">
							<!-- <u-parse ref="parse"  style="overflow: hidden;" lazy-load
							 :html="item.content"></u-parse> -->
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
			<!-- 用户回复的回答 -->
			<view class="newestList" v-if="tabCurrent == 2">
				<view class="card" v-for="(item,index) in answersList" :key="index" @click="toQuestionsDetail(item)">
					<view class="avatar">
						<image :src="item.avatar" mode="" v-if="item.avatar"></image>
						<image src="../../static/images/userImg.svg" mode="" v-if="!item.avatar"></image>
					</view>
					
					<view class="cradR">
						<view class="authorBox">
							<text class="authorName">{{item.account_name}}</text>
							<text class="date">{{item.create_at.slice(0,10)}}</text>
						</view>
						<view class="content">
							<!-- <u-parse ref="parse"  style="overflow: hidden;" lazy-load
							 :html="item.content"></u-parse> -->
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
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		data() {
			return {
				tabCurrent: 1,
				downOption:{
					use:false
				},
				selectedList:{},
				newestList:{},
				answersList:{},
				isFixed:false
			};
		},
		mixins: [MescrollMixin],
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#selectcard').boundingClientRect(data => {
			console.log("得到布局位置信息" + JSON.stringify(data));
			console.log("节点离页面顶部的距离为" + data.top);
			 
			if(data.top == 0 ){
				this.cardheight = 200
			}else{
				this.cardheight = data.top
			}
			}).exec();
		},
		onPageScroll(e) {
			if (e.scrollTop >  this.cardheight) {
				this.isFixed = true;
			} else {
				this.isFixed = false;
			}
		},
		onLoad() {
			// this.getAskQuestion()
			this.getFollowQuestion()
			this.getAnsersQuestion()
		},
		methods:{
			// 用户发布的问答
			// getAskQuestion(){
			// 	uni.request({
			// 		url: this.globalUrl + '/user/askquestion/list',
			// 		data: {
			// 			page:1,
			// 			count:10
			// 		},
			// 		header: {
			// 			Authorization: uni.getStorageSync('Authorization')
			// 		},
			// 		success: res => {
			// 			console.log('发布的问答',res)
			// 			this.selectedList = res.data.data.list
						
			// 		}
			// 	});
			// },
			// 用户关注的问答
			getFollowQuestion(){
				uni.request({
					url: this.globalUrl + '/user/followquestion/list',
					data: {
						page:1,
						count:10
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log('关注的问答',res)
						this.newestList = res.data.data.list
						
					}
				});
			},
			// 用户回复的问答
			getAnsersQuestion(){
				uni.request({
					url: this.globalUrl + '/user/answerquestion/list',
					data: {
						page:1,
						count:10
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log('回复的问答',res)
						this.answersList = res.data.data.list
						
					}
				});
			},
			
			// 切换
			change(){
				this.tabCurrent = 0
				this.keyword = ''
				this.mescroll.resetUpScroll()
				this.mescroll.scrollTo(0)
			},
			change1(){
				this.tabCurrent = 1
				this.keyword = ''
				this.mescroll.resetUpScroll()
				this.mescroll.scrollTo(0)
			},
			change2(){
				this.tabCurrent = 2
				this.keyword = ''
				this.mescroll.resetUpScroll()
				this.mescroll.scrollTo(0)
			},
			// 跳转问题详情
			toQuestionsDetail(item){
				console.log(item)
				var question_id = item.question_id
				uni.navigateTo({
					url: '/pages/questionsDetail/questionsDetail?question_id=' + question_id
				});
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
					url: '/pagesA/index/index'
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
				if(this.tabCurrent == 0){
					uni.request({
						url: this.globalUrl+ '/user/askquestion/list?page=' + pageNum + '&count=' + pageSize,
						
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},
						success: data => {
							console.log('data', data);
							// 接口返回的当前页数据列表 (数组)
							if(data.data.data != null){
								let curPageData = data.data.data.list;
								console.log('curPageData', curPageData);
								// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
								let curPageLen = curPageData.length;
								console.log('curPageLen', curPageLen);
								// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
								// let totalPage = data.data.data.list;
								// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
								let totalSize = data.data.data.total;
								console.log('totalSize', totalSize);
								// 接口返回的是否有下一页 (true/false)
								// let hasNext = data.data.data.list;
												
								//设置列表数据
								if (page.num == 1) this.selectedList = []; //如果是第一页需手动置空列表
								this.selectedList = this.selectedList.concat(curPageData); //追加新数据
								console.log('selectedList', this.selectedList);
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
				}
				if(this.tabCurrent == 1){
					uni.request({
						url: this.globalUrl+ '/user/followquestion/list?page=' + pageNum + '&count=' + pageSize,
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
							// let totalPage = data.data.data.list;
							// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
							let totalSize = data.data.data.total;
							console.log('totalSize', totalSize);
							// 接口返回的是否有下一页 (true/false)
							// let hasNext = data.data.data.list;
					
							//设置列表数据
							if (page.num == 1) this.newestList = []; //如果是第一页需手动置空列表
							this.newestList = this.newestList.concat(curPageData); //追加新数据
							console.log('newestList', this.newestList);
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
				if(this.tabCurrent == 2){
					uni.request({
						url: this.globalUrl+ '/user/answerquestion/list?page=' + pageNum + '&count=' + pageSize,
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
							// let totalPage = data.data.data.list;
							// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
							let totalSize = data.data.data.total;
							console.log('totalSize', totalSize);
							// 接口返回的是否有下一页 (true/false)
							// let hasNext = data.data.data.list;
					
							//设置列表数据
							if (page.num == 1) this.answersList = []; //如果是第一页需手动置空列表
							this.answersList = this.answersList.concat(curPageData); //追加新数据
							console.log('answersList', this.answersList);
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
			
				
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
		}
	}
</script>

<style lang="scss" scoped>
// 自定义导航栏样式
.example-body {
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	font-size: 14px;
	background-color: #aa557f;
}
.example-body {
	flex-direction: column;
	padding: 15px;
	background-color: #ffffff;
}
.example-body {
	padding: 0;
}
.navBar{
	display: flex;
}
.slotleft{
	display: flex;
}
.fanhui{
	width: 40rpx;
	height: 40rpx;
	margin-left: 42rpx;
	margin-right: 20rpx;
}
.fhsy{
	width: 40rpx;
	height: 40rpx;
}
/* #ifdef  MP-BAIDU*/
.fhsy {
	margin-left: 100rpx;
}
/*  #endif  */
.slottitle{
	margin-left: 162rpx;
	font-size: 38rpx;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:600;
	color:rgba(0,0,0,1);
}
.button-v-line{
	width: 1px;
	height: 18px;
	background-color: #2f2f2f;
	margin: 0 8px;
}
// 问答列表
.answersList{
	
}
.myCollection {
	border-radius: 12px 12px 0rpx 0rpx;
	background-color: #fff;
	color: #303133;
	width: 100%;
	// font-size: 40rpx;
	// font-weight: 500;
	// padding-left: 32rpx;
	padding-top: 28rpx;
	padding-left: 40rpx;
	padding-right: 40rpx;
	// padding-bottom: 22rpx;
	display: flex;
	justify-content: space-between;
	border-bottom: 20rpx solid #F8F8F8;
}
.favBox{
	display: flex;
	height: 60rpx;
	// margin-left: 28rpx;
}
.favBT{
	margin-right: 8rpx;
	text-align: center;
}
.favText{
	// width: 64px;
	height: 32rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 32rpx;

	
}
.favText1{
	// width: 52px;
	height: 26rpx;
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #909399;
	line-height: 26rpx;

	margin-top: 8rpx;
}
.favLine{
	width: 160rpx;
	height: 12rpx;
	background: #FFE512;
	border-radius: 12rpx;

	margin-top: -6rpx;
}
.likeBox{
	display: flex;
	margin-left: 56rpx;
	height: 60rpx;
}
.likeBT{
	margin-right: 8rpx;
	text-align: center;
}
.likeText{
	
}
.likeLine{
	width: 160rpx;
	height: 12rpx;
	background: #FFE512;
	border-radius: 12rpx;
	
	margin-top: -6rpx;
}
.fixTabs {
	position: fixed;
	top: 126rpx;
	z-index: 2;
	height: 108rpx;
	padding-top: 58rpx;
	display: flex;
}
.noFix {
	z-index: 1000;
}

// 问答列表
.selectedList{
	.card{
		margin: 28rpx 28rpx;
		margin-bottom: 0rpx;
		padding-bottom: 40rpx;
		border-bottom: 1rpx solid #edeff2;
		display: flex;
		.avatar{
			image{
				width: 68rpx;
				height: 68rpx;
				border-radius: 50%;
			}
			
		}
		.cradR{
			// width: 610rpx;
			margin-left: 16rpx;
			.authorBox{
				display: flex;
				align-items: center;
				justify-content:space-between;
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
		
			}
			.lookAnswers{
				margin-top: 20rpx;
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
.newestList{
	.card{
		margin: 28rpx 28rpx;
		margin-bottom: 0rpx;
		padding-bottom: 40rpx;
		border-bottom: 1rpx solid #edeff2;
		display: flex;
		.avatar{
			image{
				width: 68rpx;
				height: 68rpx;
				border-radius: 50%;
			}
			
		}
		.cradR{
			// width: 610rpx;
			margin-left: 16rpx;
			.authorBox{
				display: flex;
				align-items: center;
				justify-content:space-between;
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
		
			}
			.lookAnswers{
				margin-top: 20rpx;
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
