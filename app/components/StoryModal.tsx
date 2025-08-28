
"use client";

import { Story } from "../types";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story;
}

export function StoryModal({ isOpen, onClose, story }: StoryModalProps) {
  if (!isOpen) return null;

  const getTypeEmoji = () => {
    return story.storyType === 'rekt' ? '💸' : '🚀';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-surface border-b border-text-secondary/10 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getTypeEmoji()}</span>
            <div>
              <h2 className="text-heading text-text-primary">{story.title}</h2>
              <span className="text-sm text-text-secondary capitalize">
                {story.storyType} story • {new Date(story.timestamp * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary text-xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <p className="text-body text-text-primary leading-relaxed whitespace-pre-wrap">
            {story.content}
          </p>

          {story.authorMessage && (
            <div className="mt-6 p-4 bg-bg rounded-md">
              <p className="text-sm text-text-secondary mb-1">Author's note:</p>
              <p className="text-body text-text-primary italic">{story.authorMessage}</p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              {story.tipCount && story.tipCount > 0 && (
                <span>💰 {story.tipCount} tips</span>
              )}
              {story.totalTipped && story.totalTipped > 0 && (
                <span>${story.totalTipped.toFixed(2)} USDC total</span>
              )}
            </div>
            
            <button className="btn-primary">
              💰 Tip this story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
