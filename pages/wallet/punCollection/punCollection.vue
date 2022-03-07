<template>
	<view class="p-3">
		<view class="warp p-2 rounded-lg">
			<view class="title flex flex-center mb-3">
				扫一扫，向我支付！
			</view>
			<view class="code flex flex-center">
				<ayQrcode ref="qrcode" qrcode_id="qrcode" :modal="modal_qr" :url="address" @hideQrcode="hideQrcode" :height="200" :width="200" />
			</view>
			<view class="address p-2 mb-5 mt-5 rounded-lg">
				<view class="flex flex-center">收款地址</view>
				<text class="mt-2">{{address}}</text>
			</view>
			<view class="button-group flex mb-3">
				<!-- <u-button class="mr-2" :plain="true" text="分享"></u-button> -->
				<u-button class="ml-2" :plain="true" text="复制" @click="copyCode(address)"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue"
	export default {
		components: {ayQrcode},
		data() {
			return {
				//二维码相关参数
				modal_qr: false,
				address: '', // 要生成的二维码值
			};
		},

		onLoad(options) {
			console.log(options)
			this.address=options.wallet_adress;
			let that = this;
			that.showQrcode();//一加载生成二维码
		},
		
		methods: {
			// 展示二维码
			showQrcode() {
				let _this = this;
				this.modal_qr = true;
				// uni.showLoading()
				setTimeout(function() {
					// uni.hideLoading()
					_this.$refs.qrcode.crtQrCode()
				}, 100)
			},
			copyCode(value) {
				uni.setClipboardData({
					data: value, 
					success: () => {
						uni.showToast({
							title: "复制成功"
						})
					}
				});
			},
			//传入组件的方法
			hideQrcode() {
				this.modal_qr = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
.warp{
	background-color: #FFFFFF;
	.address{
		background-color: #ecf5ff;
		view{
			font-size: 32rpx;
		}
		text{
			display:inline-block;
			width: 100%;
			height: auto;
			text-align: center;
			font-family: Gibson;
			font-size: 30rpx;
			word-break: break-all;
			text-overflow: ellipsis;
			word-wrap: break-word;
			white-space: pre-wrap;
			color: #82848a;
		}
	}
	
}
</style>
