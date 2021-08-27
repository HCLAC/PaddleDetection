<template>
	<view>
		<swan-sitemap-list
		    :list-data="listData"
		    :current-page="currentPage"
		    :total-page="totalPage"
		    path="/swan-sitemap/index">
		</swan-sitemap-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [],
				totalPage: 1,
				currentPage: 1,
				path: 'swan-sitemap/index'
			}
		},
		onLoad(e) {
			// 初始页面打开时，需要读取页面的 currentPage 参数（即翻页页码），并根据参数值请求数据
			let currentPage = e.currentPage;
			// 起始页码为 1，如读取到的值为空，默认赋值起始页码
			this.currentPage = +currentPage || 1;
			// 根据当前页码获取该页数据资源
			this.requestData(currentPage);
		},
		methods: {
			requestData(currentPage){
				var pageSize = 150
				this.HTTP.request({
					url: '/article/sitemap?page=' + currentPage + '&count=' + pageSize,
					data: {
					},
					success: res => {
						if (res.statusCode != 200 || res.data.code != 0){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return
						}
						var list = res.data.data.list
						if (!list){
							return
						}
						list.forEach((item, index) => {
							item.path = '/pages_content/article/article?article_id=' + item.uuid
							item.releaseDate = item.update_at
							})
						this.listData = res.data.data.list,
						this.totalPage = res.data.data.total_page
					}
				})
			}
		}
	}
</script>

<style>

</style>
