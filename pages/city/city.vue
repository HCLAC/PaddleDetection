<template>
	<view class='list-city'>
		<scroll-view scroll-y="true" style="height:100%;"  scroll-with-animation="true"
			enable-back-to-top="true">
			<!-- 定位 -->
			<view class='item'>
				<image src="/static/images/dd.png" class="dd"></image>
				<view class='cityname'>{{citySelected}}</view>
				<text class="nowcity">当前位置</text>
			</view>
			<!-- 热门城市 -->
			<view class='item-hot'>
				<view class='py' id="hot">国内热门省市</view>
				<view class="hot-city" v-for="item in hotCityDate">
					<button  class="city-button" type="default" size="mini">
						{{item.title}}
					</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				citySelected: '青岛',
				city: '青岛',
				cityData: {},
				//搜索历史记录
				historyListShow: true,
				historyList: [],
				hotCityDate:[
					{key:"yunnan",title:"云南"},
					{key:"sichuan",title:"四川"},
					{key:"guizhou",title:"贵州"},
					{key:"chongqing",title:"重庆"},
					{key:"chengdu",title:"成都"},
					{key:"lijiang",title:"丽江"},
					{key:"dali",title:"大理"},
					{key:"leshan",title:"乐山"},
					{key:"jiuzhaigou",title:"九寨沟"},
					{key:"guiyang",title:"贵阳"},
					{key:"kunming",title:"昆明"},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.list-city{
    margin: 10px;
}

/* 定位 */
.item{
    display: flex;
    align-items: center;
}
.dd{
    width: 15px;
    height: 15px;
}
.item .cityname{
    font-weight: 600;
}
.item .nowcity{
    font-size: 12px;
    margin-left:5px;
}

.item-hot .py{
    font-size: 12px;
    font-weight: 600;
    color: gray;
    margin-top: 5px;
}
.item-hot .hot-city{
    float: left;
}
.item-hot .city-button{
    margin: 10px
}

</style>
