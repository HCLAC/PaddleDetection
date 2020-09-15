<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">我的关注</view>
			</uni-nav-bar>
		</view>
		<!-- 关注列表 -->
		<view class="concernBox" v-if="followList&& followList.length">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<view class="card" v-for=" (item,index) in followList" :key="index">
					<!-- 头像 -->
					<view class="avatar" @click="tobloggers(item.author_id)">
						<image :src="item.avatar" mode=""></image>
					</view>
					<!-- 信息 -->
					<view class="info">
						<view class="nickname">
							{{item.user_name}}
						</view>
						<view class="fansArt">
							<view class="fans">
								粉丝<view class="fansNum">{{item.fans>10000?((item.fans-(item.fans%1000))/10000+'w'):item.fans}}</view>
							</view>
							<view class="art">
								文章<view class="artNum">{{item.article_count}}</view>
							</view>
						</view>
					</view>
					<!-- 关注 -->
					<view class="fllowBox" v-if="item.is_follow" @click="Fllow(item,index)">
						<text>已关注</text>
					</view>
					<view class="unfllowBox" v-if="!item.is_follow" @click="Fllow(item,index)">
						<text>关注</text>
					</view>
				</view>
			</mescroll-body>
		</view>
		<!-- 关注列表为空时 -->
		<view class="empty" v-if="!followList || !followList.length">
			<view class="emptyImg">
				<image src="../../static/images/empty.svg" mode=""></image>
			</view>
			<view class="emptyText">
				您还没有关注任何人，去首页看看吧～
			</view>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		data() {
			return {
				fansNum: 36300,
				artNum: 230,
				followList: 1,
				isfllow: 1,
				followList: []
			};
		},
		mixins: [MescrollMixin],
		onLoad() {
			this.getFollowList()
		},
		methods: {
			// 获取关注列表
			getFollowList() {
				uni.request({
					url: this.globalUrl + '/user/follow/list',
					data: {
						page: 1,
						count: 6
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					method: 'get',
					success: (res) => {
						console.log('关注列表=', res.data);
						this.followList = res.data.data.list
					}
				})
			},
			// 跳转博主详情页
			tobloggers(e){
				console.log(e)
				uni.navigateTo({
					url:'../bloggers/bloggers?author_id=' + e
				})
			},
			// 关注
			Fllow(item, index) {
				console.log(item, index)
				var that = this;
				let msg = item.is_follow ? '确认取消关注?' : '确认关注?'
				let status = item.is_follow ? 0 : 1
				uni.showModal({
					title: msg,
					success: function(res) {
						if (res.confirm) {
							uni.request({
								url: that.globalUrl + '/user/follow',
								data: {
									author_id: item.author_id,
									follow: status
								},
								method: 'POST',
								header: {
									Authorization: uni.getStorageSync('Authorization')
								},
								success: (res) => {
									that.followList[index].is_follow = status == 1 ? true : false
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})

			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			home() {
				uni.switchTab({
					url: '/pages/index/index'
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
				var that = this
				// mescroll.setPageSize(6)
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条

				uni.request({
					url: this.globalUrl + '/user/follow/list?page=' + pageNum + '&count=' + pageSize,
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: data => {
						console.log('data', data);
						// 接口返回的当前页数据列表 (数组)
						let curPageData = data.data.data.list;
						console.log('curPageData', curPageData);
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						console.log('curPageLen', curPageLen);
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						// let totalPage = data.data.data.list;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = data.data.data.total;
						console.log('totalSize', totalSize);
						// 接口返回的是否有下一页 (true/false)
						// let hasNext = data.data.data.list;

						//设置列表数据
						if (page.num == 1) this.followList = []; //如果是第一页需手动置空列表
						this.followList = this.followList.concat(curPageData); //追加新数据
						console.log('followList', this.followList);
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
	/* 自定义导航栏样式 */
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
		border-bottom: 1rpx solid rgba(237, 239, 242, 1);
	}

	.example-body {
		padding: 0;
	}

	.navBar {
		display: flex;
	}

	.slotleft {
		display: flex;
		align-items: center;
	}

	.fanhui {
		width: 40rpx;
		height: 40rpx;
		margin-left: 40rpx;
		margin-right: 20rpx;
	}

	.fhsy {
		width: 40rpx;
		height: 40rpx;
	}

	.slottitle {
		margin-left: 162rpx;
		font-size: 38rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: rgba(0, 0, 0, 1);
	}

	.button-v-line {
		width: 1px;
		height: 18px;
		background-color: #2f2f2f;
		margin: 0 8px;
	}

	//关注列表
	.card {
		margin: 28rpx 0 0 28rpx;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid rgba(237, 239, 242, 1);
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
		font-family: Roboto-Regular, Roboto;
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
		font-family: Roboto-Regular, Roboto;
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
		text-align: center;
		line-height: 52rpx;
		margin-right: 28rpx;
		color: #303133;

		text {
			height: 14px;
			font-size: 14px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;

			line-height: 14px;
		}

	}

	.fllowBox {
		width: 136rpx;
		height: 52rpx;
		background: #fff;
		border-radius: 26rpx;
		border: 1px solid #DDDDDD;
		text-align: center;
		line-height: 52rpx;
		margin-right: 28rpx;
		color: rgba(201, 202, 209, 1);

		text {
			height: 14px;
			font-size: 14px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;

			line-height: 14px;
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
		width: 476rpx;
		height: 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 30rpx;
	}
</style>
