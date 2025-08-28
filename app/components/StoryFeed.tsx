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

    // Simulate API loading
    const timer = setTimeout(() => {
      setStories(mockStories);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
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

  // Handle keyboard navigation for filter tabs
  const handleFilterKeyDown = (e: React.KeyboardEvent, filterOption: StoryFilter) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFilter(filterOption);
    }
  };

  // Improved loading state with more realistic skeleton
  if (variant === 'loading' || loading) {
    return (
      <div className="space-y-6" aria-live="polite" aria-busy="true">
        <div className="flex space-x-2 bg-surface rounded-lg p-1 shadow-card animate-pulse">
          {['All Stories', 'Rekt', 'Rich'].map((label, i) => (
            <div 
              key={i} 
              className="flex-1 py-2 px-4 rounded-md bg-text-secondary/10 h-10"
              aria-hidden="true"
            />
          ))}
        </div>
        
        <div className="sr-only">Loading stories...</div>
        
        {[1, 2, 3].map(i => (
          <div key={i} className="card animate-pulse" aria-hidden="true">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-text-secondary/20 mr-3"></div>
              <div className="flex-1">
                <div className="h-6 bg-text-secondary/20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-text-secondary/20 rounded w-1/3 mb-4"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-text-secondary/20 rounded"></div>
              <div className="h-4 bg-text-secondary/20 rounded"></div>
              <div className="h-4 bg-text-secondary/20 rounded w-5/6"></div>
            </div>
            <div className="flex justify-between pt-2 border-t border-text-secondary/10">
              <div className="h-4 w-20 bg-text-secondary/20 rounded"></div>
              <div className="h-8 w-20 bg-text-secondary/20 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Improved empty state with better guidance
  if (variant === 'empty' || filteredStories.length === 0) {
    return (
      <div className="card text-center py-12" aria-live="polite">
        <div className="text-5xl mb-6 animate-bounce-slow">
          {filter === 'rekt' ? '💸' : filter === 'rich' ? '🚀' : '📱'}
        </div>
        <h3 className="text-2xl font-semibold text-text-primary mb-3">
          {filter === 'all' 
            ? 'No stories yet' 
            : filter === 'rekt' 
              ? 'No rekt stories yet' 
              : 'No rich stories yet'}
        </h3>
        <p className="text-body text-text-secondary max-w-md mx-auto mb-6">
          {filter === 'all' 
            ? 'Be the first to share your crypto journey with the community.' 
            : `Be the first to share your ${filter} story with the community.`}
        </p>
        <button 
          onClick={() => setFilter('all')}
          className="btn-primary mx-auto"
          aria-label={`Switch to all stories filter`}
        >
          {filter === 'all' 
            ? 'Share Your Story' 
            : 'View All Stories'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs - Improved for accessibility */}
      <nav 
        className="flex space-x-2 bg-surface rounded-lg p-1 shadow-card"
        role="tablist"
        aria-label="Filter stories by type"
      >
        {(['all', 'rekt', 'rich'] as StoryFilter[]).map(filterOption => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            onKeyDown={(e) => handleFilterKeyDown(e, filterOption)}
            role="tab"
            aria-selected={filter === filterOption}
            aria-controls={`${filterOption}-stories`}
            id={`${filterOption}-tab`}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              filter === filterOption
                ? 'bg-primary text-white shadow-button'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            {filterOption === 'all' ? (
              <span className="flex items-center justify-center">
                <span className="hidden sm:inline">All Stories</span>
                <span className="sm:hidden">All</span>
              </span>
            ) : filterOption === 'rekt' ? (
              <span className="flex items-center justify-center">
                <span className="mr-1.5">💸</span>
                <span>Rekt</span>
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <span className="mr-1.5">🚀</span>
                <span>Rich</span>
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Stories List - Improved for accessibility */}
      <div 
        className="space-y-6"
        role="tabpanel"
        id={`${filter}-stories`}
        aria-labelledby={`${filter}-tab`}
      >
        <h2 className="sr-only">
          {filter === 'all' ? 'All Stories' : filter === 'rekt' ? 'Rekt Stories' : 'Rich Stories'}
        </h2>
        
        {filteredStories.length > 0 ? (
          <div aria-live="polite">
            <p className="sr-only">
              Showing {filteredStories.length} {filter === 'all' ? '' : filter} stories
            </p>
            {filteredStories.map(story => (
              <div key={story.storyId} className="mb-6">
                <StoryCard
                  story={story}
                  variant={story.storyType}
                  onTip={handleTip}
                  onRead={handleRead}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-text-secondary py-8">
            No {filter === 'all' ? '' : filter} stories found.
          </p>
        )}
      </div>

      {/* Modals - Improved for accessibility */}
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
