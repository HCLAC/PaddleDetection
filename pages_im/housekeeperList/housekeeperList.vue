<template>
	<view class="box">
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" title="旅游管家">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
		</view>
		<view class="top">
			<u-dropdown height="88" :border-bottom="false" border-color="#FFE512" active-color="rgb(96, 98, 102)">
				<u-dropdown-item v-model="profession" title="职业" :options="options1"  @change="change1"></u-dropdown-item>
				<u-dropdown-item v-model="level" title="级别" :options="options2" @change="change2"></u-dropdown-item>
				<u-dropdown-item v-model="working_years" title="经验" :options="options3" @change="change3"></u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="content">
			<view class="c-box" v-for="(item,index) in contentList" :key = 'index'>
				<view class="pm" v-if="item.level == 0">
					<image src="/static/images/jp.png" mode=""></image>
				</view>
				<view class="pm" v-else-if="item.level == 1">
					<image src="/static/images/yp.png" mode=""></image>
				</view>
				<view class="pm" v-else>
					<image src="/static/images/tp.png" mode=""></image>
				</view>
				<view class="left-box" @click="details(item)">
					<view class="left">
						<image src="/static/images/logo.png" mode=""></image>
					</view>
					<view class="center">
						<view class="title">
							{{ item.name }}
						</view>
						<view class="company">
							执业{{ item.working_years }}年/{{ item.company }}
						</view>
						<view class="people">
							已服务{{ item.number_of_people }}人
						</view>
						<text class="professionObj">
							{{ professionObj[item.profession] }}
						</text>
					</view>
					
				</view>
				<!-- <view class="right">
					在线咨询
				</view> -->
				<button type="default" class="right" @click="toChatroom(item)" v-if="auth != ''">在线咨询</button>
				<button v-else type="default" class="right" open-type="getPhoneNumber" @getphonenumber="getPhone">在线咨询</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				profession:'',
				levelArr: [
				{
				  id: '0',
				  name: '金牌旅游管家'
				},
				{
				  id: '1',
				  name: '银牌旅游管家'
				},
				{
				  id: '2',
				  name: '铜牌旅游管家'
				}
			  ],
				contentList:[],
				profession: '',
				level:'',
				working_years: '',
				options1: [{
						label: '不限',
						value: '',
					},
					{
						label: '导游',
						value: '0',
					},
					{
						label: '旅游达人',
						value: '1',
					},
					{
						label: '旅游定制师',
						value: '2',
					}
				],
				options2: [{
						label: '不限',
						value: '',
					},
					{
						label: '金牌旅游管家',
						value: '0',
					},
					{
						label: '银牌旅游管家',
						value: '1',
					},
					{
						label: '铜牌旅游管家',
						value: '2',
					}
				],
				options3: [{
						label: '不限',
						value: '',
					},
					{
						label: '1～3年',
						value: '0',
					},
					{
						label: '3～5年',
						value: '1',
					},
					{
						label: '5～7年',
						value: '2',
					},
					{
						label: '7年以上',
						value: '3',
					}
				],
				professionObj:{
					'0':'导游',
					'1':'旅游达人',
					'2':'旅游定制师'
				},
				serviceSource: 2,
				auth:'',
			};
		},
		onLoad() {
			// 获取管家列表
			this.getComments()
		},
		onShow() {
			// 获取管家列表
			this.getComments()
			this.auth = getApp().globalData.Authorization
		},
		methods:{
			//一键登录
			getPhone(res) {
				if (res.detail.errMsg != 'getPhoneNumber:ok') {
					uni.showToast({
						title: '用户拒绝授权',
						icon: 'none'
					});
					return;
				}
				swan.getLoginCode({
					success: result => {
						if (!result || !result.code || result.code.length == 0) {
							uni.showToast({
								title: '一键登录失败',
								icon: 'none'
							});
							return
						}
						this.baiduLogin({
							code: result.code,
							source: this.serviceSource,
							data: res.detail.encryptedData,
							iv: res.detail.iv
						});
						console.log(123)
					},
					fail: err => {
						console.error('getLoginCode', err)
					}
				});
				// 百度小程序直接调用swan.getLoginCode，其他平台调用uni.login
				// if (this.serviceProvider == 'baidu'){
				// 	//#ifdef MP-BAIDU
				// 	swan.getLoginCode({
				// 		success: result => {
				// 			if (!result || !result.code || result.code.length == 0) {
				// 				uni.showToast({
				// 					title: '一键登录失败',
				// 					icon: 'none'
				// 				});
				// 				return
				// 			}
				// 			this.baiduLogin({
				// 				code: result.code,
				// 				source: this.serviceSource,
				// 				data: res.detail.encryptedData,
				// 				iv: res.detail.iv
				// 			});
				// 			// console.log(123)
				// 		},
				// 		fail: err => {
				// 			console.error('getLoginCode', err)
				// 		}
				// 	});
				// 	//#endif
				// 	return 
				// }
				// uni.login({
				// 	provider: this.serviceProvider,
				// 	success: result => {
				// 		if (!result || !result.code || result.code.length == 0) {
				// 			uni.showToast({
				// 				title: '一键登录失败',
				// 				icon: 'none'
				// 			});
				// 			return;
				// 		}
				// 		this.baiduLogin({
				// 			code: result.code,
				// 			source: this.serviceSource,
				// 			data: res.detail.encryptedData,
				// 			iv: res.detail.iv
				// 		});
				// 	},
				// 	fail: err => {
				// 		console.error('login', err)
				// 	}
				// });
			},
			baiduLogin(obj) {
				this.HTTP.request({
					url: '/user/oauth/code2session',
					data: {
						code: obj.code,
						source: 2
					},
					method: 'POST',
					success: res => {
						if (res.data.code == 0) {
							this.getSessionKey({
								uuid: res.data.data,
								data: obj.data,
								iv: obj.iv
							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}
				});
			},
			getSessionKey(obj) {
				this.HTTP.request({
					url: '/user/oauth/login',
					data: {
						data: obj.data,
						iv: obj.iv,
						uuid: obj.uuid,
						source: this.serviceSource
					},
					method: 'POST',
					success: res => {
						if (res.data.code == 0) {
							var auth = res.header.authorization ? res.header.authorization : res.header.Authorization
							this.loginSuccess(res.data.data, auth) 
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}
				});
			},
			loginSuccess(userinfo, auth,item){
				console.log(item,'item')
				uni.showToast({
					title: '登录成功',
					icon: 'none'
				}),
				getApp().globalData.Authorization = auth
				
				uni.setStorage({
					key: 'userinfo',
					data: userinfo,
					success: function () {
					}
				});
				uni.setStorage({
					key: 'Authorization',
					data: auth,
					success: function () {
					}
				});
				uni.$emit('onLoginSuccess', userinfo.first_login);
				// this.Utils.back()
				this.toChatroom()
			},
			toChatroom(item){
				uni.navigateTo({
					url:'/pages_im/chatroom/chatroom?bulter_id=' + item.bulter_id,
				})
			},
			
			back(){
				this.Utils.back()
				
			},
			home(){
				this.Utils.home()
			},
			details(item){
				// console.log(item,'e')
				uni.navigateTo({
					url:'/pages_im/housekeeperDetails/housekeeperDetails?bulter_id=' + item.bulter_id
				})
			},
			change1(value){
				this.profession = value
				this.level = ''
				this.working_years = ''
				this.getComments()
				console.log(111)
			},
			change2(value){
				this.profession = ''
				this.working_years = ''
				this.level = value
				this.getComments()
			},
			change3(value){
				this.profession = ''
				this.level = ''
				this.working_years = value
				this.getComments()
			},
			// 获取管家列表
			getComments() {
				this.HTTP.request({
					url: '/bulter/list',
					data: {
						count:20,
						page:1,
						filter:{
							level:this.level,
							profession:this.profession,
							working_years:this.working_years
						}
					},
					success: res => {
						this.contentList = res.data.data.list
						console.log(this.contentList,'管家详情')
					}
				});
			},
		}
	}
</script>

<style lang="scss">
.box{
	.sw-6__u-cell-item-box{
		display: flex;
		flex-wrap: wrap;
		padding-bottom:240px;
		padding-top: 10px;
		border-top: none;
		border-radius:  0 0 24rpx 24rpx;
		overflow: hidden;
	}
	.u-cell-box{
		border: none;
	}
	.sw-7__u-cell{
		padding: 20rpx 18rpx !important;
	}
	.slot-content{
		height: 400px;
		background: pink;
	}
	.top{
		width: 100%;
		// height: 88rpx;
	}
	.content{
		background: #F6F6F8;
		width: 100%;
		min-height: 100%;
		position:fixed;
		padding-top: 20rpx;
		.c-box{
			width: 694rpx;
			height: 250rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			display: flex;
			justify-content: space-between;
			padding: 0 40rpx;
			margin: 0 auto;
			margin-bottom: 20rpx;
			position: relative;
			.pm{
				width: 60rpx;
				height: 58rpx;
				position: absolute;
				left: 0;
				top: -8rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.left-box{
				display: flex;
				.left{
					border-radius: 50%;
					overflow: hidden;
					width: 100rpx;
					height: 100rpx;
					margin-top: 30rpx;
					// margin: 30rpx 16rpx 0 40rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.center{
					margin-left: 16rpx;
					.title{
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #303133;
						margin-top: 34rpx;
					}
					.company{
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #606266;
						margin-top: 10rpx;
					}
					.people{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						margin-top: 10rpx;
						margin-bottom: 12rpx;
					}
					.professionObj{
						// width: 158rpx;
						height: 38rpx;
						background: #FFF1B8;
						border-radius: 21rpx;
						opacity: 0.7;
						border: 2rpx solid #FFE512;
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #303133;
						padding: 0 14rpx;
						// display: flex;
						// justify-content: center;
						// align-items: center;
						// margin-top: 12rpx;
						// margin-top: 100rpx;
					}
				}
			}
			.right{
				width: 198rpx;
				height: 60rpx;
				background: #FFE512;
				border-radius: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #303133;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: auto 0;
			}
			.right::after{
				border: none;
			}
		}
	}
}
</style>
