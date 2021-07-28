<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
					<!-- #ifndef MP-BAIDU -->
					<image  class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<!-- #ifndef MP-BAIDU -->
					<image v-if="ismine == '1'" class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
		</view>
		<view class="register">
			<view class="content">
				<!-- 头部标题 -->
				<view class="header">
					<view class="headerTitle">欢迎来到领途羊</view>
					<view class="titleTip">未注册过的手机号将自动创建账号</view>
				</view>
				<!-- 短信验证登录 -->
				<view class="loginBox">
					<view class="login-phone">
						<input
							type="number"
							maxlength="11"
							placeholder="请输入您的手机号"
							placeholder-style="color:'#C9CAD1',font-size:30rpx"
							class="is-input1"
							:style="{ color: styleObj.color }"
							@input="onInput"
							v-model="phone"
							@focus="isfocus"
							@blur="isblur"
						/>
						<image src="../../static/images/ic_search_sel@2x.png" mode="" @click="clearphone()" class="searchSel" v-if="phone && isShowphone"></image>
					</view>
					<u-line color="rgba(237, 239, 242, 1)" margin="40rpx 0rpx"></u-line>
					<view class="login-code">
						<input
							type="number"
							maxlength="6"
							placeholder="请输入您的验证码"
							placeholder-style="color:'#C9CAD1',font-size:30rpx"
							class="is-input1 "
							:style="{ color: styleCode.color }"
							@input="onCode"
							v-model="code"
							@focus="isfocus1"
							@blur="isblur1"
						/>
						<image src="../../static/images/ic_search_sel@2x.png" mode="" class="searchSel" v-if="code && isShowcode" @click="clearcode()"></image>
						<view class="code-sx"></view>
						<view class="codeimg" @click.stop="getCode()" :style="{ color: codeColor }">{{ getCodeText }}</view>
					</view>
					<u-line color="rgba(237, 239, 242, 1)" margin="40rpx 0rpx"></u-line>
				</view>
				<!-- 登录按钮 -->
				<view class="loginButton"><button class="lb" :disabled="disabled" :style="{ background: styleBtn.background }" @tap="doLogin">登录</button></view>
				<view class="loginButton">
					<button class="badiduBtn" :style="{ background: styleBtn.background }" open-type="getPhoneNumber" @getphonenumber="getPhone">手机号一键登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import httpType from '../../httpType.js';
