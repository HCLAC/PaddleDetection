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
		<!-- 骨架屏 -->
		<view v-if="loading" class="loadBox">
			<view class="container u-skeleton">
				<view class="banner-box u-skeleton-fillet"></view>
				<view class="title-box u-skeleton-rect"></view>
				<view class="loadBlock" v-for="(item, index) in loadEmpty">
					<view class="left">
						<view class="left-top">
							<view class="txt-box u-skeleton-rect"></view>
							<view class="txt-box u-skeleton-rect"></view>
							<view class="txt-box u-skeleton-rect"></view>
						</view>
						<view class="left-btm">
							<view class="txt-box-min u-skeleton-rect"></view>
							<view class="txt-box-min u-skeleton-rect"></view>
						</view>
					</view>
					<view class="right">
						<view class="img-box u-skeleton-fillet"></view>
					</view>
				</view>
			</view>
			<!--引用组件-->
			<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
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
				共{{total}}条线路，持续更新中…
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
		<view class="List" v-for="(item,index) in form" :key="index" v-if="promptShow" @click="goLine(item)">
			<view class="left">
				<view class="title">
					{{item.title}}
				</view>
				<view class="left-btm">
					<view class="money">
						参考价格：{{item.min_money}}～{{item.max_money}}
					</view>
					<view class="day-box">
						<view class="day">
							{{item.day}}日行程
						</view>
						<view class="label">
							{{labelArr[item.theme]}}
						</view>
					</view>
				</view>
			</view>
			<view class="right">
				<view class="img">
					<image :src="item.image" mode=""></image>
				</view>
				<view class="txt" v-if="item.tag == 1">
					定制师推荐路线
				</view>
				<view class="txt" v-if="item.tag == 2">
					超时长
				</view>
			</view>
		</view>
		<!-- 无数据时列表 -->
		<view class="List-box" v-if="!promptShow">
			<view class="list-top">
				<view class="left">
					<view class="left-txt">
						推荐线路
					</view>
					<view class="left-img">
						<image src="https://cache.lingtuyang.cn/web_static/xc-border.png" mode=""></image>
					</view>
				</view>
				<view class="right" @click="replace" v-if="replaceShow">
					<view class="right-img">
						<image src="https://cache.lingtuyang.cn/web_static/xc-hyp.png" mode=""></image>
					</view>
					<view class="right-txt">
						换一批
					</view>
				</view>
			</view>
			<view style="margin-left: 0;"  class="List" v-for="(item,index) in recommendation" :key="index" @click="goLine(item)">
				<view class="left">
					<view class="title">
						{{item.title}}
					</view>
					<view class="left-btm">
						<view class="money">
							参考价格：{{item.min_money}}～{{item.max_money}}
						</view>
						<view class="day-box">
							<view class="day">
								{{item.day}}日行程
							</view>
							<view class="label">
								{{labelArr[item.theme]}}
							</view>
						</view>
					</view>
				</view>
				<view class="right">
					<view class="img">
						<image :src="item.image" mode=""></image>
					</view>
					<view class="txt" v-if="item.tag == 1">
						定制师推荐路线
					</view>
					<view class="txt" v-if="item.tag == 2">
						超时长
					</view>
				</view>
			</view>
		</view>
		<consultingBtm :consulting="consulting"></consultingBtm>
	</view>
</template>

