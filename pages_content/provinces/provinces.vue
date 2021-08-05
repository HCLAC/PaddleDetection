<template>
	<view >
		<!-- 自定义导航栏 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" :status-bar="true" :title="querys.name">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 头图 -->
		<mescroll-body class="mescroll" ref="mescrollRef" style="margin-bottom: 300rpx;" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"> 
			<view class="headImgBox">
				<image class="headImg" :src="querys.image" mode="scaleToFill"></image>
				<view class="mask"></view>
				<view class="cityBox">
					<view class="city">{{ querys.name || '全国' }}</view>
					<view class="change">
						<view class="changeText" @click="show = true">切换</view>
						<image class="changeIcon" src="/static/images/more-down.svg" mode=""></image>
					</view>
				</view>
				<!-- 天气 -->
				<weather :weather="weather"></weather>
			</view>
			<view class="contentBox" >
				<!-- 景点推荐 -->
				<view class="content">
					<view class="contentHeader">
						<view class="contentTitle">景点推荐</view>
						<view class="contentMore" @click="toMore()">
							更多
							<image class="moreIcon" src="/static/images/more-right.svg" mode="widthFix"></image>
						</view>
					</view>
					<view class="contentImgBox">
						<view class="contentImg" v-for="(item, index) in siteHot" :key="index" @click="toAtt(item.id)">
							<image class="attImg" :src="item.image" mode="aspectFill"></image>
							<view class="attText">{{ item.name }}</view>
							<view class="rateBox">
								<!-- <uni-rate  :readonly="true" allow-half :value="rate" /> -->
								<!-- 评分图标 -->
								<view class="rateStart" v-if="item.rate == 5">
									<image src="/static/images/star_svg/star4.svg" mode=""></image>
									<image src="/static/images/star_svg/star4.svg" mode=""></image>
									<image src="/static/images/star_svg/star4.svg" mode=""></image>
									<image src="/static/images/star_svg/star4.svg" mode=""></image>
									<image src="/static/images/star_svg/star4.svg" mode=""></image>
								</view>
								<view class="rateStart" v-else-if="item.rate == 4">
									<image src="/static/images/star_svg/star3.svg" mode=""></image>
									<image src="/static/images/star_svg/star3.svg" mode=""></image>
									<image src="/static/images/star_svg/star3.svg" mode=""></image>
									<image src="/static/images/star_svg/star3.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
								</view>
								<view class="rateStart" v-else-if="item.rate == 3">
									<image src="/static/images/star_svg/star2.svg" mode=""></image>
									<image src="/static/images/star_svg/star2.svg" mode=""></image>
									<image src="/static/images/star_svg/star2.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
								</view>
								<view class="rateStart" v-else-if="item.rate == 2">
									<image src="/static/images/star_svg/star1.svg" mode=""></image>
									<image src="/static/images/star_svg/star1.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
								</view>
								<view class="rateStart" v-else-if="item.rate == 1">
									<image src="/static/images/star_svg/star11.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
								</view>
								<view class="rateStart" v-else-if="item.rate >= 4.1 && item.rate < 5">
									<image src="/static/images/star_svg/star3.svg" mode=""></image>
									<image src="/static/images/star_svg/star3.svg" mode=""></image>
									<image src="/static/images/star_svg/star3.svg" mode=""></image>
									<image src="/static/images/star_svg/star3.svg" mode=""></image>
									<image src="/static/images/star_svg/starCopy13.svg" mode=""></image>
								</view>
								<view class="rateStart" v-else-if="item.rate >= 3.1 && item.rate < 4">
									<image src="/static/images/star_svg/star2.svg" mode=""></image>
									<image src="/static/images/star_svg/star2.svg" mode=""></image>
									<image src="/static/images/star_svg/star2.svg" mode=""></image>
									<image src="/static/images/star_svg/starCopy12.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
								</view>
								<view class="rateStart" v-else-if="item.rate >= 2.1 && item.rate < 3">
									<image src="/static/images/star_svg/star1.svg" mode=""></image>
									<image src="/static/images/star_svg/star1.svg" mode=""></image>
									<image src="/static/images/star_svg/starCopy1.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
								</view>
								<view class="rateStart" v-else-if="item.rate >= 1.1 && item.rate < 2">
									<image src="/static/images/star_svg/star11.svg" mode=""></image>
									<image src="/static/images/star_svg/starCopy1.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
								</view>
								<view class="rateStart" v-else-if="item.rate >= 0.1 && item.rate < 1">
									<image src="/static/images/star_svg/starCopy1.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
									<image src="/static/images/star_svg/star5.svg" mode=""></image>
								</view>
								<!-- <u-rate :disabled="true" current="4"></u-rate> -->
								<view class="rate">{{ item.rate }} 星</view>
							</view>
						</view>
					</view>
					<!-- 无数据展示 -->
					<view class="contentNull" v-if="siteHot.length == 0">
						暂无数据请切换其他城市
					</view>
				</view>
				<!-- 行程推荐 -->
				<view class="trip" v-if="routeHot.length">
					<view class="tripHeader">
						<view class="tripTitle">行程路线</view>
						<view class="tripMore" @click="toLineMore()">
							更多
							<image class="moreIcon" src="/static/images/more-right.svg" mode="widthFix"></image>
						</view>
					</view>
					<view class="tripBox">
						<view class="tripContent" v-for="(item, index) in routeHot" :key="index" @click="toLineDetail(item)">
							<image class="tripImg" :src="item.image" mode=""></image>
							<view class="tripText">{{ item.title }}</view>
						</view>
					</view>
				</view>
				<view class="line"></view>
				<!-- 旅途问答 -->
				<!-- <view class="travelQuestionsBox">
					<view class="tQTop">
						<view class="tQTBox">
							<text class="tQText">旅途问答</text>
							<view class="tQLine"></view>
						</view>
						
						<view class="tQBtn" @click="toQuestions">
							<image src="/static/images/followIcon.svg" mode=""></image>
							<view class="tQBT">
								我要提问
							</view>
						</view>
					</view>
					<view class="tQContent" v-if="questions.length != 0 || questions != undefined">
						<view class="tQCard" v-for="(item,index) in questions " :key="index" @click="toQuestionsDetail(item)">
							<view class="tQCRight">
								<view class="tQCTitle">
									{{item.title}}
								</view>
								<view class="tQCParse">
									{{item.content}}
								</view>
							</view>
						</view>
						<view class="tQToMore" @click="toMoreQuestions"  v-if="questions.length >= 2">
							查看更多
						</view>
					</view>
					<view class="tQContentNull" v-if="questions.length == 0">
						还没有问答，快来做第一个提问者吧~
					</view>
				</view> -->
				<!-- 正在旅行 -->
				<view class="touring" >
					<text class="tourtext">正在旅行</text>
					<view class="wrap">
						<articleWaterfall :list="list"></articleWaterfall>
					</view>
				</view>
			</view>
		</mescroll-body>
		<!-- 城市选择弹窗 -->
		<u-popup v-model="show" mode="top" height="383px">
			<uni-nav-bar :fixed="true" :status-bar="true" title="选择城市">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->						
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
			<!-- 城市 -->
			<view class="nowcity">
				<text>{{ querys.name }}</text>
				<image class="nowcityImg" src="/static/images/moreDown.svg" mode=""></image>
			</view>
			<!-- 城市选择列表 -->
			<view class="u-menu-wrap">
				<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
					<view
						v-for="(item, index) in cityList"
						:key="index"
						class="u-tab-item"
						:class="[current == index ? 'u-tab-item-active' : '']"
						:data-current="index"
						@tap.stop="swichMenu(index)"
					>
						<text class="u-line-1">{{ item.name }}</text>
					</view>
				</scroll-view>
				<block v-for="(item, index) in cityList" :key="index">
					<scroll-view scroll-y class="right-box" v-if="current == index">
						<view class="page-view">
							<view class="class-item">
								<!-- </view> -->
								<view class="item-container">
									<view class="thumb-box" v-for="(item1, index1) in item.city_list" :key="index1">
										<!-- <image class="item-menu-image" :src="item2.icon" mode=""></image> -->
										<view class="item-menu-name" @click="swichToCity(item1, item.name)">{{ item1.name }}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</block>
			</view>
		</u-popup>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import articleWaterfall from '@/common/article-waterfall/article-waterfall.vue';
