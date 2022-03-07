<template>
	<view>
		<view class="mining-bg flex-center pt-2">
			<u-icon name="/static/node/node-img.png" size="280"></u-icon>
		</view>
		<view class="main p-3">
			<view class="box rounded-lg mb-3 px-3">
				<view class="item flex flex-between">
					<view class="left">
						<view class="number text-orange">
							{{nodeInfo.countTreatAmount}}
						</view>
						<view class="title">
							{{this.$t('mining.unclaimed')}}:
						</view>
					</view>
					<view class="right">
						<u-button type="primary" :disabled="nodeInfo.countTreatAmount==0" size="small" :text="this.$t('public.rec_btn')" @click="nodeCharge"></u-button>
					</view>
				</view>
				<view class="item flex flex-between">
					<view class="left">
						<view class="title">
							{{this.$t('mining.received')}}:
						</view>
					</view>
					<view class="right">
						<view class="number">
							{{nodeInfo.countUseAmount}}
						</view>
					</view>
				</view>
				<view class="item flex flex-between">
					<view class="left">
						<view class="title">
							{{this.$t('mining.countNodeout')}}:
						</view>
					</view>
					<view class="right">
						<view class="number">
							{{nodeInfo.countNodeout}}
						</view>
					</view>
				</view>
				<view class="item flex flex-between border-none">
					<view class="left">
						<view class="title">
							{{this.$t('mining.countNode')}}:
						</view>
					</view>
					<view class="right">
						<view class="number">
							{{nodeInfo.countNode}}
						</view>
					</view>
				</view>
				
			</view>
			<view class="box rounded-lg mb-4 px-3">
				<view class="item flex flex-between">
					<view class="left">
						<view class="title">
							{{this.$t('mining.destroy')}}:
						</view>
					</view>
					<view class="right">
						<view class="number">
							{{nodeInfo.destroy}}
						</view>
					</view>
				</view>
				<view class="item border-none">
					<view class="left">
						<view class="title">
							{{this.$t('mining.destroyInfo')}}:
						</view>
					</view>
					<view class="right">
						<view class="number ">
							<text class="">{{nodeInfo.destroyInfo}}</text>
						</view>
					</view>
				</view>
			</view>
			<u-button type="warning" shape="circle" :text="this.$t('mining.button')" @click="goCreatNode"></u-button>
		</view>
		<view class="miningbg">
			
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
				},
				formSign:{
					sign:''
				},
				formNode:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
				},
				nodeSign:{
					sign:''
				},
				nodeInfo:{
					destroy: "", //销毁数量
					destroyInfo: "", //销毁地址
					countNode: "", //全网节点数量
					countNodeout: "", //全网产出
					countTreatAmount: "2000", //待领取数量
					countUseAmount: "" //已领取数量
				}
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('mining.title')
			});
			this.getInfo()
		},
		methods:{
			//获取节点挖矿信息
			getInfo(){
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.nodeInfo(this.formSign).then(res=>{
					console.log(res)
					this.nodeInfo=res
				})
			},
			//领取节点挖矿
			nodeCharge(){
				this.formNode.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formNode,{}));
				this.nodeSign.sign=this.$rsaEncryptlong(data);
				this.$api.nodeCharge(this.nodeSign).then(res=>{
					console.log(res)
					uni.showToast({
						icon:'none',
						title:this.$t('public.receive')
					})
					this.getInfo()
				})
			},
			//跳转节点购买
			goCreatNode(){
				uni.navigateTo({
					url:"/pages/user/shop/shop"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	background-color: #284bcd;
}
.miningbg{
	position: absolute;
	top: 0;
	height: 100vh;
	left: 0;
	right: 0;
	background-color: #284bcd ;
	background-image: url(../../../static/node/node-bg.png);
}
.mining-bg{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
}
.main{
	position: relative;
	z-index: 20;
	padding-top: 280rpx;
	.box{
		background-color: #FFFFFF;
		.item{
			padding: 30rpx 0;
			border-bottom: solid 1rpx #F3F4F6;
		}
		.border-none{
			border: none;
		}
		.title{
			font-size: 30rpx;
			color: #303133;
			width: 200rpx;
		}
		.number{
			color: #007BFF;
			font-size: 32rpx;
			text{
				font-size: 27rpx;
				word-wrap: break-word;
				word-break: break-all;
				overflow: hidden;
			}
		}
	}
}
.text-orange{
	color: #ff9900 !important;
}
.text-green{
	color: #19be6b;
}
.text-blue{
	color: #2979ff;
}
</style>
