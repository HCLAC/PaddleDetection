<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar" :border="true">
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">修改资料</view>
			</uni-nav-bar>
		</view>
		<!-- 信息表单 -->
		<view class="" style="margin:0 28rpx;" >
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType" >
				<!-- 头像 -->
				<u-form-item class="avatarBox"   prop="photo"  @tap="chooseAvatar">
					<image :src="avatar" slot="right" style="width: 130rpx; height: 130rpx;border-radius: 50%;margin-left: -10rpx;" ></image>
					</u-avatar>
					<view class="avatarText" slot="right">
						修改头像
					</view>
					<image class="moreRight" src="../../static/images/moreR.svg" slot="right" mode=""></image>
				</u-form-item>
				<!-- 昵称 -->
				<u-form-item :label-style="{fontWeight:'400',color: '#909399',fontSize:'28rpx',fontFamily: 'PingFangSC-Regular, PingFang SC'}"   :label-position="labelPosition" label="昵　称:" label-width="120" prop="name">
					<u-input :customStyle="customStyleinput" :border="border"  v-model="model.name" type="text"></u-input>
				</u-form-item>
				<!-- 性别 -->
				<u-form-item :label-style="{fontWeight:'400',color: '#909399',fontSize:'28rpx',fontFamily: 'PingFangSC-Regular, PingFang SC'}" :label-position="labelPosition" label="性　别:" label-width="120" prop="sex">
					<u-input :customStyle="customStyleinput" :border="border" :disabled="true"  :select-open="actionSheetShow" v-model="model.sex" :placeholder="sex" placeholder-style="color:#303133" @click="actionSheetShow = true"></u-input>
					<image class="moreRight" src="../../static/images/moreR.svg" slot="right" mode=""></image>
				</u-form-item>
				<!-- 常住地 -->
				<u-form-item :label-style="{fontWeight:'400',color: '#909399',fontSize:'28rpx',fontFamily: 'PingFangSC-Regular, PingFang SC'}" :label-position="labelPosition" label="常住地:" prop="region" label-width="120">
					<u-input :customStyle="customStyleinput" :border="border" :disabled="true"   :select-open="pickerShow" v-model="model.region" :placeholder="region" placeholder-style="color:#303133" @click="pickerShow = true"></u-input>
					<image class="moreRight" src="../../static/images/moreR.svg" slot="right" mode=""></image>
				</u-form-item>
			</u-form>
			<u-button @click="submit" :custom-style="customStyle"  >保存</u-button>
			<u-action-sheet :list="actionSheetList"   v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
			<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		</view>
	</view>
</template>

