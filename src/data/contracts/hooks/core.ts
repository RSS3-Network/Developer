import {
	createUseReadContract,
	createUseSimulateContract,
	createUseWatchContractEvent,
	createUseWriteContract,
} from "wagmi/codegen"

import {
	createReadContract,
	createSimulateContract,
	createWatchContractEvent,
	createWriteContract,
} from "wagmi/codegen"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// billing
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const billingAbi = [
	{ stateMutability: "nonpayable", type: "constructor", inputs: [] },
	{ type: "error", inputs: [], name: "ErrInvalidArrayLength" },
	{ type: "error", inputs: [], name: "ErrTransferFailed" },
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "version", internalType: "uint8", type: "uint8", indexed: false },
		],
		name: "Initialized",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "nodeAddr",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "amount",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
			{
				name: "receiver",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "isPublicGood",
				internalType: "bool",
				type: "bool",
				indexed: false,
			},
		],
		name: "RewardsDistributed",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
			{
				name: "previousAdminRole",
				internalType: "bytes32",
				type: "bytes32",
				indexed: true,
			},
			{
				name: "newAdminRole",
				internalType: "bytes32",
				type: "bytes32",
				indexed: true,
			},
		],
		name: "RoleAdminChanged",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
			{
				name: "account",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "sender",
				internalType: "address",
				type: "address",
				indexed: true,
			},
		],
		name: "RoleGranted",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
			{
				name: "account",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "sender",
				internalType: "address",
				type: "address",
				indexed: true,
			},
		],
		name: "RoleRevoked",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "user", internalType: "address", type: "address", indexed: true },
			{
				name: "amount",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "TokensCollected",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "user", internalType: "address", type: "address", indexed: true },
			{
				name: "amount",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "TokensDeposited",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "user", internalType: "address", type: "address", indexed: true },
			{
				name: "amount",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "TokensWithdrawn",
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [],
		name: "COLLECTOR_ROLE",
		outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [],
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [{ name: "user", internalType: "address", type: "address" }],
		name: "balanceOf",
		outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
	},
	{
		stateMutability: "nonpayable",
		type: "function",
		inputs: [
			{ name: "users", internalType: "address[]", type: "address[]" },
			{ name: "amounts", internalType: "uint256[]", type: "uint256[]" },
		],
		name: "collectTokens",
		outputs: [
			{ name: "totalCollected", internalType: "uint256", type: "uint256" },
		],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [],
		name: "collectedBalance",
		outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
	},
	{
		stateMutability: "payable",
		type: "function",
		inputs: [],
		name: "deposit",
		outputs: [],
	},
	{
		stateMutability: "nonpayable",
		type: "function",
		inputs: [
			{ name: "nodeAddrs", internalType: "address[]", type: "address[]" },
			{ name: "rewards", internalType: "uint256[]", type: "uint256[]" },
		],
		name: "distributeRewards",
		outputs: [],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
		name: "getRoleAdmin",
		outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "index", internalType: "uint256", type: "uint256" },
		],
		name: "getRoleMember",
		outputs: [{ name: "", internalType: "address", type: "address" }],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
		name: "getRoleMemberCount",
		outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
	},
	{
		stateMutability: "nonpayable",
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "account", internalType: "address", type: "address" },
		],
		name: "grantRole",
		outputs: [],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "account", internalType: "address", type: "address" },
		],
		name: "hasRole",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
	},
	{
		stateMutability: "nonpayable",
		type: "function",
		inputs: [
			{ name: "staking", internalType: "address", type: "address" },
			{ name: "collector", internalType: "address", type: "address" },
		],
		name: "initialize",
		outputs: [],
	},
	{
		stateMutability: "nonpayable",
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "account", internalType: "address", type: "address" },
		],
		name: "renounceRole",
		outputs: [],
	},
	{
		stateMutability: "nonpayable",
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "account", internalType: "address", type: "address" },
		],
		name: "revokeRole",
		outputs: [],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [],
		name: "stakingContract",
		outputs: [{ name: "", internalType: "address", type: "address" }],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
		name: "supportsInterface",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
	},
	{
		stateMutability: "nonpayable",
		type: "function",
		inputs: [
			{ name: "users", internalType: "address[]", type: "address[]" },
			{ name: "amounts", internalType: "uint256[]", type: "uint256[]" },
		],
		name: "withdrawTokens",
		outputs: [],
	},
] as const

