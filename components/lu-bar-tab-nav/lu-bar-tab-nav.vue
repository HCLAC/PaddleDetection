<template>
	<view :id="'luBarTabNav'+barId" class="lu-bar-tab-nav">
		<view v-if="!!barFixed" id="luTabFixed" class="lu-bar-tab lu-bar-tab-fixed" :style="{ top: barTopStyles,height:barHeightStyles,display:barShowStyles }">
			<view class="lu-tab-item" v-for="(item,index) in tabList" :key="index" 
			:class="[selectedIndex==index? 'lu-active' : '',!!iconShow? 'lu-icon-show' : '']" 
			:style="selectedIndex==index?tabActiveStyles:tabStyles"
			@tap="_scrollToTarget(index)">
				<view v-if="!!iconShow" class="lu-tab-icon" 
					:class="selectedIndex==index?item.selectedIconClass:item.iconClass"
					:style="selectedIndex==index?(!!item.selectedIconImage?'backgroundImage:url('+item.selectedIconImage+')':''):(!!item.iconImage?'backgroundImage:url('+item.iconImage+')':'')">
				</view>
				<view class="lu-tab-text">{{item.text}}</view>
			</view>
			<scroll-view v-if="selectedIndex==1" class="day-wrap" :scroll-x="true" :show-scrollbar="false">
				<view class="day-inner">
					<view v-for="tab in dayList" :key="tab" class="day-item" @click="onTabTap(tab)">
						{{tab}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view id="luTabStatic" class="lu-bar-tab lu-bar-tab-static" :style="{height:barHeightStyles}">
			<view class="lu-tab-item" v-for="(item,index) in tabList" :key="index" 
			:class="[selectedIndex==index? 'lu-active' : '',!!iconShow? 'lu-icon-show' : '']" 
			:style="selectedIndex==index?tabActiveStyles:tabStyles"
			@tap="_scrollToTarget(index)">
				<view v-if="!!iconShow" class="lu-tab-icon" 
					:class="selectedIndex==index?item.selectedIconClass:item.iconClass"
					:style="selectedIndex==index?(!!item.selectedIconImage?'backgroundImage:url('+item.selectedIconImage+')':''):(!!item.iconImage?'backgroundImage:url('+item.iconImage+')':'')">
				</view>
				<view class="lu-tab-text">{{item.text}}</view>
			</view>
		</view>
		<view class="lu-tab-content"><slot></slot></view>
	</view>
</template>

<script>
	export default {
		name: 'lu-bar-tab-nav',
		props: {
			barFixed:{
				type:Boolean,
				default:true
			},
			iconShow:{
				type:Boolean,
				default:false
			},
			transitionShow:{
				type:Boolean,
				default:false
			},
			barHeight:{
				type:[String,Number],
				default:44
			},
			barTop:{
				type:[String,Number],
				default:0
			},
			barId:{
				type:[String,Number],
				default:0
			},
			tabList: {
				type:Array,
				default:function () {
					return [{
						//text:"text",
						//navTarget:"#item1",
						// iconClass:"iconClass",
						// iconImage:"iconImage",
						// selectedIconClass:"selectedIconClass",
						//selectedIconImage:"selectedIconImage"
					}]
				}
			},
			dayList: {
				type:Array,
				default:function () {
					return []
				}
			},
			
		},
		data() {
			return {
				barShow:false,
				selectedIndex:0,
			};
		},
		computed:{
			tabStyles:function () {
				return (!!this.color?'color:'+this.color+';':'')+(!!this.backgroundColor?'backgroundColor:'+this.backgroundColor+';':'');
			},
			tabActiveStyles:function () {
				return (!!this.selectedColor?'color:'+this.selectedColor+';':'')+(!!this.selectedBackgroundColor?'backgroundColor:'+this.selectedBackgroundColor+';':'');
			},
			barTopStyles:function () {
				// #ifndef H5
					return 'calc('+this.barTop+'px);';
				// #endif
				// #ifdef H5
					return 'calc('+this.barTop+'px + var(--window-top));';
				// #endif
			},
			barHeightStyles:function () {
				return this.barHeight?this.barHeight+'px':'44px';
			},
			barShowStyles:function () {
				return !this.barShow?'none':'';
			},
		},
		methods: {
			_barInit:async function (index){
				console.log('_barInit========')
				let navTargetTop = [];
				let duration = 0;
				let viewScrollTop = 0;
				let viewHeight = 0;
				for (let i = 0,len=this.tabList.length; i < len; i++) {
					navTargetTop[i]= await this._queryMultipleNodes(this.tabList[i]["navTarget"]).then(res => {
						let navTarget = res[0],
							viewPort = res[1];
						viewHeight = viewPort.height;
						viewScrollTop = viewPort.scrollTop;
						const scrollTop = parseInt(navTarget.top) + viewPort.scrollTop - this.barTop - this.barHeight;
						return scrollTop;
					});
				}
				if (!!this.transitionShow) {
					duration = 200;
				} 
				return {
					navTargetTop:navTargetTop,
					duration:duration,
					viewHeight:viewHeight,
					viewScrollTop:viewScrollTop
				};
			},
			_pageScroll:async function(i){
				console.log('_pageScroll========')
				const elment = await this._barInit(i);
				let scrollTop = elment["navTargetTop"][i];
				let duration = elment["duration"];
				let viewHeight = elment["viewHeight"];
				let viewScrollTop = elment["viewScrollTop"];
				if (Math.abs(scrollTop-viewScrollTop)>viewHeight) {
					if (scrollTop>viewScrollTop) {
						await uni.pageScrollTo({
							scrollTop:(scrollTop-viewHeight),
							duration:0
						});
					}else{
						await uni.pageScrollTo({
							scrollTop:(scrollTop+viewHeight),
							duration:0
						});
					}
				}
				await uni.pageScrollTo({
					scrollTop:(scrollTop+1),
					duration:duration
				});
				// #ifndef H5
				const view = await this._queryMultipleNodes();
				viewScrollTop = view[0].scrollTop;
				if (scrollTop>viewScrollTop&&duration!==0) {
					uni.pageScrollTo({
						scrollTop:(scrollTop+1),
						duration: 0
					})
				}
				// #endif
			},
			onTabTap: async function(idName){
				let navTargetTop = 0;
				let duration = 0;
				let viewScrollTop = 0;
				let viewHeight = 0;
				navTargetTop =	await this._queryMultipleNodes('#'+idName).then(res => {
				console.log('res---',res)
					let navTarget = res[0],
						viewPort = res[1];
					viewHeight = viewPort.height;
					viewScrollTop = viewPort.scrollTop;
					const scrollTop = parseInt(navTarget.top) + viewPort.scrollTop - 44 - this.barTop - this.barHeight;
					return scrollTop;
				})
				uni.pageScrollTo({
					scrollTop: navTargetTop,
					duration: 0
				});
			},
			_scrollToTarget:function(i) {
				console.log('_scrollToTarget========')
				this._pageScroll(i);
			},
			_queryMultipleNodes:function (e,notThis) {
				console.log('_queryMultipleNodes========')
				return new Promise((resolve, reject) => {
					let view = uni.createSelectorQuery();
					if (!!notThis) {
						view.in(this);
					}
					if (!!e) {
						view.select(e).boundingClientRect();
					}
					view.selectViewport().fields({size: true,scrollOffset: true});
					view.exec(function(res) {
						resolve(res);
					});
					
				});
			},
			_showBarFixed:function () {
				console.log('_showBarFixed========')
				this._queryMultipleNodes("#luTabStatic",true).then(res => {
					let tabNav = res[0];
					if (tabNav.top<=this.barTop) {
						this.barShow=true;
					}else{
						this.barShow=false;
					}
				});
			},
			_selectedTab:function (y) {
				console.log('_selectedTab========')
				this._barInit().then((res)=>{
					let itemIndex = 0;
					for (let i = 0,len=res["navTargetTop"].length; i < len; i++) {
						if (y >=res["navTargetTop"][i]) {
							itemIndex = i;
						}
					}
					this.selectedIndex = itemIndex;
				});
				if (!!this.barFixed) {
					this._showBarFixed();
				}
			}
		}
	};
</script>

<style lang="scss" >
	lu-bar-tab-nav{
		position:relative;
		width: 100%;
	}
	.lu-bar-tab-nav{
		position:relative;
		width: 750rpx;
		.lu-bar-tab{
			width: 100%;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-around;
			align-items:center;
			background-color: #fff;
			height: 88rpx;
			border-bottom: 2rpx solid #EDEFF2;
			.lu-tab-item{
				//默认状态
				position: relative;
				flex: 1 1 auto;
				text-align: center;
				color: #606266;
				height: 100%;
				font-size: 28rpx;
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
				align-items:center;
				
				.lu-tab-icon{
					font-size: inherit;
					color: inherit;
				}
				.lu-tab-text{
					font-size: inherit;
					color: inherit;
				}
				// 显示图标
				&.lu-icon-show{
					.lu-tab-icon{
						height: 24px;
						width: 24px;
						background-position: center center;
						background-repeat: no-repeat;
						background-size: 100% 100%;
					}
					.lu-tab-text{
						font-size: 12px;
						line-height: 16px;
					}
				}
				// 选中状态
				&.lu-active{
					color: #303133;
					font-weight: bold;
					position: relative;
					&::before{
						position: absolute;
						bottom: 0;
						left: calc(50% - 83rpx);
						content: " ";
						width: 166rpx;
						height: 8rpx;
						background-color: #FFE512;
						border-radius: 8rpx 8rpx 0 0;
					}
					.lu-tab-icon{
						background-position: center center;
						background-repeat: no-repeat;
						background-size: 100% 100%;
					}
				}
			}
			
		}
		.lu-bar-tab-fixed{
			position:fixed;
			z-index: 10;
			top:calc(0px + var(--window-top));
			.day-wrap{
				position: absolute;
				top: 88rpx;
				left: 0;
				background-color: #fff;
				box-shadow: 0px 4rpx 8rpx 0px rgba(0, 0, 0, 0.08);
				.day-inner{
					display: flex;
					flex-direction: row;
					white-space: nowrap;
					padding: 20rpx 25rpx;
					.day-item{
						display: inline-block;
						flex-wrap: nowrap;
						padding: 0 16rpx;
						height: 48rpx;
						background: rgba(237, 239, 242, .7);
						border-radius: 24rpx;
						font-size: 28rpx;
						font-weight: 400;
						color: #909399;
						line-height: 48rpx;
						text-align: center;
						margin: 0 15rpx;
					}
				}
			}
		}
		.lu-bar-tab-static{
			position:static;
			z-index: 0;
		}
	}
</style>
