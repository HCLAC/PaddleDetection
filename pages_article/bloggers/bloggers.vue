<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body" v-if="isFixed">
			<uni-nav-bar :fixed="true" :status-bar="true">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 博主信息 -->
		<view class="contentTop" style="position: absolute; width: 100%; top: 0; z-index: 400;">
			<image src="/static/images/mineBack.png" class="backImg"></image>
			<!-- 博主信息 -->
			<view class="usermes" v-if="authorMsg">
				<image class="userAva" :src="authorMsg.avatar"></image>
				<image src="/static/images/userImg.svg" class="userAva" v-if="nickName" mode=""></image>
				<view class="userR">
					<view class="userName">{{ authorMsg.user_name }}</view>
					<view class="likeandfans">
						<text>获赞数</text>
						<view class="likenum">{{authorMsg.like>10000?((authorMsg.like-(authorMsg.like%1000))/10000+'w'):authorMsg.like}}</view>
						<text>粉丝</text>
						<view class="fansnum">
							{{authorMsg.fans>10000?((authorMsg.fans-(authorMsg.fans%1000))/10000+'w'):authorMsg.fans}}
						</view>
					</view>
				</view>
				<view class="follow" v-if="authorMsg.is_follow" @click="Fllow(false)">
					<text>已关注</text>
				</view>
				<view class="unfollow" v-else="!authorMsg.is_follow" @click="Fllow(true)">
					<text>关注</text>
				</view>
			</view>
			<meTabs class="bloggerTabs" v-model="tabIndex" :tabs="tabList" @change="tabChange" :fixed="isFixed" :top="tabsTop" :tab-width="120"></meTabs>
		</view>
		<!-- <view class="myCollection" :class="isFixed ? 'fixTabs' : 'noFix'" id="selectcard">
			<view class="worksBox">
				<view class="worksText">
					作品
				</view>
				<view class="worksLine">
				</view>
			</view>
			<view class="articleNum">
				{{authorMsg.article_count>10000?((authorMsg.article_count-(authorMsg.article_count%1000))/10000+'w'):authorMsg.article_count}}
			</view>
		</view> -->
		<bloggerArticleList ref="mescrollItem" v-for="(tab,i) in tabList" :key="i" :i="i" :index="tabIndex" :authorID="author_id"></bloggerArticleList>
		<u-modal v-model="show" :content="content" :z-index=9999 :show-title="false" :show-cancel-button="true" @confirm="confirm"></u-modal>
	</view>
</template>
<script>
import MescrollMoreMixin from '@/components/mescroll-uni/mixins/mescroll-more.js';
import meTabs from '@/common/me-tabs/me-tabs.vue';
import bloggerArticleList from '@/common/article-mescroll-item/blogger-article-list.vue';
	export default {
		mixins: [MescrollMoreMixin],
		components: {
			meTabs,
			bloggerArticleList
		},
		data() {
			return {
				tabList: ['作品'],
				tabIndex: 0,
				author_id: 0,
				authorMsg: null,
				show: false,
				content: '',
				cardheight: 0,
				tabsTop: 0,
				isFixed: false,
			};
		},
		onLoad(options) {
			this.author_id = options.author_id
			this.getBloggerMsg()
			this.calcCardHeight()
		},
		onPageScroll(e) {
			if (e.scrollTop > this.cardheight) {
				if (e.scrollTop > this.cardheight+20 && this.isFixed){
					return
				}
				this.isFixed = true;
				
				this.$nextTick(() => {
				  let view = uni.createSelectorQuery().select(".example-body");
				  view.fields({
				  	size: true,
				  }, data => {
				  	if (!data){
				  		console.error("mine得到节点信息失败")
				  		return
				  	}
				  	console.log("得到节点信息" + JSON.stringify(data));
				  	this.tabsTop = data.height
				  }).exec();
				})
			} else {
				this.isFixed = false;
			}
		},
		methods: {
			calcCardHeight(){
				setTimeout(() => {
					let view = uni.createSelectorQuery().select(".bloggerTabs");
					view.fields({
						rect: true,
						size: true,
					}, data => {
						if (!data){
							console.error("mine得到节点信息失败")
							return
						}
						console.log("得到节点信息" + JSON.stringify(data));
						this.cardheight = data.top-data.height
					}).exec();
				}, 500);
			},
			getBloggerMsg() {
				this.HTTP.request({
					url: '/author',
					data: {
						author_id: this.author_id
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					method: 'get',
					success: (res) => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						this.authorMsg = res.data.data
					}
				})
			},
			// 关注
			Fllow() {
				let Authorization = uni.getStorageSync('Authorization')
				if (!Authorization){
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
					return
				}
				
				var that = this;
				let status = this.authorMsg.is_follow ? 0 : 1

				// 取消关注，弹出模态框二次确认
				if (status == 0) {
					that.show = true
					that.content = '确认取消关注?'
					return 
				}
				// 关注直接调用接口
				this.HTTP.request({
					url: '/user/follow',
					data: {
						author_id: that.authorMsg.author_id,
						follow: status
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: (res) => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						that.authorMsg.is_follow = res.data.data
					}
				})
			},
			// 点击确认
			confirm() {
				var that = this;
				let status = this.authorMsg.is_follow ? 0 : 1
				this.HTTP.request({
					url: '/user/follow',
					data: {
						author_id: that.authorMsg.author_id,
						follow: status
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: (res) => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						that.authorMsg.is_follow = res.data.data
					}
				})
			},
			// 切换
			tabChange(index){
				this.tabIndex = index
			}
		}
	};
