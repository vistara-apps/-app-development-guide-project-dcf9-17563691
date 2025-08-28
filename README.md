
# Crypto Confessions

Share your crypto wins and losses, anonymously. Discover unfiltered stories from the community.

## Features

- 📝 **Anonymous Story Posting**: Share your crypto journey without revealing your identity
- 📱 **Curated Story Feed**: Discover stories filtered by 'rekt' (losses) or 'rich' (wins)
- 🔒 **Immutable Storage**: Stories are permanently stored on-chain for integrity
- 💰 **On-chain Tipping**: Reward great stories with USDC tips
- 🌐 **Base MiniApp**: Seamlessly integrated with the Farcaster ecosystem

## How It Works

1. **Share**: Post your crypto story anonymously
2. **Discover**: Read other community members' experiences  
3. **Reward**: Tip stories that resonate with you using USDC
4. **Preserve**: All stories are immutably stored on-chain

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base (Ethereum L2)
- **Wallet**: OnchainKit + MiniKit integration
- **Storage**: Arweave for permanent story storage
- **Social**: Farcaster integration for discovery

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Design System

The app implements a cohesive design system with:

- **Colors**: Primary blue, accent teal, light background
- **Typography**: Display, heading, and body text styles
- **Components**: StoryCard, PostButton, TipButton variants
- **Motion**: Smooth transitions and animations
- **Layout**: Responsive container with 12-column grid

## API Routes

- `GET/POST /api/stories` - Story management
- `GET/POST /api/tips` - Tipping system
- Integration endpoints for Farcaster, Arweave, and Base

## Contributing

This is a Base MiniApp template. Feel free to fork and customize for your own crypto storytelling platform!

## License

MIT License
