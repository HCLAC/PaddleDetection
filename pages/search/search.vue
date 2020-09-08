<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft"><image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" /></view>
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
				@blur="blur"
			></mSearch>
		</view>
		<view class="search-keyword">
			<scroll-view class="keyword-list-box" scroll-y scroll-x="false" v-if="isShowKeywordList">
				<block v-for="(row, index) in keywordList" :key="index">
					<view class="keyword-entry" hover-class="keyword-entry-tap">
						<view class="liIcon" v-if="!row.keyword.type"></view>
						<veiw v-if="row.keyword.type" class="otherIcon"><u-icon size="32" :name="row.keyword.type == 'site' ? 'photo' : row.keyword.type ? 'map-fill' : ''"></u-icon></veiw>
						<view class="keyword-text" @tap.stop="goSearch(row.keyword)"><rich-text :nodes="row.htmlStr"></rich-text></view>
						<view class="otherText" v-if="row.keyword.type">{{ row.keyword.type == 'site' ? '景点' : '目的地' }}</view>
					</view>
				</block>
				<view class="search-bottom" @click="Toresults(keyword)">
					搜索更多关于“
					<veiw>{{ keyValue }}</veiw>
					”的结果
				</view>
			</scroll-view>
			<scroll-view class="keyword-box" scroll-y scroll-x="false" v-if="isShowHt">
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
					<view class="keyword-list-header1">
						<view>热门搜索</view>
						<!-- <view><image @tap="hotToggle" :src="'/static/images/attention' + forbid + '.png'"></image></view> -->
					</view>
					<view class="hotList" v-if="forbid == ''">
						<view class="hotItem" v-for="(keyword, index) in hotKeywordList" @tap="doSearch(keyword)" :key="index">
							<!-- <image class="hotImg " :src="`../../static/images/icon-${index+1>=3?3:index+1}.png`" mode=""></image> -->
							<view class="hotImg">
								<image class=" " :src="`../../static/images/icon-${index + 1}.svg`" mode="aspectFit"></image>
								<text class="rankNum">{{ index + 1 }}</text>
							</view>
							<view class="hotContent">{{ keyword }}</view>
						</view>
					</view>
					<view class="hide-hot-tis" v-else><view>当前搜热门搜索已隐藏</view></view>
				</view>
			</scroll-view>
		</view>
		<view v-if="noResult == '暂无结果'">
			<view class="noResult">
				没找到“
				<veiw>{{ keyValue }}</veiw>
				”相关结果
			</view>
				<view class="wrap">
					<view class="left">
						<view class="demo-warter" v-for="(item, index) in list" :key="index" v-if="index % 2 == 0">
							<view class="" @click="onPageJump" :id="item.article_id">
								<view class="demo-top">
									<view class="imgBox">
										<image class="demo-image" :src="item.image" :index="index" lazy-load="true" mode="widthFix"></image>
										<view class="adress">
											<view class="adreessIcon"><image class="" src="../../static/images/iconMap3.svg" mode=""></image></view>
										
											<view class="adressText">{{ item.location }}</view>
										</view>
									</view>
									
								</view>
								<view class="titleTip">
									<view class="demo-tag">
										<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
										<view class="demo-tag-owner" v-if="item.type == 2">攻略</view>
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
									<image src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
									<image src="../../static/images/heart-actived.svg" v-if="item.liked == 1"></image>
									{{ item.like_count || 0 }}
								</view>
							</view>
						</view>
					</view>
					<view class="right">
						<view class="demo-warter" v-for="(item, index) in list" :key="index" v-if="index % 2 == 1">
							<view class="" @click="onPageJump" :id="item.article_id">
								<view class="demo-top">
									<view class="imgBox">
										<image class="demo-image" :src="item.image" :index="index" lazy-load="true" mode="widthFix"></image>
										<view class="adress">
											<view class="adreessIcon"><image class="" src="../../static/images/iconMap3.svg" mode=""></image></view>
										
											<view class="adressText">{{ item.location }}</view>
										</view>
									</view>
									
								</view>
								<view class="titleTip">
									<view class="demo-tag">
										<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
										<view class="demo-tag-owner" v-if="item.type == 2">攻略</view>
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
									<image src="../../static/images/heart.svg" v-if="item.liked == 0"></image>
									<image src="../../static/images/heart-actived.svg" v-if="item.liked == 1"></image>
									{{ item.like_count || 0 }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
//引用mSearch组件，如不需要删除即可
import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import httpType from '../../httpType.js';

import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
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
			isShowHt: true,
			list: [],
			leftList: [],
			rightList: [],
			token: '',
			liked: '',
			isFocus:true
		};
	},
	onLoad() {
		this.init(), this.getResults();
	},
	components: {
		//引用mSearch组件，如不需要删除即可
		mSearch,
		uniNavBar
	},
	mixins: [MescrollMixin],
	methods: {
		getResults() {
			var that = this;
			uni.getStorage({
				key: 'article_id',
				success: function(res) {
					console.log('取数据', res);
					that.list = res.data.data.list;
					console.log('list----', that.list);
				}
			});
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
				success: function(res) {
					console.log('点赞', res);
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
									});
								}
							}
						});
						return;
					}

					that.list[index].liked = e.liked == 1 ? 0 : 1;
					that.list[index].like_count = e.liked == 1 ? e.like_count + 1 : e.like_count - 1;
				}
			});
		},
		init() {
			this.loadDefaultKeyword();
			this.loadOldKeyword();
			this.loadHotKeyword();
		},
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		focus() {
			this.active = true;
			//HM修改 增加获取焦点判断
			if (this.inputVal) {
				this.isDelShow = true;
			}
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
				url: this.globalUrl + '/search/hot',
				method: 'get',
				success: res => {
					console.log(res);
					this.hotKeywordList = res.data.data;
				}
			});
		},
		//监听输入
		inputChange(event) {
			//兼容引入组件时传入参数情况
			var keyword = event.detail ? event.detail.value : event;
			if (!keyword) {
				this.keywordList = [];
				this.noResult = '无数据';
				this.isShowKeywordList = false;
				this.isShowHt = true;
				return;
			}
			this.isShowKeywordList = true;
			uni.request({
				url: this.globalUrl + '/search/suggest',
				data: {
					query: keyword,
					hit: 8
				},
				// type:"GET",
				success: res => {
					console.log('请求', res);
					if (res.data.code == 0) {
						if ((res.data.data.list && res.data.data.list.length) || res.data.data.special) {
							this.keywordList = [];
							let arr = [];
							if (res.data.data.special) {
								arr.push({ ...res.data.data.special });
							}
							if (res.data.data.list && res.data.data.list.length) {
								res.data.data.list.forEach(item => {
									arr.push({ ...item });
								});
							}

							this.noResult = '有结果';
							this.keywordList = this.drawCorrelativeKeyword(arr, keyword);
							this.isShowKeywordList = true;
							this.isShowHt = false;
						} else {
							this.keywordList = [];
							this.noResult = '暂无结果';
							this.isShowKeywordList = false;
							this.isShowHt = false;
						}
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
				}
			});
		},
		//高亮关键字
		drawCorrelativeKeyword(keywords, keyword) {
			var len = keywords.length;
			var keywordArr = [];
			for (var i = 0; i < len; i++) {
				var row = keywords[i].name;
				console.log(row, 1);
				//定义高亮#9f9f9f
				var html = row.replace(keyword, "<span style='color: #303133;font-weight:bold'>" + keyword + '</span>');
				html = '<div>' + html + '</div>';
				var tmpObj = {
					keyword: keywords[i],
					htmlStr: html
				};
				keywordArr.push(tmpObj);
			}

			return keywordArr;
		},
		Toresults() {
			var keyword = this.keyValue;
			this.keyword = keyword;
			// this.defaultKeyword = keyword;
			this.saveKeyword(keyword); //保存为历史
			uni.showToast({
				title: keyword,
				icon: 'none',
				duration: 2000
			});
			uni.request({
				url: this.globalUrl + '/search',
				data: {
					query: keyword,
					hit: 8
				},
				success: res => {
					console.log('搜素数据', res);
					uni.setStorageSync('article_id', res.data);
					console.log('存储数据', res.data);
					uni.navigateTo({
						url: '../searchResults/searchResults'
					});
				}
			});
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
			if (!keyword) return false;

			keyword = keyword === false ? this.keyword : keyword;
			this.keyword = keyword;
			// this.defaultKeyword = keyword;
			this.saveKeyword(keyword); //保存为历史
			uni.showToast({
				title: keyword,
				icon: 'none',
				duration: 2000
			});
			uni.request({
				url: this.globalUrl + '/search',
				data: {
					query: keyword,
					hit: 8
				},
				success: res => {
					console.log('搜素数据', res);
					uni.setStorageSync('article_id', res.data);
					console.log('存储数据', res.data);
					uni.navigateTo({
						url: '../searchResults/searchResults'
					});
				}
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
		goSearch(keyword) {
			console.log(keyword);

			if (keyword.type) {
				if (keyword.type == 'area') {
					let obj = {
						state_id: keyword.state_id,
						name: keyword.name,
						image: keyword.image,
						city_id: keyword.city_id
					};
					uni.navigateTo({
						url: '/pages/provinces/provinces?id=' + JSON.stringify(obj)
					});
				}
				if (keyword.type == 'site') {
					uni.navigateTo({
						url: '/pages/positionContent/positionContent?id=' + keyword.id
					});
				}
			} else {
				this.defaultKeyword = keyword.name;
				this.saveKeyword(keyword.name); //保存为历史
				uni.showToast({
					title: keyword.name,
					icon: 'none',
					duration: 2000
				});
				uni.request({
					url: this.globalUrl + '/search',
					data: {
						query: keyword.name,
						hit: 8
					},
					success: res => {
						console.log('搜素数据', res);
						uni.setStorageSync('article_id', res.data);
						console.log('存储数据', res.data);
						uni.navigateTo({
							url: '../searchResults/searchResults'
						});
					}
				});
			}
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
			
			var hisKey = uni.getStorageSync('OldKeys');
			if (!hisKey) {
				var OldKeys = [keyword];
				uni.setStorageSync('OldKeys',JSON.stringify(OldKeys));
				this.oldKeywordList = OldKeys;

			} else {
				var OldKeys = JSON.parse(hisKey);
				
				// var OldKeys = res.data;
				var findIndex = OldKeys.indexOf(keyword);
				if (findIndex == -1) {
					OldKeys.unshift(keyword);
				} else {
					OldKeys.splice(findIndex, 1);
					OldKeys.unshift(keyword);
				}
				OldKeys.length > 10 && OldKeys.pop();
				uni.setStorageSync('OldKeys',JSON.stringify(OldKeys));
				this.oldKeywordList = OldKeys;
			
			}
		},
		//加载历史搜索,自动读取本地Storage
		loadOldKeyword() {
			let res = uni.getStorageSync('OldKeys')
			if(res){
				this.oldKeywordList = JSON.parse(res) ;
			}else{
				this.oldKeywordList = [] ;
			}
			
		},
		/*下拉刷新的回调, 有三种处理方式:*/
		downCallback() {
			// 第1种: 请求具体接口
			// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
			this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
			// this.mescroll.endSuccess()
			// 此处仍可以继续写其他接口请求...
			// 调用其他方法...
		},
		/*上拉加载的回调*/
		upCallback(page) {
			// mescroll.setPageSize(6)
			// console.log('上拉刷新数据', city)
			let pageNum = page.num; // 页码, 默认从1开始
			console.log('pagem=num----', pageNum);
			let pageSize = 8; // 页长, 默认每页10条
			var that = this;
		}
	}
};
</script>
<style lang="scss" scoped>
view {
	display: block;
}
.content {
	width: 100%;
	overflow-x: hidden;
}
.left,
.right {
	display: inline-block;
	margin-left: 10rpx;
	vertical-align: top;
	width: 48%;
}
.search-box {
	width: 100%;
	box-sizing: border-box;
	background-color: rgb(255, 255, 255);
	padding: 15upx 2.5%;
	display: flex;
	justify-content: space-between;
	position: sticky;
	top: 0;
}
.search-box .mSearch-input-box {
	// width: 100%;
	// height: 72rpx;
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
	box-sizing: border-box;
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
	box-sizing: border-box;
	background-color: rgb(242, 242, 242);
}
.keyword-list-box {
	height: calc(100vh - 110upx);
	padding-top: 10upx;
	// border-radius: 20upx 20upx 0 0;
	background-color: #fff;
}
.keyword-entry-tap {
	background-color: #eee;
}
.keyword-entry {
	position: relative;
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
	margin-right: 30rpx;

	width: 16rpx;
	height: 16rpx;
	background: rgba(255, 255, 255, 1);
	border: 4rpx solid rgba(255, 182, 77, 1);
	border-radius: 50%;
}
.keyword-entry .otherIcon {
	margin-left: 35rpx;
	margin-right: 25rpx;
}
.keyword-entry .otherText {
	font-size: 16rpx;
	width: 60rpx;
	position: absolute;
	right: 30rpx;
}
.keyword-entry .keyword-text {
	height: 96rpx;
	display: flex;
	align-items: center;
}
.keyword-entry .keyword-text {
	width: 90%;
	border-bottom: solid 0.5rpx #edeff2;
}

.search-bottom {
	font-size: 12px;
	color: #c0c0c0;
	margin-left: 15px;
}
.keyword-box {
	width: 100%;
	box-sizing: border-box;
	// height: calc(100vh - 110upx);
	// border-radius: 20upx 20upx 0 0;
	background-color: #fff;
}
.keyword-box .keyword-block {
	// padding: 10upx 0;
}
.keyword-box .keyword-block .keyword-list-header {
	width: 100%;
	box-sizing: border-box;
	padding: 40rpx;
	font-size: 28rpx;
	font-weight: 600;
	color: #303133;
	display: flex;
	justify-content: space-between;
}
.keyword-box .keyword-block .keyword-list-header1 {
	width: 100%;
	box-sizing: border-box;
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
	box-sizing: border-box;
	padding: 0 40rpx;
	display: flex;
	flex-flow: wrap;
	justify-content: flex-start;
}
.keyword-box .keyword-block .hotList {
	width: 100%;
	box-sizing: border-box;
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
		width: 32rpx;
		height: 32rpx;
		line-height: 32rpx;
		align-self: center;
		position: relative;
		image {
			width: 100%;
			height: 100%;
		}
		.rankNum {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			font-size: 20rpx;
			font-family: HelveticaNeue-Bold, HelveticaNeue;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
			line-height: 20rpx;
		}
	}

	.hotContent {
		margin-left: 8rpx;
		color: rgba(48, 49, 51, 1);
		font-size: 28rpx;
		// line-height: 28rpx;
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
	/* margin-right: 20rpx; */
}
.fhsy {
	width: 40rpx;
	height: 40rpx;
}
.slottitle {
	margin-left: 220rpx;
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
// 瀑布流
/* 正在旅行 */
.left,
.right {
	display: inline-block;
	margin-left: 20rpx;
	vertical-align: top;
	width: 46%;
}
.touring {
	margin-top: 24rpx;
}
.touring .tourtext {
	width: 160rpx;
	height: 104rpx;
	line-height: 104rpx;
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
}
.demo-warter-l {
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

.demo-image {
	min-height: 300rpx !important;
	max-height: 460rpx;
	width: 100%;
	border-radius: 8rpx 8rpx 0 0;
	position: relative;
}

.adress {
	position: absolute;
	left: 0;
	bottom: 8rpx;
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
	font-size: 22rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(96, 98, 102, 1);
	align-items: center;
	margin-right: 20rpx;
}

.count image {
	width: 26rpx;
	height: 26rpx;
	margin-right: 8rpx;
}
</style>
