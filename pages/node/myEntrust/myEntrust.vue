<template>
	<view>
		<view class="top">
			<view class="top-main rounded-lg px-3 py-4 mb-3">
				<view class="top-name ">
					<view class="name">
						{{this.$t('current.currentWallet')}}：{{defaultWall.wallet_name}}
					</view>
					<view class="address">
						{{defaultWall.wallet_adress | ellipsis}}
					</view>
				</view>
				<u-icon name="/static/node/node-icon.png" size="32" class="top-icon"></u-icon>
			</view>
			<view class="items">
				<view class="item flex flex-between px-2 py-3 rounded-lg mb-3">
					<view class="left">
						<view class="name">
							{{this.$t('myEntrust.allEntrust')}}(PUN)
						</view>
						<view class="number text-blue">
							{{entrustInfo.entrustcount}}
						</view>
					</view>
					<view class="right">
						<view class="more flex" @click="goEntrustRecord">
							<text>{{this.$t('myEntrust.entrustRecord')}}</text>
							<u-icon name="arrow-right" size="16" color="#909399"></u-icon>
						</view>
					</view>
				</view>
				<view class="item flex flex-between px-2 py-3 rounded-lg mb-3">
					<view class="left">
						<view class="name">
							{{this.$t('myEntrust.received')}}(PUN)
						</view>
						<view class="number  text-green">
							{{entrustInfo.alreadyOut}}
						</view>
					</view>
					<view class="right">
						<view class="more flex" @click="goReceiveRecord()">
							<text>{{this.$t('current.receivingRecord')}}</text>
							<u-icon name="arrow-right" size="16" color="#909399"></u-icon>
						</view>
					</view>
				</view>
				<view class="item flex flex-between px-2 py-3 rounded-lg mb-4">
					<view class="left">
						<view class="name">
							{{this.$t('myEntrust.unreceived')}}(PUN)
						</view>
						<view class="number text-orange">
							{{entrustInfo.notyetOut}}
						</view>
					</view>
					<view class="right">
						<u-button type="primary" :disabled="entrustInfo.notyetOut==0" :text="this.$t('public.rec_btn')" size="small" class="py-2" @click="userDrawEntrust"></u-button>
					</view>
				</view>
				
			</view>
			<u-button type="primary" :plain="true" :text="this.$t('myEntrust.btnEntrust')" class="mt-5" @click="goPposList"></u-button>
			<view class="top-bg"></view>
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
				entrustInfo:{
					alreadyOut: "",
					notyetOut: "",
					entrustcount: ""
				},
				defaultWall:null,
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('myEntrust.title')
			});
			this.userEntrust()
		},
		methods:{
			//前往委托记录
			goEntrustRecord(){
				uni.navigateTo({
					url:"/pages/node/entrustRecord/entrustRecord"
				})
			},
			//前往委托领取记录
			goReceiveRecord(){
				uni.navigateTo({
					url:"/pages/node/receiveRecord/receiveRecord"
				})
			},
			//前往ppos列表
			goPposList(){
				uni.switchTab({
					url:"/pages/tabber/node/node"
				})
			},
			//我的委托信息
			userEntrust(){
				this.defaultWall=uni.getStorageSync('default_wallet')
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.userEntrust(this.formSign).then(res=>{
					console.log(res)
					this.entrustInfo=res.result
				})
			},
			//委托奖励领取
			userDrawEntrust(){
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.userDrawEntrust(this.formSign).then(res=>{
					console.log(res)
					uni.showToast({
						icon:'none',
						title:this.$t('public.receive')
					})
					this.userEntrust()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.top{
	position: relative;
	padding: 30rpx;
	.top-main{
		
		background-color: #FFFFFF;
		position: relative;
		z-index: 2;
		.top-name{
			.name{
				font-size: 32rpx;
			}
			.address{
				font-size: 28rpx;
				color: $u-info;
			}
		}
		.top-icon{
			position: absolute;
			right: 20rpx;
			top: 20rpx;
		}
	}
	.item{
		background-color: #FFFFFF;
		.left{
			.name{
				font-size: 28rpx;
				color: #303030;
			}
			.number{
				font-size: 32rpx;
			}
		}
		.right{
			font-size: 28rpx;
			.more{
				color: $u-info;
			}
		}
	}
	.top-bg{
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		width: 100%;
		height: 150rpx;
		background-color: #007BFF;
		border-bottom-left-radius: 80rpx;
		border-bottom-right-radius: 80rpx;
		z-index: 1;
	}
}
.text-orange{
	color: #ff9900;
}
.text-green{
	color: #19be6b;
}
.text-blue{
	color: #2979ff;
}
</style>
