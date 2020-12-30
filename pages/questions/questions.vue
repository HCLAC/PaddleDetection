<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">我要提问</view>
			</uni-nav-bar>
		</view>
		<!-- 问题 -->
		<view class="search-box">
			<!-- mSearch组件 如果使用原样式，删除组件元素-->
			<view class="" style="display: flex;align-items: center;">
				<view class="">
					标题：
				</view>
				<u-input v-model="questionsValue" :type="textarea" :clearable="false" placeholder="清晰描述你的疑问" />
			</view>
			
			<view class="" @click="toQuestions()">
				下一步
			</view>
			<!-- <mSearch
				class="mSearch-input-box"
				:mode="2"
				button="inside"
				:placeholder="defaultKeyword"
				
				@search="doSearch(keyword)"
				@input="inputChange"
				confirm-type="search"
				@confirm="Toresults()"
				v-model="keyValue"
			></mSearch> -->
		</view>
		<view class="search-keyword">
			<scroll-view class="keyword-list-box" scroll-y scroll-x="false" v-if="isShowKeywordList">
				<block v-for="(row, index) in keywordList" :key="index">
					<view class="keyword-entry" hover-class="keyword-entry-tap">
						<view class="liIcon" v-if="!row.keyword.type"></view>
						<veiw v-if="row.keyword.type" :class=" row.keyword.type == 'site' ? 'otherIcon' : 'otherIcon1'">
							<image v-if="row.keyword.type == 'site'" src="../../static/images/attIcon.svg" ></image>
							<image v-if="row.keyword.type == 'area'" src="../../static/images/adressIcon.svg" mode=""></image>
						</veiw>
						<view class="keyword-text" @tap.stop="goSearch(row.keyword)"><rich-text :nodes="row.htmlStr"></rich-text></view>
						<view class="otherText" v-if="row.keyword.type">{{ row.keyword.type == 'site' ? '景点' : '目的地' }}</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<view v-if="noResult == '暂无结果'">
			<view class="noResult">
				没找到“
				<veiw>{{ keyValue }}</veiw>
				”相关结果
			</view>
		</view>
		<view class="tipsBox">
			<view class="tipsTitle">
				提示
			</view>
			<view class="tipsText">
				1.用户只可通过文字进行问答，标题越描述清晰完整，越容易收到满意的回答哦~
			</view>
			<view class="tipsText">
				2.如果有更复杂的问题说明，可在“下一步”进行补充。
			</view>
		</view>
	</view>
</template>

<script>
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	export default {
		data() {
			return {
				defaultKeyword: '',
				keyValue: '',
				keywordList: [],
				oldKeywordList: [],
				hotKeywordList: [],
				noResult: null,
				isShowKeywordList: false,
				questionsValue:''
			};
		},
		components: {
			mSearch
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				this.loadDefaultKeyword();
			},
			toQuestions(){
				var title = this.questionsValue
				uni.navigateTo({
					url:'/pages/questionsPage/questionsPage?title=' +  title
				})
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.defaultKeyword = '清晰描述您的疑问';
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
			Toresults() {
				var keyword = this.keyValue;
				this.keyword = keyword;
				// this.defaultKeyword = keyword;
				this.saveKeyword(keyword); //保存为历史
				// uni.showToast({
				// 	title: keyword,
				// 	icon: 'none',
				// 	duration: 2000
				// });
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
						if(res.data.code == 0){
							uni.navigateTo({
								url: '../searchResults/searchResults'
							});
						}
					}
				});
			},
			//执行搜索
			doSearch(keyword) {
				if (!keyword) return false;
			
				keyword = keyword === false ? this.keyword : keyword;
				this.keyword = keyword;
				// this.defaultKeyword = keyword;
				this.saveKeyword(keyword); //保存为历史
				// uni.showToast({
				// 	title: keyword,
				// 	icon: 'none',
				// 	duration: 2000
				// });
				uni.request({
					url: this.globalUrl + '/search',
					data: {
						query: keyword,
						hit: 8
					},
					success: res => {
						console.log('搜素数据', res);
						uni.setStorageSync('article_id', res.data);
						if(res.data.code == 0){
							uni.navigateTo({
								url: '../searchResults/searchResults'
							});
						}
						
					}
				})
				
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
					// uni.showToast({
					// 	title: keyword.name,
					// 	icon: 'none',
					// 	duration: 2000
					// });
					uni.request({
						url: this.globalUrl + '/search',
						data: {
							query: keyword.name,
							hit: 8
						},
						success: res => {
							console.log('搜素数据', res);
							uni.setStorageSync('article_id', res.data);
							if(res.data.code == 0){
								uni.navigateTo({
									url: '../searchResults/searchResults'
								});
							}
						}
					});
				}
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			home() {
				uni.switchTab({
					url: '/pages/index/index'
				});
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
// 输入框
.search-box {
	width: 100%;
	box-sizing: border-box;
	background-color: rgb(255, 255, 255);
	padding: 8rpx 28rpx 0;
	display: flex;
	align-items: center;
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
// 提示
.tipsBox{
	padding: 28rpx;
	.tipsTitle{
		margin-bottom: 20rpx;
	}
	.tipsText{
		
	}
}
</style>
