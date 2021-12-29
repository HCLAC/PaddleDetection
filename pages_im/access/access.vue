<template>
	<view class="box">
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" :title="consulting.name">
				
			</uni-nav-bar>
		</view>
		<view class="top">
			<text>说明问题</text>
			<u-icon class="con" name="arrow-right" color="#303133" size="28"></u-icon>
			<text style="color:#A86B13;">接入管家</text>
			<u-icon class="con" name="arrow-right" color="#303133" size="28"></u-icon>
			<text>获取解答</text>
		</view>
		<view class="content">
			<view class="c_card">
				<view class="c_card_top">
					<view class="c_card_top_text">
						{{professionObj[consulting.level]}}
					</view>
				</view>
				<view class="c_card_center">
					<view class="c_card_center_left">
						<view class="left_img">
							<image :src="consulting.bulter_avatar" mode=""></image>
						</view>
						<view class="left_btm">
							<view class="btm_dian"></view>
							<view class="btm_text">咨询中</view>
						</view>
					</view>
					<view class="c_card_center_right">
						<view class="right_one">
							<view class="one_1">
								{{consulting.name}}
							</view>
							<view class="one_2">
								{{professionObj1[consulting.profession]}}
							</view>
						</view>
						<view class="right_two">
							{{consulting.company}}
						</view>
						<view class="right_three">
							<view class="three_1">
								<text>已服务：</text>
								<text style="color: #A86B13;">{{consulting.number_of_people}}</text>
							</view>
							<view class="three_2">
								<text>评分：</text>
								<text style="color: #A86B13;">5分</text>
							</view>
						</view>
					</view>
				</view>
				<view class="c_card_btm">
					<view class="btm_left">
						<view class="left_img">
							<image src="@/static/images/yx.png" mode=""></image>
						</view>
						<view class="left_txt">
							严选保障 · 隐私保护 · 专业旅游管家
						</view>
					</view>
					<view class="btm_right" @click="details">
						<view class="right_txt">
							查看更多
						</view>
						<u-icon class="con" name="arrow-right" color="#303133" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="im_txt">
				<view class="txt">
					{{txt}}
				</view>
				<view class="img">
					<image :src="consulting.user_avatar" mode=""></image>
				</view>
			</view>
			<view class="im_txt_one">
				<view class="img">
					<image :src="consulting.bulter_avatar" mode=""></image>
				</view>
				<view class="txt">
					手机号{{consulting.account_mobile}}的咨询正在通知管家接入，请稍等...
				</view>
			</view>
			<view class="im_txt_two" v-if="show_txt">
				<view class="img">
					<image :src="consulting.bulter_avatar" mode=""></image>
				</view>
				<view class="txt">
					<view class="txt_1">
						已收到问题，请点击下方服务接入，为您提供1小时在线沟通和问题解决方案。
					</view>
					<view class="txt_2">
						<view class="txt_2_img">
							<image :src="consulting.bulter_avatar" mode=""></image>
						</view>
						<view class="txt_2_txt">
							金洋洋管家已通过领途羊认证！
						</view>
					</view>
				</view>
			</view>
			<view class="pay" v-if="show_pay">
				<view class="pay_top">
					<view class="pay_txt">
						旅游定制咨询服务
					</view>
					<view class="pay_img">
						<image src="@/static/images/qian.png" mode=""></image>
					</view>
					<view class="pay_num">
						0.01
					</view>
					<view class="pay_num_1">
						/1小时
					</view>
				</view>
				<view class="pay_content">
					<view class="content_box" style="margin-top: 44rpx;">
						<view class="content_img">
							<image src="@/static/images/pay_one.png" mode=""></image>
						</view>
						<view class="content_txt">
							极速响应，平均5分钟回复
						</view>
					</view>
					<view class="content_box">
						<view class="content_img">
							<image src="@/static/images/pay_two.png" mode=""></image>
						</view>
						<view class="content_txt">
							一对一解答，专业指导
						</view>
					</view>
					<view class="content_box">
						<view class="content_img">
							<image src="@/static/images/pay_three.png" mode=""></image>
						</view>
						<view class="content_txt">
							1小时深度服务，问题解决率99%
						</view>
					</view>
				</view>
				<view class="pay_btm" @click="gen">
					确认咨询
				</view>
			</view>
		</view>
		<view class="btm">
			<view class="btm_txt">
				接入管家后可以使用
			</view>
			<view class="btm_btn">
				发送
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				txt:'',
				show_txt:false,
				show_pay:false,
				consulting:{},
				professionObj: {
					'0': '金牌管家',
					'1': '银牌管家',
					'2': '铜牌管家'
				},
				professionObj1: {
					'0': '导游',
					'1': '旅游达人',
					'2': '旅游定制师'
				},
				
			};
		},
		onLoad(query) {
			this.txt = query.txt
			this.getInfo()
		},
		onShow(){
			setTimeout(() => {
			    this.show_txt = true
			}, 3000);
			setTimeout(() => {
			    this.show_pay = true
			}, 6000);
		},
		methods: {
			gen(){
				this.HTTP.request({
					url: '/pay/gen',
					method: 'POST',
					data: {
						bulter_id: this.consulting.bulter_id,
						first_word:this.txt,
					},
					success: res => {
						console.log(res,'res')
						if(res.data.code == 0){
							uni.requestPayment({
							    provider: 'baidu',
								orderInfo: res.data.data,
							     //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
							    success:  (res) => {
							        console.log('success:' + JSON.stringify(res));
									uni.navigateTo({
										url:'/pages_im/chatroom/chatroom',
									})
							    },
							    fail:  (err) => {
							        console.log('fail:' + JSON.stringify(err));
							    }
							});
						}
					}
				})
			},
			getInfo() {
				this.HTTP.request({
					url: '/bulter/consulting',
					method: 'POST',
					data: {
						bulter_id: this.bulter_id
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						this.consulting = res.data.data
						console.log(this.consulting, '管家列表')
					}
				});
			},
			details() {
				uni.navigateTo({
					url: '/pages_im/housekeeperDetails/housekeeperDetails?bulter_id=' + this.consulting.bulter_id
				})
			},
		},
	}
