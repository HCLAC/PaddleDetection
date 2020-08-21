<template>
	<view class="flow-box" :style="'height: ' + loadingTop + 'rpx'" ref="flow_box">
		<view class="demo-warter demo-warter-l" v-for="(item,index) in list" :key="index" v-show="positionList[item.objId].imageLoad" :class="positionList[item.objId].right ? 'right' : 'left'" :style="{top: positionList[item.objId].top + 'rpx'}"
		 >
			<view class="" @click="onPageJump" :id="item.article_id">
				<view class="demo-top">
					<image class="demo-image" :src="item.image" :index="index" lazy-load="true" mode="widthFix"></image>
					<!-- <u-lazy-load class="demo-image" :image="item.image"  ></u-lazy-load> -->
					<view class="adress">
						<view class="adreessIcon">
							<image class="" src="../../static/images/Icon／Map3.svg" mode=""></image>
						</view>
									
						<view class="adressText">
							{{item.location}}
						</view>
					</view>
				</view>
				<view class="titleTip">
					<view class="demo-tag">
						<view class="demo-tag-owner" v-if="item.type==1">
							游记
						</view>
						<view class="demo-tag-owner" v-if="item.type==2">
							攻略
						</view>
					</view>
					<view class="demo-title">
						{{item.title}}
					</view>
				</view>
			</view>
			<view class="demo-user">
				<view class="userMessage">
					<image class="userHeard" :src="item.avatar"></image>
					<view class="userNikename">{{ item.author_name }}</view>
				</view>
				<view class="count" @click="clickLike" :id="item.article_id">
					<image src="../../static/images/heart.svg" v-if="item.liked==0"></image>
					<image src="../../static/images/heart-actived.svg" v-if="item.liked==1"></image>
					{{ item.like_count || 0 }}
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
		titleName: "name",
	};
	
	// 文字换行计算行数
	// function drawtext(text, maxWidth) {
	// 	let textArr = text.split("");
	// 	let len = textArr.length;
	// 	// 上个节点
	// 	let previousNode = 0;
	// 	// 记录节点宽度
	// 	let nodeWidth = 0;
	// 	// 文本换行数组
	// 	let rowText = [];
	// 	// 如果是字母，侧保存长度
	// 	let letterWidth = 0;
	// 	// 汉字宽度
	// 	let chineseWidth = defaultData.titleSize;
	// 	// otherFont宽度
	// 	let otherWidth = defaultData.titleSize / 2;
	// 	for (let i = 0; i < len; i++) {
	// 		if (/[\u4e00-\u9fa5]|[\uFE30-\uFFA0]/g.test(textArr[i])) {
	// 			if(letterWidth > 0){
	// 				if(nodeWidth + chineseWidth + letterWidth * otherWidth > maxWidth){
	// 					rowText.push({
	// 						type: "text",
	// 						content: text.substring(previousNode, i)
	// 					});
	// 					previousNode = i;
	// 					nodeWidth = chineseWidth;
	// 					letterWidth = 0;
	// 				} else {
	// 					nodeWidth += chineseWidth + letterWidth * otherWidth;
	// 					letterWidth = 0;
	// 				}
	// 			} else {
	// 				if(nodeWidth + chineseWidth > maxWidth){
	// 					rowText.push({
	// 						type: "text",
	// 						content: text.substring(previousNode, i)
	// 					});
	// 					previousNode = i;
	// 					nodeWidth = chineseWidth;
	// 				}else{
	// 					nodeWidth += chineseWidth;
	// 				}
	// 			}
	// 		} else {
	// 			if(/\n/g.test(textArr[i])){
	// 				rowText.push({
	// 					type: "break",
	// 					content: text.substring(previousNode, i)
	// 				});
	// 				previousNode = i + 1;
	// 				nodeWidth = 0;
	// 				letterWidth = 0;
	// 			}else if(textArr[i] == "\\" && textArr[i + 1] == "n"){
	// 				rowText.push({
	// 					type: "break",
	// 					content: text.substring(previousNode, i)
	// 				});
	// 				previousNode = i + 2;
	// 				nodeWidth = 0;
	// 				letterWidth = 0;
	// 			}else if(/[a-zA-Z0-9]/g.test(textArr[i])){
	// 				letterWidth += 1;
	// 				if(nodeWidth + letterWidth * otherWidth > maxWidth){
	// 					rowText.push({
	// 						type: "text",
	// 						content: text.substring(previousNode, i + 1 - letterWidth)
	// 					});
	// 					previousNode = i + 1 - letterWidth;
	// 					nodeWidth = letterWidth * otherWidth;
	// 					letterWidth = 0;
	// 				}
	// 			} else{
	// 				if(nodeWidth + otherWidth > maxWidth){
	// 					rowText.push({
	// 						type: "text",
	// 						content: text.substring(previousNode, i)
	// 					});
	// 					previousNode = i;
	// 					nodeWidth = otherWidth;
	// 				}else{
	// 					nodeWidth += otherWidth;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	if (previousNode < len) {
	// 		rowText.push({
	// 			type: "text",
	// 			content: text.substring(previousNode, len)
	// 		});
	// 	}
	// 	return rowText.length;
	// }
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
				list: [],
				positionList: [],
				loadingTop: 0,
				leftHistoryTop: 0,
				rightHistoryTop: 0
			};
		},
		watch: {
			// 数据
			list: function(newVal, oldVal) {
				this.list = newVal;
				this.getCalculationPosition();
			}
		},
		methods: {
			onPageJump(item) {
				uni.navigateTo({
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
				this.list.forEach((item,index) => {
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
						// let titleListLen = drawtext(item[defaultData.titleName], defaultData.titleWidth);
						// titleListLen = titleListLen > 2 ? 2 : titleListLen;
						// positionList[item[defaultData.idName]].titleHeight = titleListLen * (defaultData.titleSize + 6);
						// currentHeight += titleListLen * (defaultData.titleSize + 6);
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
	.demo-warter-l {
		margin-left: 10rpx;
	}
	
	.demo-warter {
		width: 360rpx;
		margin-top: 0;
		margin-right: 10rpx;
		margin-bottom: 16rpx;
		padding-bottom: 16rpx;
		/* position: relative; */
		background-color: #FFFFFF;
	}
	
	.demo-top {
		position: relative;
		
	}
	
	.demo-image {
		min-height: 300rpx !important;
		max-height: 460rpx;
		width: 100%;
		border-radius: 8rpx 8rpx 0 0;
		position: relative;
	}
	
	.adress {
		position: absolute;
		left: 0;
		bottom: 8rpx;
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
		margin-top: 18rpx;
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
	}
	
	.demo-tag {
		margin-top: 9rpx;
	}
	
	.demo-tag-owner {
		width: 52rpx;
		height: 28rpx;
		text-align: center;
		align-items: center;
		color: #0091FF;
		border: 2rpx solid rgba(0, 145, 255, 1);
		border-radius: 14rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 145, 255, 1);
		/* margin-top: 6rpx; */
	}
	
	.demo-user {
		font-size: 10rpx;
		margin-top: 24rpx;
		/* margin-bottom: 16rpx; */
		display: flex;
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
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(96, 98, 102, 1);
		align-items: center;
		margin-right: 20rpx;
	}
	
	.count image {
		width: 26rpx;
		height: 26rpx;
		margin-right: 8rpx;
	}
</style>
