<template>
	<view>
		<view class="add-box">
			<view class="add-warp p-3">
				<u--form labelPosition="top":model="formData" :rules="rules" ref="form1" class="">
					<u-form-item :label="this.$t('address.adress')" prop="wallet_adress" :borderBottom="false" ref="item1" labelWidth="100%">
						<!-- <u--input class="shop-input" v-model="formData.wallet_adress" placeholder="仅限输入BSC和PUN钱包的有效地址" clearable suffixIcon="map-fill" suffixIconStyle="color: #909399" @change=""></u--input> -->
						<!-- #ifndef APP-NVUE -->
						<u-input class="shop-input" v-model="formData.wallet_adress" :placeholder="this.$t('address.place_adres')" clearable >
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input class="shop-input" v-model="formData.wallet_adress" :placeholder="this.$t('address.place_adres')"  clearable>
						<!-- #endif -->
							<template slot="suffix">
								<u-icon name="camera" color="#2979ff" size="28" @click="scan"></u-icon>
							</template>
						<!-- #ifndef APP-NVUE -->
						</u-input>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						</u--input>
						<!-- #endif -->
					</u-form-item>
					<u-form-item :label="this.$t('address.book_name')" prop="book_name" :borderBottom="false" ref="item1" labelWidth="100%">
						<u--input class="shop-input" v-model="formData.book_name" :placeholder="this.$t('address.place_name')" clearable @change=""></u--input>
					</u-form-item>
					<u-form-item :label="this.$t('address.book_des')" prop="book_des" :borderBottom="false" ref="item1" labelWidth="100%">
						<u--input class="shop-input" v-model="formData.book_des" :placeholder="this.$t('address.place_des')" clearable @change=""></u--input>
					</u-form-item>
					<u-form-item :label="this.$t('address.is_type')" prop="is_type" :borderBottom="false" ref="item1" labelWidth="100%">
						<u-radio-group placement="column" >
						    <u-radio :customStyle="{marginBottom: '10px'}" v-for="(item, index) in radiolist1" :key="index" :label="item.name" :name="item.name"  @change="radioChange(item)" >
						    </u-radio>
						</u-radio-group>
					</u-form-item>
				</u--form>
				
				<u-button type="primary" @click="submit"  throttleTime="3000" :text="this.$t('public.submit')" class="mt-5"></u-button>
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
					wallet_adress:'',
					book_name:'',
					book_des:'',
					is_type:''
				},
				formSign:{
					sign:''
				},
				radiolist1: [
				{
					name: 'PUN',
					value:'1',
					disabled: false
				},
				{
					name: 'BSC',
					value:'2',
					disabled: false
				}],
				
				rules:{
					wallet_adress:{
						type: 'string',
						required: true,
						message: this.$t('address.rulse_adress'),
						trigger: ['change','blur'],
					},
					book_name:{
						type: 'string',
						required: true,
						message: this.$t('address.rulse_name'),
						trigger: ['change','blur'],
					},
					is_type:{
						type: 'string',
						required: true,
						message: this.$t('address.rulse_type'),
						trigger: ['blur', 'change']
					}
				},
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('address.add_title')
			});
		},
		methods: {
			radioChange(item) {
				console.log(item);
				this.formData.is_type=item.value;
			},
			submit() {
				this.$refs.form1.validate().then(res => {
					this.formData.timestamp=parseInt(new Date()/1000).toString()
					let data=JSON.stringify(Object.assign(this.formData,{}));
					this.formSign.sign=this.$rsaEncryptlong(data);
					console.log(data)
					this.$api.adressBind(this.formSign).then(res=>{
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/user/address/address"
							})
						},500)
						console.log(res)
					})
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			async scan(){
				uni.scanCode({
				    success:(res)=>{
						this.formData.wallet_adress=res.result;
					},
					fail: err => {
						console.log(err)
					}
				});
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.shop-input{
	background-color: #FFFFFF;
}
</style>
