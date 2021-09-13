<template>
	<view>
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" :title="title">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
		</view>
		<!-- 游记文章 -->
		<view class="" v-if="articleInfo && articleInfo.type != 2">
			<!-- 内容详情轮播图 -->
			<view class="uni-padding-wrap" >
				<view class="page-section-spacing" width="100%" :style="{ height: swiperHeight }" v-if="articleInfo.type != 4 && articleInfo.type != 5">
					<swiper @change="change" class="swiper" :autoplay="true" circular='true' :indicator-dots="false" @click="ImgSee">
						<swiper-item v-for="(item, index) in articleInfo.images" :key="index">
							<image class="itemImg" :style="{ width: index == 0 ? '100%' : '' }" lazy-load :mode="index == 0 ? 'widthFix' : 'aspectFit'"
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
						<view class="userHeard">
							<image  lazy-load :src="articleInfo.avatar" @click="tobloggers(articleInfo.author_id)"></image>
						</view>
						<view class="userMse-r">
							<view class="userNikename">{{ articleInfo.author_name }}</view>
						</view>
					</view>
					<view class="right">
						<view class="followBox" @click="follow()" v-if="!articleInfo.is_follow">
							<image class="followImg" src="/static/images/followIcon.svg" mode=""></image>
							关注
						</view>
						<view class="isfollowBox" @click="follow()" v-else-if="articleInfo.is_follow">已关注</view>
					</view>
				</view>
				<!-- 地址 -->
				<view class="adress-1">
					<image src="/static/images/iconMap.svg" mode="" class="adreessIcon"></image>
					<view class="adressText" @click="map()">{{ articleInfo.location }}</view>
				</view>
				<!-- 标题 -->
				<!-- <text class="contentTitle" selected=true>{{ articleInfo.title }}</text> -->
				<!-- 内容文章 -->
				<view class="contentText">
					<mp-html ref="parse" v-if="articleInfo" style="overflow: hidden;" lazy-load @imgtap="imgTap" @linktap="mpLinktap"
					 :content="articleInfo.content" loading-img='/static/images/load.svg' error-img='/static/images/fail.svg'></mp-html>
				</view>
				<view class="tips">
					<view v-for="item in articleInfo.topics" :key="item.id" @click="toTopic(item.id)">
						<image class="tipsIcon" src="/static/images/topicIcon.svg" mode=""></image>
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
				<view class="StrategyTip">
					<image class="StrategyImg" src="/static/images/Strategy.svg" mode=""></image>
				</view>
				<!-- 作者信息 -->
				<view class="userMse">
					<view class="left">
						<view class="userHeard">
							<image lazy-load :src="articleInfo.avatar" @click="tobloggers(articleInfo.author_id)"></image>
						</view>
						<view class="userMse-r">
							<text class="userNikename" selected=true> {{ articleInfo.author_name }}</text>
							<view class="releaseTime-strategy">
								发布于{{ articleInfo.update_at.slice(0,10) }}
							</view>
						</view>
					</view>
					<view class="right">
						<view class="followBox" @click="follow()" v-if="!articleInfo.is_follow">
							<image class="followImg" src="/static/images/followIcon.svg" mode=""></image>
							关注
						</view>
						<view class="isfollowBox" @click="follow()" v-else>已关注</view>
					</view>
				</view>
				<!-- 内容文章 -->
				<view class="contentText">
					<mp-html ref="parse" v-if="articleInfo" style="overflow: hidden;" lazy-load @imgtap="imgTap" @linktap="mpLinktap"
					 :content="articleInfo.content" loading-img='/static/images/load.svg' error-img='/static/images/fail.svg'></mp-html>
				</view>
				<!-- 地址 -->
				<view class="adress">
					<image src="/static/images/iconMap.svg" mode="" class="adreessIcon"></image>
					<view class="adressText" @click="map()">{{ articleInfo.location }}</view>
				</view>
			</view>
			<!-- 话题 -->
			<view>
				<view class="tips">
					<view v-for="item in articleInfo.topics" :key="item.id" @click="toTopic(item.id)">
						<image class="tipsIcon" src="/static/images/topicIcon.svg" mode=""></image>
						<text class="tipsText">{{ item.name }}</text>
					</view>
				</view>
			</view>
		</view>
		<u-loading v-else :show="true" class="loading"></u-loading>
		<!-- 评论区 -->
		<view>
			<view class="replyLine"></view>
			<view class="replyBox">
				<view class="replyText">
					回复
				</view>
				<view class="replyContent">
					<view class="myReply">
						<image class="userImg" lazy-load :src="userInfo.avatar?userInfo.avatar:'/static/images/userImg.svg'" mode=""></image>
						<!-- <u-input class="replyInput" placeholder="写个回复走个心" placeholderStyle="text;width:308rpx;height:28rpx;fontSize:28rpx;fontFamily: PingFangSC-Regular, PingFang SC;fontWeight:400;color:#c9cad1;lineHeght:28rpx;"
						 confirmType="send" :clearable="false" :disabled="true" @click="commentInput">
						</u-input> -->
						<view class="replyInput" @click="commentInput">
							写个回复走个心
						</view>
					</view>
					<view class="reply" v-for="(item,index) in commentsList" :key="index">
						<view class="replyTop">
							<image class="userImg" lazy-load :src="item.avatar?item.avatar:'/static/images/userImg.svg'" mode=""></image>
							<view class="" style="display: flex;align-items: center; justify-content: space-between;width: 626rpx;">
								<view class="" style="display: flex;align-items: center;">
									<view class="userName">{{item.account_name}}</view>
									<view class="replyTime">
										{{item.create_at.slice(0,10)}}
									</view>
								</view>
								<view class="" style="display: flex;">
									<view class="min-box" @click="replyLike(item, index)">
										<image class="replyLike" :src="item.like == 1?'/static/images/attLikeA.svg':'/static/images/attLike.svg'" mode="" ></image>
									</view>
									<view class="min-box" @click="toReport(item.id)">
										<image class="report" src="/static/images/report.svg" mode="" ></image>
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
					查看全部{{comment_count}}条回复
				</view>
			</view>
			<view class="safeBox"></view>
		</view>
		<!-- 登录 -->
		<view class="bottom" v-if="articleInfo">
			<view class="line"></view>
			<view class="contentBottom savepadding">
				<view style="display: flex;">
					<view class="like" @click="clickLike">
						<image class="likeBtn" :src="articleInfo.liked?'/static/images/attHeartActive.svg':'/static/images/attheart.svg'"></image>
						<view class="likeNum" v-if="articleInfo.like_count != 0">{{ articleInfo.like_count }}</view>
					</view>
					<view class="fav" @click="clickFav">
						<image class="favBtn" :src="articleInfo.fav == 1?'/static/images/attFavA.svg':'/static/images/attFav.svg'"></image>
						<view class="favNum" v-if="articleInfo.fav_count != 0">{{ articleInfo.fav_count }}</view>
					</view>
					<view class="replyIcon" @click="commentInput">
						<image src="/static/images/replyIcon.svg" mode=""></image>
						<view class="replyNum">{{comment_count}}</view>
					</view>
					<!-- <view class="share" v-if="serviceProvider == 'baidu'" @click="share"><image src="/static/images/shareIcon.svg"></image></view> -->
				</view>
				<view class="">
					<view class="loginButton" @click="login" v-if="!hasLogin">登录</view>
				</view>
			</view>
		</view>
		<!-- 评论输入框 -->
		<view :animation="animationInputC" class="commentInput" v-if="showText">
			<textarea class="inputK" v-model="contentText" placeholder="快来写下你的评论吧" :show-confirm-bar="false" :focus="textareafocus"
			 @blur="inputBlur" :auto-height="autoHeight" @input="inputValue" maxlength="140"
			 :adjust-position="false"></textarea>
			<view class="send" @click="pubComment">发送</view>
		</view>
		
		<!-- 弹窗 -->
		<!-- <u-modal v-model="show" :content="content" :border-radius="40" :show-title="false"  cancel-color='#303133' :show-cancel-button="true" @confirm="confirm"></u-modal> -->
		<u-modal v-model="show" :content="content" :border-radius="40" :z-index="9999" :show-title="false" :show-cancel-button="true" @confirm="confirm"></u-modal>
		
		<!-- 遮罩层 -->
		<view class="mask" v-show="textareafocus">
			
		</view>
	</view>
