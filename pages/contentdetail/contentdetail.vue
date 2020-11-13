<template>
	<view>

		<view class="example-body">
			<uni-nav-bar fixed="true" :status-bar="true" class="navbar">
				<view slot="left" class="slotleft">
					<image class="fanhui" src="../../static/images/icon-fanhui.svg" @click="back" />
					<image class="fhsy" src="../../static/images/icon-fhsy.svg" @click="home" />
				</view>
				<view class="slottitle">领途羊</view>
			</uni-nav-bar>
		</view>

		<view class="" v-if="swiperHeight">
			<!-- 内容详情轮播图 -->
			<view class="uni-padding-wrap">
				<view class="page-section-spacing" width="100%" :style="{ height: swiperHeight }" v-if="articleList.data.type != 4 && articleList.data.type != 5 ">
					<swiper @change="change" class="swiper" :autoplay="true" :indicator-dots="false">
						<swiper-item v-for="(item, index) in articleList.data.images" :key="index">
							<image class="itemImg" :style="{ width: index == 0 ? '100%' : '' }" :mode="index == 0 ? 'widthFix' : 'aspectFit'" :src="item"></image>
						</swiper-item>
					</swiper>
					<view class="imageCount">{{ current + 1 }}/{{ articleList.data.images.length }}</view>
					<view class="dots">
						<block v-for="(item, index) in articleList.data.images" :key="index"><view :class="[index == current ? 'activieDot' : 'dot']"></view></block>
					</view>
				</view>
				<view class="page-section-spacing" width="100%" v-if="articleList.data.type == 4">
					<video
						class="videobox"
						:style="{ height: swiperHeight }"
						:src="articleList.data.images[1]"
						object-fit="contain"
						:poster="articleList.data.images[0]"
						controls
					></video>
				</view>
			</view>
			<!-- 内容详情 -->
			<view class="detailContent savebottom">
				<view class="userMse">
					<image class="userHeard" :src="articleList.data.avatar" @click="tobloggers(articleList.data.author_id)"></image>
					<view class="userMse-r">
						<view class="userNikename">{{ articleList.data.author_name }}</view>
					</view>
					<view class="followBox" @click="follow()" v-if="!articleList.data.is_follow">
						<image class="followImg" src="../../static/images/followIcon.svg" mode=""></image>
						关注
					</view>
					<view class="isfollowBox" @click="follow()" v-if="articleList.data.is_follow">已关注</view>
				</view>
				<!-- 弹窗 -->
				<u-modal v-model="show" :content="content" :show-title="false" :show-cancel-button="true" @confirm="confirm"></u-modal>
				<!-- 地址 -->
				<view class="adress">
					<image src="../../static/images/iconMap.svg" mode="" class="adreessIcon"></image>
					<view class="adressText" @click="map()">{{ articleList.data.location }}</view>
				</view>
				<!-- 标题 -->
				<view class="contentTitle">{{ articleList.data.title }}</view>
				<!-- 内容文章 -->
				<view class="contentText">
					<!-- <rich-text :nodes="articleList.data.content | formatRichText"></rich-text> -->
					<u-parse
						ref="parse"
						v-if="articleList"
						style="overflow: hidden;"
						lazy-load
						@imgtap="imgTap"
						@linkpress="templateAdd"
						:html="articleList.data.content | formatRichText"
					></u-parse>
				</view>
				<view class="tips">
					<view v-for="item in articleList.data.topics" :key="item.id" @click="toTopic(item.id)">
						<image class="tipsIcon" src="../../static/images/topicIcon.svg" mode=""></image>
						<text>{{ item.name }}</text>
					</view>
					<!-- <view>#<text></text></view> -->
				</view>
				<view class="releaseTime">发布于{{ articleList.data.update_at }}</view>
				<view class="replyLine" >
					
				</view>
				<view class="replyBox">
					<view class="replyText">
						回复
					</view>
					<view class="replyContent">
						<view class="myReply" >
							<image class="userImg" src="../../static/images/userImg.svg" mode="" v-if="userInfo == null"></image>
							<image class="userImg" :src="userInfo.avatar" mode="" v-if="userInfo != null"></image>
							<comment 
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
								
							</u-input>
						</view>
						<view class="reply" v-for="(item,index) in commentsList" :key="index">
							<view class="replyTop" >
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
										<image class="report" src="../../static/images/report.svg" mode=""  @click="toReport(item)"></image>
									</view>
									
								</view>
								
							</view>
							<view class="replyBottom">
								{{item.content}}
							</view>
						</view>
					</view>
					<view class="moreReply" v-if="total != 0" @click="toMoreReply">
						查看全部{{total}}条回复
					</view>
				</view>
				
				<view class="safeBox"></view>
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
							<image class="likeBtn" src="../../static/images/attheart.svg" v-if="articleList.data.liked == 0"></image>
							<image class="likeBtn" src="../../static/images/attHeartActive.svg" v-if="articleList.data.liked == 1"></image>
							<view class="likeNum" v-model="likemessage">{{ articleList.data.like_count }}</view>
						</view>
						<view class="fav" @click="clickFav">
							<image class="favBtn" src="../../static/images/attFav.svg" v-if="articleList.data.fav == 0"></image>
							<image class="favBtn" src="../../static/images/attFavA.svg" v-if="articleList.data.fav == 1"></image>
							<view class="favNum">{{ articleList.data.fav_count }}</view>
						</view>
						<view class="replyIcon" @click="toggleMask('show')">
							<image src="../../static/images/replyIcon.svg" mode=""></image>
							<view class="replyNum" >
								{{total}}
							</view>
						</view>
						<!-- <view class="share" v-if="serviceProvider == 'baidu'" @click="share"><image src="../../static/images/shareIcon.svg"></image></view> -->
					</view>
					<view class=""><view class="loginButton" @click="login" v-if="flag">登录</view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var _this;
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import comment from '@/components/comment/comment.vue';
export default {
	components: {
		uniNavBar,
		uniIcons,
		comment
		// ourLoading
	},
	data() {
		return {
			indicatorDots: true,
			current: 0,
			list: [],
			VX: 17827277778,
			articleList: null,
			token: '',
			article_id: '',
			article_num: null,
			flag: true,
			wechat_id: null,
			swiperHeight: '',
			serviceProvider: '',
			following: 0,
			content: '',
			show: false,
			value:'',
			commentsList:[],
			total:'',
			userInfo:[],
			focus:false
		};
	},
	onShow() {
		// 获取当前小程序的页面栈
		let pages = getCurrentPages();
		// 数组中索引最大的页面--当前页面
		let currentPage = pages[pages.length - 1];
		// 打印出当前页面中的 options
		console.log('onshow--', currentPage.options);
		
		// console.log('文章id====', e);
		uni.showLoading({
			title: '加载中',
			success: () => {
				this.flag = uni.getStorageSync('Authorization') ? false : true;
				console.log(this.flag);
				this.article_num = currentPage.options.article_id;
				this.getArticleDetail(currentPage.options);
				this.getComments(currentPage.options);
				this.getUserInfo()
			}
		});
	},
	created() {
		_this = this;
		this.getOrder();
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
		getOrder() {},
		templateAdd(e) {
			console.log('e', e);

			if (e.group && e.groupid) {
				uni.request({
					url: this.globalUrl + '/marketing/copy',
					data: {
						id: e.groupid
					},
					method: 'PUT',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						if (res.data.code == 0) {
							uni.setClipboardData({
								data: e.group,
								success: () => {
									uni.showToast({
										title: '复制成功',
										icon: 'success'
									});
								}
							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}
				});
			} else {
				console.log(e);
				e.ignore();
				return false;
			}
		},
		// 获取文章详情
		getArticleDetail(e) {
			var that = this;
			uni.request({
				// url:'article',
				url: this.globalUrl + '/article',
				data: {
					article_id: e.article_id
				},
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: async function(res) {
					uni.hideLoading();
					uni.setStorageSync('id', res.data);

					let strIndex = res.data.data.content.match(/<input[^>]*\/>/gi);

					if (strIndex && strIndex.length) {
						// let strId =  newContent.substring(strIndex,1)

						let strId = strIndex[0].slice(36, -4);
						let resCode = await that.getTemplate(strId);
						if (resCode.data.code == 0) {
							let wechat_id = resCode.data.data.wechat_id.replace(/\s*/g, '');
							let str = `<div>
      <span style=" font-size: 28rpx; font-family: 'PingFang SC'; font-weight: 500;">
          详情请加VX：${wechat_id}
      </span><a groupId="${strId}"   group="${wechat_id}" style="color: #0091FF; font-size: 28rpx;margin-left: 36rpx; font-weight: 400;">点击复制</a>
    </div>`;

							res.data.data.content = res.data.data.content.replace(/<input[^>]*\/>/gi, str);
							that.articleList = res.data;
							console.log('文章详情--', that.articleList);
							that.following = that.articleList.data.follow;
							that.$nextTick(() => {
								uni.getImageInfo({
									src: that.articleList.data.images[0],
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
						} else {
							that.articleList = res.data;
							console.log('文章详情', that.articleList);
							that.following = that.articleList.data.follow;
							that.$nextTick(() => {
								uni.getImageInfo({
									src: that.articleList.data.images[0],
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
						}
					} else {
						that.articleList = res.data;
						console.log('文章详情=', that.articleList);
						that.following = that.articleList.data.follow;
						that.$nextTick(() => {
							uni.getImageInfo({
								src: that.articleList.data.images[0],
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
					}
				},
				fail: error => {
					uni.hideLoading();
				}
			});
		},
		imgTap(e) {
			console.log(e);

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
			let msg = this.articleList.data.is_follow ? '确认取消关注?' : '确认关注?';
			let status = this.articleList.data.is_follow ? 0 : 1;

			if (status == 0) {
				that.show = true;
				that.content = '确认取消关注?';
			} else {
				uni.request({
					url: that.globalUrl + '/user/follow',
					data: {
						author_id: that.articleList.data.author_id,
						follow: status
					},
					method: 'POST',
					header: {
						Authorization: uni.getStorageSync('Authorization')
					},
					success: res => {
						if (res.data.code != 0) {
							uni.navigateTo({
								url: '../login/login'
							});
						} else {
							that.articleList.data.is_follow = status == 1 ? true : false;
						}
					}
				});
			}
		},
		// 点击确认
		confirm() {
			var that = this;
			let msg = this.articleList.data.is_follow ? '确认取消关注?' : '确认关注?';
			let status = this.articleList.data.is_follow ? 0 : 1;
			uni.request({
				url: that.globalUrl + '/user/follow',
				data: {
					author_id: that.articleList.data.author_id,
					follow: status
				},
				method: 'POST',
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: res => {
					if (res.data.code != 0) {
						uni.navigateTo({
							url: '../login/login'
						});
					} else {
						that.articleList.data.is_follow = status == 1 ? true : false;
					}
				}
			});
		},
		// 用户信息
		getUserInfo(){
			uni.request({
				url: this.globalUrl+ '/user/info',
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				method: 'get',
				success: (res)=> {
					console.log('个人信息=', res.data);
					this.userInfo = res.data.data
				}
			})
		},
		// 举报
		toReport(e) {
			let token = uni.getStorageSync('Authorization')
			// console.log('tttt',token)
			if(!token){
				uni.navigateTo({
					url: '../login/login'
				});
			}else{
				uni.navigateTo({
					url:'../report/report?id=' + e.id
				})
			}
			
		},
		// 评论
		toggleMask(type){
			this.$refs.comment.toggleMask(type);
		},
		textareaFocus(e) {  
						   //点击输入框时，获取键盘高度，设置距离底部的高度为键盘的高度  
			this.textareaStyle= 'bottom: '+e.detail.height+'px;';  
		},  
		textareaBlur(e){  
							//失去焦点时，设置距离底部为0  
			this.inputClassParent = 'bottom: 0px;';  
		},
		pubComment(e){
			console.log('eee',e)
			uni.request({
				url: this.globalUrl + '/comments',
				data: {
					article_id: this.article_num,
					content:e
				},
				method: 'POST',
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: res => {
					// this.commentsList = res.data.data.list
					this.value = ''
					uni.hideKeyboard()
					this.$refs.comment.toggleMask('none');
					this.getComments()
					console.log('pinglun',res.data)
					if(res.data.code == 10501){
						uni.navigateTo({
							url: '../login/login'
						});
					}else{
						
						if(res.data.code == 15001){
							uni.showToast({
								title: res.data.msg,
								icon:'none',
								duration: 2000
							})
						}else{
							if(res.data.code != 0){
								uni.showToast({
									title: '评论不能为空',
									icon:'none',
									duration: 2000
								})
							}else{
								uni.showToast({
									title: '评论成功',
									icon:'none',
									duration: 2000
								})
							}
						}
					}
					
					
				}
			})
		},
		// 获取评论列表
		getComments(){
			uni.request({
				url: this.globalUrl + '/comments/list',
				data: {
					article_id: this.article_num,
					page:1,
					count:3
				},
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: res => {
					console.log(res)
					if(res.data.data == null){
						uni.request({
							url: this.globalUrl + '/comments/list',
							data: {
								article_id: this.article_num,
								page:1,
								count:3
							},
							success: res =>{
								this.commentsList = res.data.data.list
								this.total = res.data.data.total
								console.log('不带tokencomments',res.data)
							}
						})
					}else{
						this.commentsList = res.data.data.list
						this.total = res.data.data.total
						console.log('comments',res.data)
					}
					
				}
			});
		},
		// 评论点赞
		replyLike(e){
			uni.request({
				url: this.globalUrl + '/comments/likes',
				data: {
					id: e.id,
					like:e.like == 0 ? 1 : 0
				},
				method: 'POST',
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: res => {
					console.log('点赞',res)
					if(res.data.code == 10501){
						uni.navigateTo({
							url: '../login/login'
						});
					}else{
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
		toMoreReply(){
			let e = this.article_num
			uni.navigateTo({
				url:'../comments/comments?article_id=' + e
			})
		},
		// 点赞
		clickLike() {
			var that = this;

			var article_id = uni.getStorageSync('id');
			console.log('art', article_id);

			uni.request({
				url: this.globalUrl + '/user/liked',
				data: {
					article_id: article_id.data.uuid,
					liked: article_id.data.liked == 0 ? 1 : 0
				},
				method: 'POST',
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: res => {
					console.log('点赞', res);
					if (res.data.code != 0) {
						uni.navigateTo({
							url: '../login/login'
						});
					}
					uni.request({
						// url:'article',
						url: this.globalUrl + '/article',
						data: {
							article_id: article_id.data.uuid
						},
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},
						success: async function(res) {
							console.log(res.data.data.liked, res.data.data.like_count, res.data.data.uuid, 333333);
							console.log('eeeeeeeeeeeeeeee', res);
							console.log('文章详情====', res);
							uni.setStorageSync('id', res.data);

							let strIndex = res.data.data.content.match(/<input[^>]*\/>/gi);

							if (strIndex && strIndex.length) {
								// let strId =  newContent.substring(strIndex,1)

								let strId = strIndex[0].slice(36, -4);
								let resCode = await that.getTemplate(strId);

								if (resCode.data.code == 0) {
									let wechat_id = resCode.data.data.wechat_id.replace(/\s*/g, '');
									let str = `<div>
							  <span style=" font-size: 28rpx; font-family: 'PingFang SC'; font-weight: 500;">
							      详情请加VX：${wechat_id}
							  </span><a groupId="${strId}"  group="${wechat_id}" style="color: #0091FF; font-size: 28rpx;margin-left: 36rpx; font-weight: 400;">点击复制</a>
							</div>`;

									res.data.data.content = res.data.data.content.replace(/<input[^>]*\/>/gi, str);
									// console.log(res.data.data.content);

									that.articleList = res.data;
									uni.getImageInfo({
										src: that.articleList.data.images[0],
										success: function(image) {
											console.log('图片高度--', image.height);
											let caseRes = image.width / image.height;
											that.swiperHeight = 100 / caseRes + 'vw';
										}
									});
								} else {
									that.articleList = res.data;
									that.following = that.articleList.data.follow;
									uni.getImageInfo({
										src: that.articleList.data.images[0],
										success: function(image) {
											console.log('图片高度--', image.height);
											let caseRes = image.width / image.height;
											that.swiperHeight = 100 / caseRes + 'vw';
										}
									});
								}
							} else {
								that.articleList = res.data;
								that.following = that.articleList.data.follow;
								console.log('articleList', that.articleList);
							}
						}
					});
				}
			});
		},
		// 收藏
		clickFav() {
			var that = this;

			var article_id = uni.getStorageSync('id');
			uni.request({
				url: this.globalUrl + '/user/favorite',
				data: {
					article_id: article_id.data.uuid,
					favorite: article_id.data.fav == 1 ? 0 : 1
				},
				method: 'POST',
				header: {
					Authorization: uni.getStorageSync('Authorization')
				},
				success: res => {
					console.log('收藏', res);
					if (res.data.code != 0) {

						uni.navigateTo({
							url: '../login/login'
						});
					}
					uni.request({
						// url:'article',
						url: this.globalUrl + '/article',
						data: {
							article_id: article_id.data.uuid
						},
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},
						success: async function(res) {
							uni.setStorageSync('id', res.data);

							let strIndex = res.data.data.content.match(/<input[^>]*\/>/gi);

							if (strIndex && strIndex.length) {
								// let strId =  newContent.substring(strIndex,1)

								let strId = strIndex[0].slice(36, -4);
								let resCode = await that.getTemplate(strId);
								if (resCode.data.code == 0) {
									let wechat_id = resCode.data.data.wechat_id.replace(/\s*/g, '');
									let str = `<div>
							  <span style=" font-size: 28rpx; font-family: 'PingFang SC'; font-weight: 500;">
							      详情请加VX：${wechat_id}
							  </span><a groupId="${strId}"  group="${wechat_id}" style="color: #0091FF; font-size: 28rpx;margin-left: 36rpx; font-weight: 400;">点击复制</a>
							</div>`;

									res.data.data.content = res.data.data.content.replace(/<input[^>]*\/>/gi, str);

									that.articleList = res.data;
									that.following = that.articleList.data.follow;
									uni.getImageInfo({
										src: that.articleList.data.images[0],
										success: function(image) {
											console.log('图片高度--', image.height);
											let caseRes = image.width / image.height;
											that.swiperHeight = 100 / caseRes + 'vw';
										}
									});
								} else {
									that.articleList = res.data;
									that.following = that.articleList.data.follow;
									uni.getImageInfo({
										src: that.articleList.data.images[0],
										success: function(image) {
											console.log('图片高度--', image.height);
											let caseRes = image.width / image.height;
											that.swiperHeight = 100 / caseRes + 'vw';
										}
									});
								}
							} else {
								that.articleList = res.data;
								uni.getImageInfo({
									src: that.articleList.data.images[0],
									success: function(image) {
										console.log('图片高度--', image.height);
										let caseRes = image.width / image.height;
										that.swiperHeight = 100 / caseRes + 'vw';
									}
								});
							}
						}
					});
				}
			});
		},
		getTemplate(id) {
			if (id) {
				return new Promise((resolve, reject) => {
					uni.request({
						// url:'article',
						url: this.globalUrl + '/marketing/unit',
						method: 'get',
						data: {
							group_id: id,
							article_id: this.article_num
						},
						header: {
							Authorization: uni.getStorageSync('Authorization')
						},

						success: res => {
							resolve(res);
						},
						fail: error => {
							reject(error);
						}
					});
				});
			}
		},
		// 登录
		login() {
			uni.navigateTo({
				url: '../login/login'
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
				url: '/pages/index/index'
			});
		},

		map() {
			var that = this;

			const latitude = that.articleList.data.latitude;
			const longitude = that.articleList.data.longitude;
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
			let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
				match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
				return match;
			});

			newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
				match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');

				return match;
			});
			// 适配字体
			newContent = newContent.replace(/(\d+)px/g, function(s, t) {
				s = s.replace('px', '');
				var value = parseInt(s) * 2; //   此处 1rem =120px
				return value + 'rpx';
			});
			// newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			// newContent = newContent.replace(/\<img/gi, '<img style="width:350px;height:auto;display:inline-block;margin:5px auto;"');
			newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
			return newContent;
		}
	}
};
</script>

<style lang="scss" scoped>
html{
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
	margin-left: 40rpx;
	margin-right: 20rpx;
}

.fhsy {
	width: 40rpx;
	height: 40rpx;
}

.slottitle {
	margin-left: 162rpx;
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
.isfollowBox {
	width: 124rpx;
	height: 48rpx;
	background: #f8f8f8;
	border-radius: 12px;
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
	border-radius: 12px;
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
	margin-top: 4rpx;
}
.adress {
	// width: 100rpx;
	height: 40rpx;
	margin-top: 32rpx;
	margin-left: 28rpx;
	background: rgba(0, 145, 255, 0.1);
	border-radius: 20rpx;
	// border: 2rpx solid rgba(0, 145, 255, 1);
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
	font-size: 22rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(0, 145, 255, 1);
	float: right;
}

// 内容
.contentTitle {
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 600;
	color: rgba(48, 49, 51, 1);
	line-height: 32rpx;
	margin-left: 20rpx;
	margin-top: 20rpx;
}

.contentText {
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(96, 98, 102, 1);
	line-height: 56rpx;
	margin: 20rpx;
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

.tips {
	margin-top: 28rpx;
	margin-left: 28rpx;
	display: flex;
	flex-wrap: wrap;
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
.replyLine{
	width: 694rpx;
	height: 0.5px;
	background: #edeff2;
	margin: 28rpx 28rpx 40rpx;
}
// 评论
.replyBox{
	margin: 28rpx;
	
	.relpyText{
		height: 32rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #303133;
		line-height: 32rpx;
	}
	.replyContent{
		.myReply{
			display: flex;
			align-items: center;
			margin-top: 40rpx;
			.userImg{
				width: 68rpx;
				height: 68rpx;
				border-radius: 50%;
				margin-right: 16rpx;
			}
			.replyInput{
				width: 598rpx;
				// height: 68rpx;
				background: #F8F8F8;
				border-radius: 17px;
				padding-left: 32rpx;
			}
		}
		.reply{
			margin-top: 32rpx;
			border-bottom: 0.5px solid #edeff2;
			.replyTop{
				display: flex;
				align-items: center;
				.userImg{
					width: 68rpx;
					height: 68rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}
				.userName{
					height: 28rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #303133;
					line-height: 28rpx;
				}
				.replyTime{
					margin-left: 16rpx;
					height: 24rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #C9CAD1;
					line-height: 24rpx;
				}
				.replyLike{
					width: 44rpx;
					height: 44rpx;
				}
				.report{
					margin-left: 28rpx;
					width: 44rpx;
					height: 44rpx;
				}
			}
			.replyBottom{
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
	.moreReply{
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
.bottomLine{
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
}

.likeBtn {
	width: 52rpx;
	height: 52rpx;
}
.likeNum{
	margin-left: 8rpx;
	margin-right: 40rpx;
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
}

.favBtn {
	width: 52rpx;
	height: 52rpx;
}
.favNum{
	margin-left: 8rpx;
	margin-right: 40rpx;
	height: 24rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #909399;
	line-height: 24rpx;
}
.replyIcon{
	display: flex;
	align-items: center;
	image{
		width: 52rpx;
		height: 52rpx;
	}
	
}
.replyNum{
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
