<template>
	<view class="box">
		<!-- 顶部banner图 -->
		<view class="banner-box">
			<image src="https://cache.lingtuyang.cn/web_static/dz-banner.png" mode=""></image>
		</view>
		<!-- 内容框 -->
		<view class="content">
			<!-- 标题 -->
			<view class="title">
				<view class="title-txt">
					选择你的旅行方式
				</view>
				<view class="title-img">
					<image src="https://cache.lingtuyang.cn/web_static/xc-border.png" mode=""></image>
				</view>
			</view>
			<view class="title-time">
				计划出行时间
			</view>
			<!-- 步数器 -->
			<view class="time">
				<view class="time-txt">
					游玩天数
				</view>
				<u-number-box :min='1' :disabledInput='true' :size="28" :input-width="76" :input-height="60" v-model="value" @change="valChange"></u-number-box>
			</view>
			<view class="title-mode">
				推荐方式
			</view>
			<!-- 省份城市选择 -->
			<view class="mode">
				<view :class="mode != '2' ? 'mode-state' : 'mode-city'" @click="stateChange">
					按省份
				</view>
				<view :class="mode == '2' ? 'mode-state' : 'mode-city'" style="margin-left: 20rpx;" @click="cityChange">
					按城市
				</view>
			</view>
			<!-- 省份图片选择 -->
			<view class="title-want">
				我想去的省份
			</view>
			<view class="want-box">
				<view class="want-img" v-for="(item,index) in imgForm" :key='index'>
					<image class="state-img" :src="item.image" mode=""></image>
					<view class="state-txt">
						{{item.state_name}}
					</view>
					<view class="" @click="close(item,index)">
						<image class="gb" src="https://cache.lingtuyang.cn/web_static/dz-gb.png" mode=""></image>
					</view>
				</view>
				<view class="want-province" @click="provinceImg" v-if="stateShow">
					<u-icon color="#909399" size="44" name="plus"></u-icon>
				</view>
			</view>
			<!-- 城市图片选择 -->
			<view class="title-want" v-if="mode == '2'">
				我想去的城市
			</view>
			<view class="want-box-two" v-if="mode == '2'">
				<scroll-view  class="two-box" scroll-x="true">
					<view class="two-img" v-for="(item,index) in imgForm2" :key='index'>
						<image class="city-img" :src="item.image" mode=""></image>
						<view class="city-txt">
							{{item.city_name}}
						</view>
						<view class="" @click="close2(item,index)">
							<image class="gb" src="https://cache.lingtuyang.cn/web_static/dz-gb.png" mode=""></image>
						</view>
					</view>
					<view class="want-province-two" @click="cityImg" >
						<view class="two-icon">
							<u-icon color="#909399" size="44" name="plus"></u-icon>
						</view>
					</view> 
				</scroll-view>
			</view>
			<!-- button -->
			<view class="btn" @click="submit">
				{{txt}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:1,//步进器
				mode:'1',//1省份/2城市
				imgForm:[],
				imgForm2:[],
				stateShow:true,
				cityShow:true,
				txt:"开始制定行程"
			};
		},
		onLoad(e){
			uni.getStorage({
				key: 'stateS',
				success:  (res)=> {
					let data = res.data
					if(data){
						this.imgForm = JSON.parse(data)
						console.log(this.imgForm,'this.imgForm')
						if(this.imgForm.length == 2){
							this.stateShow = false
						}else{
							this.stateShow = true
						}
					}
				}
			});
			uni.getStorage({
				key: 'citys',
				success:  (res)=> {
					let data = res.data
					if(data){
						this.imgForm2 = JSON.parse(data)
						if(this.imgForm.length == 5){
							this.cityShow = false
						}else{
							this.cityShow = true
						}
					}
				}
			});
			
		},
		onShow(){
			this.$nextTick(function(){
				this.mode = uni.getStorageSync('mode');
			})
		},
		methods:{
			close(item,index){
				this.imgForm.map((val, i) => {
					if (val.state_id === item.state_id) {
						this.imgForm.splice(i, 1)
					}
				})
				if(this.imgForm.length == 2){
					this.stateShow = false
				}else{
					this.stateShow = true
				}
			},
			close2(item,index){
				this.imgForm2.map((val, i) => {
					if (val.city_id === item.city_id) {
						this.imgForm2.splice(i, 1)
					}
				})
				if(this.imgForm.length == 5){
					this.cityShow = false
				}else{
					this.cityShow = true
				}
			},
			//步进器函数
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},
			//选择省份
			stateChange(){
				this.mode = '1'
				this.imgForm = []
				this.imgForm2 = []
				if(this.imgForm.length == 2){
					this.stateShow = false
				}else{
					this.stateShow = true
				}
				uni.clearStorage();
				uni.setStorage({
					key: 'mode',
					data: this.mode,
					success:  (e)=> {
						console.log(this.mode,'success11');
					}
				});
			},
			//选择城市
			cityChange(){
				this.mode = '2'
				this.imgForm = []
				this.imgForm2 = []
				if(this.imgForm.length == 2){
					this.stateShow = false
				}else{
					this.stateShow = true
				}
				uni.clearStorage();
				uni.setStorage({
					key: 'mode',
					data: this.mode,
					success:  (e)=> {
						console.log(this.mode,'success22');
					}
				});
			},
			//选择省份的图片
			provinceImg(){
				uni.navigateTo({
					url:'/pages_im/provinceImg/provinceImg'
				})
			},
			//选择城市图片
			cityImg(){
				var state_id = this.imgForm[0].state_id
				// uni.setStorage({
				// 	key: 'mode',
				// 	data: this.mode,
				// 	success:  (e)=> {
				// 		console.log(e,'success');
				// 	}
				// });
				uni.navigateTo({
					url:'/pages_im/cityImg/cityImg?state_id=' + state_id
				})
			},
			//提交按钮
			submit(){
				this.txt = '正在定制行程'
				var state_id = JSON.stringify(this.imgForm)
				var city_id = JSON.stringify(this.imgForm2)
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages_im/tripForm/tripForm?state_id=' + state_id +'&city_id=' + city_id + '&value=' + this.value
					});
					this.txt = '开始制定行程'
					uni.clearStorage();
				}, 3000);
			},
		}
	}
