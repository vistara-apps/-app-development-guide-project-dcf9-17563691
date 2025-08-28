
"use client";

import { useState, useEffect } from "react";
import { Story, StoryFilter } from "../types";
import { StoryCard } from "./StoryCard";
import { TipModal } from "./TipModal";
import { StoryModal } from "./StoryModal";

interface StoryFeedProps {
  variant?: 'default' | 'loading' | 'empty';
}

export function StoryFeed({ variant = 'default' }: StoryFeedProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [filter, setFilter] = useState<StoryFilter>('all');
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [readModalOpen, setReadModalOpen] = useState(false);

  // Mock data for now
  useEffect(() => {
    const mockStories: Story[] = [
      {
        storyId: "1",
        title: "Lost everything on LUNA",
        content: "I thought I was smart, putting my life savings into LUNA at $80. Watched it go to zero in days. Lost my house down payment, wedding funds, everything. Still recovering 2 years later. The worst part wasn't the money - it was telling my fiancé.",
        storyType: "rekt",
        timestamp: Date.now() / 1000 - 86400,
        tipCount: 12,
        totalTipped: 15.50
      },
      {
        storyId: "2", 
        title: "Diamond hands on ETH since 2017",
        content: "Bought ETH at $300 in 2017. Held through the bear market, through FTX collapse, through everything. Just sold half at $4000 to buy my dream house. Sometimes patience really does pay off.",
        storyType: "rich",
        timestamp: Date.now() / 1000 - 43200,
        tipCount: 8,
        totalTipped: 23.75
      },
      {
        storyId: "3",
        title: "Rug pull nightmare",
        content: "Fell for a 'next Solana' project. Dev team seemed legit, roadmap looked solid. Put in $25k. Next morning, liquidity was gone, website down, Telegram deleted. Learned my lesson about DYOR the hard way.",
        storyType: "rekt", 
        timestamp: Date.now() / 1000 - 172800,
        tipCount: 5,
        totalTipped: 8.25
      }
    ];

    setTimeout(() => {
      setStories(mockStories);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredStories = stories.filter(story => 
    filter === 'all' || story.storyType === filter
  );

  const handleTip = (storyId: string) => {
    setSelectedStory(stories.find(s => s.storyId === storyId) || null);
    setTipModalOpen(true);
  };

  const handleRead = (story: Story) => {
    setSelectedStory(story);
    setReadModalOpen(true);
  };

  if (variant === 'loading' || loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-text-secondary/20 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-text-secondary/20 rounded w-1/2 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-text-secondary/20 rounded"></div>
              <div className="h-3 bg-text-secondary/20 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'empty' || filteredStories.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-4xl mb-4">📱</div>
        <h3 className="text-heading text-text-primary mb-2">No stories yet</h3>
        <p className="text-body text-text-secondary">
          Be the first to share your crypto journey
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-lg">
      {/* Filter Tabs */}
      <div className="flex space-x-2 bg-surface rounded-lg p-1 shadow-card">
        {(['all', 'rekt', 'rich'] as StoryFilter[]).map(filterOption => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              filter === filterOption
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {filterOption === 'all' ? 'All Stories' : 
             filterOption === 'rekt' ? '💸 Rekt' : '🚀 Rich'}
          </button>
        ))}
      </div>

      {/* Stories */}
      <div className="space-y-4">
        {filteredStories.map(story => (
          <StoryCard
            key={story.storyId}
            story={story}
            variant={story.storyType}
            onTip={handleTip}
            onRead={handleRead}
          />
        ))}
      </div>

      {/* Modals */}
      {selectedStory && (
        <>
          <TipModal
            isOpen={tipModalOpen}
            onClose={() => setTipModalOpen(false)}
            story={selectedStory}
          />
          <StoryModal
            isOpen={readModalOpen}
            onClose={() => setReadModalOpen(false)}
            story={selectedStory}
          />
        </>
      )}
    </div>
  );
}
