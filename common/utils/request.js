// 请求封装
import globalUrl from '@/global.js'

function request(obj) {
	let url = globalUrl + obj.url; //地址
	let data = obj.data || {};
	let success = obj.success;
	let method = obj.method || 'GET';
	uni.request({
		url: url,
		data: data,
		header: {
			'Authorization': getApp().globalData.Authorization
		},
		method: method,
		success: function(res) {
			if (res.statusCode != 200){
				uni.showToast({
					title: "网络不给力~,请稍后再试",
					icon: 'none'
				});
				return
			}
			if (res.data.code == 10501 || res.data.code == 10101|| res.data.code == 10502) {
				uni.removeStorageSync("userinfo");
				uni.removeStorageSync("Authorization");
				getApp().globalData.Authorization = ''
				uni.navigateTo({
					url: '/pages_mine/login/login.vue'
				})
				return
			}
			obj.success(res)
		},
		fail: (res) => {
			un.uni.showToast({
				title: '网络不给力~,请稍后再试',
				icon: 'none'
			});
			obj.fail && obj.fail(res)
		},
		complete: function(res) {
		},
	})
}
export default {
	request: request
}