import weather from '@/common/weather/weather.vue';
// 引入mescroll-mixins.js
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin],
	data() {
		return {
			downOption: {
				auto:false,
				use:false,
				bgColor:'#F8F8F8'
			},
			upOption: {
				auto:false
			},
			scrollTop: 0, //tab标题的滚动条位置
			current: 0, // 预设当前项的值
			menuHeight: 0, // 左边菜单的高度
			menuItemHeight: 0, // 左边菜单item的高度
			list: [],
			weather: null,
			querys: null,
			siteHot: [],
			routeHot: null,
			show: false,
			cityList: null,
			name: null,
			firstTime: new Date().getTime(),
			questions: [],
			answersList:[]
		};
	},
	components: {
		uniNavBar,
		articleWaterfall,
		weather
	},
	onLoad(options) {
		this.querys = options;
		this.loadData()
		this.mescroll.resetUpScroll();
	},
	methods: {
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		loadData(){
			uni.showLoading({
				title: '加载中',
				mask: true,
				success: () => {
					this.getWeather();
					this.getCity();
					this.getSiteHot();
					this.getRouteHot();
					this.hideLoad();
					// this.getQuestionList()
				}
			});
		},
		hideLoad(){
			uni.hideLoading();
		},
		
		// 获取问答列表
		getQuestionList() {
			uni.request({
				url: this.globalUrl + '/questions/random',
				data: {
					state_id: this.querys.state_id,
					city_id: this.querys.city_id,
					count: 6
				},
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: res => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					this.answersList = res.data.data
				}
			});
		},
		// 天气接口
		getWeather() {
			uni.request({
				url: 'https://query.asilu.com/weather/baidu',
				data: {
					city: this.querys.name
				},
				success: (res) => {
					if (res.statusCode != 200){
						uni.showToast({
							title: '获取天气情况失败，待重试',
							icon: 'none'
						});
						return
					}
					this.weather = res.data.weather[0];
				}
			});
		},
		// 推荐景点接口
		getSiteHot() {
			uni.request({
				url: this.globalUrl + '/site/hot',
				data: {
					state_id: this.querys.state_id,
					city_id: this.querys.city_id,
					count: 3,
					sort_by: 3
				},
				success: res => {					
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					this.siteHot = res.data.data;
				}
			});
		},
		// 热门线路接口
		getRouteHot() {
			uni.request({
				url: this.globalUrl + '/route/hot',
				data: {
					state_id: this.querys.state_id,
					city_id: this.querys.city_id,
					count: 2
				},
				success: res => {					
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					this.routeHot = res.data.data;
				}
			});
		},
		// 跳转文章详情
		toArticleDetail(e) {
			let id = e.currentTarget.id;
			uni.navigateTo({
				url: '/pages_content/article/article?article_id=' + id
			});
		},
		toLineDetail(item) {
			uni.navigateTo({
				url: '/pages_province/lineDetail/lineDetail?id=' + item.uuid
			});
		},
		// 跳转景点详情页
		toAtt(e) {
			uni.navigateTo({
				url: '/pages_province/positionContent/positionContent?id=' + e
			});
		},
		// 跳转景点榜单页
		toMore() {
			if (!this.querys || !this.querys.state_id) {
				uni.navigateTo({
					url: '/pages_province/attractionsRank/attractionsRank'
				});
				return
			}
			var state_id = this.querys.state_id;
			var city_id = this.querys.city_id;
			var name = this.querys.name;
			var image = this.querys.image;
			uni.navigateTo({
				url: '/pages_province/attractionsRank/attractionsRank?state_id=' + state_id + '&city_id=' + city_id+
							"&name="+name+"&image="+image
			});
		},
		// 线路列表
		toLineMore() {
			if (this.querys == null) {
				uni.navigateTo({
					url: '/pages_province/lineList/lineList'
				});
			} else {
				var state_id = this.querys.state_id;
				var city_id = this.querys.city_id;
				uni.navigateTo({
					url: '/pages_province/lineList/lineList?state_id=' + state_id + '&city_id=' + city_id
				});
			}
		},
		// 跳转问答列表页
		toMoreQuestions(){
			var state_id = this.querys.state_id;
			var city_id = this.querys.city_id;
			uni.navigateTo({
				url: '/pages_questions/moreQuestions/moreQuestions?state_id=' + state_id + '&city_id=' + city_id
			});
		},
		// 获取全国城市
		getCity() {
			uni.request({
				url: this.globalUrl + '/area/guide',
				success: res => {
					if (res.statusCode != 200 || res.data.code != 0){
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						return
					}
					var cityList = res.data.data.areas;
					this.cityList = cityList.slice(1);
				}
			});
		},
		// 跳转其他省市
		swichToCity(item1, name) {
			if (item1.name != '全省'){
				name = item1.name
			}
			uni.redirectTo({
				url: '/pages_content/provinces/provinces?state_id=' +
								item1.state_id+"&city_id="+item1.city_id+
								"&name="+name+"&image="+item1.image
			});
		},
		
		// 点击左边的栏目切换
		async swichMenu(index) {
			if (index == this.current) return;
			this.current = index;
			// 如果为0，意味着尚未初始化
			if (this.menuHeight == 0 || this.menuItemHeight == 0) {
				await this.getElRect('menu-scroll-view', 'menuHeight');
				await this.getElRect('u-tab-item', 'menuItemHeight');
			}
			// 将菜单菜单活动item垂直居中
			this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
		},
		// 获取一个目标元素的高度
		getElRect(elClass, dataVal) {
			new Promise((resolve, reject) => {
				const query = uni.createSelectorQuery().in(this);
				query
					.select('.' + elClass)
					.fields(
						{
							size: true
						},
						res => {
							// 如果节点尚未生成，res值为null，循环调用执行
							if (!res) {
								setTimeout(() => {
									this.getElRect(elClass);
								}, 10);
								return;
							}
							this[dataVal] = res.height;
						}
					)
					.exec();
			});
		},
		// 提问按钮
		toQuestions(){
			var Authorization = uni.getStorageSync('Authorization')
			let url = '/pages_questions/questions/questions'
			if (!Authorization) {
				url = '/pages_mine/login/login'
			}
			uni.navigateTo({
				url: url
			})
		},
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		home() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		/*下拉刷新的回调, 有三种处理方式:*/
		downCallback() {
			// this.loadData()
			// 第1种: 请求具体接口
			// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
			this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
			// this.mescroll.endSuccess()
			// 此处仍可以继续写其他接口请求...
			// 调用其他方法...
		},
		/*上拉加载的回调*/
		upCallback(page) {
			let pageNum = page.num
			let pageSize = page.size; // 页长, 默认每页10条
			if(pageNum == 1){
				this.firstTime = new Date().getTime()
			}
			var that = this;
			
			if (that.querys == null) {
				that.querys.city_id = 0
				that.querys.state_id = 0
			}
			uni.request({
				url: this.globalUrl + '/article/list?page=' + pageNum + '&count=' + pageSize,
				data: {
					state_id: that.querys.state_id,
					city_id: that.querys.city_id,
					first_time: that.firstTime
				},
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: data => {
					if (!data.data.data.list || data.data.data.list.length == 0){
						return
					}
					// 接口返回的当前页数据列表 (数组)
					let curPageData = data.data.data.list;
			
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length;
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = data.data.data.total / pageSize;
					// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
					let totalSize = data.data.data.total;
					// 接口返回的是否有下一页 (true/false)
					// let hasNext = data.data.data.list;
					if(this.answersList.length > 0 ){
						var answer = this.answersList
						var sar = Math.floor((Math.random()*answer.length));
						var addAnswer = answer[sar]
						let answerArr = [addAnswer]
						//设置列表数据
						if (curPageData.length > 5){
							if (page.num == 1) that.list = []; //如果是第一页需手动置空列表
							curPageData = curPageData.concat(answerArr)
							that.list = that.list.concat(curPageData); //追加新数据
						}else{
							if (page.num == 1) that.list = []; //如果是第一页需手动置空列表
							that.list = that.list.concat(curPageData); //追加新数据
						}
					}else{
						// console.log(answerArr,'随机数据')
						//设置列表数据
						if (page.num == 1) that.list = []; //如果是第一页需手动置空列表
						that.list = that.list.concat(curPageData); //追加新数据
					}
					console.debug('文章列表', that.list);
					// that.list = that.list.concat(answerArr)
					// 请求成功,隐藏加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					this.mescroll.endByPage(curPageLen, totalPage);
			
					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					// this.mescroll.endBySize(curPageLen, totalSize);
			
					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//this.mescroll.endSuccess(curPageLen, hasNext);
			
					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
					//如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
					//如果传了hasNext,则翻到第二页即可显示无更多数据.
					//this.mescroll.endSuccess(curPageLen);
			
					// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
					// 建议使用setTimeout,因为this.$nextTick某些情况某些机型不触发
					// setTimeout(() => {
					// 	this.mescroll.endSuccess(curPageLen)
					// }, 20)
				},
				fail: () => {
					//  请求失败,隐藏加载状态
					this.mescroll.endErr();
				}
			});

			// 此处仍可以继续写其他接口请求...
			// 调用其他方法...
		}
	}
};
</script>

