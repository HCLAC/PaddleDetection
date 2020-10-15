<template>
	<view >
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">话题</view>
			</uni-nav-bar>
		</view>
		<mescroll-body class="mescroll" ref="mescrollRef" style="margin-bottom: 300rpx;" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
		<!-- 头图 -->
			<view class="headImgBox">
				<image class="headImg" :src="info.image" mode="scaleToFill"></image>
				<view class="mask"></view>
				<view class="topicBox" >
					<view class="bigTitle">
						#{{info.name}}
					</view>
					<view class="number">
						{{info.article_count}}篇文章
					</view>
					<view class="topicSquare" @click="toTopic">
						<view class="squareText">
							话题广场
						</view>
						<image class="more" src="../../static/images/more1.svg" mode=""></image>
					</view>
				</view>
			</view>
			<view class="contentBox" >
				<!-- 景点推荐 -->
				<view class="content">
					<view class="contentHeader">
						<view class="myCollection" :class="isFixed ? 'fixTabs' : 'noFix'" id="selectcard" >
							<v-tabs
								inactive-color="#909399"
								lineHeight="24rpx"
								lineColor="#FFE512"
								activeFontSize="36rpx"
								activeColor="#303133"
								fontSize="36rpx"
								:lineScale="0.7"
								lineRadius="6px"
								v-model="tabCurrent"
								:tabs="tablist"
								:is-scroll="false"
								:current="tabCurrent"
								@change="tabChange"
							></v-tabs>
						</view>
					</view>
				</view>
				<!-- 正在旅行 -->
				<view class="touring" id="touring">
					<!-- 推荐 -->
					<view class="wrap" v-if="tabCurrent == 0 ">
						<view class="left">
							<view class="demo-warter" v-for="(item, index) in recommendList" :key="index" v-if="index % 2 == 0">
								<view class="" >
									<view class="demo-top" @click="onPageJump" :id="item.article_id">
										<view class="imgBox" >
											<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :src="item.image" :index="index" lazy-load="true" mode="widthFix">
												<view class="videoIcon" v-if="item.type == 4">
													<image class="playIcon"  src="../../static/images/playIcon.svg" mode=""></image>
												</view>
											</image>
											<view class="adress">
												<view class="adreessIcon"><image class="" src="../../static/images/iconMap3.svg" mode=""></image></view>
												<view class="adressText">{{ item.location }}</view>
											</view>
										</view>
										<view class="titleTip">
											<view class="demo-tag">
												<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
												<view class="demo-tag-owner" v-if="item.type == 2">攻略</view>
												<view class="demo-tag-owner" v-if="item.type == 4">视频</view>
											</view>
											<view class="demo-title">{{ item.title }}</view>
										</view>
									</view>
									<view class="demo-user">
										<view class="userMessage">
											<image class="userHeard" :src="item.avatar"></image>
											<view class="userNikename">{{ item.author_name }}</view>
										</view>
										<view class="count" @click="clickLike(item, index)">
											<view class="countImg">
												<image src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
												<image src="../../static/images/heart-actived.svg" v-if="item.liked == 1"></image>
											</view>
											<view class="likeCount">{{ item.like_count || 0 }}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="right">
							<view class="demo-warter" v-for="(item, index) in recommendList" :key="index" v-if="index % 2 == 1">
								<view class="">
									<view class="demo-top"  @click="onPageJump" :id="item.article_id">
										<view class="imgBox">
											<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :src="item.image" :index="index" lazy-load="true" mode="widthFix">
												<view class="videoIcon" v-if="item.type == 4">
													<image class="playIcon"  src="../../static/images/playIcon.svg" mode=""></image>
												</view>
											</image>
											<view class="adress">
												<view class="adreessIcon"><image class="" src="../../static/images/iconMap3.svg" mode=""></image></view>
												<view class="adressText">{{ item.location }}</view>
											</view>
										</view>
										<view class="titleTip">
											<view class="demo-tag">
												<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
												<view class="demo-tag-owner" v-if="item.type == 2">攻略</view>
												<view class="demo-tag-owner" v-if="item.type == 4">视频</view>
											</view>
											<view class="demo-title">{{ item.title }}</view>
										</view>
									</view>
									<view class="demo-user">
										<view class="userMessage">
											<image class="userHeard" :src="item.avatar"></image>
											<view class="userNikename">{{ item.author_name }}</view>
										</view>
										<view class="count" @click="clickLike(item, index)">
											<view class="countImg">
												<image src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
												<image src="../../static/images/heart-actived.svg" v-if="item.liked == 1"></image>
											</view>
											<view class="likeCount">{{ item.like_count || 0 }}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 最新 -->
					<view class="wrap" v-if="tabCurrent == 1 ">
						<view class="left">
							<view class="demo-warter" v-for="(item, index) in latestList" :key="index" v-if="index % 2 == 0">
								<view class="" >
									<view class="demo-top" @click="onPageJump" :id="item.article_id">
										<view class="imgBox" >
											<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :src="item.image" :index="index" lazy-load="true" mode="widthFix">
												<view class="videoIcon" v-if="item.type == 4">
													<image class="playIcon"  src="../../static/images/playIcon.svg" mode=""></image>
												</view>
											</image>
											<view class="adress">
												<view class="adreessIcon"><image class="" src="../../static/images/iconMap3.svg" mode=""></image></view>
												<view class="adressText">{{ item.location }}</view>
											</view>
										</view>
										<view class="titleTip">
											<view class="demo-tag">
												<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
												<view class="demo-tag-owner" v-if="item.type == 2">攻略</view>
												<view class="demo-tag-owner" v-if="item.type == 4">视频</view>
											</view>
											<view class="demo-title">{{ item.title }}</view>
										</view>
									</view>
									<view class="demo-user">
										<view class="userMessage">
											<image class="userHeard" :src="item.avatar"></image>
											<view class="userNikename">{{ item.author_name }}</view>
										</view>
										<view class="count" @click="clickLike(item, index)">
											<view class="countImg">
												<image src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
												<image src="../../static/images/heart-actived.svg" v-if="item.liked == 1"></image>
											</view>
											<view class="likeCount">{{ item.like_count || 0 }}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="right">
							<view class="demo-warter" v-for="(item, index) in latestList" :key="index" v-if="index % 2 == 1">
								<view class="">
									<view class="demo-top"  @click="onPageJump" :id="item.article_id">
										<view class="imgBox">
											<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :src="item.image" :index="index" lazy-load="true" mode="widthFix">
												<view class="videoIcon" v-if="item.type == 4">
													<image class="playIcon"  src="../../static/images/playIcon.svg" mode=""></image>
												</view>
											</image>
											<view class="adress">
												<view class="adreessIcon"><image class="" src="../../static/images/iconMap3.svg" mode=""></image></view>
												<view class="adressText">{{ item.location }}</view>
											</view>
										</view>
										<view class="titleTip">
											<view class="demo-tag">
												<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
												<view class="demo-tag-owner" v-if="item.type == 2">攻略</view>
												<view class="demo-tag-owner" v-if="item.type == 4">视频</view>
											</view>
											<view class="demo-title">{{ item.title }}</view>
										</view>
									</view>
									<view class="demo-user">
										<view class="userMessage">
											<image class="userHeard" :src="item.avatar"></image>
											<view class="userNikename">{{ item.author_name }}</view>
										</view>
										<view class="count" @click="clickLike(item, index)">
											<view class="countImg">
												<image src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
												<image src="../../static/images/heart-actived.svg" v-if="item.liked == 1"></image>
											</view>
											<view class="likeCount">{{ item.like_count || 0 }}</view>
										</view>
									</view>
								</view>
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
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				recommendList: [],
				latestList:[],
				tablist:['推荐','最新'],
				item: null,
				current: 0,
				tabCurrent: 0,
				firstTime: new Date().getTime(),
				isFixed: false,
				cardheight:0,
				id:'',
				info:''
				
			};
		},
		mixins: [MescrollMixin],
		onLoad(e) {
			console.log('---',e)
			this.id = e.id
			this.getRecommend()
			this.getTopic()
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#selectcard').boundingClientRect(data => {
			  console.log("得到布局位置信息" + JSON.stringify(data));
			  console.log("节点离页面顶部的距离为" + data.top);
			  if(data.top == 0 ){
				  this.cardheight = 220
			  }else{
				  this.cardheight = data.top
			  }
			}).exec();
		},
		
		onPageScroll(e) {
			// console.log(e)
			if (e.scrollTop >  this.cardheight) {
				this.isFixed = true;
			} else {
				this.isFixed = false;
			}
		},
		
		methods: {
			
			// 推荐列表
			getRecommend(){
				uni.request({
					url: this.globalUrl + '/topics/articles/recommend',
					data: {
						topic_id:this.id,
						count: 6,
						page: 1
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						if(res.data.data == null){
							uni.request({
								url: this.globalUrl + '/topics/articles/recommend',
								data: {
									topic_id:this.id,
									count: 6,
									page: 1
								},
								success: (res) => {
									uni.setStorageSync('article_id', res.data);
									console.log('无token推荐',res)
									this.recommendList = res.data.data.list;
									console.log('recommendList=====', this.recommendList);
								}
							})
						}else{
							uni.setStorageSync('article_id', res.data);
							console.log('推荐',res)
							this.recommendList = res.data.data.list;
							console.log('recommendList=====', this.recommendList);
						}
						
					}
				});
			},
			// 最新列表
			getRecommend(){
				uni.request({
					url: this.globalUrl + '/topics/articles/latest',
					data: {
						topic_id:this.id,
						count: 6,
						page: 1
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						if(res.data.data == null){
							uni.request({
								url: this.globalUrl + '/topics/articles/latest',
								data: {
									topic_id:this.id,
									count: 6,
									page: 1
								},
								success: (res) => {
									uni.setStorageSync('article_id', res.data);
									console.log('无token最新',res)
									this.latestList = res.data.data.list;
									console.log('latestList=====', this.latestList);
								}
							})
						}else{
							uni.setStorageSync('article_id', res.data);
							console.log('最新',res)
							this.latestList = res.data.data.list;
							console.log('latestList=====', this.latestList);
						}
						
					}
				});
			},
			getTopic(){
				uni.request({
					url: this.globalUrl + '/topics',
					data: {
						topic_id: this.id
					},
					success: res => {
						this.info = res.data.data;
						console.log('info=====', this.info);
					}
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
			// 跳转话题广场
			toTopic(){
				uni.navigateTo({
					url:'/pages/topic/topic'
				})
			},
			// 选项卡切换
			tabChange(index) {
				this.tabCurrent = index;
				this.downCallback()
				this.mescroll.scrollTo(0)
			},
			// 点赞
			clickLike(e, index) {
				console.log('qaz', e, index);
				// debugger
				let article = e.article_id;
				var that = this;
				uni.request({
					url: this.globalUrl + '/user/liked',
					data: {
						article_id: article,
						liked: e.liked == 0 ? 1 : 0
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log(res)
						if (res.data.code != 0) {
							// debugger
							uni.navigateTo({
								url: '../login/login'
							});
						}else{
							if(this.tabCurrent == 0){
								that.recommendList[index].liked = e.liked == 1 ? 0 : 1;
								that.recommendList[index].like_count = e.liked == 1 ? e.like_count + 1 : e.like_count - 1;
							}else{
								that.latestList[index].liked = e.liked == 1 ? 0 : 1;
								that.latestList[index].like_count = e.liked == 1 ? e.like_count + 1 : e.like_count - 1;
							}
						}
						
						
						
					}
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
				let pageSize = page.size; // 页长, 默认每页10条
				if(this.tabCurrent == 0){
					uni.request({
						url: this.globalUrl+ '/topics/articles/recommend?page=' + pageNum + '&count=' + pageSize,
						data: {
							topic_id:this.id,
						},
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
								if (page.num == 1) this.recommendList = []; //如果是第一页需手动置空列表
								this.recommendList = this.recommendList.concat(curPageData); //追加新数据
								console.log('recommendList', this.recommendList);
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
				}else{
					uni.request({
						url: this.globalUrl+ '/topics/articles/latest?page=' + pageNum + '&count=' + pageSize,
						data: {
							topic_id:this.id,
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
							// let totalPage = data.data.data.list;
							// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
							let totalSize = data.data.data.total;
							console.log('totalSize', totalSize);
							// 接口返回的是否有下一页 (true/false)
							// let hasNext = data.data.data.list;
					
							//设置列表数据
							if (page.num == 1) this.latestList = []; //如果是第一页需手动置空列表
							this.latestList = this.latestList.concat(curPageData); //追加新数据
							console.log('latestList', this.latestList);
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
/* 自定义导航栏样式 */
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

.navBar {
	display: flex;
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
	margin-left: 162rpx;
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
// 头图
.headImgBox {
	width: 750rpx;
	height: 440rpx;
	position: relative;
}
.headImg {
	width: 100%;
	height: 100%;
}
.mask {
	width: 750rpx;
	height: 244rpx;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #13c2c2 100%);
	opacity: 0.4;
	position: absolute;
	bottom: 0;
	left: 0;
}
.topicBox{
	position: absolute;
	top: 0;
	left: 0;
	margin-top: 136rpx;
	margin-left: 28rpx;
}
.bigTitle{
	
	height: 56rpx;
	font-size: 56rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 56rpx;
}
.number{
	margin-top: 16rpx;
	height: 22rpx;
	font-size: 22rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #C9CAD1;
	line-height: 22rpx;
}
.topicSquare{
	width: 138rpx;
	height: 36rpx;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 9px;
	margin-top: 40rpx;
	display: flex;
	align-items: center;
	padding-left: 20rpx;
	padding-right: 12rpx;
}
.squareText{
	width: 88rpx;
	height: 36rpx;
	font-size: 22rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 36rpx;
}
.more{
	margin-left: 4rpx;
	width: 14rpx;
	height: 14rpx;
}
// 
.contentBox {
	width: 750rpx;
	background: #f8f8f8;
	border-radius: 16rpx 16rpx 0px 0px;
	position: relative;
	top: -30rpx;
	left: 0;
}
.myCollection {
	border-radius: 12px 12px 0rpx 0rpx;
	background-color: #fff;
	color: #303133;
	width: 100%;
	// font-size: 40rpx;
	// font-weight: 500;
	// padding-left: 32rpx;
	padding-top: 30rpx;
	display: flex;
	// position: absolute;
	// top: 360rpx;
}
.fixTabs {
	position: fixed;
	top: 126rpx;
	
	z-index: 2;
	
}
.noFix {
	
	z-index: 1000;
	
}
// 瀑布流
.touring{
	margin-top: 36rpx;
}
.touring .tourtext {
	width: 160rpx;
	height: 104rpx;
	// line-height: 104rpx;
	font-size: 40rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	margin-left: 32rpx;
	
}

.wrap {
	width: 750rpx;
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;
	margin-top: 24rpx;
}
.left {
	margin-left: 10rpx;
}
.demo-warter {
	width: 360rpx;
	margin-top: 0;
	margin-right: 10rpx;
	margin-bottom: 16rpx;
	padding-bottom: 16rpx;
	/* position: relative; */
	background-color: #ffffff;
}

.demo-top {
	position: relative;
}
.imgBox{
	position: relative;
	display: flex;
	align-items: flex-end;
}
.demoImage {
	min-height: 300rpx !important;
	max-height: 460rpx;
	width: 100%;
	border-radius: 8rpx 8rpx 0 0;
}
.demoImage4 {
	width: 100%;
	min-height: 272rpx;
	max-height: 480rpx;
	border-radius: 8rpx 8rpx 0 0;
}
.videoIcon{
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -30rpx;
	margin-left: -30rpx;
	width: 60rpx;
	height: 60rpx;
}
.playIcon{
	width: 100%;
	height: 100%;
}
.adress {
	position: absolute;
	left: 0;
	bottom:0;
	display: flex;
	align-items: center;
	max-width: 240rpx;
	height: 40rpx;
	padding-right: 16rpx;
	background: rgba(0, 0, 0, 0.6);
	border-radius: 0px 14rpx 0px 0px;
}

.adreessIcon {
	width: 24rpx;
	height: 24rpx;
	margin: 0 4rpx;
	display: flex;
}

.adreessIcon image {
	width: 100%;
	height: 100%;
}

.adressText {
	max-width: 192rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	/* line-height:24px; */
	/* margin-right: 16rpx; */
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.titleTip {
	display: flex;
	margin-top: 10rpx;
	margin-left: 8rpx;
}

.demo-title {
	width: 278rpx;
	/* max-height: 70rpx; */
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(48, 49, 51, 1);
	margin-left: 8rpx;
	line-height: 46rpx;
}

.demo-tag {
	margin-top: 9rpx;
}

.demo-tag-owner {
	width: 52rpx;
	height: 28rpx;
	text-align: center;
	align-items: center;
	color: #0091ff;
	border: 2rpx solid rgba(0, 145, 255, 1);
	border-radius: 14rpx;
	font-size: 16rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(0, 145, 255, 1);
	/* margin-top: 6rpx; */
}

.demo-user {
	font-size: 10rpx;
	margin-top: 24rpx;
	/* margin-bottom: 16rpx; */
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.userMessage {
	font-size: 10px;
	font-weight: 900;
	color: #464646;
	display: flex;
	align-items: center;
}

.userHeard {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	margin-left: 14rpx;
}

.userNikename {
	font-size: 24rpx;
	margin-left: 16rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(96, 98, 102, 1);
}

.count {
	display: flex;
	align-items: center;
	margin-right: 20rpx;
}

.countImg {
	width: 26rpx;
	height: 26rpx;
	margin-right: 8rpx;
	display: flex;
	align-items: center;
}
.countImg image {
	width: 100%;
	height: 100%;
}
.likeCount {
	font-size: 22rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(96, 98, 102, 1);
	/* line-height:20rpx; */
}
</style>
