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
		// 获取token
		Authorization = uni.getStorageSync('Authorization')
		getApp().globalData.Authorization = Authorization
		if (!Authorization){
			uni.navigateTo({
				url: '/pages_mine/login/login'
			});
			return false
		}
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

/*函数节流*/
function throttle(fn, interval) {
  var enterTime = 0;//触发的时间
  var gapTime = interval || 300 ;//间隔时间，如果interval不传，则默认300ms
  return function() {
    var context = this;
    var backTime = new Date();//第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context,arguments);
      enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
function debounce(fn, interval) {
  var timer;
  var gapTime = interval || 200;//间隔时间，如果interval不传，则默认200ms
  return function() {
    clearTimeout(timer);
    var context = this;
    var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function() {
      fn.call(context,args);
    }, gapTime);
  };
}

export default {
	back,
	home,
	isLogin,
	addImageProcess,
	throttle,
	debounce,
}