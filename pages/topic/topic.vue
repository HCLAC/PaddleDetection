<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body"  >
			<uni-nav-bar :fixed="true" :status-bar="true" class="navbar" :border="true" >
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		
		<!-- 热门话题 -->
		<view class="hotTopic">
			<view class="hotTopicTop">
				<view class="topTitle">
					热门话题
				</view>
				<view class="topLine"></view>
			</view>
			
			<view class="topicRankBox">
				<view class="topicTips" @click="toTopicList(item.topic_id)" v-for="(item,index) in hotTopic " :key="index" >
					<!-- <image class="rankImg" src="../../static/images/topic-1.png" mode=""></image> -->
					<image class="rankImg" :src="`../../static/images/topic-${index+1}.png`" mode=""></image>
					
					<view class="tipsText" >
						{{item.name}}
					</view>
				</view>
				
			</view>
		</view>
		
		<mescroll-body class="mescroll" ref="mescrollRef" style="margin-bottom: 300rpx;" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
		<!-- 推荐 -->
			<view class="recommended">
				<view class="recommendedTop">
					<view class="recommendedTitle">
						推荐
					</view>
					<view class="recommendedTopLine"></view>
				</view>
				<view class="topicList" v-for="(item,index) in recommList" :key="index"  >
					<view class="topicTitle">
						<view class="titleLeft">
							<image class="titleImg" src="../../static/images/topicIcon.svg" mode=""></image>
							<view class="titleText">
								{{item.name}}
							</view>
						</view>
						<view class="titleRight" @click="toTopicList(item.topics_id)">
							<view class="number">
								{{item.total>10000?((item.total-(item.total%1000))/10000+'w'):item.total}}
							</view>
							<view class="rightText">
								篇文章
							</view>
							<image class="moreRight" src="../../static/images/more-right.svg" mode=""></image>
						</view>
					</view>
					<view class="conttentBox">
						<view class="contentImgBox">
							<view class="contentImg" v-for="(item1,index) in item.list" :key="index" @click="onPageJump" :id="item1.article_id">
								<image class="attImg" :src="item1.image" mode="">
									<view class="videoIcon" v-if="item1.type == 4">
										<image class="playIcon"  src="../../static/images/playIcon.svg" mode=""></image>
									</view>
								</image>
								<view class="attText">{{ item1.title }}</view>
							</view>
							
						</view>
						<view class="line">
							
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
				current: 0,
				tablist: ['热门话题'],
				tablist1:['推荐'],
				tabCurrent: 0,
				siteHot:'',
				hotTopic:'',
				recommList:'',
				downOption:{
					use:false
				}
			};
		},
		onLoad() {
			this.getSquare()
			this.getRecomm()
		},
		methods:{
			
			// 热门话题
			getSquare() {
				uni.request({
					url: this.globalUrl + '/topics/hot',
					success: res => {
						console.log('热门话题', res);
						this.hotTopic = res.data.data;
					}
				})
			},
			getRecomm(){
				uni.request({
					url: this.globalUrl + '/topics/square_recommend',
					data:{
						page:1,
						count:3
					},
					success: res => {
						console.log('推荐话题', res);
						this.recommList = res.data.data.recomm_list
					}
				})
			},
			// 跳转话题列表页
			toTopicList(e){
				console.log('eeeeee',e)
				uni.navigateTo({
					url:'../topicList/topicList?id=' + e
				})
			},
			// 跳转文章详情
			onPageJump(e) {
				console.log(e);
				let id = e.currentTarget.id;
				// debugger
				// return
				uni.navigateTo({
					url: '/pages/contentdetail/contentdetail?article_id=' + id
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
					uni.request({
						url: this.globalUrl + '/topics/square_recommend?page=' + pageNum + '&count=' + pageSize,
						success: data => {
							console.log('data', data);
							// 接口返回的当前页数据列表 (数组)
							let curPageData = data.data.data.recomm_list;
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
							if (page.num == 1) this.recommList = []; //如果是第一页需手动置空列表
							this.recommList = this.recommList.concat(curPageData); //追加新数据
							console.log('recommList', this.recommList);
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
	margin-left: 42rpx;
	margin-right: 20rpx;
}

.fhsy {
	width: 40rpx;
	height: 40rpx;
}
/* #ifdef  MP-BAIDU*/
.fhsy {
	margin-left: 100rpx;
}
/*  #endif  */
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
// 热门话题
.hotTopic{
	margin-top: 30rpx ;
}
.hotTopicTop{
	margin-left: 28rpx;
}
.topTitle{
	// width: 144rpx;
	height: 36rpx;
	font-size: 36rpx;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #303133;
	line-height: 36rpx;
}
.topLine{
	width: 144rpx;
	height: 24rpx;
	background: #FFE512;
	border-radius: 1px 6px 1px 1px;
	margin-top: -18rpx;
}
.topicRankBox{
	margin-top: 28rpx;
	margin-right: 52rpx;
	
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	// width: 660rpx;
}
.topicTips{
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
	margin-left: 28rpx;
	
}
.rankImg{
	width: 48rpx;
	height: 38rpx;
	margin-right: 14rpx;
}
.tipsText{
	width: 256rpx;
	height: 32rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 32rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow:ellipsis;
}
// 推荐
.recommended{
	margin: 26rpx 28rpx 0 28rpx;
}
.recommendedTop{
}
.recommendedTitle{
	// width: 72rpx;
	height: 36rpx;
	font-size: 36rpx;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #303133;
	line-height: 36rpx;
}
.recommendedTopLine{
	width: 72rpx;
	height: 24rpx;
	background: #FFE512;
	border-radius: 1px 6px 1px 1px;
	margin-top: -18rpx;
}
.topicList{
	margin-top: 32rpx;
}
.topicTitle{
	display: flex;
	align-items: center;
}
.titleLeft{
	flex: 1;
	display: flex;
	align-items: center;
}
.titleImg{
	width: 36rpx;
	height: 36rpx;
	margin-right: 8rpx;
}

.titleRight{
	// width: 166rpx;
	height: 36rpx;
	background: #EDEFF2;
	display: flex;
	align-items: center;
	border-radius: 18rpx;
	padding-left: 20rpx;
	padding-right: 12rpx;
}
.number{
	font-size: 22rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #606266;
}
.rightText{
	flex: 1;
	font-size: 22rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #606266;
	
}
.moreRight{
	width: 14rpx;
	height: 14rpx;
}
.titleText{
	
	height: 36rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	// line-height: 36rpx;
	display: flex;
	align-items: center;
}
.contentImgBox {
	margin-top: 30rpx;
	display: flex;
	// margin-left: 28rpx;
}
.contentImg {
	width: 216rpx;
	margin-right: 24rpx;
	background-color: #ffffff;
	padding-bottom: 14rpx;
	border-radius: 8px ;
	position: relative;
}
.attImg {
	width: 216rpx;
	height: 216rpx;
	border-radius: 8px ;
	
}
.videoIcon{
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -55rpx;
	margin-left: -20rpx;
	width: 40rpx;
	height: 40rpx;
}
.playIcon{
	width: 100%;
	height: 100%;
}
.attText {
	// height: 28rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	// line-height: 28rpx;
	margin: 4rpx 0 2rpx 6rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
	overflow: hidden;
	-webkit-line-clamp: 2;
	line-height: 42rpx;
}
.line{
	width: 694rpx;
	height: 0.5px;
	background: #DDDDDD;
}
</style>