</script>

<style lang="scss">
page{
	background: #F8F8F8;
}
.box{
	.top{
		background: #FFFFFF;
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1rpx solid #E5E5E5;
		text{
			font-size: 28rpx;
			// font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #303133;
		}
		.con{
			margin: 0 12rpx;
		}
	}
	.content{
		padding: 0 28rpx;
		padding-bottom: 150rpx;
		.c_card{
			width: 694rpx;
			height: 342rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.05);
			border-radius: 12rpx;
			margin-top: 30rpx;
			.c_card_top{
				display: flex;
				justify-content: flex-end;
				.c_card_top_text{
					width: 128rpx;
					height: 40rpx;
					background: #FFE512;
					border-radius: 0rpx 12rpx 0rpx 12rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #303133;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			.c_card_center{
				width: 100%;
				height: 196rpx;
				display: flex;
				.c_card_center_left{
					.left_img{
						width: 112rpx;
						height: 112rpx;
						border-radius: 50%;
						overflow: hidden;
						margin-left: 28rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.left_btm{
						margin-top: 18rpx;
						margin-left: 43rpx;
						display: flex;
						align-content: center;
						.btm_dian{
							width: 6rpx;
							height: 6rpx;
							background: #A86B13;
							margin: auto 0;
						}
						.btm_text{
							font-size: 20rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #A86B13;
							margin-left: 6rpx;
						}
					}
				}
				.c_card_center_right{
					margin-left: 30rpx;
					.right_one{
						display: flex;
						margin-top: 14rpx;
						align-items: center;
						.one_1{
							font-size: 36rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #303133;
						}
						.one_2{
							margin-left: 12rpx;
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #606266;
						}
					}
					.right_two{
						margin-top: 14rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #606266;
					}
					.right_three{
						display: flex;
						margin-top: 12rpx;
						.three_1{
							display: flex;
							align-items: center;
							width: 170rpx;
							height: 26rpx;
							border-right: 1rpx solid #E5E5E5;
							text{
								font-size: 26rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #909399;
							}
						}
						.three_2{
							height: 26rpx;
							display: flex;
							align-items: center;
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							margin-left: 16rpx;
						}
					}
				}
			}
			.c_card_btm{
				width: 630rpx;
				height: 104rpx;
				margin: 0 auto;
				border-top: 1rpx solid #E5E5E5;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 ;
				.btm_left{
					display: flex;
					align-items: center;
					width: 462rpx;
					height: 64rpx;
					background: linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 0%, #FFF8BB 100%);
					border-radius: 20rpx;
					padding-left: 16rpx;
					.left_img{
						width: 30rpx;
						height: 30rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.left_txt{
						font-size: 24rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #A86B13;
						margin-left: 8rpx;
					}
				}
				.btm_right{
					display: flex;
					align-items: center;
					.right_txt{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #303133;
					}
				}
			}
		}
		.im_txt{
			display: flex;
			justify-content: flex-end;
			margin-top: 40rpx;
			.txt{
				max-width: 462rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #303133;
				background: #D1E2FF;
				border-radius: 24rpx 0rpx 24rpx 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 10rpx 20rpx;
				margin-right: 20rpx;
			}
			.img{
				width: 72rpx;
				height: 72rpx;
				border-radius: 36rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.im_txt_one{
			display: flex;
			// justify-content: flex-end;
			margin-top: 30rpx;
			.txt{
				max-width: 540rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #303133;
				background: #FFFFFF;
				border-radius: 0px 24rpx 24rpx 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 10rpx 20rpx;
				margin-left: 20rpx;
			}
			.img{
				width: 72rpx;
				height: 72rpx;
				border-radius: 36rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.im_txt_two{
			display: flex;
			// justify-content: flex-end;
			margin-top: 30rpx;
			.txt{
				width: 540rpx;
				height: 276rpx;
				background: #FFFFFF;
				border-radius: 0px 24rpx 24rpx 24rpx;
				// display: flex;
				// justify-content: center;
				// align-items: center;
				padding: 20rpx 20rpx 0;
				margin-left: 20rpx;
				.txt_1{
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #303133;
				}
				.txt_2{
					width: 100%;
					height: 88rpx;
					border-top: 1rpx solid #E5E5E5;
					display: flex;
					align-items: center;
					margin-top: 22rpx;
					.txt_2_img{
						width: 48rpx;
						height: 48rpx;
						border-radius: 36rpx;
						overflow: hidden;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.txt_2_txt{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #D84035;
						margin-left: 20rpx;
					}
				}
				
			}
			.img{
				width: 72rpx;
				height: 72rpx;
				border-radius: 36rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.pay{
			width: 630rpx;
			height: 470rpx;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 20rpx 0px rgba(0, 0, 0, 0.05);
			border-radius: 20rpx;
			margin: 40rpx auto;
			padding: 50rpx 40rpx 0;
			.pay_top{
				display: flex;
				.pay_txt{
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #303133;
					display: flex;
					align-items: flex-end;
				}
				.pay_img{
					width: 18rpx;
					height: 24rpx;
					margin-left: 20rpx;
					line-height: 60rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.pay_num{
					font-size: 48rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #D84035;
					line-height: 48rpx;
				}
				.pay_num_1{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909399;
					line-height: 50rpx;
					margin-left: 8rpx;
				}
			}
			.pay_content{
				.content_box{
					display: flex;
					align-items: center;
					margin-top: 18rpx;
					.content_img{
						width: 32rpx;
						height: 32rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.content_txt{
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #303133;
						margin-left: 12rpx;
					}
				}
			}
			.pay_btm{
				width: 550rpx;
				height: 90rpx;
				background: #D84035;
				border-radius: 20rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 42rpx;
			}
		}
	}
	.btm{
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		width: 750rpx;
		height: 168rpx;
		background: #FFFFFF;
		padding: 0 28rpx;
		padding-bottom: 68rpx;
		.btm_txt{
			width: 522rpx;
			height: 72rpx;
			background: #F8F8F8;
			border-radius: 36rpx;
			padding-left: 32rpx;
			color: #C9CAD1;
			display: flex;
			align-items: center;
		}
		.btm_btn{
			width: 144rpx;
			height: 72rpx;
			background: #C9CAD1;
			border-radius: 36rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			margin-left: 28rpx;
		}
	}
}
</style>
