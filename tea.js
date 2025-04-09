import { Wallet, JsonRpcProvider, formatEther, parseEther } from 'ethers'
import dotenv from 'dotenv';
dotenv.config();

// ====== ĐỌC PRIVATE KEY TỪ .ENV ======
const privateKey = process.env.PRIVATE_KEY;

// ====== CẤU HÌNH ======
const RPC_URL = 'https://tea-sepolia.g.alchemy.com/public';  // RPC URL
const CHAIN_ID = 10218;  // Chain ID cho Tea Sepolia

// ====== THIẾT LẬP SỐ GIAO DỊCH NGẪU NHIÊN ======
const MIN_TX = 120;
const MAX_TX = 150;
const TX_LIMIT = Math.floor(Math.random() * (MAX_TX - MIN_TX + 1) + MIN_TX);

const provider = new JsonRpcProvider(RPC_URL);
const wallet = new Wallet(privateKey, provider);
const senderAddress = wallet.address;

console.log(`✅ Đã kết nối với ví: ${senderAddress}`);
console.log(`📊 Sẽ thực hiện: ${TX_LIMIT} giao dịch`);

// ====== HÀM KIỂM TRA SỐ DƯ ======
async function getBalance(address) {
  const balanceWei = await provider.getBalance(address);
  return formatEther(balanceWei); // Chuyển từ Wei sang TEA
}

// ====== KIỂM TRA SỐ DƯ ======
(async () => {
  let balance = await getBalance(senderAddress);
  console.log(`💰 Số dư hiện tại: ${balance} TEA`);

  if (parseFloat(balance) < 5) {
    console.log("⚠️ Số dư nhỏ hơn 5 TEA! Dừng chương trình.");
    return;
  }

  const recipientAddresses = [
    '0x...', // Thay bằng địa chỉ ví nhận
    '0x...', // Thay bằng địa chỉ ví nhận
  ];

  // ====== GỬI TOKEN ======
  let txCount = 0;

  while (txCount < TX_LIMIT) {
    // Chọn ví nhận ngẫu nhiên từ danh sách
    const randomIndex = Math.floor(Math.random() * recipientAddresses.length);
    const recipient = recipientAddresses[randomIndex];

    let amount = (Math.random() * (0.0010 - 0.0001) + 0.0001).toFixed(5); // Số token ngẫu nhiên
    try {
      let tx = await wallet.sendTransaction({
        to: recipient,
        value: parseEther(amount),
        gasLimit: 21000
      });

      txCount++;
      console.log(`🚀 [${txCount}/${TX_LIMIT}] Đã gửi ${amount} TEA đến ${recipient} | TX: ${tx.hash}`);
    } catch (error) {
      console.log(`❌ Lỗi khi gửi đến ${recipient}: ${error.message}`);
    }

    // Chờ ngẫu nhiên 15-60 giây
    let delay = Math.floor(Math.random() * (60 - 15 + 1) + 15);
    console.log(`⏳ Chờ ${delay} giây trước giao dịch tiếp theo...\n`);
    await new Promise(resolve => setTimeout(resolve, delay * 1000));
  }

  console.log(`✅ Hoàn thành gửi token! Đã thực hiện ${txCount} giao dịch.`);
})();
