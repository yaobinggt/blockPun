<template>
	<view class="warp-box">
		<u-sticky>
			<u-tabs :list="getLangName(lang)" :scrollable="false" @click="click" class="tab-bbox"></u-tabs>
		</u-sticky>
		<view class="deal-warp p-3">
			<view class="box box1 rounded-lg" v-show="current == 0">
				<view class="item flex flex-between align-center p-3" v-for="(item,index) in list" :key="index" @click="goInfo(item)">
					<view class="left flex align-center">
						<u-icon name="/static/wallet/icon-all.png" size="32"></u-icon>
						<text class="ml-1">{{item.type}}</text>
					</view>
					<view class="right flex align-center">
						<text class="mr-1">{{item.des}}{{item.amount}}</text>
						<u-icon name="arrow-right" color="#2979ff" size="20"></u-icon>
					</view>
				</view>
			</view>
			<view class="box box2 rounded-lg" v-show="current == 1">
				<view class="item flex flex-between align-center p-3" v-for="(item,index) in list" :key="index" @click="goInfo(item)">
					<view class="left flex align-center">
						<u-icon name="/static/wallet/icon-out.png" size="32"></u-icon>
						<text class="ml-1">{{item.type}}</text>
					</view>
					<view class="right flex align-center">
						<text class="mr-1">{{item.des}}{{item.amount}}</text>
						<u-icon name="arrow-right" color="#2979ff" size="20"></u-icon>
					</view>
				</view>
			</view>
			<view class="box box3 rounded-lg" v-show="current == 2">
				<view class="item flex flex-between align-center p-3" v-for="(item,index) in list" :key="index" @click="goInfo(item)">
					<view class="left flex align-center">
						<u-icon name="/static/wallet/icon-in.png" size="32"></u-icon>
						<text class="ml-1">{{item.type}}</text>
					</view>
					<view class="right flex align-center">
						<text class="mr-1">{{item.des}}{{item.amount}}</text>
						<u-icon name="arrow-right" color="#2979ff" size="20"></u-icon>
					</view>
				</view>
			</view>
			<view class="box box4 rounded-lg" v-show="current == 3">
				<view class="item flex flex-between align-center p-3" v-for="(item,index) in list" :key="index" @click="goInfo(item)">
					<view class="left flex align-center">
						<u-icon name="/static/wallet/icon-err.png" size="32"></u-icon>
						<text class="ml-1">{{item.type}}</text>
					</view>
					<view class="right flex align-center">
						<text class="mr-1">{{item.des}}{{item.amount}}</text>
						<u-icon name="arrow-right" color="#2979ff" size="20"></u-icon>
					</view>
				</view>
			</view>
			<view class="p-3">
				<!-- <u-loading-icon></u-loading-icon> -->
				<u-divider :text="loadtext"></u-divider>
			</view>
			
			
		</view>
		<view class="deal-btn flex p-3">
			<u-button class="mr-2" type="primary" :text="this.$t('punDeal.transfer')" @click="goTransferPun"></u-button>
			<u-button class="ml-2" type="success" :text="this.$t('punDeal.received')" @click="goPunCollection"></u-button>
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
					wallet_adress:'',
					is_type:'',//1pun2key
					transfer_type:'1',//1全部2转出3转入4失败
					page:'1',
					number:'10',
				},
				formSign:{
					sign:''
				},
				lang:{
					tabs: [
						{
							name: '全部',
						}, {
							name: '转出',
						}, {
							name: '转入',
						}, {
							name: '失败',
						}
					],
					tabsen: [
						{
							name:'All'
						}, {
							name:'Transfer out'
						}, {
							name:'Transfer in'
						}, {
							name:'Failed'
						}
					],
				},
				loadtext:this.$t('punDeal.more'),//1、上拉加载更多 2、加载中… 3、没有更多了
				list:[],
				current:0,
				tran_type:'',
				is_name:''
			};
		},
		onLoad(options) {
			console.log(options)
			this.formData.wallet_adress=options.wallet_adress;
			this.formData.is_type=options.is_type;
			this.tran_type=options.tran_type;
			this.is_name=options.is_name;
		},
		onShow() {
			this.getList2();
			uni.setNavigationBarTitle({
				title: this.$t('punDeal.title')
			});
		},
		methods:{
			//语言切换
			getLangName(lang) {
				return this.$i18n.locale == 'zh' ? lang.tabs : lang.tabsen;
			},
			click(item) {
				this.current=item.index;
				if(item.index==0){
					this.list=[];
					this.formData.transfer_type="1";
					this.formData.page="1";
					console.log(this.formData)
					this.getList();
				}else if(item.index==1){
					this.list=[];
					this.formData.transfer_type="2";
					this.formData.page="1";
					console.log(this.formData)
					this.getList();
				}else if(item.index==2){
					this.list=[];
					this.formData.transfer_type="3";
					this.formData.page="1";
					console.log(this.formData)
					this.getList();
				}else if(item.index==3){
					this.list=[];
					this.formData.transfer_type="4";
					this.formData.page="1";
					console.log(this.formData)
					this.getList();
				}
			},
			goPunCollection(){
				uni.navigateTo({
					url:"/pages/wallet/punCollection/punCollection?wallet_adress="+this.formData.wallet_adress
				})
			},
			goTransferPun(){
				uni.navigateTo({
					url:"/pages/wallet/transferPun/transferPun?wallet_adress="+this.formData.wallet_adress+"&is_type="+this.formData.is_type+"&tran_type="+this.tran_type+"&is_name="+this.is_name
				})
			},
			goInfo(item){
				uni.navigateTo({
					url:"/pages/wallet/transferInfo/transferInfo?transfer_hash="+item.id+"&is_type="+this.formData.is_type+"&tran_type="+this.tran_type
				})
			},
			getAllList(){
				console.log("全部")
			},
			getInList(){
				console.log("转入")
			},
			getOutList(){
				console.log("转出")
			},
			getErrList(){
				console.log("失败")
			},
			getList(){
				this.formData.timestamp=parseInt(new Date()/1000).toString()
				this.formData.page=this.formData.page.toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				console.log(data)
				this.formSign.sign=this.$rsaEncryptlong(data);
				if(this.tran_type==1){
					this.$api.transferPunList(this.formSign).then(res=>{
						console.log(res)
						let list=res.list
						this.list=[...this.list,...list]
						//恢复加载状态
						this.loadtext=res.list.length<10 ? this.$t('punDeal.nomore'):this.$t('punDeal.more')
					})
				}else if(this.tran_type==2){
					this.$api.bscWalletTransferList(this.formSign).then(res=>{
						console.log(res)
						let list=res.list
						this.list=[...this.list,...list]
						//恢复加载状态
						this.loadtext=res.list.length<10 ? this.$t('punDeal.nomore'):this.$t('punDeal.more')
					})
				}
				
			},
			getList2(){
				this.formData.page="1"
				this.formData.timestamp=parseInt(new Date()/1000).toString()
				// this.formData.page=this.formData.page.toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				console.log(data)
				this.formSign.sign=this.$rsaEncryptlong(data);
				if(this.tran_type==1){
					this.$api.transferPunList(this.formSign).then(res=>{
						console.log(res)
						let list=res.list
						this.list=[...list]
						//恢复加载状态
						this.loadtext=res.list.length<10 ? this.$t('punDeal.nomore'):this.$t('punDeal.more')
					})
				}
				else if(this.tran_type==2){
					this.$api.bscWalletTransferList(this.formSign).then(res=>{
						console.log(res)
						let list=res.list
						this.list=[...list]
						//恢复加载状态
						this.loadtext=res.list.length<10 ? this.$t('punDeal.nomore'):this.$t('punDeal.more')
					})
				}
			}
		},
		// 上拉加载
		onReachBottom() {
			// if(this.loadtext!=="上拉加载更多") return;
			this.loadtext=this.$t('punDeal.loding')
			this.formData.page++;
			//请求数据
			
			this.getList()
			// let _self = this
			// setTimeout(function() {
			// 	_self.formData.page++;
			// 	_self.getList();
			// }, 2000);
		},
	}
</script>

<style lang="scss" scoped>
.tab-bbox{
	background-color: #FFFFFF;
}
.deal-btn{
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	background-color: #FFFFFF;
	box-shadow: 0 0 10rpx rgba(0,0,0,.1);
}
.deal-warp{
	padding-bottom: 160rpx;
	.box{
		background-color: #FFFFFF;
	}
	.item{
		border-bottom: solid 1rpx #e7e6e4;
		.left,.right{
			font-size: 32rpx;
		}
	}
	.box1{
		
	}
	.box2{
		.right{
			text{
				color:#2979ff;
			}
		}
	}
	.box3{
		.right{
			text{
				color:#19be6b;
			}
		}
	}
	.box4{
		.right{
			text{
				color:#fa3534;
			}
		}
	}
}
</style>
