<template>
	<view>
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<view class="container">
			<mescroll-body ref="mescrollRef" @down="downCallback" @up="upCallback">
				<view class="lineItem" @click="getDetail(item.uuid)" v-for="(item, index) in lineList" :key="index">
					<image :src="item.image" mode=""></image>
					<text>{{ item.title }}</text>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	comments: {
		uniNavBar
	},
	onLoad(option){
		this.state_id = option.state_id ? option.state_id : null
		this.city_id = option.city_id ? option.city_id : null
		
	},
	mixins: [MescrollMixin],
	data() {
		return {
			lineList: [],
			state_id: null,
			city_id: null
		};
	},
	methods: {
		downCallback() {
			this.mescroll.resetUpScroll();
		},
		upCallback(page) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size;
			uni.request({
				url: this.globalUrl + '/route/list',
				method: 'GET',
				data: {
					count: pageSize,
					page: pageNum,
					city_Id: this.city_id ? this.city_id : null,
					state_id: this.state_id? this.state_id : null
				},

				success: res => {
					if (res.data.code == 0) {
						let curPageData = res.data.data.list;
						let curPageLen = curPageData.length ? curPageData.length : 0;
						let totalPage = res.data.data.total;
						if (page.num == 1) this.lineList = [];
						this.lineList = this.lineList.concat(curPageData);
						this.mescroll.endByPage(curPageLen, totalPage);
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
				},
				fail: error => {
					this.mescroll.endErr();
					uni.showToast({
						title: '网络不给力，请稍后再试...',
						icon: 'none'
					});
				}
			});
		},
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		home() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		getDetail(id) {
			if (id) {
				uni.navigateTo({
					url: '/pages/lineDetail/lineDetail?id=' + id
				});
			}
		}
	}
};
</script>

<style lang="scss">
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
	margin-left: 40rpx;
	margin-right: 20rpx;
}
.fhsy {
	width: 40rpx;
	height: 40rpx;
}
.slottitle {
	margin-left: 162rpx;
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
	padding: 30rpx;

	font-family: PingFangSC-Medium, PingFang SC;
	.lineItem {
		width: 100%;
		display: flex;
		flex-flow: column;
		margin-bottom: 40rpx;
		image {
			width: 100%;
			border-radius: 16rpx 16rpx 0 0;
			box-shadow: 0px 2px 4px 0px #edeff2;
		}
		text {
			height: 92rpx;
			background: #ffffff;
			color: #303133;
			font-weight: 500;
			font-size: 32rpx;
			line-height: 92rpx;
			padding: 0 20rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			border-radius: 0 0 16rpx 16rpx;
			box-shadow: 0px 2px 4px 0px #edeff2;
		}
	}
}

</style>
