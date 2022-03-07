<template>
	<view>
		<view class="list p-3">
			<view class="item p-2 rounded-lg mb-2" v-for="(item,index) in list" :key="index">
				<view class="address font-sm">
					{{$t('set.address')}}:<text>{{item.wallet_adress | ellipsis}}</text>
				</view>
				<view class="content flex-between py-2">
					<view class=" font-md">
						{{$t('mining.createNum')}}
						<view class="numb font-lg">
							{{item.node_number}}
						</view>
					</view>
					<view class="statue" >
						{{item.type}}
					</view>
				</view>
				<view class="timer font-sm">
					{{$t('mining.createPay')}}：<text>{{item.create_time}}</text>
				</view>
			</view>
			<view class="p-3">
				<!-- <u-loading-icon></u-loading-icon> -->
				<u-divider :text="loadtext"></u-divider>
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
				title: this.$t('mining.title3')
			});
			this.getList2()
		},
		methods:{
			getList(){
				this.formData.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.signForm.sign=this.$rsaEncryptlong(data);
				console.log(data)
				this.$api.presaleNodeList(this.signForm).then(res=>{
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
				console.log(data)
				this.$api.presaleNodeList(this.signForm).then(res=>{
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
.list{
	.item{
		background-color: #FFFFFF;
		text{
			color: #606266;
			margin-left: 10rpx;
		}
		.content{
			.numb{
				color: #2979ff;
			}
		}
	}
}
</style>
