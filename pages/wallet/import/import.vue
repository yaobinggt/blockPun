<template>
	<view class="import">
		<view class="tabs flex-between">
			<view @click="wordTab" class="item py-2 flex-1 flex-center" :class="{active:current==0}" >
				{{this.$t('import.words')}}
				<text></text>
			</view>
			<view @click="keyTab" class="item py-2 flex-1 flex-center" :class="{active:current==1}">
				{{this.$t('import.key')}}
				<text></text>
			</view>
		</view>
		<view class="body px-3 ">
			<view class="item" v-show="current==0">
				<u--form labelPosition="top" :model="form2" :rules="rules2" ref="form2">
					<u-form-item :label="this.$t('import.words')" prop="mnemonic" ref="item2" labelWidth="100%">
						<u--textarea v-model="form2.mnemonic" :placeholder="this.$t('import.word_place')" ></u--textarea>
					</u-form-item>
					<u-form-item :label="this.$t('create.pass')" prop="password" ref="item2" labelWidth="100%" >
						<u--input class="import-input" border="surround" v-model="form2.password" :placeholder="this.$t('create.pass_place')" type="password" clearable></u--input>
					</u-form-item>
					<u-form-item :label="this.$t('create.repass')" prop="rePassword" ref="item2" labelWidth="100%" >
						<u--input class="import-input" v-model="form2.rePassword" :placeholder="this.$t('create.repass_place')" type="password" clearable></u--input>
					</u-form-item>
					<u-form-item :label="this.$t('create.name')" prop="name" ref="item2" labelWidth="100%" >
						<u--input class="import-input" v-model="form2.name" :placeholder="this.$t('create.name_place')" clearable></u--input>
					</u-form-item>
					<u-form-item :label="this.$t('create.tips')" prop="hint" ref="item2" labelWidth="100%" >
						<u--input class="import-input" v-model="form2.hint" :placeholder="this.$t('create.tips_place')" clearable></u--input>
					</u-form-item>
				</u--form>
				<u-checkbox-group class="py-3">
					<u-checkbox :checked="check"></u-checkbox>
					<view class="create-check">
						{{this.$t('create.check')}}<text @click="goSLA">{{this.$t('create.service')}}</text>
					</view>
				</u-checkbox-group>
				<u-button type="primary" @click="submit2"  :text="this.$t('public.submit')"  class="mt-2"></u-button>
			</view>
			<view class="item" v-show="current==1">
				<u--form labelPosition="top"  :model="form" :rules="rules" ref="form1">
					<u-form-item :label="this.$t('import.key')"  prop="mnemonic" ref="item1" labelWidth="100%">
						<u--textarea v-model="form.mnemonic" :placeholder="this.$t('import.key_place')" ></u--textarea>
					</u-form-item>
					<u-form-item :label="this.$t('create.pass')" prop="password" ref="item1" labelWidth="100%" >
						<u--input class="import-input" border="surround" v-model="form.password" :placeholder="this.$t('create.pass_place')" type="password" clearable></u--input>
					</u-form-item>
					<u-form-item :label="this.$t('create.repass')" prop="rePassword" ref="item1" labelWidth="100%" >
						<u--input class="import-input" v-model="form.rePassword" :placeholder="this.$t('create.repass_place')" type="password" clearable></u--input>
					</u-form-item>
					<u-form-item :label="this.$t('create.name')" prop="name" ref="item1" labelWidth="100%" >
						<u--input class="import-input" v-model="form.name" :placeholder="this.$t('create.name_place')" clearable></u--input>
					</u-form-item>
					<u-form-item :label="this.$t('create.tips')" prop="" ref="item1" labelWidth="100%" >
						<u--input class="import-input" v-model="form.hint" :placeholder="this.$t('create.tips_place')" clearable></u--input>
					</u-form-item>
				</u--form>
				<u-checkbox-group class="py-3">
					<u-checkbox :checked="check"></u-checkbox>
					<view class="create-check">
						{{this.$t('create.check')}}<text @click="goSLA">{{this.$t('create.service')}}</text>
					</view>
				</u-checkbox-group>
				<u-button type="primary" @click="submit"  :text="this.$t('public.submit')" class="mt-2"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formList:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:"",
					nonce_str:"dsadswe1ee",
				},
				listForm:{
					sign:''
				},
				form:{
					mnemonic:"",
					password:"",
					rePassword:"",
					name:"",
					hint:""
				},
				form2:{
					mnemonic:"",
					password:"",
					rePassword:"",
					name:"",
					hint:""
				},
				formData:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:'',
					key_type:"1",
					wallet_type:"",
					wallet_name:"",
					wallet_pass:"",
					wallet_hint:"",
					private_mnemonic:"",
				},
				formSign:{
					sign:''
				},
				formData2:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:'',
					key_type:"1",
					wallet_type:"",
					wallet_name:"",
					wallet_pass:"",
					wallet_hint:"",
					private_mnemonic:"",
				},
				formSign2:{
					sign:''
				},
				rules:{
					mnemonic:{
						type: 'string',
						required: true,
						message: this.$t('import.content'),
						trigger: ['blur', 'change']
					},
					name:{
						type: 'string',
						required: true,
						message: this.$t('create.name_place'),
						trigger: ['blur', 'change']
					},
					password:[
						{
							required: true,
							message: this.$t('create.pass_place'),
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
								return value === this.form.password;
							},
							message: this.$t('create.pass_msg2'),
							trigger: ['change','blur'],
						}
					],
					
				},
				rules2:{
					mnemonic:{
						type: 'string',
						required: true,
						message: this.$t('import.content'),
						trigger: ['blur', 'change']
					},
					name:{
						type: 'string',
						required: true,
						message: this.$t('create.name_place'),
						trigger: ['blur', 'change']
					},
					password:[
						{
							required: true,
							message: this.$t('create.pass_place'),
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
								return value === this.form2.password;
							},
							message: this.$t('create.pass_msg2'),
							trigger: ['change','blur'],
						}
					],
					
				},
				current:0,
				check: true,
				list:[],
				defaultwallet:[]
			};
		},
		onReady() {
			this.$refs.form1.setRules(this.rules)
			this.$refs.form2.setRules(this.rules2)
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('import.title')
			});
		},
		onLoad(options) {
			this.formData.wallet_type=options.type;
			this.formData2.wallet_type=options.type;
		},
		methods:{
			wordTab(){
				
				this.form2.name="";
				this.form2.password="";
				this.form2.rePassword="";
				this.form2.name="";
				this.form2.hint="";
				this.form2.mnemonic="";
				this.current=0;
				this.formData2.key_type='1'
			},
			keyTab(){
				this.form.name="";
				this.form.password="";
				this.form.rePassword="";
				this.form.name="";
				this.form.hint="";
				this.form.mnemonic="";
				this.current=1;
				this.formData.key_type='2'
			},
			checkClick(){
				this.check=!this.check
			},
			goSLA(){
				uni.navigateTo({
					url:"/pages/user/about/sla/sla"
				})
			},
			getWalletList(){
				this.formList.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.formList,{}));
				this.listForm.sign=this.$rsaEncryptlong(data);
				console.log(data)
				this.$api.getWalletList(this.listForm).then(res=>{
					
					console.log(res);
					if(res.list.length>0){
						this.pageShow=true
					}else{
						this.pageShow=false
					}
					this.list=res.list.filter((item,index)=>{
						return item.is_check==1;
					});
					this.defaultwallet=this.list.filter((item,index)=>{
						return item.is_type==1;
					});
					this.saveWallet(res.list)
					this.saveDefault(this.defaultwallet[0])
				});
			},
			submit(){
				this.$refs.form1.validate().then(res => {
					if(this.check){
						this.formData.timestamp=parseInt(new Date()/1000).toString()
						this.formData.wallet_name=this.form.name
						this.formData.wallet_pass=this.$md5.hex_md5(this.form.password)
						this.formData.wallet_hint=this.form.hint
						this.formData.private_mnemonic=this.form.mnemonic
						let data=JSON.stringify(Object.assign(this.formData,{}));
						this.formSign.sign=this.$rsaEncryptlong(data);
						console.log(data);
						this.$api.recoverWallet(this.formSign).then(res=>{
							console.log(res)
							
							uni.switchTab({
								url:"/pages/tabber/wallet/wallet"
							})
						})
						this.getWalletList();
					}else{
						uni.$u.toast(this.$t('create.toast2'));
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			submit2(){
				this.$refs.form2.validate().then(res => {
					if(this.check){
						this.formData2.timestamp=parseInt(new Date()/1000).toString()
						this.formData2.wallet_name=this.form2.name
						this.formData2.wallet_pass=this.$md5.hex_md5(this.form2.password)
						this.formData2.wallet_hint=this.form2.hint
						this.formData2.private_mnemonic=this.form2.mnemonic
						let data=JSON.stringify(Object.assign(this.formData2,{}));
						this.formSign2.sign=this.$rsaEncryptlong(data);
						console.log(this.formSign2.sign);
						console.log(data);
						this.$api.recoverWallet(this.formSign2).then(res=>{
							console.log(res)
							
							uni.switchTab({
								url:"/pages/tabber/wallet/wallet"
							})
						})
						this.getWalletList();
					}else{
						uni.$u.toast(this.$t('create.toast2'));
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.tabs{
	background-color: #FFFFFF;
	font-size: 34rpx;
	border-top: solid 1rpx #efefef;
	.item{
		position: relative;
		color: #909399;
	}
	.active{
		color: #2979ff;
		text{
			display: block;
			width: 50rpx;
			height: 6rpx;
			background-color: #2979ff;
			position: absolute;
			bottom: 0;
		}
	}
}
.import-input{
	background-color: #FFFFFF;
}
.create-check{
	font-size: 28rpx;
	text{
		color: #2979ff;
	}
}
</style>
