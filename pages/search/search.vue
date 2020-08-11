<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<view class="search-box">
			<!-- mSearch组件 如果使用原样式，删除组件元素-->
			<mSearch
				class="mSearch-input-box"
				:mode="2"
				button="inside"
				:placeholder="defaultKeyword"
				@search="doSearch(keyword)"
				@input="inputChange"
				confirm-type="search"
				@confirm="Toresults()"
				v-model="keyValue"
			></mSearch>
			
		</view>
		<view class="search-keyword">
			<scroll-view class="keyword-list-box" scroll-y v-show="isShowKeywordList">
				<block v-for="(row, index) in keywordList" :key="index">
					<view class="keyword-entry" hover-class="keyword-entry-tap">
						<view class="liIcon"></view>
						<view class="keyword-text" @tap.stop="doSearch(keywordList[index].keyword)" @click="Toresults"><rich-text :nodes="row.htmlStr"></rich-text></view>
					</view>
				</block>
				<view class="search-bottom" @click="Toresults(keyword)">
					搜索更多关于“
					<veiw>{{ keyValue }}</veiw>
					”的结果
				</view>
			</scroll-view>
			<scroll-view class="keyword-box" scroll-y v-show="noResult != '暂无结果'">
				<view class="keyword-block" v-if="oldKeywordList.length > 0">
					<view class="keyword-list-header">
						<view>历史记录</view>
						<view><image @tap="oldDelete" src="/static/images/icon-shanchu.svg"></image></view>
					</view>
					<view class="keyword">
						<view v-for="(keyword, index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">{{ keyword }}</view>
					</view>
				</view>
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<!-- <view><image @tap="hotToggle" :src="'/static/images/attention' + forbid + '.png'"></image></view> -->
					</view>
					<view class="hotList" v-if="forbid == ''">
						<view class="hotItem" v-for="(keyword, index) in hotKeywordList" @tap="doSearch(keyword)" :key="index">
							<!-- <image class="hotImg " :src="`../../static/images/icon-${index+1>=3?3:index+1}.png`" mode=""></image> -->
							<image class="hotImg " :src="`../../static/images/icon-${index+1}.svg`" mode=""></image>
							<view class="hotContent">{{ keyword }}</view>
						</view>
					</view>
					<view class="hide-hot-tis" v-else><view>当前搜热门搜索已隐藏</view></view>
				</view>
			</scroll-view>
		</view>
		<view v-show="noResult == '暂无结果'">
			<view class="noResult">
				没找到“
				<veiw>{{ keyValue }}</veiw>
				”相关结果
			</view>
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
		</view>
	</view>
</template>

