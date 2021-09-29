<template>
	<view>
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" title="选择城市" :shadow="true">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<!-- <image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" /> -->
				</view>
			</uni-nav-bar>
		</view>
		<city-select
			@cityClick="cityClick"
			:formatName="formatName"
			:activeCity="activeCity"
			:hotCity="hotCity"
			:obtainCitys="obtainCitys"
			:isSearch="true"
			ref="citys"
		></city-select>
	</view>
</template>

<script>
import citys from '@/components/city-select/citySelect.js'
import citySelect from '@/components/city-select/city-select.vue'
export default {
    data() {
        return {
            //需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
            formatName: 'name',
            //当前城市
            activeCity: {},
            //热门城市
            hotCity: [],
            //显示的城市数据
            obtainCitys: [],
        }
    },
    components: {
        citySelect
    },
    onLoad() {
		this.whole()
		this.hot()
		this.getAdress()
		console.log(this.activeCity,'obtainCitys')
        // 动态更新数据
        // setTimeout(() => {
        //     //修改需要构建索引参数的名称
        //     this.formatName = 'cityName'
        //     //修改当前城市
        //     this.activeCity = {
        //         cityName: '南京',
        //         cityCode: 110100
        //     }
        //     //修改热门城市
        //     this.hotCity = [
        //         {
        //             cityName: '南京',
        //             cityCode: 110100
        //         },
        //         {
        //             cityName: '北京',
        //             cityCode: 110102
        //         }
        //     ]
        //     //修改构建索引数据
        //     this.obtainCitys = citys
        //     uni.showToast({
        //         icon: 'none',
        //         title: '更新数据成功',
        //         // #ifdef MP-WEIXIN
        //         duration: 3000,
        //         // #endif
        //         mask: true
        //     })
        // }, 5000)
    },
    methods: {
		back(){
			this.recordStayAndRead()
			this.Utils.back()
			
		},
		home(){
			// this.recordStayAndRead()
			// this.Utils.home()
			uni.navigateTo({
				url: '/pages/index/index'
			});
		},
		//点击城市
        cityClick(item) {
			if(item.city_id == 0){
				uni.showToast({
					title: '抱歉，当前定位城市暂未开放，推荐您选择/搜索其他热门城市',
					icon: 'none',
					duration: 3000
				});
			}else{
				uni.navigateTo({
					url: '/pages_content/provinces/provinces?state_id=' + 
					item.state_id+"&city_id="+item.city_id+"&name="+item.name+"&image="+item.image
				});
			}
            // uni.showToast({
            //     icon: 'none',
            //     title: 'item: ' + JSON.stringify(item),
            //     // #ifdef MP-WEIXIN
            //     duration: 3000,
            //     // #endif
            //     mask: true
            // })
        },
		//获取全国信息
		whole(){
			this.HTTP.request({
				url: '/area/more',
				method:'GET',
				success: (res) => {				
					// console.log(res,'res')
					this.obtainCitys = res.data.data
				}
			})
		},
		//热门城市
		hot(){
			this.HTTP.request({
				url: '/area/hot',
				method:'GET',
				success: res => {
					this.hotCity = res.data.data
				}
			})
		},
		//获取当前定位
		getAdress() {
			var that = this;
			// #ifdef H5
			this.$jsonp('https://apis.map.qq.com/ws/location/v1/ip?output=jsonp',{
				key: '3L3BZ-V5OCV-GXHPP-ULIVW-DYQRT-HRFBL',
			},5000)
			.then(res => {
				that.cityName = res.result.ad_info.city.substr(0, res.result.ad_info.city.length - 1);
			})
			.catch(error => {
				console.error('get address failed, ',error);
			})
			return
			// #endif
			uni.getLocation({
				type: 'wgs84',
				success: res => {
					this.HTTP.request({
						url: '/area/judge',
						data: {
							state: res.province,
							city: res.city
						},
						method: 'GET',
						success: data => {
							if(data.data.data.name != ''){
								// this.areaList.unshift(data.data.data)
								this.activeCity = data.data.data
							}else{
								this.activeCity = {name:'暂无城市',city_id:0}
							}
						},
					})
					if (res.city && res.province) {
						that.cityName = res.city.substr(0, res.city.length - 1);
					} else {
						let arr = [];
						arr.push(res.latitude);
						arr.push(res.longitude);
						arr = arr.join(',');
						uni.request({
							url: 'https://api.map.baidu.com/reverse_geocoding/v3/?ak=NKyWaSnsW6FFEseeCEX18Fpvgzs3jcmd&output=json&coordtype=wgs84ll',
							data: {
								location: arr
							},
							success: result => {
								if (result.data.status == 0) {
									that.cityName = result.data.result.addressComponent.city.substr(0, result.data.result.addressComponent.city
										.length - 1);
								} else {
									uni.showToast({
										title: result.errMsg
									});
								}
							}
						});
					}
				},
				// 未开启定位
				fail: error => {
					if (error.errCode === 10005) {
						uni.showToast({
							title: "请检查定位功能是否开启",
							icon: 'none'
						});
					}
					this.cityName = '未定位'
					this.dqdwText = '未获取到定位';
				}
			});
		},
	}
}
</script>

<style lang="scss">
.kong{
	width: 100%;
	height: 140rpx;
	// background: pink;
}
</style>
