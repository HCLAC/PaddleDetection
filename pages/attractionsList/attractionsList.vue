<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<uni-icons type="arrowleft" color="#333333" size="22" @click="back" />
					<view class="button-v-line"></view>
					<uni-icons type="home" color="#333333" size="22" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<!-- 卡片列表 -->
		<view class="card" v-for="item in cardList" @click="toAttractionsDetails">
			<text class="title">{{item.title}}</text>
			<text class="content">{{item.content}}</text>
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" display-multiple-items="3" >
							<swiper-item>
								<view class="swiper-item uni-bg-red">A</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-green">B</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">C</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-red">D</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-green">E</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">F</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				cardList:[
					{key:"1",title:"玉龙雪山",content:"玉龙雪山在纳西语中被称为“欧鲁”，意为“天山”。其十三座雪峰连绵不绝，宛若一条“巨龙”腾越飞舞，故称为“玉龙”。又因其岩性主要为石灰岩与玄武岩，黑白分明，所以又称为“黑白雪山”。是纳西人的神山，传说纳西族保护神“三多”的化身。"},
					{key:"2",title:"玉龙雪山",content:"玉龙雪山在纳西语中被称为“欧鲁”，意为“天山”。其十三座雪峰连绵不绝，宛若一条“巨龙”腾越飞舞，故称为“玉龙”。又因其岩性主要为石灰岩与玄武岩，黑白分明，所以又称为“黑白雪山”。是纳西人的神山，传说纳西族保护神“三多”的化身。"},
					{key:"3",title:"玉龙雪山",content:"玉龙雪山在纳西语中被称为“欧鲁”，意为“天山”。其十三座雪峰连绵不绝，宛若一条“巨龙”腾越飞舞，故称为“玉龙”。又因其岩性主要为石灰岩与玄武岩，黑白分明，所以又称为“黑白雪山”。是纳西人的神山，传说纳西族保护神“三多”的化身。"},
					{key:"4",title:"玉龙雪山",content:"玉龙雪山在纳西语中被称为“欧鲁”，意为“天山”。其十三座雪峰连绵不绝，宛若一条“巨龙”腾越飞舞，故称为“玉龙”。又因其岩性主要为石灰岩与玄武岩，黑白分明，所以又称为“黑白雪山”。是纳西人的神山，传说纳西族保护神“三多”的化身。"},
				]
			}
		},
		components:{
			uniNavBar
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			home(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			toAttractionsDetails(){
				uni.navigateTo({
					url:"/pages/attractionsDetails/attractionsDetails"
				})
			}
		}
	}
</script>

<style lang="scss">
	// 自定义导航栏样式
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
	.navBar{
		display: flex;
	}
	.slotleft{
		display: flex;
		align-items: center;
	}
	.slottitle{
		margin-left: 64px;
	}
	.button-v-line{
		width: 1px;
		height: 18px;
		background-color: #2f2f2f;
		margin: 0 8px;
	}
	// 卡片样式
	.card{
		width: 300px;
		height: 150px;
		border: 1px #333333 solid;
		border-radius: 15px;
		margin: 10px;
		display: flex;
		flex-direction: column;
	}
	.title{
		font-size: 18px;
		font-weight: 900;
		margin-left: 15px;
	}
	.content{
		padding: 15px;
		font-size: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space:nowrap;
	}
	.uni-padding-wrap{
		width: 280px;
		overflow: hidden;
	}
	.page-section{
		width: 280px;
	}
	.swiper-item{
		width: 85px;
		height: 60px;
		border-radius: 10px;
		// margin-left: 10px;
	}
	.uni-padding-wrap{
		padding: 10px;
	}
	.uni-bg-red{
		background-color: #EA552D;
	}
	.uni-bg-green{
		background-color: #4CD964;
	}
	.uni-bg-blue{
		background-color: #007AFF;
	}
</style>
