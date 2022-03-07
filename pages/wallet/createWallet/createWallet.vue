<template>
	<view class="create">
		<view class="warp flex flex-column align-center">
			<u-icon name="/static/node/node-img2.png" size="260"></u-icon>
			<view class="disc my-5">
				<view class="title font-lg font-weight-bold">
					PUN智能资产管理
				</view>
			</view>
			<view class="buttons">
				<u-button class="cbutton" text="创建钱包" color="#2b85e4" @click="goChoose"></u-button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goChoose(){
				uni.navigateTo({
					url:"/pages/wallet/choose/choose"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
page{
	
	background-color: #284bcd;
	
}
.create{
	position: fixed;
	height: 100vh;
	width: 100%;
	background-color: #284bcd;
	background-image: url(../../../static/node/node-bg.png);
	background-repeat: no-repeat;
	padding-top: 160rpx;
}
.warp{
	width: 100%;
	justify-content: center;
	.disc{
		color: #E1E1E1;
		
	}
}
.cbutton{
			width: 220rpx !important;
		}
</style>
