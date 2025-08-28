"use client";

import { useState, useEffect, useRef } from "react";
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
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
  }>({});
  
  // Refs for focus management
  const modalRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      // Reset form state
      setErrors({});
      
      // Focus the title input when modal opens
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
      
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
      
      // Close modal on escape key
      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !posting) {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleTabKey);
      document.addEventListener('keydown', handleEscapeKey);
      
      return () => {
        document.removeEventListener('keydown', handleTabKey);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, posting, onClose]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: {title?: string; content?: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Please enter a title for your story';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Please share your story';
    } else if (content.trim().length < 20) {
      newErrors.content = 'Story must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePost = async () => {
    if (!validateForm()) {
      // Focus the first field with an error
      if (errors.title) {
        titleInputRef.current?.focus();
      }
      return;
    }

    setPosting(true);
    try {
      // Mock posting process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.setAttribute('role', 'status');
      successMessage.setAttribute('aria-live', 'polite');
      successMessage.className = 'sr-only';
      successMessage.textContent = 'Story posted successfully!';
      document.body.appendChild(successMessage);
      
      // Reset form and close modal
      setTitle('');
      setContent('');
      setAuthorMessage('');
      onClose();
      
      // Remove success message after announcement
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 1000);
    } catch (error) {
      setErrors({
        ...errors,
        content: 'Failed to post story. Please try again.'
      });
    } finally {
      setPosting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Trap focus within this element */}
      <div 
        ref={modalRef}
        className="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up shadow-modal"
        onKeyDown={(e) => {
          if (e.key === 'Escape' && !posting) {
            onClose();
          }
        }}
      >
        <div className="sticky top-0 bg-surface border-b border-text-secondary/10 p-6 flex items-center justify-between z-10">
          <h2 id="modal-title" className="text-2xl font-semibold text-text-primary">Share Your Story</h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg transition-colors"
            aria-label="Close modal"
            disabled={posting}
          >
            ×
          </button>
        </div>

        <form 
          className="p-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handlePost();
          }}
        >
          {/* Story Type Selection */}
          <fieldset>
            <legend className="form-label mb-3">Story Type</legend>
            <div className="flex flex-col sm:flex-row gap-3">
              <label
                className={`flex-1 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  storyType === 'rekt' 
                    ? 'border-rekt bg-rekt-light' 
                    : 'border-text-secondary/20 hover:border-rekt/50'
                }`}
              >
                <input 
                  type="radio" 
                  name="storyType" 
                  value="rekt" 
                  checked={storyType === 'rekt'}
                  onChange={() => setStoryType('rekt')}
                  className="sr-only"
                  aria-label="Rekt story type"
                />
                <div className="text-2xl mb-2">💸</div>
                <div className="font-medium">Rekt Story</div>
                <div className="text-sm text-text-secondary">Share your losses and lessons</div>
              </label>
              <label
                className={`flex-1 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  storyType === 'rich' 
                    ? 'border-rich bg-rich-light' 
                    : 'border-text-secondary/20 hover:border-rich/50'
                }`}
              >
                <input 
                  type="radio" 
                  name="storyType" 
                  value="rich" 
                  checked={storyType === 'rich'}
                  onChange={() => setStoryType('rich')}
                  className="sr-only"
                  aria-label="Rich story type"
                />
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-medium">Rich Story</div>
                <div className="text-sm text-text-secondary">Share your wins and success</div>
              </label>
            </div>
          </fieldset>

          {/* Title */}
          <div>
            <label htmlFor="story-title" className="form-label">Title</label>
            <input
              id="story-title"
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors({...errors, title: undefined});
                }
              }}
              placeholder="Give your story a catchy title..."
              className={`form-input ${errors.title ? 'border-error focus:ring-error' : ''}`}
              maxLength={100}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : "title-hint"}
              required
            />
            {errors.title ? (
              <p id="title-error" className="form-error">{errors.title}</p>
            ) : (
              <p id="title-hint" className="form-helper">{title.length}/100 characters</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label htmlFor="story-content" className="form-label">Your Story</label>
            <textarea
              id="story-content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errors.content) {
                  setErrors({...errors, content: undefined});
                }
              }}
              placeholder="Tell your crypto journey... What happened? How did it feel? What did you learn?"
              className={`form-input h-40 resize-none ${errors.content ? 'border-error focus:ring-error' : ''}`}
              maxLength={2000}
              aria-invalid={!!errors.content}
              aria-describedby={errors.content ? "content-error" : "content-hint"}
              required
            />
            {errors.content ? (
              <p id="content-error" className="form-error">{errors.content}</p>
            ) : (
              <p id="content-hint" className="form-helper">{content.length}/2000 characters</p>
            )}
          </div>

          {/* Optional Author Message */}
          <div>
            <label htmlFor="author-message" className="form-label">
              Author Message <span className="text-text-secondary">(optional)</span>
            </label>
            <textarea
              id="author-message"
              value={authorMessage}
              onChange={(e) => setAuthorMessage(e.target.value)}
              placeholder="Any additional thoughts or advice for readers..."
              className="form-input h-20 resize-none"
              maxLength={500}
              aria-describedby="message-hint"
            />
            <p id="message-hint" className="form-helper">{authorMessage.length}/500 characters</p>
          </div>

          {/* Anonymous Notice */}
          <div className="bg-primary-light p-4 rounded-md">
            <div className="flex items-start space-x-3">
              <span className="text-lg mt-0.5">🔒</span>
              <div>
                <p className="text-sm font-medium text-text-primary">Anonymous Posting</p>
                <p className="text-xs text-text-secondary">
                  Your story will be posted anonymously. No personal information will be attached to your story.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={posting}
              aria-label="Cancel posting"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={posting}
              aria-label="Post story anonymously"
              aria-busy={posting}
            >
              {posting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" aria-hidden="true"></div>
                  <span>Posting...</span>
                </div>
              ) : (
                'Post Anonymously'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
