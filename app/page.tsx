"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { StoryFeed } from "./components/StoryFeed";
import { PostButton } from "./components/PostButton";
import { PostModal } from "./components/PostModal";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  // Initialize MiniKit
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleAddFrame = useCallback(async () => {
    try {
      const frameAdded = await addFrame();
      setFrameAdded(Boolean(frameAdded));
      
      // Show success feedback
      if (frameAdded) {
        // Create an accessible announcement
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = 'Frame saved successfully!';
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
          document.body.removeChild(announcement);
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to add frame:', error);
    }
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="btn-outline text-sm py-1.5 px-3"
          aria-label="Save frame to Farcaster"
        >
          <span className="mr-1.5">+</span>
          <span>Save Frame</span>
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1.5 text-sm font-medium text-success bg-success-light px-3 py-1.5 rounded-md animate-fade-in">
          <span>✓</span>
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="min-h-screen bg-bg">
      <div className="container-app py-6">
        {/* Skip to content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md"
        >
          Skip to content
        </a>
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-display text-text-primary mb-2 leading-tight">
              Crypto Confessions
            </h1>
            <p className="text-body text-text-secondary max-w-md">
              Share your crypto wins and losses, anonymously and securely
            </p>
          </div>
          <div className="flex items-center space-x-4 self-end sm:self-auto">
            {saveFrameButton}
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </header>

        {/* Share Story Button */}
        <div className="mb-8">
          <button
            onClick={() => setPostModalOpen(true)}
            className="btn-primary w-full py-3 text-base font-medium shadow-lg hover:shadow-md transition-all duration-250 group"
            aria-label="Share your crypto story"
          >
            <span className="inline-block mr-2 group-hover:scale-110 transition-transform duration-250">📝</span>
            <span>Share Your Story</span>
          </button>
        </div>

        {/* Story Feed */}
        <main id="main-content" ref={mainRef} tabIndex={-1}>
          <StoryFeed />
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-text-secondary/10 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-text-secondary">
            <button
              onClick={() => openUrl("https://base.org/builders/minikit")}
              className="hover:text-text-primary transition-colors"
              aria-label="Learn about Base MiniKit"
            >
              Built on Base with MiniKit
            </button>
            <span className="hidden sm:inline text-text-tertiary">•</span>
            <button
              onClick={() => openUrl("https://farcaster.xyz")}
              className="hover:text-text-primary transition-colors"
              aria-label="Learn about Farcaster"
            >
              Powered by Farcaster
            </button>
          </div>
          <p className="mt-4 text-xs text-text-tertiary">
            © {new Date().getFullYear()} Crypto Confessions
          </p>
        </footer>

        {/* Post Modal */}
        <PostModal
          isOpen={postModalOpen}
          onClose={() => setPostModalOpen(false)}
        />
        
        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-hover transition-colors z-20"
            aria-label="Scroll to top"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
