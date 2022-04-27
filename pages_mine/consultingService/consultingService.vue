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
		<u-modal v-model="show" :content="content" :border-radius="40" :z-index="9999" :show-title="false" :show-cancel-button="true" @confirm="delefe"></u-modal>
		<u-modal v-model="show1" :content="content" :border-radius="40" :z-index="9999" :show-title="false" :show-cancel-button="true" @confirm="onCancel"></u-modal>
		<u-tabs :list="tabList" :show-bar="false" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="kong" v-if="list.length == 0">
			<view class="kong_img">
				<image src="@/static/images/index-kong.png" mode=""></image>
			</view>
			<view class="kong_text">
				咨询列表空空的
			</view>
		</view>

		<view class="content" :show="item.show" :index="index" 
		v-for="(item, index) in list" :key="item.search_id" 
		@click="click">
			<view class="c_box">
				<view class="item" @click.stop="toConsultation(item)">
					<view class="title-wrap">
						在线咨询服务
						<!-- <view :class="item.status == 0?'jxz':'ywc'">
							{{item.status == 0?'进行中':'已完成'}}
						</view> -->
						<view class="jxz" v-if="item.status == 0" style="background: #FFF1F0;color: #F5222D;">
							待支付
						</view>
						<view class="jxz" v-if="item.status == 2" style="background: #F2FFEC;color: #89B324;">
							已结束
						</view>
						<view class="jxz" v-if="item.status == 3" style="background: #EDEFF2;color: #606266;">
							已取消
						</view>
						<view class="jxz" v-if="item.status == 1">
							进行中
						</view>
					</view>
					<view class="item-text">
						提交时间:{{item.create_at}}
					</view>
					<view class="item-text">
						问题描述:{{item.question}}
					</view>
					<view class="item-num">
						金 &nbsp;&nbsp;&nbsp;&nbsp; 额:{{item.money}}元
					</view>
					<view class="mp" @click.stop="toHousekeeper(item)">
						<image :src=" item.avatar ? item.avatar : '/static/images/logo.png' " mode=""></image>
						<view class="m-box">
							<view class="name">
								{{item.name}}
							</view>
							<view class="m-text">
								执业{{item.working_years}}年/{{item.company}}
							</view>
						</view>
					</view>
					<view class="btn">
						<view class="btn_box" v-if="item.status == 0" style="margin-right: 20rpx;" @click.stop="cancel(item)">
							取消订单
						</view>
						<view class="btn_box" style="background: #FFE512;border: none;" v-if="item.status == 0" @click.stop="onPay(item)">
							去支付
						</view>
						<view class="btn_box" v-if="item.status == 2 || item.status == 3" @click.stop="onMoadel(item,index)">
							删除订单
						</view>
						<view class="btn_box" style="background: #FFE512;border: none" v-if="item.status == 1" @click.stop="onIm(item)">
							去咨询
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
				list:{},
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#F95051'
						},
					}
				],
				content:'',
				show:false,
				show1:false,
				item:{},
				index:'',
				tabList: [{
					name: '全部'
				}, {
					name: '待支付',
					
				}, {
					name: '进行中',
					
				}, {
					name: '已结束',
				},
				],
				current: 0
			};
		},
		onShow() {
			// 获取咨询列表
			this.getlist()
		},
		methods:{
			change(index) {
				console.log(index,'index')
				this.current = index;
				this.getlist(index)
			},
			onIm(item){
				uni.navigateTo({
					url:'/pages_im/chatroom/chatroom?search_id=' + item.search_id
				})
			},
			onCancel(){
				this.HTTP.request({
					method:'POST',
					url: '/user/search_record/close',
					data: {
						search_id:this.item.search_id
					},
					success: res => {
						this.getlist()
						// this.list.splice(this.index, 1);
						// this.$u.toast(`删除了第${index}个cell`);
						// console.log(res,'咨询详情')
					}
				});
			},
			cancel(item){
				this.show1 = true;
				this.content = '确认取消订单?';
				this.item = item
				// this.index = index
			},
			onPay(item){
				this.HTTP.request({
					url: '/pay/get_order',
					method: 'POST',
					data: {
						search_id: item.search_id,
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
										url:'/pages_im/chatroom/chatroom?search_id=' + item.search_id,
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
			onMoadel(item,index){
				this.show = true;
				this.content = '确认删除订单?';
				this.item = item
				this.index = index
			},
			delefe(){
				this.HTTP.request({
					method:'DELETE',
					url: '/user/search_record/del',
					data: {
						search_id:this.item.search_id
					},
					success: res => {
						this.list.splice(this.index, 1);
						// this.$u.toast(`删除了第${index}个cell`);
						// console.log(res,'咨询详情')
					}
				});
			},
			toConsultation(item){
				if(item.status == 2 || item.status == 1){
					uni.navigateTo({
						url:'/pages_im/chatroom/chatroom?search_id=' + item.search_id,
					})
				}else if(item.status == 0){
					this.onPay(item)
				}else{
					console.log('订单取消')
				}
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
			getlist(data){
				console.log(data,'data')
				this.HTTP.request({
					url: '/user/search_record/list',
					data: {
						count:20,
						page:1,
						status:data,
					},
					success: res => {
						this.list = res.data.data.list
						console.log(this.list,'咨询详情')
					}
				});
			},
			// click(index,index1) {
			// 	console.log(index,'index')
			// 	console.log(item,'index1')
			// 	this.HTTP.request({
			// 		method:'DELETE',
			// 		url: '/user/search_record/del',
			// 		data: {
			// 			search_id:this.list[index].search_id
			// 		},
			// 		success: res => {
			// 			this.list.splice(index, 1);
			// 			// this.$u.toast(`删除了第${index}个cell`);
			// 			// console.log(res,'咨询详情')
			// 		}
			// 	});
			// },
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
	page{
	background: #F6F6F8;
	}
.box{
	.kong{
		margin-left: 274rpx;
		margin-top: 478rpx;
		// margin: 0 auto;
		.kong_img{
			width: 202rpx;
			height: 206rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.kong_text{
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #909399;
			margin-top: 40rpx;
		}
	}
	.content{
		.c_box{
			width: 710rpx;
			height: 468rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			margin: 0 auto;
			margin-top: 20rpx;
		}
	}
	.item {
		display: flex;
		// height: 320rpx;
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
		.item-num{
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #606266;
			margin-top: 11rpx;
		}
		.mp{
			width: 650rpx;
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
		.btn{
			display: flex;
			justify-content: flex-end;
			margin-top: 20rpx;
			.btn_box{
				padding: 14rpx 28rpx;
				border-radius: 34rpx;
				border: 1rpx solid #E5E5E5;
			}
		}
	}
}

</style>
