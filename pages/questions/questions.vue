<template>
	<view>
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
		<!-- 问题 -->
		<view class="search-box">
			<!-- mSearch组件 如果使用原样式，删除组件元素-->
			<view class="" style="display: flex;align-items: center;">
				<!-- <view class="searchTitle">
					标题：
				</view> -->
				<!-- <u-input v-model="questionsValue"  :type="textarea" :clearable="false" placeholder="标题: 清晰描述你的疑问" 
				placeholderStyle="font-size: 20px;color: #303133;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;" /> -->
				<u-search 
					v-model="questionsValue"
					bg-color="#ffffff" 
					placeholder="标题: 清晰描述你的疑问" 
					:clearabled="false" 
					:show-action="false" 
					placeholder-color="#303133"
					:input-style="inputStyle"
					search-icon-color="#ffffff"
					@change="inputChange"
				></u-search>
			</view>
			
			<view class="nextBtn" @click="toQuestions()">
				下一步
			</view>
		</view>
		<view class="search-keyword">
			<scroll-view class="keyword-list-box" scroll-y scroll-x="false" v-if="isShowKeywordList">
				<block v-for="(row, index) in keywordList" :key="index">
					<view class="keyword-entry" hover-class="keyword-entry-tap">
						<!-- <view class="liIcon" v-if="!row.keyword.type"></view> -->
						<!-- <veiw v-if="row.keyword.type" :class=" row.keyword.type == 'site' ? 'otherIcon' : 'otherIcon1'">
							<image v-if="row.keyword.type == 'site'" src="../../static/images/attIcon.svg" ></image>
							<image v-if="row.keyword.type == 'area'" src="../../static/images/adressIcon.svg" mode=""></image>
						</veiw> -->
						<view class="keyword-text" @tap.stop="goSearch(row.keyword)">
							<rich-text :nodes="row.htmlStr"></rich-text>
							<view class="kTB">
								{{row.keyword.city}}'· <text>{{row.keyword.read}}</text>人看过 · <text>{{row.keyword.reply_count}}</text>回答
							</view>
						</view>
						<!-- <view class="otherText" v-if="row.keyword.type">{{ row.keyword.type == 'site' ? '景点' : '目的地' }}</view> -->
					</view>
				</block>
			</scroll-view>
		</view>
		
		<view class="tipsBox">
			<view class="tipsTitle">
			 	<text>提示</text>
				<view class="tipsLine"></view>
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
				questionsValue:'',
				inputStyle:{
					'width':'440rpx',
					'fontSize': '40rpx',
					'fontFamily': 'PingFangSC-Semibold, PingFang SC',
					'fontWeight': '600',
					'color': '#303133'
				}
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
					url: this.globalUrl + '/questions/matchtitle',
					data: {
						title: keyword,
						page:1,
						count: 10
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
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
								console.log(this.keywordList)
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
					var row = keywords[i].title;
					console.log(row, 1);
					//定义高亮#9f9f9f
					var html = row.replace(keyword, "<span style='background: rgba(255, 229, 18, 0.3);'>" + keyword + '</span>');
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: keywords[i],
						htmlStr: html
					};
					keywordArr.push(tmpObj);
				}
			
				return keywordArr;
			},
			// 点击搜索列表跳转
			goSearch(keyword) {
				console.log(keyword);
				var question_id = keyword.question_id
				uni.navigateTo({
					url: '/pages/questionsDetail/questionsDetail?question_id=' + question_id
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			home() {
				uni.switchTab({
					url: '/pagesA/index/index'
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
	padding: 8rpx 28rpx 0 0;
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
	width: 100%;
	position: relative;
	margin: 0 3% 0 0;
	padding:0rpx 24rpx;
	font-size: 32rpx;
	color: #606266;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.keyword-entry .keyword-text {
	width: 100%;
	font-size: 30rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 30rpx;
	padding: 30rpx 0rpx;

}
.keyword-entry .keyword-text {
	border-top: solid 0.5rpx #edeff2;
}
.kTB{
	margin-top: 16rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #606266;
	line-height: 24rpx;
	text{
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #606266;
		line-height: 24rpx;

	}

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
.nextBtn{
	width: 124rpx;
	height: 52rpx;
	background: #FFE512;
	border-radius: 26rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 52rpx;
	text-align: center;

}
// 提示
.tipsBox{
	margin-top: 240rpx;
	padding: 28rpx;
	.tipsTitle{
		margin-bottom: 20rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #303133;
		line-height: 32rpx;

		.tipsLine{
			width: 64rpx;
			height: 20rpx;
			background: #FFE512;
			border-radius: 2rpx 10rpx 2rpx 2rpx;
			margin-top: -16rpx;

		}
	}
	.tipsText{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 42rpx;

	}
}
</style>
