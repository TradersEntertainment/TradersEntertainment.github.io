# Base Roulette Casino

Token-based roulette casino web application running on Base network.

## Features

- **Swap Interface**: Exchange ETH for game tokens
- **Roulette Game**: Black/Red betting with 1.98x payout
- **Statistics Dashboard**: Track your wins, losses, and platform stats
- **Automated Buyback**: Fee collection and token buyback system

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- Wagmi & RainbowKit
- Solidity Smart Contracts
- Hardhat

## Smart Contracts

1. **GameToken.sol**: ERC20 token with burn functionality
2. **RouletteGame.sol**: Roulette game logic with black/red betting
3. **SwapFeeCollector.sol**: Automated fee collection and buyback system

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env.local
```

3. Deploy contracts:
```bash
npm run deploy:contracts
```

4. Run development server:
```bash
npm run dev
```

## Deployment

Build for production:
```bash
npm run build
```

## License

MIT
