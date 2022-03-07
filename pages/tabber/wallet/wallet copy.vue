<template>
	<view class="">
		<u-navbar leftText="" :title="this.$t('home.title') " fixed :safeAreaInsetTop="true" >
			<view class="u-nav-slot" slot="left" >
				<view class="lang" @tap="switchLang">
					<u-icon size="26" color="warning" name="/static/wallet/lang.png"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="no-data" v-show="!pageShow">
			<view class="home-creat m-5 p-5 flex flex-column flex-center">
				<u-icon size="120"name="/static/wallet/nodata.png" class="mt-5"></u-icon>
				<view class="font-md mt-5">
					{{this.$t('public.no_data')}}，<text @click="goChoose()">{{this.$t('create.pop_title1')}}!</text>
				</view>
			</view>
		</view>
		<view class="pt-5 mt-3">
			<!-- <view class="default p-5 mt-5" v-show="!pageShow">
				<u-loading-icon text="加载中" textSize="18"></u-loading-icon>
			</view> -->
			<view class="wallet mt-5" v-show="pageShow">
				<view class="wallet-box choose-wallet p-3">
					<view class="title">
						{{this.$t('home.title1')}}
					</view>
					<view class="item flex-between px-2 py-3 rounded-lg mt-2" v-for="(item,index) in list" :key="index" @click="godetail(item)" :class="item.is_type==1?'pun-bg':'bsc-bg'">
						<view class="left flex">
							<u-icon class="right-icon" :name="item.is_type==1?'/static/wallet/w-pun.png':'/static/wallet/w-bsc.png'" size="48" ></u-icon>
							<view class="content ml-1">
								<view>{{item.wallet_name}}</view>
								<text>{{item.wallet_adress | ellipsis}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="wallet-box other-wallet p-3">
					<view class="title">
						{{this.$t('home.title2')}}
					</view>
					<view class="item flex-between px-2 py-3 rounded-lg mt-2" v-for="(item,index) in otherList" :key="index" @click="godetail(item)">
						<view class="left flex">
							<u-icon :name="item.is_type==1?'/static/img/drawable-xxhdpi/icon-fun.png':'/static/img/drawable-xxhdpi/icon-fsc.png'"  size="48" ></u-icon>
							<view class="content ml-1">
								<view>{{item.wallet_name}}</view>
								<text>{{item.wallet_adress | ellipsis}}</text>
							</view>
						</view>
						<view class="state">
							<!-- <u-icon name="checkmark-circle-fill" :color="index == stateIndex ?'#2979ff':'#c8c9cc'" size="22"></u-icon> -->
						</view>
					</view>
				</view>
				<view class="add-btn flex-center" @click="goChoose">
					<u-icon name="plus" color="#FFF" size="18"></u-icon>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				formUp:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					is_appVersion:"1.0.5",
					is_DeviceTypes:"1",
					timestamp:'',
				},
				signUp:{
					sign:''
				},
				signFormOne:{
					sign:''
				},
				form:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:"",
					nonce_str:"dsadswe1ee",
				},
				signForm:{
					sign:''
				},
				list:null,
				otherList:null,
				stateIndex:0,
				istoken:null,
				pageShow:false,
				upurl:""
			};
		},
		async onLoad() {
			this.appUpdate()
			await this.$onLaunched;
			this.getWalletList();
			
		},
		onShow() {
			uni.setTabBarItem({
			  index: 0,
			  text: this.$t('nav.wallet'),
			});
			//进入页面执行一次加载
			this.getWalletList();
		},
		computed:{
			...mapState({
				isTokens:state=>state.token.$token,
			}),
			lang() {
				return this.$i18n.locale == 'zh' ? 'zh' : 'en';
			}	
		},

		filters:{
			ellipsis(value){
				let len=value.length;
				if (!value) return '';
				if(value.length > 20){
					return value.substring(0,12)+ '......' +value.substring(len-12,len)
				}
			}
		},
		methods:{
			...mapMutations(['saveToken','initUser']),
			stateClick(item,index){
				this.stateIndex=index;
			},
			goChoose(){
				uni.navigateTo({
					url:"/pages/wallet/choose/choose"
				})
			},
			godetail(item){
				uni.navigateTo({
					url:"/pages/wallet/walletInfo/walletInfo?wallet_adress="+item.wallet_adress+"&is_type="+item.is_type
				})
			},
			switchLang() {
				
				this.$i18n.locale = this.$i18n.locale == 'en' ? 'zh' : 'en';
				uni.setNavigationBarTitle({
					title: this.$t('nav.wallet')
				});
				uni.setTabBarItem({
				  index: 0,
				  text: this.$t('nav.wallet'),
				});
				uni.setTabBarItem({
				  index: 1,
				  text: this.$t('nav.node'),
				});
				uni.setTabBarItem({
				  index: 2,
				  text: this.$t('nav.user'),
				});
				console.log(this.$i18n.locale)
			},
			getWalletList(){
				this.form.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.form,{}));
				this.signForm.sign=this.$rsaEncryptlong(data);
				console.log(data)
				this.$api.getWalletList(this.signForm).then(res=>{
					console.log(res);
					if(res.list.length>0){
						this.pageShow=true
					}else{
						this.pageShow=false
					}
					this.list=res.list.filter((item,index)=>{
						return item.is_check==1;
					});
					this.otherList=res.list.filter((item,index)=>{
						return item.is_check==2;
					})
				});
			},
			appUpdate(){
				this.formUp.timestamp=parseInt(new Date()/1000).toString()
				let data=JSON.stringify(Object.assign(this.formUp,{}));
				this.signUp.sign=this.$rsaEncryptlong(data);
				console.log(data)
				console.log(this.signUp)
				this.$api.appUpdate(this.signUp).then(res=>{
					console.log(res);
					this.upurl=res.updateInfo.download_url;
					if(res.updateInfo.version!=this.formUp.is_appVersion){
						uni.showModal({
							title: "发现新版本",
							content: "确认下载更新",
							success: (res) => {
								if (res.confirm == true) {//当用户确定更新，执行更新
									this.doUpData()
								}
							}
						})
					}
				});
			},
			doUpData() {
			    uni.showLoading({
			        title: '更新包下载中，请耐心等待……'
			    })
			    uni.downloadFile({//执行下载
			        url: this.upurl, //下载地址
			        success: downloadResult => {//下载成功
			            uni.hideLoading();
			            if (downloadResult.statusCode == 200) {
			                uni.showModal({
			                    title: '',
			                    content: '更新成功，确定现在重启吗？',
			                    confirmText: '重启',
			                    confirmColor: '#EE8F57',
			                    success: function(res) {
			                        if (res.confirm == true) {
			                            plus.runtime.install(//安装
			                                downloadResult.tempFilePath, {
			                                    force: true
			                                },
			                                function(res) {
			                                    utils.showToast('更新成功，重启中');
			                                    plus.runtime.restart();
			                                }
			                            );
			                        }
			                    }
			                });
			            }
			        }
			    });
			}
		}
	}
