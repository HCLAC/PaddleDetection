<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" :border="true" title="我的关注">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 关注列表 -->
		<view class="concernBox" v-if="followList || followList.length">
			<mescroll-body ref="mescrollRef" :bottom="bom" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<view class="card" v-for=" (item,index) in followList" :key="index">
					<!-- 头像 -->
					<view class="avatar" @click="tobloggers(item.author_id)">
						<image lazy-load :src="item.avatar"></image>
					</view>
					<!-- 信息 -->
					<view class="info" @click="tobloggers(item.author_id)">
						<view class="nickname">
							{{item.user_name}}
						</view>
						<view class="fansArt">
							<view class="fans">
								粉丝<view class="fansNum">{{item.fans>10000?((item.fans-(item.fans%1000))/10000+'w'):item.fans}}</view>
							</view>
							<view class="art">
								文章<view class="artNum">{{item.article_count>10000?((item.article_count-(item.article_count%1000))/10000+'w'):item.article_count}}</view>
							</view>
						</view>
					</view>
					<!-- 关注 -->
					<view class="fllowBox" v-if="item.is_follow" @click="Fllow(item,index)">
						<text>已关注</text>
					</view>
					<view class="unfllowBox" v-else @click="Fllow(item,index)">
						<text>关注</text>
					</view>
				</view>
			</mescroll-body>
		</view>
		<!-- 弹窗 -->
		<u-modal v-model="show" :border-radius="40" :content="content" :show-title="false" :show-cancel-button="true" @confirm="confirm"></u-modal>
	</view>
</template>

<script>
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	export default {
		data() {
			return {
				bom:'',
				fansNum: 36300,
				artNum: 230,
				isfllow: 1,
				followList: [],
				item:[],
				index:0,
				show: false,
				content: '',
				downOption:{
					auto: false,
				},
				upOption:{
					auto:true, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 10, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
					  use : true ,
					  icon : '/static/images/empty.svg' ,
					  tip : '您还没有关注任何人，去首页看看吧～',
					  btnText : "",
					  fixed: false,
					  top: "100rpx",
					  zIndex: 99
					}
				}
			};
		},
		mixins: [MescrollMixin],
		methods: {
			// 跳转博主详情页
			tobloggers(e){
				uni.navigateTo({
					url:'/pages_article/bloggers/bloggers?author_id=' + e
				})
			},
			// 关注
			Fllow(item, index) {
				this.item = item
				this.index = index
				var that = this;
				let status = item.is_follow ? 0 : 1
				// 取消关注，二次确认退出
				if(status == 0){
					that.show = true
					that.content = '确认取消关注？'
					return 
				}
				// 添加关注
				this.HTTP.request({
					url: '/user/follow',
					data: {
						author_id: this.item.author_id,
						follow: status
					},
					method: 'POST',
					success: (res) => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						that.followList[that.index].is_follow = status
					}
				})
			},
			// 点击确定
			confirm(){
				var that = this
				let status = this.item.is_follow ? 0 : 1
				this.HTTP.request({
					url: '/user/follow',
					data: {
						author_id: this.item.author_id,
						follow: status
					},
					method: 'POST',
					success: (res) => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						that.followList[that.index].is_follow = status
					}
				})
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
				var that = this
				// mescroll.setPageSize(6)
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = 10; // 页长, 默认每页10条

				this.HTTP.request({
					url: '/user/follow/list?page=' + pageNum + '&count=' + pageSize,
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
							that.followList = [];
							that.mescroll.endBySize(0, 0);
							return
						}
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.data.list;
						curPageData.forEach((item1, index1) => {
							item1.avatar = this.Utils.addImageProcess(item1.avatar, false, 60)
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
						if (page.num == 1) this.followList = []; //如果是第一页需手动置空列表
						this.followList = this.followList.concat(curPageData); //追加新数据
						if(this.followList.length >= 9 ){
							this.bom = 0
						}else{
							this.bom = 300							
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	//关注列表
	.card {
		margin: 28rpx 0 0 28rpx;
		padding-bottom: 30rpx;
		border-bottom: 0.5px solid rgba(237, 239, 242, 1);
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 104rpx;
		height: 104rpx;
		border-radius: 50%;

		image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	.info {
		margin-left: 20rpx;
		flex: 1;
	}

	.nickname {
		height: 28rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #303133;
		line-height: 28rpx;
	}

	.fansArt {
		margin-top: 16rpx;
		display: flex;
		align-items: center;
	}

	.fans {
		height: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #606266;
		line-height: 24rpx;
		display: flex;
		align-items: center;
	}

	.fansNum {

		height: 24rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #606266;
		line-height: 24rpx;
		margin-left: 8rpx;
	}

	.art {
		height: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #606266;
		line-height: 24rpx;
		display: flex;
		align-items: center;
		margin-left: 20rpx;
	}

	.artNum {
		height: 24rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #606266;
		line-height: 24rpx;
		margin-left: 8rpx;
	}

	.unfllowBox {
		width: 136rpx;
		height: 52rpx;
		background: #FFE512;
		border-radius: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 28rpx;
		color: #303133;
		text {
			display: block;
			font-size: 28rpx;
			font-weight: 500;
		}

	}

	.fllowBox {
		width: 136rpx;
		height: 52rpx;
		background: #fff;
		border-radius: 26rpx;
		border: 2rpx solid #DDDDDD;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 28rpx;
		color: rgba(201, 202, 209, 1);

		text {
			display: block;
			font-size: 28rpx;
			font-weight: 400;
			color: #C9CAD1;
		}
	}

	// 列表为空时
	.empty {
		margin-top: 350rpx;
		margin-left: 138rpx;
	}

	.emptyImg {
		width: 148rpx;
		height: 148rpx;
		margin-left: 164rpx;
		margin-bottom: 40rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.emptyText {
		width: 100%;
		height: 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 30rpx;
	}
</style>
