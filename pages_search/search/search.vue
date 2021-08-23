<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
				</view>
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
				@confirm="toSearchResults()"
				v-model="keyValue"
			></mSearch>
		</view>
		<view class="search-keyword">
			<scroll-view class="keyword-list-box" scroll-y scroll-x="false" v-if="isShowKeywordList">
				<block v-for="(row, index) in keywordList" :key="index">
					<view class="keyword-entry" hover-class="keyword-entry-tap">
						<!-- <veiw v-if="row.keyword.type" class="otherIcon"><u-icon size="32" :name="row.keyword.type == 'site' ? 'photo' : row.keyword.type ? 'map-fill' : ''"></u-icon></veiw> -->
						<veiw v-if="row.keyword.type" :class=" row.keyword.type == 'site' ? 'otherIcon' : 'otherIcon1'">
							<image :src="row.keyword.type == 'site'?'/static/images/attIcon.svg':'/static/images/adressIcon.svg'" ></image>
						</veiw>
						<view class="liIcon" v-else></view>
						<view class="keyword-text" @tap.stop="goSearch(row.keyword)"><rich-text :nodes="row.htmlStr"></rich-text></view>
						<view class="otherText" v-if="row.keyword.type">{{ row.keyword.type == 'site' ? '景点' : '目的地' }}</view>
					</view>
				</block>
				<view class="search-bottom" @click="toSearchResults()">
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
					<view class="hotList" >
						<view class="hotItem" v-for="(keyword, index) in hotKeywordList" @tap="doSearch(keyword)" :key="index" v-if="index < 10" >
							<view class="hotImg" >
								<image class=" " :src="`/static/images/icon-${index + 1>4?4:index + 1}.svg`"  mode="aspectFit"></image>
								<text class="rankNum" >{{ index + 1 }}</text>
							</view>
							<view class="hotContent" >{{ keyword}}</view>
						</view>
					</view>
					<view class="hide-hot-tis" v-if="hotKeywordList.length >= 10" @click="toHotRank">
						<view>点击查看更多热搜</view>
						<image class="moreRight" src="/static/images/moreR.svg" mode=""></image>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-if="isShowArticlieList">
			<view class="noResult">
				没找到“
				<veiw>{{ keyValue }}</veiw>
				”相关结果
			</view>
				<view class="wrap">
					<articleWaterfall :list="list"></articleWaterfall>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
//引用mSearch组件，如不需要删除即可
import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import articleWaterfall from '@/common/article-waterfall/article-waterfall.vue';

