<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" :status-bar="true" :border="true" title="修改资料">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 信息表单 -->
		<view class="" style="margin:0 28rpx;" >
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType" >
				<!-- 头像 -->
				<u-form-item class="avatarBox" prop="avatar"  @tap="chooseAvatar">
					<image :src="model.avatar" slot="right" style="width: 130rpx; height: 130rpx;border-radius: 50%;margin-left: -10rpx;" ></image>
					</u-avatar>
					<view class="avatarText" slot="right">
						修改头像
					</view>
					<image class="moreRight" src="/static/images/moreR.svg" slot="right" mode=""></image>
				</u-form-item>
				<!-- 昵称 -->
				<u-form-item :label-style="{fontWeight:'400',color: '#909399',fontSize:'28rpx',fontFamily: 'PingFangSC-Regular, PingFang SC'}"   :label-position="labelPosition" label="昵　称:" label-width="120" prop="name">
					<u-input :customStyle="customStyleinput" :border="border"  v-model="model.name" type="text"></u-input>
				</u-form-item>
				<!-- 性别 -->
				<u-form-item :label-style="{fontWeight:'400',color: '#909399',fontSize:'28rpx',fontFamily: 'PingFangSC-Regular, PingFang SC'}" :label-position="labelPosition" label="性　别:" label-width="120" prop="sex">
					<u-input :customStyle="customStyleinput" :border="border" :disabled="true"  :select-open="actionSheetShow" v-model="model.sex" @click="actionSheetShow = true"></u-input>
					<image class="moreRight" src="/static/images/moreR.svg" slot="right" mode=""></image>
				</u-form-item>
				<!-- 常住地 -->
				<u-form-item :label-style="{fontWeight:'400',color: '#909399',fontSize:'28rpx',fontFamily: 'PingFangSC-Regular, PingFang SC'}" :label-position="labelPosition" label="常住地:" prop="region" label-width="120">
					<u-input :customStyle="customStyleinput" :border="border" :disabled="true"   :select-open="pickerShow" v-model="model.region" @click="pickerShow = true"></u-input>
					<image class="moreRight" src="/static/images/moreR.svg" slot="right" mode=""></image>
				</u-form-item>
			</u-form>
			<view class="customStyle" @click="submit">
				保存
			</view>
			<u-action-sheet :list="actionSheetList"  v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
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
			return {
				model: {
					avatar: '',
					name: '',
					sex: '',
					region: ''
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
				actionSheetShow: false,
				pickerShow: false,
				selectShow: false,
				errorType: ['message'],
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
			uni.$on('cropper', e => {
				let base ='data:image/png;base64,'+uni.getFileSystemManager().readFileSync(e.url,'base64')
				this.model.avatar = base
			})
		},
		onLoad(options) {
			this.model = options
		},
		methods:{
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
							url:'/pages_mine/pages/cropper-default/cropper-default?src=' + tempFilePaths
						})
					}
				})
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				this.model.sex = this.actionSheetList[index].text;
			},
			// 保存
			submit() {
				this.$refs.uForm.validate(valid => {
					if (!valid) {
						console.log('验证失败');
					}
					this.HTTP.request({
						url: '/user/info',
						data: {
							nick_name: this.model.name,
							avatar: this.model.avatar,
							gender: this.model.sex == '男' ? 1 : this.model.sex == '女' ? 2 : 0,
							location: this.model.region ? this.model.region : '北京'
							
						},
						method: 'POST',
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},
						success: res => {
							if(res.data.code == 0){
								this.Utils.back()
							}
						}
					});
				});
			},
			// 选择地区回调
			regionConfirm(e) {
				this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
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
	margin-left: 42rpx;
	margin-right: 20rpx;
}

.fhsy {
	width: 40rpx;
	height: 40rpx;
}
/* #ifdef  MP-BAIDU*/
.fhsy {
	margin-left: 100rpx;
}
/*  #endif  */
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
	margin-right:390rpx ;
}
.moreRight{
	width: 20rpx;
	height: 20rpx;
	// margin-left: 400rpx;
}
.customStyle{
	width: 694rpx;
	height: 98rpx;
	background: #FFE512;
	border-radius: 53rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 82rpx;
}
</style>
