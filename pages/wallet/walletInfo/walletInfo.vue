<template>
	<view>
		<u-navbar :title="this.$t('wallet.title')" :safeAreaInsetTop="true" :placeholder="true" :autoBack="true" rightIcon="list" @rightClick="open" > </u-navbar>
		<view class="warp p-3">
			<view class="top p-3 rounded-lg" :class="formData.is_type==1?'blue':'orange'" @click="goSetWallet">
				<view class="title flex align-center">
					<!-- <u-icon name="/static/wallet/w-pun.png" size="52"></u-icon> -->
					<text class="ml-1 mt-1">{{walletInfo.wallet_name}}  </text>
					<!-- <text class="font-sm">{{formData.wallet_adress | ellipsis}}</text> -->
				</view>
				<view class="balance-usdt mt-3">
					<view class="name">
						{{this.$t('wallet.balance')}}
					</view>
					<text>{{walletInfo.count_USDT}}</text>
				</view>
				<view class="is-check">
					<text v-if="walletInfo.is_check==1">{{this.$t('wallet.default')}}</text>
				</view>
				<u-icon name="more-dot-fill" color="#eeeeee" size="22" class="balance-icon"></u-icon>
			</view>
			<view class="balance-list mt-4">
				<view class="title mb-2">
					<text>{{this.$t('wallet.listTitle')}}</text>
				</view>
				<view class="items">
					<view class="item flex flex-between p-3 rounded-lg mb-3" v-for="(item,index) in walletInfo.wallet_balance" :key="index" @click="goPunDeal(item.is_type,item.currency_name)">
						<view class="left flex align-center">
							<u-icon :name="item.currency_logo" size="38"></u-icon>
							<text class="ml-1">{{item.currency_name}}</text>
						</view>
						<view class="right flex align-center">
							<text>{{item.balance}}</text>
							<u-icon name="arrow-right" color="#909399" size="18" class="right-icon"></u-icon>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<u-popup :show="show" mode="right" width="100rpx" @close="close" @open="open">
			<view class="p-2 pop-warp" >
				<view class="pop-box" style="padding-top: 80rpx;">
					<view class="title mb-2">
						<text>{{this.$t('wallet.default')}}</text>
					</view>
					<view class="list">
						<view class="item px-2 py-3 rounded-lg overflow-hidden" v-for="(item,index) in defaultList" :key="index" :class="item.is_type==1?'blue':'orange'"  @click="getInfo(item)">
							<view>{{item.wallet_name}}</view>
							<text>{{item.wallet_adress | ellipsis}}</text>
							<u-icon :name="item.img"  size="48" class="picon"></u-icon>
						</view>
					</view>
				</view>
				<view class="pop-box mt-3">
					<view class="title mb-2">
						<text>{{this.$t('wallet.other')}}</text>
					</view>
					<scroll-view scroll-y="true" style="height: 620rpx;">
						<view class="list">
							<view class="item p-2 rounded-lg overflow-hidden" v-for="(item,index) in list" :key="index" :class="item.is_type==1?'blue':'orange'" @click="getInfo(item)">
								<view>{{item.wallet_name}}</view>
								<text>{{item.wallet_adress | ellipsis}}</text>
								<!-- <u-icon :name="item.img"  size="48" class="picon"></u-icon> -->
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="pop-add mt-3">
					<view class="pop-add-btn flex flex-center py-2" @click="goCreate">
						<u-icon name="plus" color="#2979ff"></u-icon>
						<text class="ml-1">{{this.$t('wallet.create')}}</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formdd:{
					
				},
				form2:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					nonce_str:"dsadswe1ee",
					timestamp:'',
				},
				signForm2:{
					sign:''
				},
				formData:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:'',
					wallet_adress:'',
					is_type:''
				},
				signForm:{
					sign:''
				},
				walletInfo:{},
				titleColor:'#ffffff',
				defaultList:null,
				list:null,
				show:false,
			};
		},
		onLoad(options) {
			console.log(options)
			this.formData.wallet_adress=options.wallet_adress;
			this.formData.is_type=options.is_type;
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('wallet.title')
			});
			this.getWalletInfo();
			this.getWalletList();
		},
		methods:{
			open() {
			  this.show = true
			},
			close() {
			  this.show = false
			},
			goCreate(){
				uni.navigateTo({
					url:"/pages/wallet/choose/choose"
				})
			},
			goPunDeal(type,name){
				uni.navigateTo({
					url:"/pages/wallet/punDeal/punDeal?wallet_adress="+this.formData.wallet_adress+"&is_type="+type+"&is_name="+name+"&tran_type="+this.formData.is_type
				})
			},
			getInfo(item){
				this.formData.wallet_adress=item.wallet_adress;
				this.formData.is_type=item.is_type;
				this.getWalletInfo();
				setTimeout(()=>{
					this.show = false
				},50)
			},
			getWalletInfo(){
				this.formData.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.formData),{});
				this.signForm.sign=this.$rsaEncryptlong(data);
				console.log(data);
				this.$api.getWalletInfo(this.signForm).then(res=>{
					console.log(res)
					this.walletInfo=res.walletInfo;
				})
			},
			getWalletList(){
				this.form2.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.form2,{}));
				this.signForm2.sign=this.$rsaEncryptlong(data);
				this.$api.getWalletList(this.signForm2).then(res=>{
					console.log(res);
					this.defaultList=res.list.filter((item,index)=>{
						return item.is_check==1;
					});
					this.list=res.list.filter((item,index)=>{
						return item.is_check==2;
					})
				});
			},
			goSetWallet(){
				uni.navigateTo({
					url:"/pages/wallet/myWallet/myWallet?wallet_adress="+this.formData.wallet_adress+"&is_type="+this.formData.is_type+"&is_check="+this.walletInfo.is_check
				})
			}
			// gotoPre(){
			//     uni.navigateBack()
			// },
		}
	}
