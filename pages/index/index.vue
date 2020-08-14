<template>
	<view>
		<view class="example-body">
			<uni-nav-bar  fixed="true" :status-bar="true" color="#333333" background-color="#FFFFFF"  @clickLeft="showCity" >
				<block slot="left">
					<view class="city">
						<view><text class="uni-nav-bar-text">{{ city }}</text></view>
						<image src="../../static/images/pulldown.svg" class="down" />
					</view>
				</block>
				<view class="input-view" @click="confirm">
					<image class="input-uni-icon" src="../../static/images/icon-search.svg" />
					<input confirm-type="search" class="nav-bar-input" type="text" placeholder="搜索热门目的地" >
				</view>
			</uni-nav-bar>
		</view>
		<!-- 内容 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<!-- <tcontent></tcontent> -->
			<view class="cus-sty">
				<!-- 热门景点 -->
			    <view class="hot">
			        <view class="hot-top">
			            <text class="ht-l">热门景点</text>
			            <view class="ht-r" @click="lookAll">查看更多<image src="../../static/images/more.svg" class="moreIcon" mode=""></image></view>
			        </view>
			        <view class="hot-bot"  >
						<view class="hb-l" @click='toAtt(hotAtt[0].id)'  >
							<image mode="aspectFill" :src="hotAtt[0].image"></image>
							<view class="imgMask">
								
							</view>
							<text>{{hotAtt[0].name}}</text>
						</view>
						<view class="hb-r">
							<view class="hb-r1" @click='toAtt(hotAtt[1].id)'>
								<image mode="aspectFill" :src="hotAtt[1].image"></image>
								<view class="imgMask">
									
								</view>
								<text>{{hotAtt[1].name}}</text>
							</view>
							<view class="hb-r2" @click='toAtt(hotAtt[2].id)'>
								<image mode="aspectFill" :src="hotAtt[2].image"></image>
								<view class="imgMask">
									
								</view>
								<text>{{hotAtt[2].name}}</text>
							</view>
						</view>
			        </view>
			    </view>
				<!-- 正在旅行 -->
			    <view class="touring">
			        <text class="tourtext">正在旅行</text>
					<!-- <touring class="touringList" ></touring> -->
					<view class="wrap">
						<u-waterfall v-model="list" ref="uWaterfall" >
							<template v-slot:left="{leftList}">
								<view class="demo-warter demo-warter-l" v-for="(item,index) in leftList" :key="index" >
									<view class="" @click="onPageJump" :id ="item.article_id">
										<view class="demo-top">
											<image class="demo-image"  :src="item.image" :index="index" mode="widthFix"></image>
											<view class="adress">
												<view class="adreessIcon">
													<image class="" src="../../static/images/Icon／Map3.svg" mode=""></image>
												</view>
												
												<view class="adressText">
													{{item.location}}
												</view>
											</view>
										</view>
										<view class="titleTip">
											<view class="demo-tag">
												<view class="demo-tag-owner" v-if="item.type==1">
													游记
												</view>
												<view class="demo-tag-owner" v-if="item.type==2">
													攻略
												</view>
											</view>
											<view class="demo-title">
												{{item.title}}
											</view>
										</view>
									</view>
										<view class="demo-user">
											<view class="userMessage">
												<image class="userHeard" :src="item.avatar"></image>
												<view class="userNikename">{{ item.author_name }}</view>
											</view>
											<view class="count" @click="clickLike" :id="item.article_id">
												<image src="../../static/images/heart.svg" v-if="item.liked==0"></image>
												<image src="../../static/images/heart-actived.svg" v-if="item.liked==1"></image>
													{{ item.like_count || 0 }}
												</view>
										</view>
									
								</view>
							</template>
							<template v-slot:right="{rightList}">
								<view class="demo-warter" v-for="(item,index) in rightList" :key="index">
									<view class=""  @click="onPageJump" :id= "item.article_id">
										<view class="demo-top">
											<image class="demo-image" :src="item.image" :index="index" mode="widthFix"></image>
											<view class="adress">
												<view class="adreessIcon">
													<image class="" src="../../static/images/Icon／Map3.svg" mode=""></image>
												</view>
												<view class="adressText">
													{{item.location}}
												</view>
											</view>
										</view>
										
										<view class="titleTip">
											<view class="demo-tag">
												<view class="demo-tag-owner" v-if="item.type==1">
													游记
												</view>
												<view class="demo-tag-owner" v-if="item.type==2">
													攻略
												</view>
											</view>
											<view class="demo-title">
												{{item.title}}
											</view>
										</view>
									</view>
										<view class="demo-user">
											<view class="userMessage">
												<image class="userHeard" :src="item.avatar"></image>
												<view class="userNikename">{{ item.author_name }}</view>
											</view>
											<view class="count" @click="clickLike"  :id="item.article_id">
												<image src="../../static/images/heart.svg" v-if="item.liked==0"></image>
												<image src="../../static/images/heart-actived.svg" v-if="item.liked==1"></image>
												{{ item.like_count || 0 }}
											</view>
										</view>
									
								</view>
							</template>
						</u-waterfall>
						<!-- <view v-show="isLoadMore">  //loading加载提示处
							<uni-load-more :status="loadStatus" ></uni-load-more>
						</view> -->
					</view>
			    </view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	// import tcontent from '@/components/content/tcontent.vue'
	// import touring from '@/components/content/touring.vue'
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	// import httpType from '../../httpType.js';
	export default {
		components: {
			uniIcons,
			uniNavBar,
			uniSection,
			// tcontent,
			// touring
		},
		mixins: [MescrollMixin],
		data() {
			return {
				city: '正在定位...',
				province:'',
				state_id:'',
				city_id:'',
				hotAtt:[],
				list:[],
				leftList:[],
				rightList:[],
				token:'',
				liked:'',
				page:1,
				pagesize:6,
				loadStatus:'loading',
				isLoadMore:false,
				item:null
			}
		},
		
		onShow() {
			this.item = getApp().globalData.item,
			console.log('item',this.item)
			this.getCity()
		},
		onLoad() {
			if(this.item == undefined || null){
				this.getAdress()
			}
			
		},
		methods: {
			// 获取当前地理位置
			getAdress(){
				uni.getLocation({
				    type: 'wgs84',
				    success:  (res)=> {
						console.log('地址---',res)
						// if(this.item == undefined){
							this.city = res.city
							this.province = res.province
							uni.request({
								// url:'http://192.168.43.156:8199/user/location',
								// url:'user/location',
								url:'http://121.40.30.19/user/location',
								data:{
									state:this.province,
									city:this.city,
								},
								method:'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded', 
								},
								success: (res) => {
									console.log('获取地址id',res);
									if(res.data.code != 0){
										uni.request({
											url:'http://121.40.30.19/site/hot',
											data:{
												count:3,
												sort_by:3
											},
											success:(res)=>{
												console.log("热门景点=========",res)
												// uni.setStorageSync('description',res.data)
												this.hotAtt = res.data.data
											}
										}),
										uni.request({
											url:'http://121.40.30.19/article/list',
											data:{
												count:6,
												page:1,
												sort_by:1
											},
											success:(res)=>{
												console.log('文章列表',res)
												// uni.setStorageSync('article_id',res.data)
												// console.log('存储文章列表==',res.data)
												this.list = res.data.data.list
												// console.log('list=====',this.list)
											}
										})
									}else{
										uni.setStorageSync('city_id',res.data)
										console.log('存储本地',res.data)
										var city = uni.getStorageSync('city_id')
										console.log('取数据',city)
										uni.request({
											// url:'http://192.168.43.156:8199/site/hot',
											// url:'site/hot',
											url:'http://121.40.30.19/site/hot',
											data:{
												state_id:city.data.state_id,
												city_id:city.data.city_id,
												count:3,
												sort_by:0
											},
											success:(res)=>{
												console.log('热门景点',res)
												this.hotAtt = res.data.data
											}
										}),
										uni.request({
											url:'http://121.40.30.19/article/list',
											data:{
												state_id:city.data.state_id,
												city_id:city.data.city_id,
												count:6,
												page:1,
												sort_by:1
											},
											success:(res)=>{
												console.log('文章列表',res)
												uni.setStorageSync('article_id',res.data)
												this.list = res.data.data.list
											}
										})
									}
									
								}
							})
						
						
					}
				});
			},
			// 城市切换数据
			getCity(){
				this.city = this.item.name
				// this.list = null
				// var city = uni.getStorageSync('city_id');
				uni.request({
					url:'http://121.40.30.19/site/hot',
					data:{
						state_id:this.item.state_id,
						city_id:this.item.city_id,
						count:3,
						sort_by:3
					},
					success:(res)=>{
						console.log("跳转热门景点=========",res)
						// uni.setStorageSync('description',res.data)
						this.hotAtt = res.data.data
					}
				}),
				// 清除旧数据
				this.$refs.uWaterfall.clear()
				uni.request({
					url:'http://121.40.30.19/article/list',
					// url:'http://192.168.43.60:8299/article/list',
					data:{
						state_id:this.item.state_id,
						city_id:this.item.city_id,
						count:6,
						page:1,
						sort_by:1
					},
					// header: {
					// 	'Authorization': this.token
					// },
					success:(res)=>{
						console.log('切换文章列表',res)
						this.list = res.data.data.list
					}
				})
				
			},
			// 热门景点
			getSiteHot() {
				var that = this
				that.city = uni.getStorageSync('city')
				uni.getStorage({
					key:'id',
					success:function(res){
						console.log('热门景点---',res.data)
						that.hotAtt = res.data.data
					}
				})
				
			},
			// 获取文章列表
			getArticleList(){
				var that = this
				var city = uni.getStorageSync('city_id')
				console.log('idid',city)
				uni.getStorage({
					key: 'Authorization',
					success: function(res) {
						console.log("token===>", res.data)
						that.token = res.data
						if(that.token != null){
							uni.request({
								// url:'http://192.168.43.156:8199/article/list',
								// url:'article/list',
								url:'http://121.40.30.19/article/list',
								// url:'http://192.168.43.60:8299/article/list',
								data:{
									state_id:city.data.state_id,
									city_id:city.data.city_id,
									count:6,
									page:1,
									sort_by:1
								},
								header: {
									'Authorization': that.token
								},
								success:res=>{
									console.log('文章列表',res)
									uni.setStorageSync('article_id',res.data)
									console.log('存储文章列表==',res.data)
									that.list = res.data.data.list
									console.log('list=====',that.list)
								}
							})
						}
					}
				})
				
			},
			// 跳转文章详情
			onPageJump(e) {
				console.log(e)
				let id = e.currentTarget.id
				// debugger
				// return
				uni.navigateTo({
					url: "/pages/contentdetail/contentdetail?article_id="+id
				})
			},
			// 点赞
			clickLike(e) {
				// console.log('qwer',e)
				let article = e.currentTarget.id
				var that = this
				var city_id = uni.getStorageSync('city_id')
				var state_id = uni.getStorageSync('state_id')
				uni.getStorage({
					key: 'Authorization',
					success: function(res) {
						console.log("token===>", res.data)
						that.token = res.data
					}
				})
				// uni.request({
				// 	// url:'article',
				// 	url: 'http://121.40.30.19/article',
				// 	data: {
				// 		article_id: article
				// 	},
				// 	header: {
				// 		'Authorization': that.token
				// 	},
				// 	success: function(res) {
				// 		console.log(res.data.data.liked,
				// 			res.data.data.like_count,
				// 			res.data.data.uuid,
				// 			444444
				// 		)
				// 		// console.log('eeeeeeeeeeeeeeee', e)
				// 		console.log('文章详情====', res.data.data)
				// 		uni.setStorageSync('id', res.data)
				// 		that.articleList = res.data.data
				// 		console.log('articleList', that.articleList)
				// 		console.log('liked',that.articleList.liked)
				// 		that.liked = that.articleList.liked
				// 	}
				// })
				
				
			
				uni.request({
						url: 'http://121.40.30.19/user/liked',
						data: {
							article_id: article,
							liked:that.liked == 0 ? 1 : 0
						},
						method: 'POST',
						header: {
							'Authorization': that.token
						},
						success: function(res) {
							console.log('点赞', res)
							if (res.data.code != 0) {
								// debugger
								uni.showModal({
									title: '提示',
									content: '您好，请先登录',
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											uni.redirectTo({
												url: '../login/login'
											})
										}
									}
								})
								return
							}
							uni.request({
								// url:'http://192.168.43.156:8199/article/list',
								// url:'article/list',
								url:'http://121.40.30.19/article/list',
								// url:'http://192.168.43.60:8299/article/list',
								data:{
									state_id:state_id,
									city_id:city_id,
									count:20,
									page:1,
									sort_by:1
								},
								header: {
									'Authorization': that.token
								},
								success:res=>{
									console.log('文章列表',res)
									uni.setStorageSync('article_id',res.data)
									console.log('存储文章列表==',res.data)
									that.list = res.data.data
									// that.leftList = that.list.list
									// that.rightList = that.list.list
									console.log('list=====',that.list.list)
								}
							})
						}
						
					})
			},
			// 设备信息
			// getSystem(){
			// 	uni.getSystemInfo({
			// 		success:function(res){
			// 			console.log('设备信息',res)
			// 		}
			// 	})
			// },
			lookAll(){
				uni.navigateTo({
					url:'/pages/attractionsList/attractionsList'
				})
			},
			toAtt(e){
				console.log('----------------',e)
				uni.navigateTo({
					url:"/pages/positionContent/positionContent?id="+e
				})
			},
			clickLeft() {

				uni.showToast({
					title: '左侧按钮'
				})
			},
			search() {
				uni.showToast({
					title: '搜索'
				})
			},
			showCity() {

				// uni.showToast({
				// 	title: '选择城市'
				// })
				uni.navigateTo({
					url:'../city/city'
				})
				
			},
			
			confirm() {
				// uni.showToast({
				// 	title: '搜索'
				// })
				uni.navigateTo({
					url:'../search/search'
				})
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback(){
				// 第1种: 请求具体接口
				uni.request({
					url: 'http://121.40.30.19/article/list',
					data:{
						count:6,
						page:1,
						sort_by:1
					},
					success: (res) => {
						// console.log('下拉刷新',res)
						// 请求成功,隐藏加载状态
						this.mescroll.endSuccess()
					},
					fail: () => {
						// 请求失败,隐藏加载状态
						this.mescroll.endErr()
					}
				})
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				// this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				// this.mescroll.endSuccess()
				
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			/*上拉加载的回调*/
			upCallback(page) {
				// mescroll.setPageSize(6)
				var city = uni.getStorageSync('city_id')
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				var that = this
				if(that.item == undefined || null){
					uni.request({
						url: 'http://121.40.30.19/article/list?page='+pageNum+'&count='+pageSize,
						data:{
							state_id:city.data.state_id,
							city_id:city.data.city_id,
							
						},
						success: (data) => {
							console.log('data',data)
							// 接口返回的当前页数据列表 (数组)
							let curPageData = data.data.data.list; 
							console.log('curPageData',curPageData)
							// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
							let curPageLen = curPageData.length; 
							console.log('curPageLen',curPageLen)
							// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
							// let totalPage = data.data.data.list; 
							// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
							let totalSize = data.data.data.total; 
							console.log('totalSize',totalSize)
							// 接口返回的是否有下一页 (true/false)
							// let hasNext = data.data.data.list; 
							
							//设置列表数据
							if(page.num == 1) this.list = []; //如果是第一页需手动置空列表
							this.list = this.list.concat(curPageData); //追加新数据
							console.log('list-',this.list)
							// 请求成功,隐藏加载状态
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							// this.mescroll.endByPage(curPageLen, totalPage); 
							
							//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
							this.mescroll.endBySize(curPageLen, totalSize); 
							
							//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
							//this.mescroll.endSuccess(curPageLen, hasNext); 
							
							//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
							//如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
							//如果传了hasNext,则翻到第二页即可显示无更多数据.
							//this.mescroll.endSuccess(curPageLen);
							
							// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
							// 建议使用setTimeout,因为this.$nextTick某些情况某些机型不触发
							setTimeout(()=>{
								this.mescroll.endSuccess(curPageLen)
							},20)
							
							
						},
						fail: () => {
							//  请求失败,隐藏加载状态
							this.mescroll.endErr()
						}
					})
				}else{
					uni.request({
						url: 'http://121.40.30.19/article/list?page='+pageNum+'&count='+pageSize,
						data:{
							state_id:that.item.state_id,
							city_id:that.item.city_id,
							
						},
						success: (data) => {
							console.log('data',data)
							// 接口返回的当前页数据列表 (数组)
							let curPageData = data.data.data.list; 
							console.log('curPageData',curPageData)
							// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
							let curPageLen = curPageData.length; 
							console.log('curPageLen',curPageLen)
							// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
							// let totalPage = data.data.data.list; 
							// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
							let totalSize = data.data.data.total; 
							console.log('totalSize',totalSize)
							// 接口返回的是否有下一页 (true/false)
							// let hasNext = data.data.data.list; 
							
							//设置列表数据
							if(page.num == 1) this.list = []; //如果是第一页需手动置空列表
							this.list = this.list.concat(curPageData); //追加新数据
							console.log('list-',this.list)
							// 请求成功,隐藏加载状态
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							// this.mescroll.endByPage(curPageLen, totalPage); 
							
							//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
							this.mescroll.endBySize(curPageLen, totalSize); 
							
							//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
							//this.mescroll.endSuccess(curPageLen, hasNext); 
							
							//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
							//如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
							//如果传了hasNext,则翻到第二页即可显示无更多数据.
							//this.mescroll.endSuccess(curPageLen);
							
							// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
							// 建议使用setTimeout,因为this.$nextTick某些情况某些机型不触发
							setTimeout(()=>{
								this.mescroll.endSuccess(curPageLen)
							},20)
							
							
						},
						fail: () => {
							//  请求失败,隐藏加载状态
							this.mescroll.endErr()
						}
					})
				}
				
				
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			}
		}
		
	}
