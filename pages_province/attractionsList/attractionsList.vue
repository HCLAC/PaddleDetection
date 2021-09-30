<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 卡片列表 -->
		<view class="content">
			<view class="card" v-for="item in cardList" @click="toAttractionsDetails(item.id)">
				<text class="title">{{item.name}}</text>
				<view class="cardContent">{{item.description}}</view>
				<view class="uni-padding-wrap">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" display-multiple-items="3" >
								<view v-for="(item,index) in item.images">
									<image class="swiper-item" lazy-load :src="item"></image>
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
	export default {
		data() {
			return {
				state_id:'',
				city_id:'',
				cardList:[]
			}
		},
		components:{
		},
		// #ifdef MP-BAIDU
		onInit(query) {
		// #endif
		// #ifndef MP-BAIDU
		onLoad(query) {
		// #endif
			that.state_id = query.state_id
			that.city_id = query.city_id
			this.getHotAttList()
		},
		methods: {
			getHotAttList(){
				var that = this
				this.HTTP.request({
					url:'/site/list',
					data:{
						state_id:that.state_id,
						city_id:that.city_id,
						count:20,
						page:1,
						sort_by:1
					},
					success:res=>{
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						var cardList = res.data.data.list
						cardList.forEach((item1, index1) => {
							item1.images.forEach((item2, index2) => {
								item1[index2] = that.Utils.addImageProcess(item2, true, 80)
							})
						})
						that.cardList = cardList
					}
				})
			},
			toAttractionsDetails(id){
				uni.navigateTo({
					url:"/pages_province/positionContent/positionContent?id="+id
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
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
		overflow: hidden;
		margin-left: 28rpx;
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
	
</style>
