<script>
export default {
	onLaunch: function(res) {
		console.log('App Launch',res);
		// const updateManager = uni.getUpdateManager();
		
		// updateManager.onCheckForUpdate(function (res) {
		//   // 请求完新版本信息的回调
		//   console.log(res.hasUpdate);
		// });
		
		// updateManager.onUpdateReady(function (res) {
		//   uni.showModal({
		//     title: '更新提示',
		//     content: '新版本已经准备好，是否重启应用？',
		//     success(res) {
		//       if (res.confirm) {
		//         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		//         updateManager.applyUpdate();
		//       }
		//     }
		//   });
		
		// });
		
		// updateManager.onUpdateFailed(function (res) {
		//   // 新的版本下载失败
		// });
		
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

</style>
