<template>
	<view class="u-image" :style="wrapStyle">
		<image
			:src="src"
			:mode="mode"
			:lazy-load="lazyLoad"
			class="u-image__image"
			:style="{
				borderRadius: '12rpx 12rpx 0 0',
				backgroundColor: backgroundColor[index%8]
			}"
		></image>
	</view>
</template>

<script>
/**
 * Image 图片
 * @property {String} src 图片地址
 * @property {String} mode 裁剪模式，见官网说明
 * @property {String | Number} width 宽度，单位任意，如果为数值，则为rpx单位（默认100%）
 * @property {String | Number} height 高度，单位任意，如果为数值，则为rpx单位（默认 auto）
 */
export default {
	name: 'u-image',
	props: {
		// 图片地址
		src: {
			type: String,
			default: ''
		},
		// 裁剪模式
		mode: {
			type: String,
			default: 'aspectFill'
		},
		// 宽度，单位任意
		width: {
			type: [String, Number],
			default: '100%'
		},
		// 高度，单位任意
		height: {
			type: [String, Number],
			default: 'auto'
		},
		// 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
		lazyLoad: {
			type: Boolean,
			default: true
		},
		// 颜色下标
		index: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			backgroundColor: [
				'#E2DCF0',
				'#E7EEF4',
				'#F0F0F0',
				'#F3F1E9',
				'#DCEDDD',
				'#F0EADC',
				'#F0F2F5',
				'#EDDCDC',
			]
		};
	},
	computed: {
		wrapStyle() {
			let style = {};
			// 通过调用addUnit()方法，如果有单位，如百分比，px单位等，直接返回，如果是纯粹的数值，则加上rpx单位
			style.width = this.$u.addUnit(this.width);
			style.height = this.$u.addUnit(this.height);
			// 如果是配置了圆形，设置50%的圆角，否则按照默认的配置值
			// style.borderRadius = '12rpx 12rpx 0 0';
			// 如果设置圆角，必须要有hidden，否则可能圆角无效
			style.overflow = 'hidden';
			return style;
		}
	},
	methods: {
	}
};
</script>

<style scoped lang="scss">

.u-image {
	position: relative;
	transition: opacity 0.5s ease-in-out;

	&__image {
		width: 100%;
		height: 100%;
	}
}
</style>
