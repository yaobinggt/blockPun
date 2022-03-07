<script>
	import {mapState,mapMutations} from 'vuex';
	import { rsaEncrypt, rsaDecrypt,rsaEncryptlong } from '@/util/rea.js'
	export default {
		data(){
			return{
				form:{
					androidVersion:this.$androidVersion,
					lang:this.$i18n.locale,
					timestamp:'',
					deviceId:'',
					brand:'',
					model:'',
					platform:'android'
				},
				signForm:{
					sign:''
				}
			}
		},
		onLaunch: function() {
			this.getSysInfo()
			this.getToken()
		},
		methods:{
			...mapMutations(['saveToken']),
			//获取设备信息
			getSysInfo(){
				try {
				    const res = uni.getSystemInfoSync();
					this.form.deviceId=res.deviceId;
					this.form.brand=res.brand;
					this.form.model=res.model;
					this.form.platform=res.platform;
					console.log(this.form)
				} catch (e) {
				    //console.log(e);
				}
			},
			//获取Token，并存储到vuex
			getToken(){
				if(uni.getStorageSync('token')==""){
					this.form.timestamp=parseInt(new Date()/1000).toString()
					let data=JSON.stringify(Object.assign(this.form,{}));
					this.signForm.sign=this.$rsaEncryptlong(data);
					this.$api.getToken(this.signForm).then(res=>{
						console.log(res)
						this.saveToken(res.Token);
						// uni.setStorageSync('token',JSON.stringify(res.Token))
						this.$isResolve()
					})
				}else{
					console.log(uni.getStorageSync('token'))
					return;
				}
			}
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/common/common.css";
	@import "@/common/free.css";
	
</style>
