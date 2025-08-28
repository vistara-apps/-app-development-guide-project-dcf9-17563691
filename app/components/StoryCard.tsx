"use client";

import { Story } from "../types";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  // Format the date in a more readable way
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      return `${Math.floor(diffInDays / 7)} weeks ago`;
    } else {
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
  };

  // Get the appropriate card style based on the story type
  const getCardClass = () => {
    switch (variant) {
      case 'rekt':
        return 'card-rekt';
      case 'rich':
        return 'card-rich';
      default:
        return 'border-l-4 border-l-accent';
    }
  };

  // Get the appropriate emoji and badge for the story type
  const getTypeEmoji = () => {
    return story.storyType === 'rekt' ? '💸' : '🚀';
  };

  const getBadgeClass = () => {
    return story.storyType === 'rekt' ? 'badge-rekt' : 'badge-rich';
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div 
      className={`card ${getCardClass()} animate-fade-in transition-all duration-250`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onRead?.(story)}
      onKeyDown={(e) => e.key === 'Enter' && onRead?.(story)}
      tabIndex={0}
      role="article"
      aria-label={`${story.title} - ${story.storyType} story`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="text-2xl mt-1">{getTypeEmoji()}</div>
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
              {story.title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`badge ${getBadgeClass()}`}>
                {story.storyType === 'rekt' ? 'Rekt' : 'Rich'}
              </span>
              <span className="text-xs text-text-secondary">
                {formatDate(story.timestamp)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p 
        className="text-body text-text-primary mb-5 leading-relaxed"
      >
        {truncateContent(story.content)}
        {story.content.length > 150 && (
          <button 
            className="ml-1 text-primary hover:text-primary-hover font-medium focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              onRead?.(story);
            }}
          >
            Read more
          </button>
        )}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-text-secondary/10">
        <div className="flex items-center space-x-4">
          {story.tipCount > 0 && (
            <div className="tooltip">
              <span className="flex items-center text-sm text-text-secondary">
                <span className="mr-1.5">💰</span>
                <span>{story.tipCount}</span>
              </span>
              <span className="tooltip-text">
                {story.tipCount} {story.tipCount === 1 ? 'tip' : 'tips'}
              </span>
            </div>
          )}
          {story.totalTipped > 0 && (
            <div className="tooltip">
              <span className="flex items-center text-sm font-medium text-text-primary">
                <span className="text-xs text-text-secondary mr-1">$</span>
                <span>{story.totalTipped.toFixed(2)}</span>
              </span>
              <span className="tooltip-text">
                ${story.totalTipped.toFixed(2)} USDC tipped
              </span>
            </div>
          )}
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTip?.(story.storyId);
          }}
          className={`btn-primary text-sm px-4 py-1.5 rounded-full transition-all ${
            isHovered ? 'scale-105' : ''
          }`}
          aria-label={`Tip for story: ${story.title}`}
        >
          <span className="mr-1.5">💰</span>
          <span>Tip</span>
        </button>
      </div>
    </div>
  );
}
