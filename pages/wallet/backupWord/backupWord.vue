<template>
	<view class="p-3">
		<view class="describe mb-3">
			<view>{{this.$t('backup.word_tips')}}</view>
			<text>{{this.$t('backup.word_desc')}}</text>
		</view>
		
		<view class="words-box flex flex-wrap pb-2">
			<u-tag v-for="(item,index) in showWords" :key="index" :text="item.name" closable @close="delWord(item,item.id,item.name)" class="words-tag px-1 py-1"> </u-tag>
		</view>
		
		<view class="words-list mt-5 flex flex-wrap">
			<view class="words-item p-1" v-for="(item,index) in words" :key="index">
				<u-button type="primary" :plain="true" :text="item.name" :disabled="item.disabled" class="word-btn" @click="wordSelect(item)"></u-button>
			</view>
			<!-- <u-button type="primary" :plain="true" v-for="(item,index) in words" :key="index" :text="item.name" :disabled="item.disabled" class="word-btn" @click="item.disabled = true"></u-button> -->
		</view>
		<view  class="words-btn" >
			<u-button type="primary" :text="this.$t('public.submit')" @click="goWallet"></u-button>
		</view>
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
				wordsDataForm:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:'',
					wallet_words:'',
					wallet_adress:'',
				},
				signForm:{
					sign:''
				},
				wordsForm:{
					sign:''
				},
				showWords:[],
				words:[],
				wordsData:[]
			};
		},
		onLoad(options) {
			let objData=JSON.parse(decodeURIComponent(options.obj));
			this.fromData.wallet_adress=objData.wallet_adress;
			this.fromData.is_type=objData.is_type;
			this.fromData.words_private=objData.words_private;
			this.fromData.wallet_pass=objData.wallet_pass;
			this.wordsDataForm.is_type=objData.is_type;
			this.wordsDataForm.wallet_adress=objData.wallet_adress;
			console.log(this.fromData);
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('backup.title')
			});
		},
		created() {
			this.getWords()
		},
		methods:{
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
			wordSelect(item){
				this.showWords.push(item);
				item.disabled=true;
				//console.log(this.showWords)
				this.wordsData.push(item.name)
				uni.$u.randomArray(this.words)
				//console.log(this.wordsData)
				console.log(this.wordsData.join(' '));
				this.wordsDataForm.wallet_words=this.wordsData.join(' ')
			},
			delWord(item,id,name){
				let newArr=this.showWords.filter((item)=>{
					return item.id!=id
				})
				let wordsArr=this.wordsData.filter((item)=>{
					return item != name;
				})
				for(var ite in this.words){
					if(this.words[ite].id==id){
						this.words[ite].disabled=false;
						break;
					}
				}
				uni.$u.randomArray(this.words)
				this.wordsData=wordsArr;
				this.showWords=newArr;
				//console.log(this.showWords);
				console.log(this.wordsData.join(' '));
			},
			goWallet(){
				this.wordsDataForm.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.wordsDataForm,{}));
				this.wordsForm.sign=this.$rsaEncryptlong(data);
				console.log(data,this.wordsForm.sign)
				this.$api.walletWords(this.wordsForm).then(res=>{
					console.log(res)
					uni.switchTab({
						url:"/pages/tabber/wallet/wallet"
					})
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
.describe{
	view{
		font-size: 32rpx;
		color: #303133;
	}
	text{
		font-size: 28rpx;
		color: #606266;
	}
}
.words-list{
	.words-item{
		margin: 0 10rpx 10rpx 0;
	}
}
.words-box{
	min-height: 200rpx;
	background-color: #ecf5ff;
	border: solid 1rpx #9acafc;
}
.words-btn{
	position: fixed;
	bottom: 10rpx;
	right: 0;
	left: 0;
	padding:30rpx ;
}
</style>
