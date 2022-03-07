<template>
	<view class="p-3">
		<view class="item rounded-lg mb-2" v-for="(item,index) in list" :key="index">
			<view class="time p-2">
				<text>{{$t('pledge.timePledge')}}：{{item.create_time}}</text>
			</view>
			<view class="main flex p-2 flex-center">
				<view class="box flex-5">
					<view class="number text-orange">
						{{item.amount}}
					</view>
					<view class="title">
						{{$t('pledge.numPledge')}}
					</view>
				</view>
				<view class="box flex-3">
					<view class="statue" :class="item.is_ep==1?'text-blue':'text-green'">
						{{item.is_ep==1 ? $t('pledge.state1') : $t('pledge.state2')}}
					</view>
					<view class="title">
						{{$t('pledge.statePledge')}}
					</view>
				</view>
				<view class="box flex-1">
					<u-button type="primary" size="small" :text="$t('pledge.btnPledge')" :disabled="item.is_ep==2" :plain="item.is_lift==1" @click="open(item.transfer_hash)"></u-button>
				</view>
			</view>
		</view>
		<view class="p-3">
			<u-divider :text="loadtext"></u-divider>
		</view>
		<!-- 密码验证 -->
		<u-popup :show="show" :round="10" mode="center" :closeOnClickOverlay="false" @close="close" @open="open">
			<view class="pop-warp p-2">
				<view class="title py-2 flex justify-center">
					<text>{{this.$t('importKey.popTitle')}}</text>
				</view>
				<view class="pop-main mb-3">
					<u--form class="">
						<u-form-item :borderBottom="false" ref="item1">
							<u--input class="shop-input" type="password" v-model="password" :placeholder="this.$t('importKey.password')" clearable></u--input>
						</u-form-item>
					</u--form>
				</view>
				<view class="pop-btn flex flex-center">
					<u-button :text="this.$t('public.cancel')" class="mr-2" @click="close"></u-button>
					<u-button :text="this.$t('public.submit')" type="primary" class="ml-2" @click="relieve"></u-button>
				</view>
			</view>
		</u-popup>
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
					page:'1',
					number:'10',
				},
				formSign:{
					sign:''
				},
				formGas:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
				},
				gasSign:{
					sign:''
				},
				formRelieve:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
					transfer_hash:'',
					wallet_pass:'',
					gas:'',
				},
				relieveSign:{
					sign:''
				},
				list:[],
				loadtext:this.$t('punDeal.more'),//1、上拉加载更多 2、加载中… 3、没有更多了
				show:false,
				password:''
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('pledge.title')
			});
			this.getList2();
			
		},
		methods:{
			open(hash) {
				this.show = true;
				this.getGas()
				this.formRelieve.transfer_hash=hash;
			},
			close() {
				this.show = false
			},
			//获取质押列表
			getList(){
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.pledgeRecord(this.formSign).then(res=>{
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
				console.log(data)
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.pledgeRecord(this.formSign).then(res=>{
					console.log(res)
					let list=res.list
					this.list=[...list]
					//恢复加载状态
					this.loadtext=res.list.length<10 ? this.$t('punDeal.nomore'):this.$t('punDeal.more')
				})
			},
			//获取手续费
			getGas(){
				this.formGas.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formGas,{}));
				this.gasSign.sign=this.$rsaEncryptlong(data);
				this.$api.transferPunGas(this.gasSign).then(res=>{
					console.log(res)
					this.formRelieve.gas=res.transfer_gas;
				})
			},
			//解压
			relieve(){
				this.formRelieve.wallet_pass=this.$md5.hex_md5(this.password);
				this.formRelieve.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formRelieve,{}));
				console.log(data)
				this.relieveSign.sign=this.$rsaEncryptlong(data);
				this.$api.liftPledge(this.relieveSign).then(res=>{
					console.log(res)
					uni.$u.toast('解压成功!')
					this.show=false
					setTimeout(()=>{
						this.getList2()
						this.password=""
					},700)
					
				})
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
.pop-warp{
	width:620rpx;
	.title{
		position: relative;
		.pop-close{
			position: absolute;
			right: 20rpx;
		}
	}
}
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
