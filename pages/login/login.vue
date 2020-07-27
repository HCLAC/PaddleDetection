<template>
	<view class="register">

		<view class="content">
			<!-- 头部标题 -->
			<view class="header">
				<view class="headerTitle">
					欢迎来到领途羊
				</view>
				<view class="titleTip">
					未注册过的手机号将自动创建账号
				</view>
			</view>
			<!-- 短信验证登录 -->
			<view class="loginBox">
				<view class="login-phone">
					<input type="number" maxlength="11" placeholder="请输入您的手机号" placeholder-style="color:'#C9CAD1',font-size:30rpx" class="is-input1" :style="styleObj" @input="onInput" v-model="phone" />
					<image src="../../static/images/ic_search_sel@2x.png" mode="" @click="clearphone()"  class="searchSel" v-show="phone" ></image>
				</view>
				<view class="login-code">
					<input type="number" maxlength="6" placeholder="请输入您的验证码"  class="is-input1 " :style="styleCode" @input="onCode" v-model="code" />
					<image src="../../static/images/ic_search_sel@2x.png" mode="" class="searchSel" v-show="code" @click="clearcode()"></image>
					<view class="code-sx"></view>
					<view class="codeimg" @click.stop="getCode()">{{getCodeText}}</view>
				</view>
			</view> 


			<!-- 登录按钮 -->
			<view class="loginButton" >
				<button class="lb"   
				 @click="submit" @tap="doLogin">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		
		data() {
			return {
				phone: "",
				code: '',
				key: '',
				getCodeText: '获取验证码',
				getCodeBtnColor: "#ffffff",
				getCodeisWaiting: false,
				styleObj: {
	                color: '#C9CAD1'
	            },
				styleCode: {
	                color: '#C9CAD1'
	            },
				
			}
		},
		
		components: {
			
		},
		
		methods: {
			onInput (e){
				if(e.detail.value.length  ==11){
					this.styleObj.color = '#303133'
				}else{
					this.styleObj.color = '#C9CAD1'
				}
			},
			onCode(e){
				if(e.detail.value.length  ==6){
					this.styleCode.color = '#303133'
				}else{
					this.styleCode.color = '#C9CAD1'
				}
			},
			clearphone(){
				if(this.phone){
					this.phone = '';
				}
			},
			clearcode(){
				if(this.code){
					this.code = '';
				}
			},
			submit(){
				uni.reLaunch({
					url:'../mine/mine'
				})
				// uni.setStorage({
				// 	// phone:data.phone
				// }),
			},
			getCode() {
				let _this = this;
				uni.hideKeyboard()
				if (_this.getCodeisWaiting) {
					return;
				}
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(_this.phone))) {
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
					return false;
				}
				_this.getCodeText = "发送中..."
				_this.getCodeisWaiting = true;
				_this.getCodeBtnColor = "rgba(255,255,255,0.5)"
			
				uni.request({
					url: 'http://121.40.30.19/user/sendcaptcha',
					data: {
						'mobile': _this.phone
					},
					method: 'POST',
					// header: {
					// 	'Content-Type': 'application/x-www-form-urlencoded',
					// 	//自定义请求头信息
					// },
					success: (res) => {
						// _this.key = res.data.data.key;
						//TODO 开发模式
						_this.code = res.data.data.code;
					}
				});
				//示例用定时器模拟请求效果
				setTimeout(() => {
					//uni.showToast({title: '验证码已发送',icon:"none"});
					_this.setTimer();
				}, 1000)
			},
			setTimer() {
				let holdTime = 59,
					_this = this;
				_this.getCodeText = "60s重新获取"
				_this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						_this.getCodeisWaiting = false;
						_this.getCodeBtnColor = "#ffffff";
						_this.getCodeText = "获取验证码"
						clearInterval(_this.Timer);
						return;
					}
					_this.getCodeText = holdTime + "s重新获取"
					holdTime--;
				}, 1000)
			},
			doLogin() {
				let _this = this;
				uni.hideKeyboard()
				//模板示例部分验证规则
				// if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))){ 
				// 	uni.showToast({title: '请填写正确手机号码',icon:"none"});
				// 	return false; 
				// } 
			
				uni.request({
					url: 'http://121.40.30.19/user/login',
					data: {
						'key': _this.key,
						'code': _this.code,
						'mobile': _this.phone
					},
					method: 'POST',
					// header: {
					// 	'Content-Type': 'application/x-www-form-urlencoded',
					// },
					success: (res) => {
						if (res.data.code == 200) {
							_this.login(true, res.data.data, function() {
								// _this.getRongyToken();
								uni.showToast({
									title: '登录成功',
									icon: "none"
								})
							});
						} else {
							uni.showToast({
								title: '验证码不正确',
								icon: "none"
							});
							return false;
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.null-input .el-input__inner {
	color: #525661; 
	}
	 
	.no-null-input .el-input__inner { 
	color: #524F52; 
	}
	/* @import url("../../components/watch-login/css/icon.css"); */
	/* @import url("./css/main.css"); */
	.header{
		margin-top: 246rpx;
		margin-left: 32rpx;
	}
	.headerTitle{
		width:336rpx;
		height:48rpx;
		font-size:48rpx;
		font-family:PingFangSC-Semibold,PingFang SC;
		font-weight:600;
		color:rgba(48,49,51,1);
		line-height:48rpx;
	}
	.titleTip{
		width:225px;
		height:15px;
		font-size:15px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(144,147,153,1);
		line-height:15px;
		margin-top: 20rpx;
	}
	.loginBox{
		margin: 210rpx 32rpx 0rpx;
		
	}
	.login-phone{
		// width:240rpx;
		height:30rpx;
		font-size:30rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:#C9CAD1;
		line-height:30rpx;
		display: flex;
		justify-content: space-between;
	}
	.styleOjb{
		color: #303133;
	}
	.login-code{
		height:30rpx;
		font-size:30rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:#C9CAD1;
		line-height:30rpx;
		display: flex;
		margin-top: 114rpx;
		align-items: center;
	}
	.is-input1{
		color:#C9CAD1;
		
	}
	// .is-input1::-ms-searchSel{display: none;}
	.searchSel{
		width: 44rpx;
		height: 44rpx;
		// display: none;
	}
	// .is-input1:valid + .searchSel {display: block;}
	.codeimg{
		width:204rpx;
		height:30rpx;
		font-size:30rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(0,145,255,1);
		line-height:30rpx;
		margin-left: 20rpx;
	}
	.loginButton .lb{
		width:692rpx;
		height:100rpx;
		background:rgba(255,229,18,1);
		border-radius:58rpx;
		margin-top: 154rpx;
		font-size: 36rpx;
		color: #303133;
	}
	button::after{ border: none;}
</style>
