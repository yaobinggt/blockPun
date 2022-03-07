<template>
	<view>
		<view class="tips p-3">
			{{this.$t('importKey.tips')}}
		</view>
		<view class="p-3 mt-3">
			<view class="key-box p-3 rounded-lg">
				<text>{{key}}</text>
			</view>
		</view>
		<view class="p-3">
			<u-button type="primary" :text="this.$t('importKey.btn')" @click="copyKey(key)"></u-button>
		</view>
		
		<u-popup :show="show" :overlayStyle="{background: 'rgba(236, 236, 236)'}" overlayOpacity="1" :round="10" mode="center" :closeOnClickOverlay="false" @close="close" @open="open">
			<view class="pop-warp p-2">
				<view class="title py-2 flex justify-center">
					<text>{{this.$t('importKey.popTitle')}}</text>
				</view>
				<view class="pop-main mb-3">
					<u--form class="">
						<u-form-item prop="wallet_name" :borderBottom="false" ref="item1">
							<u--input class="shop-input" type="password" v-model="password" :placeholder="this.$t('importKey.password')" clearable></u--input>
						</u-form-item>
					</u--form>
				</view>
				<view class="pop-btn flex flex-center">
					<u-button :text="this.$t('public.back')" class="mr-2" @click="goBack"></u-button>
					<u-button :text="this.$t('public.submit')" type="primary" class="ml-2" @click="getKey"></u-button>
				</view>
			</view>
		</u-popup>
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
					is_type:'',
					wallet_pass:'',
					words_private:'2'
				},
				signForm:{
					sign:''
				},
				password:'',
				key:'',
				show:true,
			};
		},
		onLoad(options) {
			console.log(options)
			this.formData.wallet_adress=options.wallet_adress;
			this.formData.is_type=options.is_type;
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('importKey.title')
			});
		},
		methods:{
			open() {
				this.show = true
			},
			close() {
				this.show = false
			},
			goBack(){
				uni.navigateBack({
					 delta: 1
				})
			},
			copyKey(value) {
				uni.setClipboardData({
					data: value, 
					success: () => {
						uni.showToast({
							title: this.$t('public.copy')
						})
					}
				});
			},
			getKey(){
				this.formData.timestamp=parseInt(new Date()/1000).toString()
				this.formData.wallet_pass=this.$md5.hex_md5(this.password);
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.signForm.sign=this.$rsaEncryptlong(data);
				console.log(this.signForm.sign)
				this.$api.getWordsKey(this.signForm).then(res=>{
					console.log(res)
					this.key=res.private_key;
					setTimeout(()=>{
						this.show = false
					},500)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.pop-warp{
	width:620rpx;
	.title{
		position: relative;
		.pop-close{
			position: absolute;
			right: 20rpx;
		}
	}
}
.tips{
	background-color: #fef0f0;
	color: #fa3534;
	font-size: 26rpx;
}
.key-box{
	background-color: #FFFFFF;
	text{
		 display:inline-block;
		width: 100%;
		height: auto;
		font-family: Gibson;
		font-size: 36rpx;
		word-break: break-all;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: pre-wrap;
	}
}
</style>