<style lang="scss" scoped>
	.Title{
		// overflow: hidden;
		// white-space: nowrap;
		// text-overflow: ellipsis;
		margin: 0 auto;
	}
// 自定义导航栏样式
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
	margin-left: 182rpx;
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
.headImgBox {
	width: 100%;
	height: 440rpx;
	position: relative;
	border: none;
}
.headImg {
	width: 100%;
	height: 100%;
}
.mask {
	width: 100%;
	height: 244rpx;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #13c2c2 100%);
	opacity: 0.4;
	position: absolute;
	bottom: 0;
	left: 0;
}
.cityBox {
	display: flex;
	align-items: center;
	position: absolute;
	bottom: 144rpx;
	left: 40rpx;
}
.city {
	font-size: 48rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #ffffff;
	line-height: 48rpx;
	margin-right: 20rpx;
}
.change {
	width: 88rpx;
	height: 40rpx;
	background: #ffffff;
	border-radius: 28rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.changeText {
	font-size: 20rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #606266;
}
.changeIcon {
	width: 14rpx;
	height: 14rpx;
	margin-left: 6rpx;
}
.contentBox {
	width: 100%;
	background: #FFFFFF;
	border: 1px solid #FFFFFF;
	border-radius: 16rpx 16rpx 0px 0px;
	border-bottom: none;
	position: relative;
	top: -30rpx;
	left: 0;
}
// 景点推荐
.content {
	width: 100%;
}
.contentHeader {
	display: flex;
	align-items: center;
	border: none;
	padding-top: 32rpx;
	padding-left: 28rpx;
}
.contentTitle {
	height: 36rpx;
	font-size: 36rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 36rpx;
	margin-right: 456rpx;
}
.contentMore {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 94rpx;
	height: 42rpx;
	background: #edeff2;
	border-radius: 24rpx;
	font-size: 22rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #606266;
}
.moreIcon {
	width: 14rpx;
	height: 14rpx;
	margin-left: 4rpx;
}
.contentImgBox {
	margin-top: 30rpx;
	display: flex;
	margin-left: 28rpx;
}
.contentNull{
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #909399;
	text-align: center;
	margin-top: 40rpx;
}
.contentImg {
	width: 218rpx;
	margin-right: 20rpx;
	background-color: #ffffff;
	padding-bottom: 24rpx;
	border-radius: 16rpx 16rpx 0rpx 0rpx;
	box-shadow: 0rpx 4rpx 24rpx 0rpx #EDEFF2;
}
.attImg {
	width: 100%;
	height: 166rpx;
	border-radius: 8px 8px 0px 0px;
}
.attText {
	// height: 28rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	// line-height: 28rpx;
	margin: 4rpx 0 2rpx 6rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow:ellipsis;
}
.rateBox {
	display: flex;
	align-items: center;
	margin-left: 6rpx;
	.rateStart {
		display: flex;
	}
	.rateStart image {
		width: 22.4rpx;
		height: 22.4rpx;
		margin-right: 6rpx;
	}
	.rate {
		margin-left: 12rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #606266;
	}
	
}
// 行程推荐
.trip {
	margin-top: 44rpx;
	margin-left: 28rpx;
	// padding-bottom: 40rpx;
	background: #FFFFFF;
}
.tripHeader {
	display: flex;
	align-items: center;
	margin-top: 32rpx;
	
}
.tripTitle {
	// width: 144rpx;
	height: 36rpx;
	font-size: 36rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	line-height: 36rpx;
	margin-right: 456rpx;
}
.tripMore {
	width: 94rpx;
	height: 42rpx;
	background: #edeff2;
	border-radius: 24rpx;
	font-size: 22rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #606266;
	display: flex;
	align-items: center;
	justify-content: center;
}
.moreIcon {
	width: 14rpx;
	height: 14rpx;
	margin-left: 4rpx;
}
.tripBox {
	margin-top: 30rpx;
	display: flex;
}
.tripContent {
	width: 338rpx;
	margin-right: 18rpx;
}
.tripImg {
	width: 100%;
	height: 180rpx;
	border-radius: 8px;
}
.tripText {
	// height: 28rpx;
	margin-top: 8rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	// line-height: 28rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 正在旅行 */
.touring{
	margin-top: 36rpx;
}
.touring .tourtext {
	width: 160rpx;
	height: 104rpx;
	// line-height: 104rpx;
	font-size: 40rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #303133;
	margin-left: 32rpx;
	
}

.wrap {
	width: 750rpx;
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;
	margin-top: 24rpx;
	padding: 0 14rpx 0 28rpx;
}

// 弹窗
.navtitle {
	font-size: 38rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #000000;
	line-height: 38rpx;
	margin-left: 180rpx;
}

.nowcity {
	margin: 40rpx 40rpx 32rpx 40rpx;
	display: flex;
	align-items: center;
	// height: 28rpx;
	text {
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 28rpx;
		margin: 16rpx 12rpx 8rpx 6rpx;
	}
	.nowcityImg {
		width: 16rpx;
		height: 16rpx;
		margin-top: 6rpx;
	}

	.rateBox {
		display: flex;
		align-items: center;
		margin-left: 6rpx;
		.rateStart{
			display: flex;
		}
		.rateStart image{
			width: 22.4rpx;
			height: 22.4rpx;
			margin-right: 6rpx;
		}
		.rate {
			margin-left: 12rpx;
			font-size: 20rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #606266;
			line-height: 20rpx;
		}
	
	}
	// 行程推荐
	.trip{
		margin-top: 44rpx;
		margin-left: 28rpx;
	}
	.tripHeader{
		display: flex;
		align-items: center;
		margin-top: 32rpx;
		background: #F8F8F8;
	}
	.tripTitle{
		// width: 144rpx;
		height: 36rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 36rpx;
		margin-right: 456rpx;
	}
	.tripMore{
		width: 94rpx;
		height: 42rpx;
		background: #EDEFF2;
		border-radius: 24rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #606266;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.moreIcon{
		width: 14rpx;
		height: 14rpx;
		margin-left: 4rpx;
	}
	.tripBox{
		margin-top: 30rpx;
		display: flex;
	}
	.tripContent{
		width: 338rpx;
		margin-right: 18rpx;
	}
	.tripImg{
		width: 100%;
		height: 180rpx;
		border-radius: 8px;
	}
	.tripText{
		// height: 28rpx;
		margin-top: 4rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		// line-height: 28rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	

	image {
		width: 11.4rpx;
		height: 11.4rpx;
	}
}

// 列表
.u-menu-wrap {
	height: 574rpx;
	flex: 1;
	display: flex;
	overflow: hidden;
	border-top: 1rpx solid #EDEFF2;
}

.u-search-inner {
	background-color: rgb(234, 234, 234);
	border-radius: 100rpx;
	display: flex;
	align-items: center;
	padding: 10rpx 16rpx;
}

.u-search-text {
	font-size: 26rpx;
	color: $u-tips-color;
	margin-left: 10rpx;
}

.u-tab-view {
	width: 200rpx;
	height: 100%;
}

.u-tab-item {
	height: 80rpx;
	background: #ffffff;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	color: #303133;
	font-weight: 400;
	line-height: 1;
}

.u-tab-item-active {
	position: relative;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #fa8c16;
	font-size: 28rpx;
	background: #f8f8f8;
}

.u-tab-item-active::before {
	content: '';
	position: absolute;
	border-left: 4rpx solid #fa8c16;
	height: 80rpx;
	left: 0;
	top: 0;
}

.u-tab-view {
	height: 100%;
}

.right-box {
	background-color:#f8f8f8;
}

.page-view {
	// padding: 16rpx;
}

.class-item {
	margin-bottom: 30rpx;
	background-color: #f8f8f8;
	// padding: 16rpx;
	border-radius: 8rpx;
}

.item-title {
	font-size: 26rpx;
	color: $u-main-color;
	font-weight: bold;
}

.item-menu-name {
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #303133;
	margin-bottom: 40rpx;
	margin-left: 28rpx;
}

.item-container {
	// display: flex;
	// flex-wrap: wrap;
}

.thumb-box {
	width: 33.333333%;
	// display: flex;
	// align-items: center;
	// justify-content: center;
	// flex-direction: column;
	margin-top: 20rpx;
}

.item-menu-image {
	width: 120rpx;
	height: 120rpx;
}
.line{
	width: 100%;
	height: 20rpx;
	margin-top: 40rpx;
	background: #F8F8F8;
}
// 旅途问答
.travelQuestionsBox{
	margin: 28rpx;
	.tQTop{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.tQTBox{
			.tQText{
				height: 36rpx;
				font-size: 36rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #303133;
				line-height: 36rpx;

			}
			.tQLine{
				margin-top: -8rpx;
				width: 144rpx;
				height: 12rpx;
				background: #FFE512;
				border-radius: 12rpx;

			}
		}
		.tQBtn{
			width: 180rpx;
			height: 52rpx;
			background: #EDEFF2;
			border-radius: 26rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 20rpx;
				height: 20rpx;
				margin-right: 8rpx;
			}
			.tQBT{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #303133;
				line-height: 28rpx;
			}
		}
	}
	.tQContent{
		margin: 44rpx 0rpx 20rpx;
		.tQCard{
			background: #FFFFFF;
			padding-bottom: 20rpx;
			border-bottom: 2rpx solid #EDEFF2;
			margin-bottom: 20rpx;
			.tQCRight{
				width: 694rpx;
				.tQCTitle{
					font-size: 40rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #303133;
					line-height: 56rpx;
					margin-bottom: 20rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					word-wrap: break-word;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.tQCParse{
					width: 100%;
					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #606266;
					line-height: 42rpx;
					overflow:hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;

				}
			}
		}
		.tQToMore{
			text-align: center;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			line-height: 28rpx;
			margin-top: 40rpx;
		}
	}
	.tQContentNull{
		margin: 80rpx 0rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 28rpx;
		text-align: center;
	}
}
</style>
