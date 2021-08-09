<template>
	<u-waterfall v-model="list" ref="uWaterfall">
		<template v-slot:left="{ leftList }">
			<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
				<view class="" v-if="item.type != 6">
					<view class="" @click="toArticleDetail" :id="item.article_id">
						<view class="demo-top">
							<view class="imgBox">
								<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :lazy-load="true" :src="item.image" :index="index"
								 mode="widthFix">
									<view class="videoIcon" v-if="item.type == 4">
										<image class="playIcon" src="/static/images/playIcon.svg" mode=""></image>
									</view>
								</image>
								<view class="adress">
									<view class="adreessIcon">
										<image class="" src="/static/images/iconMap3.svg" mode=""></image>
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
							<image class="userHeard" :src="item.avatar"></image>
							<view class="userNikename">{{ item.author_name }}</view>
						</view>
						<view class="count" @click="clickLeftLike(item,index) in leftList ">
							<view class="countImg">
								<image class="likeImg" mode="aspectFit" src="/static/images/heart.svg" v-if="item.liked == 0"></image>
								<image class="likeImg" mode="aspectFit" src="/static/images/heart_actived.svg" v-if="item.liked == 1"></image>
							</view>
							<view class="likeCount" v-if="item.like_count != 0">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view>
						</view>
					</view>
				</view>
				<view class="answersBox" v-else-if="item.type == 6" @click="toQuestionsDetail" :id="item.question_id"> 
					<image src="/static/images/yh.svg" mode=""></image> 
					<view class="answersTitle">
						{{item.title}} 
					</view> 
					<view class="answersNum"> 
						{{item.reply_count}} 回答 
					</view> 
				</view> 
			</view>
		</template>
		<template v-slot:right="{ rightList }">
			<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
				<view class="" v-if="item.type != 6"> 
					<view class="" @click="toArticleDetail" :id="item.article_id">
						<view class="demo-top">
							<view class="imgBox">
								<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :lazy-load="true" :src="item.image" :index="index"
								 mode="widthFix">
									<view class="videoIcon" v-if="item.type == 4">
										<image class="playIcon" src="/static/images/playIcon.svg" mode=""></image>
									</view>
								</image>
								<view class="adress">
									<view class="adreessIcon">
										<image class="" src="/static/images/iconMap3.svg" mode=""></image>
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
							<image class="userHeard" :src="item.avatar"></image>
							<view class="userNikename">{{ item.author_name }}</view>
						</view>
						<view class="count" @click="clickRightLike(item,index) in rightList">
							<view class="countImg">
								<image class="likeImg" mode="aspectFit" src="/static/images/heart.svg" v-if="item.liked == 0"></image>
								<image class="likeImg" mode="aspectFit" src="/static/images/heart_actived.svg" v-if="item.liked == 1"></image>
							</view>
							<view class="likeCount" v-if="item.like_count != 0">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view>
						</view>
					</view>
				</view>
				<view class="answersBoxR" v-else-if="item.type == 6" @click="toQuestionsDetail" :id="item.question_id"> 
					<image src="/static/images/yh.svg" mode=""></image> 
					<view class="answersTitle"> 
						{{item.title}} 
					</view> 
					<view class="answersNum"> 
						{{item.reply_count}} 回答 
					</view> 
				</view> 
			</view>
		</template>
	</u-waterfall>
</template>

<script>
	export default {
		name:"article-waterfall",
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
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			// 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
			
			// 跳转问题详情
			toQuestionsDetail(item){
				console.log("itme", item)
				var question_id = item.currentTarget.id
				uni.navigateTo({
					url: '/pages_questions/questionsDetail/questionsDetail?question_id=' + question_id
				});
			},
			// 跳转文章详情
			toArticleDetail(e) {
				let id = e.currentTarget.id;
				uni.navigateTo({
					url: '/pages_content/article/article?article_id=' + id
				});
			},
			// 点赞 
			clickLeftLike(e, index) {
				this.updateLike(e,index,true) 
			}, 
			clickRightLike(e, index) {
				this.updateLike(e,index,false) 
			},
			updateLike(e, index, left){
				let Authorization = uni.getStorageSync('Authorization')
				if (!Authorization){
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
					return
				}
				
				let article = e.article_id;
				let liked = e.liked;
				var that = this;
				this.HTTP.request({
					url: '/user/liked',
					data: {
						article_id: article,
						liked: liked == 0 ? 1 : 0
					},
					method: 'POST',
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
						
						if (left){
							this.$refs.uWaterfall.leftList[index].liked = res.data.data.liked
							this.$refs.uWaterfall.leftList[index].like_count = res.data.data.like_count
						}else{
							this.$refs.uWaterfall.rightList[index].liked = res.data.data.liked
							this.$refs.uWaterfall.rightList[index].like_count = res.data.data.like_count
						}
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
		margin-right: 14rpx;
		margin-bottom: 16rpx;
		padding-bottom: 16rpx;
		/* position: relative; */
		background-color: #ffffff;
		border-radius: 16rpx 16rpx;
		box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
		// display: inline-block;
		// break-inside: avoid;
		// box-sizing: border-box;
	}

	.imgBox {
		position: relative;
		display: flex;
		align-items: flex-end;

	}

	// .imgBox4{
	// 	position: relative;
	// 	display: flex;
	// 	align-items: flex-end;

	// }
	/* .demo-top {
	position: relative;
}
 */
	image {
		will-change: transform
	}

	.demoImage {
		width: 100%;
		// min-height: 300rpx;
		max-height: 800rpx;
		// box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
		border-radius: 16rpx 16rpx 0px 0px;

	}

	.demoImage4 {
		width: 100%;
		// min-height: 272rpx;
		max-height: 800rpx;
		// box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
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
		/* line-height:24px; */
		/* margin-right: 16rpx; */
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
		/* max-height: 70rpx; */
		padding-right: 20rpx;
		font-size: 28rpx;
		// font-family: PingFangSC-Medium, PingFang SC;
		// font-weight: 500;
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
		width: 52rpx;
		height: 28rpx;
		text-align: center;
		align-items: center;
		color: #0091ff;
		border: 2rpx solid rgba(0, 145, 255, 1);
		border-radius: 14rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 145, 255, 1);
		/* margin-top: 6rpx; */
	}

	.demo-user {
		width: 100%;
		font-size: 10rpx;
		margin-top: 24rpx;
		/* margin-bottom: 16rpx; */
		display: flex;
		align-items: center;
		justify-content: space-between;
		// box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
		// border-radius: 0px 0px 16rpx 16rpx;
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
		width: 28rpx;
		height: 28rpx;
		// margin-right: 8rpx;

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
		/* line-height:20rpx; */
	}
	
	.answersBox{
		background: linear-gradient(270deg, #6BBEFF 0%, #0091FF 100%);
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
			// width: 276rpx;
			font-size: 36rpx;
			letter-spacing: 2rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 50rpx;
			margin-top: -8rpx;
			line-height: 50rpx;
	
		}
		.answersNum{
			// height: 34rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Light, PingFang SC;
			font-weight: 300;
			color: #FFFFFF;
			line-height: 34rpx;
			margin-top: 40rpx;
	
		}
	
	}
	.answersBoxR{
		background: linear-gradient(270deg, #FFE512 0%, #FFB64D 100%);
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
			// width: 276rpx;
			font-size: 36rpx;
			letter-spacing: 2rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 50rpx;
	
		}
		.answersNum{
			// height: 34rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Light, PingFang SC;
			font-weight: 300;
			color: #FFFFFF;
			line-height: 34rpx;
			margin-top: 40rpx;
	
		}
	
	}
	
</style>
