<template>
	<view class="box">
		<view class="top">
			<view class="t-box">
				<view class="left">
					<image src="@/static/images/logo.png" mode=""></image>
				</view>
				<view class="right">
					<view class="name">
						{{info.name}}
					</view>
					<view class="company">
						执业{{info.working_years}}年/{{info.company}}
					</view>
					<view class="professionObj">
						<view class="profession">
							{{ professionObj[info.profession] }}
						</view>
						<view class="level">
							{{ professionObj1[info.level] }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="titlebox">
				<view class="yuan">
					
				</view>
				<view class="title">
					个人简介
				</view>
			</view>
			<view class="contentText">
				<view :class="isShow ? 'loseText' : 'moreText'" id="moreText">
					{{info.description}}
				</view>
				<view class="btnBox" @click="showMore" v-if="!isShow && more">
					<text>收起</text>
					<image class="iconImg" src="@/static/images/zhankaiIcon.png"></image>
				</view>
				<view class="btnBox" @click="showMore" v-else-if="isShow && more">
					<view class="mask"></view>
					<text>展开</text>
					<image class="iconImg" src="@/static/images/shouqiIcon.png"></image>
				</view>
			</view>
		</view>
		<view class="kong">
				
		</view>
		<view class="zybj">
			<view class="titlebox">
				<view class="yuan">
					
				</view>
				<view class="title">
					专业背景
				</view>
			</view>
			<view class="zybj-content">
				<view class="z-box">
					<view class="z-title">
						{{info.working_years}}
						<text>年</text>
					</view>
					<view class="z-text">
						从业年限
					</view>
				</view>
				<view class="z-box">
					<view class="z-title">
						{{info.cumulative_cases}}
						<text>个</text>
					</view>
					<view class="z-text">
						服务案例
					</view>
				</view>
				<view class="z-box">
					<view class="z-title">
						{{info.number_of_people}}
						<text>个</text>
					</view>
					<view class="z-text">
						服务个数
					</view>
				</view>
			</view>
		</view>
		<view class="kong">
				
		</view>
		<view class="zgrz">
			<view class="titlebox">
				<view class="yuan">
					
				</view>
				<view class="title">
					资格认证
				</view>
			</view>
			<view class="imgbox">
				<image v-if="info.nvq_url" :src="info.nvq_url" mode=""></image>
				<text v-else>暂无认证资料</text>
			</view>
		</view>
		<view class="qyrz">
			<view class="titlebox">
				<view class="yuan">
					
				</view>
				<view class="title">
					企业认证
				</view>
			</view>
			<view class="imgbox">
				<image v-if="info.vocation_url" :src="info.vocation_url" mode=""></image>
				<text v-else>暂无认证资料</text>
			</view>
		</view>
		<view class="cn">
			导游本人承诺以上资料全部属实，接受公众监督，并为此承担相应法律责任。如发现虚假信息，请联系领途羊平台客服进行反馈，谢谢。
		</view>
		<view class="ljzx">
			立即咨询
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bulter_id:'',
				info:{},
				professionObj:{
					'0':'导游',
					'1':'旅游达人',
					'2':'旅游定制师'
				},
				professionObj1:{
					'0':'金牌旅游管家',
					'1':'银牌旅游管家',
					'2':'铜牌旅游管家'
				},
				isShow: true,
				more:true,
			};
		},
		onLoad(query) {
			this.bulter_id = query.bulter_id,
			//获取个人详情
			this.Getinfo()
		},
		methods:{
			//切换简介展开
			showMore() {
				this.isShow = !this.isShow;
			},
			//获取个人详情
			Getinfo(){
				this.HTTP.request({
					url: '/bulter/info',
					data: {
						bulter_id:this.bulter_id
					},
					success: res => {
						this.info = res.data.data
						console.log(this.info,'个人详情')
						if(this.info.description.length < 72){
							this.more = false
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.box{
	 // padding-bottom env(safe-area-inset-bottom)
	 padding-bottom: constant(safe-area-inset-bottom); /*兼容 IOS<11.2*/
	 padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
	.top{
		width: 750rpx;
		height: 440rpx;
		background-image: url(@/static/images/grbg.png);
		background-repeat:no-repeat;
		background-size:100% 100%;
		padding-top: 196rpx;
		.t-box{
			width: 100%;
			height: 100%;
			display: flex;
			.left{
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-left: 28rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.right{
				margin-left: 20rpx;
				.name{
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					margin-top: 20rpx;
				}
				.company{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					margin-top: 20rpx;
				}
				.professionObj{
					display: flex;
					margin-top: 20rpx;
					.profession{
						background: #FFFFFF;
						border-radius: 19rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #A86B13;
						padding: 2rpx 14rpx;
					}
					.level{
						background: #FFFFFF;
						border-radius: 19rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #A86B13;
						padding: 2rpx 14rpx;
						margin-left: 8rpx;
						
					}
				}
			}
		}
	}
	.content{
		height: 250rpx;
		padding: 0 28rpx;
		.titlebox{
			width: 100%;
			height: 88rpx;
			border-bottom: 1rpx solid #EDEFF2;
			display: flex;
			align-items: center;
			.yuan{
				width: 16rpx;
				height: 16rpx;
				background: #FFFFFF;
				border: 4rpx solid #0091FF;
				border-radius: 50%;
			}
			.title{
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #303133;
				margin-left: 12rpx;
			}
		}
		.contentText {
			margin-top: 10rpx;
			margin-bottom: 40rpx;
			position: relative;
			.moreText {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(144, 147, 153, 1);
				line-height: 42rpx;
				text-align:justify;
				text-justify:inter-ideograph;
			}
			.loseText {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(144, 147, 153, 1);
				line-height: 42rpx;
				
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;
				-webkit-line-clamp: 3;
				text-align:justify;
				text-justify:inter-ideograph;
			}
			.btnBox {
				height: 42rpx;
				position: absolute;
				right: 5rpx;
				bottom: 0;
				display: flex;
				justify-content: flex-end;
				z-index: 111;
				.mask{
					width: 64rpx;
					background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
				}
				text {
					height: 100%;
					padding-top: 8rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					line-height: 24rpx;
					color: rgba(48, 49, 51, 1);
					background-color: #FFFFFF;
				}
				.iconImg {
					margin-top: 10rpx;
					height: 24rpx;
					width: 24rpx;
					background-color: #FFFFFF;
				}
			}
		}
	}
	.kong{
		width: 100%;
		height: 20rpx;
		background: #F8F8F8;
	}
	.zybj{
		height: 324rpx;
		padding: 0 28rpx;
		.titlebox{
			width: 100%;
			height: 88rpx;
			border-bottom: 1rpx solid #EDEFF2;
			display: flex;
			align-items: center;
			.yuan{
				width: 16rpx;
				height: 16rpx;
				background: #FFFFFF;
				border: 4rpx solid #FFB64D;
				border-radius: 50%;
			}
			.title{
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #303133;
				margin-left: 12rpx;
			}
		}
		.zybj-content{
			margin-top: 22rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.z-box{
				width: 212rpx;
				height: 194rpx;
				background: #F8F8F8;
				border-radius: 16rpx;
				border: 1rpx solid #EDEFF2;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.z-title{
					font-size: 36rpx;
					font-family: Roboto-Regular, Roboto;
					font-weight: 400;
					color: #0091FF;
					text{
						font-size: 24rpx;
					}
				}
				.z-text{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #303133;
				}
			}
		}
	}
	.zgrz{
		padding: 0 28rpx;
		.titlebox{
			width: 100%;
			height: 88rpx;
			display: flex;
			align-items: center;
			.yuan{
				width: 16rpx;
				height: 16rpx;
				background: #FFFFFF;
				border: 4rpx solid #FF6A59;
				border-radius: 50%;
			}
			.title{
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #303133;
				margin-left: 12rpx;
			}
		}
		.imgbox{
			width: 694rpx;
			height: 390rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			border: 2rpx solid #EDEFF2;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 634rpx;
				height: 330rpx;
			}
			text{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
			}
		}
	}
	.qyrz{
		padding: 0 28rpx;
		.titlebox{
			width: 100%;
			height: 88rpx;
			display: flex;
			align-items: center;
			.yuan{
				width: 16rpx;
				height: 16rpx;
				background: #FFFFFF;
				border: 4rpx solid #0091FF;
				border-radius: 50%;
			}
			.title{
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #303133;
				margin-left: 12rpx;
			}
		}
		.imgbox{
			width: 694rpx;
			height: 390rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			border: 2rpx solid #EDEFF2;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 634rpx;
				height: 330rpx;
			}
			text{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
			}
		}
	}
	.cn{
		width: 694rpx;
		height: 168rpx;
		background: #F8F8F8;
		border-radius: 8rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		padding: 30rpx;
		text-align: justify;
		margin: 20rpx auto;
	}
	.ljzx{
		width: 694rpx;
		height: 88rpx;
		background: #FFE512;
		box-shadow: 0rpx 0rpx 24rpx 0rpx rgba(255, 229, 18, 0.5);
		border-radius: 44rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 28rpx;
		margin-bottom: constant(safe-area-inset-bottom); /*兼容 IOS<11.2*/
		margin-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
	}
}
</style>
