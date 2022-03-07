<template>
	<view>
		<view class="top">
			<view class="top-main rounded-lg p-3">
				<view class="top-name mb-3">
					<view class="name">
						{{info.wallet_name}}
					</view>
					<view class="address">
						{{info.wallet_adress | ellipsis}}
					</view>
				</view>
				<view class="top-box flex">
					<view class="item flex-1">
						<view class="number">
							{{info.receive_entrust}}
						</view>
						<view class="title">
							{{this.$t('node.entrustAllNum')}}(PUN)
						</view>
					</view>
					<view class="item flex-1">
						<view class="scale">
							{{info.reward}}
						</view>
						<view class="title">
							{{this.$t('node.entrustRatio')}}
						</view>
					</view>
				</view>
				<u-icon name="/static/node/node-icon.png" size="32" class="top-icon"></u-icon>
			</view>
			<view class="top-bg"></view>
		</view>
		<view class="entrust-warp px-3">
			<u-divider :text="this.$t('node.entrustPK')" textColor="#303030" textSize="18"></u-divider>
			<u--form labelPosition="top" class="mb-4">
				<u-form-item :label="this.$t('node.entrustAddress')" :borderBottom="false" labelWidth="100%">
					<view class="">
						{{defaultWall | ellipsis}}
					</view>
					<!-- <u--input class="shop-input" v-model="defaultWall" placeholder="" disabled ></u--input> -->
				</u-form-item>
				<u-form-item :label="this.$t('public.balance')" :borderBottom="false" labelWidth="100%">
					<!-- #ifndef APP-NVUE -->
					<u-input v-model="info.pun" disabled  color="#ff9900"  class="balance">
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<u--input v-model="info.pun" disabled  color="#ff9900"  class="balance">
					<!-- #endif -->
						<template slot="suffix">
							<text>PUN</text>
						</template>
					<!-- #ifndef APP-NVUE -->
					</u-input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				</u-form-item>
				<u-form-item :label="this.$t('node.entrustNum')" :borderBottom="false" labelWidth="100%">
					<!-- #ifndef APP-NVUE -->
					<u-input v-model="formEntrust.amount" clearable :placeholder="this.$t('pledge.tips1')" class="input">
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<u--input v-model="formEntrust.amount" clearable :placeholder="this.$t('pledge.tips1')" color="#ff9900"  class="input">
					<!-- #endif -->
						<template slot="suffix">
							<text @click="allNumber">{{this.$t('public.all')}}</text>
						</template>
					<!-- #ifndef APP-NVUE -->
					</u-input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				</u-form-item>
				<view class="charges">
					{{this.$t('bridge.fee')}}：<text>{{info.pun_wallet_gas}}</text>PUN
				</view>
			</u--form>

			<u-button type="primary" :text="this.$t('public.submit')" :disabled="info.is_entrust!=1 || info.pun ==0" @click="open"></u-button>
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
					<u-button :text="this.$t('public.submit')" type="primary" class="ml-2" @click="getEntrust"></u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				address:'dsadsadsadsadsa',
				number:'4564',
				entrustNum:null,
				formData:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
					wallet_adress:"",
				},
				formSign:{
					sign:''
				},
				formEntrust:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
					wallet_adress:"",
					amount:"",
					wallet_pass:"",
					gas:""
				},
				signEntrust:{
					sign:''
				},
				info:{
					wallet_name: "", //节点名称
					wallet_adress: "", //钱包地址
					receive_entrust: "", //委托总量
					reward: "", //奖励比例
					is_entrust: null, //1可委托2不可委托
					pun: "", //钱包剩余数量
					pun_low_entrust: "", //最低委托数量
					pun_wallet_gas: "" //手续费
				},
				defaultWall:'',//默认PUN地址
				show:false,
				password:''
			};
		},
		onLoad(options) {
			console.log(options)
			this.formData.wallet_adress=options.wallet_adress
			this.getInfo()
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('node.entrustTitle')
			});
		},
		computed:{
			...mapState({
				defaultWallet:state=>state.wallet.defaultWallet
			})
		},
		methods:{
			open() {
				let addnum=this.formEntrust.amount+this.info.pun_wallet_gas;
				if(this.formEntrust.amount<this.info.pun_low_entrust){
					uni.showToast({
						icon:"none",
						title:this.$t('node.numLow')+ this.info.pun_low_entrust 
					})
					
				}else if(addnum>this.info.pun){
					uni.showToast({
						icon:"none",
						title:this.$t('node.numMax')
					})
				}else{
					this.show = true
				}
			},
			close() {
				this.show = false
			},
			//获取节点详情信息
			getInfo(){
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				console.log(data)
				console.log(uni.getStorageSync('default_wallet'))
				this.defaultWall=uni.getStorageSync('default_wallet').wallet_adress
				this.$api.pposInfo(this.formSign).then(res=>{
					console.log(res)
					this.info=res.result
					this.formEntrust.wallet_adress=res.result.wallet_adress
					this.formEntrust.gas=res.result.pun_wallet_gas
				})
			},
			//全部可使用数量
			allNumber(){
				//console.log(111)
				let numm=this.info.pun-this.formEntrust.gas
				this.formEntrust.amount=numm.toFixed(6);
				// this.formEntrust.amount=this.info.pun-this.formEntrust.gas
			},
			//参与委托
			getEntrust(){
				this.formEntrust.timestamp=parseInt(new Date()/1000).toString();
				this.formEntrust.wallet_pass=this.$md5.hex_md5(this.password);
				let data=JSON.stringify(Object.assign(this.formEntrust,{}));
				this.signEntrust.sign=this.$rsaEncryptlong(data);
				console.log(data)
				this.$api.pposEntrust(this.signEntrust).then(res=>{
					this.getInfo();
					this.formEntrust.amount=0;
					this.formEntrust.wallet_pass=""
					this.password=""
					uni.showToast({
						icon:"none",
						title:this.$t('node.entSuccess')
					})
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
.top{
	position: relative;
	padding: 30rpx;
	.top-main{
		min-height: 120rpx;
		background-color: #FFFFFF;
		position: relative;
		z-index: 2;
		.top-name{
			.name{
				font-size: 32rpx;
			}
			.address{
				font-size: 28rpx;
				color: $u-info;
			}
		}
		.top-box{
			.number{
				font-size:36rpx;
				color: $u-primary;
			}
			.scale{
				font-size:36rpx;
				color: $u-warning;
			}
			.title{
				font-size: 28rpx;
				color: $u-tips-color;
			}
		}
		.top-icon{
			position: absolute;
			right: 20rpx;
			top: 20rpx;
		}
	}
	.top-bg{
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		width: 100%;
		height: 150rpx;
		background-color: #007BFF;
		border-bottom-left-radius: 80rpx;
		border-bottom-right-radius: 80rpx;
		z-index: 1;
	}
}
.entrust-warp{
	.charges{
		font-size: 28rpx;
		text-align: right;
		color: $u-info;
		text{
			color: $u-warning;
			margin-right: 10rpx;
		}
	}
	.input{
		background-color: #FFFFFF;
	}
	.balance{
		color: $u-info;
		.suffix{
			
		}
	}
}
</style>