/**
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const billingAddress = {
	2331: "0xeb611a581CEC185982Bd21f1a37fcD29b2d95546",
	12553: "0x0000000000000000000000000000000000000000",
} as const

/**
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const billingConfig = {
	address: billingAddress,
	abi: billingAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// rss3Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const rss3TokenAbi = [
	{
		type: "event",
		inputs: [
			{ name: "owner", type: "address", indexed: true },
			{ name: "spender", type: "address", indexed: true },
			{ name: "value", type: "uint256", indexed: false },
		],
		name: "Approval",
	},
	{
		type: "event",
		inputs: [
			{ name: "from", type: "address", indexed: true },
			{ name: "to", type: "address", indexed: true },
			{ name: "value", type: "uint256", indexed: false },
		],
		name: "Transfer",
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [
			{ name: "owner", type: "address" },
			{ name: "spender", type: "address" },
		],
		name: "allowance",
		outputs: [{ type: "uint256" }],
	},
	{
		stateMutability: "nonpayable",
		type: "function",
		inputs: [
			{ name: "spender", type: "address" },
			{ name: "amount", type: "uint256" },
		],
		name: "approve",
		outputs: [{ type: "bool" }],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [{ name: "account", type: "address" }],
		name: "balanceOf",
		outputs: [{ type: "uint256" }],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [],
		name: "decimals",
		outputs: [{ type: "uint8" }],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [],
		name: "name",
		outputs: [{ type: "string" }],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [],
		name: "symbol",
		outputs: [{ type: "string" }],
	},
	{
		stateMutability: "view",
		type: "function",
		inputs: [],
		name: "totalSupply",
		outputs: [{ type: "uint256" }],
	},
	{
		stateMutability: "nonpayable",
		type: "function",
		inputs: [
			{ name: "recipient", type: "address" },
			{ name: "amount", type: "uint256" },
		],
		name: "transfer",
		outputs: [{ type: "bool" }],
	},
	{
		stateMutability: "nonpayable",
		type: "function",
		inputs: [
			{ name: "sender", type: "address" },
			{ name: "recipient", type: "address" },
			{ name: "amount", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [{ type: "bool" }],
	},
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const rss3TokenAddress = {
	1: "0xc98D64DA73a6616c42117b582e832812e7B8D57F",
	2331: "0x4200000000000000000000000000000000000042",
	12553: "0x4200000000000000000000000000000000000042",
	11155111: "0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23",
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const rss3TokenConfig = {
	address: rss3TokenAddress,
	abi: rss3TokenAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link billingAbi}__
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadBilling = /*#__PURE__*/ createUseReadContract({
	abi: billingAbi,
	address: billingAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"COLLECTOR_ROLE"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadBillingCollectorRole = /*#__PURE__*/ createUseReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "COLLECTOR_ROLE",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadBillingDefaultAdminRole =
	/*#__PURE__*/ createUseReadContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "DEFAULT_ADMIN_ROLE",
	})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadBillingBalanceOf = /*#__PURE__*/ createUseReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "balanceOf",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"collectedBalance"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadBillingCollectedBalance =
	/*#__PURE__*/ createUseReadContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "collectedBalance",
	})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadBillingGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "getRoleAdmin",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"getRoleMember"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadBillingGetRoleMember = /*#__PURE__*/ createUseReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "getRoleMember",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"getRoleMemberCount"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadBillingGetRoleMemberCount =
	/*#__PURE__*/ createUseReadContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "getRoleMemberCount",
	})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadBillingHasRole = /*#__PURE__*/ createUseReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "hasRole",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"stakingContract"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadBillingStakingContract =
	/*#__PURE__*/ createUseReadContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "stakingContract",
	})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useReadBillingSupportsInterface =
	/*#__PURE__*/ createUseReadContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "supportsInterface",
	})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link billingAbi}__
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteBilling = /*#__PURE__*/ createUseWriteContract({
	abi: billingAbi,
	address: billingAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"collectTokens"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteBillingCollectTokens =
	/*#__PURE__*/ createUseWriteContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "collectTokens",
	})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteBillingDeposit = /*#__PURE__*/ createUseWriteContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "deposit",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"distributeRewards"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteBillingDistributeRewards =
	/*#__PURE__*/ createUseWriteContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "distributeRewards",
	})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteBillingGrantRole = /*#__PURE__*/ createUseWriteContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "grantRole",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteBillingInitialize = /*#__PURE__*/ createUseWriteContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "initialize",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteBillingRenounceRole = /*#__PURE__*/ createUseWriteContract(
	{ abi: billingAbi, address: billingAddress, functionName: "renounceRole" },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteBillingRevokeRole = /*#__PURE__*/ createUseWriteContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "revokeRole",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"withdrawTokens"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWriteBillingWithdrawTokens =
	/*#__PURE__*/ createUseWriteContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "withdrawTokens",
	})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link billingAbi}__
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateBilling = /*#__PURE__*/ createUseSimulateContract({
	abi: billingAbi,
	address: billingAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"collectTokens"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateBillingCollectTokens =
	/*#__PURE__*/ createUseSimulateContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "collectTokens",
	})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateBillingDeposit =
	/*#__PURE__*/ createUseSimulateContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "deposit",
	})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"distributeRewards"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateBillingDistributeRewards =
	/*#__PURE__*/ createUseSimulateContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "distributeRewards",
	})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateBillingGrantRole =
	/*#__PURE__*/ createUseSimulateContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "grantRole",
	})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateBillingInitialize =
	/*#__PURE__*/ createUseSimulateContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "initialize",
	})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateBillingRenounceRole =
	/*#__PURE__*/ createUseSimulateContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "renounceRole",
	})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateBillingRevokeRole =
	/*#__PURE__*/ createUseSimulateContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "revokeRole",
	})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"withdrawTokens"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useSimulateBillingWithdrawTokens =
	/*#__PURE__*/ createUseSimulateContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "withdrawTokens",
	})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link billingAbi}__
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchBillingEvent = /*#__PURE__*/ createUseWatchContractEvent({
	abi: billingAbi,
	address: billingAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchBillingInitializedEvent =
	/*#__PURE__*/ createUseWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "Initialized",
	})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"RewardsDistributed"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchBillingRewardsDistributedEvent =
	/*#__PURE__*/ createUseWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "RewardsDistributed",
	})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchBillingRoleAdminChangedEvent =
	/*#__PURE__*/ createUseWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "RoleAdminChanged",
	})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchBillingRoleGrantedEvent =
	/*#__PURE__*/ createUseWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "RoleGranted",
	})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchBillingRoleRevokedEvent =
	/*#__PURE__*/ createUseWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "RoleRevoked",
	})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"TokensCollected"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchBillingTokensCollectedEvent =
	/*#__PURE__*/ createUseWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "TokensCollected",
	})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"TokensDeposited"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchBillingTokensDepositedEvent =
	/*#__PURE__*/ createUseWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "TokensDeposited",
	})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"TokensWithdrawn"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const useWatchBillingTokensWithdrawnEvent =
	/*#__PURE__*/ createUseWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "TokensWithdrawn",
	})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useReadRss3Token = /*#__PURE__*/ createUseReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useReadRss3TokenAllowance = /*#__PURE__*/ createUseReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "allowance",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useReadRss3TokenBalanceOf = /*#__PURE__*/ createUseReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "balanceOf",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useReadRss3TokenDecimals = /*#__PURE__*/ createUseReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "decimals",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useReadRss3TokenName = /*#__PURE__*/ createUseReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "name",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useReadRss3TokenSymbol = /*#__PURE__*/ createUseReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "symbol",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useReadRss3TokenTotalSupply = /*#__PURE__*/ createUseReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "totalSupply",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rss3TokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useWriteRss3Token = /*#__PURE__*/ createUseWriteContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useWriteRss3TokenApprove = /*#__PURE__*/ createUseWriteContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "approve",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useWriteRss3TokenTransfer = /*#__PURE__*/ createUseWriteContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "transfer",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useWriteRss3TokenTransferFrom =
	/*#__PURE__*/ createUseWriteContract({
		abi: rss3TokenAbi,
		address: rss3TokenAddress,
		functionName: "transferFrom",
	})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rss3TokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useSimulateRss3Token = /*#__PURE__*/ createUseSimulateContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useSimulateRss3TokenApprove =
	/*#__PURE__*/ createUseSimulateContract({
		abi: rss3TokenAbi,
		address: rss3TokenAddress,
		functionName: "approve",
	})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useSimulateRss3TokenTransfer =
	/*#__PURE__*/ createUseSimulateContract({
		abi: rss3TokenAbi,
		address: rss3TokenAddress,
		functionName: "transfer",
	})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useSimulateRss3TokenTransferFrom =
	/*#__PURE__*/ createUseSimulateContract({
		abi: rss3TokenAbi,
		address: rss3TokenAddress,
		functionName: "transferFrom",
	})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rss3TokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useWatchRss3TokenEvent = /*#__PURE__*/ createUseWatchContractEvent(
	{ abi: rss3TokenAbi, address: rss3TokenAddress },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rss3TokenAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useWatchRss3TokenApprovalEvent =
	/*#__PURE__*/ createUseWatchContractEvent({
		abi: rss3TokenAbi,
		address: rss3TokenAddress,
		eventName: "Approval",
	})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rss3TokenAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const useWatchRss3TokenTransferEvent =
	/*#__PURE__*/ createUseWatchContractEvent({
		abi: rss3TokenAbi,
		address: rss3TokenAddress,
		eventName: "Transfer",
	})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link billingAbi}__
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const readBilling = /*#__PURE__*/ createReadContract({
	abi: billingAbi,
	address: billingAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"COLLECTOR_ROLE"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const readBillingCollectorRole = /*#__PURE__*/ createReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "COLLECTOR_ROLE",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const readBillingDefaultAdminRole = /*#__PURE__*/ createReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "DEFAULT_ADMIN_ROLE",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const readBillingBalanceOf = /*#__PURE__*/ createReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "balanceOf",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"collectedBalance"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const readBillingCollectedBalance = /*#__PURE__*/ createReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "collectedBalance",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const readBillingGetRoleAdmin = /*#__PURE__*/ createReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "getRoleAdmin",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"getRoleMember"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const readBillingGetRoleMember = /*#__PURE__*/ createReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "getRoleMember",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"getRoleMemberCount"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const readBillingGetRoleMemberCount = /*#__PURE__*/ createReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "getRoleMemberCount",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const readBillingHasRole = /*#__PURE__*/ createReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "hasRole",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"stakingContract"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const readBillingStakingContract = /*#__PURE__*/ createReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "stakingContract",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const readBillingSupportsInterface = /*#__PURE__*/ createReadContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "supportsInterface",
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link billingAbi}__
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const writeBilling = /*#__PURE__*/ createWriteContract({
	abi: billingAbi,
	address: billingAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"collectTokens"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const writeBillingCollectTokens = /*#__PURE__*/ createWriteContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "collectTokens",
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const writeBillingDeposit = /*#__PURE__*/ createWriteContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "deposit",
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"distributeRewards"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const writeBillingDistributeRewards = /*#__PURE__*/ createWriteContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "distributeRewards",
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const writeBillingGrantRole = /*#__PURE__*/ createWriteContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "grantRole",
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const writeBillingInitialize = /*#__PURE__*/ createWriteContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "initialize",
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const writeBillingRenounceRole = /*#__PURE__*/ createWriteContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "renounceRole",
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const writeBillingRevokeRole = /*#__PURE__*/ createWriteContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "revokeRole",
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"withdrawTokens"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const writeBillingWithdrawTokens = /*#__PURE__*/ createWriteContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "withdrawTokens",
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link billingAbi}__
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const simulateBilling = /*#__PURE__*/ createSimulateContract({
	abi: billingAbi,
	address: billingAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"collectTokens"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const simulateBillingCollectTokens =
	/*#__PURE__*/ createSimulateContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "collectTokens",
	})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"deposit"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const simulateBillingDeposit = /*#__PURE__*/ createSimulateContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "deposit",
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"distributeRewards"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const simulateBillingDistributeRewards =
	/*#__PURE__*/ createSimulateContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "distributeRewards",
	})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const simulateBillingGrantRole = /*#__PURE__*/ createSimulateContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "grantRole",
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const simulateBillingInitialize = /*#__PURE__*/ createSimulateContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "initialize",
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const simulateBillingRenounceRole = /*#__PURE__*/ createSimulateContract(
	{ abi: billingAbi, address: billingAddress, functionName: "renounceRole" },
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const simulateBillingRevokeRole = /*#__PURE__*/ createSimulateContract({
	abi: billingAbi,
	address: billingAddress,
	functionName: "revokeRole",
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link billingAbi}__ and `functionName` set to `"withdrawTokens"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const simulateBillingWithdrawTokens =
	/*#__PURE__*/ createSimulateContract({
		abi: billingAbi,
		address: billingAddress,
		functionName: "withdrawTokens",
	})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link billingAbi}__
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const watchBillingEvent = /*#__PURE__*/ createWatchContractEvent({
	abi: billingAbi,
	address: billingAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const watchBillingInitializedEvent =
	/*#__PURE__*/ createWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "Initialized",
	})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"RewardsDistributed"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const watchBillingRewardsDistributedEvent =
	/*#__PURE__*/ createWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "RewardsDistributed",
	})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const watchBillingRoleAdminChangedEvent =
	/*#__PURE__*/ createWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "RoleAdminChanged",
	})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const watchBillingRoleGrantedEvent =
	/*#__PURE__*/ createWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "RoleGranted",
	})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const watchBillingRoleRevokedEvent =
	/*#__PURE__*/ createWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "RoleRevoked",
	})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"TokensCollected"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const watchBillingTokensCollectedEvent =
	/*#__PURE__*/ createWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "TokensCollected",
	})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"TokensDeposited"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const watchBillingTokensDepositedEvent =
	/*#__PURE__*/ createWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "TokensDeposited",
	})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link billingAbi}__ and `eventName` set to `"TokensWithdrawn"`
 *
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0xeb611a581cec185982bd21f1a37fcd29b2d95546)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x0000000000000000000000000000000000000000)
 */
export const watchBillingTokensWithdrawnEvent =
	/*#__PURE__*/ createWatchContractEvent({
		abi: billingAbi,
		address: billingAddress,
		eventName: "TokensWithdrawn",
	})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rss3TokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const readRss3Token = /*#__PURE__*/ createReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const readRss3TokenAllowance = /*#__PURE__*/ createReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "allowance",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const readRss3TokenBalanceOf = /*#__PURE__*/ createReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "balanceOf",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const readRss3TokenDecimals = /*#__PURE__*/ createReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "decimals",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const readRss3TokenName = /*#__PURE__*/ createReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "name",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const readRss3TokenSymbol = /*#__PURE__*/ createReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "symbol",
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const readRss3TokenTotalSupply = /*#__PURE__*/ createReadContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "totalSupply",
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link rss3TokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const writeRss3Token = /*#__PURE__*/ createWriteContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const writeRss3TokenApprove = /*#__PURE__*/ createWriteContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "approve",
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const writeRss3TokenTransfer = /*#__PURE__*/ createWriteContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "transfer",
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const writeRss3TokenTransferFrom = /*#__PURE__*/ createWriteContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "transferFrom",
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link rss3TokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const simulateRss3Token = /*#__PURE__*/ createSimulateContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const simulateRss3TokenApprove = /*#__PURE__*/ createSimulateContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "approve",
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const simulateRss3TokenTransfer = /*#__PURE__*/ createSimulateContract({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
	functionName: "transfer",
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link rss3TokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const simulateRss3TokenTransferFrom =
	/*#__PURE__*/ createSimulateContract({
		abi: rss3TokenAbi,
		address: rss3TokenAddress,
		functionName: "transferFrom",
	})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link rss3TokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const watchRss3TokenEvent = /*#__PURE__*/ createWatchContractEvent({
	abi: rss3TokenAbi,
	address: rss3TokenAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link rss3TokenAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const watchRss3TokenApprovalEvent =
	/*#__PURE__*/ createWatchContractEvent({
		abi: rss3TokenAbi,
		address: rss3TokenAddress,
		eventName: "Approval",
	})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link rss3TokenAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xc98D64DA73a6616c42117b582e832812e7B8D57F)
 * - [__View Contract on Rss3 Vsl Sepolia Testnet Rss3 Vsl Sepolia Testnet Scan__](https://scan.testnet.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Rss3 Vsl Mainnet Rss3 Vsl Mainnet Scan__](https://scan.rss3.io/address/0x4200000000000000000000000000000000000042)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23)
 */
export const watchRss3TokenTransferEvent =
	/*#__PURE__*/ createWatchContractEvent({
		abi: rss3TokenAbi,
		address: rss3TokenAddress,
		eventName: "Transfer",
	})
