import { Wallet, JsonRpcProvider, Contract } from 'ethers'
import dotenv from 'dotenv';
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY; // Thay bằng private key của bạn

const RPC_URL = "https://rpc.testnet.humanity.org";
const CONTRACT_ADDRESS = "0xa18f6FCB2Fd4884436d10610E69DB7BFa1bFe8C7";

const ABI = [
  {
    "inputs": [],
    "name": "claimBuffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function callContract() {
  const provider = new JsonRpcProvider(RPC_URL);
  const wallet = new Wallet(PRIVATE_KEY, provider);
  const contract = new Contract(CONTRACT_ADDRESS, ABI, wallet);

  try {
    console.log(" ====> Calling claim ref");
    const tx1 = await contract.claimBuffer();
    await tx1.wait();
    console.log("ref successful:", tx1.hash);
  } catch (error) {
    console.error("Error calling contracts:", error);
  }

  try {

    console.log("====>  Calling daily reward...");
    const tx2 = await contract.claimReward();
    await tx2.wait();
    console.log("daily successful:", tx2.hash);
  } catch (error) {
    console.error("Error calling contracts:", error);
  }
}

callContract();
