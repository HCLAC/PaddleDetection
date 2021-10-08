<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" title="问答列表">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 搜索框 -->
		<view class="searchBox">
			<u-search v-model="keyword" @search="search" @custom="custom" :show-action="true" search-icon-color="#c9cad1" placeholder="输入搜索内容" placeholder-color="#c9cad1" action-text="取消" :animation="true"></u-search>
		</view>
		<meTabs class="mineQuestionTabs" v-model="tabIndex" :tabs="tabList" @change="tabChange" :fixed="isFixed" :tab-width="120"></meTabs>
		<questionList ref="mescrollItem" v-for="(tab,i) in tabList" :key="i" :i="i" :index="tabIndex" :keyword="keyword"></questionList>
		<!-- 提问按钮 -->
		<view class="questionsBtn" @click="toQuestions">
			<image src="/static/images/twIcon.svg"></image>
		</view>
	</view>
</template>

<script>
import MescrollMoreMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more.js';
import meTabs from '@/common/me-tabs/me-tabs.vue';
import questionList from '@/common/article-mescroll-item/question-list.vue';
	export default {
		mixins: [MescrollMoreMixin],
		components: {
			meTabs,
			questionList
		},
		data() {
			return {
				tabIndex: 0,
				tabList: ['精选问答','最新问答'], //'发布的问题',
				keyword:'',
				state_id:'',
				city_id:'',
				isFixed:false,
				cardheight: 0
			};
		},
		// #ifdef MP-BAIDU
		onInit(query) {
		// #endif
		// #ifndef MP-BAIDU
		onLoad(query) {
		// #endif
			this.state_id = query.state_id
			this.city_id = query.city_id
		}, 
		mounted() {
			this.calcCardHeight()
		},
		onPageScroll(e) {
			if (e.scrollTop >  this.cardheight) {
				this.isFixed = true;
			} else {
				this.isFixed = false;
			}
		},
		methods:{
			calcCardHeight(){
				if (this.isFixed){
					return
				}
				const query = uni.createSelectorQuery().in(this);
				setTimeout(() => {
					query.select('.mineQuestionTabs').boundingClientRect(data => {
						this.cardheight = data.top-data.height
					}).exec();
				}, 500);
			},
			// 切换
			tabChange(index){
				this.tabIndex = index
				this.keyword = ''
			},
			// 搜索问题
			search(value){
				this.keyword = value
			},
			// 取消搜索
			custom(){
				this.keyword = ''
			},
			// 提问按钮
			toQuestions(){
				if (!this.Utils.isLogin()){
					return
				}
				uni.navigateTo({
					url:'/pages_questions/questions/questions'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
// 搜索框
.searchBox{
	padding: 8rpx 28rpx;
}
// 问答列表
.answersList{
	
}
.myCollection {
	border-radius: 12px 12px 0rpx 0rpx;
	background-color: #fff;
	color: #303133;
	width: 100%;
	padding-top: 28rpx;
	display: flex;
	border-bottom: 2rpx solid #edeff2;
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
	height: 32rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 32rpx;
}
.favText1{
	height: 26rpx;
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #909399;
	line-height: 26rpx;
	margin-top: 8rpx;
}
.favLine{
	width: 128rpx;
	height: 12rpx;
	background: #FFE512;
	border-radius: 12rpx;

	margin-top: -6rpx;
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
	width: 128rpx;
	height: 12rpx;
	background: #FFE512;
	border-radius: 12rpx;
	
	margin-top: -6rpx;
}
.fixTabs {
	position: fixed;
	top: 126rpx;
	z-index: 2;
	height: 108rpx;
	padding-top: 58rpx;
	display: flex;
}
.noFix {
	z-index: 1000;
}

.newestList{
	.card{
		margin: 28rpx 28rpx;
		margin-bottom: 0rpx;
		padding-bottom: 40rpx;
		border-bottom: 2rpx solid #edeff2;
		.title{
			font-size: 34rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			line-height: 48rpx;

		}
		.content{
			font-size: 30rpx;
			font-family: PingFangSC-Light, PingFang SC;
			font-weight: 300;
			color: #606266;
			line-height: 42rpx;
			margin-top: 12rpx;
		}
		.authorBox{
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.author{
				display: flex;
				align-items: center;
				image{
					width: 48rpx;
					height: 48rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}
				text{
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #303133;
					line-height: 34rpx;

				}
			}
			.lookAnswers{
				display: flex;
				align-items: center;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
				line-height: 34rpx;
				.look{
					margin-right: 16rpx;
				}
			}
		}
	}
}
// 提问按钮
.questionsBtn{
	width: 88rpx;
	height: 88rpx;
	background: #FFE512;
	box-shadow: 0rpx 16rpx 56rpx 0rpx rgba(255, 229, 18, 0.4);
	border-radius: 50%;
	position: fixed;
	bottom: 400rpx;
	right: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	image{
		width: 48rpx;
		height: 48rpx;
	}
}
</style>