<script>
	import tuiImageCropper from '@/components/tui-image-cropper/tui-image-cropper.vue'
	export default {
		comments:{
			tuiImageCropper
		},
		data() {
			let that = this;
			return {
				model: {
					name: '',
					sex: '',
					photo: ''
				},
				rules: {
					name : [
						{
							required: false,
							message: '请输入姓名',
							trigger: 'blur' ,
						},
						{
							min: 3,
							max: 10,
							message: '姓名长度在3到10个字符',
							trigger: ['change','blur'],
						},
					],
					sex: [
						{
							required: false,
							message: '请选择性别',
							trigger: 'change'
						},
					],
					region: [
						{
							required: false,
							message: '请选择地区',
							trigger: 'change',
						}
					],
					
				},
				actionSheetList: [
					{
						text: '男',
						color: '#007AFF',
						fontSize: '40rpx',
						fontFamily: 'PingFangSC-Regular, PingFang SC',
						fontWeight: '400'
					},
					{
						text: '女',
						color: '#007AFF',
						fontSize: '40rpx',
						fontFamily: 'PingFangSC-Regular, PingFang SC',
						fontWeight: '400'
						
					},
					{
						text: '保密',
						color: '#007AFF',
						fontSize: '40rpx',
						fontFamily: 'PingFangSC-Regular, PingFang SC',
						fontWeight: '400'
					}
				],
				avatar:'',
				nickName:'',
				base:'',
				sex:'',
				region:'',
				actionSheetShow: false,
				pickerShow: false,
				selectShow: false,
				errorType: ['message'],
				customStyle:{
					background: '#FFE512',
					fontSize: '32rpx',
					fontFamily: 'PingFangSC-Medium, PingFang SC',
					fontWeight: '500',
					color: '#303133',
					borderRadius: '26px',
					margin:'82rpx 0 0 0'
					
				},
				customStyleinput:{
					margin:'16rpx 0'
				}
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		created() {
			
			// 监听从裁剪页发布的事件，获得裁剪结果
			// uni.$on('uAvatarCropper', path => {
				
			// 	let base ='data:image/png;base64,'+uni.getFileSystemManager().readFileSync(path,'base64')
			// 	this.avatar = base
			uni.$on('cropper', e => {
				console.log('eeee',e)
				let base ='data:image/png;base64,'+uni.getFileSystemManager().readFileSync(e.url,'base64')
				console.log('base',base)
				this.avatar = base	
				
			})
		},
		
		onLoad(e) {
			this.getUserInfo()
			
			
		},
		methods:{
			// 获取用户现存信息
			getUserInfo(){
				uni.request({
					url: this.globalUrl+ '/user/info',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					method: 'get',
					success: (res)=> {
						console.log('个人信息=', res.data);
						// 获取头像
						if(res.data.data.avatar){
							this.avatar = res.data.data.avatar
						}else{
							this.avatar = '../../static/images/userImg.svg'
						}
						// 获取昵称
						if(res.data.data.nick_name){
							this.model.name = res.data.data.nick_name
						}else{
							this.model.name = res.data.data.mobile
						}
						// 获取性别
						this.sex = res.data.data.gender == 0 ? '保密' : res.data.data.gender == 2 ? '女' : res.data.data.gender == 1 ? '男' : '保密'
						// 获取地区
						if(res.data.data.location){
							this.region = res.data.data.location
						}else{
							this.region = '北京'
						}
						
					}
				})
			},
			// 头像裁剪
			chooseAvatar() {
				// 新上传头像方法
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						const tempFilePaths = res.tempFilePaths[0];
						uni.navigateTo({
							url:'../cropper-default-old/cropper-default-old?src=' + tempFilePaths
						})
					}
				})
				// 旧上传头像方法
				// this.$u.route({
				// 	url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
				// 	// 内部已设置以下默认参数值，可不传这些参数
				// 	params: {
				// 		// 输出图片宽度，高等于宽，单位px
				// 		destWidth: 300,
				// 		// 裁剪框宽度，高等于宽，单位px
				// 		rectWidth: 200,
				// 		// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
				// 		fileType: 'jpg',
				// 	}
				// })
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.model.sex = this.actionSheetList[index].text;
			},
			// 保存
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						uni.request({
							url: this.globalUrl + '/user/info',
							data: {
								nick_name: this.model.name  ? this.model.name : this.nickName ,
								avatar:this.avatar,
								gender: this.model.sex == '男' ? 1 : this.model.sex == '女' ? 2 : this.model.sex == '保密' ? 0:this.sex,
								location: this.model.region ? this.model.region : this.region
								
							},
							method: 'POST',
							header: {
								Authorization: uni.getStorageSync('Authorization')
							},
							success: res => {
								console.log('修改信息',res)
								if(res.data.code == 10108){
									uni.showToast({
										title: res.data.msg,
										icon:'none',
										duration: 2000
									})
								}else{
									uni.showToast({
										title: res.data.msg,
										icon:'none',
										duration: 2000
									})
									uni.reLaunch({
										url:'../mine/mine'
									})
								}
								
							}
						});
						// uni.request({
						// 	url:this.globalUrl + '/user/avatar',
						// 	data:{
						// 		avator:this.base
						// 	},
						// 	method: 'POST',
						// 	header: {
						// 		Authorization: uni.getStorageSync('Authorization')
						// 	},
						// 	success: (res) => {
						// 		console.log('上传头像',res)
						// 	}
						// })
					} else {
						console.log('验证失败');
					}
				});
			},
			// 选择地区回调
			regionConfirm(e) {
				this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 返回首页
			home() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
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
.avatarBox{
	display: flex;
	flex-direction: row;
	align-items: center;
	image{
		margin: 24rpx 0;
	}
}
.avatarText{
	height: 28rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #909399;
	line-height: 28rpx;
	margin-left: 28rpx;
	margin-right:404rpx ;
}
.moreRight{
	width: 20rpx;
	height: 20rpx;
}

</style>
