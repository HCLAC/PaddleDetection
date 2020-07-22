<template>
	<view class="wrap">
		<!-- <u-button @click="clear">清空列表</u-button> -->
		<u-waterfall v-model="list" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="onPageJump">
					<!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
					<!-- #ifndef MP-WEIXIN -->
					<u-lazy-load threshold="-150" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<view class="demo-img-wrap">
						<image class="demo-image" :src="item.image" mode="widthFix"></image>
					</view>
					<!-- #endif -->
					<view class="demo-tag">
						<view class="demo-tag-owner">
							自营
						</view>
					</view>
					<view class="demo-title">
						{{item.title}}
					</view>
					<view class="demo-user">
						<view class="userMessage">
							<image class="userHeard" src="../../static/images/mine-actived.png"></image>
							<view class="userNikename">{{ item.shop }}</view>
						</view>
						<view class="count"><u-icon name="heart" size="30"></u-icon>{{ item.numSales || 0 }}</view>
					</view>
					
					<!-- 微信小程序无效，因为它不支持在template中引入组件 -->
					<!-- <u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon> -->
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index" @click="onPageJump">
					<!-- #ifndef MP-WEIXIN -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<view class="demo-img-wrap">
						<image class="demo-image" :src="item.image" mode="widthFix"></image>
					</view>
					<!-- #endif -->
					<view class="demo-tag">
						<view class="demo-tag-owner">
							自营
						</view>
					</view>
					<view class="demo-title">
						{{item.title}}
					</view>
					<view class="demo-user">
						<view class="userMessage">
							<image class="userHeard" src="../../static/images/mine-actived.png"></image>
							<view class="userNikename">{{ item.shop }}</view>
						</view>
						<view class="count"><u-icon name="star" size="28" ></u-icon>{{ item.numSales || 0 }}</view>
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
						price: 35,
						title: '北国风光，千里冰封，万里雪飘',
						shop: '李白杜甫旗舰店',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 75,
						title: '望长城内外，惟余莽莽',
						shop: '李白杜甫旗舰店',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg',
					},
					{
						price: 385,
						title: '大河上下，顿失滔滔',
						shop: '李白杜甫旗舰店',
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
					},
					{
						price: 784,
						title: '欲与天公试比高',
						shop: '李白杜甫旗舰店',
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
					},
					{
						price: 7891,
						title: '须晴日，看红装素裹，分外妖娆',
						shop: '李白杜甫旗舰店',
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg',
					},
					{
						price: 2341,
						shop: '李白杜甫旗舰店',
						title: '江山如此多娇，引无数英雄竞折腰',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg',
					},
					{
						price: 661,
						shop: '李白杜甫旗舰店',
						title: '惜秦皇汉武，略输文采',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
					},
					{
						price: 1654,
						title: '唐宗宋祖，稍逊风骚',
						shop: '李白杜甫旗舰店',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						price: 1678,
						title: '一代天骄，成吉思汗',
						shop: '李白杜甫旗舰店',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						price: 924,
						title: '只识弯弓射大雕',
						shop: '李白杜甫旗舰店',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						price: 8243,
						title: '俱往矣，数风流人物，还看今朝',
						shop: '李白杜甫旗舰店',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
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

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>

<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
		border: 2rpx solid #777777;
	}
	
	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}
	
	.demo-image {
		width: 100%;
		border-radius: 4px;
	}
	
	.demo-title {
		font-size: 30rpx;
		font-weight: 900;
		margin-top: 5px;
		color: $u-main-color;
		text-indent: 80rpx;
	}
	
	.demo-tag {
		display: flex;
		position: absolute;
		margin-top: 5px;
		align-items: center;
	}
	
	.demo-tag-owner {
		// background-color: $u-type-error;
		color: #d4d4d4;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border: 2rpx solid #d4d4d4;
		border-radius: 25rpx;
		font-size: 20rpx;
		// line-height: 1;
	}
	
	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}
	
	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}
	
	.demo-user {
		font-size: 10rpx;
		color: $u-tips-color;
		margin-top: 5px;
		display: flex;
		justify-content: space-around;
	}
	.userMessage {
		font-size: 10px;
		font-weight: 900;
		color: #464646;
		display: flex;
		align-items: center;
		.userHeard{
			width: 30rpx;
			height: 30rpx;
			border: 1rpx #777777 solid;
			border-radius: 50%;
			margin-right: 10rpx;
		}
		.userNikename{
			font-size: 24rpx;
		}
		
	}
	.count {
		display: flex;
		font-size: 24rpx;
		color: #999;
		align-items: center;
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

<style scoped lang="scss">
	@import '@/style/mixin.scss';

	.flow-box {
		position: relative;
		color: #1a1a1a;
		padding: 0 20rpx 0rpx 20rpx;
		box-sizing: content-box;
	}

	.flow-box .left {
		left: 20rpx;
	}

	.flow-box .right {
		right: 20rpx;
	}

	.flow-box .good_item {
		position: absolute;
		width: 325rpx;
		border: 2rpx solid #c1c1c1;
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 10rpx;

		&.noMargin {
			margin-right: 0;
		}

		.goods_img {
			image {
				width: 100%;
				height: 345rpx;
			}
		}

		.title {
			margin: 10rpx 20rpx;
			color: #333333;
			font-size: 24rpx;
			font-weight: 900;
			position: relative;
		}
		.title-r{
			text-indent: 30px;
			font-size: 28rpx;
			// position: absolute;
		}
		.sell_well {
			// top: 0;
			// left: 0;
			// display: flex;
			// padding: 0rpx 20rpx 20rpx 20rpx;

			text {
				position: absolute;
				height: 28rpx;
				border-radius: 4rpx;
				border: solid 2rpx #777777;
				line-height: 28rpx;
				padding: 0 10rpx;
				font-size: 20rpx;
				color: #777777;
			}
		}

		.info {
			// width: 100%;
			// padding: 0rpx 20rpx 30rpx 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 10rpx 20rpx;

			.userMessage {
				// font-size: 26rpx;
				font-weight: 900;
				color: #464646;
				display: flex;
				align-items: center;
				.userHeard{
					width: 30rpx;
					height: 30rpx;
					border: 1rpx #777777 solid;
					border-radius: 50%;
					margin-right: 10rpx;
				}
				text {
					font-size: 20rpx;
				}
			}

			.count {
				display: flex;
				font-size: 24rpx;
				color: #999;
				align-items: center;
			}
		}
	}
</style>
-->