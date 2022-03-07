<template>
	<view class="p-3">
		<view class="item rounded-lg mb-2" v-for="(item,index) in list" :key="index">
			<view class="time p-2">
				<text>{{$t('pledge.receiveTime')}}：{{item.create_time}}</text>
			</view>
			<view class="main flex px-3 py-2 flex-between">
				<view class="box">
					<view class="number text-orange">
						{{item.amount}}
					</view>
					<view class="title">
						{{$t('pledge.receiveNum')}}
					</view>
				</view>
				<view class="box">
					<view class="statue text-blue">
						{{item.handling_fee}}
					</view>
					<view class="title">
						{{$t('pledge.receiveFree')}}
					</view>
				</view>
			</view>
			
		</view>
		<view class="p-3">
			<!-- <u-loading-icon></u-loading-icon> -->
			<u-divider :text="loadtext"></u-divider>
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
					timestamp:'',
					page:'1',
					number:'10'
				},
				signForm:{
					sign:''
				},
				list:[],
				loadtext:this.$t('punDeal.more'),//1、上拉加载更多 2、加载中… 3、没有更多了
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('current.titlePledge')
			});
			this.getList2()
		},
		methods:{
			getList(){
				this.formData.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.signForm.sign=this.$rsaEncryptlong(data);
				this.$api.recordPledge(this.signForm).then(res=>{
					let list=res.list
					this.list=[...this.list,...list]
					//恢复加载状态
					this.loadtext=res.list.length<10 ? this.$t('punDeal.nomore'):this.$t('punDeal.more')
				});
			},
			getList2(){
				this.formData.page="1"
				this.formData.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.signForm.sign=this.$rsaEncryptlong(data);
				this.$api.recordPledge(this.signForm).then(res=>{
					let list=res.list
					this.list=[...list]
					//恢复加载状态
					this.loadtext=res.list.length<10 ? this.$t('punDeal.nomore'):this.$t('punDeal.more')
				});
			}
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
.item{
	background-color: #FFFFFF;
	.time{
		font-size: 26rpx;
		color: #909399;
		border-bottom: solid 1rpx #f3f4f6;
	}
	.box{
		.title{
			color: #909399;
			font-size: 24rpx;
		}
		.number{
			font-size: 32rpx;
		}
		.statue{
			font-size: 30rpx;
		}
	}
}
</style>
