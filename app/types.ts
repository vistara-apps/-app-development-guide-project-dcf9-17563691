export interface Story {
  storyId: string;
  authorFid?: string;
  contentHash: string;
  storyType: 'rekt' | 'rich';
  timestamp: number;
  transactionHash?: string;
  arweaveTxId?: string;
  title: string;
  authorMessage?: string;
  content: string;
  tipAmount?: number;
  tipCount?: number;
  totalTipped?: number;
}

export interface Tip {
  tipId: string;
  storyId: string;
  fromFid?: string;
  toFid: string;
  amount: number;
  transactionHash: string;
  timestamp: number;
}

export interface User {
  fid: string;
  walletAddress: string;
}

export type StoryFilter = 'all' | 'rekt' | 'rich';

export type StorySortBy = 'recent' | 'trending' | 'top';
