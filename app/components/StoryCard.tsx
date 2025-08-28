
"use client";

import { Story } from "../types";

interface StoryCardProps {
  story: Story;
  variant?: 'rekt' | 'rich' | 'default';
  onTip?: (storyId: string) => void;
  onRead?: (story: Story) => void;
}

export function StoryCard({ 
  story, 
  variant = 'default',
  onTip,
  onRead 
}: StoryCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'rekt':
        return 'border-l-4 border-l-red-500 bg-red-50/50';
      case 'rich':
        return 'border-l-4 border-l-green-500 bg-green-50/50';
      default:
        return 'border-l-4 border-l-accent';
    }
  };

  const getTypeEmoji = () => {
    return story.storyType === 'rekt' ? '💸' : '🚀';
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className={`card ${getVariantStyles()} animate-fade-in cursor-pointer`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getTypeEmoji()}</span>
          <div>
            <h3 className="text-heading text-text-primary font-semibold">
              {story.title}
            </h3>
            <span className="text-sm text-text-secondary capitalize">
              {story.storyType} story
            </span>
          </div>
        </div>
        <div className="text-xs text-text-secondary">
          {new Date(story.timestamp * 1000).toLocaleDateString()}
        </div>
      </div>

      <p 
        className="text-body text-text-primary mb-4 cursor-pointer hover:text-primary transition-colors"
        onClick={() => onRead?.(story)}
      >
        {truncateContent(story.content)}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          {story.tipCount && story.tipCount > 0 && (
            <span>💰 {story.tipCount} tips</span>
          )}
          {story.totalTipped && story.totalTipped > 0 && (
            <span>${story.totalTipped.toFixed(2)} USDC</span>
          )}
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTip?.(story.storyId);
          }}
          className="btn-primary text-sm px-3 py-1"
        >
          💰 Tip
        </button>
      </div>
    </div>
  );
}
