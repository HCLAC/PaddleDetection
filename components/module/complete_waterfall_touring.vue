<template>
	<view class="wrap">
		<!-- <u-button @click="clear">清空列表</u-button> -->
		<u-waterfall v-model="list" ref="uWaterfall" >
			<template v-slot:left="{leftList}">
				<view class="demo-warter demo-warter-l" v-for="(item, index) in leftList" :key="index" @click="onPageJump">
					<!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
					
					<!-- <u-lazy-load threshold="-200" border-radius="8" :image="item.image" :index="index" ></u-lazy-load> -->
					<image class="demo-image"  :src="item.image" :index="index" mode="widthFix"></image>
					<view class="adress">
						<image class="adreessIcon" src="../../static/images/Icon／Map3@2x(1).png" mode=""></image>
						<view class="adressText">
							{{item.adressText}}
						</view>
					</view>
					
					<view class="titleTip">
						<view class="demo-tag">
							<view class="demo-tag-owner">
								攻略
							</view>
						</view>
						<view class="demo-title">
							{{item.title}}
						</view>
					</view>
					<view class="demo-user">
						<view class="userMessage">
							<image class="userHeard" src="../../static/images/userImg.png"></image>
							<view class="userNikename">{{ item.shop }}</view>
						</view>
						<view class="count">
							<image src="../../static/images/hear选中(1).png"></image>
								{{ item.numLike || 0 }}
							</view>
					</view>
					
					<!-- 微信小程序无效，因为它不支持在template中引入组件 -->
					<!-- <u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon> -->
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index" @click="onPageJump">
					
					<!-- <u-lazy-load threshold="-200" border-radius="8" :image="item.image" :index="index"></u-lazy-load> -->
					<image class="demo-image" :src="item.image" :index="index" mode="widthFix"></image>
					<view class="adress">
						<image class="adreessIcon" src="../../static/images/Icon／Map3@2x(1).png" mode=""></image>
						<view class="adressText">
							{{item.adressText}}
						</view>
					</view>
					<!-- <view class="demo-img-wrap">
						 <image class="demo-image" :src="item.image" :index="index" mode="widthFix"></image>
					</view> -->
					<view class="titleTip">
						<view class="demo-tag">
							<view class="demo-tag-owner">
								攻略
							</view>
						</view>
						<view class="demo-title">
							{{item.title}}
						</view>
					</view>
					<view class="demo-user">
						<view class="userMessage">
							<image class="userHeard" src="../../static/images/userImg.png"></image>
							<view class="userNikename">{{ item.shop }}</view>
						</view>
						<view class="count">
							<image src="../../static/images/heart未选中.png" ></image>
							<view class="countNum">{{ item.numLike || 0 }}</view>
						</view>
					</view>
					<!-- 微信小程序无效，因为它不支持在template中引入组件 -->
					<!-- <u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon> -->
				</view>
			</template>
		</u-waterfall>
		<!-- <u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus: 'loadmore',
				flowList: [],
				list: [
					{
						title: '云南 | 愿你踏遍山海觉 得人间值得',
						shop: 'Nancy Garcia',
						numLike:28,
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						adressText:"斯里兰卡"
					},
					{
						title: '云南 | 愿你踏遍山海觉 得人间值得',
						shop: '石磊',
						numLike:100,
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg',
						adressText:"斯里兰卡"
					},
					{
						title: '云南 | 愿你踏遍山海觉 得人间值得',
						shop: '黄油奶油包',
						numLike:2020,
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
						adressText:"斯里兰卡"
					},
					{
						title: '云南 | 愿你踏遍山海觉 得人间值得',
						shop: 'Paul',
						numLike:9000,
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
						adressText:"斯里兰卡"
					},
					{
						title: '云南 | 愿你踏遍山海觉 得人间值得',
						shop: '柠檬精',
						numLike:1000,
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg',
						adressText:"斯里兰卡"
					},
				]
			}
		},
		onLoad() {
			this.addRandomData();
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		methods: {
			addRandomData() {
				for(let i = 0; i < 10; i++) {
					let index = this.$u.random(0, this.list.length - 1);
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(this.list[index]))
					item.id = this.$u.guid();
					this.flowList.push(item);
				}
			},
			remove(id) {
				this.$refs.uWaterfall.remove(id);
			},
			clear() {
				this.$refs.uWaterfall.clear();
			},
			onPageJump(item) {
				uni.navigateTo({
					url: "/pages/contentdetail/contentdetail?objId=" + item.objId
				})
			},
		}
	}
</script>



