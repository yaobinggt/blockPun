export default {
	//--------------------------------------
	//title
	title:{
		
	},
	//----- 以页面为区分 --------------------------------------
	//公共
	public:{
		submit:'Submit',
		back:'Back',
		cancel:'cancel',
		passPlace:'Please enter wallet password',
		copy:'Copy succeeded!',
		no_data:'No data！',
		del_btn:'Delete',
		receive:'Received successfully!',
		rec_btn:'Receive ',
		balance:'Available balance',
		all:'Total'
	},
	//tabber
	nav:{
		wallet: 'Wallet',
		node: 'Node',
		user: 'User'
	},
	//资产
	home:{
		title:'Asset',
		title1:'Current wallet',
		title2:'Other wallets',
	},
	//我的钱包
	wallet:{
		title:'My Wallet',
		balance:'Total balance (USDT)',
		default:'Default wallet',
		listTitle:'Asset',
		other:'Other wallets',
		create:'Create a wallet',
		update:'Downloading',
		upNew:'New version discovered',
		upsubmit:'Confirm update',
		uptips:'The update is successful, make sure to restart',
		uptips2:'Restarting',
		upReboot:'reboot'
	},
	//钱包设置
	set:{
		title:'Set Wallet',
		backName:'Backup identity',
		noBackup:'No backup',
		address:'Wallet address',
		name:'Wallet name',
		hint:'Password hint',
		setPass:'Change password',
		import:'Export private key',
		setDefault:'Set as default wallet',
		delButton:'Delete wallet',
		popTiName:'Change wallet name',
		popHint:'Change password hint',
		old_pass:"Please enter the old password",
		new_pass:"Please enter the new password",
		agin_pass:"Please re-enter the new password"
	},
	//交易记录
	punDeal:{
		title:'Transaction history',
		transfer:'Transfer',
		received:'Received',
		more:"Pull up to load more",
		loding:'loading…',
		nomore:'no more'
	},
	//转账
	transfer:{
		from_adress:'Payment wallet address',
		to_adress:'Payee',
		to_adress_plac:'Please enter the payee is wallet address',
		to_button:'Choose',
		type_name_pun:'PUN Transfer',
		type_name_key:'KEY Transfer',
		type_pun_plac:'Please enter the transfer quantity',
		gas:"Estimated miner's fee",
		wallet_pass:'Transaction password',
		wallet_pass_plac:'Please enter the transaction password',
		pop_title:'Select address',
		to_adress_rules:'Receiver Address',
		amount_rules:'Transfer quantity',
		wallet_pass_rules:'wallet password'
	},
	//导出私钥
	importKey:{
		title:'Export private key',
		popTitle:'Please enter the password',
		password:'Please enter wallet password',
		tips:'Security warning: the private key is not encrypted, and there is a risk in exporting. It is recommended to use mnemonics for backup',
		btn:'Copy'
	},
	//备份钱包
	backup:{
		title:'Back up your wallet',
		tips:'Last step: back up your wallet immediately.',
		desc_tips:'Back up your wallet: export [mnemonic] and copy it to a safe place, never save it to the internet, then try to transfer in, transfer out small assets before starting using it.',
		next_btn:'Next',
		record_title:'Back up your mnemonic',
		record_tips:'Please copy the mnemonic in sequence to ensure the backing up is correct',
		record_desc:'The mnemonic is used to recover your wallet or reset your wallet password, copy it exactly onto paper and keep it in a safe and private place.',
		pop_title:'Do not take screenshots',
		pop_desc:'If someone has access to your mnemonic, they will have direct access to your assets, please copy the mnemonic and store it in a safe place',
		pop_btn:'I see',
		word_tips:'Confirm your wallet mnemonic',
		word_desc:'Please click on the mnemonic in the right order to make sure it is backed up correctly',
	},
	//创建钱包
	create:{
		title:'Create a wallet',
		name1:'Pun wallet',
		name2:'BSC wallet',
		pop_title1:'Create a wallet',
		pop_desc1:'Don’t have a wallet yet, click create',
		pop_title2:'Import wallet',
		pop_desc2:'Mnemonic/private key',
		tips1:'The password is used to protect the private key and transaction authorization. The strength of confidentiality is very important. ',
		tips2:'Pun does not store the password or  retrieve it for you. Please do keep it in mind.',
		name:'Wallet name',
		pass:'Wallet password',
		repass:'Retype Password',
		tips:'Password prompt (optional)',
		name_place:'Please enter the wallet name',
		pass_place:'Please enter wallet password',
		repass_place:'Please re-enter the password',
		tips_place:'Please enter the password hint',
		check:'I have read carefully and agree to the terms of',
		service:'Service and Privacy',
		pass_msg1:'Must contain both letters and numbers, and the length is between 6-12',
		pass_msg2:'The passwords entered twice are not equal',
		toast1:'Wallet created successfully!',
		toast2:'Please tick the agreement'
	},
	//导入助记词
	import:{
		title:'Import wallet',
		words:'Mnemonic',
		key:'Private key',
		word_place:'Mnemonics, separated by spaces.',
		key_place:'Please fill in the plaintext private key.',
		content:'Please fill in the content.'
	},
	//地址本
	address:{
		title:'Address book',
		add_title:'New contact',
		del_btn:'Delete',
		tips_title:'Tips',
		tips_content:'Confirm deletion of this contact?',
		del_succe:'Successfully deleted!',
		adress:'Wallet address',
		place_adres:'Enter a valid address for BSC and PUN wallets',
		book_name:'Contact name',
		place_name:'Enter contact name',
		book_des:'description (optional)',
		place_des:'Please enter a description',
		is_type:'Select wallet type',
		rulse_adress:'Please fill in the wallet address',
		rulse_name:'Please fill in the wallet name',
		rulse_type:'Please select a wallet address type',
	},
	//创世节点预售
	shop:{
		title:'Genesis node',
		number:'Number of nodes created',
		number_place:'Please enter number of nodes created',
		usdt:'Need to pay USDT',
		usdt_place:'Amount of USDT to be paid',
		destroy:'Number of puns to destroy',
		destroy_place:'0',
		adress:'Create node address',
		adress_place:'Please enter or choose wallet address',
		pass:'Enter password',
		pass_place:'Please enter password',
		rules:'Please enter an integer greater than 0'
	},
	//共识计划
	plan:{
		title:'Consensus plan',
		wallet_node:'Wallet nodes',
		team_node:'Wetwork nodes',
		node_name:'Node level',
		award:'Time of rewards',
		award_number:'Quantity of rewards',
		team_wallet:'Network addresses',
	},
	//关于我们
	about:{
		title:'About',
		content:'Parallel Universe Network is a high-performance application public blockchain built on Web3.0. It is built to cover the aggregated ecological service network of Web3.0, Defi2.0 and Metaverse.',
		edition:'Current version',
		update:'Detecting new version',
		sla:'Service agreement'
	},
	//交易详情
	infor:{
		title:'Transaction details',
		from_adress:'Transferring party',
		to_adress:'Receiving Party',
		hash:'Hash value',
		block:'Block number',
		time:'Transaction Time'
	},
	//DAPP
	dapp:{
		title:'Wait for PancakeSwap transaction to open '
	},
	//跨链桥
	bridge:{
		title:'Cross-chain bridge',
		name1:'Pun (main chain)',
		name2:'Pun (BSC chain)',
		number:'Number of mappings',
		number_place:'please enter the mappings number ',
		addres:'Mapping address',
		fee:'Handling fee',
		note:'Note: Fixed 1% handling fee, minimum cross-blockchain quantity'
	},
	//节点挖矿
	mining:{
		title:'Node mining',
		title2:'Create nodes',
		title3:'Create a record',
		unclaimed:'Amount to be picked up',
		received:'Quantity received',
		countNodeout:'Network output',
		countNode:'Network nodes',
		destroy:'Destroyed quantity',
		destroyInfo:'Destroy address',
		button:'Create nodes',
		createNum:'Create quantity',
		createState1:'Created successfully',
		createPay:'Payment time',
	},
	//节点
	node:{
		title:'Validating node',
		nodeBtn1:'Current address',
		nodeBtn2:'My entrustment',
		entrustAllNum:'Total',
		entrustTitle:'Node delegation',
		entrustRatio:'Delegated reward ratio',
		entrustPK:'Participate in entrustment',
		entrustAddress:'Participating delegate address',
		entrustNum:'Entrustment amount',
		nodeSearch:'Please enter key words',
		search:'search results',
		nodeTips:'Please create a PUN wallet!',
		nodePledge:'Please enter the quantity you want to order',
		numLow:'quantity not less than',
		numMax:'Cannot be greater than available balance',
		entSuccess:'Commissioned successfully！'
	},
	//当前地址
	current:{
		title:'Current address',
		currentWallet:'Current default pocket',
		nodeNum:'Number of pocket nodes',
		networkNum:'Number of internet nodes',
		pledgeNum:'PUN pledge amount',
		pledgeRecord:'Pledge record',
		namePledge:'PPOS pledge',
		nameEntrust:'PPOS entrustment',
		nameProduce:'PPOS coin',
		receivingRecord:'Receiving record',
		receivedPledge:'Received earnings',
		unPledge:'Earnings to be received',
		receivedEntrust:'Received entrustment earnings',
		undEntrust:'Entrustment earnings to be received',
		receivedProduce:'Received coins',
		undProduce:'Coins to be received',
		btnPledge:'Pledge',
		titlePledge:'Pledge collection record',
		titleEntrust:'Delegated collection record',
		titleProduce:'Coin Receipt Record',
	},
	//我的委托
	myEntrust:{
		title:'My entrustment',
		allEntrust:'Total',
		entrustRecord:'Delegate record',
		received:'Received award',
		unreceived:'Award to be received',
		btnEntrust:'View ppos nodes, participate in entrustment',
		timeEntrust:'Commission time',
		numEntrust:'Number of orders',
		stateEntrust:'Delegate status',
		state1:'Entrusting',
		state2:'Redeemed',
		ransom:'Ransom'
	},
	//质押
	pledge:{
		title:'Pledge record',
		btnPledge:'Decompress',
		timePledge:'Pledge time',
		numPledge:'Pledge quantity',
		statePledge:'Pledge status',
		state1:'under pledge',
		state2:'unpacked',
		tips1:'Please enter a quantity not less than 10PUN',
		tips2:'No less than 10',
		tips3:'Cannot be greater than available balance',
		receiveTime:'Pick up time',
		receiveNum:'Pick up quantity',
		receiveFree:'Handling Fee',
		pledgeTips:'Pledge successful'
	}
}