<template>
	<view>
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" title="行程路线">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<view class="container">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<view class="lineItem" @click="getDetail(item.uuid)" v-for="(item, index) in lineList" :key="index">
					<image :src="item.image" mode=""></image>
					<view class="lineText" >{{ item.title }}</view>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin],
	data() {
		return {
			lineList: [],
			state_id: null,
			city_id: null,
			upOption:{
				textNoMore:'我也是有底线的～',
				bgColor:'rgba(0,0,0,0~1)'
			},
			downOption:{
				auto: false,
			}
		};
	},
	onLoad(option){
		if(option.state_id == 0){
			this.state_id = option.city_id ? option.city_id : null
		}else{
			this.state_id = option.state_id ? option.state_id : null
			this.city_id = option.city_id ? option.city_id : null
		}
	},
	methods: {
		downCallback() {
			this.mescroll.resetUpScroll();
		},
		upCallback(page) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size;
			this.HTTP.request({
				url: '/route/list',
				method: 'GET',
				data: {
					count: pageSize,
					page: pageNum,
					city_Id: this.city_id,
					state_id: this.state_id
				},

				success: res => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					if (!res.data.data.list || res.data.data.list.length == 0){
						return
					}
					let curPageData = res.data.data.list;
					let curPageLen = curPageData.length ? curPageData.length : 0;
					let totalPage = res.data.data.total;
					if (page.num == 1) this.lineList = [];
					this.lineList = this.lineList.concat(curPageData);
					this.mescroll.endBySize(curPageLen, totalPage);
				},
				fail: error => {
					this.mescroll.endErr();
				}
			});
		},
		getDetail(id) {
			if (id) {
				uni.navigateTo({
					url: '/pages_province/lineDetail/lineDetail?id=' + id
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.nav-bar {
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	font-size: 14px;
	background-color: #aa557f;
}
.nav-bar {
	flex-direction: column;
	padding: 15px;
	background-color: #ffffff;
}
.nav-bar {
	padding: 0;
}
.navBar {
	display: flex;
}
.slotleft {
	display: flex;
	align-items: center;
}
.fanhui {
	width: 40rpx;
	height: 40rpx;
	margin-left: 42rpx;
	margin-right: 20rpx;
}
.fhsy {
	width: 40rpx;
	height: 40rpx;
}
/* #ifdef  MP-BAIDU*/
.fhsy {
	margin-left: 100rpx;
}
/*  #endif  */
.slottitle {
	margin-left: 182rpx;
	font-size: 38rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 600;
	color: rgba(0, 0, 0, 1);
}
.button-v-line {
	width: 1px;
	height: 18px;
	background-color: #2f2f2f;
	margin: 0 8px;
}
//导航栏样式end
.container {
	margin-top: 20rpx;
	text-align: center;
	font-family: PingFangSC-Medium, PingFang SC;
	.lineItem {
		width: 694rpx;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		flex-flow: column;
		margin-bottom: 20rpx;
		box-shadow: 0px 4rpx 56rpx 0px #EDEFF2;
		border-radius: 0px 0px 16rpx 16rpx;
		z-index: 999999;
		image {
			width: 100%;
			height: 370rpx;
			border-radius: 16rpx 16rpx 0 0;
		}
		.lineText {
			// width: 684rpx;
			// height: 32rpx;
			text-align: left;
			background: #ffffff;
			color: #303133;
			font-weight: 500;
			font-size: 32rpx;
			line-height: 32rpx;
			padding: 0 20rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			padding-top: 20rpx;
			padding-bottom: 40rpx;
			margin-left: 2rpx;
			// box-shadow: 0px 8rpx 28rpx 0px #EDEFF2;
			// box-shadow: 0px 2px 4px 0px #EDEFF2;
			border-radius: 0px 0px 16rpx 16rpx;
		}
	}
}

</style>
