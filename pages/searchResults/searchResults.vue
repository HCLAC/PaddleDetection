<template>
	<view >
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<view class="search-box">
			<mSearch class="mSearch-input-box" :mode="2" button="inside" :placeholder="defaultKeyword" @search="doSearch(false)" @input="inputChange" @confirm="doSearch(false)" v-model="keyword"></mSearch>
		</view>
		<!-- 搜索结果瀑布流 -->
		<!-- <touring></touring> -->
		<view class="touring">
			<view class="wrap">
				<!-- <u-button @click="clear">清空列表</u-button> -->
				<u-waterfall v-model="list" ref="uWaterfall" >
					<template v-slot:left="{leftList}">
						<view class="demo-warter demo-warter-l" v-for="(item,index) in leftList" :key="index" >
							<view class="" @click="onPageJump" :id ="item.article_id">
								<image class="demo-image"  :src="item.image" :index="index" mode="widthFix"></image>
								<view class="adress">
									<view class="adreessIcon">
										<image class="" src="../../static/images/Icon／Map3@2x(1).png" mode=""></image>
									</view>
									
									<view class="adressText">
										{{item.location}}
									</view>
								</view>
								
								<view class="titleTip">
									<view class="demo-tag">
										<view class="demo-tag-owner" v-if="item.type==0">
											游记
										</view>
										<view class="demo-tag-owner" v-if="item.type==1">
											攻略
										</view>
									</view>
									<view class="demo-title">
										{{item.title}}
									</view>
								</view>
							</view>
								<view class="demo-user">
									<view class="userMessage">
										<image class="userHeard" :src="item.avatar"></image>
										<view class="userNikename">{{ item.author_name }}</view>
									</view>
									<view class="count" @click="clickLike" :id="item.article_id">
										<image src="../../static/images/heart.svg" v-if="item.liked==0"></image>
										<image src="../../static/images/heart-actived.svg" v-if="item.liked==1"></image>
											{{ item.like_count || 0 }}
										</view>
								</view>
							
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view class="demo-warter" v-for="(item,index) in rightList" :key="index">
							<view class=""  @click="onPageJump" :id= "item.article_id">
								<image class="demo-image" :src="item.image" :index="index" mode="widthFix"></image>
								<view class="adress">
									<view class="adreessIcon">
										<image class="" src="../../static/images/Icon／Map3@2x(1).png" mode=""></image>
									</view>
									<view class="adressText">
										{{item.location}}
									</view>
								</view>
								<view class="titleTip">
									<view class="demo-tag">
										<view class="demo-tag-owner" v-if="item.type==0">
											游记
										</view>
										<view class="demo-tag-owner" v-if="item.type==1">
											攻略
										</view>
									</view>
									<view class="demo-title">
										{{item.title}}
									</view>
								</view>
							</view>
								<view class="demo-user">
									<view class="userMessage">
										<image class="userHeard" :src="item.avatar"></image>
										<view class="userNikename">{{ item.author_name }}</view>
									</view>
									<view class="count" @click="clickLike"  :id="item.article_id">
										<image src="../../static/images/heart.svg" v-if="item.liked==0"></image>
										<image src="../../static/images/heart-actived.svg" v-if="item.liked==1"></image>
										{{ item.like_count || 0 }}
									</view>
								</view>
							
						</view>
					</template>
				</u-waterfall>
				
			</view>
		</view>
		<!-- 搜索结果兜底页 -->
		<!-- <view class="results-buttom" v-if="">
			没找到“美国旅游”相关结果
		</view> -->
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	// import touring from '@/components/content/touring.vue'
	export default {
		data() {
			return {
				defaultKeyword: "",
				keyword: "",
				list: [],
			}
		},
		
		components:{
			mSearch,
			uniNavBar
			// touring
		},
		onLoad() {
			this.getResults()
		},
		// 方法
		methods: {
			getResults(){
				var that = this
				uni.getStorage({
					key:'article_id',
					success:function(res){
						console.log('取数据',res.data.data)
						that.list = res.data.data
					}
				})
			},
			// 跳转文章详情
			onPageJump(e) {
				console.log(e)
				let id = e.currentTarget.id
				// debugger
				// return
				uni.navigateTo({
					url: "/pages/contentdetail/contentdetail?article_id="+id
				})
			},
			// 点赞
			clickLike(e) {
				// console.log('qwer',e)
				let article = e.currentTarget.id
				var that = this
				var city_id = uni.getStorageSync('city_id')
				var state_id = uni.getStorageSync('state_id')
				uni.getStorage({
					key: 'Authorization',
					success: function(res) {
						console.log("token===>", res.data)
						that.token = res.data
					}
				})
				uni.request({
					// url:'article',
					url: 'http://121.40.30.19/article',
					data: {
						article_id: article
					},
					header: {
						'Authorization': that.token
					},
					success: function(res) {
						console.log(res.data.data.liked,
							res.data.data.like_count,
							res.data.data.uuid,
							444444
						)
						// console.log('eeeeeeeeeeeeeeee', e)
						console.log('文章详情====', res.data.data)
						uni.setStorageSync('id', res.data)
						that.articleList = res.data.data
						console.log('articleList', that.articleList)
						console.log('liked',that.articleList.liked)
						that.liked = that.articleList.liked
					}
				})
				
				
			
				uni.request({
						url: 'http://121.40.30.19/user/liked',
						data: {
							article_id: article,
							liked:that.liked == 0 ? 1 : 0
						},
						method: 'POST',
						header: {
							'Authorization': that.token
						},
						success: function(res) {
							console.log('点赞', res)
							if (res.data.code != 0) {
								// debugger
								uni.showModal({
									title: '提示',
									content: '您好，请先登录',
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											uni.redirectTo({
												url: '../login/login'
											})
										}
									}
								})
								return
							}
							uni.request({
								// url:'http://192.168.43.156:8199/article/list',
								// url:'article/list',
								url:'http://121.40.30.19/article/list',
								// url:'http://192.168.43.60:8299/article/list',
								data:{
									state_id:state_id,
									city_id:city_id,
									count:20,
									page:1,
									sort_by:1
								},
								header: {
									'Authorization': that.token
								},
								success:res=>{
									console.log('文章列表',res)
									uni.setStorageSync('article_id',res.data)
									console.log('存储文章列表==',res.data)
									that.list = res.data.data
									that.leftList = that.list.list
									that.rightList = that.list.list
									console.log('list=====',that.leftList)
								}
							})
						}
						
					})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			home(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();
			
			},
			blur(){
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				// this.defaultKeyword = "云南旅游";
				uni.getStorage({
					key:"OldKeys",
					success: res =>{
						this.defaultKeyword = OldKeys;
					},
				})
			},
			
			// getLoadNum(num){
			//     console.log('共加载了:'+num);
			//     !this.isNewRenderDone&&uni.hideLoading()
			//     this.isNewRenderDone = true
			// }
		},
		
		
	}
