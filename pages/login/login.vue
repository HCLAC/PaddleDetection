<template>
	<view class="register">

		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 短信验证登录 -->
			<template >
				<view class="px-2">
					<!-- 手机号 -->
					<view class="inp flex align-center border-bottom" style="margin-top:100rpx">
						<image src="../../static/images/iPhone.png"></image>
						<input class="font-md p-3" type="text" value="" placeholder="请输入手机号码" v-model="phone" />
						<!-- <view class="flex align-center justify-center font-weight-bold bg-main">
							+86
						</view> -->
					</view>        

					<!-- 验证码 -->
					<!-- align-stretch直接保证了各个元素高度的统一，就不只是剧中对齐了 -->
					<view class=" inp flex align-center border-bottom ">
						<image src="../../static/images/pw.png"></image>
						<input class="flex-1 font-md p-3" type="text" value="" placeholder="请输入验证码" v-model="code" />
						<view class="text-white rounded flex font-md p-1 align-center justify-center bg-main " style="width: 180rpx;"
						 @click="getCode" :class="codeTime>0 ?'bg-main-disabled':'bg-main'">
							{{codeTime>0 ? codeTime: '获取验证码'}}
						</view>
					</view>
				</view>
			</template>


			<!-- 登录按钮 -->
			<view class="px-3 " style="padding-top:60rpx">
				<button class=" " style="border-radius: 50rpx;border: none;"  :disabled="disabled" :class="disabled?'bg-main-disabled':'bg-main'"
				 @click="submit" :loading="loading">{{loading?loading:'登录'}}</button>
				<!-- 这个loading bool一旦为true 会显示旋转加载状态并且不可点击 -->
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				status:true,// 账号密码验证
				username:"",
				password:"",
				phone:"",
				code:"",
				codeTime:0,
				loading:false
			}
		},
		components: {
			
		},
		mounted() {
			
		},
		computed:{
			disabled(){
				if(this.phone===''||this.code===''){
					return true
				}
				return false
			}
		},
		methods: {
			// 初始化表单
			initForm(){
				// this.username = ''
				// this.password = ''
				this.phone = ''
				this.code = ''
				
			},
			// 获取验证码
			getCode(){
				// 防止重复获取
				if (this.codeTime>0){
					return;
				}
				// 验证手机号
				if (!this.validate()) return;
				// 请求数据
				this.$H.post('/user/sendcode',{
					phone:this.phone
				},{
					// 这样原生数据就会传输过来
					native:true
				}).then(res=>{
					// console.log(res)
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
				}).catch(err=>{
					// console.log(err)
				})
				
				// 倒计时
				this.codeTime = 5
				// 箭头函数可以直接拿到外面的this的内容
				let timer = setInterval(()=>{
					if (this.codeTime >= 1){
						this.codeTime--
					} else{
						clearInterval(timer)
					}
				},1000)
				
			},
			// 表单验证
			validate(){
				//手机号正则 只是针对验证码的手机号字段，其他并未做兼容。
				var mPattern = /^1[34578]\d{9}$/; 
				if (!mPattern.test(this.phone)) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					});
					return false
				}
				// ...更多验证
				return true
			},
			// 提交
			submit(){
				this.loading = '登录中...'
				let url = ""
				let data = ""
				// 表单验证
				if(!this.status){
					if (!this.validate()) return;
				}
				if (this.status){
					// 账号密码登录
					url = '/user/login'
					data = {
						username:this.username,
						password:this.password
					}
				}else{
					
					// 手机验证码登录
					url = '/user/phonelogin'
					data = {
						phone:this.phone,
						code:this.code
					}
				}
				
				// 提交后端
				this.$H.post(url,data).then(res=>{
					// console.log(res)
					// 修改vuex的state，持久化存储
					this.$store.commit('login',res)
					// 提示和跳转
					uni.navigateBack({
						delta:1
					})
					uni.showToast({
						title:'登录成功',
						icon:'none'
					})
					this.loading = ''
				}).catch(
					this.loading = ''
				)
				// 登录成功处理
			}
		}
	}
</script>

<style>
	/* @import url("../../components/watch-login/css/icon.css"); */
	@import url("./css/main.css");
</style>
