<template>
	<view class="">
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" :status-bar="true" title="热门城市">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
				</view>
			</uni-nav-bar>
		</view>
		<!-- 定位选择 -->
		<view class="list-city">
			<scroll-view scroll-y="true" style="height:100%;" scroll-with-animation="true" enable-back-to-top="true">
				<!-- 定位 -->
				<view class="item">
					<image src="/static/images/iconMapt.svg" class="dd"></image>
					<view class="cityname">{{ city }}</view>
					<text class="nowcity" @click="resetAd()">{{ showText }}</text>
					<!-- <text class="getNowCity">获取当前位置</text> -->
					<!-- <text class="tip">暂未开放，请选择以下热门城市</text> -->
				</view>
				<view class="line"></view>
				<!-- 热门城市 -->
				<view class="item-hot">
					<view class="py" id="hot">国内热门省市</view>
					<view class="hot-city">
						<button
							class="city-button"
							:class="{ active: city === item.name }"
							v-for="(item, index) in hotCityDate"
							:key="index"
							@click="onSelect(item)"
							type="default"
							size="mini"
						>
							{{ item.name }}
						</button>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
export default {
	data() {
		return {
			citySelected: '',
			city: '',
			showText: '当前位置',
			state_id: '',
			city_id: '',
			cityData: {},
			hotCityDate: []
		};
	},
	onShow() {
		this.getAdress();
		this.getHotCity();
	},
	methods: {
		getHotCity() {
			this.HTTP.request({
				url: '/area/list',
				data: {
					page: 1,
					count: 20
				},
				method: 'GET',
				success: res => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					this.hotCityDate = res.data.data;
				}
			})
		},
		onSelect(item) {
			this.city = item.name;
			uni.navigateTo({
				url: '/pages_content/provinces/provinces?state_id=' + 
				item.state_id+"&city_id="+item.city_id+"&name="+item.name+"&image="+item.image
			});
		},
		getAdress() {
			uni.getLocation({
				type: 'wgs84',
				success: res => {
					if (res.city) {
						this.city = res.city.substr(0, res.city.length - 1);
						this.HTTP.request({
							url: '/user/location',
							data: {
								state: res.province,
								city: res.city
							},
							method: 'POST',
							success: res => {
								// 地址未定义
								if (res.data.data.city_id == 0) {
									this.showText = '暂未开放,请选择以下热门城市';
								}
							}
						});
					} else {
						let arr = [];
						arr.push(res.latitude);
						arr.push(res.longitude);
						arr = arr.join(',');
						this.HTTP.request({
							url: 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=NKyWaSnsW6FFEseeCEX18Fpvgzs3jcmd&output=json&coordtype=wgs84ll',
							data: {
								location: arr
							},
							success: result => {
								if (result.data.status == 0) {
									this.city = result.data.result.addressComponent.city.substr(0, result.data.result.addressComponent.city.length - 1);
									
									this.HTTP.request({
										url: '/user/location',
										data: {
											state: res.province,
											city: res.city
										},
										method: 'POST',
										success: res => {
											// 地址未定义
											if (res.data.data.city_id == 0) {
												this.showText = '暂未开放,请选择以下热门城市';
											}
										}
									});
								} else {
									uni.showToast({
										title: result.errMsg
									});
								}
							}
						});
					}
				},
				fail: res => {
					this.showText = '正在获取当前位置...';
				}
			});
		},
		resetAd() {
			uni.authorize({
				scope: 'scope.userLocation',
				success(res) {
					this.getAdress()
				},
				fail(res) {
					uni.openSetting({
						success(res) {
							console.log(res.authSetting);
						}
					});
				}
			});
			this.showText = '当前位置';
		}
	}
};
</script>

<style scoped>
/*  自定义导航栏样式 */
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
	margin-left: 42rpx;
	/* margin-right: 20rpx; */
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
	margin-left: 220rpx;
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

/* 定位 */

.item {
	margin-top: 34rpx;
	margin-left: 36rpx;
	display: flex;
	/* align-items: center; */
}

.dd {
	width: 32rpx;
	height: 32rpx;
	margin-right: 8rpx;
}

.item .cityname {
	font-size: 32rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(48, 49, 51, 1);
	line-height: 32rpx;
}

.item .nowcity {
	font-size: 22rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(201, 202, 209, 1);
	line-height: 22rpx;
	margin-left: 4rpx;
	margin-top: 10rpx;
}

.getNowCity {
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(0, 145, 255, 1);
	line-height: 22rpx;
	margin-left: 4rpx;
	margin-top: 10rpx;
}

.tip {
	font-size: 22rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(201, 202, 209, 1);
	line-height: 22rpx;
	margin-left: 4rpx;
	margin-top: 10rpx;
}

.line {
	width: 100%;
	height: 1px;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	transform-origin: 0 0;
	-webkit-transform-origin: 0 0;
	background: rgba(221, 221, 221, 1);
	margin-top: 34rpx;
	margin-bottom: 26rpx;
}

.item-hot {
	margin-left: 40rpx;
}

.item-hot .py {
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(96, 98, 102, 1);
	line-height: 26rpx;

	margin-bottom: 20rpx;
}

.item-hot .hot-city {
	float: left;
}

.item-hot .city-button {
	/* width: 156rpx; */
	height: 60rpx;
	margin-right: 16rpx;
	margin-bottom: 16rpx;
	background: rgba(237, 239, 242, 1);
	border-radius: 8rpx;
	line-height: 60rpx;
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(48, 49, 51, 1);
}

.city-button::after {
	border: none;
}
</style>