</script>

<style lang="scss" scoped>
.lang {
	position: absolute;
}
.home-creat{
	margin-top: 200rpx;
	text{
		color: #2979ff;
	}
}
.u-nav-slot {
	@include flex;
	align-items: center;
	justify-content: space-between;
	border-width: 0.5px;
	border-radius: 100px;
	border-color: $u-border-color;
	padding: 3px 7px;
	opacity: 0.8;
}
.wallet{
	width: 100%;
	position: relative;
	margin-top: 80rpx;
	.wallet-box{
		.title{
			font-size: 32rpx;
		}
	}
	.choose-wallet{
		.item{
			position: relative;
			.right-icon{
				position: absolute;
				right: 0;
				top: 0;
			}
			.content{
				view{
					font-size: 30rpx;
					color: #FFFFFF;
				}
				text{
					font-size: 26rpx;
					color: #Fefefe;
				}
				
			}
		}
		.pun-bg{
			background-color: #2979ff;
		}
		.bsc-bg{
			background-color: #ff9900;
		}
	}
	.other-wallet{
		.item{
			background-color: #FFFFFF;
			.left{
				align-items: center;
			}
			.content{
				view{
					font-size: 30rpx;
				}
				text{
					font-size: 26rpx;
					color: #909399;
				}
				
			}
		}
	}
	
	.add-btn{
		width: 80rpx;
		height: 80rpx;
		background-color: #2979ff;
		border-radius: 50%;
		position: fixed;
		bottom: 130rpx;
		right: 20rpx;
	}
}
</style>
