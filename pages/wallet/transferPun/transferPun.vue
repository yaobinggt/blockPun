<template>
	<view class="p-3 shop">
		<!-- <u--form labelPosition="top"  :model="" :rules="rules"  ref="form1"> -->
		<u--form labelPosition="top" :model="formData" :rules="rules" ref="form1">
			<u-form-item :label="this.$t('transfer.from_adress')" prop="" :borderBottom="false" ref="item1" labelWidth="100%">
				<u--input class="shop-input" v-model="formData.from_wallet_adress" type="text" disabled></u--input>
			</u-form-item>
			<u-form-item :label="this.$t('transfer.to_adress')" prop="to_wallet_adress" :borderBottom="false" ref="item1" labelWidth="100%">
				<!-- #ifndef APP-NVUE -->
				<u-input  class="shop-input" v-model="formData.to_wallet_adress" clearable  :placeholder="this.$t('transfer.to_adress_plac')">
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				<u--input  class="shop-input" v-model="formData.to_wallet_adress" clearable  :placeholder="this.$t('transfer.to_adress_plac')">
				<!-- #endif -->
					<template slot="suffix">
						<u-button @tap="pickerShow" :text="this.$t('transfer.to_button')" type="success" size="mini"></u-button>
					</template>
				<!-- #ifndef APP-NVUE -->
				</u-input>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				</u--input>
				<!-- #endif -->
			</u-form-item>
			<u-form-item :label="is_name" prop="amount" :borderBottom="false" ref="item1" labelWidth="100%">
				<u--input class="shop-input" v-model="formData.amount" type="number" :placeholder="this.$t('transfer.type_pun_plac')" clearable  @blur="getGasBsc"></u--input>
			</u-form-item>
			<view class="loding-gas" v-if="tran_type==2">
				<u-loading-icon text="矿工费预估中,请稍后" size="16" textSize="14" v-show="lodingShow"></u-loading-icon>
			</view>
			<u-form-item :label="this.$t('transfer.gas')" prop="" :borderBottom="false" ref="item1" labelWidth="100%">
				<u--input class="shop-input" v-model="formData.gas" disabled clearable ></u--input>
			</u-form-item>
			
			<u-form-item :label="this.$t('transfer.wallet_pass')" prop="wallet_pass" :borderBottom="false" ref="item1" labelWidth="100%">
				<u--input class="shop-input" v-model="password" :placeholder="this.$t('transfer.wallet_pass_plac')" type="password" clearable></u--input>
			</u-form-item>
		</u--form>
		
		<br>
		<u-button type="primary" @click="submit" throttleTime="3000" :text="this.$t('public.submit')"></u-button>
		
		<u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
			<view class="shop-popup">
				<view class="title flex-center font-lg">
					<text>{{this.$t('transfer.pop_title')}}</text>
					<u-icon name="close-circle" color="#c8c9cc" size="22" class="shop-close" @click="close"></u-icon>
				</view>
				<scroll-view scroll-y style="height: 700rpx;width: 100%;">
					<view class="list p-2">
						<view class="item flex-between py-2" v-for="(item,index) in list" :key="index" @click="popState(item,index)">
							<view class="left">
								<view class="name">{{item.book_name}}</view>
								<text>{{item.wallet_adress | ellipsis}}</text>
							</view>
							<view class="state">
								<u-icon name="checkmark-circle-fill" :color=" index == showIndex  ? '#2979ff':'#c0c4cc'" size="22"></u-icon>
							</view>
						</view>
					</view>
				</scroll-view>
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
				from_wallet_adress:"",
				to_wallet_adress:"",
				amount:"",
				gas:"",
				wallet_pass:"",
				is_type:"",//1pun2key转账
			},
			showSex: false,
			form:{
				androidVersion:this.$androidVersion,
				lang:this.$i18n.locale,
				timestamp:'',
				node_number:'',
				bsc_wallet_pass:'',
				pun_wallet_adress:''
			},
			formBsc:{
				androidVersion:this.$androidVersion,
				lang:this.$i18n.locale,
				amount:"",
				is_type:'',
				to_wallet_adress:'',
				timestamp:'',
			},
			formList:{
				androidVersion:this.$androidVersion,
				lang:this.$i18n.locale,
				nonce_str:"dsadswe1ee",
				timestamp:'',
			},
			formSign:{
				sign:''
			},
			bscSign:{
				sign:''
			},
			signList:{
				sign:''
			},
			signRatio:{
				sign:''
			},
			signGas:{
				sign:''
			},
			result:{
				node: "",
				pun: "",
				pun_node_consensus: "",
				pun_node_destroy: "",
				pun_wallet_gas: ""
			},
			usdt:'',
			destroy:'',
			show:false,
			lodingShow:false,
			showIndex:null,
			tran_type:'',
			is_name:'',
			list:[],
			rules: {
				to_wallet_adress:{
					type: 'string',
					required: true,
					message: this.$t('transfer.to_adress_rules'),
					trigger: ['blur', 'change']
				},
				amount:{
					type: 'string',
					required: true,
					message: this.$t('transfer.amount_rules'),
					trigger: ['blur', 'change']
				},
				wallet_pass:{
					// required: true,
					message: this.$t('transfer.wallet_pass_rules'),
					trigger: ['blur', 'change']
				},
			},
			password:'',
		};
	},
	onReady() {
		this.$refs.form1.setRules(this.rules)
	},
	onLoad(options) {
		console.log(options)
		this.formData.is_type=options.is_type;
		this.formBsc.is_type=options.is_type;
		this.formData.from_wallet_adress=options.wallet_adress;
		this.tran_type=options.tran_type;
		this.is_name=options.is_name;
		this.adressBook();
		this.getGas();
	},
	onShow() {
		
	},
	methods: {
		pickerShow(){
			this.show=true;
		},
		open() {
			this.show = true;
		},
		close() {
			this.show = false;
		},
		popState(item,index){
			this.showIndex=index;
			this.formData.to_wallet_adress=item.wallet_adress;
			this.show = false;
		},
		//获取矿工费
		getGas(){
			if(this.tran_type==1){
				this.formList.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.formList,{}));
				this.signGas.sign=this.$rsaEncryptlong(data);
				this.$api.transferPunGas(this.signGas).then(res=>{
					this.formData.gas=res.transfer_gas;
				})
			}
		},
		getGasBsc(){
			this.lodingShow=true;
			if(this.tran_type==2){
				this.formBsc.amount=this.formData.amount;
				this.formBsc.to_wallet_adress=this.formData.to_wallet_adress
				this.formBsc.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.formBsc,{}));
				console.log(data)
				this.signGas.sign=this.$rsaEncryptlong(data);
				this.$api.presaleEstimate(this.signGas).then(res=>{
					console.log(res)
					this.lodingShow=false;
					this.formData.gas=res.low_gas;
				})
			}
		},

		//获取钱包地址本
		adressBook(){
			if(this.tran_type==1){
				this.formList.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.formList,{}));
				this.signList.sign=this.$rsaEncryptlong(data);
				this.$api.adressBook(this.signList).then(res=>{
					console.log(res);
					this.list=res.list.filter((item,index)=>{
						return item.is_type==1;
					});
				});
			}else if(this.tran_type==2){
				this.formList.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.formList,{}));
				this.signList.sign=this.$rsaEncryptlong(data);
				this.$api.adressBook(this.signList).then(res=>{
					console.log(res);
					this.list=res.list.filter((item,index)=>{
						return item.is_type==2;
					});
				});
			}
			
		},
		//转账
		submit(){
			uni.$u.toast('转账已发起，请等待…')
			this.$refs.form1.validate().then(res => {
				if(this.tran_type==1){
					this.formData.timestamp=parseInt(new Date()/1000).toString()
					this.formData.wallet_pass=this.$md5.hex_md5(this.password);
					let data=JSON.stringify(Object.assign(this.formData,{}));
					console.log(data)
					this.formSign.sign=this.$rsaEncryptlong(data);
					this.$api.transferPun(this.formSign).then(res=>{
						console.log(res)
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						},1000)
						
					})
				}else if(this.tran_type==2){
					this.formData.timestamp=parseInt(new Date()/1000).toString()
					this.formData.wallet_pass=this.$md5.hex_md5(this.password);
					let data=JSON.stringify(Object.assign(this.formData,{}));
					console.log(data)
					this.formSign.sign=this.$rsaEncryptlong(data);
					this.$api.bscWalletTransfer(this.formSign).then(res=>{
						console.log(res)
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						},1000)
					})
				}
				
			}).catch(errors => {
				uni.$u.toast('校验失败')
			})
		}
	},
};
</script>

<style lang="scss">
.shop{
	.shop-input{
		background-color: #FFFFFF;color: #0062CC;
	}
	.shop-popup{
		height: 800rpx;
		.title{
			height: 100rpx;
			position: relative;
			.shop-close{
				position: absolute;
				right: 20rpx;
			}
		}
		.list{
			.item{
				.name{
					font-size: 34rpx;
					color:#303133;
				}
				text{
					font-size: 30rpx;
					color:#606266 ;
				}
			}
		}
	}
}
</style>
