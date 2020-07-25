<template>
	<view class="content">
		<!-- 用户信息 -->
		<view class="usermes">
			<image class="userAva" src="../../static/images/mine-actived.png">
			</image>
			<view class="userR">
				<view class="userName">
					用户昵称
				</view>
				<view  class="logout">退出登录</view>
			</view>
		</view>
		<!-- 我的收藏 -->
		<view class="myCollection">
			<view class="collectionText">
				我的收藏
			</view>
			<view class="collectionContent">
				<view class="collectionTips" v-for="item in tipList">
					<image src="" class="tipImg"></image>
					<view class="tipsR">
						<view class="tipTitle">
							{{item.tipTitle}}
						</view>
						<view class="tipBody">
							{{item.tipBody}}
						</view>
						<!-- 地址 -->
						<view class="contentAdress">
							<image class="caImg" src="../../static/images/dd.png"></image>
							{{item.tipAdress}}
						</view>
					</view>
				</view>
			</view>
			<view class="end">
				<view class="endLine">
				</view>
				END
				<view class="endLine">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data(){
			return{
				tipList:[
					{key:"1",tipTitle:"内容主标题（展示20个字符）",tipBody:"这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文",tipAdress:"洱海·云南省大理市"},
					{key:"2",tipTitle:"内容主标题（展示20个字符）",tipBody:"这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文",tipAdress:"云南"},
					{key:"3",tipTitle:"内容主标题（展示20个字符）",tipBody:"这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文",tipAdress:"大理"},
					{key:"4",tipTitle:"内容主标题（展示20个字符）",tipBody:"这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文",tipAdress:"泸沽湖"},
					{key:"6",tipTitle:"内容主标题（展示20个字符）",tipBody:"这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文",tipAdress:"洱海·云南省大理市"},
					{key:"7",tipTitle:"内容主标题（展示20个字符）",tipBody:"这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文",tipAdress:"洱海·云南省大理市"}
				],
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'phone']),
		onLoad() {

			let uniIdToken = uni.getStorageSync('uniIdToken')
			this.login(uni.getStorageSync('phone'))
			if (uniIdToken) {
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'checkToken',
					},
					success: (e) => {

						console.log('checkToken success', e);

						if (e.result.code > 0) {
							//token过期或token不合法，重新登录
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					},
					fail(e) {
						uni.showModal({
							content: JSON.stringify(e)
						})
					}
				})
			} else {
				this.guideToLogin()
			}
		},
		methods: {
			...mapMutations(['login']),
			guideToLogin() {
				if (this.forcedLogin) {
					uni.navigateTo({
						url: '../login/login',
					});
				}
				// uni.showModal({
				// 	title: '未登录',
				// 	content: '您未登录，需要登录后才能继续',
				// 	/**
				// 	 * 如果需要强制登录，不显示取消按钮
				// 	 */
				// 	showCancel: this.forcedLogin,
				// 	success: (res) => {
				// 		if (res.confirm) {
				// 			/**
				// 			 * 如果需要强制登录，使用reLaunch方式
				// 			 */
				// 			if (this.forcedLogin) {
				// 				uni.reLaunch({
				// 					url: '../login/login'
				// 				});
				// 			} else {
				// 				uni.navigateTo({
				// 					url: '../login/login'
				// 				});
				// 			}
				// 		}
				// 	}
				// });
			}
		}

	}
</script>

<style>
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul {
		font-size: 15px;
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul>view {
		line-height: 25px;
	}
	/* 用户信息 */
	.usermes{
		height: 130px;
		display: flex;
		align-items: center;
		background-color: #f3f3f3;
	}
	.userAva{
		margin-left: 15px;
		width: 65px;
		height: 65px;
		border: 1px #333333 solid;
		border-radius: 50%;
	}
	.userR{
		margin-left: 25px;
	}
	.userName{
		font-size: 18px;
		font-weight: 900;
		color: #000000;
		margin-bottom: 8px;
	}
	.logout{
		margin-top: 4px;
		width: 80px;
		height: 20px;
		font-size: 12px;
		background-color: #f7f7f7;
		border: 1px #B9B9BF solid;
		border-radius: 30px;
		line-height: 20px;
		text-align: center;
	}
	/* 我的收藏卡片 */
	.collectionContent{
		display: flex;
		flex-direction: column;
	}
	.myCollection{
		text-align: center;
	}
	.collectionText{
		text-align: center;
		margin: 5px 0;
	}
	.collectionTips{
		display: flex;
		padding: 5px;
		border: 1px #AAAAAA solid;
	}
	.tipImg{
		width: 110px;
		height: 90px;
		background-color: #B9B9BF;
		border-radius: 5px;
	}
	.tipsR{
		margin-left: 10px;
	}
	.tipTitle{
		font-size: 14px;
		font-weight: 900;
	}
	.tipBody{
		font-size: 12px;
		color: #C0C0C0;
		width: 185px;
		height: 50px;
		margin: 5px 0;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	.contentAdress{
		font-size: 12px;
		display: flex;
		color: #4CA2FF;
		text-decoration: underline;
	}
	.caImg{
		width: 15px;
		height: 15px;
	}
	.end{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
	}
	.endLine{
		width: 40px;
		height: 1px;
		background-color: #666666;
	}
</style>
