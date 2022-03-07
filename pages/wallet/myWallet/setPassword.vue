<template>
	<view>
		<view class="pop-main p-3 ">
			<u--form :model="password" :rules="rules" ref="form3"  class="">
				<u-form-item prop="wallet_old_pass" :borderBottom="false" ref="item2">
					<u--input class="shop-input" type="password" v-model="password.wallet_old_pass" :placeholder="this.$t('set.old_pass')" clearable @blur="modelOldPass"></u--input>
				</u-form-item>
				<u-form-item prop="wallet_new_pass" :borderBottom="false" ref="item2">
					<u--input class="shop-input" type="password" v-model="password.wallet_new_pass" :placeholder="this.$t('set.new_pass')" clearable @blur="modelNewPass"></u--input>
				</u-form-item>
				<u-form-item prop="wallet_resnew_pass" :borderBottom="false" ref="item2">
					<u--input class="shop-input" type="password" v-model="password.wallet_resnew_pass" :placeholder="this.$t('set.agin_pass')" clearable></u--input>
				</u-form-item>
			</u--form>
		</view>
		<view class="pop-btn flex px-3 flex-center">
			<u-button type="primary" :text="this.$t('public.submit')" @click="setWallet"></u-button>
		</view>
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
				signForm2:{
					sign:''
				},
				password:{
					wallet_old_pass:'',
					wallet_new_pass:'',
					wallet_resnew_pass:'',
				},
				rules:{
					wallet_old_pass:[
						{
							required: true,
							message: this.$t('public.passPlace'),
							trigger: ['change','blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							message: this.$t('create.pass_msg1'),
							trigger: ['change','blur'],
						}
					],
					wallet_new_pass:[
						{
							required: true,
							message: this.$t('public.passPlace'),
							trigger: ['change','blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							message: this.$t('create.pass_msg1'),
							trigger: ['change','blur'],
						}
					],
					wallet_resnew_pass:[
						{
							required: true,
							message: this.$t('create.repass_place'),
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.password.wallet_new_pass;
							},
							message: this.$t('create.pass_msg2'),
							trigger: ['change','blur'],
						}
					],
				},
			};
		},
		onLoad(options) {
			this.reviseData.wallet_adress=options.wallet_adress;
			this.reviseData.is_type=options.is_type;
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form3.setRules(this.rules)
		},
		methods:{
			modelOldPass(){
				this.reviseData.wallet_old_pass=this.$md5.hex_md5(this.password.wallet_old_pass);
			},
			modelNewPass(){
				this.reviseData.wallet_new_pass=this.$md5.hex_md5(this.password.wallet_new_pass);
			},
			setWallet(){
				this.reviseData.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.reviseData,{}));
				this.signForm2.sign=this.$rsaEncryptlong(data);
				this.$api.getWalletUp(this.signForm2).then(res=>{
					console.log(res)
					uni.navigateBack({
						delta: 1
					});
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
page{}
.shop-input{
	background-color: #FFFFFF;
}
/deep/.u-form-item__body__right__message{
	margin-left: 0 !important;
}
</style>
