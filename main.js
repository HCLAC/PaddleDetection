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
// import store from './store'
// //把vuex定义成全局组件
// Vue.prototype.$store = store

import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = true

App.mpType = 'app'

// import MetaInfo from 'vue-meta-info'
// Vue.use(MetaInfo)


const app = new Vue({
	...App
})
app.$mount()
