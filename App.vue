<script>
export default {
	globalData: {
		username: '领途羊',
		serviceProvider: 'baidu',
		Authorization: '',
		networkType: '4g',
		navbarHeight: 64, // px
	},
	onLaunch: function(res) {
		console.log('App Launch',res);
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
	font-size: 14px;
	flex-direction: column;
	background-color: #ffffff;
	// transition: background-color 2s;
}
.slotleft {
	display: flex;
	align-items: center;
}
.fanhui {
	width: 22px;
	height: 22px;
	margin-left: 18px;
}
.fhsy {
	width: 22px;
	height: 22px;
	/* #ifdef MP-BAIDU */
	margin-left: 47px;
	/* #endif */
	/* #ifdef H5 */
	margin-left: 10px;
	/* #endif */
}
</style>
