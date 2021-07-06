<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
								<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
							<!-- #endif -->
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">热门景点</view>
			</uni-nav-bar>
		</view>
		<!-- 卡片列表 -->
		<view class="content">
			<view class="card" v-for="item in cardList.List" @click="toAttractionsDetails(item.id)">
				<text class="title">{{item.name}}</text>
				<view class="cardContent">{{item.description}}</view>
				<view class="uni-padding-wrap">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							
							<swiper class="swiper" display-multiple-items="3" >
								<view v-for="(item,index) in item.images">
									<image class="swiper-item " :src="item"></image>
								</view>
							</swiper>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				state_id:'',
				city_id:'',
				cardList:[
				]
			}
		},
		components:{
			uniNavBar
		},
		onLoad:function(option){
			var that = this
			console.log('stateid---',option.state_id)
			console.log('cityid----',option.city_id);
			that.state_id = option.state_id
			that.city_id = option.city_id
			this.getHotAttList()
		},
		
		methods: {
			getHotAttList(){
				var that = this
				if(this.state_id == undefined || null){
					uni.request({
						url:this.globalUrl+ '/site/list',
						data:{
							count:20,
							page:1,
							sort_by:3
						},
						success:res=>{
							console.log("热门景点列表=========",res)
							uni.setStorageSync('id',res.data)
							that.cardList = res.data.data
							console.log('cardList====',that.cardList)
						}
					})
				}else{
					uni.request({
						url:this.globalUrl+ '/site/list',
						data:{
							state_id:that.state_id,
							city_id:that.city_id,
							count:20,
							page:1,
							sort_by:1
						},
						success:res=>{
							console.log("热门景点列表=========",res)
							uni.setStorageSync('id',res.data)
							that.cardList = res.data.data
							console.log('cardList====',that.cardList)
						}
					})
				}
			},
			// getHotAttList(){
			// 	var that = this
			// 	that.city = uni.getStorageSync('city')
			// 	var city = uni.getStorageSync('city_id')
			// 	uni.getStorage({
			// 		key:'city_id',
			// 		success:function(res){
			// 			console.log('取本地存储城市id',res.data)
			// 			if(res.data.code != 0){
			// 				uni.request({
			// 					url:this.globalUrl+ '/site/list',
			// 					data:{
			// 						count:20,
			// 						page:1,
			// 						sort_by:3
			// 					},
			// 					success:res=>{
			// 						console.log("热门景点列表=========",res)
			// 						uni.setStorageSync('id',res.data)
			// 						that.cardList = res.data.data
			// 						console.log('cardList====',that.cardList)
			// 					}
			// 				})
			// 			}
			// 			var state_id = res.data.data.state_id
			// 			var city_id = res.data.data.city_id
			// 			console.log('city_id',city_id)
			// 			console.log('state_id',state_id)
			// 			console.log('----===',city_id)
			// 			uni.request({
			// 				url:this.globalUrl+ '/site/list',
			// 				data:{
			// 					state_id:city.data.state_id,
			// 					city_id:city.data.city_id,
			// 					count:20,
			// 					page:1,
			// 					sort_by:1
			// 				},
			// 				success:res=>{
			// 					console.log("热门景点列表=========",res)
			// 					uni.setStorageSync('id',res.data)
			// 					that.cardList = res.data.data
			// 					console.log('cardList====',that.cardList)
			// 				}
			// 			})
			// 		}
			// 	})
				
			// },
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			home(){
				uni.switchTab({
					url:"/pagesA/index/index"
				})
			},
			toAttractionsDetails(e){
				console.log('----------------',e)
				uni.navigateTo({
					url:"/pages/positionContent/positionContent?id="+e
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
	// 自定义导航栏样式
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #aa557f;
	}
	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}
	.example-body {
		padding: 0;
	}
	.navBar{
		display: flex;
	}
	.slotleft{
		display: flex;
		align-items: center;
	}
	.fanhui{
		width: 40rpx;
		height: 40rpx;
		margin-left: 42rpx;
		margin-right: 20rpx;
	}
	.fhsy{
		width: 40rpx;
		height: 40rpx;
	}
	/* #ifdef  MP-BAIDU*/
	.fhsy {
		margin-left: 100rpx;
	}
	/*  #endif  */
	.slottitle{
		margin-left: 162rpx;
		font-size: 38rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:600;
		color:rgba(0,0,0,1);
	}
	.button-v-line{
		width: 1px;
		height: 18px;
		background-color: #2f2f2f;
		margin: 0 8px;
	}
	// 卡片样式
	.content{
		background-color: #F8F8F8;
		padding-top: 20rpx;
	}
	.card{
		width: 694rpx;
		height: 316rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 8rpx 16rpx 0px rgba(237,237,237,1);
		border-radius:16rpx;
		margin: 0rpx 28rpx 20rpx 28rpx;
		display: flex;
		flex-direction: column;
	}
	.title{
		height: 32rpx;
		line-height: 32rpx;
		font-size: 32rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(48,49,51,1);
		margin-top: 40rpx;
		margin-left: 28rpx;
		margin-bottom: 20rpx;
	}
	.cardContent{
		width:642rpx;
		height:28rpx;
		font-size:28rpx;
		line-height: 28rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(144,147,153,1);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space:nowrap;
		margin-left: 28rpx;
		margin-right: 24rpx;
		margin-bottom: 20rpx;
	}
	.uni-padding-wrap{
		// width: 280px;
		overflow: hidden;
		margin-left: 28rpx;
	}
	.page-section{
		// width: 280px;
	}
	.swiper{
		height: 136rpx;
	}
	.swiper-item{
		width: 194rpx;
		height: 136rpx;
		border-radius: 8rpx;
		margin-right: 28rpx;
	}
	.uni-padding-wrap{
		// padding: 10px;
	}
	
</style>