</script>

<style lang="scss" scoped>
.warp{
	.blue{
		background-color: #2979ff !important;
	}
	.orange{
		background-color: #ff9900 !important;
	}
	.top{
		position: relative;
		background-color: #2979ff;
		color: #FFFFFF;
		.balance-icon{
			position: absolute;
			top: 30rpx;
			right: 30rpx;
		}
		.balance-usdt{
			.name{
				font-size: 28rpx;
				opacity: 0.7;
			}
			text{
				font-size: 42rpx;
			}
		}
		.is-check{
			position: absolute;
			bottom: 30rpx;
			right: 20rpx;
			font-size: 26rpx;
			opacity: 0.6;
		}
		.title{
			.img{
				background-color: #FFFFFF;
			}
		}
	}
	.balance-list{
		.title{
			font-size: 32rpx;
		}
		.item{
			background-color: #FFFFFF;
			font-size: 34rpx;
			.right{
				color: #2979FF;
			}
		}
	}
}
.pop-box{
	width: 500rpx;
	.title{
		font-size: 32rpx;
	}
	.list{
		.item{
			position: relative;
			color: #FFFFFF;
			margin-bottom: 20rpx;
			view{
				font-size: 32rpx;
			}
			text{
				font-size: 28rpx;
				opacity: 0.7;
			}
		}
		.picon{
			position: absolute;
			top: -15rpx;
			right: 0;
		}
		.blue{
			background-color: #2979ff;
		}
		.orange{
			background-color: #ff9900;
		}
	}
}
.pop-warp{
	position: relative;
	height: 100%;
}
.pop-add{
	position: absolute;
	right: 20rpx;
	left: 20rpx;
	bottom: 30rpx;
	.pop-add-btn{
		background-color: #ecf5ff;
		border: dashed 1rpx #2979ff;
		font-size: 30rpx;
	}
}

</style>
