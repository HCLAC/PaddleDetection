<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" title="问题描述">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<view class="questionsTitle">
			{{title}}
		</view>
		<view class="questionsContent">
			<!-- <u-input v-model="questionsContent" :type="textarea" :clearable="false" placeholder="写下关于问题的详细描述" /> -->
			<textarea
				class="textArea"
				:clearable="false"  
				placeholder="写下关于问题的详细描述..." 
				placeholder-style="font-size:28rpx;line-height:42rpx"
				maxlength="1000"  
				:style="{background: customStyleInput.background}" 
				v-model="questionsContent" 
			>
			</textarea>
			<view class="textNum">
				{{number}}/1000
			</view>
			<!-- 问题目的地 -->
			<view class="adressBox">
				<view class="adressText">
					<image src="/static/images/iconMapt.svg"></image>
					<text>问题目的地</text>
				</view>
				<view class="change" >
					<view class="changeText" @click="showCityPicker = true">{{name}}</view>
					<image class="changeIcon" src="/static/images/more-right.svg"></image>
				</view>
			</view>
			<!-- 兴趣标签 -->
			<view class="intTipBox">
				<view class="intTipText">
					<image src="/static/images/iconMapt.svg"></image>
					<text>兴趣标签</text>
				</view>
				<view class="tipsCheck">
					<view class="tip" v-for="(item,index) in tipsCheck" :key="index" @click="clickTipsCheck(item)">
						<image src="/static/images/aTip.svg"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
				<view class="tipsBox">
					<view class="tip" v-for="(item,index) in tips" :key="index" @click="clickTip(item)">
						<image src="/static/images/aTip.svg"></image>
						<text>{{item.name}}</text>	
					</view>
				</view>
			</view>
			<!-- 匿名提问开关 -->
			<view class="anonymous">
				<view class="anonymousT">
					匿名提问
				</view>
				<u-switch v-model="checked" active-color="#ffe512"></u-switch>
			</view>
			<u-button :custom-style="customStyle" @click="buttonUp">发布问题</u-button>
		</view>
		<!-- 城市选择弹窗 -->
		<cityPicker :show="showCityPicker" :name="querys.name" :cityList="cityList" @onclose="cityPickerClose"></cityPicker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				questionsContent:'',
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				cityList: null,
				name: '',
				showCityPicker: false,
				state_id:0,
				city_id:0,
				tips:{},
				tipsCheck:[],
				tipsCheckId:[],
				checked: false,
				number:0,
				customStyleInput:{
					background: '#f8f8f8',
				},
				customStyle:{
					width: '694rpx',
					height: '98rpx',
					background: '#FFE512',
					borderRadius: '54rpx',
					fontSize: '32rpx',
					fontFamily: 'PingFangSC-Medium, PingFang SC',
					fontWeight: '500',
					color: '#303133'
				}
			};
		},
		// #ifdef MP-BAIDU
		onInit(query) {
		// #endif
		// #ifndef MP-BAIDU
		onLoad(query) {
		// #endif
			this.title = query.title
			this.getCity()
			this.getAdress()
			this.getTips()
		},
		watch:{
			questionsContent(val){
				this.number = val.length
			}
		},
		methods: {
			cityPickerClose(){
				this.showCityPicker = false
			},
			// 获取全国城市
			getCity() {
				this.HTTP.request({
					url: '/area/guide',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						var cityList = res.data.data.areas;
						this.cityList = cityList.slice(1);
					}
				});
			},
			// 获取标签
			getTips(){
				this.HTTP.request({
					url: '/questions/labels',
					data:{
						count:10
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						this.tips = res.data.data
					}
				});
			},
			// 获取当前地理位置
			getAdress() {
				var that = this;
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						this.name = res.city.substr(0, res.city.length - 1);
						var city = res.city
						var state = res.province
						this.HTTP.request({
							url: '/user/location',
							data: {
								state: state,
								city: city
							},
							method: 'POST',
							success: res => {
								this.state_id = res.data.data.state_id
								this.city_id = res.data.data.city_id
								
							}
						});
					},
				})
			},
			// 点击标签
			clickTip(item){
				// console.log(item)
				if(this.tipsCheck.length < 1){
					this.tipsCheck.push(item)
					let listVar = new Array
					for(let i=0; i<this.tips.length; i++){
						listVar.push(this.tips)
						if (this.tips[i] == item){
							listVar[i].splice(i, 1)
						}
					}
					this.tipsCheckId.push(item.label_id)
				}else{
					// this.tipsCheck.shift()
					
					var tip = this.tipsCheck.shift()
					this.tips.push(tip)
					
					this.tipsCheck.push(item)
					
					let listVar = new Array
					for(let i=0; i<this.tips.length; i++){
						listVar.push(this.tips)
						if (this.tips[i] == item){
							listVar[i].splice(i, 1)
						}
					}
					this.tipsCheckId.shift()
					
					this.tipsCheckId.push(item.label_id)
				}
				
			},
			// 点击已选标签
			clickTipsCheck(item){
				this.tips.push(item)
				let listVar = new Array
				for(let i=0; i<this.tipsCheck.length; i++){
					listVar.push(this.tipsCheck)
					if (this.tipsCheck[i] == item){
						listVar[i].splice(i, 1)
					}
				}
				let listA = new Array
				for(let i=0; i<this.tipsCheckId.length; i++){
					listA.push(this.tipsCheckId)
					if (this.tipsCheckId[i] == item.label_id){
						listA[i].splice(i, 1)
					}
				}
			},
			// 提交
			buttonUp(){
				this.HTTP.request({
					url: '/questions',
					data:{
						title:this.title,
						state_id: this.state_id,
						city_id: this.city_id,
						labels:this.tipsCheckId,
						content:this.questionsContent,
						anonymous:this.checked
					},
					method: 'POST',
					success: res => {
						var question_id = res.data.data.question_id
						uni.navigateTo({
							url: '/pages_questions/questionsComplete/questionsComplete?question_id=' + question_id
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 弹窗
	.navtitle {
		font-size: 38rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 38rpx;
		margin-left: 180rpx;
	}
	
	.nowcity {
		margin: 40rpx 40rpx 32rpx 40rpx;
		display: flex;
		align-items: center;
		// height: 28rpx;
		text {
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			line-height: 28rpx;
			margin: 16rpx 12rpx 8rpx 6rpx;
		}
		.nowcityImg {
			width: 16rpx;
			height: 16rpx;
			margin-top: 6rpx;
		}
	}
	.change {
		width: 88rpx;
		height: 40rpx;
		background: #ffffff;
		border-radius: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.changeText {
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #606266;
	}
	.changeIcon {
		width: 14rpx;
		height: 14rpx;
		margin-left: 6rpx;
	}
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
	// 标题
	.questionsTitle{
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 36rpx;
		margin: 38rpx 28rpx 20rpx;
	}
	.textArea{
		width: 638rpx;
		height: 394rpx;
		background: #F8F8F8;
		border-radius: 8px;
		padding: 32rpx 28rpx;
		line-height: 42rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #303133;
		margin: 0px 28rpx;
	}
	.textNum{
		position: absolute;
		margin-top: -64rpx;
		margin-left: 590rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #C9CAD1;
		line-height: 28rpx;
	}
	// 问题目的地
	.adressBox{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 48rpx;
		margin-left: 28rpx;
		margin-right: 28rpx;
		.adressText{
			display: flex;
			align-items: center;
			image{
				width: 32rpx;
				height: 32rpx;
			}
			text{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #303133;
				margin-left: 16rpx;

			}
		}
		.change{
			.changeText{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #0091FF;
				line-height: 28rpx;

			}
			.changeIcon{
				width: 24rpx;
				height: 24rpx;
			}
		}
	}
	// 兴趣标签
	.intTipBox{
		margin: 56rpx 28rpx 30rpx;
		.intTipText{
			image{
				width: 32rpx;
				height: 32rpx;
			}
			text{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #303133;
				margin-left: 16rpx;
			}
		}
		.tipsCheck{
			margin-top: 48rpx;
			display: flex;
			flex-wrap: wrap;
			.tip{
				height: 48rpx;
				background: #FFE512;
				border-radius: 24rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				text-align: center;
				line-height: 48rpx;
				padding: 0 20rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Light, PingFang SC;
				font-weight: 300;
				color: #606266;
				image{
					width: 20rpx;
					height: 19.6rpx;
					margin-right: 4rpx;
				}
			}
		}
		.tipsBox{
			display: flex;
			flex-wrap: wrap;
			.tip{
				height: 48rpx;
				border-radius: 24rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				text-align: center;
				// align-items: center;
				// line-height: 44rpx;
				padding: 0 20rpx;
				background: #FFFFFF;
				border: 2rpx solid #C9CAD1;
				font-size: 28rpx;
				font-family: PingFangSC-Light, PingFang SC;
				font-weight: 300;
				color: #606266;
				image{
					width: 20rpx;
					height: 19.6rpx;
					margin-right: 4rpx;
				}

			}
		}
	}
	// 匿名提问
	.anonymous{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0rpx 28rpx;
		margin-bottom: 80rpx;
		padding: 30rpx 0rpx;
		border-top: 1rpx solid #edeff2;
		.anonymousT{
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #606266;
			line-height: 28rpx;

		}
		
	}
</style>
