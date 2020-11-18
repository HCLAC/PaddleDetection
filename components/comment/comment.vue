<template>
	<view @touchmove.stop.prevent="" class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
		<view class="mask-content"  @click.stop.prevent="stopPrevent">
			<view class="mask-content-topbar" >
				<view class="mask-content-input">
					<textarea class="textarea"
						v-model="content"
						:placeholder="placeholder"
						:cursor-spacing = "30"
						:show-confirm-bar = "false"
						:focus="focus"
						:auto-height="autoHeight"
						@input="inputValue"
						maxlength="140">
					</textarea>
				</view>
				<view class="right" @click="pubComment">发送</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name: "comment",
		//属性
		props: {
			placeholder: {
				type: String
			}
		},
		data() {
			return {
				maskState: 0,
				content: '',
				focus: true,
				autoHeight:false
			};
		},
		created() {
		},
		methods: {
			stopPrevent(){
			},
			inputValue(e){
				console.log('eeeee',e.detail.value.length)
				if(e.detail.value.length>18){
					this.autoHeight = true
				}else{
					this.autoHeight = false
				}
			},
			
			toggleMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				// this.maskState = 2;
				// setTimeout(()=>{
					this.maskState = state;
					// #ifdef APP-PLUS
					// 安卓app软键盘自动弹出有点问题，暂时还没有很好的解决方案，所以就禁止安卓app软键盘自动弹出，如果哪位朋友有好的解决方案可以在评论里告诉大家参考一下
					if (uni.getSystemInfoSync().platform == "ios") {
						this.focus = this.maskState ? true : false;
					}
					// #endif
					// #ifndef APP-PLUS
					this.focus = this.maskState ? true : false;
					// #endif
					
				// }, timer)
			},
			pubComment() {
				this.$emit('pubComment',this.content);
			}
		}
	}
</script>

<style lang="scss" scoped>
	$font-color-base: #606266;
	$base-color: #5A9BEC;
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .5s;
		-webkit-transition: .5s; 
		.mask-content{
			width: 100%;
			background: #FFFFFF;
			transform: translateY(100%);
			transition: .1s;//底部弹出的持续时间
			-webkit-transition: .1s;//底部弹出的持续时间 
			// overflow-y:scroll;
			display: flex;
			// flex-direction: column;
			.mask-content-topbar{
				display: flex;
				align-items: center;
				// flex-direction: row;
				// justify-content: space-between;
				padding: 16rpx 32rpx 14rpx;
				font-size: 28rpx;
				// .left{
				// 	// padding: 10upx 0upx;
				// 	color: $font-color-base;
				// }
				.mask-content-input{
					// width: 718upx;//如果textarea的宽带有问题可以把width改为100%试试
					// width: 100%;
					// padding: 10upx 16upx 20upx;
					.textarea {
						width: 558rpx;
						height: 28rpx;
						background: #F8F8F8;
						border-radius: 4px;
						padding: 16rpx 16rpx;
						
						margin-right: 16rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #C9CAD1;
						// height: 100px;
						// width: 686upx;//如果textarea的宽带有问题可以把width改为100%试试
						// width: 100%;
						// padding: 20rpx 16rpx;
						// border:2upx solid #d5d5d6;
						// border-radius: 8upx;
					}
				}
				.right{
					// width: 64rpx;
					height: 32rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #0091FF;
					line-height: 32rpx;
					margin-left: 16rpx;
				}
			}
			
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			.mask-content{
				transform: translateY(0);
			}
		}
	}

</style>
