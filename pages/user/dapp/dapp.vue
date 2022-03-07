<template>
	<view>
		
		<view class="" v-if="!status">
			<view class="no-data">
				<view class="home-creat m-5 p-5 flex flex-column flex-center">
					<u-icon size="120"name="/static/wallet/datano-1.png" class="mt-5"></u-icon>
					<view class="font-md mt-5">
						{{this.$t('dapp.title')}}
						<!-- {{this.$t('public.no_data')}}，<text @click="goChoose()">{{this.$t('create.pop_title1')}}</text> -->
					</view>
				</view>
			</view>
		</view>
		<view  v-if="status">
			<web-view  :src="url"></web-view>
			<!-- <web-view  src="https://www.baidu.com/"></web-view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:true,
				url:'',
				formData:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:null,
				},
				formSign:{
					sign:''
				},
				
			};
		},
		onLoad() {
			this.getPancake()
		},
		methods:{
			//获取链接
			getPancake(){
				this.formData.timestamp=parseInt(new Date()/1000).toString();
				let data=JSON.stringify(Object.assign(this.formData,{}));
				this.formSign.sign=this.$rsaEncryptlong(data);
				this.$api.pancake(this.formSign).then(res=>{
					console.log(res)
					this.url=res.res.url;
					this.status=res.res.status;
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
