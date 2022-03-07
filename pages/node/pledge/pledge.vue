<template>
	<view>
		<view class="entrust-warp px-3">
			<u--form labelPosition="top" class="mb-4 mt-3">
				<u-form-item :label="this.$t('wallet.title')" :borderBottom="false" labelWidth="100%">
					<view class="">
						{{defaultWall.wallet_adress | ellipsis}}
					</view>
				</u-form-item>
				<u-form-item :label="this.$t('public.balance')" :borderBottom="false" labelWidth="100%">
					<!-- #ifndef APP-NVUE -->
					<u-input v-model="punBalance" disabled  color="#ff9900"  class="balance">
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<u--input v-model="punBalance" disabled  color="#ff9900"  class="balance">
					<!-- #endif -->
						<template slot="suffix">
							<text>PUN</text>
						</template>
					<!-- #ifndef APP-NVUE -->
					</u-input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				</u-form-item>
				<u-form-item :label="this.$t('current.pledgeNum')" :borderBottom="false" labelWidth="100%">
					<!-- #ifndef APP-NVUE -->
					<u-input v-model="formPledge.amount" :placeholder="this.$t('pledge.tips1')" clearable class="input">
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<u--input v-model="formPledge.amount" :placeholder="this.$t('pledge.tips1')" clearable color="#ff9900"  class="input">
					<!-- #endif -->
						<template slot="suffix">
							<text @click="getAll">{{this.$t('public.all')}}</text>
						</template>
					<!-- #ifndef APP-NVUE -->
					</u-input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				</u-form-item>
				<view class="charges">
					{{this.$t('bridge.fee')}}：<text>{{walleGas}}</text>PUN
				</view>
			</u--form>
			<u-button type="primary" :text="this.$t('public.submit')" @click="open"></u-button>
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
					<u-button :text="this.$t('public.submit')" type="primary" class="ml-2" @click="nodepledge"></u-button>
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
				},
				formSign:{
					sign:''
				},
				formWallet:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
					wallet_adress:'',
					is_type:'1'
				},
				walletSign:{
					sign:''
				},
				formPledge:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
					amount:'',
					wallet_pass:'',
					gas:''
				},
				pledgeSign:{
					sign:''
				},
				punBalance:0,
				defaultWall:null,//当前默认地址
				walleGas:'',//手续费
				show:false,
				password:''
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('current.namePledge')
			});
			this.getPunBalance();
			this.getGas();
		},
		methods:{
			open() {
				
				let addnum=parseInt(this.formPledge.amount)+parseInt(this.walleGas);
				let allBalance=parseInt(this.punBalance)
				if(this.formPledge.amount<10){
					uni.showToast({
						icon:"none",
						title:this.$t('pledge.tips2')
					})
				}else if(addnum > allBalance){
					uni.showToast({
						icon:"none",
						title:this.$t('pledge.tips3')
					})
				}else{
					this.show = true
				}
			},
			close() {
				this.show = false
			},
			//获取当前默认钱包pun余额
			getPunBalance(){
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.punBalance(this.formSign).then(res=>{
					console.log(res)
					this.punBalance=res.balance.pun
				})
			},
			//获取手续费
			getGas(){
				this.defaultWall=uni.getStorageSync('default_wallet')
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.transferPunGas(this.formSign).then(res=>{
					console.log(res)
					this.walleGas=res.transfer_gas;
					this.formPledge.gas=res.transfer_gas;
				})
			},
			//参与质押
			nodepledge(){
				this.formPledge.timestamp=parseInt(new Date()/1000).toString();
				this.formPledge.wallet_pass=this.$md5.hex_md5(this.password);
				let data=JSON.stringify(Object.assign(this.formPledge,{}));
				console.log(data)
				this.pledgeSign.sign=this.$rsaEncryptlong(data);
				this.$api.nodepledge(this.pledgeSign).then(res=>{
					console.log(res)
					this.show=false;
					uni.showToast({
						icon:'none',
						title:this.$t('pledge.pledgeTips')
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:"/pages/node/present/present"
						})
					},1000)
				})
			},
			//全部数量
			getAll(){
				let numm=this.punBalance-this.formPledge.gas
				this.formPledge.amount=numm.toFixed(6);
				//this.formPledge.amount=this.punBalance;
			}
		}
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
.entrust-warp{
	.charges{
		font-size: 28rpx;
		text-align: right;
		color: $u-info;
		text{
			color: $u-warning;
			margin-right: 10rpx;
		}
	}
	.input{
		background-color: #FFFFFF;
		color: #2979ff;
	}
	.balance{
		color: $u-info;
		.suffix{
			
		}
	}
}
</style>