export default {
	data() {
		return {
			phone: '',
			code: '',
			key: '',
			getCodeText: '获取验证码',
			getCodeBtnColor: '#ffffff',
			getCodeisWaiting: false,
			codeObj: '',
			codeColor: {
				color: '#0091FF'
			},
			styleObj: {
				color: '#C9CAD1'
			},
			styleCode: {
				color: '#C9CAD1'
			},
			disabled: true,
			styleBtn: {
				background: 'rgba(237,239,242,1)'
			},
			isShowphone: false,
			isShowcode: false,
			serviceProvider: null,
			ismine: ''
		};
	},
	onLoad(options) {
		this.ismine = options.ismine;
	},
	components: {},
	mounted() {
		uni.getProvider({
			service: 'oauth',
			success: res => {
				if (res.errMsg == 'getProvider:ok') {
					this.serviceProvider = res.provider[0];
				} else {
					uni.showToast({
						title: '获取提供商失败',
						icon: 'none'
					});
				}
			}
		});
	},
	methods: {
		onInput(e) {
			console.log(e);
			if (e.detail.value.length == 11) {
				this.styleObj.color = '#303133';
			} else {
				this.styleObj.color = '#C9CAD1';
			}
		},
		onCode(e) {
			if (e.detail.value.length == 6) {
				this.styleCode.color = '#303133';
				this.disabled = false;
				this.styleBtn.background = '#FFE512';
			} else {
				this.styleCode.color = '#C9CAD1';
				this.disabled = true;
				this.styleBtn.background = 'rgba(237,239,242,1)';
			}
		},
		clearphone() {
			if (this.phone) {
				this.phone = '';
				this.styleObj.color = '#C9CAD1';
			}
		},
		clearcode() {
			if (this.code) {
				this.code = '';
				this.styleCode.color = '#C9CAD1';
				this.disabled = true;
				this.styleBtn.background = 'rgba(237,239,242,1)';
			}
		},
		isfocus() {
			this.isShowphone = true;
		},
		isblur() {
			this.isShowphone = false;
		},
		isfocus1() {
			this.isShowcode = true;
		},
		isblur1() {
			this.isShowcode = false;
		},
		getCode() {
			let _this = this;
			// uni.hideKeyboard();
			if (_this.getCodeisWaiting) {
				return;
			}
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(_this.phone)) {
				uni.showToast({
					title: '请填写正确手机号码',
					icon: 'none'
				});
				return false;
			}
			_this.getCodeText = '发送中...';
			_this.getCodeisWaiting = true;
			_this.getCodeBtnColor = 'rgba(255,255,255,0.5)';

			// this.$ajax.post({
			// 	url:'/user/sendcaptcha',
			// 	param:{
			// 		'mobile': _this.phone
			// 	}
			// }).then((res)=>{
			// 	console.log(res.data)
			// 	_this.code = res.data.data.code;
			// })

			// 获取验证码
			httpType.request({
				url: '/user/sendcaptcha',
				data: {
					mobile: this.phone
				},
				method: 'POST',
				success: res => {
					_this.code = res.data.data.code;
				}
			}),
				//示例用定时器模拟请求效果
				setTimeout(() => {
					//uni.showToast({title: '验证码已发送',icon:"none"});
					_this.setTimer();
				}, 1000);
		},
		setTimer() {
			let holdTime = 59,
				_this = this;
			_this.codeColor.color = 'rgba(0,145,255,0.52)';
			_this.getCodeText = '60s重新获取';
			_this.Timer = setInterval(() => {
				if (holdTime <= 0) {
					_this.getCodeisWaiting = false;
					_this.getCodeBtnColor = '#ffffff';
					_this.getCodeText = '获取验证码';
					clearInterval(_this.Timer);
					return;
				}
				_this.getCodeText = holdTime + 's重新获取';
				holdTime--;
			}, 1000);
		},
		getUserInfo() {
			uni.getUserInfo({
				provider: 'baidu',
				success: res => {
					console.log('用户信息', res);
				}
			});
		},
		//一键登录
		getPhone(res) {
			console.log('getPhone', res)
			if (res.detail.errMsg != 'getPhoneNumber:ok') {
				uni.showToast({
					title: '用户拒绝授权',
					icon: 'none'
				});
				return;
			}
			
			if (this.serviceProvider == 'baidu'){
				swan.getLoginCode({
					success: result => {
						console.log('result',result)
						if (result.code && result.code.length != 0) {
							this.baiduLogin({
								code: result.code,
								source: this.serviceProvider == 'baidu' ? 2 : this.serviceProvider == 'weixin' ? 8 : this.serviceProvider == 'toutiao' ? 4 : null,
								data: res.detail.encryptedData,
								iv: res.detail.iv
							});
						} else {
							uni.showToast({
								title: '获取code失败',
								icon: 'none'
							});
							return;
						}
					},
					fail: err => {
						console.error('getLoginCode', err)
						// uni.showToast({
						// 	title: err.errMsg,
						// 	icon: 'none'
						// });
					}
				});
			} else {
				uni.login({
					provider: this.serviceProvider,
					success: result => {
						console.log('result',result)
						if (result.code) {
							this.baiduLogin({
								code: result.code,
								source: this.serviceProvider == 'baidu' ? 2 : this.serviceProvider == 'weixin' ? 8 : this.serviceProvider == 'toutiao' ? 4 : null,
								data: res.detail.encryptedData,
								iv: res.detail.iv
							});
						} else {
							uni.showToast({
								title: '获取code失败',
								icon: 'none'
							});
							return;
						}
					},
					fail: error => {
						uni.showToast({
							title: error.errMsg,
							icon: 'none'
						});
					}
				});
			}
		},

		baiduLogin(obj) {
			// uni.hideKeyboard();
			console.log(obj.code,'code')
			uni.request({
				url: this.globalUrl + '/user/oauth/code2session',
				// url: 'http://192.168.110.189:4000',
				data: {
					code: obj.code,
					source: this.serviceProvider == 'baidu' ? 2 : this.serviceProvider == 'weixin' ? 8 : this.serviceProvider == 'toutiao' ? 4 : null
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
				},
				fail: error => {
					uni.showToast({
						title: error,
						icon: 'none'
					});
				}
			});
		},
		getSessionKey(obj) {
			uni.request({
				url: this.globalUrl + '/user/oauth/login',
				data: {
					data: obj.data,
					iv: obj.iv,
					uuid: obj.uuid,
					source: this.serviceProvider == 'baidu' ? 2 : this.serviceProvider == 'weixin' ? 8 : this.serviceProvider == 'toutiao' ? 4 : null
				},
				method: 'POST',
				success: res => {
					if (res.data.code == 0) {
						console.log(res);
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						}),
						uni.setStorageSync('Authorization', res.header.authorization ? res.header.authorization : res.header.Authorization);

						uni.setStorageSync('nickName', res.data.data.mobile);
						uni.reLaunch({
							url: '/pagesA/mine/mine'
						});
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
				},
				fail: error => {
					uni.showToast({
						title: error,
						icon: 'none'
					});
				}
			});
		},
		doLogin() {
			let _this = this;
			// uni.hideKeyboard();
			//模板示例部分验证规则
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
				uni.showToast({ title: '请填写正确手机号码', icon: 'none' });
				return false;
			}
			// var nick_name = uni.getStorageSync('nickName')

			uni.request({
				// url: 'user/login',
				url: this.globalUrl + '/user/login',
				data: {
					// 'key': _this.key,
					code: _this.code,
					mobile: _this.phone,
					source: this.serviceProvider == 'baidu' ? 1 : this.serviceProvider == 'weixin' ? 7 : this.serviceProvider == 'toutiao' ? 3 : null
				},
				method: 'POST',
				// header: {
				// 	'Content-Type': 'application/x-www-form-urlencoded',
				// },
				success: res => {
					console.log(res,'手机号登录');
					if (res.data.code == 0) {
						// _this.login(true, res.data.data, function() {
						// _this.getRongyToken();
						// uni.setStorage('Authorization',res.header.Authorization),
						// // success:function(res){
						// 	console.log("+++++",res)
						// }
						// uni.setStorage({
						// 	key:'Authorization',
						// 	data:res.header.Authorization,
						// 	success:function(res) {
						// 		console.log("++++++",res)
						// 	}
						// }),
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						}),
						uni.setStorageSync('Authorization', res.header.authorization ? res.header.authorization : res.header.Authorization);
						uni.reLaunch({
							url: '/pagesA/mine/mine'
						});

						// uni.setStorage({
						// 	// phone:data.phone
						// }),
						// });
					} else {
						uni.showToast({
							title: '手机验证码错误',
							icon: 'none'
						});
						return false;
					}
				}
			});
		},
		// 返回上一页
		back() {
			if (this.ismine === '1'){
				uni.switchTab({
					url: '/pagesA/index/index'
				});
			} else {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		// 返回首页
		home() {
			// uni.navigateBack({
			// 	delta: 1
			// });
			uni.switchTab({
				url: '/pagesA/index/index'
			});
		}
	}
};
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


