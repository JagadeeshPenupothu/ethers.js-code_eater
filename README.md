# General dissuction on Ethers.js.
**Ethers.js** --- It help to connect frontend and blockchain(smartContract). `or` The ethers.js library aims to be a complete and compact library for interacting with the Ethereum

**Provider** -- It will read the data in blockchain. `or` A provider(in ethers) is a class which provides an abstraction for a connection to the Ethereum Network. It provides read-only access to the Blockchain an its status.

**Signer** -- It help to do transfer ethers from our account by using private key. `or` A Signer is a class which(usually) in some way directly or indirectly has access to a private key, which can sign messages and transactions to authorize the network to charge your account ether to perform operations.

**Contract** -- It help to intract with javascript methods. `or` A Contract is an abstraction which represents a connection to a specific contract on the Ethereum Network, so that applications can use it like a normal JavaScript
object.

**To install ethers** -- `npm install --save ethers` or `npm i -S ethers@5.7.2`

**importing ether js to js folder by** `const {ethers} = require("ethers")`

**infura** -- It help to run our own node in blockchain on behalf of us.

#Reading from Blockchain.
**Use of provider** - Provider is used to read data from the blockchain.
###Code for reading data from blockchain.
Note: Before that create account on infura and create file on it for API key.

`const {ethers} = require("ethers")
const provider = new ethers.providers.JsonRpcProvider(
    `YOUR INFURA API key` i already an file named Ether_js in infura.
);
const queryBlockchain = async () => {
    const block = await provider.getBlockNumber();
    console.log("current blocknumber is : ", block);

    const balance = await provider.getBalance(
        "" //0xB4FB7ce6A72dd08b9d038d11712b2DF24f72C9F8
    );
    console.log("Account balance in BN: ",balance); //This will generate big number.

    const balanceEther = ethers.utils.formatEther(balance); //convertion of big number.
    console.log("Account Balance in Ether: ", balanceEther);

    const balanceWei = ethers.utils.parseEther(balanceEther);
    console.log(balanceWei);
};
queryBlockchain();`

#To write in Blockchain.
**use of signer** - Signer + metamask is used to write the data in blockchain.

As of now we see that for read data from blockchain wwe used provider but for writting data on blockchain we use both metamask + signer. For that we have to write a smartContract..

####sample smartContract.

`// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;
contract wallet{
    //read
    string public name="wallet";
    uint num;
    //write
    function setValue(uint _num) public {
        num=_num;
    }
    //read
     function getValue() public view returns(uint){
        return num;
    }
    //write
    function sendEthContract() public payable{
        
    }
    //read
    function contractBalance() public view returns(uint){
        return address(this).balance;
    }
    //write
    function sendEthUser(address _user) public payable{
       payable(_user).transfer(msg.value);
    }
    //read
    function accountBalance(address _address) public view returns(uint){
        return (_address).balance;
    }
}`

`NOTE: In read data case we used main net API key but when we write on blockchain change se don't use mainnet APi key because it costs MONEY, So we use Testnet API key.`
we need contract address and ABI to write data in blockchain for that we deploy smartcontract on sepolia test net by using remix. In remix by using metamask injected provided metamask we are deploy our smart contract on blockchain via testnets, after deployment is do we can find the deployment of contract address in Ethescan. (In my case after deployment i go 0xeb1965e65ca6adbb8db493df5680b5c0075295f9 contract address). Now we gonna use this contract address in our writeblockchain. And by there it self in remix we find the ABI under arifacts (file is in json format),now we gonna use this ABI in our writeblockchain.

ABI for above contract is 
`[
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
]`

###Code for writing data from blockchain.
By this write in blockchain we are indirectly interating with amart contract.
In the below code we are only reading the data from our contract for now. Because for reading the data we need signature to confirm the transaction we need metamask for that we use react application.

`//by this write in blockchain we are indirectly interating with amart contract.
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

    const userBalance = await walletContract.accountBalance("0x49A137901Ecf8a0A733A91e98E1CECBF812ba2AE");
    const userbal = ethers.utils.formatEther(userBalance);
    console.log("user balance : ", userbal);

};
ContractIntraction()`

for install react app use `npm i create-react-app`
After in app.js write the below code..
`import {useEffect} from "react";
const {ethers} = require("ethers");

function App() {
const walletAddress = "0x0b67d4cce641fddc924dc233236a2d5dc1ca1194";//"0xeb1965e65ca6adbb8db493df5680b5c0075295f9"

useEffect(() => {
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
  const writeContract = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts",[]);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(walletAddress, walletABI, signer);
    // await contract.setValue(2);// this is for setting value to a funtion called setValue
    //await contract.sendEthContract({value:ethers.utils.parseEther("0.001")}); //this is for sending ethers from acc to contract
    await contract.sendEthUser("your 2nd accounr address", {value: ethers.utils.parseEther("0.1")});
  };writeContract();
  },[]);
  return (
    <div>
      Ether.Js      
    </div>
  );
}

export default App;
`
#HOW TO RUN
NOTE: for reading file use `node readblockchain.js`
      for write fiel use `node writeblockchain.js`
	  for writeonly file use `npm start`.