</script>

<style scoped>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #aa557f;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}

	.uni-nav-bar-text {
		width:64rpx;
		height:32rpx;
		font-size:32rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:#303133;
		line-height:32rpx;
	}
	.down{
		width: 18rpx;
		height: 18rpx;
	}

	.city {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		/* width: 160rpx;
 */
		margin-left: 28rpx;
	}

	.input-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		max-width: 396rpx;
		min-width: 340rpx;
		height: 72rpx;
		align-items: center;
		flex: 1;
		background:rgba(248,248,248,1);
		border-radius: 36rpx;
		flex-wrap: nowrap;
		margin-left: 24rpx;
	}

	.input-uni-icon {
		width: 28rpx;
		height: 28rpx;
		margin-left: 42rpx;
	}

	.nav-bar-input {
		height: 72rpx;
		line-height: 72rpx;
		/* #ifdef APP-PLUS-NVUE */
		/* #endif */
		font-size: 28rpx;
		color: #C9CAD1;
		margin-left: 12rpx;
		font-size: 28rpx;
	}

	.example-body {
		padding: 0;
	}
	.cus-sty{
		background-color: #F8F8F8;
	}
	/* 热门景点 */
	.hot{
	    display: flex;
	    flex-direction: column;
	}
	.hot .hot-top{
	    display: flex;
	    justify-content: space-between;
	}
	.ht-l{
		width: 160rpx;
		height: 40rpx;
		font-size: 40rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(48,49,51,1);
		line-height:40rpx;
		margin-top: 48rpx;
		margin-left: 32rpx;
	}
	.hot-top .ht-r{
		width: 152rpx;
		height: 28rpx;
	    font-size: 28rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(96,98,102,1);
		line-height:28rpx;
		margin: 54rpx 32rpx 0 0;
		display: flex;
		align-items: center;
	}
	.moreIcon{
		width: 28rpx;
		height: 28rpx;
		margin-left: 12rpx;
	}
	/* 热门景点图 */
	.hot .hot-bot {
	    display: flex;
		margin-top: 32rpx;
	}
	.hb-l{
		width: 360rpx;
		height: 360rpx;
		margin-left: 10rpx;
		position: relative;
	}
	.hb-l image{
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
		background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
	}
	.imgMask{
		width:360rpx;
		height:108rpx;
		background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
		border-radius:0px 0px 4px 4px;
		opacity:0.8;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.hb-r{
		margin: 0 0 0 10rpx;
	}
	.hb-r image{
		width: 100%;
		height: 100%;
		border-radius: 8rpx;
		background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
	}
	.hb-r1{
		width: 360rpx;
		height: 174rpx;
		margin-bottom: 10rpx;
		position: relative;
	}
	.hb-r2{
		width: 360rpx;
		height: 174rpx;
		position: relative;
	}
	.hot-bot  text{
		font-size:32rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:16px;
		position: absolute;
		left: 22rpx;
		bottom: 28rpx;
	}
	/* 正在旅行 */
	.touring{
		margin-top: 24rpx;
	}
	.touring .tourtext{
		width: 160rpx;
		height: 104rpx;
		line-height: 104rpx;
		font-size: 40rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color: #303133;
		margin-left: 32rpx;
		
	}
	.demo-warter-l{
		margin-left:10rpx ;
	}
	.demo-warter {
		margin-top: 0;
		margin-right: 10rpx;
		margin-bottom: 16rpx;
		padding-bottom: 16rpx;
		/* position: relative; */
		background-color: #FFFFFF;
	}
	
	.demo-top{
		position: relative;
	}
	
	.demo-image {
		min-height: 300rpx;
		width: 100%;
		border-radius: 8rpx 8rpx 0 0 ;
		position: relative;
	}
	.adress{
		position: absolute;
		left: 0;
		bottom: 8rpx;
		display: flex;
		align-items: center;
		max-width:240rpx;
		height:40rpx;
		padding-right: 16rpx;
		background:rgba(0,0,0,0.6);
		border-radius:0px 14rpx 0px 0px;
	}
	.adreessIcon{
		width: 24rpx;
		height: 24rpx;
		margin:0 4rpx;
		display: flex;
	}
	.adreessIcon image{
		width: 100%;
		height: 100%;
	}
	.adressText{
		max-width: 192rpx;
		font-size:24rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		/* line-height:24px; */
		/* margin-right: 16rpx; */
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.titleTip{
		display: flex;
		margin-top: 18rpx;
		margin-left: 8rpx;
	}
	.demo-title {
		width: 278rpx;
		/* max-height: 70rpx; */
		font-size: 28rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(48,49,51,1);
		margin-left: 8rpx;
		line-height: 46rpx;
	}
	
	.demo-tag {
		margin-top: 9rpx;
	}
	
	.demo-tag-owner {
		width: 52rpx;
		height: 28rpx;
		text-align: center;
		align-items: center;
		color: #0091FF;
		border: 2rpx solid rgba(0,145,255,1);
		border-radius: 14rpx;
		font-size: 16rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(0,145,255,1);
		/* margin-top: 6rpx; */
	}
	
	.demo-user {
		font-size: 10rpx;
		margin-top: 24rpx;
		/* margin-bottom: 16rpx; */
		display: flex;
		justify-content: space-between;
	}
	.userMessage {
		font-size: 10px;
		font-weight: 900;
		color: #464646;
		display: flex;
		align-items: center;
		}
    .userHeard{
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			margin-left: 14rpx;
		}
		.userNikename{
			font-size: 24rpx;
			margin-left: 16rpx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(96,98,102,1);
		}
		
	
	.count {
		display: flex;
		font-size: 22rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(96,98,102,1);
		align-items: center;
		margin-right: 20rpx;
	}
	.count image{
		width: 26rpx;
		height: 26rpx;
		margin-right: 8rpx;
	}
</style>