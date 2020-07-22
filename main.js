import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
Vue.component("mescroll-body", MescrollBody);
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
