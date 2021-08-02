<template>
	<view class="wrap1" @tap="onTap">		
		<view class="demo-warter" @click="onPageJump" :id="item.article_id">
			<view class="demo-top">
				<view class="imgBox">
					<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :lazy-load="true" :src="item.image" :index="index"
					 mode="widthFix" @load="emitHeight" >
						<view class="videoIcon" v-if="item.type == 4">
							<image class="playIcon" src="../../static/images/playIcon.svg" mode=""></image>
						</view>
					</image>
					<view class="adress">
						<view class="adreessIcon">
							<image class="" src="../../static/images/iconMap3.svg" mode=""></image>
						</view>
						<view class="adressText">{{ item.location  }}</view>
					</view>
				</view>
			</view>
			<view class="titleTip">
				<view class="demo-tag">
					<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
					<view class="demo-tag-owner" v-else-if="item.type == 2">攻略</view>
					<view class="demo-tag-owner" v-else-if="item.type == 4">视频</view>
					<view class="demo-tag-owner" v-else>旅游</view>
				</view>
				<view class="demo-title">{{ item.title }}</view>
			</view>
		</view>
		<view class="demo-user">
			<view class="userMessage">
				<image class="userHeard" :src="item.avatar"></image>
				<view class="userNikename">{{ item.author_name }}</view>
			</view>
			<view class="count" @click="clickLike(item,index) ">
				<view class="countImg">
					<image class="likeImg" mode="aspectFit" :src="item.liked == 0?'../../static/images/heart.svg':'../../static/images/heart_actived.svg'"></image>
				</view>
				<view class="likeCount" v-if="item.like_count != 0">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"article-info",
		props:{
			params:{
				type: Object,
				default(){
					return {}
				}
			},
			tag:{
				type:String | Number,
				default:''
			},
			index:{
				type:Number,
				default:-1
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			// 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
			emitHeight(e){
				const query = uni.createSelectorQuery().in(this);
				query.select('.waterfall-item').boundingClientRect(data => {
					let height = Math.floor(data.height);
					this.$emit("height",height,this.$props.tag);
				}).exec();
			},
			onTap(){
				this.$emit("click",this.$props.index,this.$props.tag);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 750rpx;
		display: flex;
		flex-flow: row;
		flex-wrap: wrap;
		padding: 0 14rpx 0 28rpx;
	}
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
</style>