<script>
	import consultingBtm from '@/common/consulting-btm/consulting-btm.vue';

	export default {
		components: {
			consultingBtm
		},
		data() {
			return {
				replaceShow:true,
				promptShow:true,//有无线路
				total:0,
				form:[],
				consulting:{},
				labelArr:{
					1:'亲子',
					2:'自驾',
					3:'海景',
					4:'美食',
					5:'山林',
					6:'草原',
					7:'古境'
				},
				pageSize:1,
				recommendation:[],
				totalPage:0,
				state_id:[],
				city_id:[],
				days:0,
				// 骨架屏
				loadEmpty:[1,2,3,4],
				loading: true,
			};
		},
		onLoad(e){
			var state = JSON.parse(e.state_id)
			var city = JSON.parse(e.city_id)
			this.days = e.value
			state.map((e)=>{
				this.state_id.push(e.state_id)
			})
			city.map((e)=>{
				this.city_id.push(e.city_id)
			})
		},
		onShow(){
			this.getCustomized()
			this.getInfo()
		},
		methods:{
			hideLoad(){
				setTimeout(() => {
					this.loading = false
					uni.hideLoading();
				}, 300);
			},
			//管家信息
			getInfo() {
				this.HTTP.request({
					url: '/bulter/market',
					data: {
						type:1,
						question_id:this.question_id,
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
			goLine(item){
				uni.navigateTo({
					url: '/pages_province/lineDetail/lineDetail?id=' + item.uuid
				});
			},
			//有数据列表
			getCustomized(){
				this.HTTP.request({
					url: '/route/customized',
					data: {
						days:this.days,
						state_ids:this.state_id,
						city_ids:this.city_id
					},
					method: 'POST',
					success: res => {
						this.total = res.data.data.total
						this.form = res.data.data.list
						this.hideLoad()
						if(this.total == 0){
							this.promptShow = false
							this.getRecommend()
						}else{
							this.promptShow = true
						}
					}
				});
			},
			//无数据列表
			getRecommend(){
				this.HTTP.request({
					url: '/route/recommend',
					data: {
						page:this.pageSize,
						count:6,
						days:this.days,
						state_ids:this.state_id,
						city_ids:this.city_id
					},
					method: 'POST',
					success: res => {
						var total = res.data.data.total
						this.recommendation = res.data.data.list
						this.hideLoad()
						
						this.totalPage = Math.ceil(total / 6)
						if(total <= 6){
							this.replaceShow = false
						}
					}
				});
			},
			//换一批
			replace(){
				var page = this.pageSize += 1
				if(page > this.totalPage){
					this.pageSize = 1
				}
				this.getRecommend()
			},
			//返回首页
			home(){
				this.Utils.home()
			},
		}
	}
</script>

<style lang="scss">
	.fhsy{
		margin-left: 94rpx;
	}
.box{
	// padding:  0 28rpx;
	padding-bottom: 200rpx;
	overflow-x:scroll;
	.loadBox{
		width: 100%;
		height: auto;
		.container{
			padding: 0 28rpx;
			.banner-box{
				width: 694rpx;
				height: 320rpx;
			}
			.title-box{
				width: 694rpx;
				height: 40rpx;
				margin-top: 30rpx;
			}
			.loadBlock{
				margin-top: 40rpx;
				display: flex;
				.left{
					.left-top{
						.txt-box{
							width: 320rpx;
							height: 28rpx;
							margin-bottom: 20rpx;
						}
					}
					.left-btm{
						display: flex;
						.txt-box-min{
							width: 80rpx;
							height: 28rpx;
							margin-right: 20rpx;
						}
					}
				}
				.right{
					margin-left: 28rpx;
					.img-box{
						width: 346rpx;
						height: 194rpx;
					}
				}
			}
		}
	}
	.banner{
		margin-left: 28rpx;
		width: 694rpx;
		height: 320rpx;
		border-radius: 16rpx;
		display: flex;
		align-items: flex-end;
		background-image: url(https://cache.lingtuyang.cn/web_static/xc-banner.jpeg);
		background-size: 100%;
		background-origin: center center;
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
		margin-left: 28rpx;
		
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
		margin-left: 28rpx;
		
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
		width: 694rpx;
		margin-left: 28rpx;
		.left{
			width: 328rpx;
			height: 224rpx;
			display: flex;
			flex-direction: column;
			// justify-content: space-between;
			// padding-bottom: 40rpx;
			.title{
				width: 328rpx;
				// height: 80rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #303133;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.left-btm{
				.money{
					font-size: 28rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #E41D54;
					margin-top: 20rpx;
					// margin-bottom: 20rpx;
				}
				.day-box{
					display: flex;
					margin-top: 20rpx;
					// margin-bottom: 40rpx;
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
						padding:8rpx 10rpx;
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
			
		}
		.right{
			position: relative;
			.img{
				width: 346rpx;
				height: 194rpx;
				border-radius: 16rpx;
				margin-left: 20rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
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
		width: 694rpx;
		margin-left: 28rpx;
		// .List{
		// 	margin-left: -28rpx;
		// }
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
