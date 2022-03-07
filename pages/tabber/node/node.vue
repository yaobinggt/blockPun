<template>
	<view class="node-warp">
		 <u-navbar :title="this.$t('node.title')" @rightClick="rightClick" leftIcon="" rightIcon="search"  :safeAreaInsetTop="true" fixed :placeholder="true"></u-navbar>
		<view class="node p-3">
			<view class="button-top flex">
				<u-button type="primary" :text="this.$t('node.nodeBtn1')" :disabled="disabled" shape="circle" class="mr-2" @click="goPresent"></u-button>
				<u-button type="warning" :text="this.$t('node.nodeBtn2')" :disabled="disabled" shape="circle" class="ml-2" @click="goMyEntrust"></u-button>
			</view>
			<view class="list mt-4">
				<view class="title">
					{{this.$t('node.title')}}
				</view>
				<view class="items">
					<view class="item rounded-lg flex flex-between p-2 mb-2" v-for="(item,index) in list" :key="index" @click="goEntrust(item.wallet_adress)">
						<view class="left">
							<view class="name">
								{{item.wallet_name}}
							</view>
							<view class="address">
								{{item.wallet_adress | ellipsis}}
							</view>
						</view>
						<view class="right">
							<view class="number">
								{{item.receive_entrust}}
							</view>
							<view class="titleNum">
								{{$t('node.entrustAllNum')}}(PUN)
							</view>
						</view>
					</view>
					<view class="p-3">
						<!-- <u-loading-icon></u-loading-icon> -->
						<u-divider :text="loadtext"></u-divider>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				formData:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
					keywords:"",
					page:'1',
					number:'10',
				},
				formSign:{
					sign:''
				},
				disabled:true,
				list:[],
				loadtext:this.$t('punDeal.more'),//1、上拉加载更多 2、加载中… 3、没有更多了
			};
		},
		onShow() {
			// uni.setNavigationBarTitle({
			// 	title: this.$t('nav.node')
			// });
			uni.setTabBarItem({
			  index: 1,
			  text: this.$t('nav.node'),
			});
			this.getList2()
		},
		methods:{
			//获取节点列表
			getList(){
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.pposlist(this.formSign).then(res=>{
					console.log(res)
					let list=res.list
					this.list=[...this.list,...list]
					//恢复加载状态
					this.loadtext=res.list.length<10 ? this.$t('punDeal.nomore'):this.$t('punDeal.more')
				})
			},
			getList2(){
				if(uni.getStorageSync('default_wallet')){
					this.disabled=false;
				}else{
					this.disabled=true;
				}
				console.log(this.disabled)
				this.formData.page="1"
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.pposlist(this.formSign).then(res=>{
					console.log(res)
					let list=res.list
					this.list=[...list]
					//恢复加载状态
					this.loadtext=res.list.length<10 ? this.$t('punDeal.nomore'):this.$t('punDeal.more')
				})
			},
			//跳转当前地址
			goPresent(){
				uni.navigateTo({
					url:"/pages/node/present/present"
				})
			},
			//跳转节点详情+委托
			goEntrust(adress){
				if(uni.getStorageSync('default_wallet')){
					uni.navigateTo({
						url:"/pages/node/entrust/entrust?wallet_adress="+adress
					})
				}else{
					uni.showToast({
						icon:"none",
						title: this.$t('node.nodeTips')
					})
				}
  			},
			//跳转我的委托
			goMyEntrust(){
				uni.navigateTo({
					url:"/pages/node/myEntrust/myEntrust"
				})
			},
			//跳转搜索页面
			rightClick(){
				uni.navigateTo({
					url:"/pages/node/search/search"
				})
			},
		},
		// 上拉加载
		onReachBottom() {
			// if(this.loadtext!=="上拉加载更多") return;
			this.loadtext=this.$t('punDeal.loding')
			this.formData.page++;
			//请求数据
			
			this.getList()
			
		},
	}
</script>

<style lang="scss" scoped>
.list{
	.title{
		font-size: 32rpx;
		margin-bottom: 20rpx;
	}
	.item{
		background-color: #FFFFFF;
		font-size: 28rpx;
		.left{
			.name{
				font-size: 28rpx;
				color: #303133;
			}
			.address{
				color: #909399 !important;
				font-size: 26rpx;
			}
		}
		.right{
			.number{
				text-align: right;
				font-size: 32rpx;
				color: #ff9900;
			}
			.titleNum{
				color: #909399;
				font-size: 26rpx;
				float: right;
			}
		}
	}
}
.warp{
	height: 100%;
	margin-top: 200rpx;
}
</style>
