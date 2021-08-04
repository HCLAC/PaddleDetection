<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="example-body"  >
			<uni-nav-bar :fixed="true" :status-bar="true" :border="true" title="举报">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 举报内容 -->
		<view class="reportBox">
			<view class="reportTitle">
				这条内容存在什么问题？
			</view>
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<!-- 选项 -->
				<u-form-item :label-position="labelPosition" :border-bottom="false" prop="payType" label-width="150">
					<u-radio-group v-model="radio" @change="radioGroupChange"  activeColor="#ffe512" :width="radioCheckWidth" :wrap="radioCheckWrap">
						<u-radio shape="circle" v-model="item.checked"  v-for="(item, index) in radioList" :key="index" :name="item.name">{{ item.name }}</u-radio>
					</u-radio-group>
				</u-form-item>
				<!-- 内容 -->
				<u-form-item class="formItem" :label-position="labelPosition" :border-bottom="false" prop="intro">
					
					<textarea
						class="textArea"
						
						:clearable="false"  
						placeholder="为帮助审核人员更加快速处理，请补充违规内容出现位置等详细信息" 
						placeholder-style="font-size:28rpx;line-height:42rpx"
						maxlength="140"  
						:style="{background: customStyleInput.background}" 
						v-model="modelIntro" 
					>
					</textarea>
					
				</u-form-item>
			</u-form>
			<view class="textNum">
				{{number}}/140
			</view>
			<button class="bbutton" @click="submit" :style="{background: customStyle.background}"  >提交举报</button>
			<u-modal v-model="show" :content="content" @confirm="confirm" z-index="999999" :show-title="false" :show-cancel-button="false" confirm-text="OK" confirm-color="#007AFF" ></u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				number:0,
				id:'',
				model: {
					intro: '',
					payType:''
				},
				modelIntro: '',
				rules:{
					intro: [
						{
							min: 5, 
							message: '原因不能少于5个字', 
							trigger: 'change'
						},
						
					],
					payType: [
						{
							required: false,
							message: '请选择一种举报类型',
							trigger: 'change',
						}
					],
				},
				radioList: [
					{
						name: '广告灌水',
						checked: true,
						disabled: false
					},
					{
						name: '色情暴力',
						checked: false,
						disabled: false
					},
					{
						name: '危害国家安全',
						checked: false,
						disabled: false
					},
					{
						name: '错误信息',
						checked: false,
						disabled: false
					},
					{
						name: '盗用',
						checked: false,
						disabled: false
					},
					{
						name: '其他',
						checked: false,
						disabled: false
					}
				],
				check: false,
				radio: '',
				actionSheetShow: false,
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				labelPosition: 'left',
				errorType: ['message'],
				customStyle:{
					
					background: '#EDEFF2'
					
					
				},
				customStyleInput:{
					background: '#f8f8f8',
					
				},
				disabled:true,
				show: false,
				content: '提交成功'
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(e) {
			console.log('---',e)
			this.id = e.id
		},
		watch:{
			modelIntro(val){
				console.log(val.length)
				this.number = val.length
				if(val.length && val.length > 0 ){
						this.customStyle.background = '#FFE512';
					}else {
						this.customStyle.background = '#EDEFF2';
					}
			}
		},
		methods: {
			
			// inputvalue(e){
			// 	// let introLength = this.model.intro.length
			// 	console.log('字数',e.detail.value.length)
			// 	let introLength = e.detail.value.length
			// 	// console.log('字数',introLength)
			// 	if(introLength > 4){
			// 		console.log('ok')
			// 		this.customStyle.background = '#FFE512'
			// 	}else {
			// 		this.customStyle.background = '#EDEFF2'
			// 	}
			// },
			// 保存
			submit() {
				let introLength = this.modelIntro.length
				if (introLength >= 5) {
					// console.log('验证通过'); 
					uni.request({
						url: this.globalUrl + '/comments/report',
						data: {
							id:this.id,
							behavior:this.model.payType,
							content:this.modelIntro
						},
						method: 'POST',
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},
						success: res => {
							if(this.model.payType == ''){
								uni.showToast({
									title: '请选择一种举报类型',
									icon:'none',
									duration: 2000
								})
								return
							}
							console.log('举报信息',res)
							// uni.showToast({
							// 	title: '举报成功',
							// 	icon:'none',
							// 	duration: 2000
							// })
							this.show = true
							
						}
					});
					
				} else {
					console.log('验证失败');
					uni.showToast({
						title: '原因不能少于5个字',
						icon:'none',
						duration: 2000
					})
				}
			},
			confirm(){
				uni.navigateBack({
					delta: 1
				});
			},
			// radio选择发生变化
			radioGroupChange(e) {
				this.model.payType = e;
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
					url: '/pagesA/index/index'
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
	z-index: 9999;
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
	z-index: 9999;
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
	margin-left: 186rpx;
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

.reportBox{
	margin: 48rpx 28rpx;
	.reportTitle{
		margin-bottom: 40rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 32rpx;
	}
	
}
.textArea{
	width: 638rpx;
	height: 394rpx;
	background: #F8F8F8;
	margin-top: 32rpx;
	border-radius: 8px;
	padding: 32rpx 28rpx;
	line-height: 42rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
}
.textNum{
	position: absolute;
	margin-top: -64rpx;
	margin-left: 590rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #C9CAD1;
	line-height: 28rpx;
	z-index: 99999;
}
.bbutton{
	border-radius: 27px;
	height:98rpx;
	line-height: 98rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	margin:80rpx 0 0 0
}
button::after {
	border: none;
}
button[disabled] {
	background: rgba(237, 239, 242, 1) !important;
}
</style>
