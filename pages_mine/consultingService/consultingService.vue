<template>
	<view class="box">
		<uni-nav-bar :fixed="true" :status-bar="true" :title="title">
			<view slot="left" class="slotleft">
				<!-- #ifndef  MP-BAIDU -->
					<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="back" />
				<!-- #endif -->
				<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" />
			</view>
		</uni-nav-bar>
		<view class="">
			<u-swipe-action :show="item.show" :index="index" 
				v-for="(item, index) in list" :key="item.search_id" 
				@click="click" @open="open"
				:options="options"
			>
				<view class="item u-border-bottom" @click="toConsultation">
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						在线咨询服务
						<view :class="item.status == 0?'jxz':'ywc'">
							{{item.status == 0?'进行中':'已完成'}}
						</view>
					</view>
					<view class="item-text">
						提交时间:{{item.create_at}}
					</view>
					<view class="item-text">
						问题描述:{{item.question}}
					</view>
					<view class="mp" @click.stop="toHousekeeper(item)">
						<image src="/static/images/logo.png" mode=""></image>
						<view class="m-box">
							<view class="name">
								{{item.name}}
							</view>
							<view class="m-text">
								执业{{item.working_years}}年/{{item.company}}
							</view>
						</view>
					</view>
				</view>
				<u-gap height="19" bg-color="#F6F6F8"></u-gap>
			</u-swipe-action>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:{},
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#F95051'
						}
					}
				]
			};
		},
		onShow() {
			// 获取咨询列表
			this.getlist()
		},
		methods:{
			toConsultation(){
				console.log('在线咨询')
			},
			toHousekeeper(item){
				var bulter_id = item.bulter_id
				uni.navigateTo({
					url: '/pages_im/housekeeperDetails/housekeeperDetails?bulter_id=' + bulter_id
				});
			},
			back(){
				this.Utils.back()
				
			},
			home(){
				this.Utils.home()
			},
			//获取咨询列表
			getlist(){
				this.HTTP.request({
					url: '/user/search_record/list',
					data: {
						count:20,
						page:1,
					},
					success: res => {
						this.list = res.data.data.list
						console.log(this.list,'咨询详情')
					}
				});
			},
			click(index, index1) {
				console.log(index,'index')
				console.log(index1,'index1')
				this.HTTP.request({
					method:'DELETE',
					url: '/user/search_record/del',
					data: {
						search_id:this.list[index].search_id
					},
					success: res => {
						this.list.splice(index, 1);
						// this.$u.toast(`删除了第${index}个cell`);
						// console.log(res,'咨询详情')
					}
				});
			},
			open(index) {
				// console.log(index,'index')
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if(index != idx) this.list[idx].show = false;
				})
			}
		}
	}
</script>

<style lang="scss">
.box{
	.item {
		display: flex;
		height: 320rpx;
		flex-direction: column;
		padding: 0 28rpx;
		.title-wrap{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			margin-top: 28rpx;
			.jxz{
				width: 104rpx;
				height: 44rpx;
				background: #E6F7FF;
				border-radius: 22rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #1890FF;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.ywc{
				width: 104rpx;
				height: 44rpx;
				background: #F2FFEC;
				border-radius: 22rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #89B324;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.item-text{
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #606266;
			margin-top: 10rpx;
		}
		.mp{
			width: 694rpx;
			height: 112rpx;
			background: #F6F6F8;
			border-radius: 16rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			image{
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
				overflow: hidden;
			}
			.m-box{
				margin-left: 10rpx;
				.name{
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #303133;
				}
				.m-text{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #606266;
				}
			}
		}
	}
}

</style>
