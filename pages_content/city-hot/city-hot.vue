<template>
	<view>
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
            obtainCitys: []
        }
    },
    components: {
        citySelect
    },
	// #ifdef MP-BAIDU
	onInit(query) {
	// #endif
	// #ifndef MP-BAIDU
	onLoad(query) {
	// #endif
		this.activeCity = query.name?{name:query.name}:{}
		this.whole()
		this.hot()
    },
    methods: {
		//点击城市
        cityClick(item) {
			if(!item.city_id){
				uni.showToast({
					title: '抱歉，当前定位城市暂未开放，推荐您选择/搜索其他热门城市',
					icon: 'none',
					duration: 3000
				});
			} else {
				uni.navigateTo({
					url: '/pages_content/provinces/provinces?state_id=' + 
					item.state_id+"&city_id="+item.city_id+"&name="+item.name+"&image="+item.image
				});
			}
        },
		//获取全国信息
		whole(){
			this.HTTP.request({
				url: '/area/more',
				method:'GET',
				success: (res) => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
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
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					this.hotCity = res.data.data
				}
			})
		}
	}
}
</script>

<style lang="scss">

</style>
