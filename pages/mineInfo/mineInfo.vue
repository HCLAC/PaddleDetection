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
		<view class="" style="margin-left: 28rpx;" >
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType" >
				<!-- 头像 -->
				<u-form-item :label-position="labelPosition"  prop="photo" label-width="150" @tap="chooseAvatar">
					<u-avatar :src="avatar" ></u-avatar>
				</u-form-item>
				<!-- 昵称 -->
				<u-form-item   label-width="120" :label-position="labelPosition" label="昵称" prop="name">
					<u-input :border="border" :placeholder="nickName" v-model="model.name" type="text"></u-input>
				</u-form-item>
				<!-- 性别 -->
				<u-form-item :label-position="labelPosition" label="性别" prop="sex">
					<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.sex" placeholder="保密" @click="actionSheetShow = true"></u-input>
				</u-form-item>
				<!-- 常住地 -->
				<u-form-item :label-position="labelPosition" label="常住地" prop="region" label-width="150">
					<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.region" placeholder="青岛" @click="pickerShow = true"></u-input>
				</u-form-item>
			</u-form>
			<u-button @click="submit">保存</u-button>
			<u-action-sheet :list="actionSheetList"   v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
			<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
		</view>
	</view>
</template>

<script>
	export default {
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
							required: true,
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
							required: true,
							message: '请选择性别',
							trigger: 'change'
						},
					],
					region: [
						{
							required: true,
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
				actionSheetShow: false,
				pickerShow: false,
				selectShow: false,
				errorType: ['message'],
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				this.avatar = path;
				// 可以在此上传到服务端
				// uni.uploadFile({
				// 	url: this.globalUrl+ '/usr/avatar',
				// 	filePath: path,
				// 	name: 'file',
				// 	complete: (res) => {
				// 		console.log(res);
				// 	}
				// });
			})
		},
		onLoad() {
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
							this.nickName = res.data.data.nick_name
						}else{
							this.nickName = res.data.data.mobile
						}
						
					}
				})
			},
			// 头像裁剪
			chooseAvatar() {
				this.$u.route({
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
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
</style>
