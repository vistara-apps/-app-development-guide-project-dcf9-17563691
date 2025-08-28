"use client";

import { Story } from "../types";
import { useEffect, useRef, useState } from "react";
import { PostButton } from "./PostButton";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story;
}

export function StoryModal({ isOpen, onClose, story }: StoryModalProps) {
  const [isSharing, setIsSharing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Format the date in a more readable way
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Handle keyboard navigation and accessibility
  useEffect(() => {
    if (isOpen) {
      // Focus the modal when it opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
      
      // Handle escape key to close modal
      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      // Trap focus within modal
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };
      
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('keydown', handleTabKey);
      
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
        document.removeEventListener('keydown', handleTabKey);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTypeEmoji = () => {
    return story.storyType === 'rekt' ? '💸' : '🚀';
  };

  const getBadgeClass = () => {
    return story.storyType === 'rekt' ? 'badge-rekt' : 'badge-rich';
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Crypto Confession: ${story.title}`,
          text: `Check out this crypto confession: ${story.title}`,
          url: window.location.href,
        });
      } else {
        // Fallback - copy to clipboard
        await navigator.clipboard.writeText(
          `Crypto Confession: ${story.title}\n\n${story.content.substring(0, 100)}...\n\n${window.location.href}`
        );
        
        // Show success message
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up shadow-modal"
      >
        <div className="sticky top-0 bg-surface border-b border-text-secondary/10 p-6 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{getTypeEmoji()}</div>
            <div>
              <h2 id="story-modal-title" className="text-2xl font-semibold text-text-primary">{story.title}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className={`badge ${getBadgeClass()}`}>
                  {story.storyType === 'rekt' ? 'Rekt Story' : 'Rich Story'}
                </span>
                <span className="text-sm text-text-secondary">
                  {formatDate(story.timestamp)}
                </span>
              </div>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg transition-colors"
            aria-label="Close story"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-body text-text-primary leading-relaxed whitespace-pre-wrap">
              {story.content}
            </p>
          </div>

          {story.authorMessage && (
            <div className="mt-8 p-5 bg-primary-light rounded-md border-l-4 border-primary">
              <p className="text-sm font-medium text-text-primary mb-2">Author's note:</p>
              <p className="text-body text-text-primary italic">{story.authorMessage}</p>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-text-secondary/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {story.tipCount > 0 && (
                <div className="tooltip">
                  <div className="flex items-center text-sm font-medium text-text-primary bg-bg px-3 py-1.5 rounded-full">
                    <span className="mr-1.5">💰</span>
                    <span>{story.tipCount} {story.tipCount === 1 ? 'tip' : 'tips'}</span>
                  </div>
                  <span className="tooltip-text">
                    This story has received {story.tipCount} tips
                  </span>
                </div>
              )}
              
              {story.totalTipped > 0 && (
                <div className="tooltip">
                  <div className="flex items-center text-sm font-medium text-text-primary bg-bg px-3 py-1.5 rounded-full">
                    <span className="text-xs text-text-secondary mr-1">$</span>
                    <span>{story.totalTipped.toFixed(2)} USDC</span>
                  </div>
                  <span className="tooltip-text">
                    Total amount tipped: ${story.totalTipped.toFixed(2)} USDC
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <PostButton
                variant="outline"
                size="md"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                  </svg>
                }
                onClick={handleShare}
                loading={isSharing}
                aria-label="Share this story"
              >
                Share
              </PostButton>
              
              <PostButton
                variant="primary"
                size="md"
                icon={<span>💰</span>}
                aria-label="Tip this story"
              >
                Tip Story
              </PostButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
