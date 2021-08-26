<template>
	<u-popup v-model="show" mode="top" >
		<uni-nav-bar :fixed="true" :status-bar="true" title="选择城市">
			<view slot="left" class="slotleft">
				<!-- #ifndef  MP-BAIDU -->
					<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
				<!-- #endif -->						
				<image class="fhsy" src="/static/images/icon-fhsy.png" @click="Utils.home" />
			</view>
		</uni-nav-bar>
		<!-- 城市 -->
		<view class="nowcity">
			<text>{{ name }}</text>
			<image class="nowcityImg" src="/static/images/moreDown.svg" mode=""></image>
		</view>
		<!-- 城市选择列表 -->
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view
					v-for="(item, index) in cityList"
					:key="index"
					class="u-tab-item"
					:class="[current == index ? 'u-tab-item-active' : '']"
					:data-current="index"
					@tap.stop="swichMenu(index)"
				>
					<text class="u-line-1">{{ item.name }}</text>
				</view>
			</scroll-view>
			<block v-for="(item, index) in cityList" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current == index">
					<view class="page-view">
						<view class="class-item">
							<!-- </view> -->
							<view class="item-container">
								<view class="thumb-box" v-for="(item1, index1) in item.city_list" :key="index1">
									<!-- <image class="item-menu-image" :src="item2.icon" mode=""></image> -->
									<view class="item-menu-name" @click="switchToOther(item1, item.name)">{{ item1.name }}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name:"city-picker",
		props:{
			name:{
				type: String,
				default(){
					return '全国'
				}
			},
			show:{
				type: Boolean,
				default(){
					return false
				}
			},
			cityList:{
				type: Array,
				default(){
					return []
				}
			}
		},
		data() {
			return {
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
			};
		},
		watch: {
			show(newVal) {
				this.show = newVal
				if (!newVal){
					this.$emit("onclose", newVal)
				}
			},
			cityList(newVal){
				this.cityList = newVal
				this.cityList.findIndex((item, index) => {
					if (item.name == this.name){
						this.current = index
						return true
					}
					item.city_list.forEach((item1, index1) => {
						if (item1.name == this.name){
							this.current = index
							return true
						}
					})
				})
			}
		},
		methods:{
			// 跳转其他省市
			switchToOther(item1, name) {
				this.$emit("switchToOther", item1, name)
			},
			
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields(
							{
								size: true
							},
							res => {
								// 如果节点尚未生成，res值为null，循环调用执行
								if (!res) {
									setTimeout(() => {
										this.getElRect(elClass);
									}, 10);
									return;
								}
								this[dataVal] = res.height;
							}
						)
						.exec();
				});
			},
		},
	}
</script>

<style lang="scss">
	// 列表
	.u-menu-wrap {
		height: 574rpx;
		flex: 1;
		display: flex;
		overflow: hidden;
		border-top: 1rpx solid #EDEFF2;
	}
	
	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}
	
	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}
	
	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}
	
	.u-tab-item {
		height: 80rpx;
		background: #ffffff;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #303133;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #fa8c16;
		font-size: 28rpx;
		background: #f8f8f8;
	}
	
	.u-tab-item-active::before {
		content: '';
		position: absolute;
		border-left: 4rpx solid #fa8c16;
		height: 80rpx;
		left: 0;
		top: 0;
	}
	
	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color:#f8f8f8;
	}
	
	.page-view {
		// padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #f8f8f8;
		// padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}
	
	.item-menu-name {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #303133;
		margin-bottom: 40rpx;
		margin-left: 28rpx;
	}
	
	.item-container {
		// display: flex;
		// flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 33.333333%;
		// display: flex;
		// align-items: center;
		// justify-content: center;
		// flex-direction: column;
		margin-top: 20rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
	.nowcity{
		// background: red;
		height: 104rpx;
		padding-left: 40rpx;
		display: flex;
		align-items: center;
		.nowcityImg{
			width: 16rpx;
			height: 16rpx;
			margin-left: 8rpx;
		}
		text{
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
		}
	}
</style>
