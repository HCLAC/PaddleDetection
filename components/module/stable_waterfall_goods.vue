<template>
	<view class="flow-box" :style="'height: ' + loadingTop + 'rpx'" ref="flow_box">
		<view v-for="(item, index) in newList" :key="item.objId" class="item good_item" v-show="positionList[item.objId].imageLoad" :class="positionList[item.objId].right ? 'right' : 'left'" :style="{top: positionList[item.objId].top + 'rpx'}"
		  @click="onPageJump(item)">
			<view class="" @click="onPageJump" :id="item.article_id">
				<view class="demo-top">
					<view class="imgBox">
						<image :class="item.type == 4 ? 'demoImage4' : 'demoImage'" :lazy-load="true" :src="item.image" :index="index"
						 mode="widthFix">
							<view class="videoIcon" v-if="item.type == 4">
								<image class="playIcon" src="/static/images/playIcon.svg"></image>
							</view>
						</image>
						<view class="adress">
							<view class="adreessIcon">
								<image class="" src="/static/images/iconMap3.svg"></image>
							</view>
							<view class="adressText">{{ item.location }}</view>
						</view>
					</view>
				</view>
				<view class="titleTip">
					<view class="demo-tag">
						<view class="demo-tag-owner" v-if="item.type == 1">游记</view>
						<view class="demo-tag-owner" v-if="item.type == 2">攻略</view>
						<view class="demo-tag-owner" v-if="item.type == 4">视频</view>
					</view>
					<view class="demo-title">{{ item.title }}</view>
				</view>
			</view>
			<view class="demo-user">
				<view class="userMessage">
					<image class="userHeard" :src="item.avatar"></image>
					<view class="userNikename">{{ item.author_name }}</view>
				</view>
				<view class="count" @click="clickLeftLike(item,index) in newList ">
					<view class="countImg">
						<image class="likeImg" mode="aspectFit" src="/static/images/heart.svg" v-if="item.liked == 0"></image>
						<image class="likeImg" mode="aspectFit" src="/static/images/heart_actived.svg" v-if="item.liked == 1"></image>
					</view>
					<view class="likeCount" v-if="item.like_count != 0">{{ item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

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
		titleName: "title",
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
		let chineseWidth = defaultData.titleSize;
		// otherFont宽度
		let otherWidth = defaultData.titleSize / 2;
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
		return rowText.length;
	}
	let allow = true;
	export default {
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
					url: "/pages/home/shop/goodsDetail?objId=" + item.objId
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
						let titleListLen = drawtext(item[defaultData.titleName], defaultData.titleWidth);
						titleListLen = titleListLen > 2 ? 2 : titleListLen;
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
		width: 345rpx;
		border: 2rpx solid #f9f9f9;
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 20rpx;

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
			margin: 20rpx 20rpx;
			color: #333333;
			font-size: 28rpx;
			@include bov(2);
		}

		.sell_well {
			display: flex;
			padding: 0rpx 20rpx 20rpx 20rpx;

			text {
				height: 32rpx;
				border-radius: 4rpx;
				border: solid 2rpx $themeColor;
				line-height: 28rpx;
				padding: 0 15rpx;
				font-size: 24rpx;
				color: $themeColor;
			}
		}

		.info {
			width: 100%;
			padding: 0rpx 20rpx 30rpx 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.money {
				font-size: 26rpx;
				color: #ff3d3d;
				display: flex;
				align-items: center;

				text {
					font-size: 36rpx;
				}
			}

			.count {
				font-size: 24rpx;
				color: #999;
			}
		}
	}
	.demo-warter {
			width: 360rpx;
			margin-top: 0;
			// margin-left: 10rpx;
			margin-bottom: 16rpx;
			padding-bottom: 16rpx;
			/* position: relative; */
			background-color: #ffffff;
			border-radius: 8rpx 8rpx 0 0;
			// display: inline-block;
			// break-inside: avoid;
			// box-sizing: border-box;
		}
	
		.imgBox {
			position: relative;
			display: flex;
			align-items: flex-end;
	
		}
	
		// .imgBox4{
		// 	position: relative;
		// 	display: flex;
		// 	align-items: flex-end;
	
		// }
		/* .demo-top {
		position: relative;
	}
	 */
		image {
			will-change: transform
		}
	
		.demoImage {
			width: 100%;
			min-height: 300rpx;
			max-height: 460rpx;
			border-radius: 8rpx 8rpx 0 0;
		}
	
		.demoImage4 {
			width: 100%;
			min-height: 272rpx;
			max-height: 480rpx;
			border-radius: 8rpx 8rpx 0 0;
		}
	
		.videoIcon {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -30rpx;
			margin-left: -30rpx;
			width: 60rpx;
			height: 60rpx;
		}
	
		.playIcon {
			width: 100%;
			height: 100%;
		}
	
		.adress {
			position: absolute;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			max-width: 240rpx;
			height: 40rpx;
			padding-right: 16rpx;
			background: rgba(0, 0, 0, 0.6);
			border-radius: 0px 14rpx 0px 0px;
		}
	
		.adreessIcon {
			width: 24rpx;
			height: 24rpx;
			margin: 0 4rpx;
			display: flex;
		}
	
		.adreessIcon image {
			width: 100%;
			height: 100%;
		}
	
		.adressText {
			max-width: 192rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			/* line-height:24px; */
			/* margin-right: 16rpx; */
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	
		.titleTip {
			display: flex;
			margin-top: 10rpx;
			margin-left: 8rpx;
		}
	
		.demo-title {
			width: 278rpx;
			/* max-height: 70rpx; */
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(48, 49, 51, 1);
			margin-left: 8rpx;
			line-height: 46rpx;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-wrap: break-word;
			white-space: normal !important;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	
		.demo-tag {
			margin-top: 9rpx;
		}
	
		.demo-tag-owner {
			width: 52rpx;
			height: 28rpx;
			text-align: center;
			align-items: center;
			color: #0091ff;
			border: 2rpx solid rgba(0, 145, 255, 1);
			border-radius: 14rpx;
			font-size: 16rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(0, 145, 255, 1);
			/* margin-top: 6rpx; */
		}
	
		.demo-user {
			width: 100%;
			font-size: 10rpx;
			margin-top: 24rpx;
			/* margin-bottom: 16rpx; */
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	
		.userMessage {
			font-size: 10px;
			font-weight: 900;
			color: #464646;
			display: flex;
			align-items: center;
		}
	
		.userHeard {
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			margin-left: 14rpx;
		}
	
		.userNikename {
			font-size: 24rpx;
			margin-left: 16rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(96, 98, 102, 1);
		}
	
		.count {
			display: flex;
			align-items: center;
			margin-right: 20rpx;
		}
	
		.countImg {
			width: 28rpx;
			height: 28rpx;
			// margin-right: 8rpx;
	
		}
	
		.likeImg {
			width: 100%;
			height: 100%;
		}
	
		.likeCount {
			font-size: 22rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			margin-left: 8rpx;
			color: rgba(96, 98, 102, 1);
			/* line-height:20rpx; */
		}
</style>
