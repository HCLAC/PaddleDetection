import http from '@/common/utils/request.js'

// 开放搜索上传数据采集接口
function UploadData(data){
	data.bhv_time = Number((new Date().getTime())/1000).toFixed(0)
	http.request({
		url: '/search/report',
		method: 'post',
		data: data,
		success: res => {
			console.debug('开放搜索上传数据采集成功', data)
		},
		fail: error => {
			console.debug('开放搜索上传数据采集失败', data)
		}
	});
}

export default {
	uploadData: UploadData
}