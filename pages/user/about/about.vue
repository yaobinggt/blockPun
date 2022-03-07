<template>
	<view>
		<view class="warp p-3 flex flex-column align-center mt-5">
			<u-icon size="52" color="warning" name="/static/img/drawable-xxhdpi/icon-fun.png"></u-icon>
			<view class="content font-md mt-5 mb-5">
				{{this.$t('about.content')}}
			</view>
		</view>
		<u-cell :title="this.$t('about.edition')" :value="edition"></u-cell>
		<!-- <u-cell :title="this.$t('about.update')" isLink @click="update()"></u-cell> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				edition:'1.0.10'
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('about.title')
			});
		},
		methods:{
			update(){
				uni.$u.toast('已经是最新版本')
			}
		}
	}
</script>

<style lang="scss">

</style>