/* #ifndef  MP-BAIDU*/
.fanhui {
	width: 40rpx;
	height: 40rpx;
	margin-left: 42rpx;
}
/*  #endif  */
/* #ifdef  MP-BAIDU*/
.fanhui {
	width: 40rpx;
	height: 40rpx;
}
/*  #endif  */
/* #ifndef  MP-BAIDU*/
.fhsy {
	width: 40rpx;
	height: 40rpx;
	margin-left: 20rpx;
}
/*  #endif  */
/* #ifdef  MP-BAIDU*/
.fhsy {
	width: 40rpx;
	height: 40rpx;
	margin-left: 100rpx;
}
/*  #endif  */
.button-v-line {
	width: 1px;
	height: 18px;
	background-color: #2f2f2f;
	margin: 0 8px;
}
.null-input .el-input__inner {
	color: #525661;
}

.no-null-input .el-input__inner {
	color: #524f52;
}
/* @import url("../../components/watch-login/css/icon.css"); */
/* @import url("./css/main.css"); */
.header {
	margin-top: 84rpx;
	margin-left: 32rpx;
}
.headerTitle {
	width: 360rpx;
	height: 48rpx;
	font-size: 48rpx;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: rgba(48, 49, 51, 1);
	line-height: 48rpx;
}
.titleTip {
	width: 225px;
	height: 15px;
	font-size: 15px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(144, 147, 153, 1);
	line-height: 15px;
	margin-top: 20rpx;
}
.loginBox {
	margin: 210rpx 32rpx 0rpx;
}
.login-phone {
	width: 718rpx;
	height: 30rpx;
	font-size: 30rpx;
	// font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #c9cad1;
	line-height: 30rpx;
	display: flex;
	justify-content: space-between;
}
.styleOjb {
	color: #303133;
}
.login-code {
	width: 718rpx;
	height: 30rpx;
	font-size: 30rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #c9cad1;
	line-height: 30rpx;
	display: flex;
	margin-top: 76rpx;
	justify-content: space-between;
	align-items: center;
}
.is-input1 {
	color: #c9cad1;
}
// .is-input1::-ms-searchSel{display: none;}
.searchSel {
	width: 48rpx;
	height: 48rpx;
	margin-right: 32rpx;
	// display: none;
}
// .is-input1:valid + .searchSel {display: block;}
.codeimg {
	// width:204rpx;
	height: 30rpx;
	font-size: 30rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(0, 145, 255, 1);
	line-height: 30rpx;
	margin-right: 32rpx;
}
.loginButton .lb {
	width: 692rpx;
	height: 100rpx;
	background: #edeff2;
	border-radius: 58rpx;
	margin-top: 150rpx;
	font-size: 36rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 100rpx;
	opacity: 1 !important;
}

.loginButton .badiduBtn {
	width: 692rpx;
	height: 100rpx;
	background-color: #fff !important;
	border-radius: 58rpx;
	border: 2rpx solid #edeff2;
	margin-top: 30rpx;
	font-size: 36rpx;
	color: #303133;
	line-height: 100rpx;
}
button::after {
	border: none;
}
button[disabled] {
	background: rgba(237, 239, 242, 1) !important;
}
</style>