</script>

<style lang="scss" scoped>
	
.example-body {
	z-index: 999;
	position: fixed;
	top:0px;
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
	height: 340rpx;
	align-items: center;
	margin-bottom: 38rpx;
	.userAva {
		margin-left: 28rpx;
		width: 130rpx;
		height: 130rpx;
		box-shadow: 0px 0px 14px 0px #F7B500;
		border: 3px solid #FFFFFF;
		border-radius: 50%;
		// margin-top: 24rpx;
	}
	
	.userR {
		margin-left: 32rpx;
		margin-right: 16rpx;
		// margin-top: 24rpx;
		.userName {
			width: 366rpx;
			height: 36rpx;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			line-height: 36rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			
		}
		.likeandfans {
			margin-top: 20rpx;
			display: flex;
			align-items: center;
		
			height: 24rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #606266;
			line-height: 24rpx;
			
			.likenum {
				margin-left: 8rpx;
				margin-right: 24rpx;
			}
			
			.fansnum {
				margin-left: 8rpx;
			}
		}
	}
	
	.follow {
		width: 136rpx;
		height: 52rpx;
		background: rgba(251, 204, 12, 0.45);
		border-radius: 26rpx;
		// margin-left: 30rpx;
		text-align: center;
		line-height: 52rpx;
	
		text {
			width: 84rpx;
			height: 28rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFA940;
			line-height: 28rpx;
		}
	}
	
	.unfollow {
		width: 136rpx;
		height: 52rpx;
		border-radius: 26rpx;
		border: 2rpx solid #303133;
		// margin-left: 30rpx;
		line-height: 52rpx;
		text-align: center;
	
		text {
			width: 56rpx;
			height: 28rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			line-height: 28rpx;
		}
	}
}

.myCollection {
	border-radius: 24rpx 24rpx 0rpx 0rpx;
	background-color: #fff;
	color: #303133;
	height: 84rpx;
	width: 100%;
	font-size: 40rpx;
	font-weight: 500;
	padding-left: 10rpx;
	padding-top: 48rpx;
	display: flex;
	position: absolute;
	top: 360rpx;
}

.fixTabs {
	position: fixed;
	top: 126rpx;
	z-index: 2;
	height: 98rpx;
	padding-top: 52rpx;
}

.noFix {}

.worksBox {
	// display: flex;
	margin-left: 18rpx;
}

.worksText {
	height: 36rpx;
	font-size: 36rpx;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #303133;
	line-height: 36rpx;

}

.worksLine {
	width: 72rpx;
	height: 24rpx;
	background: #FFE512;
	border-radius: 2rpx 12rpx 2rpx 2rpx;
	margin-top: -20rpx;
}

.articleNum {
	// position: absolute;
	// top: 50rpx;
	// left: 114rpx;
	margin-top: 12rpx;
	margin-left: 8rpx;
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	line-height: 24rpx;
	z-index: 11111;
}

</style>
