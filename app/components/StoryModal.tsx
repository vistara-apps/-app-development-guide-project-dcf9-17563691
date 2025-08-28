
"use client";

import { Story } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { TipButton } from './TipButton';

interface StoryModalProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StoryModal({ story, isOpen, onClose }: StoryModalProps) {
  if (!isOpen || !story) return null;

  const getTypeColor = () => {
    if (story.storyType === 'rekt') return 'text-rekt';
    if (story.storyType === 'rich') return 'text-rich';
    return 'text-text-primary';
  };

  const getTypeBadge = () => {
    if (story.storyType === 'rekt') return 'bg-rekt/10 text-rekt border-rekt/20';
    if (story.storyType === 'rich') return 'bg-rich/10 text-rich border-rich/20';
    return 'bg-gray-100 text-text-secondary border-gray-200';
  };

  const handleTip = async (amount: number) => {
    // In a real app, this would initiate the tipping transaction
    console.log(`Tipping ${amount} USDC to story ${story.storyId}`);
    // Show success message
    alert(`Successfully tipped $${amount} USDC! 🎉`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-sm text-sm font-medium border ${getTypeBadge()}`}>
                  {story.storyType === 'rekt' ? '📉 REKT' : '📈 RICH'}
                </span>
                <span className="text-sm text-text-secondary">
                  {formatDistanceToNow(new Date(story.timestamp), { addSuffix: true })}
                </span>
              </div>
              <h2 className={`text-heading mb-4 ${getTypeColor()}`}>
                {story.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary text-xl ml-4"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-body leading-relaxed whitespace-pre-wrap">
              {story.content}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-text-secondary mb-6 p-4 bg-gray-50 rounded-md">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                💰 {story.tipCount} tips
              </span>
              <span className="flex items-center">
                💵 ${story.totalTipped.toFixed(2)} USDC
              </span>
            </div>
          </div>

          {/* Tip Button */}
          <div className="flex justify-center">
            <TipButton onTip={handleTip} />
          </div>

          {/* Footer */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-xs text-text-secondary text-center">
              🔗 This story is permanently stored on-chain and immutable
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
