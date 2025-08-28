"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface PostStoryModalProps {
  onClose: () => void;
}

export function PostStoryModal({ onClose }: PostStoryModalProps) {
  const [storyType, setStoryType] = useState<'rekt' | 'rich'>('rekt');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    
    // TODO: Implement actual story submission
    const storyData = {
      storyId: uuidv4(),
      storyType,
      title: title.trim() || undefined,
      content: content.trim(),
      timestamp: Math.floor(Date.now() / 1000),
    };

    console.log('Submitting story:', storyData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-heading text-text-primary">Share Your Story</h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary text-xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Story Type
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setStoryType('rekt')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    storyType === 'rekt'
                      ? 'bg-rekt text-white'
                      : 'bg-surface border border-text-secondary/20 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  💸 Rekt
                </button>
                <button
                  type="button"
                  onClick={() => setStoryType('rich')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    storyType === 'rich'
                      ? 'bg-rich text-white'
                      : 'bg-surface border border-text-secondary/20 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  💰 Rich
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your story a title..."
                className="input-field w-full"
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Your Story *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your crypto journey... What happened? How did it feel? What did you learn?"
                className="textarea-field w-full h-32"
                required
                maxLength={1000}
              />
              <div className="text-xs text-text-secondary mt-1">
                {content.length}/1000 characters
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-md p-3">
              <div className="flex items-start space-x-2">
                <span className="text-accent text-sm">🔒</span>
                <div className="text-xs text-text-secondary">
                  <p className="font-medium text-text-primary mb-1">Anonymous & Immutable</p>
                  <p>Your story will be stored permanently on-chain. No personal information is collected or stored.</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary"
                disabled={isSubmitting || !content.trim()}
              >
                {isSubmitting ? 'Posting...' : 'Post Story'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
