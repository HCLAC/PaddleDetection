import Vue from 'vue'
import App from './App'
//引入vuex
import globalUrl from './global.js'
Vue.prototype.globalUrl = globalUrl

// 引入request.js
import http from '@/common/utils/request.js'
Vue.prototype.HTTP = http
// 引入utils.js
import utils from '@/common/utils/utils.js'
Vue.prototype.Utils = utils
// 引入opensearch.js
import Opensearch from '@/common/utils/opensearch.js'
Vue.prototype.Opensearch = Opensearch
// import store from './store'
// //把vuex定义成全局组件
// Vue.prototype.$store = store
Vue.mixin({
	methods: {
		setData: function(obj, callback) {
			let that = this;
			let keys = [];
			let val, data;
			Object.keys(obj).forEach(function(key) {
				keys = key.split('.');
				val = obj[key];
				data = that.$data;
				keys.forEach(function(key2, index) {
					if (index + 1 == keys.length) {
						that.$set(data, key2, val);
					} else {
						if (!data[key2]) {
							that.$set(data, key2, {});
						}
					}
					data = data[key2];
				})
			});
			callback && callback();
		} 
	}
});

import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = true

App.mpType = 'app'

// #ifdef H5
import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)
//jsonp封装
import { VueJsonp } from 'vue-jsonp'    // 网上很多博客引用不加{}，会报错
Vue.use(VueJsonp)
// #endif

const app = new Vue({
	...App
})
app.$mount()
