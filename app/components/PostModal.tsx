
"use client";

import { useState } from "react";
import { PostButton } from "./PostButton";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostModal({ isOpen, onClose }: PostModalProps) {
  const [storyType, setStoryType] = useState<'rekt' | 'rich'>('rekt');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorMessage, setAuthorMessage] = useState('');
  const [posting, setPosting] = useState(false);

  if (!isOpen) return null;

  const handlePost = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and story content');
      return;
    }

    setPosting(true);
    try {
      // Mock posting process
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('Story posted successfully!');
      onClose();
      // Reset form
      setTitle('');
      setContent('');
      setAuthorMessage('');
    } catch (error) {
      alert('Failed to post story. Please try again.');
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-surface border-b border-text-secondary/10 p-6 flex items-center justify-between">
          <h2 className="text-heading text-text-primary">Share Your Story</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary text-xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Story Type Selection */}
          <div>
            <label className="block text-body text-text-primary mb-3">Story Type</label>
            <div className="flex space-x-3">
              <button
                onClick={() => setStoryType('rekt')}
                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                  storyType === 'rekt' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-text-secondary/20 hover:border-red-500/50'
                }`}
              >
                <div className="text-2xl mb-2">💸</div>
                <div className="font-medium">Rekt Story</div>
                <div className="text-sm text-text-secondary">Share your losses and lessons</div>
              </button>
              <button
                onClick={() => setStoryType('rich')}
                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                  storyType === 'rich' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-text-secondary/20 hover:border-green-500/50'
                }`}
              >
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-medium">Rich Story</div>
                <div className="text-sm text-text-secondary">Share your wins and success</div>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-body text-text-primary mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your story a catchy title..."
              className="w-full px-3 py-2 border border-text-secondary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={100}
            />
            <div className="text-xs text-text-secondary mt-1">{title.length}/100</div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-body text-text-primary mb-2">Your Story</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell your crypto journey... What happened? How did it feel? What did you learn?"
              className="w-full px-3 py-2 border border-text-secondary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-40 resize-none"
              maxLength={2000}
            />
            <div className="text-xs text-text-secondary mt-1">{content.length}/2000</div>
          </div>

          {/* Optional Author Message */}
          <div>
            <label className="block text-body text-text-primary mb-2">
              Author Message <span className="text-text-secondary">(optional)</span>
            </label>
            <textarea
              value={authorMessage}
              onChange={(e) => setAuthorMessage(e.target.value)}
              placeholder="Any additional thoughts or advice for readers..."
              className="w-full px-3 py-2 border border-text-secondary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-20 resize-none"
              maxLength={500}
            />
            <div className="text-xs text-text-secondary mt-1">{authorMessage.length}/500</div>
          </div>

          {/* Anonymous Notice */}
          <div className="bg-bg p-4 rounded-md">
            <div className="flex items-start space-x-2">
              <span className="text-lg">🔒</span>
              <div>
                <p className="text-sm font-medium text-text-primary">Anonymous Posting</p>
                <p className="text-xs text-text-secondary">
                  Your story will be posted anonymously. No personal information will be attached to your story.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 btn-secondary"
              disabled={posting}
            >
              Cancel
            </button>
            <PostButton
              variant="primary"
              onClick={handlePost}
              className="flex-1"
            >
              {posting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Posting...</span>
                </div>
              ) : (
                'Post Anonymously'
              )}
            </PostButton>
          </div>
        </div>
      </div>
    </div>
  );
}