import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	data() {
		return {
			defaultKeyword: '搜索热门目的地/景点',
			keyValue: '',
			keywordList: [],
			oldKeywordList: [],
			hotKeywordList: [],
			// forbid: '',
			isShowArticlieList: false,
			isShowKeywordList: false,
			isShowHt: true,
			list: []
		};
	},
	onLoad() {
		let res = uni.getStorageSync('searchHistory')
		if(res){
			this.oldKeywordList = JSON.parse(res) || JSON.parse(res.value) ;
		}
		this.getHotKeyword()
	},
	components: {
		//引用mSearch组件，如不需要删除即可
		mSearch,
		uniNavBar,
		articleWaterfall
	},
	mixins: [MescrollMixin],
	methods: {
		//加载热门搜索
		getHotKeyword() {
			//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
			this.HTTP.request({
				url: '/search/hot',
				method: 'get',
				success: res => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					this.hotKeywordList = res.data.data.list;
				}
			});
		},
		getArticleList() {
			this.HTTP.request({
				url: '/article/list',
				data: {
					count: 6,
					page: 1,
					first_time: new Date().getTime()	
				},
				success: res => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					var list = res.data.data.list
					list.forEach((item1, index1) => {
						if (item1.cover_height > 0){
							item1.height = 340*item1.cover_height/item1.cover_width+'rpx'
						} else{
							item1.height = '220rpx'
						}
						item1.avatar = this.Utils.addImageProcess(item1.avatar, false, 60)
						item1.image = this.Utils.addImageProcess(item1.image, false, 40)
					})
					this.list = list;
				}
			});
		},
		// 点赞
		clickLike(e, index) {
			if (!this.Utils.isLogin()){
				return
			}
			
			let article = e.article_id;
			var that = this;
			this.HTTP.request({
				url: '/user/liked',
				data: {
					article_id: article,
					liked: e.liked == 0 ? 1 : 0
				},
				method: 'POST',
				success: res=> {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}

					this.list[index].liked = res.data.data.liked
					this.list[index].like_count = res.data.data.like_count
				}
			});
		},
		//监听输入
		inputChange(event) {
			//兼容引入组件时传入参数情况
			var keyword = event.detail ? event.detail.value : event;
			if (!keyword) {
				this.keywordList = [];
				this.isShowArticlieList = false;
				this.isShowKeywordList = false;
				this.isShowHt = true;
				return;
			}
			this.isShowKeywordList = true;
			this.HTTP.request({
				url: '/search/suggest',
				data: {
					query: keyword,
					hit: 8
				},
				// type:"GET",
				success: res => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					
					this.isShowHt = false;
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
					
					this.keywordList = this.drawCorrelativeKeyword(arr, keyword);
					if (this.keywordList && this.keywordList.length > 0){
						this.isShowArticlieList = false;
						this.isShowKeywordList = true;
					} else {
						this.getArticleList()
						this.isShowArticlieList = true;
						this.isShowKeywordList = false;
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
				
				//定义高亮#9f9f9f
				var html = row.replace(keyword, "<span style='color: #A86B13;font-weight:bold'>" + keyword + '</span>');
				html = '<div>' + html + '</div>';
				var tmpObj = {
					keyword: keywords[i],
					htmlStr: html
				};
				keywordArr.push(tmpObj);
			}
			return keywordArr;
		},
		
		toSearchResults() {
			uni.navigateTo({
				url: '/pages_search/searchResults/searchResults?keyword='+this.keyValue
			});
		},
		//清除历史搜索
		oldDelete() {
			uni.showModal({
				content: '确定清除历史搜索记录？',
				success: res => {
					if (res.confirm) {
						this.oldKeywordList = [];
						uni.removeStorage({
							key: 'searchHistory'
						});
					}
				}
			});
		},
		//热门搜索开关
		// hotToggle() {
		// 	this.forbid = this.forbid ? '' : '_forbid';
		// },
		//执行搜索
		doSearch(keyword) {
			if (!keyword) return false;

			keyword = keyword;
			uni.navigateTo({
				url: '/pages_search/searchResults/searchResults?keyword='+keyword
			});
			this.saveKeyword(keyword); //保存为历史
		},
		goSearch(keyword) {
			switch(keyword.type){
				case 'area':
					let obj = {
						state_id: keyword.state_id,
						name: keyword.name,
						image: keyword.image,
						city_id: keyword.city_id
					};
					uni.navigateTo({
						url: '/pages_content/provinces/provinces?state_id=' + 
						obj.state_id+"&city_id="+obj.city_id+"&name="+obj.name+"&image="+obj.image
					});
					break;
				case 'site':
					uni.navigateTo({
						url: '/pages_province/positionContent/positionContent?id=' + keyword.id
					});
					break
				default:
					uni.navigateTo({
						url: '/pages_search/searchResults/searchResults?keyword='+keyword.name
					});
			}
		},
		//保存关键字到历史记录
		saveKeyword(keyword) {
			var hisKey = uni.getStorageSync('searchHistory');
			if (!hisKey) {
				var searchHistory = [keyword];
				uni.setStorageSync('searchHistory', JSON.stringify(searchHistory));
				this.oldKeywordList = searchHistory;
				return 
			}
			var searchHistory = JSON.parse(hisKey);
			
			// var searchHistory = res.data;
			var findIndex = searchHistory.indexOf(keyword);
			if (findIndex == -1) {
				searchHistory.unshift(keyword);
			} else {
				searchHistory.splice(findIndex, 1);
				searchHistory.unshift(keyword);
			}
			searchHistory.length > 10 && searchHistory.pop();
			uni.setStorageSync('searchHistory',JSON.stringify(searchHistory));
			this.oldKeywordList = searchHistory;
		},
		
		// 跳转热搜榜单
		toHotRank(){
			uni.navigateTo({
				url:'/pages_search/hotSearchRank/hotSearchRank'
			})
		},
		// 跳转文章详情
		onPageJump(e) {
			let id = e.currentTarget.id;
			uni.navigateTo({
				url: '/pages_content/article/article?article_id=' + id
			});
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

.search-box {
	width: 100%;
	box-sizing: border-box;
	background-color: rgb(255, 255, 255);
	padding: 8rpx 28rpx 0;
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
	margin: 0 3% 0 0;
	padding-left: 40rpx;
	font-size: 32rpx;
	color: #606266;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.keyword-entry .liIcon {
	margin-left: 12rpx;
	margin-right: 12rpx;

	width: 16rpx;
	height: 16rpx;
	background: rgba(255, 255, 255, 1);
	border: 4rpx solid rgba(201, 202, 209, 1);
	border-radius: 50%;
}
.keyword-entry .otherIcon {
	width: 40rpx;
	height: 40rpx;
	background: rgba(92, 198, 110, 1);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	image{
		width: 24rpx;
		height: 24rpx;
		
	}
}
.keyword-entry .otherIcon1 {
	width: 40rpx;
	height: 40rpx;
	background: rgba(250, 140, 22, 1);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	image{
		width: 24rpx;
		height: 24rpx;
	}
}

.keyword-entry .otherText {
	font-size: 24rpx;
	// width: 60rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #606266;
	line-height: 24rpx;
	position: absolute;
	right: 30rpx;
}
.keyword-entry .keyword-text {
	height: 96rpx;
	display: flex;
	color: #303133;
	font-size: 16px;
	margin-left: 16rpx;
	font-family: PingFangSC-Regular, PingFang SC;
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
	align-items: center;
	height: 34rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #909399;
	line-height: 34rpx;
	margin-top: 16rpx;
}
.moreRight{
	width: 14rpx;
	height: 14rpx;
	margin-left: 4rpx;
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
	margin-top: 8rpx;
}

.wrap {
	width: 750rpx;
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;
	padding: 0 14rpx 0 28rpx;
	background: #F8F8F8;
}
</style>
