import Vue from 'vue'
import App from './App'


// 引入全局uView
import uView from '@/uni_modules/uview-ui'

import mixin from './common/mixin'

//全局过滤器
import { ellipsis } from '@/filter/index.js'
Vue.filter('ellipsis',ellipsis)

// 使用vuex
import store from '@/store/index.js';
Vue.prototype.$store=store;

//引入全局API
import api from '@/api/api.js';
Vue.prototype.$api=api;

//全局版本控制
Vue.prototype.$androidVersion = '1.0.10';

//全局时间戳
let times=parseInt(new Date()/1000).toString();
Vue.prototype.$timestamp = times;

//全局REA非对称加密
import { rsaEncrypt, rsaDecrypt,rsaEncryptlong } from '@/util/rea.js'
Vue.prototype.$rsaEncrypt = rsaEncrypt
Vue.prototype.$rsaEncryptlong = rsaEncryptlong

//全局MD5加密md5.hex_md5
import md5 from '@/util/md5.js'
Vue.prototype.$md5 = md5


// i18n部分的配置
// 引入语言包，注意路径
import Chinese from '@/common/locales/zh.js';
import English from '@/common/locales/en.js';

// VueI18n
import VueI18n from '@/common/vue-i18n.min.js';

// VueI18n
Vue.use(VueI18n);

const i18n = new VueI18n({
	// 默认语言
	locale: 'zh',
	// 引入语言文件
	messages: {
		'zh': Chinese,
		'en': English,
	}
});

// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
Vue.prototype._i18n = i18n;



Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})

Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView)

// #ifdef MP
// 引入uView对小程序分享的mixin封装
const mpShare = require('@/uni_modules/uview-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)
// #endif

Vue.mixin(mixin)

const app = new Vue({
	i18n,
    store,
    ...App
})

// 引入请求封装
require('./util/request/index')(app)

app.$mount()
