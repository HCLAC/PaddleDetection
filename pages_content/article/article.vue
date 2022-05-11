<template>
	<view>
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" title="领途羊旅游管家" :shadow="true">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
		</view>
		<view v-if="loading" class="loadBox">
			<view class="container u-skeleton">
				<view class="loadBlock" v-for="(item, index) in loadEmpty">
					<view class="skeleton-long u-skeleton-rect"></view>
					<view class="skeleton-long u-skeleton-rect"></view>
					<view class="skeleton-long u-skeleton-rect"></view>
					<view class="skeleton-short u-skeleton-rect"></view>
					<view class="skeleton-rect u-skeleton-rect"></view>
				</view>
			</view>
			<!--引用组件-->
			<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		</view>
		
		<view>
			<!-- 游记文章 -->
			<view class="" v-if="articleInfo && articleInfo.type != 2">
				<!-- 内容详情轮播图 -->
				<view class="uni-padding-wrap" >
					<view class="page-section-spacing" width="100%" :style="{ height: swiperHeight }" v-if="articleInfo.type != 4 && articleInfo.type != 5">
						<swiper @change="change" class="swiper" :autoplay="true" circular='true' :indicator-dots="false" @click="ImgSee">
							<swiper-item v-for="(item, index) in articleInfo.images" :key="index">
								<image class="itemImg" :style="{ width: index == 0 ? '100%' : '' }" :mode="index == 0 ? 'widthFix' : 'aspectFit'"
								 :src="item"></image>
							</swiper-item>
						</swiper>
						<view class="imageCount">{{ current + 1 }}/{{ articleInfo.images.length }}</view>
						<view class="dots">
							<block v-for="(item, index) in articleInfo.images" :key="index">
								<view :class="[index == current ? 'activieDot' : 'dot']"></view>
							</block>
						</view>
					</view>
					<view class="page-section-spacing" width="100%" v-else-if="articleInfo.type == 4">
						<video class="videobox" :style="{ height: swiperHeight }" :src="articleInfo.images[1]" object-fit="contain"
						 :poster="articleInfo.images[0]" controls></video>
					</view>
				</view>
				<!-- 内容详情 -->
				<view class="detailContent savebottom">
					<view class="userMse">
						<view class="left">
							<view class="userHeard" @click="tobloggers(articleInfo.author_id)">
								<image lazy-load :src="articleInfo.avatar"></image>
							</view>
							<view class="userMse-r">
								<view class="userNikename">{{ articleInfo.author_name }}</view>
							</view>
						</view>
						<view class="right">
							<view class="followBox" @click="follow()" v-if="!articleInfo.is_follow">
								<image class="followImg" src="/static/images/followIcon.svg"></image>
								关注
							</view>
							<view class="isfollowBox" @click="follow()" v-else-if="articleInfo.is_follow">已关注</view>
						</view>
					</view>
					<!-- 地址 -->
					<view class="adress-1">
						<image src="/static/images/iconMap.svg" class="adreessIcon"></image>
						<view class="adressText" @click="map()">{{ articleInfo.location }}</view>
					</view>
					<!-- 标题 -->
					<!-- <text class="contentTitle" selected=true>{{ articleInfo.title }}</text> -->
					<!-- 内容文章 -->
					<view class="contentText">
						<mp-html ref="parse" class="mp-html" @imgtap="imgTap" @linktap="mpLinktap" :content="articleInfo.content"></mp-html>
					</view>
					<view class="tips">
						<view v-for="item in articleInfo.topics" :key="item.id" @click="toTopic(item.id)">
							<image class="tipsIcon" src="/static/images/topicIcon.svg"></image>
							<text class="tipsText">{{ item.name }}</text>
						</view>
					</view>
					<view class="releaseTime">发布于{{ articleInfo.update_at }}</view>
				</view>
			</view>
			<!-- 攻略文章 -->
			<view class="box-Introduction" v-else-if="articleInfo && articleInfo.type == 2">
				<!-- 内容详情 -->
				<view class="detailContent savebottom">
					<!-- 标题 -->
					<text class="contentTitle" selected='true'>{{ articleInfo.title }}</text>
					<!-- 作者信息 -->
					<view class="userMse">
						<view class="left">
							<view class="userHeard" @click="tobloggers(articleInfo.author_id)">
								<image :src="articleInfo.avatar"></image>
								<!-- <u-image :src="articleInfo.avatar ? articleInfo.avatar : '/static/images/userImg.svg'" @click="tobloggers(articleInfo.author_id)"></u-image> -->
							</view>
							<view class="userMse-r">
								<view class="user-wrap">
									<text class="userNikename" selected=true> {{ articleInfo.author_name }}</text>
									<view class="author_tag">作者</view>
								</view>
								
								<view class="releaseTime-strategy" style="background-color: #fff;"> 领途羊签约作者 </view>
							</view>
						</view>
						<view class="right">
							<view class="followBox" @click="follow()" v-if="!articleInfo.is_follow">
								<image class="followImg" src="/static/images/followIcon.svg"></image>
								关注
							</view>
							<view class="isfollowBox" @click="follow()" v-else>已关注</view>
						</view>
					</view>
					<!-- 内容文章 -->
					<view class="contentText">
						<mp-html ref="parse" class="mp-html" @imgtap="imgTap" @linktap="mpLinktap" :content="articleInfo.content"></mp-html>
					</view>
					<!-- 地址 -->
					<view class="adress" style="margin-top: 10rpx;">
						<image src="/static/images/iconMap.svg" class="adreessIcon"></image>
						<view class="adressText" @click="map()">{{ articleInfo.location }}</view>
					</view>
				</view>
				<!-- 话题 -->
				<view>
					<view class="tips">
						<view v-for="item in articleInfo.topics" :key="item.id" @click="toTopic(item.id)">
							<image class="tipsIcon" src="/static/images/topicIcon.svg"></image>
							<text class="tipsText">{{ item.name }}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 评论区 -->
			<view v-if="articleInfo && articleInfo.type != 2">
				<view class="replyLine"></view>
				<view class="replyBox">
					<view class="replyText" v-if="comment_count == 0">
						暂无评论
					</view>
					<view class="replyText" v-if="comment_count > 0">
						共{{comment_count}}条评论
					</view>
					<view class="replyContent">
						<view class="myReply">
							<image class="userImg" lazy-load :src="userInfo.avatar?userInfo.avatar:'/static/images/userImg.svg'"></image>
							<view class="replyInput" @click="sendReply">
								写个回复走个心
							</view>
						</view>
						<view class="reply" v-for="(item,index) in commentsList" :key="index">
							<view class="replyTop">
								<image class="userImg" lazy-load :src="item.avatar?item.avatar:'/static/images/userImg.svg'"></image>
								<view class="topBox">
									<view class="boxOne">
										<view class="userName">{{item.account_name}}</view>
										<view class="replyTime">
											{{item.create_at.slice(0,10)}}
										</view>
									</view>
									<view class="boxTwo">
										<view class="min-box" @click="replyLike(item, index)">
											<image class="replyLike" :src="item.like == 1?'/static/images/attLikeA.svg':'/static/images/attLike.svg'" ></image>
										</view>
										<view class="min-box" @click="toReport(item.id)">
											<image class="report" src="/static/images/report.svg" ></image>
										</view>
									</view>
								</view>
							</view>
							<view class="replyBottom">
								{{item.content}}
							</view>
						</view>
					</view>
					<view class="moreReply" v-if="comment_count > 3" @click="toMoreReply">
						查看全部{{comment_count}}条评论
					</view>
				</view>
				<view class="safeBox"></view>
			</view>
			<!-- 评论区 攻略文章 -->
			<view v-if="articleInfo && articleInfo.type == 2">
				<view style="width: 750rpx;height: 20rpx;background: #F6F6F8;margin-top: 28rpx;"></view>
				<!-- 分享点赞收藏 -->
				<view class="bottom-gl">
					<view class="like" @click="clickLike">
						<!-- <image class="likeBtn" :src="articleInfo.liked?'/static/images/attHeartActive.svg':'/static/images/attheart.svg'"></image> -->
						<view v-if="isAnimate" class="icon-animate"></view>
						<view v-else :class="articleInfo.liked?'has-like':'icon-like'"></view>
					</view>
					<view class="likeNum">{{ articleInfo.like_count }}</view>
					
					<view class="fav" @click="clickFav">
						<image class="favBtn" :src="articleInfo.fav == 1?'/static/images/attFavA.svg':'/static/images/attFav.svg'"></image>
					</view>
					<view class="favNum">{{ articleInfo.fav_count }}</view>
					
					<view class="share"  @click="share">
						<image src="/static/images/shareIcon.svg"></image>
					</view>
				</view>
				<view class="replyBox">
					<view class="replyText" v-if="comment_count == 0">
						暂无评论
					</view>
					<view class="replyText" v-if="comment_count > 0">
						共{{comment_count}}条评论
					</view>
					<view class="replyContent">
						<view class="myReply">
							<image class="userImg" lazy-load :src="userInfo.avatar?userInfo.avatar:'/static/images/userImg.svg'"></image>
							<view class="replyInput" @click="sendReply">
								写个回复走个心～
							</view>
						</view>
						<view class="reply" v-for="(item,index) in commentsList" :key="index">
							<view class="replyTop">
								<image class="userImg" lazy-load :src="item.avatar?item.avatar:'/static/images/userImg.svg'"></image>
								<view class="topBox">
									<view class="boxOne">
										<view class="userName">{{item.account_name}}</view>
										<view class="replyTime">
											{{item.create_at.slice(0,10)}}
										</view>
									</view>
									<view class="boxTwo">
										<view class="min-box" @click="replyLike(item, index)">
											<image class="replyLike" :src="item.like == 1?'/static/images/attLikeA.svg':'/static/images/attLike.svg'" ></image>
										</view>
										<view class="min-box" @click="toReport(item.id)">
											<image class="report" src="/static/images/report.svg" ></image>
										</view>
									</view>
								</view>
							</view>
							<view class="replyBottom">
								{{item.content}}
							</view>
						</view>
					</view>
					<view class="moreReply" v-if="comment_count > 3" @click="toMoreReply">
						查看全部{{comment_count}}条评论
					</view>
				</view>
				<view class="safeBox" style="height: 180rpx;"></view>
			</view>
		</view>
		
		<!-- 登录 -->
		<view class="bottom" v-if="articleInfo && articleInfo.type != 2">
			<view class="bottom-text" @click="sendReply">
				撩点什么…
			</view>
			<view class="like" @click="clickLike">
				<!-- <image class="likeBtn" :src="articleInfo.liked?'/static/images/attHeartActive.svg':'/static/images/attheart.svg'"></image> -->
				<view v-if="isAnimate" class="icon-animate"></view>
				<view v-else :class="articleInfo.liked?'has-like':'icon-like'"></view>
			</view>
			<view class="likeNum">{{ articleInfo.like_count }}</view>
			
			<view class="fav" @click="clickFav">
				<image class="favBtn" :src="articleInfo.fav == 1?'/static/images/attFavA.svg':'/static/images/attFav.svg'"></image>
			</view>
			<view class="favNum">{{ articleInfo.fav_count }}</view>
			
			<view class="share"  @click="share">
				<image src="/static/images/shareIcon.svg"></image>
			</view>
		</view>
		<!-- 评论输入框 -->
		<u-popup v-model="textareafocus" mode="bottom" :mask-custom-style="{background: 'rgba(0, 0, 0, 0)'}">
			<view class="commentInput" :style="{'padding-bottom': keywordHeight}" v-if="textareafocus">
				<textarea class="inputK" v-model="contentText" placeholder="撩点什么..." :show-confirm-bar="false" :focus="textareafocus"
				 @blur="inputBlur" :auto-height="autoHeight" maxlength="140"
				 :adjust-position="false"></textarea>
				<view class="send" @click="pubComment">发送</view>
			</view>
		</u-popup>
		<!-- 弹窗 -->
		<u-modal v-model="show" :content="content" :border-radius="40" :z-index="9999" :show-title="false" :show-cancel-button="true" @confirm="confirm"></u-modal>
		<!-- 我要提问按钮 -->
		<view class="answersFollow" v-if="consulting && articleInfo && articleInfo.type == 2">
			<view class="answersLeft">
				<view class="border-img">
					<image src="@/static/images/border-jian.png" mode=""></image>
				</view>
				<view class="left_img">
					<image :src="consulting.avatar ? consulting.avatar : '/static/images/logo.png'" mode=""></image>
				</view>
				<view class="left_txt">
					在线中
				</view>
			</view>
			<view class="answersCenter">
				<view class="center-top">
					<view class="top-left">
						{{consulting.name}}
					</view>
					<view class="top-right">
						{{professionObj1[consulting.profession]}}
					</view>
				</view>
				<view class="center-btm">
					{{consulting.company}}
				</view>
			</view>
			<view class="answersRight" @click="toChatroom">
				<view class="right-img">
					<image src="@/static/images/wz.png" mode=""></image>
				</view>
				<text>咨询Ta</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				professionObj1: {
					'0': '导游',
					'1': '旅游达人',
					'2': '旅游定制师'
				},
				consulting: null,
				// isShow: true,
				keywordHeight: '0px',
				showText:false,
				current: 0,
				list: [],
				title: '领途羊',
				articleInfo:{},
				articleSEO: {
					title: '',
					keywords: '',
					description: ''
				},
				article_id: '',
				hasLogin: true,
				wechat_id: null,
				swiperHeight: '',
				serviceProvider: '',
				content: '',
				contentText: '',
				show: false,
				value: '',
				commentsList: [],
				comment_count: '',
				userInfo: {},
				focus: false,
				autoHeight: true,
				textareafocus: false,
				// 骨架屏
				loadEmpty:[1,2,3],
				loading: true,
				// 动效
				isAnimate: false,
				// 防止用户快速点击，多次请求
				hasLikeClick: false,
				hasFavClick: false,
				hasReplyClick: false,
				// 数据采集
				trace_info: null,
				rn: null,
				joinTime: 0
			};
		},
		//#ifdef H5
		metaInfo() {
			return {
				title: this.articleSEO.title+"-领途羊", // set a title
				meta: [{                 // set meta
					name: 'keywords',
					content: this.articleSEO.keywords
				},
				{                 // set meta
					name: 'description',
					content: this.articleSEO.description
				}]
			}
		},
		// #endif
		created() {
			// 监听从博主页面发来的信息
			uni.$on('onBlogStatus', is_follow => {
				this.articleInfo.is_follow = is_follow
			})
			// 监听从博主页面发来的信息
			uni.$once('onLoginSuccess', first_login => {
				if (!first_login){
					this.getUserInfo()
					this.getComments()
					this.loadData();
				}
			})
		},
		mounted(){
			this.loadData();
			this.getInfo()
		},
		// #ifdef MP-BAIDU
		onInit(query) {
		// #endif
		// #ifndef MP-BAIDU
		onLoad(query) {
		// #endif
			this.serviceProvider = getApp().globalData.serviceProvider
			this.article_id = query.article_id
			// 搜索数据采集
			this.trace_info = query.trace_info?query.trace_info:null
			this.rn = query.rn?query.rn:null
			this.joinTime = Number((new Date().getTime())/1000).toFixed(0)
			
			this.getUserInfo()
			this.getComments()
		},
		
		onReady() {
			//#ifdef MP-BAIDU
			swan.showFavoriteGuide({
			    type: 'tip'
			})
			swan.onKeyboardHeightChange(res => {
				if (res.height === 0){
					this.showText = false 
				}
				this.keywordHeight = (res.height + 60)+'px'
			});
			//#endif
		},
		onShow() {
			this.hasLogin = getApp().globalData.Authorization ? true : false;
			// this.isShow && this.loadData()
			// this.isShow = false
		},
		methods: {
			toChatroom() {
				this.HTTP.request({
					url: '/bulter/consulting',
					method: 'POST',
					data:{
						bulter_id: this.consulting.bulter_id
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						var info = res.data.data
						console.log(info, '管家列表')
						if(info.history.length > 0){
							uni.navigateTo({
								url:'/pages_im/chatroom/chatroom?search_id=' + info.search_id,
							})
						}else{
							uni.navigateTo({
								url:'/pages_im/problem/problem?bulter_id=' + info.bulter_id,
							})
						}
					}
				});
				// console.log('管家列表', this.bulter_id)
				// if (this.bulter_id) {
				// 	uni.navigateTo({
				// 		url: '/pages_im/problem/problem?bulter_id=' + this.bulter_id
				// 	})
				// }
			},
			//管家信息
			getInfo() {
				this.HTTP.request({
					url: '/bulter/market',
					method: 'GET',
					data: {
						type: 0,
						article_id: this.article_id
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
			
						this.consulting = res.data.data
						this.bulter_id = res.data.data.bulter_id
						console.log(this.consulting, '管家列表')
					}
				});
			},
			ImgSee(){
				uni.previewImage({
					current:this.current,
					urls: this.articleInfo.images,
				});
			},
			loadData(){
				uni.showLoading({
					title: '加载中',
					mask: true,
					success: () => {
					},
					complete: () => {
						this.loading = true
						this.getArticleDetail();
					}
				});
			},
			hideLoad(){
				setTimeout(() => {
					this.loading = false
					uni.hideLoading();
				}, 300);
			},
			mpLinktap(e) {
				// #ifdef H5
				if(e['data-url']){
					window.location.href = e['data-url']
				} else if (e['data-weixin']){
					uni.setClipboardData({
						data: e['data-weixin'],
						success: () => {
							uni.showToast({
								title: '复制成功',
								icon: 'success'
							});
						}
					});
					window.location.href = "weixin://"
				}
				return
				// #endif
				if(e['data-url']){
					uni.navigateTo({
						url: '../webview/webview?url=' + encodeURIComponent(e['data-url'])
					});
				} else if (e['data-weixin']){
					uni.setClipboardData({
						data: e['data-weixin'],
						success: () => {
							uni.showToast({
								title: '复制成功',
								icon: 'success'
							});
						}
					});
				}
			},
			// 获取文章详情
			getArticleDetail() {
				var that = this;
				this.HTTP.request({
					url: '/article',
					retry: -1,
					data: {
						article_id: that.article_id
					},
					success: async function(res) {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						var articleInfo = res.data.data
						that.title = articleInfo.title
						that.articleSEO.title = articleInfo.title
						that.articleSEO.keywords = articleInfo.keywords
						that.articleSEO.description = articleInfo.description
						// 适配字体
						articleInfo.content = articleInfo.content.replace(/(\d+)px/g, function(s, t) {
							s = s.replace('px', '');
							var value = parseInt(s) * 2; //   此处 1rem =120px
							return value + 'rpx';
						});
						// 处理文章图片，先处理图片，再处理营销组件，因为组件中的图片不需要处理
						let article_images = articleInfo.content.match(/<img[^>]*\/>/gi);
						let image_in_page = []
						if (article_images != null && article_images.length > 0){
							for (var i=0;i<article_images.length;i++){
								var item = article_images[i]
								let obj = item.split('"')
								if (image_in_page.length < 3 && obj[1].indexOf("lingtuyang.cn")!=-1){
									let src2 = that.Utils.addImageProcess(obj[1], true, 60)
									image_in_page.push(src2)
								}
								
								if (obj[0].indexOf("src") === -1 || !obj || obj.length < 8){
									console.warn("未知图片格式：", item)
									if (obj[1].indexOf("lingtuyang.cn")!=-1){
										let src = that.Utils.addImageProcess(obj[1], true, 60)
										articleInfo.content = articleInfo.content.replace(obj[1], src);
									}
									continue
								}
								let src = that.Utils.addImageProcess(obj[1], true, 60)
								let width = obj[5]
								// let height = obj[7]
								let heightR = (obj[7]*750/width).toFixed(0)
								let img = '<img src="'+src+'" style="width:750rpx;height:'+heightR+'rpx;"/>'
								articleInfo.content = articleInfo.content.replace(item, img);
							}
						}
						// 处理营销组件
						// let inputComponets = articleInfo.content.match(/<input[^>]*\/>/gi);
						// if (inputComponets != null && inputComponets.length > 0){
						// 	for (var i=0;i<inputComponets.length;i++){
						// 		var item = inputComponets[i]
						// 		let strValue = item.match(/name="(\S*)"/);
						// 		var replaceStr = ''
						// 		if (strValue != null && strValue.length == 2){
						// 			var id = strValue[1]
						// 			if (item.indexOf("营销组件")!=-1){
						// 				let component = await that.asyncGetComponentInfo('/marketing/unit', {
						// 														group_id: id,
						// 														article_id: that.article_id
						// 													});
						// 				if (component.data.code != 0) {
						// 					console.error('获取营销组件信息失败', component)
						// 					replaceStr = ""
						// 				} else {
						// 					var obj = component.data.data
						// 					replaceStr = that.generateWeixinMarketingGroup(obj)
						// 					articleInfo.content = articleInfo.content.replace(item, replaceStr);
						// 					// console.log("营销组件", replaceStr)
						// 				}
						// 			} else if (item.indexOf("在线客服")!=-1){
						// 				// #ifndef H5
						// 				articleInfo.content = articleInfo.content.replace(item, '');
						// 				// #endif
						// 				// #ifdef H5
						// 				let component = await that.asyncGetComponentInfo('/online/call', {id:id});
						// 				if (component.data.code != 0) {
						// 					console.error('获取在线客服信息失败', component)
						// 					replaceStr = ""
						// 				} else {
						// 					var obj = component.data.data
						// 					replaceStr = that.generateOnlineCustomer(obj)
						// 					articleInfo.content = articleInfo.content.replace(item, replaceStr);
						// 					// console.log("在线客服", replaceStr)
						// 				}
						// 				// #endif
						// 			} else if (item.indexOf("小程序")!=-1){
						// 				// #ifndef H5
						// 				articleInfo.content = articleInfo.content.replace(item, '');
						// 				// #endif
						// 				// #ifdef H5
						// 				let component = await that.asyncGetComponentInfo('/miniapp/call', {id:id});
						// 				if (component.data.code != 0) {
						// 					console.error('获取小程序信息失败', component)
						// 					replaceStr = ""
						// 				} else {
						// 					console.log('component', component)
						// 					var obj = component.data.data
						// 					replaceStr = that.generateMiniapp(obj)
						// 					articleInfo.content = articleInfo.content.replace(item, replaceStr);
						// 					// console.log("在线客服", replaceStr)
						// 				}
						// 				// #endif
						// 			}
						// 		}
						// 	}
						// }
						articleInfo.avatar = that.Utils.addImageProcess(articleInfo.avatar, false, 60)
						articleInfo.images.forEach((item1, index1) => {
							articleInfo.images[index1] = that.Utils.addImageProcess(item1, true, 80)
						})
						//#ifdef MP-BAIDU
						swan.setPageInfo({
							title: articleInfo.title,
							articleTitle: articleInfo.title,
							keywords: articleInfo.keywords,
							description: articleInfo.description,
							image: image_in_page,
							releaseDate: articleInfo.update_at,
							likes: articleInfo.like_count,
							collects: articleInfo.fav_count,
							visit: {pv:articleInfo.visit_count+''},
						})
						//#endif
						
						that.articleInfo = articleInfo;
						that.$forceUpdate()
						// 除了攻略文章，其他计算轮播图高度
						if (articleInfo.type != 2){
							that.$nextTick(() => {
								uni.getImageInfo({
									src: that.articleInfo.images[0],
									success: function(image) {
										console.log('图片高度--', image);
										let caseRes = image.width / image.height;
										that.swiperHeight = 100 / caseRes + 'vw';
									},
									fail: error => {
										console.error(error);
									}
								});
							});
						}
						that.hideLoad();
					},
					fail: () => {
						that.hideLoad();
					}
				});
			},
			async asyncGetComponentInfo(url, data){
				return new Promise((resolve, reject) => {
					this.HTTP.request({
						url: url,
						method: 'get',
						data: data,
						success: res => {
							resolve(res,'组件信息');
						},
						fail: error => {
							reject(error);
						}
					});
				});
			},
			generateWeixinMarketingGroup(obj){
				return `  <div style="display: flex;
						align-items: center;
						width: 347px;
						height: 54px;
						background: #FFE512;
						border-radius: 4px;
						padding: 0 10px;
						margin: 0 auto;
						position: relative;
					  ">
					  <a data-weixin='`+obj.wechat_id+`'/>
						  <div style="width: 34px;height: 34px;
						  position: absolute;
						  top:10px;
						  ">
						  </div>
						<div style="font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #303133;
						line-height: 20px;
						margin-left: 8px;"
						>
						  ${obj.template}
						</div>
						<div style="width: 104px;
						height: 29px;
						background: #FFFFFF;
						box-shadow: 0px 8px 28px 0px rgba(0, 0, 0, 0.05);
						border-radius: 20px;
						font-size: 12px;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #303133;
						line-height: 17px;
						display: flex;
						justify-content: center;
						align-items: center;
						position: absolute;
						top:12px;
						left:160px;
						
						margin-left: 63px;">
						  复制导游微信
						</div>
					  </div>
					`;
			},
			generateOnlineCustomer(obj){
				return `<div class="box marketting_component" style="width: 100%;
			  height: 130px;
			  position: relative;
			"> 
							<a data-url='`+obj.url+`'/>
			    <img class="component_img box-img" src="https://lingtuyang-prod.oss-cn-hangzhou.aliyuncs.com/marketing_group/bjt.png" alt="" style="	width: 100%;
			    height: 100%;
			    position: absolute;
			    pointer-events: none; 
			    top: 0;
			  ">
			    <div class="box-one" style="	position: absolute;
			    top: 40px;
			    left: 32px;
			    width: 51px;
			    height: 51px;
			    z-index: 1;
						  border-radius: 50%;
			  ">
			      <img class="component_img box-one-img" src="` + obj.avatar + `" alt="" style="	width: 100%;
			      height: 100%;border-radius: 50%;
			    ">
			    </div>
			    <div class="box-two" style="	position: absolute;
			    top: 50px;
			    left: 98px;
			    font-size: 16px;
			    color: #303133;
			    font-weight: 600;
			  ">` + obj.nickname + `</div>
			    <div class="box-there" style="	position: absolute;
			    top: 48px;
			    right: 34px;
			    width: 88px;
			    height: 30px;
			    font-size: 14px;
			    font-weight: 600;
			    color: #FFFFFF;
			    background: linear-gradient(90deg, #FF5A79 0%, #FF74B4 100%);
			    box-shadow: 0px 3px 15px 0px rgba(255, 115, 178, 0.35);
			    border-radius: 20px;
			    display: flex;
			    justify-content: center;
			    align-items: center;
			  ">点击咨询</div>
			    <div class="box-min" style="	position: absolute;
			    width: 37px;
			    height: 12px;
			    font-size: 9px;
			    font-weight: 400;
			    background: linear-gradient(90deg, #FF5A79 0%, #FF74B4 100%);
			    color: #FFFFFF;
			    display: flex;
			    justify-content: center;
			    align-items: center;
			    top: 85px;
			    left: 39px;
			    z-index: 2;
			  ">在线中</div>
			    <div class="bk" style="	width: 57px;
			    height: 57px;
			    border-radius: 50%;
			    border: 2px solid #FF5A79;
			    position: absolute;
			    top: 35px;
			    left: 27px;
			  "></div>
			    <div class="pulse"></div>
			  </div>`
						},
			generateMiniapp(obj){
				return `<div class='marketting_component' style="
						width: 347px;
			  display: flex;
			  align-items: center;
			  height: 74px;
			  background: #F4F5F7;
			  border-radius: 4px;
			  padding: 0 10px;
						position: relative;
			  margin: 0 auto;"
			  >
						<a data-url='`+obj.url+`'/>
						
			    <div style="width: 54px;
			    height: 54px;
							position: absolute;
							top:10px;
			    border-radius: 4px;">
			      <img src="` + obj.avatar + `" alt="" style="width: 100%;height: 100%;border-radius: 4px;">
			    </div>
			    <div style="width: 238px;
			    font-size: 14px;
			    font-family: PingFangSC-Medium, PingFang SC;
			    font-weight: 500;
			    margin: 0 10px;
			    color: #303133;
						  position: absolute;
						  left:80px;
						  top:-10px;
			    line-height: 20px;">
			      ` + obj.description + `
			    </div>
						  
			    <div style="width:14px;height:14px;margin-left: 10px;
						  position: absolute;
						  right:20px;
						  bottom:35px;
						  ">
			      <img src="https://lingtuyang-prod.oss-cn-hangzhou.aliyuncs.com/marketing_group/you.png" alt="">
			    </div>
			  </div>`
			},
			imgTap(e) {
				return false;
			},
			// 跳转博主详情页
			tobloggers(id) {
				uni.navigateTo({
					url: '/pages_article/bloggers/bloggers?author_id=' + id
				});
			},
			// 跳转话题页
			toTopic(id) {
				uni.navigateTo({
					url: '/pages_article/topicList/topicList?id=' + id
				});
			},
			// 关注
			follow() {
				if(!this.hasLogin){
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
					return
				}
				var that = this;
				let status = this.articleInfo.is_follow ? 0 : 1;

				if (status == 0) {
					that.show = true;
					that.content = '确认取消关注?';
					return
				}
				this.HTTP.request({
					url: '/user/follow',
					data: {
						author_id: that.articleInfo.author_id,
						follow: status
					},
					method: 'POST',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							if (res.data.code == 10303){
								that.articleInfo.is_follow = true
								return
							}
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						that.articleInfo.is_follow = true
					}
				});
			},
			// 点击确认
			confirm() {
				var that = this;
				this.HTTP.request({
					url: '/user/follow',
					data: {
						author_id: that.articleInfo.author_id,
						follow: 0
					},
					method: 'POST',
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							if (res.data.code == 10304){
								that.articleInfo.is_follow = false
								return
							}
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						that.articleInfo.is_follow = false
					}
				});
			},
			login(){
				uni.navigateTo({
					url: '/pages_mine/login/login'
				});
			},
			// 用户信息
			getUserInfo() {
				uni.getStorage({
					key: 'userinfo',
					success: res => {
						var userInfo = res.data 
						userInfo && (userInfo.avatar = this.Utils.addImageProcess(userInfo.avatar, false, 60)) 
						this.userInfo = userInfo
					}
				}); 
			}, 
			// 举报
			toReport(id) {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
					return
				}
				uni.navigateTo({
					url: '/pages_article/report/report?id=' + id
				})
			},
			sendReply() {
				console.log(123123)
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
					return
				}
				// #ifdef MP-BAIDU
				swan.openReplyEditor({
					sendText: '发送',
					contentPlaceholder: '撩点什么...',
					success: res => {
                        if (res.status === 'reply' || res.status === 'replay') {
							this.contentText = res.content
							this.pubComment()
							// 主动关闭评论发布器
							swan.closeReplyEditor();
						}
					},
					fail: err => {
						console.log('fail', err)
					}
				});
				return
				// #endif
				this.showText = true
				this.textareafocus = true
			},
			inputBlur() {
				// #ifdef MP-BAIDU
				return
				// #endif
				this.showText = false
				this.textareafocus = false
			},
			pubComment() {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
					return
				}
				if (this.contentText.length == 0){
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none'
					});
					return
				}
				var that = this
				this.HTTP.request({
					url: '/comments',
					data: {
						article_id: this.article_id,
						content: this.contentText
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
						this.contentText = ''
						//#ifndef MP-BAIDU
						uni.hideKeyboard();
						//#endif
						this.getComments()
						uni.showToast({
							title: '评论成功',
							icon: 'none',
							duration: 2000
						})
						if (that.trace_info && that.rn) {
							that.Opensearch.uploadData({
								trace_info: that.trace_info,
								rn: that.rn,
								item_id: that.article_id,
								bhv_type: 'collect'
							})
						}
					}
				})
			},
			// 获取评论列表
			getComments() {
				this.HTTP.request({
					url: '/comments/list',
					data: {
						article_id: this.article_id,
						page: 1,
						count: 3
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						var commentsList = res.data.data.list
						commentsList && commentsList.forEach((item1, index1) => {
							item1.avatar = this.Utils.addImageProcess(item1.avatar, false, 60)
						})
						this.commentsList = commentsList
						this.comment_count = res.data.data.total==0?'':res.data.data.total
					}
				});
			},
			// 评论点赞
			replyLike(item, index) {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
					return
				}
				
				if (this.hasReplyClick) {
					return;
				}
				this.hasReplyClick = true;
				var that = this
				this.HTTP.request({
					url: '/comments/likes',
					data: {
						id: item.id,
						like: item.like == 0 ? 1 : 0
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
						that.commentsList[index].like = item.like == 0 ? 1 : 0
					},
					complete: () => {
						that.hasReplyClick = false;
					}
				});
			},
			// 查看更多评论
			toMoreReply() {
				uni.navigateTo({
					url: '/pages_article/comments/comments?article_id=' + this.article_id
				})
			},
			// 点赞
			clickLike() {
				var that = this;
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
					return
				}
				if (this.hasLikeClick) {
					return;
				}
				if (this.articleInfo.liked == 0){
					this.isAnimate = true
					setTimeout(() => {
					    this.isAnimate = false;
					}, 800);
				}
				this.hasLikeClick = true;
				this.HTTP.request({
					url: '/user/liked',
					data: {
						article_id: that.article_id,
						liked: that.articleInfo.liked == 0 ? 1 : 0
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
						that.articleInfo.liked = res.data.data.liked
						that.articleInfo.like_count = res.data.data.like_count
						
						if (that.trace_info && that.rn) {
							that.Opensearch.uploadData({
								trace_info: that.trace_info,
								rn: that.rn,
								item_id: that.article_id,
								bhv_type: 'like'
							})
						}
					},
					complete: () => {
						that.hasLikeClick = false;
					}
				});
			},
			// 收藏
			clickFav() {
				var that = this;
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
					return
				}
				
				if (this.hasFavClick) {
					return;
				}
				this.hasFavClick = true;
				this.HTTP.request({
					url: '/user/favorite',
					data: {
						article_id: that.article_id,
						favorite: that.articleInfo.fav == 1 ? 0 : 1
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
						that.articleInfo.fav = res.data.data.fav
						that.articleInfo.fav_count = res.data.data.fav_count
						if (that.trace_info && that.rn) {
							that.Opensearch.uploadData({
								trace_info: that.trace_info,
								rn: that.rn,
								item_id: that.article_id,
								bhv_type: 'collect'
							})
						}
					},
					complete: () => {
						that.hasFavClick = false;
					}
				});
			},
			change(e) {
				this.current = e.detail.current;
			},
			map() {
				var that = this;

				const latitude = that.articleInfo.latitude;
				const longitude = that.articleInfo.longitude;
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					success: function() {
						console.log('success');
					}
				});
			},
			share() {
				uni.showShareMenu({
					title: this.articleInfo.title,
					content: this.articleInfo.description,
					imageUrl: this.articleInfo.cover_image,
					// path: 'pages_content/article/article?article_id=' + this.article_id,
					success() {
					},
					complete() {
					}
				});
				this.showText = false
			},
			back(){
				this.recordStayAndRead()
				this.Utils.back()
				
			},
			home(){
				this.recordStayAndRead()
				this.Utils.home()
			},
			recordStayAndRead(){
				var that = this
				let curT = Number((new Date().getTime())/1000).toFixed(0)
				if (that.trace_info && that.rn) {
					that.Opensearch.uploadData({
						trace_info: that.trace_info,
						rn: that.rn,
						item_id: that.article_id,
						bhv_type: 'stay',
						bhv_value: ''+ (curT - this.joinTime)
					})
					if (curT - this.joinTime > 3){
						that.Opensearch.uploadData({
							trace_info: that.trace_info,
							rn: that.rn,
							item_id: that.article_id,
							bhv_type: 'read'
						})
					}
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
.answersFollow {
		position: fixed;
		margin: auto;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 150rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
		background: #FFFFFF;
		box-shadow: 0px -16rpx 56rpx 0px rgba(0, 0, 0, 0.05);
		display: flex;
		// align-items: center;
		// justify-content: space-between;
		z-index: 10;

		.answersLeft {
			position: relative;
			// margin-left: 26rpx;
			left: 26rpx;
			margin-top: 18rpx;

			.border-img {
				width: 108rpx;
				height: 108rpx;
				position: absolute;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.left_img {
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
				overflow: hidden;
				position: absolute;
				left: 10rpx;
				top: 10rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.left_txt {
				width: 70rpx;
				height: 34rpx;
				background: #FFE512;
				border-radius: 8rpx;
				font-size: 18rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #303133;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 88rpx;
				left: 20rpx;
			}
		}

		.answersCenter {
			margin-left: 152rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.center-top {
				display: flex;
				align-items: center;

				.top-left {
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #303133;
				}

				.top-right {
					margin-left: 20rpx;
					padding: 4rpx 8rpx;
					height: 34rpx;
					background: #EDEFF2;
					border-radius: 8rpx;
					font-size: 18rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #303133;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}

		.answersRight {
			position: absolute;
			right: 28rpx;
			top: 34rpx;
			width: 196rpx;
			height: 76rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			border: 2rpx solid #303133;
			display: flex;
			align-items: center;

			.right-img {
				width: 56rpx;
				height: 56rpx;
				margin-left: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			text {
				font-size: 28rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #303133;
			}
		}
	}

	page {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	/deep/.contextText {
		swan-image{
			width: 100%!important;
		}
	}
	
	.mp-html{
		 overflow: hidden;
		 text-align: justify;
	}
	.loadBox{
		width: 100%;
		height: auto;
		margin: 40rpx 28rpx 0rpx;
		.loadBlock{
			.skeleton-long{
				margin-top: 20rpx;
				width: 694rpx;
				height: 20rpx;
			}
			.skeleton-short{
				margin-top: 20rpx;
				width: 90rpx;
				height: 20rpx;
			}
			.skeleton-rect{
				margin-top: 40rpx;
				width: 694rpx;
				height: 390rpx;
			}
		}
	}
	.min-box{
		width: 60rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 10rpx;
	}

	/* 轮播图 */
	.page-section-spacing {
		position: relative;
		width: 100%;
		.swiper {
			width: 100%;
			height: 100%;
			.itemImg {
				width: 100%;
				height: 100%;
			}
		}
		
		.videobox {
			width: 100%;
			min-height: 420rpx;
			max-height: 1000rpx;
		}
		
		.imageCount {
			height: 40rpx;
			background-color: rgba(0, 0, 0, 0.6);
			border-radius: 20rpx;
			text-align: center;
			line-height: 40rpx;
			font-size: 22rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			position: absolute;
			right: 28rpx;
			bottom: 28rpx;
			padding: 0 12rpx;
		}
		//标记点样式
		.dots {
			width: 100%;
			height: 10rpx;
			display: flex;
			justify-content: center;
			position: absolute;
			/* left: 320rpx; */
			background: #ffff;
			bottom: -20rpx;
		
			.dot {
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				background: rgba(221, 221, 221, 1);
				margin-right: 8rpx;
			}
		
			.activieDot {
				width: 20rpx;
				height: 10rpx;
				background: rgba(48, 49, 51, 1);
				border-radius: 3px;
				margin-right: 8rpx;
			}
		}
	}
	/* 内容详情 */

	// ios底部安全距离-padding
	.savepadding {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
	}

	// ios底部安全距离-bottom
	.savebottom {
		bottom: constant(safe-area-inset-bottom);
		bottom: env(safe-area-inset-bottom);
	}

	// 用户信息
	.userMse {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 28rpx;
		margin-top: 40rpx;
		.left{
			display: flex;
			align-items: center;
			.userHeard {
				width: 90rpx;
				height: 90rpx;
				background-image: url('/static/images/userImg.svg');
				background-repeat: no-repeat;
				background-position: 50%;
				border-radius: 50%;
				background-size:80rpx 80rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.userMse-r {
				margin-left: 20rpx;
				.userNikename {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: bold;
					color: rgba(48, 49, 51, 1);
					line-height: 28rpx;
				}
				.user-wrap{
					display: flex;
					align-items: center;
					.author_tag{
						margin-left: 10rpx;
						text-align: right;
						font-size: 18rpx;
						color: #A86B13;
						font-weight: 600;
						width: 92rpx;
						height: 40rpx;
						line-height: 40rpx;
						background-image: url('/static/images/author_tag_bg.svg');
						background-repeat: no-repeat;
						background-size:100% 100%;
						padding-right: 10rpx;
						box-sizing: border-box;
					}
				}
			}
			.userMse-r {
				margin-left: 20rpx;
				.userNikename {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(48, 49, 51, 1);
					line-height: 28rpx;
				}
			}
		}
		.right{
			.isfollowBox {
				width: 124rpx;
				height: 48rpx;
				background: #f8f8f8;
				border-radius: 24rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 400;
				color: #c9cad1;
			}
			.followBox {
				width: 124rpx;
				height: 48rpx;
				background: #ffe512;
				border-radius: 24rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #303133;
				.followImg {
					width: 16rpx;
					height: 16rpx;
					margin-right: 4rpx;
				}
			}
		}
	}
	.adress-1{
		margin-top: 32rpx;
	}
	.adress,.adress-1 {
		height: 40rpx;
		margin-left: 28rpx;
		margin-right: 28rpx;
		background: rgba(0, 145, 255, 0.1);
		border-radius: 20rpx;
		display: inline-block;
		// line-height: 40rpx;
		padding: 0 14rpx;
		.adreessIcon {
			width: 24rpx;
			height: 24rpx;
			margin-top: 8rpx;
			float: left;
		}
		.adressText {
			max-width: 400rpx;
			height: 100%;
			display: flex;
			align-items: center;
			font-size: 22rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(0, 145, 255, 1);
			// float: right;
			overflow: hidden;
			white-space: nowrap; 
			text-overflow: ellipsis; 
		}
	}
	// 内容
	.contentTitle{
		margin: 40rpx 28rpx 0rpx;
		font-size: 38rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #303133;
		line-height: 52rpx;
		display: inline-block;
	}
	.StrategyTip{
		margin-top: 8rpx;
		margin-left: 28rpx;
		width: 88rpx;
		height: 40rpx;
		.StrategyImg{
			width: 100%;
			height: 100%;
		}
	}

	.contentText {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(96, 98, 102, 1);
		line-height: 56rpx;
		margin: 40rpx 28rpx 0;
	}

	.tips {
		margin-top: 28rpx;
		margin-left: 28rpx;
		display: flex;
		flex-wrap: wrap;
		
		
		.tipsIcon {
			width: 36rpx;
			height: 36rpx;
			margin-right: 8rpx;
		}
		.tipsText{
			font-size: 24rpx;
		}
	}
	.tips view {
		height: 48rpx;
		background: #f8f8f8;
		border-radius: 12px;
		margin-right: 38rpx;
		display: flex;
		align-items: center;
		padding-left: 8rpx;
		padding-right: 16rpx;
		margin-bottom: 16rpx;
	}
	.tip text {
		height: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #303133;
		line-height: 24rpx;
	}

	.releaseTime {
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(201, 202, 209, 1);
		line-height: 22rpx;
		margin-top: 24rpx;
		margin-left: 28rpx;
		// margin-bottom: 480rpx;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.releaseTime-strategy{
		width: fit-content;
		height: 22rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 22rpx;
		margin-top: 12rpx;
		background: #EDEFF2;
	}

	.replyLine {
		width: 694rpx;
		height: 0.5px;
		background: #edeff2;
		margin: 28rpx 28rpx 40rpx;
	}

	// 评论
	.replyBox {
		margin:0 28rpx;
		.replyText {
			height: 32rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #303133;
			line-height: 32rpx;
		}

		.replyContent {
			.myReply {
				display: flex;
				align-items: center;
				margin-top: 40rpx;
				margin-bottom: 40rpx;
				.userImg {
					width: 68rpx;
					height: 68rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}

				.replyInput {
					width: 598rpx;
					height: 68rpx;
					background: #F8F8F8;
					border-radius: 17px;
					padding-left: 32rpx;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909399;
				}
			}

			.reply {
				margin-top: 32rpx;
				border-bottom: 0.5px solid #edeff2;

				.replyTop {
					display: flex;
					align-items: center;

					.userImg {
						width: 68rpx;
						height: 68rpx;
						border-radius: 50%;
						margin-right: 16rpx;
					}
					.topBox{
						display: flex;
						align-items: center; 
						justify-content: space-between;
						width: 626rpx;
						.boxOne{
							display: flex;
							align-items: center;
							.userName {
								height: 28rpx;
								font-size: 28rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #303133;
								line-height: 28rpx;
							}
							
							.replyTime {
								margin-left: 16rpx;
								height: 24rpx;
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #C9CAD1;
								line-height: 24rpx;
							}
						}
						.boxTwo{
							display: flex;
							.replyLike {
								width: 44rpx;
								height: 44rpx;
							}
							
							.report {
								width: 44rpx;
								height: 44rpx;
							}
						}
					}
				}

				.replyBottom {					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #606266;
					line-height: 42rpx;
					margin-left: 84rpx;
					margin-bottom: 32rpx;
				}
			}
		}

		.moreReply {
			text-align: center;
			margin-top: 32rpx;
			height: 28rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #0091FF;
			line-height: 28rpx;
		}
	}

	// 评论框
	.commentInput {
		width: 100%;
		height: 100px;
		position: fixed;
		background: #ffffff;
		bottom: 0;
		display: flex;
		z-index: 110;
		.inputK {
			height: 14px;
			width: 558rpx;
			margin: 8px 16px;
			background: #F8F8F8;
			padding: 10px 8px;
			border-radius: 4px;
		}

		.send {
			height: 32rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #0091FF;
			line-height: 32rpx;
			margin-top: 36rpx;
			z-index: 200;
		}
	}


	.safeBox {
		height: 140rpx;
		width: 100%;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
	}
	/* 底部 */
	.bottom {
		width: 100%;
		height: 98rpx;
		position: fixed;
		left: 0;
		bottom: var( --window-bottom);
		z-index: 111;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
		display: flex;
		align-items: center;
		border-top: 2rpx solid #EDEFF2;
		background-color: hsla(0,0%,89.8%,.8);
		background: hsla(0,0%,100%,.9);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
	.bottom-text{
		width: 372rpx;
		height: 68rpx;
		background: #F8F8F8;
		border-radius: 34rpx;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		padding-left: 28rpx;
		margin-left: 28rpx;
		margin-right: 32rpx;
	}
	.bottom-gl{
		padding: 30rpx;
		box-sizing: content-box;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		border-bottom: 2rpx solid #EDEFF2;
		margin-bottom: 30rpx;
	}
	.share{
		margin-left: 32rpx;
		width: 52rpx;
		height: 52rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.like {
		display: flex;
		align-items: center;
		width: 52rpx;
		height: 52rpx;
		margin-right: 4rpx;
		.has-like {
			width: 100%;
			height: 100%;
		    display: inline-block;
		    background-size: 100%;
		    background-origin: center center;
		    background-image: url(../../static/images/attHeartActive.svg);
		}
		.icon-like {
			width: 100%;
			height: 100%;
		    display: inline-block;
		    background-image: url(../../static/images/attheart.svg);
		    background-size: 100%;
		    background-origin: center center;
		}
		
		.icon-animate {
			width: 100%;
			height: 100%;
			display: block;
		    background-image: url(../../static/icon-heart.gif);
		    background-size: 100%;
		    background-origin: center center;
		}
	}
	.likeNum {
		width: 30rpx;
		height: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 24rpx;
		margin-right: 32rpx;
	}
	.fav {
		display: flex;
		align-items: center;
		margin-right: 4rpx;
		position: relative;
		width: 52rpx;
		height: 52rpx;
		.favBtn {
			width: 100%;
			height: 100%;
		}
	}
	.favNum {
		width: 30rpx;
		height: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 24rpx;
	}

	.loading{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
</style>