<template>
	<view class="box">
		<!-- 顶部栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" title="行程定制">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="home" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- banner图 -->
		<view class="banner">
			<view class="banner-txt">
				咨询旅游管家，解锁更多旅游线路…
			</view>
		</view>
		<!-- 提示 -->
		<view class="prompt" v-if="promptShow">
			<view class="prompt-img">
				<image src="https://cache.lingtuyang.cn/web_static/xc-prompt.png" mode=""></image>
			</view>
			<view class="prompt-txt">
				共18条线路，持续更新中…
			</view>
		</view>
		<!-- 行程为空 -->
		<view class="prompt-kong" v-else>
			<view class="prompt-kong-img">
				<image src="@/static/images/index-kong.png" mode=""></image>
			</view>
			<view class="prompt-kong-txt">
				暂无匹配路线，推荐您修改出行方式 或咨询旅游管家定制专属路线～
			</view>
		</view>
		<!-- 有数据时列表 -->
		<view class="List" v-for="(item,index) in form" v-if="promptShow">
			<view class="left">
				<view class="title">
					成都出发，自驾西藏，川进青出-5日川藏环线
				</view>
				<view class="money">
					参考价格：1280～2650
				</view>
				<view class="day-box">
					<view class="day">
						5日行程
					</view>
					<view class="label">
						人文
					</view>
				</view>
			</view>
			<view class="right">
				<view class="img">
					
				</view>
				<view class="txt">
					定制师推荐路线
				</view>
			</view>
		</view>
		<!-- 无数据时列表 -->
		<view class="List-box" v-else>
			<view class="list-top">
				<view class="left">
					<view class="left-txt">
						推荐线路
					</view>
					<view class="left-img">
						<image src="https://cache.lingtuyang.cn/web_static/xc-border.png" mode=""></image>
					</view>
				</view>
				<view class="right">
					<view class="right-img">
						<image src="https://cache.lingtuyang.cn/web_static/xc-hyp.png" mode=""></image>
					</view>
					<view class="right-txt">
						换一批
					</view>
				</view>
			</view>
			<view class="List" v-for="(item,index) in recommendation">
				<view class="left">
					<view class="title">
						成都出发，自驾西藏，川进青出-5日川藏环线
					</view>
					<view class="money">
						参考价格：1280～2650
					</view>
					<view class="day-box">
						<view class="day">
							5日行程
						</view>
						<view class="label">
							人文
						</view>
					</view>
				</view>
				<view class="right">
					<view class="img">
						
					</view>
					<view class="txt">
						定制师推荐路线
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				promptShow:true,//有无线路
				form:[
					{
						id:1
					},
					{
						id:2
					}
				],
				recommendation:[
					{
						id:1
					},
					{
						id:2
					}
				]
			};
		},
		methods:{
			//返回首页
			home(){
				this.Utils.home()
			},
		}
	}
</script>

<style lang="scss">
.box{
	padding:  0 28rpx;
	.banner{
		width: 694rpx;
		height: 320rpx;
		border-radius: 16rpx;
		background: pink;
		display: flex;
		align-items: flex-end;
		.banner-txt{
			width: 694rpx;
			height: 98rpx;
			background-image: url(https://cache.lingtuyang.cn/web_static/xc-mbl.png);
			border-radius: 0px 0px 16rpx 16rpx;
			background-size: 100%;
			background-origin: center center;
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			padding-left: 30rpx;
		}
	}
	.prompt{
		margin-top: 30rpx;
		width: 694rpx;
		height: 44rpx;
		background: #F8F8F8;
		margin-bottom: 10rpx;
		display: flex;
		align-items: center;
		.prompt-img{
			width: 44rpx;
			height: 44rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.prompt-txt{
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #303133;
		}
	}
	.prompt-kong{
		display: flex;
		align-items: center;
		margin-top: 40rpx;
		margin-bottom: 80rpx;
		.prompt-kong-img{
			width: 88rpx;
			height: 90rpx;
			margin-left: 68rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.prompt-kong-txt{
			width: 416rpx;
			height: 72rpx;
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #909399;
			margin-left: 30rpx;
		}
	}
	.List{
		margin-top: 30rpx;
		display: flex;
		border-bottom: 1rpx solid #EDEFF2;
		.left{
			width: 328rpx;
			height: 224rpx;
			.title{
				width: 328rpx;
				height: 80rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #303133;
			}
			.money{
				font-size: 28rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #E41D54;
				margin-top: 20rpx;
			}
			.day-box{
				display: flex;
				margin-top: 20rpx;
				.day{
					background: #EDEFF2;
					border-radius: 4rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #303133;
					display: flex;
					justify-content: center;
					align-items: center;
					padding:0 10rpx;
				}
				.label{
					background: #EDEFF2;
					border-radius: 4rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #303133;
					display: flex;
					justify-content: center;
					align-items: center;
					padding:0 10rpx;
					margin-left: 10rpx;
				}
			}
		}
		.right{
			position: relative;
			.img{
				width: 346rpx;
				height: 194rpx;
				border-radius: 16rpx;
				background: yellow;
				margin-left: 20rpx;
			}
			.txt{
				position: absolute;
				top: 0;
				left: 20rpx;
				height: 36rpx;
				background: rgba(0, 0, 0, 0.5);
				border-radius: 16rpx 0px 16rpx 0px;
				backdrop-filter: blur(10rpx);
				font-size: 20rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 16rpx;
			}
		}
	}
	.List-box{
		.list-top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				position: relative;
				.left-txt{
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #303133;
					position: relative;
					z-index: 10;
				}
				.left-img{
					width: 140rpx;
					height: 12rpx;
					position: absolute;
					top: 22rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			.right{
				display: flex;
				align-items: center;
				.right-img{
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.right-txt{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #303133;
				}
			}
		}
	}
}
</style>
