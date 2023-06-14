const {ethers} = require("ethers")
const provider = new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/3283e3d01f3c4301a96544e32fc51e30`
);
const queryBlockchain = async () => {
    const block = await provider.getBlockNumber();
    console.log("current blocknumber is : ", block);

    const balance = await provider.getBalance(
        "0xB4FB7ce6A72dd08b9d038d11712b2DF24f72C9F8"
    );
    console.log("Account balance in BN: ",balance);

    const balanceEther = ethers.utils.formatEther(balance);
    console.log("Account Balance in Ether: ", balanceEther);

    const balanceWei = ethers.utils.parseEther(balanceEther);
    console.log(balanceWei);
};
queryBlockchain();

// import { InfuraProvider } from "ethers";

// const infuraAPIKey = "<YOUR_INFURA_API_KEY>";
// const provider = new InfuraProvider(infuraAPIKey);
// const web3 = new Web3(provider);

// async function getCurrentBlockNumber() {
//   const blockNumber = await web3.eth.getBlockNumber();
//   console.log("Current block number:", blockNumber);
// }

// getCurrentBlockNumber();
