<template>
	<view>
		<u-navbar autoBack :safeAreaInsetTop="true" fixed :placeholder="true">
			<view slot="center" class="slot-wrap">
				<view class="search-wrap">
					<u-search v-model="formData.keywords" :show-action="false" inputAlign="center" @search="searchBtn" ></u-search>
				</view>
			</view>
			
		</u-navbar>
		<view class="list mt-4 px-3 pb-4">
			<view class="title">
				{{this.$t('node.search')}}：
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
							委托数量(PUN)
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
				list:[],
				loadtext:this.$t('punDeal.more'),//1、上拉加载更多 2、加载中… 3、没有更多了
			};
		},
		methods:{
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
			searchBtn(){
				if(this.formData.keywords==""){
					uni.showToast({
						icon:"none",
						title:this.$t('node.nodeSearch')
					})
				}else{
					this.getList2();
				}
			},
			//跳转节点详情+委托
			goEntrust(adress){
				uni.navigateTo({
					url:"/pages/node/entrust/entrust?wallet_adress="+adress
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
	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
	}
.search-wrap {
	margin: 0 20rpx 0 90rpx;
	flex: 1;
}
.list{
	.title{
		font-size: 32rpx;
		margin-bottom: 20rpx;
		text{
			color: #ff9900;
		}
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
			}
		}
	}
}
</style>
