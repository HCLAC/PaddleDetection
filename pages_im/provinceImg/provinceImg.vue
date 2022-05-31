<template>
	<view class="box">
		<!-- 顶部栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" title="选择省份">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="home" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 搜索栏 -->
		<view class="searchBox">
			<u-search 
				placeholder="请输入城市名称" 
				v-model="keyword"
				:show-action="false"
				@change="search"
				@clear="clear"
			></u-search>
		</view>
		<!-- 城市选择 -->
		<view class="content">
			<view class="title">
				热门省份
			</view>
			<view class="list-box">
				<view class="box-img" v-for="(item,index) in form" :key="index" @click="imgChange(item,index)">
					<image :src="item.image" mode=""></image>
					<text>{{item.state_name}}</text>
					<view class="kong" v-if="item.imgShow"></view>
					<image v-if="item.imgShow" class="kong-img" src="https://cache.lingtuyang.cn/web_static/xz-yes.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:'',
				form:[],
				stateS:[],
				imgShow:true
			};
		},
		onShow(){
			this.getStates()
		},
		methods:{
			imgChange(item,index){
				// console.log(item,'++++')
				// console.log(index,'++++')
				this.$nextTick(function(){
					const arr = this.form
					if(this.stateS.length < 2 && arr[index].imgShow == false){
						arr[index].imgShow = !arr[index].imgShow
					}
					this.form = []
					this.form = arr
					// console.log(this.form[index],'---')      
					// console.log(arr,'===')
					
					if(arr[index].imgShow){
						this.stateS.push(this.form[index])
					}else{
						this.stateS.splice(this.form[index],1)
					}
					console.log(this.stateS,'this.stateS')
				})
			},
			//返回首页
			home(){
				this.Utils.home()
			},
			//搜索触发
			search(value){
				console.log(this.keyword,'---')
			},
			//清除搜索
			clear(){
				this.keyword = ''
			},
			//获取省份信息
			getStates(){
				this.HTTP.request({
					url: '/area/states',
					method: 'GET',
					success: res => {
						this.form = res.data.data
						console.log(this.form,'res')
					}
				});
			},
		}
	}
</script>

<style lang="scss">
.box{
	padding: 0 28rpx;
	.searchBox{
		margin-top: 30rpx;
	}
	.content{
		.title{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			margin-top: 30rpx;
		}
		.list-box{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.box-img{
				width: 212rpx;
				height: 212rpx;
				background: rgba(0, 0, 0, 0.15);
				margin-top: 30rpx;
				position: relative;
				image{
					width: 100%;
					height: 100%;
				}
				text{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					z-index: 100;
				}
				.kong{
					width: 212rpx;
					height: 212rpx;
					background: rgba(0, 0, 0, 0.75);
					position: absolute;
					top: 0;
				}
				.kong-img{
					width: 48rpx;
					height: 48rpx;
					position: absolute;
					top: 8rpx;
					right: 8rpx;
				}
			}
		}
	}
}
</style>
