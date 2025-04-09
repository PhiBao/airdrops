# Airdrops Interaction Scripts

This repository contains scripts that interact with the Humanity testnet and Tea blockchain to claim rewards and perform transactions.

## Getting Started

Follow these steps to clone, set up, and run these scripts.

### Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)
- A wallet with a private key that works on the respective networks

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/PhiBao/airdrops.git
   cd airdrops
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```sh
   touch .env
   ```
   
   Add your private key to the file:
   ```
   PRIVATE_KEY=your_private_key_here
   ```
   Replace `your_private_key_here` with your actual private key.

4. **For Tea script only**: Create a `wallet.txt` file with recipient addresses (one per line)

### Usage

You can run the scripts using the following commands:

#### Humanity Script

```sh
npm run humanity
```

The Humanity script will:
1. Connect to the Humanity testnet
3. Alternate between calling `claimBuffer()` and `claimReward()` functions
4. Display progress and transaction details in the console

#### Tea Script

```sh
npm run tea
```

The Tea script will:
1. Connect to the Tea Sepolia testnet
2. Randomly perform 120-150 transactions
3. Send small random amounts of TEA to addresses arrray
4. Display progress and transaction details in the console

### Script Details

#### Humanity Script
- RPC URL: `https://rpc.testnet.humanity.org`
- Contract Address: `0xa18f6FCB2Fd4884436d10610E69DB7BFa1bFe8C7`
- Functions called:
  - `claimBuffer()`
  - `claimReward()`

#### Tea Script
- RPC URL: `https://tea-sepolia.g.alchemy.com/public`
- Chain ID: 10218

## Security Notes

- Keep your private key secure and never share it
- The `.env` file is included in `.gitignore` to prevent accidentally committing your private key
- Always verify contract addresses and function calls before executing them

## Troubleshooting

If you encounter errors:
- Verify your private key is correct in the .env file
- Check your connection to the respective network
- Ensure your wallet has sufficient funds for gas fees
- For the Tea script, make sure *recipientAddresses* contains valid addresses
