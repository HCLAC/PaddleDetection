<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.png" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.png" @click="home" />
				</view>
				<view class="slottitle">内容详情</view>
			</uni-nav-bar>
		</view>

		<!-- 内容详情轮播图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper @change="change" class="swiper" :indicator-dots="false">
						<swiper-item v-for="(item,index) in articleList.data.images">
							<image class="itemImg" mode="aspectFit" :src="item"></image>
						</swiper-item>
					</swiper>
					<view class="imageCount">{{current+1}}/{{list.length}}</view>
					<view class="dots">
						<block v-for="(item, index) in list">
							<view :class="[index == current ? 'activieDot' : 'dot']"></view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<!-- 内容详情 -->
		<view class="detailContent">
			<view class="userMse">
				<image class="userHeard" :src="articleList.data.avatar"></image>
				<view class="userMse-r">
					<view class="userNikename"> {{articleList.data.author_name}} </view>
					<view class="adress">
						<image src="../../static/images/Icon／Map.png" mode="" class="adreessIcon"></image>
						<view class="adressText">
							{{articleList.data.city}}
						</view>
					</view>
				</view>
			</view>
			<!-- 标题 -->
			<view class="contentTitle">
				{{articleList.data.title}}
			</view>


			<!-- 内容文章 -->
			<view class="contentText">
				{{articleList.data.content}}
				<view class="copy">详情请+VX: {{VX}}<text class="clcopy" @click="copy">点击复制</text></view>
				语雀是一款优雅高效的在线文档编辑与协同工具让每个 企业轻松拥有文档中心，阿里巴巴集团内部使用多年众 多中小企业首选语雀是一款优雅高效的在线文档编辑与 协同工具，让每个企业轻松拥有文档中心阿里巴巴集团 内部使用多年众多中小企业首选。
			</view>
			<view class="tips">
				<view>#<text>{{articleList.data.tags[0]}}</text></view>
				<view>#<text>{{articleList.data.topics[0]}}</text></view>
				<!-- <view>#<text></text></view> -->
			</view>
			<view class="releaseTime">发布于{{articleList.data.update_at}}</view>
		</view>
		<!-- 分割线 -->
		<view class="line"></view>
		<!-- 登录 -->
		<view class="contentBottom">
			<view class="like" @click="clickLike">
				<image class="likeBtn" src="../../static/images/heart.png" v-if="articleList.data.liked==0"></image>
				<image class="likeBtn" src="../../static/images/heart-actived.png" v-if="articleList.data.liked==1"></image>
				<view class="likeNum" v-model="likemessage">
					{{articleList.data.like_count}}
				</view>
			</view>
			<view class="fav" @click="clickFav">
				<image class="favBtn" src="../../static/images/fav.png" >
				</image>
				<view class="favNum">
					{{articleList.data.fav_count}}
				</view>
			</view>
			<view class="share" @click="share">
				<image src="../../static/images/share.png"></image>
			</view>
			<view class="loginButton">登录</view>
		</view>
	</view>
</template>

<script>
	var _this
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniFav from '@/components/uni-fav/uni-fav.vue'
	// import httpType from '../../httpType.js'
	export default {
		comments: {
			uniNavBar,
			uniIcons,
			uniFav
		},
		data() {
			return {
				indicatorDots: true,
				current: 0,
				list: [
				],
				VX: 17827277778,
				articleList: '',
				token: '',
				article_id: ''
			}
		},
		onLoad: function(e) {
			console.log('文章id====', e)
			this.getArticleDetail(e)
		},
		created() {
			_this = this,
				_this.getOrder()
		},

		methods: {
			// 获取文章详情
			getArticleDetail(e) {
				var that = this
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
						article_id: e.article_id
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
						console.log('eeeeeeeeeeeeeeee', e)
						console.log('文章详情====', res.data)
						uni.setStorageSync('id', res.data)
						that.articleList = res.data
						console.log('articleList', that.articleList)
					}
				})
			},
			// 点赞
			clickLike() {
				var that = this
				uni.getStorage({
					key: 'Authorization',
					success: function(res) {
						console.log("token===>", res.data)
						that.token = res.data
					}
				})

				var article_id = uni.getStorageSync('id')
				// console.log('art',article_id)

				uni.request({
						url: 'http://121.40.30.19/user/liked',
						data: {
							article_id: article_id.data.uuid,
							liked: article_id.data.liked == 0 ? 1 : 0
						},
						method: 'POST',
						header: {
							'Authorization': that.token
						},
						success: function(res) {
							console.log('点赞', res)
							uni.request({
								// url:'article',
								url: 'http://121.40.30.19/article',
								data: {
									article_id: article_id.data.uuid
								},
								header: {
									'Authorization': that.token
								},
								success: function(res) {
									console.log(res.data.data.liked,
										res.data.data.like_count,
										res.data.data.uuid,
										333333
									)
									console.log('eeeeeeeeeeeeeeee', res)
									console.log('文章详情====',res)
									uni.setStorageSync('id',res.data)
									that.articleList = res.data
									console.log('articleList',that.articleList)
								}
							})
						}
						
					})

					


			},
			// 收藏
			clickFav() {
				var that = this
				uni.getStorage({
					key: 'Authorization',
					success: function(res) {
						console.log("token===>", res.data)
						that.token = res.data
					}
				})

				var article_id = uni.getStorageSync('id')
				uni.request({
					url: 'http://121.40.30.19/user/favorite',
					data: {
						article_id: article_id.data.uuid,
						favorite: article_id.data.fav == 1 ? 0 : 1
					},
					method: 'POST',
					header: {
						'Authorization': that.token
					},
					success: function(res) {
						console.log('收藏', res)
					},

				})
				uni.request({
					// url:'article',
					url: 'http://121.40.30.19/article',
					data: {
						article_id: article_id.data.uuid
					},
					header: {
						'Authorization': that.token
					},
					success: function(res) {
						console.log(res.data.data.liked,
							res.data.data.like_count,
							res.data.data.uuid,
							333333
						)
						console.log('eeeeeeeeeeeeeeee', res)
						console.log('文章详情====',res.data)
						uni.setStorageSync('id',res.data)
						that.articleList = res.data
						console.log('articleList',that.articleList)
					}
				})

			},
			change(e) {
				_this.current = e.detail.current
			},
			getOrder() {
				_this.swiperlength,
					_this.list = [{
							key: "1",
							title: "A"
						},
						{
							key: "2",
							title: "B"
						},
						{
							key: "3",
							title: "C"
						},
						{
							key: "4",
							title: "D"
						},
						{
							key: "5",
							title: "E"
						},
					]
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			home() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},

			copy() {
				uni.setClipboardData({
					data: _this.VX,
					success: function() {
						// console.log('success');
						uni.showToast({
							title: '复制成功',
							icon: "none"
						})
					}
				});
				uni.getClipboardData({
					success: function(res) {
						console.log(res.data);
					}
				});
			},
			share() {
				uni.showShareMenu({

				})
			}
			// favClick() {
			// 	this.checked = !this.checked
			//  this.$forceUpdate()
			// }
		}
	}
