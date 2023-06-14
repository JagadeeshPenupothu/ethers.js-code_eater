//by this write in blockchain we are indirectly interating with amart contract.
//In this file we are only reading the data from our contract for now. Because for reading the data we need signature to conform the transaction for that we use react application
const {ethers} = require("ethers")
const provider = new ethers.providers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/3283e3d01f3c4301a96544e32fc51e30`
);
const walletAddress = "0x0b67d4cce641fddc924dc233236a2d5dc1ca1194";//"0xeb1965e65ca6adbb8db493df5680b5c0075295f9"
const walletABI =[
	{
		"inputs": [],
		"name": "sendEthContract",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "sendEthUser",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "setValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "accountBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const ContractIntraction = async() => {
    const walletContract = new ethers.Contract(walletAddress,
         walletABI,
         provider);
    const contractName = await walletContract.name();
    console.log("contract name is: ",contractName);

    const num = await walletContract.getValue();
    const number = ethers.utils.formatEther(num);
    console.log("Number is: ", number);


    const contractBalance = await walletContract.contractBalance();
    const contractbal = ethers.utils.formatEther(contractBalance);
    console.log("contract balance : ", contractbal);

    const userBalance = await walletContract.accountBalance("0xaDf8f60cB4189DF4770f97e593f6D9635A0e89F1");
    const userbal = ethers.utils.formatEther(userBalance);
    console.log("user balance : ", userbal);

};
ContractIntraction()

