<script>
export default {
	globalData: {
		username: '领途羊',
		serviceProvider: 'baidu',
		Authorization: '',
		networkType: '4g',
		navbarHeight: 64, // px
		navigationBarHeight: 44,
	},
	onLaunch: function(res) {
		console.log('App Launch',res);
		
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function (res) {
		  // 请求完新版本信息的回调
		  console.log(res.hasUpdate);
		});
		
		updateManager.onUpdateReady(function (res) {
		  uni.showModal({
		    title: '更新提示',
		    content: '新版本已经准备好，是否重启应用？',
			confirmText: '重启',
		    success(res) {
		      if (res.confirm) {
		        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		        updateManager.applyUpdate();
		      }
		    }
		  });
		});
		
		updateManager.onUpdateFailed(function (res) {
			// 新的版本下载失败
			console.log('版本下载失败原因', res);
			uni.showToast({
				title: '新版本下载失败，请稍后再试',
				icon: 'none'
			});
		});
		
		// 获取小程序平台名称
		uni.getProvider({
			service: 'oauth',
			success: res => {
				if (res.errMsg == 'getProvider:ok') {
					this.globalData.serviceProvider = res.provider.length>0?res.provider[0]:'h5'
				} else {
					uni.showToast({
						title: '获取提供商失败',
						icon: 'none'
					})
				}
			}
		});
		// 获取token
		uni.getStorage({
		    key: 'Authorization',
		    success: res => {
				this.globalData.Authorization = res.data
		    }
		});		
		// 获取网络情况
		uni.getNetworkType({
			success: res => {
				if (res.networkType == "unknown"){
					return
				}
				this.globalData.networkType = res.networkType
			}
		})
		// 获取系统信息
		uni.getSystemInfo({
			success: res => {
				var height = 44
				if (res.navigationBarHeight && res.statusBarHeight){
					this.globalData.navigationBarHeight = res.navigationBarHeight
					height = res.navigationBarHeight+res.statusBarHeight
				}
				this.globalData.navbarHeight = height
			}
		});
	},
	onShow: function(data) {
		console.log('App Show',data);
	},
	onHide: function() {
		console.log('App Hide');
	},
	
	
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
uni-rich-text img{ max-width: 100% !important;}

// /deep/.rich-text-selectable{text-align: justify !important;}
.nav-bar {
	z-index: 9999;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	font-size: 28rpx;
	flex-direction: column;
	background-color: #ffffff;
	// transition: background-color 2s;
}
.slotleft {
	display: flex;
	align-items: center;
}
.fanhui {
	width: 44rpx;
	height: 44rpx;
	margin-left: 36rpx;
}
.fhsy {
	width: 44rpx;
	height: 44rpx;
	/* #ifdef MP-BAIDU */
	margin-left: 94rpx;
	/* #endif */
	/* #ifdef H5 */
	margin-left: 20rpx;
	/* #endif */
}
</style>
