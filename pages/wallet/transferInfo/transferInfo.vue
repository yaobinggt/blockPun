<template>
	<view class="p-3 pt-5">
		<view class="warp p-3 rounded-lg mt-5">
			<view class="top flex flex-column flex-center">
				<u-icon name="clock-fill" v-show="result.des=='等待矿工'" size="52" color="#ff9900"></u-icon>
				<u-icon name="checkmark-circle-fill" v-show="result.des=='成功'" size="52" color="#19be6b"></u-icon>
				<u-icon name="close-circle-fill" v-show="result.des=='失败'" size="52" color="#fa3534"></u-icon>
				<view class="font-md mt-1">{{result.des}}</view>
			</view>
			<view class="amount flex flex-center mb-5">
				{{result.amount}}
			</view>
			<view class="list">
				<view class="item">
					<view class="title">
						{{this.$t('infor.from_adress')}}
					</view>
					<view class="desc">
						<text>{{result.from_adress | ellipsis}}</text>
						<u-icon name="file-text" size="26" color="#909399" @click="copyCode(result.from_adress)"></u-icon>
					</view>
				</view>
				<view class="item">
					<view class="title">
						{{this.$t('infor.to_adress')}}
					</view>
					<view class="desc">
						<text>{{result.to_adress | ellipsis}}</text>
						<u-icon name="file-text" size="26" color="#909399" @click="copyCode(result.to_adress)"></u-icon>
					</view>
				</view>
				<view class="item">
					<view class="title">
						{{this.$t('infor.hash')}}
					</view>
					<view class="desc">
						<text>{{result.transfer_hash | ellipsis}}</text>
						<u-icon name="file-text" size="26" color="#909399" @click="copyCode(result.transfer_hash)"></u-icon>
					</view>
				</view>
				<view class="item">
					<view class="title">
						{{this.$t('infor.block')}}
					</view>
					<view class="desc">
						<text>{{result.block}}</text>
						
					</view>
				</view>
				<view class="item">
					<view class="title">
						{{this.$t('infor.time')}}
					</view>
					<view class="desc">
						<text>{{result.create_time}}</text>
						
					</view>
				</view>
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
					transfer_hash:"",
					is_type:""
				},
				formSign:{
					sign:""
				},
				result:{
					amount: "",
					block: null,
					create_time: "",
					des: "",
					from_adress: "",
					to_adress: "",
					transfer_hash: "",
				},
				tran_type:'',
			};
		},
		onLoad(options) {
			console.log(options)
			this.tran_type=options.tran_type;
			this.formData.transfer_hash=options.transfer_hash;
			this.formData.is_type=options.is_type;
			this.getInfo();
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('infor.title')
			});
		},
		methods:{
			getInfo(){
				if(this.tran_type==1){
					this.formData.timestamp=parseInt(new Date()/1000).toString()
					let data=JSON.stringify(Object.assign(this.formData,{}));
					console.log(data)
					this.formSign.sign=this.$rsaEncryptlong(data);
					this.$api.transferPunInfo(this.formSign).then(res=>{
						console.log(res);
						this.result=res.result
					})
				}else if(this.tran_type==2){
					this.formData.timestamp=parseInt(new Date()/1000).toString()
					let data=JSON.stringify(Object.assign(this.formData,{}));
					console.log(data)
					this.formSign.sign=this.$rsaEncryptlong(data);
					this.$api.bscWalletTransferInfo(this.formSign).then(res=>{
						console.log(res);
						this.result=res.result
					})
				}
				
			},
			copyCode(value) {
				uni.setClipboardData({
					data: value, 
					success: () => {
						uni.showToast({
							title: "复制成功"
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.warp{
	background-color: #FFFFFF;
	position: relative;
	.top{
		position: relative;
		top: -60rpx;
	}
	.amount{
		font-size: 56rpx;
		color: #2979ff;
	}
	.item{
		margin-bottom: 30rpx;
		.title{
			font-size: 30rpx;
			color: #909193;
		}
		.desc{
			font-size: 34rpx;
			display: flex;
			text{
				margin-right: 10rpx;
			}
		}
	}
}
</style>