<style lang="scss" scoped>
	.demo-warter-l{
		margin-left:10rpx ;
	}
	.demo-warter {
		margin-top: 0;
		margin-right: 10rpx;
		margin-bottom: 48rpx;
		position: relative;
		background-color: #FFFFFF;
	}
	
	// .u-close {
	// 	position: absolute;
	// 	top: 32rpx;
	// 	right: 32rpx;
	// }
	
	.demo-image {
		width: 100%;
		border-radius: 8rpx 8rpx 0 0 ;
	}
	.adress{
		position: absolute;
		left: 4rpx;
		bottom: 174rpx;
		display: flex;
		align-items: center;
		width:144rpx;
		height:40rpx;
		background:rgba(0,0,0,0.6);
		border-radius:0px 14rpx 0px 0px;
	}
	.adreessIcon{
		width: 24rpx;
		height: 24rpx;
		margin-right: 4rpx;
	}
	.adressText{
		font-size:24rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:24px;
	}
	.titleTip{
		display: flex;
		margin-top: 24rpx;
		margin-left: 8rpx;
	}
	.demo-title {
		width: 278rpx;
		height: 70rpx;
		font-size: 28rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(48,49,51,1);
		margin-left: 8rpx;
		// line-height:28rpx;
	}
	
	.demo-tag {
		
	}
	
	.demo-tag-owner {
		width: 52rpx;
		height: 28rpx;
		text-align: center;
		align-items: center;
		color: #0091FF;
		border: 2rpx solid rgba(0,145,255,1);
		border-radius: 14rpx;
		font-size: 16rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(0,145,255,1);
		margin-top: 6rpx;
	}
	
	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}
	
	.demo-user {
		font-size: 10rpx;
		margin-top: 24rpx;
		margin-bottom: 16rpx;
		display: flex;
		justify-content: space-between;
	}
	.userMessage {
		font-size: 10px;
		font-weight: 900;
		color: #464646;
		display: flex;
		align-items: center;
		.userHeard{
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			margin-left: 14rpx;
		}
		.userNikename{
			font-size: 24rpx;
			margin-left: 16rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(96,98,102,1);
		}
		
	}
	.count {
		display: flex;
		font-size: 22rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(96,98,102,1);
		align-items: center;
		margin-right: 20rpx;
	}
	.count image{
		width: 26rpx;
		height: 26rpx;
		margin-right: 8rpx;
	}
</style>



<!-- <template>
	<view class="flow-box" :style="'height: ' + loadingTop + 'rpx'" ref="flow_box">
		<u-waterfall v-for="(item, index) in newList" :key="item.objId" class="item good_item" :class="positionList[item.objId].right ? 'right' : 'left'" v-show="positionList[item.objId].imageLoad" :style="{top: positionList[item.objId].top + 'rpx'}"
		  @click="onPageJump(item)">
			<view class="goods_img">
				<image :data-id="item.objId" @load="onImageLoad" :src="item.img" mode="widthFix"></image>
			</view>
			
			<view class="title">
				<view class="sell_well">
					<text>攻略</text>
				</view>
				<view class="title-r" >{{item.name}}</view>
			</view>
			<view class="info">
				<view class="userMessage">
					<image class="userHeard" src="../../static/images/mine-actived.png"></image>
					<text>{{ item.shopName }}</text>
				</view>
				<text class="count"><u-icon name="heart" size="16"></u-icon>{{ item.numSales || 0 }}</text>
			</view>
		</u-waterfall>
	</view>
</template> -->