</script>

<style lang="scss">
	.search-box {width:100%;padding:15upx 2.5%;display:flex;justify-content:space-between;position:sticky;top: 0;}
	.search-box .mSearch-input-box{width: 100%;}
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
		align-items: center;
	}
	.fanhui{
		width: 40rpx;
		height: 40rpx;
		margin-left: 40rpx;
		margin-right: 20rpx;
	}
	.fhsy{
		width: 40rpx;
		height: 40rpx;
	}
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
	// 瀑布流
	/* 正在旅行 */
	.touring{
		margin-top: 24rpx;
	}
	.touring .tourtext{
		width: 160rpx;
		height: 104rpx;
		line-height: 104rpx;
		font-size: 40rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color: #303133;
		margin-left: 32rpx;
		
	}
	.demo-warter-l{
		margin-left:10rpx ;
	}
	.demo-warter {
		margin-top: 0;
		margin-right: 10rpx;
		margin-bottom: 16rpx;
		padding-bottom: 16rpx;
		/* position: relative; */
		background-color: #FFFFFF;
	}
	
	.demo-top{
		position: relative;
	}
	
	.demo-image {
		width: 100%;
		border-radius: 8rpx 8rpx 0 0 ;
		position: relative;
	}
	.adress{
		position: absolute;
		left: 0;
		bottom: 8rpx;
		display: flex;
		align-items: center;
		width:144rpx;
		height:40rpx;
		line-height: 40rpx;
		background:rgba(0,0,0,0.6);
		border-radius:0px 14rpx 0px 0px;
	}
	.adreessIcon{
		width: 24rpx;
		height: 24rpx;
		margin:0 4rpx;
		display: flex;
		align-items: center;
	}
	.adreessIcon image{
		width: 24rpx;
		height: 24rpx;
	}
	.adressText{
		font-size:24rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:24px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.titleTip{
		display: flex;
		margin-top: 24rpx;
		margin-left: 8rpx;
	}
	.demo-title {
		width: 278rpx;
		/* height: 70rpx; */
		font-size: 28rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(48,49,51,1);
		margin-left: 8rpx;
		line-height: 28rpx;
	}
	
	.demo-tag {
		
	}
	
	.demo-tag-owner {
		width: 52rpx;
		height: 28rpx;
		text-align: center;
		align-items: center;
		color: #0091FF;
		border: 2rpx solid rgba(0,145,255,1);
		border-radius: 14rpx;
		font-size: 16rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(0,145,255,1);
		/* margin-top: 6rpx; */
	}
	
	.demo-user {
		font-size: 10rpx;
		margin-top: 24rpx;
		/* margin-bottom: 16rpx; */
		display: flex;
		justify-content: space-between;
	}
	.userMessage {
		font-size: 10px;
		font-weight: 900;
		color: #464646;
		display: flex;
		align-items: center;
		}
	.userHeard{
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			margin-left: 14rpx;
		}
		.userNikename{
			font-size: 24rpx;
			margin-left: 16rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(96,98,102,1);
		}
		
	
	.count {
		display: flex;
		font-size: 22rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(96,98,102,1);
		align-items: center;
		margin-right: 20rpx;
	}
	.count image{
		width: 26rpx;
		height: 26rpx;
		margin-right: 8rpx;
	}
	
</style>
