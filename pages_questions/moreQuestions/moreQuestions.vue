<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" :status-bar="true" title="问答列表">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 搜索框 -->
		<view class="searchBox">
			<u-search v-model="keyword" @search="search" @custom="custom" :show-action="true" search-icon-color="#c9cad1" placeholder="输入搜索内容" placeholder-color="#c9cad1" action-text="取消" :animation="true"></u-search>
			<!-- <mSearch
				class="mSearch-input-box"
				:mode="2"
				button="inside"
				placeholder="输入搜索内容"
				
				@search="search"
				v-model="keyword"
			></mSearch> -->
		</view>
		<!-- 问答列表 -->
		<view class="answersList">
			<view class="myCollection" :class="isFixed ? 'fixTabs' : 'noFix'" id="selectcard" >
				<view class="favBox" @click="change" >
					<view class="favBT">
						<view :class="tabCurrent == 0 ?'favText' : 'favText1 '" >
							精选问答
						</view>
						<view class="favLine" v-if="tabCurrent == 0">
						</view>
					</view>
					
				</view>
				<view class="likeBox" @click="change1">
					<view class="likeBT">
						<view :class="tabCurrent == 1 ?'favText' : 'favText1 '">
							最新问答
						</view>
						<view class="likeLine" v-if="tabCurrent == 1">
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<mescroll-body  ref="mescrollRef" @init="mescrollInit" @down="downCallback"  @up="upCallback" :down="downOption" :up="upOption"  >
			<!-- 精选问答 -->
			<view class="selectedList" v-if="tabCurrent == 0">
				<view class="card" v-for="(item,index) in selectedList" :key="index" @click="toQuestionsDetail(item)">
					<view class="title">
						{{item.title}}
					</view>
					<view class="content">
						<u-parse ref="parse"  style="overflow: hidden;" lazy-load :tag-style="style"
						 :html="item.content"></u-parse>
					</view>
					<view class="authorBox">
						<view class="author">
							<image :src="item.avatar" mode="" v-if="item.avatar"></image>
							<image src="/static/images/userImg.svg" mode="" v-if="!item.avatar"></image>
							<text>{{item.account_name}}</text>
						</view>
						<view class="lookAnswers">
							<view class="look">
								{{item.read}}人看过
							</view>
							<view class="answers">
								{{item.reply_count}}回答
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 最新问答 -->
			<view class="newestList" v-if="tabCurrent == 1">
				<view class="card" v-for="(item,index) in newestList" :key="index" @click="toQuestionsDetail(item)">
					<view class="title">
						{{item.title}}
					</view>
					<view class="content">
						<u-parse ref="parse"  style="overflow: hidden;" lazy-load :tag-style="style"
						 :html="item.content"></u-parse>
					</view>
					<view class="authorBox">
						<view class="author">
							<image :src="item.avatar" mode="" v-if="item.avatar"></image>
							<image src="/static/images/userImg.svg" mode="" v-if="!item.avatar"></image>
							<text>{{item.account_name}}</text>
						</view>
						<view class="lookAnswers">
							<view class="look">
								{{item.read>10000?((item.read-(item.read%1000))/10000+'w'):item.read}}人看过
							</view>
							<view class="answers">
								{{item.reply_count>10000?((item.reply_count-(item.reply_count%1000))/10000+'w'):item.reply_count}}回答
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
		<!-- 提问按钮 -->
		<view class="questionsBtn" @click="toQuestions">
			<image src="/static/images/twIcon.svg" mode=""></image>
		</view>
	</view>
</template>

<script>
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		data() {
			return {
				keyword:'',
				tabCurrent: 0,
				downOption: {
					use: false,
					auto:false
				},
				state_id:'',
				city_id:'',
				selectedList:{},
				newestList:{},
				isFixed:false,
				style: {
					img: 'border-radius: 16rpx'
				}
			};
		},
		mixins: [MescrollMixin],
		components: {
			//引用mSearch组件，如不需要删除即可
			mSearch
		},
		onLoad(option) {
			this.state_id = option.state_id
			this.city_id = option.city_id
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
				const query = uni.createSelectorQuery().in(this);
				query.select('#selectcard').boundingClientRect(data => {
					console.log("得到布局位置信息" + JSON.stringify(data));
					console.log("节点离页面顶部的距离为" + data.top);
					if (data.top == 0) {
						this.cardheight = 200
					} else {
						this.cardheight = data.top
					}
				}).exec();
			},
			// 切换
			change(){
				this.tabCurrent = 0
				this.keyword = ''
				this.mescroll.resetUpScroll()
				this.mescroll.scrollTo(0)
			},
			change1(){
				this.tabCurrent = 1
				this.keyword = ''
				this.mescroll.resetUpScroll()
				this.mescroll.scrollTo(0)
			},
			// 搜索问题
			search(value){
				this.mescroll.scrollTo(0)
				let t = 'newest'
				
				if(this.tabCurrent == 0){
					t = 'selected'
				}
				uni.request({
					url: this.globalUrl + '/questions/seemore',
					data: {
						state_id: this.state_id,
						city_id: this.city_id,
						type: t,
						title: value,
						page:1,
						count:10
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						if(this.tabCurrent == 0){
							this.selectedList = res.data.data.list
						} else {
							this.newestList = res.data.data.list
						}
					}
				});
			},
			// 取消搜索
			custom(){
				this.keyword = ''
			},
			// 跳转问题详情
			toQuestionsDetail(item){
				var question_id = item.question_id
				uni.navigateTo({
					url: '/pages_questions/questionsDetail/questionsDetail?question_id=' + question_id
				});
			},
			// 提问按钮
			toQuestions(){
				var Authorization = uni.getStorageSync('Authorization')
				if (!Authorization) {
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
				}else{
					uni.navigateTo({
						url:'/pages_questions/questions/questions'
					})
				}
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
				
				let t = 'newest'
				if(this.tabCurrent == 0){
					t ='selected'
				}
				uni.request({
					url: this.globalUrl+ '/questions/seemore?page=' + pageNum + '&count=' + pageSize,
					data: {
						state_id: this.state_id,
						city_id: this.city_id,
						type: t
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						if (!res.data.data.list || res.data.data.list.length == 0){
							return
						}
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.data.list;
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						// let totalPage = res.data.data.list;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = res.data.data.total;
						// 接口返回的是否有下一页 (true/false)
						// let hasNext = res.data.data.list;
										
						//设置列表数据
						if(this.tabCurrent == 0){
							if (page.num == 1) this.selectedList = []; //如果是第一页需手动置空列表
							this.selectedList = this.selectedList.concat(curPageData); //追加新数据
						} else {
							if (page.num == 1) this.newestList = []; //如果是第一页需手动置空列表
							this.newestList = this.newestList.concat(curPageData); //追加新数据
						}
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
				
				
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
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
	margin-left: 42rpx;
	margin-right: 20rpx;
}
.fhsy{
	width: 40rpx;
	height: 40rpx;
}
/* #ifdef  MP-BAIDU*/
.fhsy {
	margin-left: 100rpx;
}
/*  #endif  */
.slottitle{
	margin-left: 182rpx;
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
	// font-size: 40rpx;
	// font-weight: 500;
	// padding-left: 32rpx;
	padding-top: 28rpx;
	// padding-bottom: 22rpx;
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
	// width: 64px;
	height: 32rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 32rpx;

	
}
.favText1{
	// width: 52px;
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

// 问答列表
.selectedList{
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
