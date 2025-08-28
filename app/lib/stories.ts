
import { Story, StoryFilter, StorySortBy } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock data for demonstration
const mockStories: Story[] = [
  {
    storyId: uuidv4(),
    storyType: 'rekt',
    timestamp: Date.now() - 3600000,
    contentHash: 'mock-hash-1',
    title: 'Lost Everything on a Leveraged Trade',
    content: 'I thought I was smart going 50x leverage on ETH. It went against me in minutes and I lost my entire portfolio. 3 years of savings gone in one trade. Learn from my mistake - never risk more than you can afford to lose.',
    tipCount: 12,
    totalTipped: 2.4,
  },
  {
    storyId: uuidv4(),
    storyType: 'rich',
    timestamp: Date.now() - 7200000,
    contentHash: 'mock-hash-2',
    title: 'Early Base Ecosystem Investment Paid Off',
    content: 'Got into Base ecosystem tokens when they were still under the radar. Did my research, invested slowly over 6 months, and now sitting on 10x gains. Sometimes patience and research really pays off in crypto.',
    tipCount: 8,
    totalTipped: 1.8,
  },
  {
    storyId: uuidv4(),
    storyType: 'rekt',
    timestamp: Date.now() - 10800000,
    contentHash: 'mock-hash-3',
    title: 'Fell for a Rug Pull',
    content: 'The project had everything - great website, active community, doxxed team. Or so I thought. Turned out the team photos were stock images and they rugpulled with $2M. Lost $5k that I worked months to save.',
    tipCount: 15,
    totalTipped: 3.2,
  },
  {
    storyId: uuidv4(),
    storyType: 'rich',
    timestamp: Date.now() - 14400000,
    contentHash: 'mock-hash-4',
    title: 'DCA Strategy Finally Paid Off',
    content: 'Been DCAing into ETH for 2 years regardless of price. Through the bear market, through the volatility. Finally hit my target and took some profits. Slow and steady really does win the race.',
    tipCount: 6,
    totalTipped: 1.1,
  },
  {
    storyId: uuidv4(),
    storyType: 'rekt',
    timestamp: Date.now() - 18000000,
    contentHash: 'mock-hash-5',
    title: 'FOMO Into Memecoin Peak',
    content: 'Saw everyone making money on this memecoin, jumped in at the absolute peak. Within hours it crashed 90%. Classic FOMO mistake that cost me $3k. Now I stick to my investment plan.',
    tipCount: 9,
    totalTipped: 1.5,
  }
];

export function getStories(filter: StoryFilter = 'all', sortBy: StorySortBy = 'recent'): Story[] {
  let filtered = mockStories;
  
  if (filter !== 'all') {
    filtered = mockStories.filter(story => story.storyType === filter);
  }
  
  switch (sortBy) {
    case 'trending':
      return filtered.sort((a, b) => b.tipCount - a.tipCount);
    case 'mostTipped':
      return filtered.sort((a, b) => b.totalTipped - a.totalTipped);
    case 'recent':
    default:
      return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }
}

export function getStoryById(id: string): Story | undefined {
  return mockStories.find(story => story.storyId === id);
}

export async function createStory(story: Omit<Story, 'storyId' | 'timestamp' | 'tipCount' | 'totalTipped'>): Promise<Story> {
  const newStory: Story = {
    ...story,
    storyId: uuidv4(),
    timestamp: Date.now(),
    tipCount: 0,
    totalTipped: 0,
  };
  
  // In a real app, this would save to database/blockchain
  mockStories.unshift(newStory);
  return newStory;
}
