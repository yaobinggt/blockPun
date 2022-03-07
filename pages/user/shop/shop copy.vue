<template>
	<view class="">
		<u-navbar leftText="" :autoBack="true" :safeAreaInsetTop="true" title="创世节点创建" >
			<view class="u-nav-slot" slot="right" >
				<view class="more" @click="goRecord()">
					创建记录
				</view>
			</view>
		</u-navbar>
		<view class="p-3 shop">
			<!-- <u--form labelPosition="top"  :model="" :rules="rules"  ref="form1"> -->
			<u--form labelPosition="top" :model="form" :rules="rules" ref="form1">
				<u-form-item :label="this.$t('shop.number')" prop="node_number" :borderBottom="false" ref="item1" labelWidth="100%">
					<u--input class="shop-input" v-model="form.node_number" :placeholder="this.$t('shop.number_place')" type="number" clearable @change="computeNum"></u--input>
				</u-form-item>
				<u-form-item :label="this.$t('shop.usdt')" prop="" :borderBottom="false" ref="item1" labelWidth="100%">
					<u--input class="shop-input" v-model="usdt" :placeholder="this.$t('shop.usdt_place')" clearable disabled ></u--input>
				</u-form-item>
				<u-form-item :label="this.$t('shop.destroy')" prop="" :borderBottom="false" ref="item1" labelWidth="100%">
					<u--input class="shop-input" v-model="destroy" :placeholder="this.$t('shop.destroy_place')" clearable disabled ></u--input>
				</u-form-item>
				<u-form-item :label="this.$t('shop.adress')" prop="pun_wallet_adress" :borderBottom="false" ref="item1" labelWidth="100%">
					<!-- #ifndef APP-NVUE -->
					<u-input  class="shop-input" v-model="form.pun_wallet_adress" clearable  :placeholder="this.$t('shop.adress_place')">
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<u--input  class="shop-input" v-model="form.pun_wallet_adress" clearable  :placeholder="this.$t('shop.adress_place')">
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
				<u-form-item :label="this.$t('shop.pass')" prop="bsc_wallet_pass" :borderBottom="false" ref="item1" labelWidth="100%">
					<u--input class="shop-input" v-model="form.bsc_wallet_pass" :placeholder="this.$t('shop.pass_place')" type="password" clearable></u--input>
				</u-form-item>
			</u--form>
			
			<br>
			<u-button type="primary" @click="submit" throttleTime="2000" :text="this.$t('public.submit')"></u-button>
			
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
									<view class="name">{{item.wallet_name}}</view>
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
	</view>
	
</template>

<script>
export default {
	data() {
		return {
			showSex: false,
			form:{
				androidVersion:this.$androidVersion,
				lang:this.$i18n.locale,
				timestamp:'',
				node_number:'',
				bsc_wallet_pass:'',
				pun_wallet_adress:''
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
			signList:{
				sign:''
			},
			signRatio:{
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
			showIndex:null,
			list:[],
			rules: {
				node_number:{
					required: true,
					pattern:/^[1-9]\d*$/,
					message: this.$t('shop.number_place'),
					trigger: ['change','blur'],
				},
				pun_wallet_adress:{
					required: true,
					message: this.$t('transfer.to_adress_plac'),
					trigger: ['change','blur'],
				},
				bsc_wallet_pass:{
					required: true,
					message:  this.$t('create.pass_place'),
					trigger: ['change','blur'],
				},
			},
		};
	},
	onReady() {
		this.$refs.form1.setRules(this.rules)
	},
	onLoad() {
		this.getWalletList();
		this.getRatio();
		
	},
	onShow() {
		this.clearInput();
		uni.setNavigationBarTitle({
			title: this.$t('shop.title')
		});
	},
	methods: {
		goRecord(){
			uni.navigateTo({
				url:"/pages/user/shop/record"
			})
		},
		pickerShow(){
			this.show=true;
		},
		open() {
			this.show = true;
		},
		close() {
			this.show = false;
		},
		clearInput(){
			this.form.node_number='';
			this.form.bsc_wallet_pass='';
			this.form.pun_wallet_adress='';
			this.usdt='';
			this.destroy='';
		},
		popState(item,index){
			this.showIndex=index;
			this.form.pun_wallet_adress=item.wallet_adress;
			this.show = false;
		},
		computeNum(){
			this.usdt=this.form.node_number*this.result.node;
			this.computeDestroy();
		},
		computeDestroy(){
			this.destroy=this.form.node_number*this.result.node/this.result.pun*this.result.pun_node_destroy;
			//this.destroy=this.form.node_number/this.result.pun*this.result.pun_node_destroy*100
		},
		getRatio(){
			this.formList.timestamp=parseInt(new Date()/1000).toString()
			let data=JSON.stringify(Object.assign(this.formList,{}));
			this.signRatio.sign=this.$rsaEncryptlong(data);
			this.$api.getRatio(this.signRatio).then(res=>{
				console.log(res);
				this.result.node=res.result.node
				this.result.pun=res.result.pun
				this.result.pun_node_consensus=res.result.pun_node_consensus
				this.result.pun_node_destroy=res.result.pun_node_destroy
				this.result.pun_wallet_gas=res.result.pun_wallet_gas
			});
		},
		getWalletList(){
			this.formList.timestamp=parseInt(new Date()/1000).toString()
			let data=JSON.stringify(Object.assign(this.formList,{}));
			this.signList.sign=this.$rsaEncryptlong(data);
			this.$api.getWalletList(this.signList).then(res=>{
				console.log(res);
				this.list=res.list.filter((item,index)=>{
					return item.is_type==1;
				});
				
			});
		},
		submit(){
			
			this.$refs.form1.validate().then(res => {
				this.form.timestamp=parseInt(new Date()/1000).toString()
				this.form.bsc_wallet_pass=this.$md5.hex_md5(this.form.bsc_wallet_pass);
				let data=JSON.stringify(Object.assign(this.form,{}));
				console.log(data)
				this.formSign.sign=this.$rsaEncryptlong(data);
				uni.$u.toast('创世节点创建中……')
				this.$api.presaleNode(this.formSign).then(res=>{
					console.log(res)
					uni.navigateTo({
						url:"/pages/user/shop/record"
					})
					
				})
			}).catch(errors => {
				uni.$u.toast('校验失败')
			})
				
			// this.$refs.form1.validate().then(res => {
			// 	this.$u.toast('成功');
				

			// }).catch(errors => {
			// 	uni.$u.toast('校验失败')
			// })
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
.u-nav-slot{
	.more{
		font-size: 30rpx;
		color: #0062CC;
	}
}
</style>
