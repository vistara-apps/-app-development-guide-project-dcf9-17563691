import type { Story } from "../types";

export const mockStories: Story[] = [
  {
    storyId: "1",
    storyType: "rekt",
    timestamp: Date.now() / 1000 - 3600,
    title: "Lost everything on a memecoin",
    content: "Thought I was smart buying the dip on $PEPE at 0.000008. Kept buying more as it dropped. Lost 80% of my portfolio in 2 weeks. Lesson learned: never FOMO into memecoins without a plan.",
  },
  {
    storyId: "2", 
    storyType: "rich",
    timestamp: Date.now() / 1000 - 7200,
    title: "Early ETH holder success",
    content: "Bought ETH at $300 in 2020 and held through all the volatility. Finally sold some at $4000 to buy my first house. Sometimes patience really pays off in crypto.",
  },
  {
    storyId: "3",
    storyType: "rekt", 
    timestamp: Date.now() / 1000 - 10800,
    title: "Leverage trading disaster",
    content: "Got cocky after a few successful trades and went 10x leverage on BTC. One bad move and I got liquidated. Lost 3 months of DCA in 5 minutes. Stick to spot trading, folks.",
  },
  {
    storyId: "4",
    storyType: "rich",
    timestamp: Date.now() / 1000 - 14400,
    title: "NFT flip success",
    content: "Minted a random NFT for 0.1 ETH and forgot about it. Checked my wallet 6 months later and it was worth 15 ETH. Sometimes the best strategy is to do nothing.",
  },
];
