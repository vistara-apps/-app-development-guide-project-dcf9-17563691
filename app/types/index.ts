export interface Story {
  storyId: string;
  authorFid?: string;
  contentHash?: string;
  storyType: 'rekt' | 'rich';
  timestamp: number;
  transactionHash?: string;
  arweaveTxId?: string;
  title?: string;
  content?: string;
  authorMessage?: string;
}

export interface Tip {
  tipId: string;
  storyId: string;
  fromFid?: string;
  toFid?: string;
  amount: number;
  transactionHash?: string;
  timestamp: number;
}

export interface User {
  fid: string;
  walletAddress: string;
}
