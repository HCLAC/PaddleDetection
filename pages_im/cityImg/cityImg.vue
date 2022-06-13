<template>
	<view class="box">
		<!-- 顶部栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" title="选择城市">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="home" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 搜索栏 -->
		<!-- <view class="searchBox">
			<u-search 
				placeholder="请输入城市名称" 
				v-model="keyword"
				:show-action="false"
				@change="search"
				@clear="clear"
			></u-search>
		</view> -->
		<!-- 城市选择 -->
		<view class="content">
			<view class="title">
				{{txt}}热门城市
			</view>
			<view class="u-demo-block__content">
			    <u-row
			            justify="space-between"
			            gutter="10"
			    >
			        <u-col span="3" v-for="(item,index) in form">
			            <view class="demo-layout bg-purple"></view>
			        </u-col>
			        <u-col span="3">
			            <view class="demo-layout bg-purple-light"></view>
			        </u-col>
			        <u-col span="3">
			            <view class="demo-layout bg-purple"></view>
			        </u-col>
			        <u-col span="3">
			            <view class="demo-layout bg-purple-light"></view>
			        </u-col>
			    </u-row>
			</view>
			<view class="list-box">
				<view class="box-img" v-for="(item,index) in form" :key="index" @click="imgChange(item,index)">
					<image :src="item.image" mode=""></image>
					<text>{{item.city_name}}</text>
					<view class="kong-1">
						
					</view>
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
				state_id:'',
				keyword:'',
				form:[],
				stateS:[],
				imgShow:true,
				emptyShow:true,
				txt:''
			};
		},
		onLoad(e){
			this.state_id = e.state_id
			this.txt = e.state_name

			const value = uni.getStorageSync('citys');
			if (value) {
				console.log(value);
				this.stateS = JSON.parse(value)
					console.log(this.stateS,'this.stateS')
			}
		},
		onShow(){
			this.getStates()
		},
		methods:{
			imgChange(item,index){
				if(item.imgShow){
					item.imgShow = false
					this.stateS.map((val, i) => {
						if (val.city_id === item.city_id) {
						  this.stateS.splice(i, 1)
						}
					  })
				}else{
					if(this.stateS.length < 5){
						this.stateS.push(item)
						item.imgShow = true
					}else{
						item.imgShow = false
						uni.showToast({
						   title: '为了更好的旅游体验，所选城市不能超过5个',
						   icon: 'none'
						  });
						console.log('最多选择5个')
					}
				}
				console.log('选择===', this.stateS)
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
					url: '/area/cities',
					data:{
						name:this.keyword,
						state_id:this.state_id
					},
					method: 'GET',
					success: res => {
						// var a = [{name:1111,id:1,show:false},{name:222,id:2,show:false},{name:333,id:3,show:false}]
						// var b = [{name:1111,id:1,show:true}]
						console.log('this.stateS===',this.stateS)
						this.form = res.data.data.map(item=>{
							item.imgShow=false
							this.stateS.map(item2=>{
								if(item.city_id===item2.city_id) {
									item.imgShow = true
								}
							})
							return item
						})
						// console.log('c====',c)
						// this.form = res.data.data.map(item=>{
						// 	item.imgShow=false
						// 	return item
						// })
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
				if(this.stateS.length == 0){
					uni.showToast({
					   title: '请选择城市！',
					   icon: 'none'
					  });
					return
				}
				uni.setStorage({
					key: 'citys',
					data: JSON.stringify(this.stateS),
					success:  (e)=> {
						console.log(e,'success');
					}
				});
				uni.redirectTo({
					url:'/pages_im/customization/customization'
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
		margin-left: 15rpx;
		.title{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			margin-top: 30rpx;
		}
		.list-box:after{
		  content: "";
		  width: 30%;
		  height: 0;
		  visibility: hidden;
		}
		.list-box{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			 // box-sizing: border-box;
			// margin: 0 auto;
			.box-img{
				width: 212rpx;
				height: 212rpx;
				background: rgba(0, 0, 0, 0.15);
				margin-top: 30rpx;
				position: relative;
				margin-right:auto;
				// margin-right: 19rpx;
				// margin: 0 10rpx;
				image{
					width: 100%;
					height: 100%;
				}
				text{
					position: absolute;
					width: 132rpx;
					height: 44rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					z-index: 100;
					left: 0; top: 0; right: 0; bottom: 0;
					margin: auto; /* 有了这个就自动居中了 */
					display: flex;
					justify-content: center;
				}
				.kong{
					width: 212rpx;
					height: 212rpx;
					background: rgba(0, 0, 0, 0.75);
					position: absolute;
					top: 0;
				}
				.kong-1{
					width: 212rpx;
					height: 212rpx;
					background: rgba(0, 0, 0, 0.15);
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
