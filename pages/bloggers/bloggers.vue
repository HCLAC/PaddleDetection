<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" background-color="transparent">
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">我的关注</view>
			</uni-nav-bar>
		</view>
		<!-- 博主信息 -->
		<view class="content">
			<view  style="position: fixed; width: 100%; top: 0; z-index: 400;" >
				<view class="contentTop">
					<image src="../../static/images/mineBack.png" class="backImg"></image>
					<!-- 博主信息 -->
					<view class="usermes" v-if="authorMsg">
						<image class="userAva" :src="authorMsg.avatar" ></image>
		
						<image src="../../static/images/userImg.svg" class="userAva" v-if="nickName" mode=""></image>
						<view class="userR">
							<view class="userName">{{ authorMsg.user_name }}</view>
							<view class="likeandfans" >
								<text>获赞数</text>
								<view class="likenum">{{authorMsg.like>10000?((authorMsg.like-(authorMsg.like%1000))/10000+'w'):authorMsg.like}}</view>
								<text>粉丝</text>
								<view class="fansnum">
									{{authorMsg.fans>10000?((authorMsg.fans-(authorMsg.fans%1000))/10000+'w'):authorMsg.fans}}
								</view>
							</view>
							<!-- <view class="logout">退出登录</view> -->
						</view>
						<view class="follow" v-if="authorMsg.is_follow" @click="Fllow()">
							<text>已关注</text>
						</view>
						<view class="unfollow" v-if="!authorMsg.is_follow" @click="Fllow()">
							<text>关注</text>
						</view>
					</view>
				</view>
				<!-- 弹窗 -->
				<u-modal v-model="show" :content="content" :show-title="false" :show-cancel-button="true" @confirm="confirm"></u-modal>
				<!-- 作品 -->
				<view class="myCollection">
					<v-tabs
						lineHeight="24rpx"
						lineColor="#FFE512"
						fontSize="36rpx"
						activeColor="#303133"
						:tabs="tablist"
						:is-scroll="false"
					></v-tabs>
					<view class="articleNum">
						{{authorMsg.article_count>10000?((authorMsg.article_count-(authorMsg.article_count%1000))/10000+'w'):authorMsg.article_count}}
					</view>
					
				</view>
			</view>
			<view style="margin-top: 40%; padding: 0 24rpx;" v-if="workslist">
				<mescroll-body  ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"  >
					<view class="" v-for="(item, index) in workslist" :key="index">
						<view class="contentItem" >
							<view class="left">
								<image :src="item.image" mode="">
									<view class="imgTip">
										<view v-if="item.type == 1">游记</view>
										<view v-if="item.type == 2">攻略</view>
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
									<image src="../../static/images/iconNewMap.svg" mode="aspectFill"></image>
									<view>{{ item.location }}</view>
								</view>
							</view>
						</view>
						<view class="contentline"></view>
					</view>
					
				</mescroll-body>
			</view>
		</view>
	</view>
</template>

