

// try{

// 	if(userInfo){
// 		console.log(userInfo,99888)
// 	}
// }catch(e){
// 	//TODO handle the exception
// 	console.error(e)
// }
// var userInfo
// uni.getStorage({
// 	key: 'Authorization',
// 	success: (res) => {
// 		console.log(res)

// 		if (res.data) {
// 			userInfo = res.data
// 		} else {
// 			userInfo = null
// 		}
// 	},
// 	fail: e => {
// 		console.error(e)
// 		debugger
// 	}
// });
// console.log(userInfo)
// debugger
// const token = userInfo ? userInfo : null //获取token

// 请求封装
function request(obj) {
	let url = this.globalUrl + obj.url; //地址
	let data = obj.data || {};
	let success = obj.success;
	let method = obj.method || 'POST';
	uni.request({
		url: url,
		data: data,
		header: {
			'Authorization': uni.getStorageSync('Authorization')
		},
		method: method,
		success: function(res) {
			// 判断token是否过期
			console.log('判断是否登录',res)
			// debugger
			if (res.data.code != 0) {
				// debugger
				uni.showModal({
					title: '提示',
					content: res.data.msg,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.redirectTo({
								url: '../login/login'
							})
						}
					}
				})
				return
			}
		},
		fail: function(res) {},
		complete: function(res) {
			console.log("请求成功", res)
		},
	})
}
export default {
	request: request
}
