"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import type { Story } from "../types";
import { TipButton } from "./TipButton";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);

  const cardClass = story.storyType === 'rekt' ? 'story-card-rekt' : 'story-card-rich';
  const typeEmoji = story.storyType === 'rekt' ? '💸' : '💰';
  const typeColor = story.storyType === 'rekt' ? 'text-rekt' : 'text-rich';

  const content = story.content || "This is a sample story content that would be loaded from Arweave or IPFS. The user shared their crypto journey here...";
  const displayContent = expanded ? content : content.slice(0, 150) + (content.length > 150 ? '...' : '');

  const handleTip = (amount: number) => {
    setTipAmount(prev => prev + amount);
    // TODO: Implement actual tipping logic
    console.log(`Tipping ${amount} USDC to story ${story.storyId}`);
  };

  return (
    <div className={`${cardClass} animate-fade-in`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{typeEmoji}</span>
          <span className={`text-sm font-medium ${typeColor}`}>
            {story.storyType.toUpperCase()}
          </span>
        </div>
        <span className="text-xs text-text-secondary">
          {formatDistanceToNow(new Date(story.timestamp * 1000), { addSuffix: true })}
        </span>
      </div>

      {story.title && (
        <h3 className="font-semibold text-text-primary mb-2">{story.title}</h3>
      )}

      <p className="text-body text-text-primary mb-4 leading-relaxed">
        {displayContent}
      </p>

      {content.length > 150 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-accent text-sm font-medium hover:text-accent/80 transition-colors mb-4"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-text-secondary/10">
        <div className="flex items-center space-x-4">
          <TipButton amount={0.1} onTip={handleTip} />
          <TipButton amount={0.25} onTip={handleTip} />
          <TipButton amount={1.0} onTip={handleTip} />
        </div>
        {tipAmount > 0 && (
          <div className="text-sm text-accent font-medium">
            +${tipAmount.toFixed(2)} USDC
          </div>
        )}
      </div>
    </div>
  );
}
