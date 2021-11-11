<template>
	<view class="box">
		<view class="nav-bar">
			<uni-nav-bar :fixed="true" :status-bar="true" :title="title">
				<view slot="left" class="slotleft">
					<!-- #ifndef  MP-BAIDU -->
						<image class="fanhui" src="/static/images/icon-fanhui.svg" @click="back" />
					<!-- #endif -->
					<image class="fhsy" src="/static/images/icon-fhsy.svg" @click="home" />
				</view>
			</uni-nav-bar>
		</view>
		<view class="top">
			<u-dropdown height="88" :border-bottom="false" border-color="#FFE512" active-color="rgb(96, 98, 102)">
				<u-dropdown-item v-model="profession" title="职业" :options="options1"  @change="change1"></u-dropdown-item>
				<u-dropdown-item v-model="level" title="级别" :options="options2" @change="change2"></u-dropdown-item>
				<u-dropdown-item v-model="working_years" title="经验" :options="options3" @change="change3"></u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="content">
			<view class="c-box" v-for="(item,index) in contentList" :key = 'index'>
				<view class="pm" v-if="item.level == 0">
					<image src="/static/images/jp.png" mode=""></image>
				</view>
				<view class="pm" v-else-if="item.level == 1">
					<image src="/static/images/yp.png" mode=""></image>
				</view>
				<view class="pm" v-else>
					<image src="/static/images/tp.png" mode=""></image>
				</view>
				<view class="left-box" @click="details">
					<view class="left">
						<image src="/static/images/logo.png" mode=""></image>
					</view>
					<view class="center">
						<view class="title">
							{{ item.name }}
						</view>
						<view class="company">
							执业{{ item.working_years }}年/{{ item.company }}
						</view>
						<view class="people">
							已服务{{ item.number_of_people }}人
						</view>
						<text class="professionObj">
							{{ professionObj[item.profession] }}
						</text>
					</view>
					
				</view>
				<view class="right">
					在线咨询
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				profession:'',
				levelArr: [
				{
				  id: '0',
				  name: '金牌旅游管家'
				},
				{
				  id: '1',
				  name: '银牌旅游管家'
				},
				{
				  id: '2',
				  name: '铜牌旅游管家'
				}
			  ],
				contentList:[],
				profession: '',
				level:'',
				working_years: '',
				options1: [{
						label: '不限',
						value: '',
					},
					{
						label: '导游',
						value: '0',
					},
					{
						label: '旅游达人',
						value: '1',
					},
					{
						label: '旅游定制师',
						value: '2',
					}
				],
				options2: [{
						label: '不限',
						value: '',
					},
					{
						label: '金牌旅游管家',
						value: '0',
					},
					{
						label: '银牌旅游管家',
						value: '1',
					},
					{
						label: '铜牌旅游管家',
						value: '2',
					}
				],
				options3: [{
						label: '不限',
						value: '',
					},
					{
						label: '1～3年',
						value: '0',
					},
					{
						label: '3～5年',
						value: '1',
					},
					{
						label: '5～7年',
						value: '2',
					},
					{
						label: '7年以上',
						value: '3',
					}
				],
				professionObj:{
					'0':'导游',
					'1':'旅游达人',
					'2':'旅游定制师'
				},
			};
		},
		onLoad() {
			// 获取管家列表
			this.getComments()
		},
		onShow() {
			// 获取管家列表
			this.getComments()
		},
		methods:{
			details(){
				uni.navigateTo({
					url:'/pages_content/housekeeperList/housekeeperList'
				})
			},
			change1(value){
				this.profession = value
				this.level = ''
				this.working_years = ''
				this.getComments()
				console.log(111)
			},
			change2(value){
				this.profession = ''
				this.working_years = ''
				this.level = value
				this.getComments()
			},
			change3(value){
				this.profession = ''
				this.level = ''
				this.working_years = value
				this.getComments()
			},
			// 获取管家列表
			getComments() {
				this.HTTP.request({
					url: '/bulter/list',
					data: {
						count:20,
						page:1,
						filter:{
							level:this.level,
							profession:this.profession,
							working_years:this.working_years
						}
					},
					success: res => {
						this.contentList = res.data.data.list
						console.log(this.contentList,'管家详情')
					}
				});
			},
		}
	}
</script>

<style lang="scss">
.box{
	.sw-6__u-cell-item-box{
		display: flex;
		flex-wrap: wrap;
		padding-bottom:240px;
		padding-top: 10px;
		border-top: none;
		border-radius:  0 0 24rpx 24rpx;
		overflow: hidden;
	}
	.u-cell-box{
		border: none;
	}
	.sw-7__u-cell{
		padding: 20rpx 18rpx !important;
	}
	.slot-content{
		height: 400px;
		background: pink;
	}
	.top{
		width: 100%;
		// height: 88rpx;
	}
	.content{
		background: #F6F6F8;
		width: 100%;
		min-height: 100%;
		position:fixed;
		padding-top: 20rpx;
		.c-box{
			width: 694rpx;
			height: 250rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			display: flex;
			justify-content: space-between;
			padding: 0 40rpx;
			margin: 0 auto;
			margin-bottom: 20rpx;
			position: relative;
			.pm{
				width: 60rpx;
				height: 58rpx;
				position: absolute;
				left: 0;
				top: -8rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.left-box{
				display: flex;
				.left{
					border-radius: 50%;
					overflow: hidden;
					width: 100rpx;
					height: 100rpx;
					margin-top: 30rpx;
					// margin: 30rpx 16rpx 0 40rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.center{
					margin-left: 16rpx;
					.title{
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #303133;
						margin-top: 34rpx;
					}
					.company{
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #606266;
						margin-top: 10rpx;
					}
					.people{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						margin-top: 10rpx;
					}
					.professionObj{
						width: 158rpx;
						height: 38rpx;
						background: #FFF1B8;
						border-radius: 21rpx;
						opacity: 0.7;
						border: 2rpx solid #FFE512;
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #303133;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 12rpx;
					}
				}
			}
			.right{
				width: 168rpx;
				height: 60rpx;
				background: #FFE512;
				border-radius: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #303133;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: auto 0;
			}
		}
	}
}
</style>
