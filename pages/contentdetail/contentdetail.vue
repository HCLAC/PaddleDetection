<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		
		<view class="" v-show="articleList != null">
			<!-- 内容详情轮播图 -->
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper @change="change" class="swiper" :autoplay="true" :indicator-dots="false">
							<swiper-item v-for="(item, index) in articleList.data.images"><image class="itemImg" mode="aspectFit" :src="item"></image></swiper-item>
						</swiper>
						<view class="imageCount">{{ current + 1 }}/{{ articleList.data.images.length }}</view>
						<view class="dots">
							<block v-for="(item, index) in articleList.data.images"><view :class="[index == current ? 'activieDot' : 'dot']"></view></block>
						</view>
					</view>
				</view>
			</view>
			<!-- 内容详情 -->
			<view class="detailContent savebottom">
				<view class="userMse">
					<image class="userHeard" :src="articleList.data.avatar"></image>
					<view class="userMse-r">
						<view class="userNikename">{{ articleList.data.author_name }}</view>
						<view class="adress">
							<image src="../../static/images/Icon／Map.svg" mode="" class="adreessIcon"></image>
							<view class="adressText" @click="map()">{{ articleList.data.location }}</view>
						</view>
					</view>
				</view>
				<!-- 标题 -->
				<view class="contentTitle">{{ articleList.data.title }}</view>
				<!-- 内容文章 -->
				<view class="contentText">
					<!-- <rich-text :nodes="articleList.data.content | formatRichText"></rich-text> -->
					<u-parse lazy-load use-cache @linkpress="templateAdd" :html="articleList.data.content | formatRichText"></u-parse>
				</view>
				<view class="tips">
					<view v-for="item in articleList.data.tags">
						#
						<text>{{ item }}</text>
					</view>
					<view v-for="item in articleList.data.topics">
						#
						<text>{{ item }}</text>
					</view>
					<!-- <view>#<text></text></view> -->
				</view>
				<view class="releaseTime">发布于{{ articleList.data.update_at }}</view>
				<view class="safeBox"></view>
			</view>
			<view class="bottom">
				<!-- 分割线 -->
				<view class="line"></view>
				<!-- 登录 -->
				<view class="contentBottom savepadding">
					<view class="like" @click="clickLike">
						<image class="likeBtn" src="../../static/images/attheart.svg" v-if="articleList.data.liked == 0"></image>
						<image class="likeBtn" src="../../static/images/heart-actived.svg" v-if="articleList.data.liked == 1"></image>
						<view class="likeNum" v-model="likemessage">{{ articleList.data.like_count }}</view>
					</view>
					<view class="fav" @click="clickFav">
						<image class="favBtn" src="../../static/images/shouchang.svg" v-if="articleList.data.fav == 0"></image>
						<image class="favBtn" src="../../static/images/fav-actived.svg" v-if="articleList.data.fav == 1"></image>
						<view class="favNum">{{ articleList.data.fav_count }}</view>
					</view>
					<view class="share" @click="share"><image src="../../static/images/fenxiang.svg"></image></view>
					<view class=""><view class="loginButton" @click="login" v-if="flag">登录</view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var _this;
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniFav from '@/components/uni-fav/uni-fav.vue';
// import ourLoading from '@/components/our-loading/our-loading.vue'
// import httpType from '../../httpType.js'
export default {
	comments: {
		uniNavBar,
		uniIcons,
		uniFav
		// ourLoading
	},
	data() {
		return {
			indicatorDots: true,
			current: 0,
			list: [],
			VX: 17827277778,
			articleList: null,
			token: '',
			article_id: '',
			article_num: null,
			flag: true,
			wechat_id: null
		};
	},
	onLoad(e) {
		console.log('文章id====', e);
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		this.flag = uni.getStorageSync('Authorization') ? false : true;
		console.log(this.flag);
		// debugger
		this.article_num = e.article_id;

		this.getArticleDetail(e);
		uni.hideLoading();
	},
	created() {
		
		_this = this 
		_this.getOrder();
	},

	methods: {
		getOrder() {},
		templateAdd(e) {
			console.log(e)
			
			if(e.group && e.groupid){
				uni.request({
					url: 'http://121.40.30.19/marketing/copy',
					data: {
						id: e.groupid
					},
					method: 'PUT',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: (res)=>{
						if(res.data.code == 0){
							uni.setClipboardData({
								data: e.group,
								success: ()=>{
									uni.showToast({
										title: "复制成功",
										icon: "success"
									})
								}
							})
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					}
				})
			}
		},
		// 获取文章详情
		getArticleDetail(e) {
			var that = this;

			// var token = uni.getStorageSync('Authorization')
			// // var that.token = token
			// console.log("token===>", token)
			// if(token == null ){
			// 	that.flag = true
			// }
			// else{
			// 	that.flag = false
			// }
			uni.request({
				// url:'article',
				url: 'http://121.40.30.19/article',
				data: {
					article_id: e.article_id
				},
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: async function(res) {
					console.log(res.data.data.liked, res.data.data.like_count, res.data.data.uuid, 444444);
					console.log('eeeeeeeeeeeeeeee', e);
					console.log('文章详情====', res);
					uni.setStorageSync('id', res.data);

					let strIndex = res.data.data.content.search('此处为营销组件');
					if (strIndex != -1) {
						// let strId =  newContent.substring(strIndex,1)

						let strId = res.data.data.content[strIndex + 8];
						let numStr = await  that.getTemplate(strId);
							let wechat_id = numStr.wechat_id
							let str =  '<div><span style="font-size: 32rpx; font-weight: 500;">详情请+VX：' + wechat_id + '</span><a group="'+ wechat_id + '" groupId="'+ strId + '" style="color: #0091FF; font-size: 32rpx;margin-left: 36rpx; font-weight: 400;">点击复制</a></div>'
							
						res.data.data.content = res.data.data.content.replace(/<input[^>]*\/>/gi, str);
						console.log(res.data.data.content);
						
						that.articleList = res.data;

					}else{
						that.articleList = res.data;
					}
					
				}
			});
		},
		// 点赞
		clickLike() {
			var that = this;

			var article_id = uni.getStorageSync('id');
			console.log('art', article_id);

			uni.request({
				url: 'http://121.40.30.19/user/liked',
				data: {
					article_id: article_id.data.uuid,
					liked: article_id.data.liked == 0 ? 1 : 0
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
					uni.request({
						// url:'article',
						url: 'http://121.40.30.19/article',
						data: {
							article_id: article_id.data.uuid
						},
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},
						success: async function(res) {
							console.log(res.data.data.liked, res.data.data.like_count, res.data.data.uuid, 333333);
							console.log('eeeeeeeeeeeeeeee', res);
							console.log('文章详情====', res);
							uni.setStorageSync('id', res.data);
							
							let strIndex = res.data.data.content.search('此处为营销组件');
							if (strIndex != -1) {
								// let strId =  newContent.substring(strIndex,1)
							
								let strId = res.data.data.content[strIndex + 8];
								let numStr = await  that.getTemplate(strId);
									let wechat_id = numStr.wechat_id
									let str =  '<div><span style="font-size: 32rpx; font-weight: 500;">详情请+VX：' + wechat_id + '</span><a group="'+ wechat_id + '" groupId="'+ strId + '" style="color: #0091FF; font-size: 32rpx;margin-left: 36rpx; font-weight: 400;">点击复制</a></div>'
									
								res.data.data.content = res.data.data.content.replace(/<input[^>]*\/>/gi, str);
								console.log(res.data.data.content);
								
								that.articleList = res.data;
							
							}else{
								that.articleList = res.data;
								console.log('articleList', that.articleList);
							}
						}
					});
				}
			});
		},
		// 收藏
		clickFav() {
			var that = this;

			var article_id = uni.getStorageSync('id');
			uni.request({
				url: 'http://121.40.30.19/user/favorite',
				data: {
					article_id: article_id.data.uuid,
					favorite: article_id.data.fav == 1 ? 0 : 1
				},
				method: 'POST',
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: function(res) {
					console.log('收藏', res);
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
					uni.request({
						// url:'article',
						url: 'http://121.40.30.19/article',
						data: {
							article_id: article_id.data.uuid
						},
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},
						success: async function(res) {
							console.log(res.data.data.fav, res.data.data.fav_count, res.data.data.uuid, 333333);
							console.log('eeeeeeeeeeeeeeee', res);
							console.log('文章详情====', res.data);
							uni.setStorageSync('id', res.data);
							
							let strIndex = res.data.data.content.search('此处为营销组件');
							if (strIndex != -1) {
								// let strId =  newContent.substring(strIndex,1)
							let strId = res.data.data.content[strIndex + 8];
							let numStr = await  that.getTemplate(strId);
								let wechat_id = numStr.wechat_id
								let str =  '<div><span style="font-size: 32rpx; font-weight: 500;">详情请+VX：' + wechat_id + '</span><a group="'+ wechat_id + '" groupId="'+ strId + '" style="color: #0091FF; font-size: 32rpx;margin-left: 36rpx; font-weight: 400;">点击复制</a></div>'
								
							res.data.data.content = res.data.data.content.replace(/<input[^>]*\/>/gi, str);
							console.log(res.data.data.content);
							
							that.articleList = res.data;
							
							}else{
								that.articleList = res.data;
								console.log('articleList', that.articleList);
							}

						}
					});
				}
			});
		},
		getTemplate(id) {
			if (id) {
				return new Promise((reslove,reject)=>{
					uni.request({
						// url:'article',
						url: 'http://121.40.30.19/marketing/unit',
						method: 'get',
						data: {
							group_id: id,
							article_id: this.article_num
						},
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},
					
						success: res => {
							
					
							if (res.data.code == 0) {
								// this.wechat_id = res.data.data.wechat_id;
								reslove(res.data.data)
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
							}
						},
						fail: (error)=>{
							reject(error)
						}
					});
				})
			}
		},
		// 登录
		login() {
			uni.redirectTo({
				url: '../login/login'
			});
		},
		change(e) {
			_this.current = e.detail.current;
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

		map() {
			var that = this
			
			const latitude = that.articleList.data.latitude;
			const longitude = that.articleList.data.longitude;
			uni.openLocation({
				latitude: latitude,
				longitude: longitude,
				success: function() {
					console.log('success');
				}
			});
		},
		copy() {
			uni.setClipboardData({
				data: _this.VX,
				success: function() {
					// console.log('success');
					uni.showToast({
						title: '复制成功',
						icon: 'none'
					});
				}
			});
			uni.getClipboardData({
				success: function(res) {
					console.log(res.data);
				}
			});
		},
		share() {
			uni.showShareMenu({});
		}
		// favClick() {
		// 	this.checked = !this.checked
		//  this.$forceUpdate()
		// }
	},
	filters: {
		/**
		 * 处理富文本里的图片宽度自适应
		 * 1.去掉img标签里的style、width、height属性
		 * 2.img标签添加style属性：max-width:100%;height:auto
		 * 3.修改所有style里的width属性为max-width:100%
		 * 4.去掉<br/>标签
		 * @param html
		 * @returns {void|string|*}
		 */

		formatRichText(html) {
			//控制小程序中图片大小
			let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
				match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
				return match;
			});
			newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
				match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
				return match;
			});
			newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			// newContent = newContent.replace(/\<img/gi, '<img style="width:350px;height:auto;display:inline-block;margin:5px auto;"');
			newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
			//   newContent = newContent.replace(/<input[^>]*\/>/gi, '<div><p>营销组件</p><a >点击复制</a></div>');

			return newContent;
		}
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
	min-height: 400rpx;
	max-height: 996rpx;
	width: 100%;
}

