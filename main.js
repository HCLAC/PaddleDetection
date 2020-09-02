import Vue from 'vue'
import App from './App'
//引入vuex
import globalUrl from './global.js'
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
import uView from "uview-ui";
Vue.use(uView);
<<<<<<< HEAD
Vue.prototype.globalUrl = 'https://devapi.lingtuyang.cn/v2'
=======
Vue.prototype.globalUrl = globalUrl
>>>>>>> feature/sz
// import http from './api/api.js'
// import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
// Vue.component('mescroll-uni', MescrollUni)	
	
Vue.config.productionTip = false
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
Vue.component("mescroll-body", MescrollBody);
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
