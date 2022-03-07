<template>
	<view class="backup-warp">
		<view class="backup-tips flex-column flex-center p-3 mt-5 pt-5">
			<u-icon name="/static/wallet/icon-back.png" color="#2979ff" size="50"></u-icon>
			<view>
				{{this.$t('backup.tips')}}
			</view>
			<text>
				{{this.$t('backup.desc_tips')}}
			</text>
		</view>
		<view class="backup-btn p-3">
			<u-button type="primary" :text="this.$t('backup.next_btn')"  @click="open"></u-button>
		</view>
		<u-popup :show="show" mode="center" :round="20" @close="close" @open="open">
			<view class="backup-password p-3">
				<view class="title flex-center mb-5 mt-1">
					<text>{{this.$t('public.passPlace')}}</text>
				</view>
				<u--input :placeholder="this.$t('public.passPlace')" clearable type="password"  border="surround" v-model="password" @blur="change"></u--input>
				<view class="pup-btn flex mt-4 mb-3">
					<u-button type="info" :text="this.$t('public.cancel')" @click="close" class="mr-2"></u-button>
					<u-button type="primary" :text="this.$t('public.submit')" @click="goRecord" throttleTime="2000" class="ml-2"></u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				round: 10,
				value:'',
				fromData:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:'',
					wallet_adress:'',
					is_type:'',
					words_private:'1',
					wallet_pass:''
				},
				signForm:{
					sign:''
				},
				password:''
			};
		},
		onLoad(options) {
			console.log(options)
			this.fromData.wallet_adress=options.wallet_adress;
			this.fromData.is_type=options.is_type;
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('backup.title')
			});
		},
		methods: {
			open() {
			  this.show = true
			},
			close() {
			  this.show = false
			},
			change(e){
				console.log(this.value)
			},
			goRecord(){
				if(!this.password){
					uni.showToast({
						title: this.$t('public.passPlace')
					})
				}else{
					this.fromData.timestamp=parseInt(new Date()/1000).toString()
					this.fromData.wallet_pass=this.$md5.hex_md5(this.password);
					let data=JSON.stringify(Object.assign(this.fromData,{}));
					this.signForm.sign=this.$rsaEncryptlong(data);
					this.$api.getWordsKey(this.signForm).then(res=>{
						console.log(res)
						uni.navigateTo({
							url:"/pages/wallet/backupRecord/backupRecord?obj="+ encodeURIComponent(JSON.stringify(this.fromData))
						})
					})
				}
				
				// uni.navigateTo({
				// 	url:"/pages/wallet/backupRecord/backupRecord"
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
.backup-warp{
	position: relative;
	height: 100vh;
	.backup-tips{
		view{
			font-size: 36rpx;
			margin-top: 30rpx;
		}
		text{
			font-size: 32rpx;
			color: #82848a;
			margin-top: 30rpx;
		}
	}
	.backup-btn{
		position: absolute;
		left: 0;right: 0;bottom: 200rpx;
		
	}
}
.backup-warp{
	width: 100%;
}
.backup-password{
	width: 600rpx;
	border-radius: 20rpx;
	position: relative;
}
</style>
