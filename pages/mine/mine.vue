<template>
	<view class="content">
		<view class="contentTop">
			<image src="../../static/images/mineBack.png" class="backImg"></image>
			<!-- 用户信息 -->
			<view class="usermes">
				<image class="userAva" :src="avatarUrl"></image>
				<view class="userR">
					<view class="userName">{{ nickName }}</view>
					<!-- <view class="logout">退出登录</view> -->
				</view>
			</view>
		</view>
		
		<!-- 我的收藏 -->
		<view class="myCollection">
			<view class="phone"><image class="phoneImg" src="../../static/images/phone.png" mode=""></image></view>
			
			<view>我的收藏</view>
			<scroll-view scroll-y="true" class="list">
			
				<mescroll-body  ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"  :up="upOption">
					<view class="contentItem" v-for="(item, index) in tipList" :key="index">
						<view class="left">
							<image :src="item.main_image" mode="">
								<view class="imgTip">
									<view  v-if="item.type==1">
										游记
									</view>
									<view  v-if="item.type==2">
										攻略
									</view>
								</view>
							</image>
						</view>
						<view class="right" @click="onPageJump" :id= "item.article_id">
							<view class="title">
								<view class="tips" v-if="item.type==1">
									游记
								</view>
								<view class="tips" v-if="item.type==2">
									攻略
								</view>
								| 
								<view class="titleText">
									{{item.title}}
								</view>
							</view>
							<view class="content">
								<rich-text class="richText" :nodes="item.content "></rich-text>
								<!-- {{item.title}} -->
							</view>
							<view class="position">
								<image src="../../static/images/Icon／Map.svg" mode="aspectFill"></image>
								<view>{{item.location}}</view>
							</view>
						</view>
					</view>
				</mescroll-body>
				<!-- <view class="noContentItem" v-show="tipList == null">
					<image src="../../static/images/wenjianjia.png" mode=""></image>
					<view class="tipText">您的收藏夹空空如也~</view>
				</view> -->
			</scroll-view>
		</view>
	</view>
	
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import httpType from '../../httpType.js';
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
export default {
	data() {
		return {
			nickName:"",
			avatarUrl:"",
			tipList:[]
		};
	},
	mixins: [MescrollMixin],
	computed: mapState(['forcedLogin', 'hasLogin', 'phone']),
	
	
	onLoad() {
		this.getUserMsg()
	},
	
	methods: {
		getUserMsg(){
			var that = this
			
			uni.login({
			  provider: 'baidu',
			  success: function(loginRes) {
			    console.log(loginRes.authResult);
			    // 获取用户信息
			    uni.getUserInfo({
			      provider: 'baidu',
			      success:  function(infoRes) {
			        console.log('用户昵称为：' + infoRes.userInfo.nickName);
					var infoRes = infoRes.userInfo
					console.log(infoRes.nickName)
					that.nickName = infoRes.nickName
					that.avatarUrl = infoRes.avatarUrl
					uni.setStorageSync('nickName',infoRes.nickName)
					uni.setStorageSync('avatarUrl',infoRes.avatarUrl)
			      }
			    })
				
			  }
			});
			
			uni.getStorage({
				key:'Authorization',
				success:function(res){
					console.log("token===>",res.data)
					// uni.request({
					// 	url:'http://121.40.30.19/user/info',
					// 	header:{
					// 		'Authorization':res.data
					// 	},
					// 	success:function(res){
					// 			console.log('个人信息',res)
					// 	}
					// })
				}
			}),
			
			uni.request({
				url:"http://121.40.30.19/user/info",
				header:{
					'Authorization':uni.getStorageSync('Authorization')
				},
				method:'get',
				success:function(res){
					console.log('个人信息=',res.data)
					if (res.data.code != 0) {
						// debugger
						uni.showModal({
							title: '提示',
							content: '您好，请先登录',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.redirectTo({
										url: '../login/login'
									})
								}
							}
						})
						return
					}
					uni.setStorageSync('mobile',res.data)
					console.log('存储信息',res.data)
					
					
				}
			}),
			uni.request({
				url:'http://121.40.30.19/user/favorite/list',
				data:{
					'count':5,
					'page':1
				},
				header:{
					'Authorization':uni.getStorageSync('Authorization')
				},
				method:'get',
				success:function(res){
					console.log('收藏列表',res.data)
					that.tipList = res.data.data.list
					console.log('1111111',that.tipList)
				}
			})
			
		},
		// 跳转文章详情
		onPageJump(e) {
			console.log(e)
			let id = e.currentTarget.id
			// debugger
			// return
			uni.navigateTo({
				url: "/pages/contentdetail/contentdetail?article_id="+id
			})
		},
		
		/*下拉刷新的回调, 有三种处理方式:*/
		downCallback(){
			
			// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
			this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
			// this.mescroll.endSuccess()
			
			// 此处仍可以继续写其他接口请求...
			// 调用其他方法...
		},
		/*上拉加载的回调*/
		upCallback(page) {
			// mescroll.setPageSize(6)
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			uni.request({
				url: 'http://121.40.30.19/user/favorite/list?page='+pageNum+'&count='+pageSize,
				header:{
					'Authorization':uni.getStorageSync('Authorization')
				},
				success: (data) => {
					console.log('data',data)
					// 接口返回的当前页数据列表 (数组)
					let curPageData = data.data.data.list; 
					console.log('curPageData',curPageData)
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length; 
					console.log('curPageLen',curPageLen)
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					// let totalPage = data.data.data.list; 
					// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
					let totalSize = data.data.data.total; 
					console.log('totalSize',totalSize)
					// 接口返回的是否有下一页 (true/false)
					// let hasNext = data.data.data.list; 
					
					//设置列表数据
					if(page.num == 1) this.tipList = []; //如果是第一页需手动置空列表
					this.tipList = this.tipList.concat(curPageData); //追加新数据
					console.log('tipList',this.tipList)
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
					setTimeout(()=>{
						this.mescroll.endSuccess(curPageLen)
					},20)
					
					
				},
				fail: () => {
					//  请求失败,隐藏加载状态
					this.mescroll.endErr()
				}
			})
			
			// 此处仍可以继续写其他接口请求...
			// 调用其他方法...
		},
		...mapMutations(['login']),
		
	},
	
};
</script>

