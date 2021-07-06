<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" :status-bar="true" class="navbar" >
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
								<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
							<!-- #endif -->
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
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
					<image src="../../static/images/iconMapt.svg" mode=""></image>
					<text>问题目的地</text>
				</view>
				<view class="change" @click="getCity">
					<view class="changeText" @click="show = true">{{name}}</view>
					<image class="changeIcon" src="../../static/images/more-right.svg" mode=""></image>
				</view>
			</view>
			<!-- 兴趣标签 -->
			<view class="intTipBox">
				<view class="intTipText">
					<image src="../../static/images/iconMapt.svg" mode=""></image>
					<text>兴趣标签</text>
				</view>
				<view class="tipsCheck">
					<view class="tip" v-for="(item,index) in tipsCheck" :key="index" @click="clickTipsCheck(item)">
						<image src="../../static/images/aTip.svg" mode=""></image>
						<text>{{item.name}}</text>
					</view>
				</view>
				<view class="tipsBox">
					<view class="tip" v-for="(item,index) in tips" :key="index" @click="clickTip(item)">
						<image src="../../static/images/aTip.svg" mode=""></image>
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
		<u-popup v-model="show" mode="top" height="383px">
			<uni-nav-bar :fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
					<i<!-- #ifndef  MP-BAIDU -->
								<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
							<!-- #endif -->				<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
			<!-- 城市 -->
			<view class="nowcity">
				<text>{{ name }}</text>
				<image class="nowcityImg" src="../../static/images/moreDown.svg" mode=""></image>
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
								<!-- <view class="item-title" @click="gethotsiteslist2(item)"> -->
								<!-- <text>全省</text> -->
								<!-- </view> -->
								<view class="item-container">
									<view class="thumb-box" v-for="(item1, index1) in item.city_list" :key="index1">
										<!-- <image class="item-menu-image" :src="item1.icon" mode=""></image> -->
										<view class="item-menu-name" @click="gethotsiteslist1(item1)">{{ item1.name }}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</block>
			</view>
		</u-popup>
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
				show: false,
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
		onLoad(options) {
			console.log(options)
			this.title = options.title
			this.getCity()
			this.getAdress()
			this.getTips()
		},
		watch:{
			questionsContent(val){
				console.log(val.length)
				this.number = val.length
			}
		},
		methods: {
			// 获取全国城市
			getCity() {
				uni.request({
					url: this.globalUrl + '/area/guide',
					success: res => {
						console.log('获取全国城市', res);
						var cityList = res.data.data.areas;
						this.cityList = cityList.slice(1);
						console.log('shift--', this.cityList);
					}
				});
			},
			// 获取标签
			getTips(){
				uni.request({
					url: this.globalUrl + '/questions/labels',
					data:{
						count:10
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log('获取标签', res);
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
						console.log(111, res);
						this.name = res.city.substr(0, res.city.length - 1);
						var city = res.city
						var state = res.province
						uni.request({
							url: this.globalUrl + '/user/location',
							data: {
								state: state,
								city: city
							},
							header: {
								Authorization: uni.getStorageSync('Authorization')
							},
							method: 'POST',
							success: res => {
								console.log('城市信息=', res);
								this.state_id = res.data.data.state_id
								this.city_id = res.data.data.city_id
								
							}
						});
					},
				})
			},
			// 获取
			gethotsiteslist1(item1) {
				if (item1.city_id == 0) {
					uni.request({
						url: this.globalUrl + '/area',
						data: {
							state_id: item1.state_id
						},
						success: res => {
							console.log('城市信息=', res);
							(this.name = res.data.data.name),
							this.state_id = res.data.data.state_id
							this.city_id = res.data.data.city_id
							
							(this.show = false);
						}
					});
				} else {
					uni.request({
						url: this.globalUrl + '/area',
						data: {
							state_id: item1.state_id,
							city_id: item1.city_id
						},
						success: res => {
							console.log('城市信息==', res);
							this.item = res.data.data 
							this.name  = res.data.data.name
							this.state_id = res.data.data.state_id
							this.city_id = res.data.data.city_id
							this.show = false
						}
					});
				}
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
					query
						.select('.' + elClass)
						.fields(
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
					console.log(this.tipsCheckId)
				}else{
					// this.tipsCheck.shift()
					
					var tip = this.tipsCheck.shift()
					console.log(tip)
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
					console.log(this.tipsCheckId)
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
				console.log(this.tipsCheckId)
			},
			// 提交
			buttonUp(){
				uni.request({
					url: this.globalUrl + '/questions',
					data:{
						title:this.title,
						state_id: this.state_id,
						city_id: this.city_id,
						labels:this.tipsCheckId,
						content:this.questionsContent,
						anonymous:this.checked
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log('提交', res);
						var question_id = res.data.data.question_id
						uni.navigateTo({
							url: '/pages/questionsComplete/questionsComplete?question_id=' + question_id
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
					url: '/pagesA/index/index'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
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
	}
	.fanhui{
		width: 40rpx;
		height: 40rpx;
		margin-left: 42rpx;
		margin-right: 20rpx;
	}
	.fhsy{
		width: 40rpx;
		height: 40rpx;
	}
	/* #ifdef  MP-BAIDU*/
	.fhsy {
		margin-left: 100rpx;
	}
	/*  #endif  */
	.slottitle{
		margin-left: 162rpx;
		font-size: 38rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:600;
		color:rgba(0,0,0,1);
	}
	.button-v-line{
		width: 1px;
		height: 18px;
		background-color: #2f2f2f;
		margin: 0 8px;
	}
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
