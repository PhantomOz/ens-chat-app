'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = `${process.env.NEXT_PUBLIC_PROJECT_ID}`

// 2. Set chains
const testnet = {
    chainId: 11155111,
    name: 'Sepolia Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: `${process.env.NEXT_PUBLIC_RPC_URL}`
}

// 3. Create a metadata object
const metadata = {
    name: 'Chat Dapp',
    description: 'Chat in Dapp',
    url: 'http://localhost:3000', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
}
// 4. Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: '...', // used for the Coinbase SDK
    defaultChainId: 1, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
    ethersConfig,
    chains: [testnet],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true // Optional - false as default
})

export function Web3Modal({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return children
}