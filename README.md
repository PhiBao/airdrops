# Humanity Airdrop Script

This repository contains a script that interacts with the Humanity testnet to claim buffer rewards and daily rewards.

## Getting Started

Follow these steps to clone, set up, and run this script.

### Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)
- A wallet with a private key that works on Humanity testnet

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

### Usage

Run the script to interact with the Humanity testnet:

```sh
npm start
```

The script will:
1. Connect to the Humanity testnet
2. Call the `claimBuffer()` function on the contract
3. Call the `claimReward()` function on the contract
4. Output transaction information to the console

### Script Details

- RPC URL: `https://rpc.testnet.humanity.org`
- Contract Address: `0xa18f6FCB2Fd4884436d10610E69DB7BFa1bFe8C7`
- Functions called:
  - `claimBuffer()`
  - `claimReward()`

## Security Notes

- Keep your private key secure and never share it
- The `.env` file is included in `.gitignore` to prevent accidentally committing your private key
- Always verify contract addresses and function calls before executing them

## Troubleshooting

If you encounter errors:
- Verify your private key is correct
- Check your connection to the Humanity testnet
- Ensure your wallet has sufficient funds for gas fees
