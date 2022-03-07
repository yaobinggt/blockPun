<template>
	<view>
		<u-navbar title="钱包设置" :safeAreaInsetTop="true" :placeholder="true" :autoBack="true"> </u-navbar>
		<view class="warp p-3">
			<view class="back px-2 py-3 flex flex-between rounded-lg">
				<view class="left flex flex-center">
					<u-icon name="/static/img/drawable-xxhdpi/icon-fun.png" size="48"></u-icon>
					<view class="title ml-1">
						<view class="name">
							{{walletInfo.wallet_name}}
						</view>
						<text>备份身份钱包</text>
					</view>
				</view>
				<view class="right">
					<view class="state flex">
						<text>未备份助记词</text>
						<u-icon name="arrow-right" size="16"></u-icon>
					</view>
				</view>
			</view>
			<view class="cell-box rounded-lg">
				<u-cell-group :border="false">
					<u-cell title="钱包地址"  :label="formData.wallet_adress | ellipsis" >
						<u-icon slot="right-icon" size="24" name="file-text" @click="copyCode(formData.wallet_adress)"></u-icon>
					</u-cell>
					<u-cell title="钱包名称" :value="walletInfo.wallet_name" isLink="" @click="nameOpen"></u-cell>
					<u-cell title="密码提示" value="" isLink="" @click="hintOpen"></u-cell>
					<u-cell title="修改密码" value="" isLink="" @click="goSetPasswaord"></u-cell>
					<u-cell title="导出私钥" value="" isLink=""></u-cell>
					<u-cell title="设为默认钱包" :border="false">
						<u-switch slot="right-icon" v-model="checked" size="18" @change="change" ></u-switch>
					</u-cell>
				</u-cell-group>
			</view>
			<view class="del-btn mt-5 pt-2">
				<u-button type="warning" text="删除钱包"></u-button>
			</view>
		</view>
		
		<u-popup :show="nameShow" :round="10" mode="center" @close="nameClose" @open="nameOpen">
			<view class="pop-warp p-2">
				<view class="title py-2 flex justify-center">
					<text>修改钱包名称</text>
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
					<u-button type="primary" text="确定" @click="setWallet"></u-button>
				</view>
			</view>
		</u-popup>
		
		<u-popup :show="hintShow" :round="10" mode="center" @close="hintClose" @open="hintOpen">
			<view class="pop-warp p-2">
				<view class="title py-2 flex justify-center">
					<text>修改密码提示</text>
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
					<u-button type="primary" text="确定" @click="setWallet"></u-button>
				</view>
			</view>
		</u-popup>
		
		
	</view>
</template>

<script>
	import { rsaEncrypt, rsaDecrypt } from '@/util/rea.js'
	export default {
		data() {
			return {
				reviseData:{
					androidVersion:'1.0.1',
					wallet_adress:'',
					is_type:'',
					wallet_old_pass:'',
					wallet_new_pass:'',
					wallet_hint:'',
					wallet_name:''
				},
				formData:{
					androidVersion:'1.0.1',
					wallet_adress:'',
					is_type:''
				},
				signForm:{
					sign:''
				},
				signForm2:{
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
				
				checked:false,
				nameShow:false,
				hintShow:false,
			};
		},
		onLoad(options) {
			this.formData.wallet_adress=options.wallet_adress;
			this.formData.is_type=options.is_type;
			this.reviseData.wallet_adress=options.wallet_adress;
			this.reviseData.is_type=options.is_type;
		},
		onShow() {
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
			getWalletInfo(){
				let data=JSON.stringify(Object.assign(this.formData),{});
				this.signForm.sign=rsaEncrypt(data);
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
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.signForm.sign=rsaEncrypt(data);
				this.$api.getSetWallet(this.signForm).then(res=>{
					console.log(res)
					uni.showToast({
						title: "设置成功"
					})
				})
			},
			setWallet(){
				let data=JSON.stringify(Object.assign(this.reviseData,{}));
				this.signForm2.sign=rsaEncrypt(data);
				console.log(data)
				this.$api.getWalletUp(this.signForm2).then(res=>{
					console.log(res)
					this.nameShow = false;
					this.hintShow = false;
					this.getWalletInfo();
				})
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