</script>

<style lang="scss">
.box{
	position: relative;
	.banner-box{
		width: 100%;
		height: 524rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.content{
		width: 694rpx;
		// height: 1016rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 56rpx 0px rgba(178, 178, 178, 0.5);
		border-radius: 40rpx;
		position: absolute;
		top: 348rpx;
		left: 28rpx;
		padding: 0 40rpx;
		.title{
			width: 100%;
			height: 138rpx;
			position: relative;
			padding-top: 50rpx;
			.title-txt{
				position: relative;
				font-size: 36rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #303133;
				z-index: 10;
			}
			.title-img{
				position: absolute;
				top: 72rpx;
				width: 288rpx;
				height: 20rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.title-time{
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
		}
		.time{
			width: 100%;
			height: 100rpx;
			border: 2rpx solid #EDEFF2;
			border-left:none;
			border-right:none;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.time-txt{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #909399;
			}
		}
		.title-mode{
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			margin-top: 36rpx;
		}
		.mode{
			display: flex;
			padding-top: 30rpx;
			.mode-state{
				width: 144rpx;
				height: 60rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 2rpx solid #E41D54;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #E21B5D;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.mode-city{
				width: 144rpx;
				height: 60rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 2rpx solid #606266;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #606266;
				display: flex;
				justify-content: center;
				align-items: center;
				
			}
		}
		.title-want{
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			border-top: 2rpx solid #EDEFF2;
			margin-top: 40rpx;
			padding-top: 40rpx;
		}
		.want-box-two{
			display: flex;
			.two-box{
				display: flex;
				white-space: nowrap;
				width: 100%;
				.two-img{
					position: relative;
					margin-top: 30rpx;
					margin-right: 30rpx;
					display: inline-block;
					.city-img{
						width: 176rpx;
						height: 176rpx;
						border-radius: 16rpx;
					}
					.city-txt{
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%);
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
					}
					.gb{
						right: -18rpx;
						top: -14rpx;
						z-index: 100;
						position: absolute;
						width: 44rpx;
						height: 44rpx;
					}
				}
				.want-province-two{
					width: 176rpx;
					height: 176rpx;
					position: relative;
					display: inline-block;
					// display: flex;
					// justify-content: center;
					// align-items: center;
					margin-top: 30rpx;
					background-image: url(https://cache.lingtuyang.cn/web_static/dz-border.png);
					background-size: 100%;
					background-origin: center center;
					.two-icon{
						position: absolute;
						top:50%;
						left: 50%;
						transform: translate(-50%,-50%);
					}
				}
			}
			
		}
		.want-box{
			display: flex;
			.want-img{
				position: relative;
				margin-top: 30rpx;
				margin-right: 30rpx;
				.state-img{
					width: 176rpx;
					height: 176rpx;
					border-radius: 16rpx;
				}
				.state-txt{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
				.gb{
					right: -18rpx;
					top: -14rpx;
					z-index: 100;
					position: absolute;
					width: 44rpx;
					height: 44rpx;
				}
			}
			.want-province{
				width: 176rpx;
				height: 176rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 30rpx;
				background-image: url(https://cache.lingtuyang.cn/web_static/dz-border.png);
				background-size: 100%;
				background-origin: center center;
			}
		}
		.btn {
			width: 100%;
			height: 96rpx;
			background: #FFE512;
			border-radius: 16rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			margin-top: 60rpx;
			margin-bottom: 100rpx;
		}
	}
}
</style>
