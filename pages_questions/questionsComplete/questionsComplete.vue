<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" title="问题详情">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<view class="title">
			{{detail.title}}
		</view>
		<view class="tips">
			<view class="tip" v-for="(item,index ) in detail.labels" :key="index">
				{{item}}
			</view>
		</view>
		<view class="content">
			{{detail.content}}
		</view>
		<view class="userBox">
			<view class="user">
				<image lazy-load :src="detail.avatar" mode=""></image>
				<text>{{detail.account_name}}</text>
			</view>
			<view class="date">
				问于{{create_at}}
			</view>
		</view>
		<view class="line"></view>
		<view class="bottomBox">
			<image src="/static/images/anull.svg" mode=""></image>
			<view class="text">
				还没有收到回答
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				questions:{},
				question_id:'',
				detail:{},
				create_at:''
			};
		},
		onLoad(options) {
			this.question_id = options.question_id
			this.getquestions()
		},
		methods:{
			getquestions(){
				this.HTTP.request({
					url: '/questions/info',
					data: {
						question_id: this.question_id
					},
					success: res => {
						var detail = res.data.data
						detail.avatar = this.Utils.addImageProcess(detail.avatar, false, 60)
						this.detail = detail
						this.create_at = detail.create_at.slice(0,10)
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.title{
	font-size: 40rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 56rpx;
	margin: 30rpx 28rpx 20rpx;

}
.tips{
	margin: 0rpx 28rpx;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	.tip{
		height: 44rpx;
		background: #EDEFF2;
		border-radius: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 44rpx;
		padding: 0rpx 16rpx;
		margin-right: 16rpx;

	}
}
.content{
	margin: 40rpx 28rpx 20rpx;
	font-size: 30rpx;
	font-family: PingFangSC-Light, PingFang SC;
	font-weight: 300;
	color: #606266;
	line-height: 42rpx;

}
.userBox{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0px 28rpx;
	.user{
		display: flex;
		align-items: center;
		image{
			width: 48rpx;
			height: 48rpx;
			border-radius: 50%;
		}
		text{
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			margin-left: 16rpx;

		}
	}
	.date{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 24rpx;

	}
}
.line{
	width: 100%;
	height: 20rpx;
	background: #F8F8F8;
	margin: 40rpx 0rpx;

}
.bottomBox{
	text-align: center;
	margin: auto;
	image{
		width: 306rpx;
		height: 246rpx;
	}
	.text{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 28rpx;
		margin-top: 24rpx;

	}
}
</style>
