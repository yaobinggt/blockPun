<template>
	<view class="record p-3">
		<view class="font-md mb-3">
			{{this.$t('backup.record_tips')}}
		</view>
		<view class="word-list flex flex-wrap flex-between">
			<view class="item px-1 py-3" v-for="(item,index) in words" :key="index">
				<view class="name">{{item.name}}</view>
				<text>{{index+1}}</text>
			</view>
		</view>
		<view class="record-tips py-3 pb-5">
			{{this.$t('backup.record_desc')}}
		</view>
		<view  class="record-btn" >
			<u-button type="primary" :text="this.$t('backup.next_btn')" @click="goWords"></u-button>
		</view>
		<u-popup :show="show" @close="close" @open="open">
			<view class="popup-warp pt-3 px-3 pb-5">
				<!-- <view class="popu-close mb-3">
					<u-icon name="close-circle" color="#909399" size="24"></u-icon>
				</view> -->
				<view class="content flex-column flex-center p-3 mb-3">
					<u-icon name="/static/wallet/picture.png" size="48"></u-icon>
					<text class="mb-3">{{this.$t('backup.pop_title')}}</text>
					<view>
						{{this.$t('backup.pop_desc')}}
					</view>
				</view>
				<u-button type="primary" :text="this.$t('backup.pop_btn')" @click="close()"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			fromData:{
				androidVersion:this.$androidVersion,
				lang:this.$i18n.locale,
				timestamp:'',
				wallet_adress:'',
				is_type:'',
				words_private:'1',
				wallet_pass:''
			},
			signForm:{
				sign:''
			},
			words:[],
			show:true
		};
	},
	onLoad(options) {
		console.log(JSON.parse(decodeURIComponent(options.obj)))
		let objData=JSON.parse(decodeURIComponent(options.obj))
		console.log(objData)
		this.fromData.wallet_adress=objData.wallet_adress;
		this.fromData.is_type=objData.is_type;
		this.fromData.words_private=objData.words_private;
		this.fromData.wallet_pass=objData.wallet_pass;
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('backup.title')
		});
	},
	created() {
		this.getWords()
	},
	methods: {
		open() {
		  // console.log('open');
		},
		close() {
		  this.show = false
		  // console.log('close');
		},
		getWords(){
			this.fromData.timestamp=parseInt(new Date()/1000).toString()
			let data=JSON.stringify(Object.assign(this.fromData,{}));
			this.signForm.sign=this.$rsaEncryptlong(data);
			console.log(data)
			this.$api.getWordsKey(this.signForm).then(res=>{
				console.log(res)
				this.words=res.mnemonic;				
			})
		},
		goWords(){
			uni.navigateTo({
				url:"/pages/wallet/backupWord/backupWord?obj="+ encodeURIComponent(JSON.stringify(this.fromData))
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.record-tips{
	color: #ff9900;
	font-size: 30rpx;
	
}
.record-btn{
	position: fixed;
	bottom: 10rpx;
	right: 0;
	left: 0;
	padding:30rpx ;
}
.word-list{
	border-top: solid 1rpx #ceccca;
	border-left: solid 1rpx #ceccca;
	.item{
		width: 33.333%;
		position: relative;
		background-color: #FFFFFF;
		box-sizing: border-box;
		border-bottom: solid 1rpx #ceccca;
		border-right: solid 1rpx #ceccca;
		font-size: 28rpx;
		text{
			position: absolute;
			top: 0;
			right: 0;
			font-size: 26rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 32rpx;
			height:32rpx;
			color: #909399;
		}
	}
}
.popup-warp{
	background-color: #f3f4f6;
	.content{
		background-color: #FFFFFF;
		text{
			
		}
		view{
			font-size: 30rpx;
			color: #606266;
		}
	}
}
</style>