<!--
<script>
	const defaultData = {
		// 起始距离（rpx）
		startTop: 20,
		// 除了图片和标题以外的高度（rpx）
		contentHeight: 40 + 32 + 20 + 30 + 60,
		// 瀑布流容器宽度（rpx）
		viewWidth: 344,
		// 标题可显示宽度（rpx）
		titleWidth: 300,
		// 标题文字大小（rpx）
		titleSize: 28,
		// 容器之间的间隔Y轴（rpx）
		viewSpace: 20,
		// 列表ID参数名称
		idName: "objId",
		// 列表标题参数名称
		titleName: "name",
	};
	
	// 文字换行计算行数
	function drawtext(text, maxWidth) {
		let textArr = text.split("");
		let len = textArr.length;
		// 上个节点
		let previousNode = 0;
		// 记录节点宽度
		let nodeWidth = 0;
		// 文本换行数组
		let rowText = [];
		// 如果是字母，侧保存长度
		let letterWidth = 0;
		// 汉字宽度
		let chineseWidth = defaultData.titleSize + 2;
		// otherFont宽度
		let otherWidth = (defaultData.titleSize + 2) / 2;
		for (let i = 0; i < len; i++) {
			if (/[\u4e00-\u9fa5]|[\uFE30-\uFFA0]/g.test(textArr[i])) {
				if(letterWidth > 0){
					if(nodeWidth + chineseWidth + letterWidth * otherWidth > maxWidth){
						rowText.push({
							type: "text",
							content: text.substring(previousNode, i)
						});
						previousNode = i;
						nodeWidth = chineseWidth;
						letterWidth = 0;
					} else {
						nodeWidth += chineseWidth + letterWidth * otherWidth;
						letterWidth = 0;
					}
				} else {
					if(nodeWidth + chineseWidth > maxWidth){
						rowText.push({
							type: "text",
							content: text.substring(previousNode, i)
						});
						previousNode = i;
						nodeWidth = chineseWidth;
					}else{
						nodeWidth += chineseWidth;
					}
				}
			} else {
				if(/\n/g.test(textArr[i])){
					rowText.push({
						type: "break",
						content: text.substring(previousNode, i)
					});
					previousNode = i + 1;
					nodeWidth = 0;
					letterWidth = 0;
				}else if(textArr[i] == "\\" && textArr[i + 1] == "n"){
					rowText.push({
						type: "break",
						content: text.substring(previousNode, i)
					});
					previousNode = i + 2;
					nodeWidth = 0;
					letterWidth = 0;
				}else if(/[a-zA-Z0-9]/g.test(textArr[i])){
					letterWidth += 1;
					if(nodeWidth + letterWidth * otherWidth > maxWidth){
						rowText.push({
							type: "text",
							content: text.substring(previousNode, i + 1 - letterWidth)
						});
						previousNode = i + 1 - letterWidth;
						nodeWidth = letterWidth * otherWidth;
						letterWidth = 0;
					}
				} else{
					if(nodeWidth + otherWidth > maxWidth){
						rowText.push({
							type: "text",
							content: text.substring(previousNode, i)
						});
						previousNode = i;
						nodeWidth = otherWidth;
					}else{
						nodeWidth += otherWidth;
					}
				}
			}
		}
		if (previousNode < len) {
			rowText.push({
				type: "text",
				content: text.substring(previousNode, len)
			});
		}
		return rowText;
	}
	let allow = true;
	export default {
		components: {
			uniIcons
		},
		props: {
			// 数据列表
			list: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		data() {
			return {
				newList: [],
				positionList: [],
				loadingTop: 0,
				leftHistoryTop: 0,
				rightHistoryTop: 0
			};
		},
		watch: {
			// 数据
			list: function(newVal, oldVal) {
				this.newList = newVal;
				this.getCalculationPosition();
			}
		},
		methods: {
			onPageJump(item) {
				uni.navigateTo({
					url: "/pages/contentdetail/contentdetail?objId=" + item.objId
				})
			},
			refreshData() {},
			// 节流
			throttle(callback,time = 400){
			    if(!allow) return false;
			    allow = false;
			    setTimeout(function(){
			        allow = true;
			        callback();
			    },time);
			},
			// 获取数据位置信息 top,right
			getCalculationPosition(){
				let leftHistoryTop = defaultData.startTop;
				let rightHistoryTop = defaultData.startTop;
				let positionList = this.positionList;
				this.newList.forEach((item,index) => {
					let currentHeight =  defaultData.contentHeight;
					let positionItem  = {};
					// 查看是否有位置数据
					if(positionList[item[defaultData.idName]]){
						positionItem = positionList[item[defaultData.idName]];
					}else {
						positionList[item[defaultData.idName]] = {};
					}
					// 查看是否有图片高度数据，没有默认等宽
					if(positionItem.imageHeight){
						currentHeight += positionItem.imageHeight;
						positionList[item[defaultData.idName]].imageLoad = true;
					}else{
						currentHeight += defaultData.viewWidth;
					}
					// 查看是否有标题高度数据，没有获取高度
					if(positionItem.titleHeight){
						currentHeight += positionItem.titleHeight;
					}else{
						let titleList = drawtext(item[defaultData.titleName], defaultData.titleWidth);
						let titleListLen = titleList.length;
						positionList[item[defaultData.idName]].titleList = titleList;
						positionList[item[defaultData.idName]].titleHeight = titleListLen * (defaultData.titleSize + 6);
						currentHeight += titleListLen * (defaultData.titleSize + 6);
					}
					if(leftHistoryTop > rightHistoryTop){
						positionList[item[defaultData.idName]].top = rightHistoryTop;
						positionList[item[defaultData.idName]].right = true;
						positionList[item[defaultData.idName]].height = currentHeight;
						rightHistoryTop += currentHeight + defaultData.viewSpace;
					}else{
						positionList[item[defaultData.idName]].top = leftHistoryTop;
						positionList[item[defaultData.idName]].right = false;
						positionList[item[defaultData.idName]].height = currentHeight;
						leftHistoryTop += currentHeight + defaultData.viewSpace;
					}
				});
				if(leftHistoryTop > rightHistoryTop){
					this.loadingTop = leftHistoryTop;
				}else{
					this.loadingTop = rightHistoryTop;
				}
				this.positionList = positionList;
				this.$forceUpdate();
			},
			// 图片加载完成
			onImageLoad(e){
				let id = e.currentTarget.dataset.id;
				let scale = defaultData.viewWidth / e.detail.width;
				let height = scale * e.detail.height;
				if(this.positionList[id]){
					this.positionList[id].imageHeight = height;
				}else{
					this.positionList[id] = {
						imageHeight: height
					}
				}
				// 图片加载完刷新位置节流一下，提升性能
				this.throttle(() => {
					this.getCalculationPosition();
				}, 100);
			}
		}
	};
</script>

-->