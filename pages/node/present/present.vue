<template>
	<view>
		<view class="top px-3 pt-3">
			<view class="default mb-3">
				<view class="name">
					{{this.$t('current.currentWallet')}}：{{defaultWall.wallet_name}}
				</view>
				<view class="address">
					{{defaultWall.wallet_adress | ellipsis}}
				</view>
			</view>
			<view class="box">
				<view class="node-box flex mb-2">
					<view class="item bg-blue flex-1 mr-1 rounded-lg p-2">
						<view class="name">
							{{this.$t('current.nodeNum')}}
						</view>
						<view class="number">
							{{nodeInfo.buy_node}}
						</view>
						<u-icon name="/static/node/node-qb.png" size="32" class="icon-bg"></u-icon>
					</view>
					<view class="item bg-green flex-1 ml-1 rounded-lg  p-2">
						<view class="name">
							{{this.$t('current.networkNum')}}
						</view>
						<view class="number">
							{{nodeInfo.team_node}}
						</view>
						<u-icon name="/static/node/node-wl.png" size="32" class="icon-bg"></u-icon>
					</view>
				</view>
				<view class="number-box">
					<view class="item bg-orange flex flex-between rounded-lg  p-2">
						<view class="left">
							<view class="name">
								{{this.$t('current.pledgeNum')}}
							</view>
							<view class="number">
								{{nodeInfo.pledge}}
							</view>
						</view>
						<view class="more flex" @click="goPledgeRecord">
							<text>{{this.$t('current.pledgeRecord')}}</text>
							<u-icon name="arrow-right" size="16" color="#ffffff"></u-icon>
						</view>
						<u-icon name="/static/node/node-zy.png" size="32" class="icon-bg"></u-icon>
					</view>
				</view>
				<view class="node-nav flex mt-2">
					<!-- <view class="nav-item p-2 flex-1 flex-center" v-for="(item,index) in nav" :key="index" @click="iscurrent(index)"  :class="current==index?'active':''">
						{{item.name}}
						<text></text>
					</view> -->
					<view class="nav-item p-2 flex-1 flex-center" @click="iscurrent(0)" :class="current==0?'active':''">
						{{this.$t('current.namePledge')}}
						<text></text>
					</view>
					<view class="nav-item p-2 flex-1 flex-center" @click="iscurrent(1)" :class="current==1?'active':''">
						{{this.$t('current.nameEntrust')}}
						<text></text>
					</view>
					<view class="nav-item p-2 flex-1 flex-center" @click="iscurrent(2)" :class="current==2?'active':''">
						{{this.$t('current.nameProduce')}}
						<text></text>
					</view>
					
				</view>
			</view>
		</view>
		<view class="warp p-4">
			 <view class="box rounded-lg shadow pb-4" v-show="current==0">
			 	<view class="title flex justify-center align-center py-3">
			 		<text></text>
					<view class="mx-4">{{this.$t('current.namePledge')}}</view>
					<text></text>
			 	</view>
				<view class="items px-2">
					<view class="item flex flex-between px-2 py-3 rounded-lg mb-2">
						<view class="left">
							<view class="name">
								{{this.$t('current.receivedPledge')}}(PUN)
							</view>
							<view class="number  text-green">
								{{resultPledge.alreadyOut}}
							</view>
						</view>
						<view class="right">
							<view class="more flex" @click="goRecordPledge">
								<text>{{this.$t('current.receivingRecord')}}</text>
								<u-icon name="arrow-right" size="16" color="#909399"></u-icon>
							</view>
						</view>
					</view>
					<view class="item flex flex-between px-2 py-3 rounded-lg mb-4">
						<view class="left">
							<view class="name">
								{{this.$t('current.unPledge')}}(PUN)
							</view>
							<view class="number text-orange">
								{{resultPledge.notyetOut}}
							</view>
						</view>
						<view class="right">
							<u-button type="primary" :disabled="resultPledge.notyetOut==0" :text="this.$t('public.rec_btn')" size="small" class="py-2" @click="drawPledge"></u-button>
						</view>
					</view>
					<u-button type="primary" :disabled="nodeInfo.is_pledge==2" :plain="true" :text="this.$t('current.btnPledge')" @click="goPledge"></u-button>
				</view>
			 </view>
			 <view class="box rounded-lg shadow pb-4" v-show="current==1">
			 	<view class="title flex justify-center align-center py-3">
			 		<text></text>
					<view class="mx-4">{{this.$t('current.nameEntrust')}}</view>
					<text></text>
			 	</view>
					<view class="items px-2">
						<view class="item flex flex-between px-2 py-3 rounded-lg mb-2">
							<view class="left">
								<view class="name">
									{{this.$t('current.receivedEntrust')}}(PUN)
								</view>
								<view class="number  text-green">
									{{resultEntrust.alreadyOut}}
								</view>
							</view>
							<view class="right">
								<view class="more flex"  @click="goRecordEntrust">
									<text>{{this.$t('current.receivingRecord')}}</text>
									<u-icon name="arrow-right" size="16" color="#909399"></u-icon>
								</view>
							</view>
						</view>
						<view class="item flex flex-between px-2 py-3 rounded-lg mb-4">
							<view class="left">
								<view class="name">
									{{this.$t('current.undEntrust')}}(PUN)
								</view>
								<view class="number  text-orange">
									{{resultEntrust.notyetOut}}
								</view>
							</view>
							<view class="right">
								<u-button type="primary" :disabled="resultEntrust.notyetOut==0" :text="this.$t('public.rec_btn')" size="small" class="py-2" @click="drawEntrust"></u-button>
							</view>
						</view>
						<!-- <u-button type="primary" :plain="true" text="创建节点"></u-button> -->
					</view>
			 </view>
			 <view class="box rounded-lg shadow pb-4" v-show="current==2">
			 	<view class="title flex justify-center align-center py-3">
			 		<text></text>
			 					<view class="mx-4">{{this.$t('current.nameProduce')}}</view>
			 					<text></text>
			 	</view>
				<view class="items px-2">
					<view class="item flex flex-between px-2 py-3 rounded-lg mb-2">
						<view class="left">
							<view class="name">
								{{this.$t('current.receivedProduce')}}(PUN)
							</view>
							<view class="number  text-green">
								{{resultMonetary.alreadyOut}}
							</view>
						</view>
						<view class="right">
							<view class="more flex"  @click="goRecordMonetary">
								<text>{{this.$t('current.receivingRecord')}}</text>
								<u-icon name="arrow-right" size="16" color="#909399"></u-icon>
							</view>
						</view>
					</view>
					<view class="item flex flex-between px-2 py-3 rounded-lg mb-4">
						<view class="left">
							<view class="name">
								{{this.$t('current.undProduce')}}(PUN)
							</view>
							<view class="number  text-orange">
								{{resultMonetary.notyetOut}}
							</view>
						</view>
						<view class="right">
							<u-button type="primary" :disabled="resultMonetary.notyetOut==0" :text="this.$t('public.rec_btn')" size="small" class="py-2" @click="drawMonetary"></u-button>
						</view>
					</view>
					<!-- <u-button type="primary" :plain="true" text="创建节点"></u-button> -->
				</view>
			 </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0,
				nav: [{
					name: 'PPOS质押',
					name_en: 'PPOS pledge',
				}, {
					name: 'PPOS委托',
					name_en: 'PPOS entrustment',
				},{
					name: 'PPOS产币',
					name_en: 'PPOS coin',
				}],
				formData:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
				},
				formSign:{
					sign:''
				},
				
				formPledge:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
				},
				pledgeSign:{
					sign:''
				},
				
				formEntrust:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
				},
				entrustSign:{
					sign:''
				},
				
				formMonetary:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
				},
				monetarySign:{
					sign:''
				},
				
				nodeInfo:{
					buy_node: null, //个人节点数量
					team_node: null, //网络节点数量
					pledge: null, //质押数量
					countTreatAmount:null, //待收取质押数量
					countUseAmount: null, //已收取质押数量
					is_pledge:null //1可质押2不可质押
				},
				defaultWall:null,//当前默认地址
				resultPledge:{
					alreadyOut: "", //已领取数量
					notyetOut: "" //待领取数量
				},//ppos质押奖励
				resultEntrust:{
					alreadyOut: "", //已领取数量
					notyetOut: "" //待领取数量
				},//ppos委托奖励
				resultMonetary:{
					alreadyOut: "", //已领取数量
					notyetOut: "" //待领取数量
				},//ppos产币奖励
				
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('current.title')
			});
			this.getWalletNode()
			this.rewardPledge()//获取ppos质押奖励
			this.rewardEntrust()//获取ppos委托奖励
			this.rewardMonetary()//获取ppos产币奖励
		},
		computed:{
			
		},
		onBackPress(options) {  
			if (options.from === 'navigateBack') {  
				return false;  
			}  
			this.back();  
			return true;  
		},   
		methods:{
			getFieldTitle(item) {
				return this.$i18n.locale == 'zh' ? item.name : item.name_en
			},
			back(){
				uni.switchTab({
				    url: '/pages/tabber/node/node'
				});
			},
			//获取当前地址信息
			getWalletNode(){
				this.defaultWall=uni.getStorageSync('default_wallet')
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				console.log(data);
				console.log(this.formSign);
				this.$api.walletNode(this.formSign).then(res=>{
					console.log(res)
					this.nodeInfo=res.result
				})
			},
			iscurrent(index){
				this.current=index
			},
			//获取ppos质押奖励
			rewardPledge(){
				this.formPledge.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formPledge,{}));
				this.pledgeSign.sign=this.$rsaEncryptlong(data);
				console.log(data);
				this.$api.rewardPledge(this.pledgeSign).then(res=>{
					console.log(res)
					this.resultPledge=res.result
				})
			},
			//获取ppos委托奖励
			rewardEntrust(){
				this.formEntrust.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formEntrust,{}));
				this.entrustSign.sign=this.$rsaEncryptlong(data);
				console.log(data);
				this.$api.rewardEntrust(this.entrustSign).then(res=>{
					console.log(res)
					this.resultEntrust=res.result
				})
			},
			//获取ppos产币奖励
			rewardMonetary(){
				this.formMonetary.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formMonetary,{}));
				this.monetarySign.sign=this.$rsaEncryptlong(data);
				console.log(data);
				this.$api.rewardMonetary(this.monetarySign).then(res=>{
					console.log(res)
					this.resultMonetary=res.result
				})
			},
			//前往节点质押
			goPledge(){
				uni.navigateTo({
					url:"/pages/node/pledge/pledge"
				})
			},
			//ppos质押奖励领取
			drawPledge(){
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.drawPledge(this.formSign).then(res=>{
					console.log(res)
					uni.showToast({
						icon:"none",
						title:this.$t('public.receive')
					})
					this.rewardPledge()//获取ppos质押奖励
				})
			},
			//ppos委托奖励领取
			drawEntrust(){
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.drawEntrust(this.formSign).then(res=>{
					console.log(res)
					uni.showToast({
						icon:"none",
						title:this.$t('public.receive')
					})
					this.rewardEntrust()//获取ppos委托奖励
				})
			},
			//ppos产币奖励领取
			drawMonetary(){
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.drawMonetary(this.formSign).then(res=>{
					console.log(res)
					uni.showToast({
						icon:"none",
						title:this.$t('public.receive')
					})
					this.rewardMonetary()//获取ppos产币奖励
				})
			},
			//前往质押记录
			goPledgeRecord(){
				uni.navigateTo({
					url:"/pages/node/pledgeRecord/pledgeRecord"
				})
			},
			//前往质押领取记录
			goRecordPledge(){
				uni.navigateTo({
					url:"/pages/node/receiveRecord/recordPledge"
				})
			},
			//前往委托领取记录
			goRecordEntrust(){
				uni.navigateTo({
					url:"/pages/node/receiveRecord/recordEntrust"
				})
			},
			//前往产币领取记录
			goRecordMonetary(){
				uni.navigateTo({
					url:"/pages/node/receiveRecord/recordMonetary"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.top{
	min-height: 200rpx;
	background-color: #FFFFFF;
	.default{
		font-size: 28rpx;
		.address{
			color: $u-info;
		}
	}
	.box{
		.item{
			position: relative;
			color: #FFFFFF;
			font-size: 28rpx;
			.icon-bg{
				position: absolute;
				right: 0;
				bottom: 0;
			}
			.number{
				font-size: 32rpx;
			}
			.name{
				opacity: 0.7;
			}
		}
	}
}
.node-nav{
	.nav-item{
		color: $u-main-color;
		font-size: 32rpx;
		position: relative;
	}
	.active{
		color: #2979ff;
		text{
			position: absolute;
			display: block;
			width: 90rpx;
			height: 6rpx;
			background-color: #2979ff;
			bottom: 0;
		}
	}
}
.warp{
	.box{
		background-color: #FFFFFF;
		// min-height: 500rpx;
		.title{
			view{
				font-size: 32rpx;
			}
			text{
				display: inline-block;
				width: 14rpx;
				height: 14rpx;
				background-color: #E1E1E1;
				border-radius: 50%;
			}
		}
	}
	.item{
		background-color: #f3f4f6;
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
}
.bg-blue{
	background-color: #2979ff;
}
.bg-orange{
	background-color: #ff9900;
}
.bg-green{
	background-color: #19be6b;
}
.text-orange{
	color: #ff9900;
}
.text-green{
	color: #19be6b;
}
</style>
