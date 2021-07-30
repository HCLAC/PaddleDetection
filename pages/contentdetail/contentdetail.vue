<template>
	<view>
		
		<!-- 游记文章 -->
		<view class="example-body" v-if="article.data.type != 2">
			<uni-nav-bar :fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<view class="" v-if="swiperHeight && article.data.type != 2">
			<!-- 内容详情轮播图 -->
			<view class="uni-padding-wrap" >
				<view class="page-section-spacing" width="100%" :style="{ height: swiperHeight }" v-if="articleList.data.type != 4 && articleList.data.type != 5 ">
					<swiper @change="change" class="swiper" :autoplay="true" circular='true' :indicator-dots="false">
						<swiper-item v-for="(item, index) in articleList.data.images" :key="index">
							<image class="itemImg" :style="{ width: index == 0 ? '100%' : '' }" :mode="index == 0 ? 'widthFix' : 'aspectFit'"
							 :src="item"></image>
						</swiper-item>
					</swiper>
					<view class="imageCount">{{ current + 1 }}/{{ article.data.images.length }}</view>
					<view class="dots">
						<block v-for="(item, index) in article.data.images" :key="index">
							<view :class="[index == current ? 'activieDot' : 'dot']"></view>
						</block>
					</view>
				</view>
				<view class="page-section-spacing" width="100%" v-if="article.data.type == 4">
					<video class="videobox" :style="{ height: swiperHeight }" :src="article.data.images[1]" object-fit="contain"
					 :poster="article.data.images[0]" controls></video>
				</view>
			</view>
			<!-- 内容详情 -->
			<view class="detailContent savebottom">
				<view class="userMse">
					<image class="userHeard" :src="article.data.avatar" @click="tobloggers(article.data.author_id)"></image>
					<view class="userMse-r">
						<view class="userNikename">{{ article.data.author_name }}</view>
					</view>
					<view class="followBox" @click="follow()" v-if="!article.data.is_follow">
						<image class="followImg" src="../../static/images/followIcon.svg" mode=""></image>
						关注
					</view>
					<view class="isfollowBox" @click="follow()" v-if="article.data.is_follow">已关注</view>
				</view>
				<!-- 弹窗 -->
				<u-modal v-model="show" :content="content" :show-title="false" :show-cancel-button="true" @confirm="confirm"></u-modal>
				<!-- 地址 -->
				<view class="adress">
					<image src="../../static/images/iconMap.svg" mode="" class="adreessIcon"></image>
					<view class="adressText" @click="map()">{{ article.data.location }}</view>
				</view>
				<!-- 标题 -->
				<text class="contentTitle" selected=true>{{ article.data.title }}</text>
				<!-- <view class="contentTitle">{{ article.data.title }}</view> -->
				<!-- 内容文章 -->
				<view class="contentText">
					<!-- <rich-text :nodes="article.data.content | formatRichText"></rich-text> -->
					<mp-html ref="parse" v-if="article" style="overflow: hidden;" lazy-load @imgtap="imgTap" @linktap="mpLinktap"
					 :content="article.data.content | formatRichText"></mp-html>
				</view>
				<view class="tips">
					<view v-for="item in article.data.topics" :key="item.id" @click="toTopic(item.id)">
						<image class="tipsIcon" src="../../static/images/topicIcon.svg" mode=""></image>
						<text class="tipsText">{{ item.name }}</text>
					</view>
					<!-- <view>#<text></text></view> -->
				</view>
				<view class="releaseTime">发布于{{ article.data.update_at }}</view>
				<view class="replyLine"></view>
				<view class="replyBox">

					<!-- start 输入框 -->
					<!-- end 输入框 -->
					<view class="replyText">
						回复
					</view>
					<view class="replyContent">
						<view class="myReply">
							<image class="userImg" src="../../static/images/userImg.svg" mode="" v-if="userInfo == null"></image>
							<image class="userImg" :src="userInfo.avatar" mode="" v-if="userInfo != null"></image>
							<!-- <comment 
								ref="comment" 
								:placeholder="'快来写下你的评论吧'" 
								@pubComment="pubComment">
							</comment>
							<u-input 
								class="replyInput"
								placeholder="写个回复走个心" 
								placeholderStyle="text;width:308rpx;height:28rpx;fontSize:28rpx;fontFamily: PingFangSC-Regular, PingFang SC;fontWeight:400;color:#c9cad1;lineHeght:28rpx;" 
								confirmType="send"
								:clearable="false"
								:disabled="true"
								@click="toggleMask('show')"
							>
							</u-input> -->
							<u-input class="replyInput" placeholder="写个回复走个心" placeholderStyle="text;width:308rpx;height:28rpx;fontSize:28rpx;fontFamily: PingFangSC-Regular, PingFang SC;fontWeight:400;color:#c9cad1;lineHeght:28rpx;"
							 confirmType="send" :clearable="false" :disabled="true" @click="commentInput">
							</u-input>
						</view>

						<view class="reply" v-for="(item,index) in commentsList" :key="index">
							<view class="replyTop">
								<image class="userImg" v-if="!item.avatar" src="../../static/images/userImg.svg" mode=""></image>
								<image class="userImg" v-if="item.avatar" :src="item.avatar" mode=""></image>
								<view class="" style="display: flex;align-items: center; justify-content: space-between;width: 626rpx;">
									<view class="" style="display: flex;align-items: center;">
										<view class="userName">{{item.account_name}}</view>
										<view class="replyTime">
											{{item.create_at.slice(0,10)}}
										</view>
									</view>
									<view class="">
										<image class="replyLike" src="../../static/images/attLike.svg" v-if="item.like == 0" @click="replyLike(item)"></image>
										<image class="replyLike" src="../../static/images/attLikeA.svg" mode="" v-if="item.like == 1" @click="replyLike(item)"></image>
										<image class="report" src="../../static/images/report.svg" mode="" @click="toReport(item)"></image>
									</view>

								</view>

							</view>
							<view class="replyBottom">
								{{item.content}}
							</view>
						</view>
					</view>
					<view class="moreReply" v-if="total > 3" @click="toMoreReply">
						查看全部{{total}}条回复
					</view>

				</view>

				<view class="safeBox"></view>
			</view>
			<!-- <view class="foot" v-show="showInput">
				<chat-input @send-message="send_comment" @blur="blur" :focus="focus" :placeholder="input_placeholder"></chat-input>
			</view> -->
			<view class="commentInput" v-if="textareafocus" :style="{bottom : inputbottom.bottom}">
				<textarea class="inputK" v-model="content" placeholder="快来写下你的评论吧" :show-confirm-bar="false" :focus="textareafocus"
				 @blur="inputBlur" @focus="inputFocus" :auto-height="autoHeight" @input="inputValue" maxlength="140" cursor-spacing="20"
				 :adjust-position="false"></textarea>
				<view class="send" @click="pubComment">发送</view>
			</view>
			<view class="bottom">
				<!-- 分割线 -->
				<!-- <view class="bottomLine">
					
				</view> -->
				<view class="line"></view>
				<!-- 登录 -->
				<view class="contentBottom savepadding">
					<view style="display: flex;">
						<view class="like" @click="clickLike">
							<image class="likeBtn" src="../../static/images/attheart.svg" v-if="article.data.liked == 0"></image>
							<image class="likeBtn" src="../../static/images/attHeartActive.svg" v-if="article.data.liked == 1"></image>
							<view class="likeNum" v-model="likemessage" v-if="article.data.like_count != 0">{{ article.data.like_count }}</view>
						</view>
						<view class="fav" @click="clickFav">
							<image class="favBtn" src="../../static/images/attFav.svg" v-if="article.data.fav == 0"></image>
							<image class="favBtn" src="../../static/images/attFavA.svg" v-if="article.data.fav == 1"></image>
							<view class="favNum" v-if="article.data.fav_count != 0">{{ article.data.fav_count }}</view>
						</view>
						<view class="replyIcon" @click="commentInput">
							<image src="../../static/images/replyIcon.svg" mode=""></image>
							<view class="replyNum">
								{{total}}
							</view>
						</view>
						<!-- <view class="share" v-if="serviceProvider == 'baidu'" @click="share"><image src="../../static/images/shareIcon.svg"></image></view> -->
					</view>
					<view class="">
						<view class="loginButton" @click="login" v-if="flag">登录</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 攻略文章 -->
		<view class="example-body " v-if="article.data.type == 2">
			<uni-nav-bar :fixed="true" :status-bar="true" :shadow="true" class="navbar ">
				<view slot="left" class="slotleft">
					<i<!-- #ifndef  MP-BAIDU -->
								<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
							<!-- #endif -->				<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>
		<view class="" v-if="article && article.data.type == 2">
			<!-- 内容详情 -->
			<view class="detailContent savebottom">
				<!-- 标题 -->
				<text class="contentTitle-strategy" selected=true>{{ article.data.title }}</text>
				<!-- <view class="contentTitle-strategy">{{ article.data.title }}</view> -->
				<view class="StrategyTip">
					<image class="StrategyImg" src="../../static/images/Strategy.svg" mode=""></image>
				</view>
				<!-- 作者信息 -->
				<view class="userMse-strategy">
					<image class="userHeard" :src="article.data.avatar" @click="tobloggers(article.data.author_id)"></image>
					<view class="userMse-r">
						<text class="userNikename-strategy" selected=true> {{ article.data.author_name }}</text>
						<!-- <view class="userNikename-strategy">{{ article.data.author_name }}</view> -->
						<view class="releaseTime-strategy">发布于{{ article.data.update_at.slice(0,10) }}</view>
					</view>
					<view class="followBox" @click="follow()" v-if="!article.data.is_follow">
						<image class="followImg" src="../../static/images/followIcon.svg" mode=""></image>
						关注
					</view>
					<view class="isfollowBox" @click="follow()" v-if="article.data.is_follow">已关注</view>
				</view>
				<!-- 弹窗 -->
				<u-modal v-model="show" :content="content" :show-title="false" :show-cancel-button="true" @confirm="confirm"></u-modal>
				
				
				<!-- 内容文章 -->
				<view class="contentText-strategy">
					<!-- <rich-text :nodes="article.data.content | formatRichText"></rich-text> -->
					<mp-html ref="parse" v-if="article" style="overflow: hidden;" lazy-load @imgtap="imgTap" @linktap="mpLinktap"
					 :content="article.data.content | formatRichText"></mp-html>
				</view>
				<!-- 地址 -->
				<view class="adress-strategy">
					<image src="../../static/images/iconMap.svg" mode="" class="adreessIcon"></image>
					<view class="adressText" @click="map()">{{ article.data.location }}</view>
				</view>
				<view class="strategyLine"></view>
				<!-- 话题 -->
				<view class="tipsStrategy">
					<view v-for="item in article.data.topics" :key="item.id" @click="toTopic(item.id)">
						<image class="tipsIcon" src="../../static/images/topicIcon.svg" mode=""></image>
						<text class="tipsText">{{ item.name }}</text>
					</view>
					<!-- <view>#<text></text></view> -->
				</view>
				
				<view class="replyLine"></view>
				<view class="replyBox">
		
					<!-- start 输入框 -->
					<!-- end 输入框 -->
					<view class="replyText">
						回复
					</view>
					<view class="replyContent">
						<view class="myReply">
							<image class="userImg" src="../../static/images/userImg.svg" mode="" v-if="userInfo == null"></image>
							<image class="userImg" :src="userInfo.avatar" mode="" v-if="userInfo != null"></image>
							<!-- <comment 
								ref="comment" 
								:placeholder="'快来写下你的评论吧'" 
								@pubComment="pubComment">
							</comment>
							<u-input 
								class="replyInput"
								placeholder="写个回复走个心" 
								placeholderStyle="text;width:308rpx;height:28rpx;fontSize:28rpx;fontFamily: PingFangSC-Regular, PingFang SC;fontWeight:400;color:#c9cad1;lineHeght:28rpx;" 
								confirmType="send"
								:clearable="false"
								:disabled="true"
								@click="toggleMask('show')"
							>
							</u-input> -->
							<u-input class="replyInput" placeholder="写个回复走个心" placeholderStyle="text;width:308rpx;height:28rpx;fontSize:28rpx;fontFamily: PingFangSC-Regular, PingFang SC;fontWeight:400;color:#c9cad1;lineHeght:28rpx;"
							 confirmType="send" :clearable="false" :disabled="true" @click="commentInput">
							</u-input>
						</view>
		
						<view class="reply" v-for="(item,index) in commentsList" :key="index">
							<view class="replyTop">
								<image class="userImg" v-if="!item.avatar" src="../../static/images/userImg.svg" mode=""></image>
								<image class="userImg" v-if="item.avatar" :src="item.avatar" mode=""></image>
								<view class="" style="display: flex;align-items: center; justify-content: space-between;width: 626rpx;">
									<view class="" style="display: flex;align-items: center;">
										<view class="userName">{{item.account_name}}</view>
										<view class="replyTime">
											{{item.create_at.slice(0,10)}}
										</view>
									</view>
									<view class="">
										<image class="replyLike" src="../../static/images/attLike.svg" v-if="item.like == 0" @click="replyLike(item)"></image>
										<image class="replyLike" src="../../static/images/attLikeA.svg" mode="" v-if="item.like == 1" @click="replyLike(item)"></image>
										<image class="report" src="../../static/images/report.svg" mode="" @click="toReport(item)"></image>
									</view>
		
								</view>
		
							</view>
							<view class="replyBottom">
								{{item.content}}
							</view>
						</view>
					</view>
					<view class="moreReply" v-if="total > 3" @click="toMoreReply">
						查看全部{{total}}条回复
					</view>
		
				</view>
		
				<view class="safeBox"></view>
			</view>
			<!-- <view class="foot" v-show="showInput">
				<chat-input @send-message="send_comment" @blur="blur" :focus="focus" :placeholder="input_placeholder"></chat-input>
			</view> -->
			<view class="commentInput" v-if="textareafocus" :style="{bottom : inputbottom.bottom}">
				<textarea class="inputK" v-model="contentText" placeholder="快来写下你的评论吧" :show-confirm-bar="false" :focus="textareafocus"
				 @blur="inputBlur" @focus="inputFocus" :auto-height="autoHeight" @input="inputValue" maxlength="140" cursor-spacing="20"
				 :adjust-position="false"></textarea>
				<view class="send" @click="pubComment">发送</view>
			</view>
			<view class="bottom">
				<!-- 分割线 -->
				<!-- <view class="bottomLine">
					
				</view> -->
				<view class="line"></view>
				<!-- 登录 -->
				<view class="contentBottom savepadding">
					<view style="display: flex;">
						<view class="like" @click="clickLike">
							<image class="likeBtn" src="../../static/images/attheart.svg" v-if="article.data.liked == 0"></image>
							<image class="likeBtn" src="../../static/images/attHeartActive.svg" v-if="article.data.liked == 1"></image>
							<view class="likeNum" v-model="likemessage" v-if="article.data.like_count != 0">{{ article.data.like_count }}</view>
						</view>
						<view class="fav" @click="clickFav">
							<image class="favBtn" src="../../static/images/attFav.svg" v-if="article.data.fav == 0"></image>
							<image class="favBtn" src="../../static/images/attFavA.svg" v-if="article.data.fav == 1"></image>
							<view class="favNum" v-if="article.data.fav_count != 0">{{ article.data.fav_count }}</view>
						</view>
						<view class="replyIcon" @click="commentInput">
							<image src="../../static/images/replyIcon.svg" mode=""></image>
							<view class="replyNum">
								{{total}}
							</view>
						</view>
						<!-- <view class="share" v-if="serviceProvider == 'baidu'" @click="share"><image src="../../static/images/shareIcon.svg"></image></view> -->
					</view>
					<view class="">
						<view class="loginButton" @click="login" v-if="flag">登录</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import chatInput from '@/components/comment/chatinput.vue';
	export default {
		components: {
			uniNavBar,
			uniIcons,
			chatInput
		},
		data() {
			return {
				indicatorDots: true,
				current: 0,
				list: [],
				VX: 17827277778,
				article: null,
				token: '',
				article_id: '',
				flag: true,
				wechat_id: null,
				swiperHeight: '',
				serviceProvider: '',
				following: 0,
				content: '',
				contentText: '',
				show: false,
				value: '',
				commentsList: [],
				total: '',
				userInfo: [],
				focus: false,
				autoHeight: false,
				inputbottom: {
					bottom: ''
				},
				textareafocus: false,
			};
		},
		onShow() {
			// 获取当前小程序的页面栈
			// let pages = getCurrentPages();
			// // 数组中索引最大的页面--当前页面
			// let currentPage = pages[pages.length - 1];
			// // 打印出当前页面中的 options
			// console.log('onshow--', currentPage.options);

			// console.log('文章id====', e);
			// uni.showLoading({
			// 	title: '加载中',
			// 	success: () => {
			// 		console.log(this.flag);
			// 		this.article_id = currentPage.options.article_id;
			// 	}
			// });
			this.getArticleDetail();
			this.getComments();
			this.getUserInfo()
			this.getArticleseo()
			this.flag = uni.getStorageSync('Authorization') ? false : true;
		},
		onLoad(obj) {
			console.log(obj,"数据")
			this.article_id = obj.article_id
			this.animation = uni.createAnimation()
			// 创建动画实例
			uni.getSystemInfo({ //获取设备信息
				success: (res) => {
					this.screenHeight = res.screenHeight;
					this.platform = res.platform;
				}
			});
		},
		
		created() {
			_this = this;
		},
		mounted() {
			uni.getProvider({
				service: 'oauth',
				success: res => {
					if (res.errMsg == 'getProvider:ok') {
						this.serviceProvider = res.provider[0];
						if (this.serviceProvider != 'baidu') {
							uni.showShareMenu({});
						}
					} else {
						uni.showToast({
							title: '获取提供商失败',
							icon: 'none'
						});
					}
				}
			});
		},
		methods: {
			getArticleseo(){
				var that = this
				uni.request({
					url: this.globalUrl + '/article/seo',
					data: {
						article_id: that.article_id
					},
					success: res => {
						console.log(res, "+++++++++++++");
						swan.setPageInfo({
							title:res.data.data.title,
							keywords:res.data.data.keywords,
							description:res.data.data.description,
						})
					},
				})
			},
			mpLinktap(e) {
				console.log('e', e);
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
				uni.request({
					// url:'article',
					url: this.globalUrl + '/article',
					data: {
						article_id: that.article_id
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: async function(res) {
						uni.hideLoading();
						uni.setStorageSync('id', res.data);

						let inputComponets = res.data.data.content.match(/<input[^>]*\/>/gi);
						if (inputComponets != null && inputComponets.length > 0){
							for (var i=0;i<inputComponets.length;i++){
								var item = inputComponets[i]
								let strValue = item.match(/name="(\S*)"/);
								var replaceStr = ''
								if (strValue != null && strValue.length == 2){
									var id = strValue[1]
									if (item.indexOf("营销组件")!=-1){
										let component = await that.asyncGetComponentInfo('/marketing/unit', {
																				group_id: id,
																				article_id: that.article_id
																			});
										if (component.data.code != 0) {
											console.error('获取营销组件信息失败', component)
											replaceStr = ""
										} else {
											var obj = component.data.data
											replaceStr = that.generateWeixinMarketingGroup(obj)
											res.data.data.content = res.data.data.content.replace(item, replaceStr);
											// console.log("营销组件", replaceStr)
										}
									} else if (item.indexOf("在线客服")!=-1){
										res.data.data.content = res.data.data.content.replace(item, '');
										// let component = await that.asyncGetComponentInfo('/online/call', {id:id});
										// if (component.data.code != 0) {
										// 	console.error('获取在线客服信息失败', component)
										// 	replaceStr = ""
										// } else {
										// 	var obj = component.data.data
										// 	replaceStr = that.generateOnlineCustomer(obj)
										// 	res.data.data.content = res.data.data.content.replace(item, replaceStr);
										// 	// console.log("在线客服", replaceStr)
										// }
									} else if (item.indexOf("小程序")!=-1){
										res.data.data.content = res.data.data.content.replace(item, '');
										// let component = await that.asyncGetComponentInfo('/miniapp/call', {id:id});
										// if (component.data.code != 0) {
										// 	console.error('获取小程序信息失败', component)
										// 	replaceStr = ""
										// } else {
										// 	console.log('component', component)
										// 	var obj = component.data.data
										// 	replaceStr = that.generateMiniapp(obj)
										// 	res.data.data.content = res.data.data.content.replace(item, replaceStr);
										// 	// console.log("在线客服", replaceStr)
										// }
									}
								}
							}
						}
						
						that.article = res.data;
						console.log('文章详情=', that.article);
						that.following = that.article.data.follow;
						that.$nextTick(() => {
							uni.getImageInfo({
								src: that.article.data.images[0],
								success: function(image) {
									console.log('图片高度--', image.height);
									let caseRes = image.width / image.height;
									that.swiperHeight = 100 / caseRes + 'vw';
								},
								fail: error => {
									console.log(1111, error);
								}
							});
						});
					},
					fail: error => {
						uni.hideLoading();
					}
				});
			},
			async asyncGetComponentInfo(url, data){
				return new Promise((resolve, reject) => {
					uni.request({
						// url:'article',
						url: this.globalUrl + url,
						method: 'get',
						data: data,
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},
				
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
				console.log('imgTap', e);

				return false;
			},
			// 跳转博主详情页
			tobloggers(e) {
				console.log(e);
				uni.navigateTo({
					url: '../bloggers/bloggers?author_id=' + e
				});
			},
			// 跳转话题页
			toTopic(e) {
				console.log(e);
				uni.navigateTo({
					url: '../topicList/topicList?id=' + e
				});
			},
			// 关注
			follow() {
				// console.log(item, index)
				var that = this;
				let msg = this.article.data.is_follow ? '确认取消关注?' : '确认关注?';
				let status = this.article.data.is_follow ? 0 : 1;

				if (status == 0) {
					that.show = true;
					that.content = '确认取消关注?';
				} else {
					uni.request({
						url: that.globalUrl + '/user/follow',
						data: {
							author_id: that.article.data.author_id,
							follow: status
						},
						method: 'POST',
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},
						success: res => {
							if (res.data.code != 0) {
								uni.navigateTo({
									url: '/pagesA/login/login'
								});
							} else {
								that.article.data.is_follow = status == 1 ? true : false;
							}
						}
					});
				}
			},
			// 点击确认
			confirm() {
				var that = this;
				let msg = this.article.data.is_follow ? '确认取消关注?' : '确认关注?';
				let status = this.article.data.is_follow ? 0 : 1;
				uni.request({
					url: that.globalUrl + '/user/follow',
					data: {
						author_id: that.article.data.author_id,
						follow: status
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						if (res.data.code != 0) {
							uni.navigateTo({
								url: '/pagesA/login/login'
							});
						} else {
							that.article.data.is_follow = status == 1 ? true : false;
						}
					}
				});
			},
			// 用户信息
			getUserInfo() {
				uni.request({
					url: this.globalUrl + '/user/info',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					method: 'get',
					success: (res) => {
						console.log('个人信息=', res.data);
						this.userInfo = res.data.data
					}
				})
			},
			// 举报
			toReport(e) {
				let token = uni.getStorageSync('Authorization')
				// console.log('tttt',token)
				if (!token) {
					uni.navigateTo({
						url: '/pagesA/login/login'
					});
				} else {
					uni.navigateTo({
						url: '../report/report?id=' + e.id
					})
				}

			},
			// 评论
			toggleMask(type) {
				this.$refs.comment.toggleMask(type);
			},
			commentInput() {
				this.textareafocus = true
				console.log(111)
			},
			inputBlur() {
				this.textareafocus = false
				this.inputbottom.bottom = 0 + 'px'
			},
			inputFocus(e) {
				console.log(e.detail,'eeee')
				this.textareafocus = true
				// console.log('e.detail.height', e.detail.height)
				this.inputbottom.bottom = e.detail.height + 'px'
				

				// this.textareaStyle.transform = 'translateY('+e.detail.height+'px'+')'

			},

			inputValue(e) {
				console.log('eeeee', e.detail.value.length)
				if (e.detail.value.length > 18) {
					this.autoHeight = true
				} else {
					this.autoHeight = false
				}
			},
			pubComment() {
				console.log('发送',this.contentText)
				uni.request({
					url: this.globalUrl + '/comments',
					data: {
						article_id: this.article_id,
						content: this.contentText
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						// this.commentsList = res.data.data.list
						this.contentText = ''
						uni.hideKeyboard()
						// this.$refs.comment.toggleMask('none');
						this.getComments()
						console.log('pinglun', res.data)
						if (res.data.code == 10502 || res.data.code == 10501) {
							uni.navigateTo({
								url: '/pagesA/login/login'
							});
						} else {

							if (res.data.code == 15001) {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 2000
								})
							} else {
								if (res.data.code != 0) {
									uni.showToast({
										title: '评论不能为空',
										icon: 'none',
										duration: 2000
									})
								} else {
									uni.showToast({
										title: '评论成功',
										icon: 'none',
										duration: 2000
									})
								}
							}
						}


					}
				})
			},
			// 获取评论列表
			getComments() {
				uni.request({
					url: this.globalUrl + '/comments/list',
					data: {
						article_id: this.article_id,
						page: 1,
						count: 3
					},
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log(res)
						if (res.data.data == null) {
							uni.request({
								url: this.globalUrl + '/comments/list',
								data: {
									article_id: this.article_id,
									page: 1,
									count: 3
								},
								success: res => {
									this.commentsList = res.data.data.list
									this.total = res.data.data.total
									console.log('不带tokencomments', res.data)
								}
							})
						} else {
							this.commentsList = res.data.data.list
							this.total = res.data.data.total
							console.log('comments', res.data)
						}

					}
				});
			},
			// 评论点赞
			replyLike(e) {
				uni.request({
					url: this.globalUrl + '/comments/likes',
					data: {
						id: e.id,
						like: e.like == 0 ? 1 : 0
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log('点赞', res)
						if (res.data.code == 10501) {
							uni.navigateTo({
								url: '/pagesA/login/login'
							});
						} else {
							this.getComments()
						}

					}
				});
			},
			// likeBtn(){
			// 	this.$u.debounce(this.replyLike, 1000)
			// },
			// replyBtn(){
			// 	this.focus = true
			// },
			// isfocus(){
			// 	this.focus = false
			// },
			// 查看更多评论
			toMoreReply() {
				let e = this.article_id
				uni.navigateTo({
					url: '../comments/comments?article_id=' + e
				})
			},
			// 点赞
			clickLike() {
				var that = this;

				uni.request({
					url: this.globalUrl + '/user/liked',
					data: {
						article_id: that.article_id,
						liked: that.article.data.liked == 0 ? 1 : 0
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log('点赞', res);
						if (res.data.code != 0) {
							uni.navigateTo({
								url: '/pagesA/login/login'
							});
						} else {
							that.article.data.liked = res.data.data.liked
							that.article.data.like_count = res.data.data.like_count
						}
					}
				});
			},
			// 收藏
			clickFav() {
				var that = this;

				uni.request({
					url: this.globalUrl + '/user/favorite',
					data: {
						article_id: that.article_id,
						favorite: that.article.data.fav == 1 ? 0 : 1
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						console.log('收藏', res);
						if (res.data.code != 0) {
							uni.navigateTo({
								url: '/pagesA/login/login'
							});
						} else {
							that.article.data.fav = res.data.data.fav
							that.article.data.fav_count = res.data.data.fav_count
						}
					}
				});
			},
			
			// 登录
			login() {
				uni.navigateTo({
					url: '/pagesA/login/login'
				});
			},
			change(e) {
				_this.current = e.detail.current;
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			home() {
				uni.switchTab({
					url: '/pagesA/index/index'
				});
			},

			map() {
				var that = this;

				const latitude = that.article.data.latitude;
				const longitude = that.article.data.longitude;
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					success: function() {
						console.log('success');
					}
				});
			},
			copy() {
				uni.setClipboardData({
					data: _this.VX,
					success: function() {
						// console.log('success');
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						});
					}
				});
				uni.getClipboardData({
					success: function(res) {
						console.log(res.data);
					}
				});
			},
			share() {
				uni.showShareMenu({});
			}
			// favClick() {
			// 	this.checked = !this.checked
			//  this.$forceUpdate()
			// }
		},
		filters: {
			/**
			 * 处理富文本里的图片宽度自适应
			 * 1.去掉img标签里的style、width、height属性
			 * 2.img标签添加style属性：max-width:100%;height:auto
			 * 3.修改所有style里的width属性为max-width:100%
			 * 4.去掉<br/>标签
			 * @param html
			 * @returns {void|string|*}
			 */

			formatRichText(html) {
				//控制小程序中图片大小
				let newContent = html.replace(/<img[?!component_img|^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});

				// newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
				// 	match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');

				// 	return match;
				// });
				// 适配字体
				newContent = newContent.replace(/(\d+)px/g, function(s, t) {
					s = s.replace('px', '');
					var value = parseInt(s) * 2; //   此处 1rem =120px
					return value + 'rpx';
				});
				// newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				// newContent = newContent.replace(/\<img/gi, '<img style="width:350px;height:auto;display:inline-block;margin:5px auto;"');
				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
				return newContent;
			}
		}
	};