.swiper {
	min-height: 580rpx;
	max-height: 996rpx;
}

.itemImg {
	height: 100%;
	width: 100%;
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

	// margin-bottom: 200rpx;
}
// ios底部安全距离-padding
.savepadding {
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: content-box;
}

// ios底部安全距离-bottom
.savebottom {
	bottom: constant(safe-area-inset-bottom);
	bottom: env(safe-area-inset-bottom);
}
// 用户信息
.userMse {
	display: flex;
	margin-left: 28rpx;
	margin-top: 50rpx;
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
	// width: 100rpx;
	height: 40rpx;
	margin-top: 12rpx;
	background: rgba(0, 145, 255, 0.1);
	border-radius: 20rpx;
	// border: 2rpx solid rgba(0, 145, 255, 1);
	display: flex;
	align-items: center;
	text-align: center;
	padding: 0 14rpx;
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
	margin: 20rpx;
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
	flex-wrap: wrap;
}

.tips view {
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 500;
	color: rgba(0, 145, 255, 1);
	margin-right: 38rpx;
	margin-top: 10rpx;
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
	// margin-bottom: 480rpx;
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}
.safeBox {
	height: 142rpx;
	width: 100%;
}

/* 底部 */
.bottom {
	width: 100%;
	height: 98rpx;
	position: fixed;
	left: 0;
	bottom: var(--window-bottom);
	z-index: 111;
	background-color: #ffffff;
	padding-bottom: 68rpx;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: content-box;
}
.line {
	height: 0.5rpx;
	background: rgba(221, 221, 221, 1);
	// margin-top: 84rpx;
}

.contentBottom {
	display: flex;
	align-items: center;
	margin-top: 16rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(48, 49, 51, 1);
	line-height: 24rpx;
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
