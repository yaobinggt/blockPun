<template>
	<view>
		<u-navbar :title="this.$t('address.title')" :safeAreaInsetTop="true" :placeholder="true" :autoBack="true" rightIcon="plus-circle" @rightClick="goAdd" > </u-navbar>
		<view class="no-data" v-show="!pageShow">
			<view class="home-creat m-5 p-5 flex flex-column flex-center">
				<u-icon size="200"name="/static/wallet/nodata.png" class="mt-5"></u-icon>
				<view class="font-md mt-5">
					{{this.$t('public.no_data')}}<text @click="goAdd">{{this.$t('address.add_title')}}</text>
				</view>
			</view>
		</view>
		<view class="warp p-3" v-show="pageShow">
			<view class="item p-3 rounded-lg" v-for="(item,index) in list" :key="index" @click="clickItem(item,index)" :class="{active:index==current}">
				<view class="name">{{item.book_name}}</view>
				<text class="adress">{{item.wallet_adress}}</text>
				<u-icon name="trash" color="#fa3534" size="24" class="del-btnn" @click="delBook(item.wallet_adress)"></u-icon>
				<!-- <view class="button-group">
					<view class="flex">
						<u-button text="修改" size="normal" type="primary" plain class="mr-2" @click="goSet(item)"></u-button>
						<u-button  size="normal" type="error" plain class="ml-2" @click="delBook(item.wallet_adress)"></u-button>
					</view>
				</view> -->
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
					wallet_adress:"",
					
				},
				bookData:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:'',
				},
				formSign:{
					sign:''
				},
				formSign2:{
					sign:''
				},
				list:[],
				current:null,
				pageShow:true,
			};
		},
		onLoad() {
			this.getBookList();
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('address.title')
			});
			this.getBookList();
		},
		methods:{
			clickItem(item,index){
				this.current=index;
			},
			goAdd(){
				uni.navigateTo({
					url:"/pages/user/address/addAddress"
				})
			},
			getBookList(){
				this.bookData.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.bookData,{}));
				console.log(data)
				this.formSign2.sign=this.$rsaEncryptlong(data);
				this.$api.adressBook(this.formSign2).then(res=>{
					console.log(res)
					this.list=res.list
					if(res.list.length>0){
						this.pageShow=true;
					}else{
						this.pageShow=false;
					}
				})
			},
			delBook(adress){
				this.formData.timestamp=parseInt(new Date()/1000).toString()
				this.formData.wallet_adress=adress;
				// this.formData.book_name=item.book_name;
				let data=JSON.stringify(Object.assign(this.formData,{}));
				console.log(data)
				this.formSign.sign=this.$rsaEncryptlong(data);
				uni.showModal({
					title: this.$t('address.tips_title'),
					content: this.$t('address.tips_content'),
					success: res => {
						if (res.confirm) {
							this.$api.delBook(this.formSign).then(res=>{
								console.log(res)
								this.$u.toast(this.$t('address.del_succe'));
								this.getBookList()
							})
						}
					}
				})
			},
			goSet(item){
				uni.navigateTo({
					url:"/pages/user/address/setAddress?item="+JSON.stringify(item)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-creat{
		margin-top: 200rpx;
		text{
			margin-left: 20rpx;
			color: #2979ff;
		}
	}
	.item{
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		position: relative;
		.name{
			font-size: 32rpx;
		}
		.adress{
			font-size: 26rpx;
			color: #82848a;
		}
		.button-group{
			width: 100%;
			box-sizing: border-box;
			z-index: 99;
			margin-top: 40rpx;
			display: none;
			left: 0;
			background-color: #FFFFFF;
		}
	}
	.active{
		box-shadow: 0 0 10px rgba(0,0,0,.1);
		.button-group{
			display: block;
		}
	}
.swipe-action {
	
	&__content {
		padding: 25rpx 0;

		&__text {
			font-size: 15px;
			color: $u-main-color;
			padding-left: 30rpx;
		}
	}
}
.del-btnn{
	position: absolute;
	right: 10rpx;
	top: 10rpx;
}
</style>
