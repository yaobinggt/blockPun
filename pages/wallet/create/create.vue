<template>
	<view>
		<view class="tips p-2 flex-center text-center">
			{{this.$t('create.tips1')}}
			<br>
			{{this.$t('create.tips2')}}
		</view>
		<view class="create-box p-3">
			<u--form labelPosition="top":model="model" :rules="rules" ref="form1" class="">
				<u-form-item :label="this.$t('create.name')" prop="name" :borderBottom="false" ref="item1" labelWidth="100%">
					<u--input class="shop-input" v-model="model.name" :placeholder="this.$t('create.name_place')" clearable @change=""></u--input>
				</u-form-item>
				<u-form-item :label="this.$t('create.pass')" prop="password" :borderBottom="false" ref="item1" labelWidth="100%">
					<u--input class="shop-input" v-model="model.password" :placeholder="this.$t('create.pass_place')" type="password" clearable @change=""></u--input>
				</u-form-item>
				<u-form-item :label="this.$t('create.repass')" prop="rePassword" :borderBottom="false" ref="item1" labelWidth="100%">
					<u--input class="shop-input" v-model="model.rePassword" :placeholder="this.$t('create.repass_place')" type="password" clearable disabledColor="#ececec"></u--input>
				</u-form-item>
				<u-form-item :label="this.$t('create.tips')" prop="" :borderBottom="false" ref="item1" labelWidth="100%">
					<u--input class="shop-input" v-model="model.passwordTips" clearable  :placeholder="this.$t('create.tips_place')"></u--input>
				</u-form-item>
			</u--form>
			<u-checkbox-group class="py-3">
				<u-checkbox :checked="check" @change="checkClick"></u-checkbox>
				<view class="create-check">
					{{this.$t('create.check')}}<text @click="goSLA">{{this.$t('create.service')}}</text>
				</view>
			</u-checkbox-group>
			
			<u-button type="primary" @click="submit" throttleTime="2000"  :text="this.$t('public.submit')" class="mt-2"></u-button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model:{
					name:'',
					password:'',
					rePassword:'',
					passwordTips:''
				},
				rules:{
					name:{
						type: 'string',
						required: true,
						message: this.$t('create.name_place'),
						trigger: ['blur', 'change']
					},
					password:[
						{
							required: true,
							message:  this.$t('create.pass_place'),
							trigger: ['change','blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							message: this.$t('create.pass_msg1'),
							trigger: ['change','blur'],
						}
					],
					rePassword:[
						{
							required: true,
							message: this.$t('create.repass_place'),
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.model.password;
							},
							message: this.$t('create.pass_msg2'),
							trigger: ['change','blur'],
						}
					],
					passwordTips:{
						type: 'string',
						message: this.$t('create.tips_place'),
						trigger: ['blur', 'change']
					}
					
				},
				formData:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
					wallet_type:null,
					wallet_name:'',
					wallet_pass:'',
					wallet_hint:'',
				},
				formSign:{
					sign:''
				},
				formData2:{
					wallet_adress:'',
					is_type:''
				},
				check: true,
			};
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		onLoad(options) {
			this.formData.wallet_type=options.type;
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('create.pop_title1')
			});
		},
		methods:{
			checkClick(){
				this.check=!this.check
			},
			goSLA(){
				uni.navigateTo({
					url:"/pages/user/about/sla/sla"
				})
			},
			submit() {
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				this.formData.wallet_name=this.model.name;
				this.formData.wallet_pass=this.$md5.hex_md5(this.model.password);
				this.formData.wallet_hint=this.model.passwordTips;
				this.$refs.form1.validate().then(res => {
					if(this.check){
						let data=JSON.stringify(Object.assign(this.formData,{}));
						this.formSign.sign=this.$rsaEncryptlong(data);
						console.log(data);
						console.log(this.formSign);
						this.$api.createWallet(this.formSign).then(res=>{
							
							setTimeout(()=>{
								uni.navigateTo({
									url:"/pages/wallet/backupTips/backupTips?wallet_adress="+res.wallet_adress+"&is_type="+res.is_type
								})
							},500)
							//console.log(res)
						})
					}else{
						uni.$u.toast(this.$t('create.toast2'));
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			submit2(){
				console.log(111)
			}
		}
	}
</script>

<style lang="scss" scoped>
.tips{
	background-color: #ff9900;
	color: #FFFFFF;
	font-size: 26rpx;
}
.create-box{
	.shop-input{
		background-color: #FFFFFF;color: #0062CC;
	}
	.create-check{
		font-size: 28rpx;
		text{
			color: #2979ff;
		}
	}
}

</style>
