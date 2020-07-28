import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: true,
		hasLogin: false,
		nickName: "",
		phone:"",
		Authorization:""
	},
	mutations: {
		login(state, phone) {
			state.phone = phone;
			state.hasLogin = true;
		},
		logout(state) {
			state.phone = "";
			state.hasLogin = false;
		}
	}
})

export default store
