<template>
	<view class="weather" v-if="weather">
		<image class="weatherImg" :src="imgUrl" ></image>
		<view class="temp">{{ weather.temp }}</view>
	</view>
</template>

<script>
	export default {
		name:"weather",
		props:{
			weather:{
				type: Object,
				default(){
					return null
				}
			}
		},
		data() {
			return {
				imgUrl: '/static/images/weather/qing.svg'
			};
		},
		watch: {
			weather: function(weather, weather_old){
				if (!weather || !weather.weather) return
				switch (weather.weather){
					case '小雨':
						this.imgUrl = '/static/images/weather/xiaoyu.svg'
						break;
					case '暴雨':
						this.imgUrl = '/static/images/weather/baoyu.svg'
						break;
					case '大暴雨':
						this.imgUrl = '/static/images/weather/dabaoyu.svg'
						break;
					case '大雪':
						this.imgUrl = '/static/images/weather/daxue.svg'
						break;
					case '大雨':
						this.imgUrl = '/static/images/weather/dayu.svg'
						break;
					case '冻雨':
						this.imgUrl = '/static/images/weather/dongyu.svg'
						break;
					case '多云':
						this.imgUrl = '/static/images/weather/duoyun.svg'
						break;
					case '拂尘':
						this.imgUrl = '/static/images/weather/fuchen.svg'
						break;
					case '雷阵雨':
						this.imgUrl = '/static/images/weather/leizhenyu.svg'
						break;
					case '雷阵雨伴有冰雹':
						this.imgUrl = '/static/images/weather/leizhenyubanyoubingbao.svg'
						break;
					case '霾':
						this.imgUrl = '/static/images/weather/mai.svg'
						break;
					case '强沙尘暴':
						this.imgUrl = '/static/images/weather/qiangshachenbao.svg'
						break;
					case '晴':
						this.imgUrl = '/static/images/weather/qing.svg'
						break;
					case '沙尘暴':
						this.imgUrl = '/static/images/weather/shachenbao.svg'
						break;
					case '特大暴雨':
						this.imgUrl = '/static/images/weather/tedabaoyu.svg'
						break;
					case '雾':
						this.imgUrl = '/static/images/weather/wu.svg'
						break;
					case '小雪':
						this.imgUrl = '/static/images/weather/xiaoxue.svg'
						break;
					case '扬沙':
						this.imgUrl = '/static/images/weather/yangsha.svg'
						break;
					case '阴':
						this.imgUrl = '/static/images/weather/yin.svg'
						break;
					case '雨夹雪':
						this.imgUrl = '/static/images/weather/yujiaxue.svg'
						break;
					case '阵雪':
						this.imgUrl = '/static/images/weather/zhenxue.svg'
						break;
					case '阵雨':
						this.imgUrl = '/static/images/weather/zhenyu.svg'
						break;
					case '中雪':
						this.imgUrl = '/static/images/weather/zhongxue.svg'
						break;
					case '中雨':
						this.imgUrl = '/static/images/weather/zhongyu.svg'
						break;			
				}
			}
		},
		
		methods:{
		},
	}
</script>

<style>

.weather {
	display: flex;
	align-items: center;
	width: 200rpx;
	height: 80rpx;
	position: absolute;
	bottom: 56rpx;
	left: 40rpx;
}
.weatherImg {
	width: 44rpx;
	height: 44rpx;
}
.temp {
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #ffffff;
	line-height: 40rpx;
	margin-left: 14rpx;
}
</style>
