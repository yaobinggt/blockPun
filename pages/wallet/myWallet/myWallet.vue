<template>
	<view>
		<u-navbar :title="this.$t('set.title')" :safeAreaInsetTop="true" :placeholder="true" :autoBack="true"> </u-navbar>
		<view class="warp p-3">
			<view class="back px-2 py-3 flex flex-between rounded-lg">
				<view class="left flex flex-center">
					<u-icon name="/static/img/drawable-xxhdpi/icon-fun.png" size="48" v-if="formData.is_type==1"></u-icon>
					<u-icon name="/static/img/drawable-xxhdpi/icon-fsc.png" size="48"  v-if="formData.is_type==2"></u-icon>
					<view class="title ml-1">
						<view class="name">
							{{walletInfo.wallet_name}}
						</view>
						<text>{{this.$t('set.backName')}}</text>
					</view>
				</view>
				<view class="right">
					<view class="state flex" v-if="walletInfo.is_words==2" @click="goBackWords">
						<text class="color-red">{{this.$t('set.noBackup')}}</text>
						<u-icon name="arrow-right" size="16"></u-icon>
					</view>
					<view class="state flex" v-if="walletInfo.is_words==1">
						<text class="color-green">{{this.$t('set.backName')}}</text>
					</view>
				</view>
			</view>
			<view class="cell-box rounded-lg">
				<u-cell-group :border="false">
					<u-cell :title="this.$t('set.address')"  :label="formData.wallet_adress | ellipsis" >
						<u-icon slot="right-icon" size="24" name="file-text" @click="copyCode(formData.wallet_adress)"></u-icon>
					</u-cell>
					<u-cell :title="this.$t('set.name')" :value="walletInfo.wallet_name" isLink="" @click="nameOpen"></u-cell>
					<u-cell :title="this.$t('set.hint')" value="" isLink="" @click="hintOpen"></u-cell>
					<u-cell :title="this.$t('set.setPass')" value="" isLink="" @click="goSetPasswaord"></u-cell>
					<u-cell :title="this.$t('set.import')" value="" isLink="" @click="goImportKey"></u-cell>
					<u-cell :title="this.$t('set.setDefault')" :border="false">
						<u-switch slot="right-icon" v-model="checked" size="18" @change="change" ></u-switch>
					</u-cell>
				</u-cell-group>
			</view>
			<view class="del-btn mt-5 pt-2">
				<u-button type="warning"  :text="this.$t('set.delButton')" @click="passOpen"></u-button>
			</view>
		</view>
		
		<u-popup :show="nameShow" :round="10" mode="center" @close="nameClose" @open="nameOpen">
			<view class="pop-warp p-2">
				<view class="title py-2 flex justify-center">
					<text>{{this.$t('set.popTiName')}}</text>
					<u-icon class="pop-close" name="close-circle" color="#909399" size="24" @click="nameClose"></u-icon>
				</view>
				<view class="pop-main mb-3">
					<u--form :model="reviseData" class="">
						<u-form-item prop="wallet_name" :borderBottom="false" ref="item1">
							<u--input class="shop-input" v-model="reviseData.wallet_name" placeholder="请输入钱包名称" clearable @change=""></u--input>
						</u-form-item>
					</u--form>
				</view>
				<view class="pop-btn flex flex-center">
					<u-button type="primary"   throttleTime="3000"  text="确定" @click="setWalletName"></u-button>
				</view>
			</view>
		</u-popup>
		
		<u-popup :show="hintShow" :round="10" mode="center" @close="hintClose" @open="hintOpen">
			<view class="pop-warp p-2">
				<view class="title py-2 flex justify-center">
					<text>{{this.$t('set.popHint')}}</text>
					<u-icon class="pop-close" name="close-circle" color="#909399" size="24" @click="hintClose"></u-icon>
				</view>
				<view class="pop-main mb-3">
					<u--form :model="reviseData"  class="">
						<u-form-item prop="wallet_hint" :borderBottom="false" ref="item1">
							<u--input class="shop-input" v-model="reviseData.wallet_hint" placeholder="请输入密码提示" clearable @change=""></u--input>
						</u-form-item>
					</u--form>
				</view>
				<view class="pop-btn flex flex-center">
					<u-button type="primary"   throttleTime="3000"  text="确定" @click="setWalletHint"></u-button>
				</view>
			</view>
		</u-popup>
		
		<u-popup :show="passShow" :round="10" mode="center" @close="passClose" @open="passOpen">
			<view class="pop-warp p-2">
				<view class="title py-2 flex justify-center">
					<text>{{this.$t('set.delButton')}}</text>
					<u-icon class="pop-close" name="close-circle" color="#909399" size="24" @click="passClose"></u-icon>
				</view>
				<view class="pop-main mb-3">
					<u--form class="">
						<u-form-item :borderBottom="false" ref="item1">
							<u--input class="shop-input" type="password" v-model="password" :placeholder="this.$t('public.passPlace')" clearable @change=""></u--input>
						</u-form-item>
					</u--form>
				</view>
				<view class="pop-btn flex flex-center">
					<u-button type="primary"   throttleTime="3000"  :text="this.$t('public.submit')" @click="delWallet"></u-button>
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reviseData:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:'',
					wallet_adress:'',
					is_type:'',
					wallet_old_pass:'',
					wallet_new_pass:'',
					wallet_hint:'',
					wallet_name:''
				},
				formData:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:'',
					wallet_adress:'',
					is_type:''
				},
				delWalletData:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:'',
					wallet_adress:'',
					is_type:'',
					wallet_pass:''
				},
				signForm:{
					sign:''
				},
				signForm2:{
					sign:''
				},
				signForm3:{
					sign:''
				},
				walletInfo:{
					wallet_name:'',
					is_words:null,
					is_check:null,
					wallet_hint:''
				},
				rules1:{
					name:{
						type: 'string',
						message: '请填写钱包名称',
						trigger: ['blur', 'change']
					},
				},
				isCheck:'',
				checked:false,
				nameShow:false,
				hintShow:false,
				passShow:false,
				password:'',
			};
		},
		onLoad(options) {
			
			this.formData.wallet_adress=options.wallet_adress;
			this.formData.is_type=options.is_type;
			this.reviseData.wallet_adress=options.wallet_adress;
			this.reviseData.is_type=options.is_type;
			this.delWalletData.wallet_adress=options.wallet_adress;
			this.delWalletData.is_type=options.is_type;
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('set.title')
			});
			this.getWalletInfo();
		},
		
		methods:{
			change(e){
				console.log('change', e);
				this.defaultSet();
			},
			nameOpen() {
				this.nameShow = true
			},
			nameClose() {
				this.nameShow = false
			},
			hintOpen() {
				this.hintShow = true
			},
			hintClose() {
				this.hintShow = false
			},
			passOpen() {
				this.passShow = true
			},
			passClose() {
				this.passShow = false
			},
			getWalletInfo(){
				this.formData.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.formData),{});
				this.signForm.sign=this.$rsaEncryptlong(data);
				this.$api.getWalletInfo(this.signForm).then(res=>{
					console.log(res)
					this.walletInfo=res.walletInfo;
					this.reviseData.wallet_name=res.walletInfo.wallet_name;
					this.reviseData.wallet_hint=res.walletInfo.wallet_hint;
					if(res.walletInfo.is_check==1){
						this.checked=true;
					}else{
						this.checked=false;
					}
				})
			},
			defaultSet(){
				this.formData.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.signForm.sign=this.$rsaEncryptlong(data);
				this.$api.getSetWallet(this.signForm).then(res=>{
					console.log(res)
					// uni.showToast({
					// 	title: "设置成功"
					// })
				})
			},
			setWalletName(){
				this.reviseData.timestamp=parseInt(new Date()/1000).toString()
				this.reviseData.wallet_hint='';
				let data=JSON.stringify(Object.assign(this.reviseData,{}));
				this.signForm2.sign=this.$rsaEncryptlong(data);
				console.log(this.signForm2.sign)
				this.$api.getWalletUp(this.signForm2).then(res=>{
					console.log(res)
					this.nameShow = false;
					this.getWalletInfo();
				})
			},
			setWalletHint(){
				this.reviseData.timestamp=parseInt(new Date()/1000).toString()
				this.reviseData.wallet_name='';
				let data=JSON.stringify(Object.assign(this.reviseData,{}));
				this.signForm2.sign=this.$rsaEncryptlong(data);
				console.log(data)
				this.$api.getWalletUp(this.signForm2).then(res=>{
					console.log(res)
					this.hintShow = false;
					this.getWalletInfo();
				})
			},
			delWallet(){
				this.delWalletData.timestamp=parseInt(new Date()/1000).toString()
				this.delWalletData.wallet_pass=this.$md5.hex_md5(this.password);
				let data=JSON.stringify(Object.assign(this.delWalletData,{}));
				this.signForm3.sign=this.$rsaEncryptlong(data);
				console.log(data)
				console.log(this.signForm3.sign)
				if(!this.checked){
					this.$api.delWallet(this.signForm3).then(res=>{
						console.log(res)
						// uni.showToast({
						// 	title: "钱包删除成功！"
						// })
						setTimeout(()=>{
							uni.switchTab({
								url:"/pages/tabber/wallet/wallet"
							})
						},1000)
					})
				}else{
					uni.showToast({
						title: "默认钱包不能删除！"
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
			goSetPasswaord(){
				uni.navigateTo({
					url:"/pages/wallet/myWallet/setPassword?wallet_adress="+this.formData.wallet_adress+"&is_type="+this.formData.is_type
				})
			},
			goBackWords(){
				uni.navigateTo({
					url:"/pages/wallet/backupTips/backupTips?wallet_adress="+this.formData.wallet_adress+"&is_type="+this.formData.is_type
				})
			},
			goImportKey(){
				uni.navigateTo({
					url:"/pages/wallet/importKey/importKey?wallet_adress="+this.formData.wallet_adress+"&is_type="+this.formData.is_type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.back{
	background-color: #FFFFFF;
	
	.name{
		font-size: 32rpx;
		color: #303133;
	}
	text{
		font-size: 28rpx;
		color: #909399;
	}
	.right{
		
		.state{
			font-size: 28rpx;
			color: #ff9900;
		}
		.color-green{
			color: #19be6b !important;
		}
		.color-red{
			color: #ff9900 !important;;
		}
	}
}
.cell-box{
	background-color: #FFFFFF;
	margin-top: 30rpx;
}
.pop-warp{
	width:680rpx;
	.title{
		position: relative;
		.pop-close{
			position: absolute;
			right: 20rpx;
		}
	}
}
</style>