</template>

<script>
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
				showText:false,
				indicatorDots: true,
				current: 0,
				list: [],
				title: '领途羊',
				articleInfo: null,
				token: '',
				article_id: '',
				hasLogin: true,
				wechat_id: null,
				swiperHeight: '',
				serviceProvider: '',
				following: 0,
				content: '',
				contentText: '',
				show: false,
				value: '',
				commentsList: [],
				comment_count: '',
				userInfo: {},
				focus: false,
				autoHeight: false,
				textareafocus: false,
				animation: null,
				animationInputC: {},
				// 数据采集
				trace_info: null,
				rn: null,
				joinTime: 0
			};
		},
		//#ifdef H5
		metaInfo() {
			return {
				title: this.articleInfo.title+"-领途羊", // set a title
				meta: [{                 // set meta
					name: 'keywords',
					content: this.articleInfo.keywords
				},
				{                 // set meta
					name: 'description',
					content: this.articleInfo.description
				}]
			}
		},
		// #endif
		onReady() {
			swan.showFavoriteGuide({
			    type: 'tip'
			})
		},
		onShow() {
			this.hasLogin = getApp().globalData.Authorization ? true : false;
			//#ifdef MP-BAIDU
			swan.onKeyboardHeightChange(res => {
				this.animation.translateY(- (res.height + 60)).step()
				this.animationInputC = this.animation.export()
			});
			//#endif
		},
		onLoad(obj) {
			this.serviceProvider = getApp().globalData.serviceProvider
			this.article_id = obj.article_id
			this.trace_info = obj.trace_info?obj.trace_info:null
			this.rn = obj.rn?obj.rn:null
			this.joinTime = Number((new Date().getTime())/1000).toFixed(0)
			this.animation = uni.createAnimation({
				  transformOrigin: "50% 50%",
				  duration:200,//175动画速度
				  timingFunction: "linear",
				  delay: 0
				}
			)
			this.loadData()
			// 创建动画实例
			uni.getSystemInfo({ //获取设备信息
				success: (res) => {
					this.screenHeight = res.screenHeight;
					this.platform = res.platform;
				}
			});
		},
		methods: {
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
						this.getArticleDetail();
						this.getUserInfo()
						setTimeout(() => {
							this.getComments();
							this.hideLoad()
						}, 200);
					}
				});
			},
			hideLoad(){
				setTimeout(() => {
					uni.hideLoading();
				}, 100);
			},
			mpLinktap(e) {
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
						
						// 适配字体
						articleInfo.content = articleInfo.content.replace(/(\d+)px/g, function(s, t) {
							s = s.replace('px', '');
							var value = parseInt(s) * 2; //   此处 1rem =120px
							return value + 'rpx';
						});
						// 处理文章图片，先处理图片，再处理营销组件，因为组件中的图片不需要处理
						let article_images = articleInfo.content.match(/<img[^>]*\/>/gi);
						if (article_images != null && article_images.length > 0){
							for (var i=0;i<article_images.length;i++){
								var item = article_images[i]
								let obj = item.split('"')
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
								let height = obj[7]
								let heightR = obj[7]*750/width
								let img = '<img src="'+src+'" style="width:750rpx;height:'+heightR+'rpx;display:inline-block;margin:10rpx auto;"/>'
								articleInfo.content = articleInfo.content.replace(item, img);
							}
						}
						// 处理营销组件
						let inputComponets = articleInfo.content.match(/<input[^>]*\/>/gi);
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
											articleInfo.content = articleInfo.content.replace(item, replaceStr);
											// console.log("营销组件", replaceStr)
										}
									} else if (item.indexOf("在线客服")!=-1){
										articleInfo.content = articleInfo.content.replace(item, '');
										// let component = await that.asyncGetComponentInfo('/online/call', {id:id});
										// if (component.data.code != 0) {
										// 	console.error('获取在线客服信息失败', component)
										// 	replaceStr = ""
										// } else {
										// 	var obj = component.data.data
										// 	replaceStr = that.generateOnlineCustomer(obj)
										// 	articleInfo.content = articleInfo.content.replace(item, replaceStr);
										// 	// console.log("在线客服", replaceStr)
										// }
									} else if (item.indexOf("小程序")!=-1){
										articleInfo.content = articleInfo.content.replace(item, '');
										// let component = await that.asyncGetComponentInfo('/miniapp/call', {id:id});
										// if (component.data.code != 0) {
										// 	console.error('获取小程序信息失败', component)
										// 	replaceStr = ""
										// } else {
										// 	console.log('component', component)
										// 	var obj = component.data.data
										// 	replaceStr = that.generateMiniapp(obj)
										// 	articleInfo.content = articleInfo.content.replace(item, replaceStr);
										// 	// console.log("在线客服", replaceStr)
										// }
									}
								}
							}
						}
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
							image: articleInfo.images.length <=3 ?articleInfo.images:articleInfo.images.slice(0,3),
							releaseDate: articleInfo.update_at,
							likes: articleInfo.like_count,
							collects: articleInfo.fav_count,
							visit: {pv:articleInfo.visit_count+''},
						})
						//#endif
						that.articleInfo = articleInfo;
						that.following = that.articleInfo.follow;
						// 除了攻略文章，其他计算轮播图高度
						if (that.articleInfo.type != 2){
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
					},
					fail: error => {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr();
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
			commentInput() {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages_mine/login/login'
					});
					return
				}
				this.showText = true
				this.textareafocus = true
			},
			inputBlur() {
				this.textareafocus = false
			},
			inputValue(e) {
				if (e.detail.value.length > 18) {
					this.autoHeight = true
				} else {
					this.autoHeight = false
				}
			},
			pubComment() {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages_mine/login/login'
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
				uni.showShareMenu({});
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
	html {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.box-Introduction{
		// background: red;
		box-shadow: 0 5px 10px #F5F5F5 inset;
		// border-top: 2rpx solid #F5F5F5;
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
			// height: auto;
			min-height: 420rpx;
			max-height: 1000rpx;
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
	}

	.mask{
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(0, 0, 0, 0.4);
		top: 0;
		z-index: 100;
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
		// margin-left: 28rpx;
		margin-top: 40rpx;
		.left{
			display: flex;
			align-items: center;
			.userHeard {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
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
					// margin-top: 4rpx;
				}
			}
		}
	}
	.adress-1{
		margin-top: 32rpx;
	}
	.adress,.adress-1 {
		height: 40rpx;
		// margin-top: 32rpx;
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
		.adreessIcon {
			width: 24rpx;
			height: 24rpx;
			margin-top: 8rpx;
			float: left;
		}
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
		margin: 28rpx;
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
		// width: 200rpx;
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
					color: #C9CAD1;
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
						// margin-left: 28rpx;
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
		height: 100px;
		// padding-bottom: 100rpx;
		// height: 300rpx;
		position: fixed;
		background: #ffffff;
		bottom: -100px;
		display: flex;
		z-index: 110;
		// align-items: center;
		// padding-bottom: 110rpx;
		.inputK {
			// height: 28rpx;
			// width: 558rpx;
			// background: #F8F8F8;
			// border-radius: 4px;
			// margin: 16rpx 32rpx;
			// padding: 20rpx 16rpx;
			height: 14px;
			width: 558rpx;
			margin: 8px 16px;
			background: #F8F8F8;
			padding: 10px 8px;
			border-radius: 4px;
		}

		.send {
			// width: 64rpx;
			height: 32rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #0091FF;
			line-height: 32rpx;
			margin-top: 36rpx;
		}
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
		// margin-right: 40rpx;
		position: relative;
		width: 100rpx;
		height: 100%;
		
	}

	.likeBtn {
		width: 52rpx;
		height: 52rpx;
		// margin-right: 8rpx;
	}

	.likeNum {

		height: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 24rpx;
		position: absolute;
		left: 55rpx;
	}

	.fav {
		display: flex;
		align-items: center;
		// margin-right: 40rpx;
		position: relative;
		width: 100rpx;
		height: 100%;
		
	}

	.favBtn {
		width: 52rpx;
		height: 52rpx;
		
		// margin-right: 8rpx;
	}

	.favNum {
		height: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #909399;
		line-height: 24rpx;
		position: absolute;
		left: 55rpx;
	}

	.replyIcon {
		display: flex;
		align-items: center;
		position: relative;
		width: 100rpx;
		height: 100%;
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
		position: absolute;
		left: 55rpx;
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
	
	
	.loading{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
</style>