<style lang="scss" scoped>
.contentTop{
}

.backImg {
	position: absolute;
	height: 440rpx;
	width: 100%;
	z-index: -11;
}

// /* 用户信息 */
.usermes {
	padding-top: 174rpx;
	height: 130rpx;
	display: flex;
	align-items: center;
}
.userAva {
	margin-left: 15px;
	width: 130rpx;
	height: 130rpx;
	// border: 1px #333333 solid;
	border-radius: 50%;
	margin-top: 86rpx;
}
.userR {
	margin-left: 32rpx;
	margin-top: 104rpx;
}
.userName {
	font-size: 36rpx;
	font-weight: 500;
	color: #303133;
}
.logout {
	margin-top: 4px;
	width: 80px;
	height: 20px;
	font-size: 12px;
	background-color: #f7f7f7;
	border: 1px #b9b9bf solid;
	border-radius: 30px;
	line-height: 20px;
	text-align: center;
}
/* 我的收藏卡片 */

.myCollection {
	border-radius: 40rpx 40rpx 0rpx 0rpx;
	background-color: #fff;
	color: #303133;
	height: 1106rpx;
	font-size: 40rpx;
	font-weight: 500;
	padding-left: 32rpx;
	padding-top: 52rpx;
	position: relative;
	top: 190rpx;
	z-index: 21;
	.phone {
		height: 120rpx;
		width: 120rpx;
		border-radius: 50%;
		position: absolute;
		top: -60rpx;
		right:32rpx;
	}
	.phone .phoneImg {
		width: 120rpx;
		height: 120rpx;
	}
}
.list{
	height: 100%;
}
.noContentItem{
	// height: 600rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	image{
		width: 154rpx;
		height: 122rpx;
		position: fi;
	}
	.tipText{
		font-size:28rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(144,147,153,1);
		line-height:30rpx;
		margin-top: 40rpx;
	}
}
.noContent {
	font-size: 22rpx;
	color: rgba(201, 202, 209, 1);
	// color: red;
	text-align: center;
	margin-top: 80rpx;
}

.contentItem {
	width:694rpx;
	height:230rpx;
	margin: 28rpx;
	margin-left: 0;
	border-radius: 8px;
	box-shadow: 4rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.08);
	display: flex;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	.left {
		position: relative;
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
			background-color: rgba(0,0,0,0.6);
			border-radius: 16rpx 0 16rpx 0;
		}
		image {
			// margin: 8rpx;
			width: 208rpx;
			height: 246rpx;
			margin-right: 20rpx;
			box-shadow:2px 2px 10px 0px rgba(0,0,0,0.08);
			border-radius:16rpx 0 0 16rpx;
		}
	}

	.right {
		margin-top: 40rpx;
		height: 230rpx;
		// overflow: hidden;
		// text-overflow:ellipsis;
		// white-space: nowrap;
	}
	.right .title {
		width: 444rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(48,49,51,1);
		font-family:PingFangSC-Medium,PingFang SC;
		line-height:32rpx;
		display: flex;
		
	}
	.tips{
		margin-right: 10rpx;
	}
	.titleText{
		margin-left: 10rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.right .content {
		
		
		
	}
	.richText{
		width:448rpx;
		height:70rpx;
		font-size: 28rpx;
		font-weight: 400;
		color:rgba(96,98,102,1);
		line-height:38rpx;
		margin-top: 20rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		
	}
	.right .position {
		display: flex;
		margin-top: 20rpx;
		// line-height: 40rpx;
		align-items: center;
		image {
			height: 20rpx;
			width: 20rpx;
			margin-right: 4rpx;
		}
		view {
			width: 176rpx;
			font-size: 22rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(0,145,255,1);
			line-height:22rpx;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
