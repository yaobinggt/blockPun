<template>
	<view class="p-2">
		<view class="wallet-list">
			<view class="item flex align-center flex-between px-2 py-4 rounded-lg pun" @click="punShow=true">
				<view class="left flex align-center">
					<u-icon name="/static/img/drawable-xxhdpi/icon-fun.png"  size="48" ></u-icon>
					<text class="ml-2 font-md">{{this.$t('create.name1')}}</text>
				</view>
				<view class="icon">
					<u-icon name="plus-circle" color="#ffffff"  size="20" ></u-icon>
				</view>
			</view>
			<view class="item flex align-center flex-between px-2 py-4 rounded-lg fsc" @click="bscShow=true">
				<view class="left flex align-center">
					<u-icon name="/static/img/drawable-xxhdpi/icon-fsc.png"  size="48" ></u-icon>
					<text class="ml-2 font-md">{{this.$t('create.name2')}}</text>
				</view>
				<view class="icon">
					<u-icon name="plus-circle" color="#ffffff"  size="20" ></u-icon>
				</view>
			</view>
		</view>
		
		<u-popup :show="punShow" @close="close" @open="open" :round="10">
			<view class="add-box">
				<view class="title flex-center">
					<text>FUN</text>
					<u-icon name="close-circle" color="#c8c9cc" size="22" class="add-close" @click="close"></u-icon>
				</view>
				<view class="list p-2">
					<view class="item flex-between" @click="goCreate(1)">
						<view class="left flex">
							<u-icon name="plus-circle" color="#2979ff" size="26"></u-icon>
							<view class="content ml-2">
								<view class="name">{{this.$t('create.pop_title1')}}</view>
								<text>{{this.$t('create.pop_desc1')}}</text>
							</view>
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="#c8c9cc" size="22" ></u-icon>
						</view>
					</view>
					<view class="item flex-between" @click="goImport(1)">
						<view class="left flex">
							<u-icon name="bookmark" color="#2979ff" size="26"></u-icon>
							<view class="content ml-2">
								<view class="name">{{this.$t('create.pop_title2')}}</view>
								<text>{{this.$t('create.pop_desc2')}}</text>
							</view>
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="#c8c9cc" size="22" ></u-icon>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="bscShow" @close="close" @open="open" :round="10">
			<view class="add-box">
				<view class="title flex-center">
					<text>BSC</text>
					<u-icon name="close-circle" color="#c8c9cc" size="22" class="add-close" @click="close"></u-icon>
				</view>
				<view class="list p-2">
					<view class="item flex-between" @click="goCreate(2)">
						<view class="left flex">
							<u-icon name="plus-circle" color="#2979ff" size="26"></u-icon>
							<view class="content ml-2">
								<view class="name">{{this.$t('create.pop_title1')}}</view>
								<text>{{this.$t('create.pop_desc1')}}</text>
							</view>
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="#c8c9cc" size="22" ></u-icon>
						</view>
					</view>
					<view class="item flex-between" @click="goImport(2)">
						<view class="left flex">
							<u-icon name="bookmark" color="#2979ff" size="26"></u-icon>
							<view class="content ml-2">
								<view class="name">{{this.$t('create.pop_title2')}}</view>
								<text>{{this.$t('create.pop_desc2')}}</text>
							</view>
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="#c8c9cc" size="22" ></u-icon>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				punShow:false,
				bscShow:false,
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('create.title')
			});
		},
		methods: {
			open() {
			  // console.log('open');
			},
			close() {
			  this.punShow = false;
			  this.bscShow = false
			  // console.log('close');
			},
			goCreate(type){
				uni.navigateTo({
					url:"/pages/wallet/create/create?type="+type
				})
			},
			goImport(type){
				uni.navigateTo({
					url:"/pages/wallet/import/import?type="+type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.wallet-list{
	.item{
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		color: #FFFFFF;
	}
	.pun{
		background-color: #2979ff;
	}
	.fsc{
		background-color: #ffac00;
	}
}

.add-box{
	height: 700rpx;
	.title{
		height: 100rpx;
		position: relative;
		.add-close{
			position: absolute;
			right: 20rpx;
		}
	}
	.list{
		.item{
			border: solid 1rpx #e7e6e4;
			border-radius: 20rpx;
			margin-bottom: 40rpx;
			padding: 20rpx;
		}
		.name{
			font-size: 34rpx;
		}
		text{
			font-size: 28rpx;
			color: #909399;
		}
	}
}
</style>
