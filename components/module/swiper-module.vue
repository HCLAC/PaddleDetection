<template>
	<view class="dot-main">
		<view :class="['dot-item',current==index?'active':'']" v-for="(item,index) in list" :key="index"></view>
	</view>
</template>
<style>
	.dot-main {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.dot-item {
		width: 10.41rpx;
		height: 10.41rpx;
		border-radius: 50%;
		background-color: rgba(255,255,255,0.5);
		margin: 0 6upx;
		box-sizing: border-box;
	}
	.active {
		border-radius: 33.33rpx;
		width: 25rpx;
		background-color: #FFFFFF;
	}
</style>
<script>
	export default {
		props: [ 'list','current'],
		data() {
			return {
				
			};
		}
	}
</script>