</script>

<style lang="scss" scoped>
	/* 自定义导航栏样式 */
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

	/* 轮播图 */
	.page-section-spacing {
		position: relative;
		height: 996rpx;
	}

	.swiper {
		height: 996rpx;
	}

	.itemImg {
		height: 996rpx;
		width: 100%;
	}

	.uni-bg-red {
		height: 996rpx;
		background-color: #EA552D;
	}

	.uni-bg-green {
		height: 996rpx;
		background-color: #4CD964;
	}

	.uni-bg-blue {
		height: 996rpx;
		background-color: #007AFF;
	}

	.imageCount {
		// width: 90rpx;
		height: 40rpx;
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 20rpx;
		text-align: center;
		line-height: 40rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		position: absolute;
		right: 28rpx;
		bottom: 28rpx;
		padding: 0 12rpx;
	}

	//标记点样式
	.dots {
		width: 100%;
		height: 10rpx;
		display: flex;
		justify-content: center;
		position: absolute;
		/* left: 320rpx; */
		background: #ffff;
		bottom: -20rpx;

		.dot {
			width: 10rpx;
			height: 10rpx;
			border-radius: 50%;
			background: rgba(221, 221, 221, 1);
			margin-right: 8rpx;
		}

		.activieDot {
			width: 20rpx;
			height: 10rpx;
			background: rgba(48, 49, 51, 1);
			border-radius: 3px;
			margin-right: 8rpx;
		}
	}

	/* 内容详情 */
	.detailContent {
		// padding: 15px;
	}

	// 用户信息
	.userMse {
		display: flex;
		margin-left: 28rpx;
		margin-top: 40rpx;
	}

	.userHeard {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.userMse-r {
		margin-left: 20rpx;
	}

	.userNikename {
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(48, 49, 51, 1);
		line-height: 28rpx;
	}

	.adress {
		width: 100rpx;
		height: 40rpx;
		margin-top: 12rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
		border: 2rpx solid rgba(0, 145, 255, 1);
		display: flex;
		align-items: center;
		text-align: center;
	}

	.adreessIcon {
		width: 24rpx;
		height: 24rpx;
	}

	.adressText {
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 145, 255, 1);
	}

	// 内容
	.contentTitle {
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: rgba(48, 49, 51, 1);
		line-height: 32rpx;
		margin-left: 28rpx;
		margin-top: 40rpx;
	}

	.contentText {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(96, 98, 102, 1);
		line-height: 56rpx;
		margin: 28rpx;
	}

	.copy {
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: rgba(48, 49, 51, 1);
	}

	.clcopy {
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 145, 255, 1);
		margin-left: 36rpx;
	}

	.tips {
		margin-top: 40rpx;
		margin-left: 28rpx;
		display: flex;
	}

	.tips view {
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 500;
		color: rgba(0, 145, 255, 1);
		margin-right: 38rpx;
	}

	.tip text {
		margin-left: 6rpx;
	}

	// .tipImg{
	// 	width: 30rpx;
	// 	height: 30rpx;
	// 	margin-right: 6rpx;
	// }

	.releaseTime {
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(201, 202, 209, 1);
		line-height: 22rpx;
		margin-top: 40rpx;
		margin-left: 28rpx;
	}

	.line {
		height: 2rpx;
		background: rgba(221, 221, 221, 1);
		margin-top: 84rpx;
	}

	/* 底部 */
	.contentBottom {
		display: flex;
		align-items: center;
		margin-top: 16rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(48, 49, 51, 1);
		line-height: 24rpx;
		margin-bottom: 68rpx;
	}

	.loginButton {
		width: 156rpx;
		height: 68rpx;
		background: rgba(255, 229, 18, 1);
		border-radius: 20px;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: rgba(48, 49, 51, 1);
		line-height: 68rpx;
		border: none;
		text-align: center;
		margin-left: 190rpx;
	}

	.like {
		display: flex;
		margin-left: 28rpx;
		align-items: center;
	}

	.likeBtn {
		width: 52rpx;
		height: 52rpx;
		margin-right: 10rpx;
	}

	.fav {
		display: flex;
		margin-left: 56rpx;
		align-items: center;
	}

	.favBtn {
		width: 52rpx;
		height: 52rpx;
		margin-right: 10rpx;
	}

	.share {
		display: flex;
		margin-left: 56rpx;
		align-items: center;
	}

	.share image {
		width: 52rpx;
		height: 52rpx;
	}
</style>
