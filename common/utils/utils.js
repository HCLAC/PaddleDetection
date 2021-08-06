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

export default {
	back,
	home
}