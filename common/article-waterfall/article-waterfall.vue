<template>
	<u-waterfall v-model="list" add-time='100' idKey='article_id' ref="uWaterfall">
		<template v-slot:left="{ leftList }">
			<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
				<view class="" v-if="item.type != 6">
					<view class="" @tap.stop="toArticleDetail(item) in leftList">
						<view class="demo-top">
							<view class="imgBox">
								 <articleImage :class="item.type == 4 ? 'demoImage4' : 'demoImage'" border-radius="16rpx 16rpx 0 0" :height="item.height?item.height:'220rpx'" :src="item.image" :index="(index+1)*2-1" :mode="item.height?'scaleToFill':'widthFix'">
									<view class="videoIcon" v-if="item.type == 4">
										<image class="playIcon" src="/static/images/playIcon.svg"></image>
									</view>
								</articleImage>	
								<view class="adress">
									<view class="adreessIcon">
										<image class="" src="/static/images/iconMap3.svg"></image>
									</view>
									<view class="adressText">{{ item.location }}</view>
								</view>
							</view>
						</view>
						<view class="titleTip">
							<view class="demo-tag">
								<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
								<view class="demo-tag-owner" v-else-if="item.type == 2">攻略</view>
								<view class="demo-tag-owner" v-else-if="item.type == 4">视频</view>
								<view class="demo-tag-owner" v-else>文章</view>
							</view>
							<view class="demo-title">{{ item.title }}</view>
						</view>
					</view>
					<view class="demo-user">
						<view class="userMessage">
							<image class="userHeard" lazy-load :src="item.avatar"></image>
							<view class="userNikename">{{ item.author_name }}</view>
						</view>
						<view class="count" @tap.stop="updateLikeLeft(item, index) in leftList">
							<view class="countImg">
								<!-- <image class="likeImg" mode="aspectFit" :src="item.liked == 0?'/static/images/heart.svg':'/static/images/heart_actived.svg'"></image> -->
								<view v-if="item.isAnimate" class="icon-animate"></view>
								<view v-else :class="item.liked?'has-like':'icon-like'"></view>
							</view>
							<view class="likeCount" v-if="item.like_count != 0">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view>
						</view>
					</view>
				</view>
				<view class="answersBox" :style="item.style" v-else-if="item.type == 6" @click="toQuestionsDetail(item,index) in leftList"> 
					<image src="/static/images/yh.svg"></image> 
					<view class="answersTitle">
						{{item.title}} 
					</view> 
					<view class="answersNum"> 
						{{item.reply_count}}个回答 
					</view> 
				</view> 
			</view>
		</template>
		<template v-slot:right="{ rightList }">
			<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
				<view class="" v-if="item.type != 6"> 
					<view class="" @click="toArticleDetail(item) in rightList">
						<view class="demo-top">
							<view class="imgBox">
								<articleImage :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :height="item.height?item.height:'auto'" :lazy-load="true" :src="item.image" :index="index*2" :mode="item.height?'scaleToFill':'widthFix'">
									<!-- <view class="videoIcon" v-if="item.type == 4">
										<image class="playIcon" src="/static/images/playIcon.svg"></image>
									</view> -->
								</articleImage>
								<view class="adress">
									<view class="adreessIcon">
										<image class="" src="/static/images/iconMap3.svg"></image>
									</view>
									<view class="adressText">{{ item.location }}</view>
								</view>
							</view>
						</view>
						<view class="titleTip">
							<view class="demo-tag">
								<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
								<view class="demo-tag-owner" v-else-if="item.type == 2">攻略</view>
								<view class="demo-tag-owner" v-else-if="item.type == 4">视频</view>
								<view class="demo-tag-owner" v-else>文章</view>
							</view>
							<view class="demo-title">{{ item.title }}</view>
						</view>
					</view>
					<view class="demo-user">
						<view class="userMessage">
							<image class="userHeard" lazy-load :src="item.avatar"></image>
							<view class="userNikename">{{ item.author_name }}</view>
						</view>
						<view class="count" @click="updateLikeRight(item, index) in rightList">
							<view class="countImg">								
								<!-- <image class="likeImg" mode="aspectFit" :src="item.liked == 0?'/static/images/heart.svg':'/static/images/heart_actived.svg'"></image> -->
								<view v-if="item.isAnimate" class="icon-animate"></view>
								<view v-else :class="item.liked?'has-like':'icon-like'"></view>
							</view>
							<view class="likeCount" v-if="item.like_count != 0">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view>
						</view>
					</view>
				</view>
				<view class="answersBoxR" :style="item.style" v-else-if="item.type == 6" @click="toQuestionsDetail(item,index) in rightList"> 
					<image src="/static/images/yh.svg"></image> 
					<view class="answersTitle"> 
						{{item.title}} 
					</view> 
					<view class="answersNum"> 
						{{item.reply_count}}个回答 
					</view> 
				</view> 
			</view>
		</template>
	</u-waterfall>
