<template>
	<view class="content">
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
					<uni-icons type="arrowleft" class="icons" color="#333333" size="22" @click="back" />
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
				@search="doSearch(false)"
				@input="inputChange"
				@confirm="doSearch(false)"
				v-model="keyValue"
			></mSearch>
			<!-- 原样式 如果使用原样式，恢复下方注销代码 -->
			<!-- 						
			<view class="input-box">
				<input type="text" :adjust-position="true" :placeholder="defaultKeyword" @input="inputChange" v-model="keyword" @confirm="doSearch(false)"
				 placeholder-class="placeholder-class" confirm-type="search">
			</view>
			<view class="search-btn" @tap="doSearch(false)">搜索</view> 
			 -->
			<!-- 原样式 end -->
		</view>
		<view class="search-keyword">
			<scroll-view class="keyword-list-box" scroll-y v-show="isShowKeywordList">
				<block v-for="(row, index) in keywordList" :key="index">
					<view class="keyword-entry" hover-class="keyword-entry-tap">
						<view class="liIcon"></view>
						<view class="keyword-text" @tap.stop="doSearch(keywordList[index].keyword)" @click="Toresults"><rich-text :nodes="row.htmlStr"></rich-text></view>
					</view>
				</block>
				<view class="search-bottom">
					搜索更多关于“
					<veiw>{{ keyValue }}</veiw>
					”的结果
				</view>
			</scroll-view>
			<scroll-view class="keyword-box" scroll-y v-show="noResult != '暂无结果'">
				<view class="keyword-block" v-if="oldKeywordList.length > 0">
					<view class="keyword-list-header">
						<view>历史记录</view>
						<view><image @tap="oldDelete" src="/static/images/delete.png"></image></view>
					</view>
					<view class="keyword">
						<view v-for="(keyword, index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">{{ keyword }}</view>
					</view>
				</view>
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<view><image @tap="hotToggle" :src="'/static/images/attention' + forbid + '.png'"></image></view>
					</view>
					<view class="hotList" v-if="forbid == ''">
						<view class="hotItem" v-for="(keyword, index) in hotKeywordList" @tap="doSearch(keyword)" :key="index">
							<!-- <image class="hotImg " :src="`../../static/images/icon-${index+1>=3?3:index+1}.png`" mode=""></image> -->
							<image class="hotImg " :src="`../../static/images/icon-${index+1}.png`" mode=""></image>
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
			<touring></touring>
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
			isShowKeywordList: false
		};
	},
	onLoad() {
		this.init();
	},
	components: {
		//引用mSearch组件，如不需要删除即可
		mSearch,
		touring,
		uniNavBar
	},
	methods: {
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
			var len = keywords.length,
				keywordArr = [];
			for (var i = 0; i < len; i++) {
				var row = keywords[i];
				//定义高亮#9f9f9f
				var html = row[0].replace(keyword, "<span style='color: #303133;font-weight:bold'>" + keyword + '</span>');
				html = '<div>' + html + '</div>';
				var tmpObj = {
					keyword: row[0],
					htmlStr: html
				};
				keywordArr.push(tmpObj);
			}
			return keywordArr;
		},
		Toresults() {
			var keyword = this.keyword;
			uni.request({
				url:"http://121.40.30.19/search",
				data:{
					'query':keyword,
					'hit':8
				},
				success:(res)=> {
					console.log(res)
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
<style lang="scss">
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
	background-color: #ffffff;
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
	height: 80upx;
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
	border: 4rpx solid #ffb64d;
	border-radius: 50%;
}
.keyword-entry .keyword-text {
	height: 80rpx;
	display: flex;
	align-items: center;
}
.keyword-entry .keyword-text {
	width: 90%;
	border-bottom: solid 1rpx #e7e7e7;
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
		font-weight:500;
		color:rgba(0,0,0,1);
	}
	.button-v-line{
		width: 1px;
		height: 18px;
		background-color: #2f2f2f;
		margin: 0 8px;
	}
	
	
</style>
