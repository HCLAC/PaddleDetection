import baseurl from './config.js'

const userInfo = uni.getStorageSync('Authorization');    //获取token
const token = userInfo.token  //获取token

// 请求封装
function request(obj) {
	let url = baseurl + obj.url;  //地址
	let data = obj.data || {};
	let success = obj.success;
	let method = obj.method || 'POST';
	uni.request({
		url: url,
		data:data,
		header:{
			'token':token,
		},
		method: method,
		success: function(res) {
			// 判断token是否过期
			if (res.data.status == 601) {
				uni.showModal({
					title: '提示',
					content: res.data.statusMsg,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.redirectTo({
								url: '../Login/register'
							})
						}
					}
				})
				return
			}
			
				success(res)
				
	
		
		},
		fail: function(res) {},
		complete: function(res) {
			console.log("请求成功")
		},
	})
}
export default {
	request:request
}