<script>
//引用mSearch组件，如不需要删除即可
import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
import touring from '@/components/content/touring.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import httpType from '../../httpType.js';
export default {
	data() {
		return {
			defaultKeyword: '',
			keyValue: '',
			keywordList: [],
			oldKeywordList: [],
			hotKeywordList: [],
			forbid: '',
			noResult: null,
			isShowKeywordList: false,
			list:[],
			leftList:[],
			rightList:[],
			token:'',
			liked:''
		};
	},
	onLoad() {
		this.init(),
		this.getResults()
	},
	components: {
		//引用mSearch组件，如不需要删除即可
		mSearch,
		touring,
		uniNavBar
	},
	methods: {
		getResults(){
			var that = this
			uni.getStorage({
				key:'article_id',
				success:function(res){
					console.log('取数据',res.data.data)
					that.list = res.data.data.list
					console.log('list----',that.list)
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
		init() {
			this.loadDefaultKeyword();
			this.loadOldKeyword();
			this.loadHotKeyword();
		},
		back() {
			uni.navigateBack({
				delta: 1
			})
		},
		blur() {
			uni.hideKeyboard();
		},
		//加载默认搜索关键字
		loadDefaultKeyword() {
			//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
			this.defaultKeyword = '搜索热门目的地/景点';
		},

		//加载热门搜索
		loadHotKeyword() {
			//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
			uni.request({
				url:"http://121.40.30.19/search/hot",
				method:"get",
				success:(res)=>{
					console.log(res)
					this.hotKeywordList = res.data.data
				}
			})
		},
		//监听输入
		inputChange(event) {
			//兼容引入组件时传入参数情况
			var keyword = event.detail ? event.detail.value : event;
			if (!keyword) {
				this.keywordList = [];
				this.noResult = '无数据';
				this.isShowKeywordList = false;

				return;
			}
			this.isShowKeywordList = true;
			//以下示例截取淘宝的关键字，请替换成你的接口
			uni.request({
				url:'http://121.40.30.19/search/suggest',
				data:{
					'query':keyword,
					'hit':8
				},
				// type:"GET",
				success: (res)=> {
					console.log('请求',res)
					if (res.data.data && res.data.data.length) {
						this.keywordList = [];
						this.noResult = '有结果';
						this.keywordList = this.drawCorrelativeKeyword(res.data.data, keyword);
						this.isShowKeywordList = true;
					} else {
						this.keywordList = [];
						this.noResult = '暂无结果';
						this.isShowKeywordList = false;
					}
				}
			});
		},
		//高亮关键字
		drawCorrelativeKeyword(keywords, keyword) {
			var len = keywords.length;
			var	keywordArr = [];
			for (var i = 0; i < len; i++) {
				var row = keywords[i];
				console.log(row,1)
				//定义高亮#9f9f9f
				var html = row.replace(keyword, "<span style='color: #303133;font-weight:bold'>" + keyword + "</span>");
				html = '<div>' + html + '</div>';
				var tmpObj = {
					keyword: row,
					htmlStr: html
				};
				keywordArr.push(tmpObj);
			}
			return keywordArr;
		},
		Toresults() {
			var keyword = this.keyValue;
			uni.request({
				url:"http://121.40.30.19/search",
				data:{
					'query':keyword,
					'hit':8
				},
				success:(res)=> {
					console.log('搜素数据',res)
					uni.setStorageSync('article_id',res.data)
					console.log('存储数据',res.data)
					uni.navigateTo({
						url: '../searchResults/searchResults'
					});
				}
			})
			
		},
		//顶置关键字
		setKeyword(index) {
			this.keyword = this.keywordList[index].keyword;
		},
		//清除历史搜索
		oldDelete() {
			uni.showModal({
				content: '确定清除历史搜索记录？',
				success: res => {
					if (res.confirm) {
						console.log('用户点击确定');
						this.oldKeywordList = [];
						uni.removeStorage({
							key: 'OldKeys'
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		//热门搜索开关
		hotToggle() {
			this.forbid = this.forbid ? '' : '_forbid';
		},
		//执行搜索
		doSearch(keyword) {
			keyword = keyword === false ? this.keyword : keyword;
			this.keyword = keyword;
			this.saveKeyword(keyword); //保存为历史
			uni.showToast({
				title: keyword,
				icon: 'none',
				duration: 2000
			});
			//以下是示例跳转淘宝搜索，可自己实现搜索逻辑
			/*
				//#ifdef APP-PLUS
				plus.runtime.openURL(encodeURI('taobao://s.taobao.com/search?q=' + keyword));
				//#endif
				//#ifdef H5
				window.location.href = 'taobao://s.taobao.com/search?q=' + keyword
				//#endif
				*/
		},
		//保存关键字到历史记录
		saveKeyword(keyword) {
			uni.getStorage({
				key: 'OldKeys',
				success: res => {
					console.log(res);
					if (!res.data) {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys),
							success: res => {
								console.log(res);
								this.oldKeywordList = OldKeys; //更新历史搜索
							}
						});
					} else {
						var OldKeys = JSON.parse(res.data);
						// var OldKeys = res.data;
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				},
				fail: e => {
					console.error(e);
				}
			});
		},
		//加载历史搜索,自动读取本地Storage
		loadOldKeyword() {
			uni.getStorage({
				key: 'OldKeys',
				success: res => {
					console.log(res);
					var OldKeys = JSON.parse(res.data);

					// var OldKeys = res.data?res.data:[];
					this.oldKeywordList = OldKeys;
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
view {
	display: block;
}
.search-box {
	width: 100%;
	background-color: rgb(255, 255, 255);
	padding: 15upx 2.5%;
	display: flex;
	justify-content: space-between;
	position: sticky;
	top: 0;
}
.search-box .mSearch-input-box {
	width: 100%;
	height: 72rpx;
}
.search-box .input-box {
	width: 606rpx;
	flex-shrink: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}
.search-box .search-btn {
	width: 15%;
	margin: 0 0 0 2%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
	font-size: 28upx;
	color: #fff;
	background: linear-gradient(to right, #ff9801, #ff570a);
	border-radius: 60upx;
}
.search-box .input-box > input {
	width: 100%;
	height: 60upx;
	font-size: 32upx;
	border: 0;
	border-radius: 60upx;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	padding: 0 3%;
	margin: 0;
	background-color: #ff557f;
}

.search-keyword {
	width: 100%;
	background-color: rgb(242, 242, 242);
}
.keyword-list-box {
	height: calc(100vh - 110upx);
	padding-top: 10upx;
	border-radius: 20upx 20upx 0 0;
	background-color: #fff;
}
.keyword-entry-tap {
	background-color: #eee;
}
.keyword-entry {
	width: 94%;
	height: 96rpx;
	margin: 0 3%;
	font-size: 32rpx;
	color: #606266;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.keyword-entry .liIcon {
	margin-left: 40rpx;
	width: 16rpx;
	height: 16rpx;
	background:rgba(255,255,255,1);
	border:4rpx solid rgba(255,182,77,1);
	border-radius: 50%;
}
.keyword-entry .keyword-text {
	height: 96rpx;
	display: flex;
	align-items: center;
}
.keyword-entry .keyword-text {
	width: 90%;
	border-bottom: solid 0.5rpx #EDEFF2;
}

.search-bottom {
	font-size: 12px;
	color: #c0c0c0;
	margin-left: 15px;
}
.keyword-box {
	height: calc(100vh - 110upx);
	border-radius: 20upx 20upx 0 0;
	background-color: #fff;
}
.keyword-box .keyword-block {
	padding: 10upx 0;
}
.keyword-box .keyword-block .keyword-list-header {
	width: 100%;
	padding: 40rpx;
	font-size: 28rpx;
	font-weight: 600;
	color: #303133;
	display: flex;
	justify-content: space-between;
}
.keyword-box .keyword-block .keyword-list-header image {
	width: 34rpx;
	height: 34rpx;
}
.keyword-box .keyword-block .keyword {
	width: 100%;
	padding: 0 40rpx;
	display: flex;
	flex-flow: wrap;
	justify-content: flex-start;
}
.keyword-box .keyword-block .hotList {
	width: 100%;
	padding: 0 40rpx;
	display: flex;
	flex-flow: wrap;
	justify-content: flex-start;
}
.keyword-box .keyword-block .hotList .hotItem {
	width: 50%;
	display: flex;
	height: 28rpx;
	align-items: center;
	margin-bottom: 40rpx;
}

.hotItem {
	.hotImg {
		width: 28rpx;
		height: 28rpx;
		margin-right: 8rpx;
	}
	
	.hotContent {
		color: #303133;
		font-size: 28rpx;
		font-weight: 500;
	}
}
.keyword-box .keyword-block .hide-hot-tis {
	display: flex;
	justify-content: center;
	font-size: 28rpx;
	color: #6b6b6b;
}
.keyword-box .keyword-block .keyword > view {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8rpx;
	padding: 0 12rpx;
	margin: 0rpx 20rpx 20rpx 0;
	height: 52rpx;
	font-size: 28rpx;
	background-color: #edeff2;
	color: #606266;
}
.search-bottom {
	margin-left: 84rpx;
	font-size: 22rpx;
	color: #0091ff;
	margin-top: 22rpx;
}
.noResult {
	height: 220rpx;
	font-size: 24rpx;
	color: #606266;
	background-color: #f8f8f8;
	display: flex;
	justify-content: center;
	align-items: center;
}
/*  自定义导航栏样式 */
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
		/* margin-right: 20rpx; */
	}
	.fhsy{
		width: 40rpx;
		height: 40rpx;
	}
	.slottitle{
		margin-left: 220rpx;
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