</script>

<style lang="scss" scoped>
	html {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	/* 自定义导航栏样式 */
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #aa557f;
		margin-bottom: 48rpx;
	}

	.example-body {
		flex-direction: column;
		background-color: #ffffff;
		
	}
	.strategy{
		box-shadow: 0px 4rpx 24rpx 0px #EDEFF2;
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
	.replyText{
		font-size: 32rpx;
	}
	.button-v-line {
		width: 1px;
		height: 18px;
		background-color: #2f2f2f;
		margin: 0 8px;
	}

	/* 轮播图 */

	.page-section-spacing {
		position: relative;
		// min-height: 580rpx;
		// max-height: 978rpx;
		width: 100%;
	}

	.swiper {
		width: 100%;
		height: 100%;
	}

	.videobox {
		width: 100%;
		// height: auto;
		min-height: 420rpx;
		max-height: 1000rpx;
	}

	.itemImg {
		width: 100%;
		height: 100%;
	}

	.imageCount {
		// width: 90rpx;
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
		margin-left: 28rpx;
		margin-top: 50rpx;
	}
	.userMse-strategy{
		display: flex;
		align-items: center;
		margin-left: 28rpx;
		margin-top: 40rpx;
	}

	.userHeard {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.userMse-r {
		margin-left: 20rpx;
		flex: 1;
	}

	.userNikename {
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(48, 49, 51, 1);
		line-height: 28rpx;
	}
	.userNikename-strategy {
		height: 28rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 28rpx;
	}

	.isfollowBox {
		width: 124rpx;
		height: 48rpx;
		background: #f8f8f8;
		border-radius: 24rpx;
		margin-right: 28rpx;
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
		margin-right: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
	}

	.followImg {
		width: 16rpx;
		height: 16rpx;
		margin-right: 4rpx;
		// margin-top: 4rpx;
	}

	.adress {
		height: 40rpx;
		margin-top: 32rpx;
		margin-left: 28rpx;
		margin-right: 28rpx;
		background: rgba(0, 145, 255, 0.1);
		border-radius: 20rpx;
		// border: 2rpx solid rgba(0, 145, 255, 1);
		display: inline-block;
		line-height: 40rpx;
		padding: 0 14rpx;
		// display: flex;
		// align-items: center;
	}
	.adress-strategy{
		height: 40rpx;
		margin: 20rpx 28rpx;
		background: rgba(0, 145, 255, 0.1);
		border-radius: 20rpx;
		display: inline-block;
		line-height: 40rpx;
		padding: 0 14rpx;
	}

	.adreessIcon {
		width: 24rpx;
		height: 24rpx;
		margin-top: 8rpx;
		float: left;
		
	}

	/*  #ifdef  MP-TOUTIAO  */
	.adreessIcon {
		width: 24rpx;
		height: 24rpx;
		margin-top: 12rpx;
		float: left;
	}

	/*  #endif  */

	.adressText {
		max-width: 400rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 145, 255, 1);
		float: right;
		overflow: hidden;
		white-space: nowrap; 
		text-overflow: ellipsis; 
	}

	// 内容
	.contentTitle {
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: rgba(48, 49, 51, 1);
		line-height: 48rpx;
		margin-left: 28rpx;
		margin-top: 20rpx;
	}
	.contentTitle-strategy{
		margin: 400rpx 28rpx 0rpx;
		font-size: 38rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #303133;
		line-height: 52rpx;
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
		margin: 28rpx;
	}
	.contentText-strategy{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(96, 98, 102, 1);
		line-height: 56rpx;
		margin: 40rpx 28rpx 0rpx;
	}

	.copy {
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: rgba(48, 49, 51, 1);
	}

	.clcopy {
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 145, 255, 1);
		margin-left: 36rpx;
	}
	.strategyLine{
		width: 750rpx;
		height: 1rpx;
		background: #EDEFF2;
	}
	.tips {
		margin-top: 28rpx;
		margin-left: 28rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.tipsStrategy{
		margin-top: 20rpx;
		margin-left: 28rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.tipsStrategy view{
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

	.tipsIcon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 8rpx;
	}
	.tipsText{
		font-size: 24rpx;
	}
	.tip text {
		height: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #303133;
		line-height: 24rpx;
	}

	// .tipImg{
	// 	width: 30rpx;
	// 	height: 30rpx;
	// 	margin-right: 6rpx;
	// }

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
		width: 200rpx;
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
		margin: 28rpx;

		.relpyText {
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

				.userImg {
					width: 68rpx;
					height: 68rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}

				.replyInput {
					width: 598rpx;
					// height: 68rpx;
					background: #F8F8F8;
					border-radius: 17px;
					padding-left: 32rpx;
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

					.replyLike {
						width: 44rpx;
						height: 44rpx;
					}

					.report {
						margin-left: 28rpx;
						width: 44rpx;
						height: 44rpx;
					}
				}

				.replyBottom {
					// height: 42rpx;
					font-size: 28rpx;
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
			margin-bottom: 100rpx;
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
		position: fixed;
		background: #ffffff;
		bottom: 0;
		display: flex;
		align-items: center;
		// padding-bottom: 110rpx;
		.inputK {
			height: 28rpx;
			width: 558rpx;
			background: #F8F8F8;
			border-radius: 4px;
			margin: 16rpx 32rpx;
			padding: 20rpx 16rpx;
		}

		.send {
			// width: 64rpx;
			height: 32rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #0091FF;
			line-height: 32rpx;

		}
	}

	.bottomLine {
		width: 100%;
		height: 20rpx;
		background: #F8F8F8;
	}

	.safeBox {
		height: 142rpx;
		width: 100%;
	}

	/* 底部 */
	.bottom {
		width: 100%;
		height: 98rpx;
		position: fixed;
		left: 0;
		bottom: var(--window-bottom);
		z-index: 111;
		background-color: #ffffff;
		// padding-bottom: 68rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
	}

	.line {
		height: 0.5rpx;
		background: rgba(221, 221, 221, 1);
		// margin-top: 84rpx;
	}

	.contentBottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 16rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(48, 49, 51, 1);
		line-height: 24rpx;
	}

	.loginButton {
		width: 156rpx;
		height: 68rpx;
		background: rgba(255, 229, 18, 1);
		border-radius: 20px;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: rgba(48, 49, 51, 1);
		line-height: 68rpx;
		border: none;
		text-align: center;
		margin-right: 56rpx;
	}

	.like {
		display: flex;
		margin-left: 28rpx;
		align-items: center;
		margin-right: 40rpx;
	}

	.likeBtn {
		width: 52rpx;
		height: 52rpx;
		margin-right: 8rpx;
	}

	.likeNum {

		height: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 24rpx;
	}

	.fav {
		display: flex;
		align-items: center;
		margin-right: 40rpx;
	}

	.favBtn {
		width: 52rpx;
		height: 52rpx;
		margin-right: 8rpx;
	}

	.favNum {
		height: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 24rpx;
	}

	.replyIcon {
		display: flex;
		align-items: center;

		image {
			width: 52rpx;
			height: 52rpx;
		}

	}

	.replyNum {
		margin-left: 8rpx;
		height: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 24rpx;
	}

	.share {
		display: flex;
		margin-left: 56rpx;
		align-items: center;
	}

	.share image {
		width: 52rpx;
		height: 52rpx;
	}
</style>
