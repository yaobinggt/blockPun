<template>
	<view class="p-3">
		<view class="no-data" v-show="!pageShow">
			<view class="home-creat m-5 p-5 flex flex-column flex-center">
				<u-icon size="120"name="/static/wallet/nodata.png" class="mt-5"></u-icon>
				<view class="font-md mt-5">
					{{this.$t('public.no_data')}}<text @click="goChoose()">{{this.$t('create.pop_title1')}}</text>
				</view>
			</view>
		</view>
		<view class="warp" v-show="pageShow">
			<view class="item" v-for="(item,index) in list" :key="index" @click="goPage(item.pageUrl)">
				<u-cell :icon="item.icon" :title="getFieldTitle(item)" :border="false" isLink class="py-1"></u-cell>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					nonce_str:"dsadswe1ee",
					timestamp:'',
				},
				signForm:{
					sign:''
				},
				pageShow:true,
				default:[
					
				],
				address:'',
				list:[
					{
						id:1,
						title:'地址本',
						title_en:'Address book',
						icon:'/static/user/drawable-xxhdpi/user-book.png',
						pageUrl:'/pages/user/address/address',
					},
					// {
					// 	id:2,
					// 	title:'创世节点创建',
					// 	title_en:'Genesis node',
					// 	icon:'/static/user/drawable-xxhdpi/user-shop.png',
					// 	pageUrl:'/pages/user/shop/shop',
					// },
					{
						id:2,
						title:'节点挖矿',
						title_en:'Node mining',
						icon:'/static/user/drawable-xxhdpi/user-shop.png',
						pageUrl:'/pages/user/mining/mining',
					},
					{
						id:3,
						title:'Pancakeswap',
						title_en:'Pancakeswap',
						icon:'/static/user/drawable-xxhdpi/app.png',
						pageUrl:'/pages/user/dapp/dapp',
					},
					{
						id:4,
						title:'跨链桥',
						title_en:'Cross-blockchain bridge',
						icon:'/static/user/drawable-xxhdpi/user-chain.png',
						pageUrl:'/pages/user/chain/chain',
					},
					{
						id:5,
						title:'共识计划',
						title_en:'Consensus plan',
						icon:'/static/user/drawable-xxhdpi/user-plan.png',
						pageUrl:'/pages/user/plan/plan',
					},
					{
						id:6,
						title:'关于我们',
						title_en:'About',
						icon:'/static/user/drawable-xxhdpi/user-about.png',
						pageUrl:'/pages/user/about/about',
					},
				]
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.getWalletList();
			uni.setNavigationBarTitle({
				title: this.$t('nav.user')
			});
			uni.setTabBarItem({
			  index: 2,
			  text: this.$t('nav.user'),
			});
		},
		methods:{
			goPage(url){
				uni.navigateTo({
					url:url
				})
			},
			goChoose(){
				uni.navigateTo({
					url:"/pages/wallet/choose/choose"
				})
			},
			getFieldTitle(item) {
				return this.$i18n.locale == 'zh' ? item.title : item.title_en
			},
			getWalletList(){
				this.form.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.form,{}));
				this.signForm.sign=this.$rsaEncryptlong(data);
				this.$api.getWalletList(this.signForm).then(res=>{
					console.log(res);
					if(res.list.length>0){
						this.pageShow=true
					}else{
						this.pageShow=false
					}
					this.default=res.list.filter((item,index)=>{
						return item.is_check==1;
					});
					console.log(this.default[0].wallet_adress);
					this.address=this.default[0].wallet_adress
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.item{
	background-color: #FFFFFF;margin-bottom: 30rpx;border-radius: 14rpx;
}
.home-creat{
	margin-top: 200rpx;
	text{
		margin-left: 20rpx;
		color: #2979ff;
	}
}
</style>
