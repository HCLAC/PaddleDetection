//  公共的方法
 
const baseUrl = "http://121.40.30.19";  // 请求地址
const $http = {
		get: function({
			url,
			param,
			header
		}) {
			return new Promise(function(resolve, reject) {
				uni.request({
					url: baseUrl + url,
					data: param,
					method: "GET",
					success: function(res) {
						if (res.statusCode !== 200) {
							reject(res);
						} else {
							resolve(res);
						}
					},
					fail: function(err) {
						reject(err);
					}
				})
			})
		},
		post: function({
			url,
			data,
			header
		}) {
			return new Promise(function(resolve, reject) {
				uni.request({
					url: baseUrl + url,
					data: data,
					method: "POST",
					// header: {
					// 	'Content-Type': 'application/x-www-form-urlencoded'
					// },
					success: function(res) {
						if (res.statusCode !== 200) {
							reject(res)
						} else {
							resolve(res);
						}
					},
					fail: function(err) {
						reject(err)
					}
				})
			})
		},
		postJSON: function({
			url,
			data,
			header
		}) {
			return new Promise(function(resolve, reject) {
				uni.request({
					url: baseUrl + url,
					data: data,
					method: "POST",
					header: {
						'Content-Type': 'application/json;charset=UTF-8'
					},
					success: function(res) {
						if (res.statusCode !== 200) {
							reject(res)
						} else {
							resolve(res);
						}
					},
					fail: function(err) {
						reject(err)
					}
				})
			})
		},
		upImg: function({
			url,
			imgUrl
		}) {
			return new Promise(function(resolve, reject) {
				uni.uploadFile({
					url: "baseUrl" + url,
					filePath: imgUrl,
					name: 'file',
					success: function(uploadFileRes) {
						resolve(uploadFileRes);
					},
 
					fail: function(err) {
						reject(err)
					}
				});
			})
		}
	}
export default $http;