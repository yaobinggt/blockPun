export default {
	//--------------------------------------
	//title
	title:{
		
	},
	//----- 以页面为区分 --------------------------------------
	//公共
	public:{
		submit:'确定',
		back:'返回',
		cancel:'取消',
		passPlace:'请输入钱包密码',
		copy:'复制成功!',
		no_data:'暂无数据',
		del_btn:'删除',
		receive:'领取成功',
		rec_btn:'领取',
		balance:'可用余额',
		all:'全部'
	},
	//tabber
	nav:{
		wallet: '资产',
		node: '节点',
		user: '我的'
	},
	//资产
	home:{
		title:'资产',
		title1:'当前钱包',
		title2:'其他钱包',
	},
	//我的钱包
	wallet:{
		title:'我的钱包',
		balance:'总余额(USDT)',
		default:'默认钱包',
		listTitle:'资产',
		other:'其他钱包',
		create:'创建钱包',
		update:'更新包下载中',
		upNew:'发现新版本',
		upsubmit:'确认下载更新',
		uptips:'更新成功，确定现在重启吗？',
		uptips2:'更新成功，重启中',
		upReboot:'重启'
	},
	//钱包设置
	set:{
		title:'钱包设置',
		backName:'备份身份钱包',
		noBackup:'未备份助记词',
		address:'钱包地址',
		name:'钱包名称',
		hint:'密码提示',
		setPass:'修改密码',
		import:'导出私钥',
		setDefault:'设为默认钱包',
		delButton:'删除钱包',
		popTiName:'修改钱包名称',
		popHint:'修改密码提示',
		old_pass:"请输入旧密码",
		new_pass:"请输入新密码",
		agin_pass:"请再次输入新密码"
	},
	//交易记录
	punDeal:{
		title:'交易记录',
		transfer:'转账',
		received:'收款',
		more:"上拉加载更多",
		loding:'加载中…',
		nomore:'没有更多了'
	},
	//转账
	transfer:{
		from_adress:'付款钱包地址',
		to_adress:'收款人地址',
		to_adress_plac:'请输入地址或者选择地址',
		to_button:'选择',
		type_name_pun:'PUN转账',
		type_name_key:'KEY转账',
		type_pun_plac:'请输入转账数量',
		gas:'预估矿工费',
		wallet_pass:'付款钱包密码',
		wallet_pass_plac:'请输入付款钱包密码',
		pop_title:'选择地址',
		to_adress_rules:'收款人地址',
		amount_rules:'请填写转账数量',
		wallet_pass_rules:'请填写钱包密码'
	},
	//导出私钥
	importKey:{
		title:'导出私钥',
		popTitle:'请输入密码验证',
		password:'请输入钱包密码',
		tips:'安全警告：私钥未经加密，导出存在风险，建议使用助记词进行备份',
		btn:'复制私钥'
	},
	//备份钱包
	backup:{
		title:'备份钱包',
		tips:'最后一步：立即备份你的钱包！',
		desc_tips:'备份钱包：导出[助记词]并抄写到安全的地方，千万不要保存到网络上，然后尝试转入，转出小额资产开始使用',
		next_btn:'下一步',
		record_title:'备份助记词',
		record_tips:'请按顺序抄写助记词,确保备份正确',
		record_desc:'助记词用于恢复钱包或者重置钱包密码，将它准确的抄写到纸上，并存在只有你知道的安全的地方。',
		pop_title:'请勿截图',
		pop_desc:'如果有人获取你的助记词将直接获取你的资产，请抄下助记词并存放在安全的地方。',
		pop_btn:'我知道了',
		word_tips:'确认你的钱包助记词',
		word_desc:'请按顺序点击助记词，已确认你的备份助记词正确',
	},
	//创建钱包
	create:{
		title:'选择钱包类型',
		name1:'PUN钱包',
		name2:'BSC钱包',
		pop_title1:'创建钱包',
		pop_desc1:'还未拥有钱包，点击创建',
		pop_title2:'导入钱包',
		pop_desc2:'助词器/私钥',
		tips1:'密码用于保护私钥和交易授权，强度非常重要',
		tips2:'PUN不存储密码，也无法帮您找回，请务必牢记',
		name:'钱包名称',
		pass:'钱包密码',
		repass:'重复密码',
		tips:'密码提示(选填)',
		name_place:'请输入钱包名称',
		pass_place:'请输入钱包密码',
		repass_place:'请重复输入钱包密码',
		tips_place:'请输入密码提示',
		check:'我已仔细阅读并同意',
		service:'服务及隐私条款',
		pass_msg1:'需同时含有字母和数字，长度在6-12之间',
		pass_msg2:'两次输入的密码不相等',
		toast1:'钱包创建成功！',
		toast2:'请勾选协议'
	},
	//导入助记词
	import:{
		title:'导入钱包',
		words:'助记词',
		key:'私钥',
		word_place:'助记词，按空格分割',
		key_place:'请填写明文私钥',
		content:'请填写内容'
	},
	//地址本
	address:{
		title:'地址本',
		add_title:'新建联系人',
		del_btn:'删除',
		tips_title:'温馨提示',
		tips_content:'确定要删除吗？',
		del_succe:'删除成功!',
		adress:'钱包地址',
		place_adres:'仅限输入BSC和PUN钱包的有效地址',
		book_name:'联系人名称',
		place_name:'请输入联系人名称',
		book_des:'描述(选填)',
		place_des:'请输入描述内容',
		is_type:'选择钱包类型',
		rulse_adress:'请填写钱包地址',
		rulse_name:'请填写钱包名称',
		rulse_type:'请选择钱包地址类型',
	},
	//创世节点预售
	shop:{
		title:'创世节点创建',
		number:'认购节点数量',
		number_place:'请输入认购节点数量',
		usdt:'支付USDT',
		usdt_place:'需支付USDT数量',
		destroy:'消耗pun数量',
		destroy_place:'0',
		adress:'创建节点地址',
		adress_place:'请输入地址或者选择地址',
		pass:'付款钱包密码',
		pass_place:'请输入付款钱包密码',
		rules:'请输入大于0的整数'
	},
	//共识计划
	plan:{
		title:'共识计划',
		wallet_node:'钱包节点数',
		team_node:'网络节点数',
		node_name:'节点级别',
		award:'奖励次数',
		award_number:'奖励数量',
		team_wallet:'网络地址数',
	},
	//关于我们
	about:{
		title:'关于我们',
		content:'平行宇宙网络是基于Web3.0而打造的高性能应用公链。构建了涵盖了Web3.0、Defi2.0、元宇宙的聚合生态服务网络。',
		edition:'当前版本',
		update:'检测新版本',
		sla:'服务协议'
	},
	//交易详情
	infor:{
		title:'交易详情',
		from_adress:'发款方',
		to_adress:'收款方',
		hash:'哈希值',
		block:'区块号',
		time:'交易时间'
	},
	//DAPP
	dapp:{
		title:'等待PancakeSwap交易开通 '
	},
	//跨链桥
	bridge:{
		title:'跨链桥',
		name1:'PUN（主链）',
		name2:'PUN（BSC链）',
		number:'映射数量',
		number_place:'请输入映射数量',
		addres:'映射地址',
		fee:'手续费',
		note:'备注：手续费固定百分之一，最低跨链数'
	},
	//节点挖矿
	mining:{
		title:'节点挖矿',
		title2:'节点创建',
		title3:'创建记录',
		unclaimed:'待领取数量',
		received:'已领取数量',
		countNodeout:'全网产出量',
		countNode:'全网节点数量',
		destroy:'销毁数量',
		destroyInfo:'销毁地址',
		button:'创建节点',
		createNum:'创建数量',
		createState1:'创建成功',
		createPay:'付款时间',
	},
	//节点
	node:{
		title:'验证节点',
		nodeBtn1:'当前地址',
		nodeBtn2:'我的委托',
		entrustAllNum:'委托总量',
		entrustTitle:'节点委托',
		entrustRatio:'委托奖励比例',
		entrustPK:'参与委托',
		entrustAddress:'参与委托地址',
		entrustNum:'委托数量',
		nodeSearch:'请输入关键字',
		search:'搜索结果',
		nodeTips:'请创建PUN钱包！',
		nodePledge:'请创建PUN钱包！',
		numLow:'数量不低于',
		numMax:'不可大于可用余额',
		entSuccess:'委托成功！'
	},
	//当前地址
	current:{
		title:'当前地址',
		currentWallet:'当前默认钱包',
		nodeNum:'钱包节点数',
		networkNum:'网络节点数',
		pledgeNum:'PUN质押量',
		pledgeRecord:'质押记录',
		namePledge:'PPOS质押',
		nameEntrust:'PPOS委托',
		nameProduce:'PPOS产币',
		receivingRecord:'领取记录',
		receivedPledge:'已领取收益',
		unPledge:'未领取收益',
		receivedEntrust:'已领取委托收益',
		undEntrust:'未领取委托收益',
		receivedProduce:'已领取产币',
		undProduce:'未领取产币',
		btnPledge:'我要质押',
		titlePledge:'质押领取记录',
		titleEntrust:'委托领取记录',
		titleProduce:'产币领取记录',
	},
	//我的委托
	myEntrust:{
		title:'我的委托',
		allEntrust:'委托总量',
		entrustRecord:'委托记录',
		received:'已领取奖励',
		unreceived:'未领取奖励',
		btnEntrust:'查看PPos节点，参与委托',
		timeEntrust:'委托时间',
		numEntrust:'委托数量',
		stateEntrust:'委托状态',
		state1:'委托中',
		state2:'已赎回',
		ransom:'赎回'
	},
	//质押
	pledge:{
		title:'质押记录',
		btnPledge:'解压',
		timePledge:'质押时间',
		numPledge:'质押数量',
		statePledge:'质押状态',
		state1:'质押中',
		state2:'已解压',
		tips1:'请输入数量不少于10PUN',
		tips2:'数量不低于10',
		tips3:'不可大于可用余额',
		receiveTime:'领取时间',
		receiveNum:'领取数量',
		receiveFree:'手续费',
		pledgeTips:'质押成功'
	}
}