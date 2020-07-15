<template>
	<view>
		<template v-if="!loginStatus">
			<view class="flex align-center justify-center font font-weight-bold my-2">
				登录社区，体验更多功能
			</view>
			<outer-login></outer-login>
			<view class="flex align-center justify-center font text-secondary my-2" hover-class="text-main" @click="openLogin">
				账号/邮箱/手机登录 <text class="ml-1 iconfont icon-jinru"></text>
			</view>
		</template>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		mounted() {
			
		},
		computed:{
			...mapState({
				// 4 这相当于loginStatus 是vue的那个loginstatus了 ，他地方就可以this.调用
				loginStatus:state=>state.loginStatus,
				user:state=>state.user
				// 5 如果名字一样也可以 不用对象可以直接写...mapState(['loginStatus'])
			}),
			// 6 多说一点改变vuex里面的state里面的数据，一定要用commit的形式，方便vue追踪数据变化。
			avator(){
				return this.user.userpic ? this.user.userpic : '/static/mv.png'
			}
		},
		methods: {
			// 打开登录页
			openLogin(){
				uni.navigateTo({
					url: '../login/login',
				});
			}
			
		}
	}
</script>

<style>

</style>
