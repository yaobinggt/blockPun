<template>
	<view class="p-3">
		<view class="top p-3">
			<view class="node mb-3">
				<view class="title">{{this.$t('plan.wallet_node')}}</view>
				<view class="num">{{result.wallet_node}}</view>
			</view>
			<view class="box flex">
				<view class="item flex-1">
					<view class="title">{{this.$t('plan.team_node')}}</view>
					<view class="num">{{result.team_node}}</view>
				</view>
				<view class="item flex-1">
					<view class="title">{{this.$t('plan.node_name')}}</view>
					<view class="num">{{result.node_name}}</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item mt-3 flex flex-between align-center p-3 rounded-lg">
				<view class="left flex align-center">
					<u-icon name="/static/user/shop-icon1.png" size="32"></u-icon>
					<text class="ml-2">{{this.$t('plan.award')}}</text>
				</view>
				<view class="num">{{result.award}}</view>
			</view>
			<view class="item mt-3 flex flex-between align-center p-3 rounded-lg">
				<view class="left flex align-center">
					<u-icon name="/static/user/shop-icon2.png" size="32"></u-icon>
					<text class="ml-2">{{this.$t('plan.award_number')}}</text>
				</view>
				<view class="num">{{result.award_number}}</view>
			</view>
			<view class="item mt-3 flex flex-between align-center p-3 rounded-lg">
				<view class="left flex align-center">
					<u-icon name="/static/user/shop-icon3.png" size="32"></u-icon>
					<text class="ml-2">{{this.$t('plan.team_wallet')}}</text>
				</view>
				<view class="num">{{result.count_team_wallet}}</view>
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
					nonce_str:"dsadswe1ee",
					timestamp:'',
					wallet_adress:""
				},
				formSign:{
					sign:''
				},
				form:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					nonce_str:"dsadswe1ee",
					timestamp:'',
				},
				signForm:{
					sign:''
				},
				result:{
					wallet_node: 0,
					team_node: 0,
					node_name: "",
					award: 0,
					award_number: 0,
					count_team_wallet: 0
				},
				default:[]
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.getWalletList();
			uni.setNavigationBarTitle({
				title: this.$t('plan.title')
			});
		},
		methods:{
			getWalletList(){
				this.form.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.form,{}));
				this.signForm.sign=this.$rsaEncryptlong(data);
				this.$api.getWalletList(this.signForm).then(res=>{
					
					if(res.list.length>0){
						this.pageShow=true
					}else{
						this.pageShow=false
					}
					this.default=res.list.filter((item,index)=>{
						return item.is_check==1;
					});
					this.formData.wallet_adress=this.default[0].wallet_adress;
					console.log(this.formData);
					this.getPlan();
				});
			},
			getPlan(){
				this.formData.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.formData,{}));
				console.log(data);
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.consensusPlan(this.formSign).then(res=>{
					console.log(res);
					this.result=res.result;
				});
			},
		}
	}
</script>

<style lang="scss">
.top{
	background-image: url(@/static/user/plan-bg.png);
	background-repeat: no-repeat;
	background-size:100% 100%;
	color: #FFFFFF;
	.title{
		opacity: 0.6;
	}
	.node{
		.title{
			font-size: 32rpx;
		}
	}
	.box{
		.title{
			font-size: 28rpx;
		}
	}
}
.list{
	.item{
		font-size: 32rpx;
		background-color: #FFFFFF;
	}
}
</style>
