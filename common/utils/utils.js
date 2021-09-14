function back() {
	uni.navigateBack({
		delta: 1
	});
}

function home() {
	uni.switchTab({
		url: '/pages/index/index'
	});
}

function isLogin() {
	let Authorization = getApp().globalData.Authorization
	if (!Authorization){
		uni.navigateTo({
			url: '/pages_mine/login/login'
		});
		return false
	}
	return true
}

// water:添加水印，q:中等质量
function addImageProcess(URL='', water=false, q=50){
	if (!URL){
		return '/static/images/userImg.svg'
	}
	if (URL.search('.m3u8|.mp4|.gif|.ts')!=-1){
		return URL
	}
	let networkType = getApp().globalData.networkType
	var url = URL
	// 添加处理头
	if(URL.indexOf('?')>0){
		url = URL.replace(/(\?.*)/g, '?x-oss-process=image')
	} else {
		url += '?x-oss-process=image'
	}
	// 添加水印
	if (water){
		url += '/watermark,image_d2F0ZXJtYXJrLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxQXzg=,g_sw,x_30,y_10'
	}
	// 按照网络不同分低中高压缩质量
	switch(networkType){
		case 'wifi':
		case '5g':
			let qH = Math.round(q*1.25)
			url += '/quality,q_'+(qH>=100?100:qH)
			break;
		case '4g':
			url += '/quality,q_'+Math.round(q)
			break;
		case '3g':
		case '2g':
			let qL = Math.round(q*1.25)
			url += '/quality,q_'+(qL<=8?8:qL)
			break;
	}
	// png转jpg
	if(url.indexOf('.png')>0){
		url += '/format,jpg'
	}
	return url
}

export default {
	back,
	home,
	isLogin,
	addImageProcess
}