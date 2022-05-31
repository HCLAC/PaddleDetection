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
		<view class="kong-index" v-if="!emptyShow">
			<image src="@/static/images/index-kong.png" mode=""></image>
			<view class="txt">暂无搜索结果</view>
		</view>
		<view class="btn" @click="goBack">
			我选好了
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
				imgShow:true,
				emptyShow:true
			};
		},
		onShow(){
			this.getStates()
		},
		methods:{
			imgChange(item,index){
				if(item.imgShow){
					item.imgShow = false
					this.stateS.map((val, i) => {
					        if (val === item.state_id) {
					          this.stateS.splice(i, 1)
					        }
					      })
				}else{
					if(this.stateS.length < 2){
						if(this.stateS.indexOf(item.state_id)===-1){
							this.stateS.push(item.state_id)
						}
						item.imgShow = true
					}else{
						item.imgShow = false
						console.log('最多选择2个')
					}
				}
			},
			//返回首页
			home(){
				this.Utils.home()
			},
			//搜索触发
			search(value){
				console.log(this.keyword,'---')
				this.getStates()
			},
			//清除搜索
			clear(){
				this.keyword = ''
				this.getStates()
			},
			//获取省份信息
			getStates(){
				this.HTTP.request({
					url: '/area/states',
					data:{
						name:this.keyword
					},
					method: 'GET',
					success: res => {
						this.form = res.data.data.map(item=>{
							item.imgShow=false
							return item
						})
						if(this.form.length == 0){
							this.emptyShow = false
						}else{
							this.emptyShow = true
						}
						console.log(this.form,'res')
					}
				});
			},
			goBack(){
				uni.navigateTo({
					url:'/pages_im/customization/customization?stateS=' + this.stateS
				})
			}
		}
	}
</script>

<style lang="scss">
.box{
	// padding: 0 28rpx;
	.searchBox{
		padding: 0 28rpx;
		margin-top: 30rpx;
	}
	.content{
		padding: 0 28rpx;
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
	.kong-index{
		margin-top: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			width: 202rpx;
			height: 206rpx;
		}
		.txt{
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #909399;
			margin-top: 40rpx;
		}
	}
	.btn{
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 166rpx;
		background: #FFFFFF;
		box-shadow: 0px -16rpx 56rpx 0px rgba(0, 0, 0, 0.15);
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #303133;
		display: flex;
		justify-content: center;
		padding-top: 34rpx;
	}
}
</style>