<script>
import httpType from '../../httpType.js';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	data() {
		return {
			author_id:'',
			authorMsg:[],
			workslist:[],
			show: false,
			content: '',
			tablist:['作品']
		};
	},
	mixins: [MescrollMixin],
	onShow() {
		// 获取当前小程序的页面栈
		let pages = getCurrentPages();
		// 数组中索引最大的页面--当前页面
		let currentPage = pages[pages.length - 1];
		// 打印出当前页面中的 options
		console.log('onshow--',currentPage.options)
		this.author_id = currentPage.options.author_id
		console.log(this.author_id,'....')
		this.getBloggerMsg()
	},
	onLoad(e) {
		// console.log('博主id',e)
		// this.author_id = e.author_id
		// console.log(this.author_id,'....')
		// this.getBloggerMsg(),
		this.getlist()
		// this.getlist()
	},

	methods: {
		getBloggerMsg() {
			uni.request({
				url: this.globalUrl + '/author',
				data: {
					author_id:this.author_id
				},
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				method: 'get',
				success: (res) => {
					console.log('博主信息=', res.data);
					this.authorMsg = res.data.data
				}
			})
				
		},
		getlist(){
			uni.request({
				url: this.globalUrl + '/author/workslist',
				data: {
					author_id:this.author_id,
					page:1,
					count:6
				},
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				method: 'get',
				success: (res) => {
					console.log('作品列表=', res.data);
					this.workslist = res.data.data.list
				}
			})
		},
		// 关注
		Fllow() {
			// console.log(item, index)
			var that = this;
			let msg = this.authorMsg.is_follow ? '确认取消关注?' : '确认关注?'
			let status = this.authorMsg.is_follow ? 0 : 1
			
			if(status == 0){
				
				that.show = true
				that.content = '确认取消关注?'
			}else{
				uni.request({
					url: that.globalUrl + '/user/follow',
					data: {
						author_id: that.authorMsg.author_id,
						follow: status
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: (res) => {
						if (res.data.code != 0) {
							// debugger
							uni.navigateTo({
								url: '../login/login'
							});
						}else{
							that.authorMsg.is_follow = status == 1 ? true : false
						}
					}
				})
			}
		},
		// 点击确认
		confirm(){
			var that = this;
			let msg = this.authorMsg.is_follow ? '确认取消关注?' : '确认关注?'
			let status = this.authorMsg.is_follow ? 0 : 1
			uni.request({
				url: that.globalUrl + '/user/follow',
				data: {
					author_id: that.authorMsg.author_id,
					follow: status
				},
				method: 'POST',
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: (res) => {
					if (res.data.code != 0) {
						// debugger
						uni.navigateTo({
							url: '../login/login'
						});
					}else{
						that.authorMsg.is_follow = status == 1 ? true : false
					}
				}
			})
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
			
			uni.request({
				url: this.globalUrl+ '/author/workslist?page=' + pageNum + '&count=' + pageSize,
				data:{
					author_id:this.author_id,
				},
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
					that.likeNum = totalSize;
					// 接口返回的是否有下一页 (true/false)
					// let hasNext = data.data.data.list;
			
					//设置列表数据
					if (page.num == 1) this.workslist = []; //如果是第一页需手动置空列表
					this.workslist = this.workslist.concat(curPageData); //追加新数据
					console.log('workslist', this.workslist);
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
};
</script>

<style lang="scss" scoped>
	/* 自定义导航栏样式 */
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
	}
	
	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
		border-bottom: 1rpx solid rgba(237, 239, 242, 1);
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
		margin-right: 20rpx;
	}
	
	.fhsy {
		width: 40rpx;
		height: 40rpx;
	}
	
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
	margin-left: 15px;
	width: 130rpx;
	height: 130rpx;
	box-shadow: 0px 0px 14px 0px #F7B500;
	border: 3px solid #FFFFFF;
	border-radius: 50%;
	// margin-top: 24rpx;
}
.userR {
	margin-left: 32rpx;
	// margin-top: 24rpx;
}
.userName {
	width: 366rpx;
	height: 36rpx;
	font-size: 36rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 36rpx;
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis;
}
.likeandfans{
	margin-top: 20rpx;
	display: flex;
	align-items: center;
	
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #606266;
	line-height: 24rpx;
}
.likenum{
	margin-left: 8rpx;
	margin-right: 24rpx;
}
.fansnum{
	margin-left: 8rpx;
}
.follow{
	width: 136rpx;
	height: 52rpx;
	background: rgba(251, 204, 12, 0.45);
	border-radius: 26rpx;
	// margin-left: 30rpx;
	text-align: center;
	line-height: 52rpx;
	text{
		width: 84rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFA940;
		line-height: 28rpx;
	}
}
.unfollow{
	width: 136rpx;
	height: 52rpx;
	border-radius: 26rpx;
	border: 2rpx solid #303133;
	// margin-left: 30rpx;
	line-height: 52rpx;
	text-align: center;
	text{
		width: 56rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 28rpx;
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
	border-radius: 40rpx 40rpx 0rpx 0rpx;
	background-color: #fff;
	color: #303133;
	width: 100%;
	font-size: 40rpx;
	font-weight: 500;
	padding-top: 30rpx;
	position: absolute;
	top: 360rpx;
}
.tip{
	// width: 72rpx;
	// height: 36rpx;
	font-size: 36rpx;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #303133;
	line-height: 36rpx;
	// position: relative;
}
.articleNum{
	position: absolute;
	top: 60rpx;
	left: 110rpx;
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 24rpx;
}
.line{
	// position: absolute;
	// top: 40rpx;
	width: 72rpx;
	height: 24rpx;
	background: #FFE512;
	border-radius: 2rpx 12rpx 2rpx 2rpx;
	z-index: -1;

}
.favNum{
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 24rpx;
	position: absolute;
	top: 76rpx;
	left: 130rpx;
}
.likeNum{
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 24rpx;
	position: absolute;
	top: 76rpx;
	left: 258rpx;
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
		height: 70rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(96, 98, 102, 1);
		line-height: 38rpx;
		margin-top: 20rpx;
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
		margin-top: 20rpx;
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
		// line-height: 40rpx;
		align-items: center;
		image {
			height: 30rpx;
			width: 26rpx;
			margin-right: 4rpx;
		}
		view {
			width: 452rpx;
			font-size: 22rpx;
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
.contentline{
	width: 722rpx;
	height: 1rpx;
	background: #EDEFF2;
	margin-bottom: 20rpx;
}
</style>