</template>

<script>
	import articleImage from './article-image.vue';
	export default {
		name:"article-waterfall",
		components: {
			articleImage
		},
		props:{
			list:{
				type: Array,
				default(){
					return []
				}
			},
			name: {
				type: String,
				default(){
					return "文章列表"
				}
			},
			clearList: {
				type: Boolean,
				default(){
					return false
				}
			},
		},
		data() {
			return {
				hasLikeClick: false
			};
		},
		watch: {
			clearList(newVal){
				if (newVal){
					this.$refs.uWaterfall.clear()
				}
			}
		},
		methods:{
			// 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
			// 跳转问题详情
			toQuestionsDetail(obj,index){
				uni.navigateTo({
					url: '/pages_questions/questionsDetail/questionsDetail?question_id=' + obj.question_id +'&background=' + obj.style.background
				});
			},
			// 跳转文章详情
			toArticleDetail(obj) {
				let url = '/pages_content/article/article?article_id=' + obj.article_id
				if (obj.trace_info && obj.rn) {
					url += '&trace_info='+obj.trace_info+"&rn="+obj.rn
					this.Opensearch.uploadData({
						trace_info: obj.trace_info,
						rn: obj.rn,
						item_id: obj.article_id,
						bhv_type: 'click'
					})
				}
				uni.navigateTo({
					url: url
				});
			},
			// 点赞 
			updateLikeLeft(e, index) {
				this.updateLike(e, index, true) 
			}, 
			updateLikeRight(e, index) {
				this.updateLike(e, index, false) 
			},
			updateLike(obj, index, left){
				if (!this.Utils.isLogin()){
					return
				}
				if (this.hasLikeClick) {
					return;
				}
				
				var that = this;
				if (obj.liked === 0){
					if (left){
						that.$refs.uWaterfall.leftList[index].isAnimate = true
					} else {
						that.$refs.uWaterfall.rightList[index].isAnimate = true
					}
					setTimeout(() => {
						if (left){
							that.$refs.uWaterfall.leftList[index].isAnimate = false
						} else {
							that.$refs.uWaterfall.rightList[index].isAnimate = false
						}
					}, 800);
				}
				this.hasLikeClick = true;
				this.HTTP.request({
					url: '/user/liked',
					data: {
						article_id: obj.article_id,
						liked: obj.liked == 0 ? 1 : 0
					},
					method: 'POST',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						
						if (left){
							that.$refs.uWaterfall.leftList[index].liked = res.data.data.liked
							that.$refs.uWaterfall.leftList[index].like_count = res.data.data.like_count
						} else {
							that.$refs.uWaterfall.rightList[index].liked = res.data.data.liked
							that.$refs.uWaterfall.rightList[index].like_count = res.data.data.like_count
						}
						
						if (obj.trace_info && obj.rn) {
							that.Opensearch.uploadData({
								trace_info: obj.trace_info,
								rn: obj.rn,
								item_id: obj.article_id,
								bhv_type: 'like'
							})
						}
					},
					complete: () => {
						that.hasLikeClick = false;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.demo-warter {
		width: 340rpx;
		margin-top: 0;
		margin-right: 7rpx;
		margin-left: 7rpx;
		margin-bottom: 16rpx;
		background-color: #ffffff;
		border-radius: 16rpx 16rpx;
		box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
	}

	.imgBox {
		position: relative;
		display: flex;
		align-items: flex-end;

	}

	image {
		will-change: transform
	}

	.demoImage {
		width: 100%;
		max-height: 800rpx;
		border-radius: 16rpx 16rpx 0px 0px;

	}

	.demoImage4 {
		width: 100%;
		max-height: 800rpx;
		border-radius: 16rpx 16rpx 0px 0px;
		
	}

	.videoIcon {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -30rpx;
		margin-left: -30rpx;
		width: 60rpx;
		height: 60rpx;
	}

	.playIcon {
		width: 100%;
		height: 100%;
	}

	.adress {
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		max-width: 240rpx;
		height: 40rpx;
		padding-right: 16rpx;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 0px 14rpx 0px 0px;
	}

	.adreessIcon {
		width: 24rpx;
		height: 24rpx;
		margin: 0 4rpx;
		display: flex;
	}

	.adreessIcon image {
		width: 100%;
		height: 100%;
	}

	.adressText {
		max-width: 192rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.titleTip {
		display: flex;
		margin-top: 10rpx;
		margin-left: 8rpx;
	}

	.demo-title {
		width: 278rpx;
		padding-right: 20rpx;
		font-size: 28rpx;
		color: rgba(48, 49, 51, 1);
		margin-left: 8rpx;
		line-height: 46rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.demo-tag {
		margin-top: 9rpx;
	}

	.demo-tag-owner {
		width: 54rpx;
		height: 28rpx;
		text-align: center;
		align-items: center;
		color: #0091ff;
		border: 2rpx solid rgba(0, 145, 255, 1);
		border-radius: 14rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		/* margin-top: 6rpx; */
	}

	.demo-user {
		width: 100%;
		font-size: 10rpx;
		margin-top: 24rpx;
		padding-bottom: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.userMessage {
		font-size: 10px;
		font-weight: 900;
		color: #464646;
		display: flex;
		align-items: center;
	}

	.userHeard {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-left: 14rpx;
	}

	.userNikename {
		font-size: 24rpx;
		margin-left: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(96, 98, 102, 1);
	}

	.count {
		display: flex;
		align-items: center;
		margin-right: 20rpx;
	}
	/* #ifdef MP-TOUTIAO || MP-WEIXIN */
	.count image {
		width: 26rpx;
		height: 26rpx;
		margin-right: 8rpx;
		display: flex;
		align-items: center;
	}
	/* #endif */
	.countImg {
		width: 32rpx;
		height: 32rpx;
		// margin-right: 8rpx;
		.has-like {
			width: 100%;
			height: 100%;
		    display: inline-block;
		    background-size: 100%;
		    background-origin: center center;
		    background-image: url(../../static/images/attHeartActive.svg);
		}
		.icon-like {
			width: 100%;
			height: 100%;
		    display: inline-block;
		    background-image: url(../../static/images/attheart.svg);
		    background-size: 100%;
		    background-origin: center center;
		}
		
		.icon-animate {
			width: 100%;
			height: 100%;
			display: block;
		    background-image: url(../../static/icon-heart.gif);
		    background-size: 100%;
		    background-origin: center center;
		}
	}

	.likeImg {
		width: 100%;
		height: 100%;
	}

	.likeCount {
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		margin-left: 8rpx;
		color: rgba(96, 98, 102, 1);
	}
	.answersBox{
		box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
		border-radius: 16rpx;
		padding: 80rpx 32rpx 40rpx;
		position: relative;
		image{
			width: 76rpx;
			height: 54rpx;
			position: absolute;
			top: 48rpx;
			left: 32rpx;
		}
		.answersTitle{
			font-size: 36rpx;
			letter-spacing: 2rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 50rpx;
			margin-top: -8rpx;
			line-height: 50rpx;
			text-align: justify;
		}
		.answersNum{
			font-size: 24rpx;
			font-family: PingFangSC-Light, PingFang SC;
			font-weight: 300;
			color: #FFFFFF;
			line-height: 34rpx;
			margin-top: 40rpx;
	
		}
	
	}
	.answersBoxR{
		box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
		border-radius: 16rpx;
		padding: 80rpx 32rpx 40rpx;
		position: relative;
		image{
			position: absolute;
			top: 48rpx;
			left: 32rpx;
			width: 76rpx;
			height: 54rpx;
			
		}
		.answersTitle{
			font-size: 36rpx;
			letter-spacing: 2rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 50rpx;
			text-align: justify;
		}
		.answersNum{
			font-size: 24rpx;
			font-family: PingFangSC-Light, PingFang SC;
			font-weight: 300;
			color: #FFFFFF;
			line-height: 34rpx;
			margin-top: 40rpx;
	
		}
	
	}
	
</style>
