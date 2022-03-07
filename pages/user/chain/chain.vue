<template>
	<view>
		<view class="warp p-3">
			<u--form labelPosition="top">
				
				<u-form-item >
					<u--input class="import-input" :value="this.$t('bridge.name1')" suffixIcon="/static/img/drawable-xxhdpi/icon-fun.png" suffixIconStyle="width:50rpx;height:50rpx" type="text" disabled clearable v-show="punShow"></u--input>
					<u--input class="import-input" :value="this.$t('bridge.name2')" suffixIcon="/static/img/drawable-xxhdpi/icon-fsc.png" suffixIconStyle="width:50rpx;height:50rpx" type="text" disabled clearable  v-show="!punShow"></u--input>
				</u-form-item>
				<view class="change-btn p-1 flex flex-center">
					<u-icon name="/static/user/change-icon.png" size="26" @click="change()"></u-icon>
				</view>
				<u-form-item  >
					<u--input class="import-input" :value="this.$t('bridge.name1')" suffixIcon="/static/img/drawable-xxhdpi/icon-fun.png" suffixIconStyle="width:50rpx;height:50rpx" type="text" disabled clearable  v-show="!punShow"></u--input>
					<u--input class="import-input" :value="this.$t('bridge.name2')" suffixIcon="/static/img/drawable-xxhdpi/icon-fsc.png" suffixIconStyle="width:50rpx;height:50rpx" type="text" disabled clearable  v-show="punShow"></u--input>
				</u-form-item>
				<u-form-item :label="this.$t('bridge.number')" prop="" ref="" labelWidth="100%" >
					<u--input class="import-input" v-model="formData.amount" type="number" :placeholder="this.$t('bridge.number_place')" clearable @change="isInput"></u--input>
				</u-form-item>
				<u-form-item :label="this.$t('bridge.addres')" prop="" ref="" labelWidth="100%" >
					<u--textarea :placeholder="this.$t('import.content')"  v-model="formData.wallet_adress"  @input="isInput"></u--textarea>
				</u-form-item>
				<!-- <u-form-item :label="this.$t('create.pass')" prop="" ref="" labelWidth="100%" >
					<u--input class="import-input" type="password" v-model="formData.wallet_pass" :placeholder="this.$t('create.pass_place')" clearable></u--input>
				</u-form-item> -->
			</u--form>
			<view class="py-2" v-show="punShow">
				<view class=" font-md mb-1">{{this.$t('bridge.fee')}}：{{hanfree}}%</view>
				<view class="font-sm">{{this.$t('bridge.note')}}{{role.low_amount}}</view>
			</view>
			<u-button type="primary" :text="this.$t('public.submit')" :disabled="disabled" @click="open" class="mt-2"></u-button>
		</view>
		<!-- 密码验证 -->
		<u-popup :show="show" :round="10" mode="center" :closeOnClickOverlay="false" @close="close" @open="open">
			<view class="pop-warp p-2">
				<view class="title py-2 flex justify-center">
					<text>{{this.$t('importKey.popTitle')}}</text>
				</view>
				<view class="pop-main mb-3">
					<u--form class="">
						<u-form-item :borderBottom="false" ref="item1">
							<u--input class="shop-input" type="password" v-model="password" :placeholder="this.$t('importKey.password')" clearable></u--input>
						</u-form-item>
					</u--form>
					
				</view>
				<view class="pop-btn flex flex-center">
					<u-button :text="this.$t('public.cancel')" class="mr-2" @click="close"></u-button>
					<u-button :text="this.$t('public.submit')" type="primary" throttleTime="4000"  class="ml-2" @click="submit"></u-button>
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
					timestamp:null,
					amount:'',
					wallet_adress:'',
					wallet_pass:'',
					type:'2'
				},
				formSign:{
					sign:''
				},
				formRole:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
				},
				roleSign:{
					sign:''
				},
				role:{
					handling_fee: "0.00", //手续费
					low_amount: "0" //最低数量
				},
				password:'',//密码
				punShow:false,
				show:false,
				disabled:true,
				hanfree:'',
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('bridge.title')
			});
			this.getRole();
		},
		methods:{
			open() {
				let str=this.formData.wallet_adress.substring(0,2);
				console.log(str)
				if(this.formData.type=="1"){
					if(str=="0x"){
						this.show = true
					}else{
						uni.showToast({
							icon:'none',
							title:"请输入有效BSC地址"
						})
					}
				}else if(this.formData.type=="2"){
					if(str=="pu"){
						this.show = true
					}
					else{
						uni.showToast({
							icon:'none',
							title:"请输入有效PUN地址"
						})
					}
				}
				
			},
			close() {
				this.show = false
			},
			isInput(){
				if(this.formData.amount!="" && this.formData.wallet_adress!="" ){
					this.disabled=false
				}else{
					this.disabled=true
				}
			},
			change(){
				this.punShow=!this.punShow;
				if(this.punShow){
					this.formData.type="1"
				}else{
					this.formData.type="2"
				}
				console.log(this.formData)
			},
			//获取手续费
			getRole(){
				this.formRole.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formRole,{}));
				this.roleSign.sign=this.$rsaEncryptlong(data);
				this.$api.redeemRole(this.roleSign).then(res=>{
					console.log(res)
					this.role=res.result
					this.hanfree=res.result.handling_fee*100
				})
			},
			submit(){
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				this.formData.wallet_pass=this.$md5.hex_md5(this.password);
				let data=JSON.stringify(Object.assign(this.formData,{}));
				console.log(data)
				this.show = false
				this.disabled=true
				uni.showToast({
					icon:"none",
					title:"请稍等，资产映射中..."
				})
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.redeem(this.formSign).then(res=>{
					console.log(res)
					uni.showToast({
						icon:"none",
						title:"映射成功"
					})
					this.disabled=false
					this.password=""
					this.formData.wallet_pass=""
					this.formData.amount=""
					this.formData.wallet_adress=""
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
.import-input{
	background-color: #FFFFFF;
}
</style>
