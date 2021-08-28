<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar"  >
			<uni-nav-bar :fixed="true" :status-bar="true" :border="true" title="举报">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 举报内容 -->
		<view class="reportBox">
			<view class="reportTitle">
				这条内容存在什么问题？
			</view>
			<view>
				<!-- 选项 -->
				<u-radio-group v-model="selectName" @change="radioGroupChange" activeColor="#ffe512" width="auto">
					<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :labelColor="selectName==item.name?'#303133':'#909399'" :name="item.name">{{ item.name }}</u-radio>
				</u-radio-group>
				<!-- 内容 -->
				<textarea
					class="textArea"
					:clearable="false"  
					placeholder="为帮助审核人员更加快速处理，请补充违规内容出现位置等详细信息" 
					placeholder-style="font-size:28rpx;line-height:42rpx"
					maxlength="140"  
					style="background:#f8f8f8;" 
					v-model="reportInfo" 
				>
				</textarea>
			</view>
			<view class="textNum">
				{{number}}/140
			</view>
			<button class="bbutton" @click="submit" :style="{background: customStyle.background}"  >提交举报</button>
			<u-modal v-model="show" :content="content" :border-radius="40" @confirm="confirm" z-index="999999" :show-title="false" :show-cancel-button="false" confirm-text="OK" confirm-color="#007AFF" ></u-modal>
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
				reportInfo: '',
				selectName: '',
				radioList: [
					{
						name: '广告灌水',
					},
					{
						name: '色情暴力',
					},
					{
						name: '危害国家安全',
					},
					{
						name: '错误信息',
					},
					{
						name: '盗用',
					},
					{
						name: '其他',
					}
				],
				customStyle:{
					background: '#EDEFF2'
				},
				show: false,
				content: '提交成功'
			}
		},
		onLoad(e) {
			this.id = e.id
		},
		watch:{
			reportInfo(val){
				this.number = val.length
				if(val.length && val.length > 4 ){
					this.customStyle.background = '#FFE512';
				}else {
					this.customStyle.background = '#EDEFF2';
				}
			}
		},
		methods: {
			submit() {
				if (!this.Utils.isLogin()){
					return
				}
				let introLength = this.reportInfo.length
				if (introLength < 5) {
					uni.showToast({
						title: '原因不能少于5个字',
						icon:'none',
						duration: 2000
					})
					return
				}
				this.HTTP.request({
					url: '/comments/report',
					data: {
						id: this.id,
						behavior: this.selectName,
						content: this.reportInfo
					},
					method: 'POST',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						this.show = true
					}
				});
			},
			confirm(){
				this.Utils.back()
			},
			// radio选择发生变化
			radioGroupChange(e) {
			},
		}
	}
</script>

<style lang="scss" scoped>

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
