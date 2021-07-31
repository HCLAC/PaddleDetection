<template>
	<view v-if="userInfo">
		<!-- 自定义导航栏 -->
		<view class="example-body" v-if="isFixed">
			<uni-nav-bar :fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<image class="fanhui" src=""  />
					<image class="fhsy" src=""  />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<mescroll-body  ref="mescrollRef" @init="mescrollInit" @down="downCallback"  @up="upCallback" :down="downOption" :up="upOption"  >
			<view class="content" style="height: 100%;">
				<view  style="position: absolute; width: 100%; top: 0; z-index: 400;">
					<view class="contentTop">
						<image src="../../static/images/mineBack.png" class="backImg"></image>
						<!-- 用户信息 -->
						<view class="usermes">
							<!-- <image class="userAva" :src="avatarUrl" v-if="avatarUrl"></image> -->

							<image src="../../static/images/userImg.svg" class="userAva" v-if="!userInfo.avatar" mode=""></image>
							<image :src="userInfo.avatar" class="userAva" v-if="userInfo.avatar" mode=""></image>
							<view class="userR">
								<view class="userName" @click="toMineInfo">{{ nickName }}
									<image src="../../static/images/iconExit.svg" mode=""></image>
								</view>
								<view class="fa">
									<view class="fllow" @click="toConcern()">
										<view class="fllowNum">{{fllowNum>10000?((fllowNum-(fllowNum%1000))/10000+'w'):fllowNum}}</view>
										<text>关注</text>
									</view>
									<view class="answers" @click="toAnswers()">
										<view class="answersNum">{{answersNum>10000?((answersNum-(answersNum%1000))/10000+'w'):answersNum}}</view>
										<text>问答</text>
									</view>
								</view>
								
								<!-- <view class="logout">退出登录</view> -->
							</view>
						</view>
					</view>
					<!-- 客服 -->
					<!-- <view class="phone" @click="tell"><image class="phoneImg" src="../../static/images/minephone.svg" mode=""></image></view> -->
					<!-- 我的收藏 -->
					<view class="myCollection" :class="isFixed ? 'fixTabs' : 'noFix'" id="selectcard" >
						<view class="favBox" @click="change" >
							<view class="favBT">
								<view :class="tabCurrent == 0 ?'favText' : 'favText1 '" >
									收藏
								</view>
								<view class="favLine" v-if="tabCurrent == 0">
								</view>
							</view>
							<view :class="tabCurrent == 0 ? 'favNum' : 'favNum1'" :style="{color: favnumcolor.color}" v-if="favNum != 0" >
								{{favNum>10000?((favNum-(favNum%1000))/10000+'w'):favNum}}
							</view>
						</view>
						<view class="likeBox" @click="change1">
							<view class="likeBT">
								<view :class="tabCurrent == 1 ?'favText' : 'favText1 '">
									已赞
								</view>
								<view class="likeLine" v-if="tabCurrent == 1">
								</view>
							</view>
							<view :class="tabCurrent == 1 ? 'likeNum' : 'likeNum1'" :style="{color: likenumcolor.color}" v-if="likeNum != 0" >
								{{likeNum>10000?((likeNum-(likeNum%1000))/10000+'w'):likeNum}}
							</view>
						</view>
						
						
					</view>
				</view>
				<!-- 收藏 -->
				<view style="margin-top: 64%; padding: 0 28rpx;" v-if="tabCurrent == 0 ">
					
					<view class="" v-for="(item, index) in tipList" :key="index" v-if="favNum != 0">
						<view class="contentItem" >
							<view class="left">
								<image :src="item.main_image" mode="aspectFill">
									<view class="imgTip">
										<view v-if="item.type == 1">游记</view>
										<view v-if="item.type == 2">攻略</view>
										<view v-if="item.type == 4">视频</view>
										<view v-if="item.type == 5">推广</view>
									</view>
									<view class="videoIcon" v-if="item.type == 4">
										<image class="playIcon"  src="../../static/images/playIcon.svg" mode="aspectFill"></image>
									</view>
								</image>
							</view>
							<view class="right" @click="onPageJump" :id="item.article_id">
								<view class="title">
									<text class="titleText">{{ item.title }}</text>
								</view>
								<view class="content">
									<rich-text class="richText" :nodes="item.content"></rich-text>
								</view>
								<view class="favandlikebox">
									<view class="fav">
										{{item.fav_count>10000?((item.fav_count-(item.fav_count%1000))/10000+'w'):item.fav_count}}收藏
									</view>
									<view class="like">
										{{item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count}}点赞
									</view>
								</view>
								<view class="position">
									<view class="pImg">
										<image src="../../static/images/iconNewMap.svg" mode="aspectFill"></image>
									</view>
									<view>{{ item.location }}</view>
								</view>
							</view>
						</view>
						<view class="line"></view>
					</view>
					
						
					
					
				</view>
				
				<!-- 点赞 -->
				<view style="margin-top: 64%; padding: 0 24rpx;" v-if="tabCurrent == 1 ">
					<view class="" v-for="(item, index) in likeList" :key="index" >
						<view class="contentItem" >
							<view class="left">
								<image :src="item.main_image" mode="aspectFill">
									<view class="imgTip">
										<view v-if="item.type == 1">游记</view>
										<view v-if="item.type == 2">攻略</view>
										<view v-if="item.type == 4">视频</view>
										<view v-if="item.type == 5">推广</view>
									</view>
									<view class="videoIcon" v-if="item.type == 4">
										<image class="playIcon"  src="../../static/images/playIcon.svg" mode="aspectFill"></image>
									</view>
								</image>
							</view>
							<view class="right" @click="onPageJump" :id="item.article_id">
								<view class="title">
									<text class="titleText">{{ item.title }}</text>
								</view>
								<view class="content">
									<rich-text class="richText" :nodes="item.content"></rich-text>
								</view>
								<view class="favandlikebox">
									<view class="fav">
										{{item.fav_count}}收藏
									</view>
									<view class="like">
										{{item.like_count}}点赞
									</view>
								</view>
								<view class="position">
									<view class="pImg">
										<image src="../../static/images/iconNewMap.svg" mode="aspectFill"></image>
									</view>
									<view>{{ item.location }}</view>
								</view>
							</view>
						</view>
						<view class="line"></view>
					</view>
					
					
					
				</view>
				
			</view>
		</mescroll-body>
		<!-- 收藏列表为空时 -->
		<view class="empty" v-if="!tipList || !tipList.length && tabCurrent == 0 ">
			<view class="emptyImg">
				<image src="../../static/images/emptyfav.svg" mode=""></image>
			</view>
			<view class="emptyText">
				您的收藏夹空空如也～
			</view>
		</view>
		<!-- 点赞列表为空时 -->
		<view class="empty" v-if="!likeList || !likeList.length && tabCurrent == 1">
			<view class="emptyImg">
				<image src="../../static/images/emptylike.svg" mode=""></image>
			</view>
			<view class="emptyText">
				您还没有赞过任何文章哦～
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import httpType from '@/httpType.js';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	data() {
		return {
			userInfo:[],
			nickName: uni.getStorageSync('nickName'),
			avatarUrl: '',
			tipList: [],
			likeList:[],
			upOption:{
				bgColor:'#ffffff'
			},
			fllowNum:0,
			answersNum:0,
			favNum:0,
			likeNum:0,
			current: 0,
			tablist: ['收藏','已赞'],
			tabCurrent: 0,
			favnumcolor:{
				color: '#303133'
			},
			likenumcolor:{
				color: '#909399'
			},
			cardheight:0,
			isFixed:false,
			downOption:{
				use:false
			}
		};
	},
	mixins: [MescrollMixin],
	computed: mapState(['forcedLogin', 'hasLogin', 'phone']),
	onShow() {
		var auth = uni.getStorageSync('Authorization')
		if (!auth){
			uni.navigateTo({
				url: '/pagesA/login/login?ismine=1'
			});
			return
		}
		this.getUserMsg();
		this.downCallback()
	},
	onLoad() {
		var auth = uni.getStorageSync('Authorization')
		if (!auth){
			return
		}
		this.getlist()
		this.getAnswers()
	},
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
	methods: {
		// 获取用户信息
		getUserMsg() {
			var that = this;
			uni.getStorage({
				key: 'Authorization',
				success: function(res) {
					console.log('token===>', res.data);
					// uni.request({
					// 	url:this.globalUrl+ '/user/info',
					// 	header:{
					// 		'Authorization':res.data
					// 	},
					// 	success:function(res){
					// 			console.log('个人信息',res)
					// 	}
					// })
				}
			}),
				uni.request({
					url: this.globalUrl+ '/user/info',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					method: 'get',
					success: function(res) {
						console.log('个人信息=', res.data);
						that.userInfo = res.data.data
						if (res.data.code == 0) {
							if(res.data.data.nick_name){
								that.nickName = res.data.data.nick_name
							}else{
								that.nickName = res.data.data.mobile
							}
							that.fllowNum = res.data.data.following
							that.favNum = res.data.data.fav_count
							that.likeNum = res.data.data.like_count
						} else{
							uni.removeStorageSync('Authorization')
							uni.navigateTo({
								url: '/pagesA/login/login?ismine=1'
							});
						}
					}
				})
				
		},
		getlist(){
			uni.request({
				url: this.globalUrl+ '/user/favorite/list',
				data: {
					count: 6,
					page: 1
				},
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				method: 'get',
				success: (res)=> {
					console.log('收藏列表', res.data);
					if(res.data.data != null){
						this.tipList = res.data.data.list;
						console.log('1111111', this.tipList);
					}
					
				}
			});
			uni.request({
				url: this.globalUrl+ '/user/liked/list',
				data: {
					count: 6,
					page: 1
				},
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				method: 'get',
				success: (res)=> {
					console.log('点赞列表', res.data);
					if(res.data.data != null ){
						this.likeList = res.data.data.list;
						console.log('likelist', this.likeList);
					}
					
				}
			});
		},
		// 获取问答
		getAnswers(){
			uni.request({
				url: this.globalUrl+ '/user/followquestion/list',
				data: {
					page:1,
					count:10
				},
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				method: 'get',
				success: (res)=> {
					console.log('问答=', res.data);
					this.answersNum = res.data.data.total
						
					
					
				}
			})
		},
		// 切换
		
		change(){
			this.tabCurrent = 0
			this.favnumcolor.color = '#303133'
			this.likenumcolor.color = '#909399'
			this.mescroll.resetUpScroll()
			this.mescroll.scrollTo(0)
		},
		change1(){
			this.tabCurrent = 1
			this.favnumcolor.color = '#909399'
			this.likenumcolor.color = '#303133'
			this.mescroll.resetUpScroll()
			this.mescroll.scrollTo(0)
		},
		// tabChange(index) {
		// 	this.tabCurrent = index;
		// 	if(index == 1 ){
		// 		this.favnumcolor.color = '#909399'
		// 		this.likenumcolor.color = '#303133'
		// 		this.downCallback()
		// 	}else{
		// 		this.favnumcolor.color = '#303133'
		// 		this.likenumcolor.color = '#909399'
		// 		this.downCallback()
		// 	}
		// },
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
		// 跳转关注页
		toConcern(){
			uni.navigateTo({
				url:'/pagesA/mineConcern/mineConcern'
			});
		},
		// 跳转个人问答页
		toAnswers(){
			uni.navigateTo({
				url:'../mineAnswers/mineAnswers'
			})
		},
		// 跳转信息修改页
		toMineInfo(){
			uni.navigateTo({
				url:'../mineInfo/mineInfo'
			})
		},
		// 客服电话
		tell(){
			uni.makePhoneCall({
				phoneNumber:""
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
			let pageSize = page.size; // 页长, 默认每页10条
			if(this.tabCurrent == 0){
				uni.request({
					url: this.globalUrl+ '/user/favorite/list?page=' + pageNum + '&count=' + pageSize,
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
							if (page.num == 1) this.tipList = []; //如果是第一页需手动置空列表
							this.tipList = this.tipList.concat(curPageData); //追加新数据
							console.log('tipList', this.tipList);
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
					url: this.globalUrl+ '/user/liked/list?page=' + pageNum + '&count=' + pageSize,
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
						if (page.num == 1) this.likeList = []; //如果是第一页需手动置空列表
						this.likeList = this.likeList.concat(curPageData); //追加新数据
						console.log('likeList', this.likeList);
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
		...mapMutations(['login'])
	}
};
</script>

<style lang="scss" scoped>
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #aa557f;
		// transition: background-color 2s;
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
		margin-left: 42rpx;
		
	}
	.fhsy {
		width: 40rpx;
		height: 40rpx;
		margin-left: 20rpx;
	}
	/* #ifdef  MP-BAIDU*/
	.fhsy {
		margin-left: 100rpx;
	}
	/*  #endif  */
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
.backImg {
	position: absolute;
	height: 440rpx;
	width: 100%;
	z-index: -11;
}

// /* 用户信息 */
.usermes {
	padding-top: 154rpx;
	height: 130rpx;
	display: flex;
	height:340rpx ;
	align-items: center;
	margin-bottom: 38rpx;
}
.userAva {
	margin-left: 28rpx;
	width: 130rpx;
	height: 130rpx;
	box-shadow: 0px 0px 14px 0px #F7B500;
	border: 3px solid #FFFFFF;
	border-radius: 50%;
}
.userR {
	margin-left: 32rpx;
	// margin-top: 24rpx;
}
.userName {
	font-size: 36rpx;
	font-weight: 500;
	color: #303133;
	display: flex;
	align-items: center;
	image{
		width: 32rpx;
		height: 32rpx;
		margin-left: 16rpx;
	}
}
.fa{
	margin-top: 20rpx;
	display: flex;
	align-items: center;
	.fllow{
		
		height: 24rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #606266;
		line-height: 24rpx;
		display: flex;
		align-items: center;
		text{
		}
	}
	.answers{
		height: 24rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #606266;
		line-height: 24rpx;
		display: flex;
		align-items: center;
		margin-left: 20rpx;
	}
}

.logout {
	margin-top: 4px;
	width: 80px;
	height: 20px;
	font-size: 12px;
	background-color: #f7f7f7;
	border: 1px #b9b9bf solid;
	border-radius: 30px;
	line-height: 20px;
	text-align: center;
}
/* 我的收藏卡片 */
.phone {
	height: 124rpx;
	width: 124rpx;
	border-radius: 50%;
	position: fixed;
	bottom: 62rpx;
	right: 18rpx;
}
.phone .phoneImg {
	width: 124rpx;
	height: 124rpx;
}
.myCollection {
	border-radius: 12px 12px 0rpx 0rpx;
	background-color: #fff;
	color: #303133;
	width: 100%;
	// font-size: 40rpx;
	// font-weight: 500;
	// padding-left: 32rpx;
	padding-top: 48rpx;
	display: flex;
	position: absolute;
	top: 360rpx;
}
.favBox{
	display: flex;
	height: 60rpx;
	margin-left: 28rpx;
}
.favBT{
	margin-right: 8rpx;
	text-align: center;
}
.favText{
	// width: 72rpx;
	height: 36rpx;
	font-size: 36rpx;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #303133;
	line-height: 36rpx;
	
}
.favText1{
	// width: 56rpx;
	height: 28rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #909399;
	line-height: 28rpx;
	margin-top: 8rpx;
}
.favLine{
	width: 72rpx;
	height: 24rpx;
	background: #FFE512;
	border-radius: 1px 6px 1px 1px;
	margin-top: -20rpx;
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
	width: 72rpx;
	height: 24rpx;
	background: #FFE512;
	border-radius: 1px 6px 1px 1px;
	margin-top: -20rpx;
}
.fixTabs {
	position: fixed;
	top: 126rpx;
	z-index: 2;
	height: 98rpx;
	padding-top: 48rpx;
	display: flex;
}
.noFix {
	z-index: 1000;
}
.favNum{
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 24rpx;
	z-index: 11111;
	margin-top: 12rpx;
	// margin-left: -158rpx;
}
.favNum1{
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 24rpx;
	z-index: 11111;
	margin-top: 12rpx;
	// margin-left: -158rpx;
}
.likeNum{
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 24rpx;
	z-index: 11111;
	margin-top: 12rpx;
	// margin-left: 118rpx;
}
.likeNum1{
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 24rpx;
	z-index: 11111;
	margin-top: 12rpx;
	// margin-left: 118rpx;
}

.noContentItem {
	// height: 600rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	image {
		width: 154rpx;
		height: 122rpx;
		position: fi;
	}
	.tipText {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(144, 147, 153, 1);
		line-height: 30rpx;
		margin-top: 40rpx;
	}
}
.noContent {
	font-size: 22rpx;
	color: rgba(201, 202, 209, 1);
	// color: red;
	text-align: center;
	margin-top: 80rpx;
}

.contentItem {
	width: 694rpx;
	height: 232rpx;
	margin: 28rpx;
	margin-left: 0;
	margin-top: 0;
	margin-bottom: 20rpx;
	border-radius: 8px;
	display: flex;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	.left {
		position: relative;
		.imgTip {
			position: absolute;
			left: 0rpx;
			top: 0rpx;
			font-size: 24rpx;
			line-height: 44rpx;
			font-weight: 500;
			color: #ffffff;
			width: 96rpx;
			height: 44rpx;
			text-align: center;
			background-color: rgba(0, 0, 0, 0.6);
			border-radius: 16rpx 0px 16rpx 0px;
		}
		image {
			// margin: 8rpx;
			width: 192rpx;
			height: 232rpx;
			margin-right: 20rpx;
			border-radius: 16rpx;
		}
		.videoIcon{
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -20rpx;
			margin-left: -30rpx;
			width: 40rpx;
			height: 40rpx;
		}
		.playIcon{
			width: 100%;
			height: 100%;
		}
	}

	.right {
		margin-top: 12rpx;
		height: 232rpx;
		// overflow: hidden;
		// text-overflow:ellipsis;
		// white-space: nowrap;
	}
	.right .title {
		width: 480rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(48, 49, 51, 1);
		font-family: PingFangSC-Medium, PingFang SC;
		line-height: 32rpx;
		display: flex;
	}
	.tips {
		margin-right: 10rpx;
	}
	.titleText {
		flex: 1;
		// margin-left: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.richText {
		width: 480rpx;
		height: 84rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #909399;
		line-height: 42rpx;
		margin-top: 12rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.favandlikebox{
		display: flex;
		align-items: center;
		margin-top: 14rpx;
		font-size: 22rpx;
		// font-family: Roboto-Regular, Roboto;
		font-weight: 400;
		color: #606266;
		line-height: 22rpx;
	}
	.like{
		margin-left: 20rpx;
	}
	.right .position {
		display: flex;
		margin-top: 20rpx;
		// height: 30rpx;
		// line-height: 40rpx;
		align-items: center;
		.pImg{
			width: 26rpx;
			height: 30rpx;
			
			image {
				height: 100%;
				width: 100%;
			}
		}
		
		view {
			width: 452rpx;
			font-size: 22rpx;
			margin-left: 4rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(0, 145, 255, 1);
			line-height: 22rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
.line{
	width: 722rpx;
	height: 1rpx;
	background: #EDEFF2;
	margin-bottom: 20rpx;
}
// 列表为空时
	.empty {
		position: absolute;
		left: 50%; 
		top: 810rpx;
		transform: translate(-50%, -50%); 
		-webkit-transform: translate(-50%, -50%);
		text-align: center;
		// margin-top: 350rpx;
		// margin-left: 138rpx;
	}

	.emptyImg {
		width: 148rpx;
		height: 148rpx;
		margin-left: 164rpx;
		margin-bottom: 40rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.emptyText {
		width: 476rpx;
		height: 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 30rpx;
	}
</style>
