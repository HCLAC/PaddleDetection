<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar" style="border-bottom: 2rpx solid #EDEFF2;">
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
		<view class="" style="margin:0 28rpx;">
			<view class="form-box" >
				<!-- 头像 -->
				<view class="form-image" @click="chooseAvatar">
					<image lazy-load :src="avatar"  style="width: 130rpx; height: 130rpx;border-radius: 50%;margin-left: -10rpx;" ></image>
					<view class="avatarText" >
						修改头像
					</view>
					<image class="moreRight" src="/static/images/moreR.svg" ></image>
				</view>
				<!-- 昵称 -->
				<view class="form-name">
					<text space="nbsp">昵   称：</text>
					<u-input :customStyle="customStyleinput" v-model="name" type="text"></u-input>
				</view>
				<!-- 性别 -->
				<view class="form-sex">
					<view class="sex-box">
						<text space="nbsp">性   别：</text>
						<u-input :customStyle="customStyleinput" :disabled="true" v-model="sex" @click="actionSheetShow = true"></u-input>
					</view>
					<image class="moreRight" src="/static/images/moreR.svg" slot="right"></image>
				</view>
				<!-- 常住地 -->
				<view class="form-region">
					<view class="region-box">
						<text space="nbsp">常住地：</text>
						<u-input :customStyle="customStyleinput" :disabled="true" v-model="region" @click="pickerShow = true"></u-input>
					</view>
					<image class="moreRight" src="/static/images/moreR.svg" slot="right"></image>
				</view>
			</view>
			<view class="customStyle" @click="submit">
				保存
			</view>
			<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
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
				avatar: '',
				name: '',
				sex: '',
				region: '',
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
				customStyleinput:{
					width:'540rpx',
					margin:'16rpx 0'
				}
			};
		},
		// #ifdef MP-BAIDU
		onInit(query) {
		// #endif
		// #ifndef MP-BAIDU
		onLoad(query) {
		// #endif
			this.getUserInfo()
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('cropper', e => {
				let base ='data:image/png;base64,'+uni.getFileSystemManager().readFileSync(e.url,'base64')
				this.avatar = base
			})
		},
		methods:{
			// 用户信息
			getUserInfo() {
				uni.getStorage({
					key: 'userinfo',
					success: res => {
						var userInfoT = res.data 
						userInfoT && (userInfoT.sex = userInfoT.gender == 0 ? '保密' : userInfoT.gender == 2 ? '女' : '男')
						this.avatar = this.Utils.addImageProcess(userInfoT.avatar, false, 60),
						this.name = userInfoT.nick_name?userInfoT.nick_name:userInfoT.mobile,
						this.sex = userInfoT.sex,
						this.region = userInfoT.location
					}
				}); 
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
							url:'/pages_mine/cropper-default/cropper-default?src=' + tempFilePaths
						})
					}
				})
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				this.sex = this.actionSheetList[index].text;
			},
			// 保存
			submit() {
				if(this.name.length < 3 || this.name.length > 10){
					uni.showToast({
					    title: '姓名长度在3到10个字符',
						icon:'none'
					});
					return
				}
				uni.showLoading({
					title: '修改中',
					mask: true,
					success: () => {
					}
				});
				this.HTTP.request({
					url: '/user/info',
					data: {
						nick_name: this.name,
						avatar: this.avatar.indexOf("http") == -1?this.avatar:'',
						gender: this.sex == '男' ? 1 : this.sex == '女' ? 2 : 0,
						location: this.region ? this.region : '北京'
						
					},
					method: 'POST',
					success: res => {
						uni.hideLoading();
						if(res.data.code == 0){
							uni.setStorage({
								key: 'userinfo',
								data: res.data.data,
								success: function () {
								}
							});
							this.Utils.back()
						} else {
							uni.showToast({
								title: '修改失败',
								icon: 'none'
							});
						}
					}, 
					fail: res=>{
						uni.hideLoading();
						uni.showToast({
							title: '修改失败',
							icon: 'none'
						});
					}
				});
			},
			// 选择地区回调
			regionConfirm(e) {
				this.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			}
		}
	}
</script>

<style lang="scss" scoped>
.form-box{
	.form-image{
		height: 178rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// border-radius: 4rpx solid red;
		border-bottom: 1rpx solid #EDEFF2;
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
	}
	.form-name{
		display: flex;
		align-items: center;
		height: 96rpx;
		margin-top: 6rpx;
		border-bottom: 1rpx solid #EDEFF2;
		text{
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #909399;
		}
	}
	.form-sex,.form-region{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 96rpx;
		margin-top: 2rpx;
		border-bottom: 1rpx solid #EDEFF2;
		.sex-box,.region-box{
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #909399;
			}
		}
		.moreRight{
			width: 20rpx;
			height: 20rpx;
			// margin-left: 400rpx;
		}
	}
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
