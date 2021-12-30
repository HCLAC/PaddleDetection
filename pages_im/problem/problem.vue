<template>
	<view class="box">
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" :title="consulting.name">
				
			</uni-nav-bar>
		</view>
		<view class="top">
			<text style="color:#A86B13;">说明问题</text>
			<u-icon class="con" name="arrow-right" color="#303133" size="28"></u-icon>
			<text>接入管家</text>
			<u-icon class="con" name="arrow-right" color="#303133" size="28"></u-icon>
			<text>获取解答</text>
		</view>
		<view class="content">
			<view class="c_top">
				欢迎使用领途羊旅游管家，已累计为10000+人提供旅游出行相关咨询服务。继续咨询即表示您已经同意
				<text>《用户服务协议》</text>
				与
				<text>《个人信息保护协议》《咨询产品服务协议》</text>
			</view>
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
			<view class="im">
				<view class="im_img">
					<image :src="consulting.bulter_avatar" mode=""></image>
				</view>
				<view class="im_txt">
					hi，我是旅游管家{{consulting.name}}，请问您最近有出游的打算么？
				</view>
			</view>
		</view>
		<view class="btm">
			<input v-model.trim="txt" @input="input"  class="btm_input" placeholder-style='color:#C9CAD1;' type="text" placeholder='简单描述你的问题(至少十个字)' />
			<view class="btm_btn" @click="send" :style="{'color':color,'background':bgcolor}">
				发送
			</view>
		</view>
		<u-popup v-model="show" mode="bottom" border-radius="20" :closeable='true'>
			<view class="box_min">
				<view class="" style="font-size: 36rpx;color: #303133;margin-top: 70rpx;">
					手机号授权申请
				</view>
				<view class="" style="font-size: 28rpx;color: #909399;margin-top: 20rpx;">
					领途羊旅游管家申请获得您的手机号，方便平台合作导游为您提供更详细的咨询服务
				</view>
				<view class="" style="font-size: 40rpx;color: #303133;margin-top: 60rpx;">
					{{consulting.account_mobile}}
				</view>
				<view class=""  style="font-size: 28rpx;color: #0091FF;margin-top: 20rpx;">
					已绑定手机号
				</view>
				<view class="min_btn" @click="goNext">
					同意授权
				</view>
				<view class="" style="font-size: 24rpx;color: #909399;margin-top: 30rpx;">
					说明：授权后，旅游管家会主动联系你，请保持电话通畅
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				color:'',
				bgcolor:'',
				show:false,
				txt:'',
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
				bulter_id: '',
				cursor:'',
			};
		},
		onLoad(query) {
			this.bulter_id = query.bulter_id
			this.getInfo()
		},
		onShow(){
			// this.getInfo()
		},
		methods: {
			input(value){
				this.cursor = value.detail.cursor
				
				if(value.detail.cursor >= 10){
					this.color = '#303133'
					this.bgcolor = '#FFE512'
				}
			},
			send(){
				if(this.txt == '' || this.cursor < 10){
					return
				}
				this.show = !this.show
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
						// this.getCard()
					}
				});
			},
			details() {
				uni.navigateTo({
					url: '/pages_im/housekeeperDetails/housekeeperDetails?bulter_id=' + this.consulting.bulter_id
				})
			},
			goNext(){
				uni.navigateTo({
					url: '/pages_im/access/access?txt=' + this.txt +'&bulter_id=' + this.consulting.bulter_id
				})
				this.show = !this.show
				this.txt = ''
			}
		},
	}
</script>

<style lang="scss">
page{
	background: #F8F8F8;
	height: 100%;
	overflow: hidden;
	
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
		.c_top{
			width: 694rpx;
			height: 154rpx;
			background: #EFEFEF;
			border-radius: 12rpx;
			margin: 30rpx auto;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #303133;
			padding: 20rpx;
			line-height: 38rpx;
			text{
				color: #A86B13;
			}
		}
		.c_card{
			width: 694rpx;
			height: 342rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.05);
			border-radius: 12rpx;
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
		.im{
			display: flex;
			margin-top: 40rpx;
			.im_img{
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.im_txt{
				margin-left: 20rpx;
				width: 570rpx;
				// height: 142rpx;
				background: #FFFFFF;
				border-radius: 0rpx 24rpx 24rpx 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 20rpx;
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
		.btm_input{
			width: 522rpx;
			height: 72rpx;
			background: #F8F8F8;
			border-radius: 36rpx;
			padding-left: 32rpx;
			color: #303133;
		}
		.btm_btn{
			width: 144rpx;
			height: 72rpx;
			background: #C9CAD1;
			color: #FFFFFF;
			border-radius: 36rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			margin-left: 28rpx;
		}
	}
	.box_min{
		width: 750rpx;
		height: 690rpx;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		align-items: center;
		padding: 0 40rpx;
		.min_btn{
			width: 670rpx;
			height: 90rpx;
			background: #FFE512;
			border-radius: 20rpx;
			margin-top: 60rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
