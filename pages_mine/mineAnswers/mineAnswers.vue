<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" title="我的回答">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="Utils.back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.png" @click="Utils.home" />
				</view>
			</uni-nav-bar>
		</view>
		<meTabs class="mineAnswerTabs" v-model="tabIndex" :tabs="tabList" @change="tabChange" :fixed="isFixed" :tab-width="220"></meTabs>
		<answerList ref="mescrollItem" v-for="(tab,i) in tabList" :key="i" :i="i" :index="tabIndex"></answerList>
	</view>
</template>

<script>
import MescrollMoreMixin from '@/components/mescroll-uni/mixins/mescroll-more.js';
import meTabs from '@/common/me-tabs/me-tabs.vue';
import answerList from '@/common/article-mescroll-item/mine-answer-list.vue';
	export default {
		mixins: [MescrollMoreMixin],
		components: {
			meTabs,
			answerList
		},
		data() {
			return {
				tabList: ['关注的问题','回答的问题'], //'发布的问题',
				tabIndex: 0,
				isFixed:false,
				cardheight:0
			};
		},
		onPageScroll(e) {
			if (e.scrollTop >  this.cardheight) {
				this.isFixed = true;
			} else {
				this.isFixed = false;
			}
		},
		onLoad() {
			this.calcCardHeight()
		},
		methods:{
			calcCardHeight(){
				if (this.isFixed){
					return
				}
				const query = uni.createSelectorQuery().in(this);
				setTimeout(() => {
					query.select('.mineAnswerTabs').boundingClientRect(data => {
						this.cardheight = data.top-data.height
					}).exec();
				}, 500);
			},
			// 切换
			tabChange(index){
				this.tabIndex = index
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
