<template>
	<view v-show="i === index" style="padding: 18rpx 28rpx;">
		<mescroll-body :ref="'mescrollRef'+i" @init="mescrollInit" :top="top" :bottom="bom" @down="downCallback"  @up="upCallback" :down="downOption" :up="upOption"  >
			<view class="" v-for="(item, index) in list" :key="index">
				<view class="contentItem">
					<view class="left">
						<u-image width="192rpx" height="232rpx" border-radius="16rpx" :src="item.image" mode="aspectFill" :iconSize="44"></u-image>
							<view class="imgTip">
								<view v-if="item.type == 1">游记</view>
								<view v-else-if="item.type == 2">攻略</view>
								<view v-else-if="item.type == 4">视频</view>
								<view v-else-if="item.type == 5">推广</view>
							</view>
							<view class="videoIcon" v-if="item.type == 4">
								<image class="playIcon" src="/static/images/playIcon.svg"></image>
							</view>
					</view>
					<view class="right" @click="onPageJump" :id="item.article_id">
						<view class="title">
							<text class="titleText">{{ item.title }}</text>
						</view>
						<view class="content">
							<rich-text class="richText" :nodes="item.content"></rich-text>
						</view>
						<view class="favandlikebox">
							<view class="fav">
								<view class="fav-number">
									{{item.fav_count>10000?((item.fav_count-(item.fav_count%1000))/10000+'w'):item.fav_count}}
								</view>
								<view class="fav-text">
									收藏
								</view>
							</view>
							<view class="like">
								<view class="like-number">
									{{item.like_count>10000?((item.like_count-(item.like_count%1000))/10000+'w'):item.like_count}}
								</view>
								<view class="like-text">
									点赞
								</view>
							</view>
						</view>
						<view class="position">
							<image src="/static/images/iconNewMap.png"></image>
							<view class="positionText">{{ item.location.replace(/\（.*?\）/g, '') }}</view>
						</view>
					</view>
				</view>
				<view class="line"></view> 
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	import MescrollMoreItemMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js';
	
	export default {
		name:"article-list",
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		props:{
			i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
				type: Number,
				default(){
					return 0
				}
			},
			authorID:{ 
				type: String,
				default(){
					return ''
				}
			},
		},
		watch: {
			authorID(newVal, old) {
				this.authorID = newVal;
				if (this.authorID && this.authorID.length){
					this.mescroll.resetUpScroll();
				}
			}
		},
		data() {
			return {
				top:'',
				bom:'',
				list: [],
				downOption:{
					auto:false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
					  use : true ,
					  icon : null ,
					  tip : this.i?'您的收藏夹空空如也～':'您还没有赞过任何文章哦～',
					  btnText : "",
					  fixed: true,
					  top: "680rpx",
					}
				}
			}
		},
		methods: {
			// 跳转文章详情
			onPageJump(e) {
				let id = e.currentTarget.id;
				uni.navigateTo({
					url: '/pages_content/article/article?article_id=' + id
				});
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				// this.mescroll.endSuccess()
			
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			/*上拉加载的回调*/
			upCallback(page) {
				if (!this.authorID || !this.authorID.length){
					this.mescroll.endSuccess()
					return
				}
				if (this.i != this.index){
					this.mescroll.endBySize(0,0)
					return
				}
				var that = this
				// mescroll.setPageSize(6)
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				this.HTTP.request({
					url: '/author/workslist?page=' + pageNum + '&count=' + pageSize,
					data: {
						author_id: this.authorID,
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						// 接口返回的当前页数据列表 (数组)
						if (!res.data.data || !res.data.data.list || res.data.data.list.length == 0){
							this.top = 374
							that.list = [];
							that.mescroll.endBySize(0, 0);
							return
						}
						let curPageData = res.data.data.list;
						curPageData.forEach((item1, index1) => {
							item1.image = this.Utils.addImageProcess(item1.image, false, 40)
						})
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						// let totalPage = res.data.data.list;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = res.data.data.total;
						// 接口返回的是否有下一页 (true/false)
						// let hasNext = res.data.data.list;
										
						//设置列表数据
						if (page.num == 1) this.list = []; //如果是第一页需手动置空列表
						this.list = this.list.concat(curPageData); //追加新数据
						console.log("bloggerArticle",this.list)
						if(this.list.length >= 3 ){
							this.bom = 0
						}else{
							this.bom = 300							
						}
						if(this.list.length == 0){
							this.top = 374
						}else{
							this.top = 450
						}
						
						// 请求成功,隐藏加载状态
						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						// this.mescroll.endByPage(curPageLen, totalPage);
										
						//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
						this.mescroll.endBySize(curPageLen, totalSize);
										
						//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
						//this.mescroll.endSuccess(curPageLen, hasNext);
										
						//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
						//如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
						//如果传了hasNext,则翻到第二页即可显示无更多数据.
						//this.mescroll.endSuccess(curPageLen);
										
						// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
						// 建议使用setTimeout,因为this.$nextTick某些情况某些机型不触发
						
					},
					fail: () => {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr();
					}
				});
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			//点击空布局按钮的回调
			emptyClick(){
				uni.showToast({
					title:'点击了按钮,具体逻辑自行实现'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.contentItem {
	width: 694rpx;
	height: 232rpx;
	margin: 28rpx;
	margin-left: 0;
	margin-top: 0;
	margin-bottom: 20rpx;
	border-radius: 8px;
	display: flex;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	.left {
		position: relative;
		margin-right: 20rpx;
		.imgTip {
			position: absolute;
			left: 0rpx;
			top: 0rpx;
			font-size: 24rpx;
			line-height: 44rpx;
			font-weight: 500;
			color: #ffffff;
			width: 96rpx;
			height: 44rpx;
			text-align: center;
			background-color: rgba(0, 0, 0, 0.6);
			border-radius: 16rpx 0px 16rpx 0px;
		}
		.videoIcon {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -20rpx;
			margin-left: -30rpx;
			width: 40rpx;
			height: 40rpx;
		}

		.playIcon {
			width: 100%;
			height: 100%;
		}
	}

	.right {
		margin-top: 12rpx;
		height: 232rpx;
		// overflow: hidden;
		// text-overflow:ellipsis;
		// white-space: nowrap;
	}

	.right .title {
		width: 480rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(48, 49, 51, 1);
		font-family: PingFangSC-Medium, PingFang SC;
		line-height: 32rpx;
		display: flex;
	}

	.tips {
		margin-right: 10rpx;
	}

	.titleText {
		flex: 1;
		// margin-left: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.richText {
		width: 480rpx;
		height: 84rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #909399;
		line-height: 42rpx;
		margin-top: 12rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.favandlikebox {
		display: flex;
		align-items: center;
		margin-top: 14rpx;
		font-size: 22rpx;
		// font-family: Roboto-Regular, Roboto;
		// font-weight: 400;
		color: #606266;
		line-height: 22rpx;
		.fav,.like{
			display: flex;
			.fav-number,.like-number{
				font-weight: 500;
			}
			.fav-text,.like-text{
				font-weight: 400;
			}
		}
	}

	.like {
		margin-left: 20rpx;
	}

	.right .position {
		display: flex;
		margin-top: 20rpx;
		// line-height: 40rpx;
		align-items: center;

		image {
			height: 30rpx;
			width: 26rpx;
			margin-right: 4rpx;
		}

		.positionText {
			width: 452rpx;
			font-size: 22rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(0, 145, 255, 1);
			line-height: 22rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

}
.line{
	width: 722rpx;
	height: 1rpx;
	background: #EDEFF2;
	margin-bottom: 20rpx;
}
</style>
