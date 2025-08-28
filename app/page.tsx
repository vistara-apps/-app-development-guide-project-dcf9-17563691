
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
import { useEffect, useMemo, useState, useCallback } from "react";
import { StoryFeed } from "./components/StoryFeed";
import { PostButton } from "./components/PostButton";
import { PostModal } from "./components/PostModal";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
        >
          + Save Frame
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-green-600 animate-fade-in">
          <span>✓</span>
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="min-h-screen bg-bg">
      <div className="container-app py-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-display text-text-primary mb-1">
              Crypto Confessions
            </h1>
            <p className="text-body text-text-secondary">
              Share your wins and losses, anonymously
            </p>
          </div>
          <div className="flex items-center space-x-4">
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
        <div className="mb-6">
          <PostButton
            variant="primary"
            onClick={() => setPostModalOpen(true)}
            className="w-full"
          >
            📝 Share Your Story
          </PostButton>
        </div>

        {/* Story Feed */}
        <main>
          <StoryFeed />
        </main>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-text-secondary/10 text-center">
          <button
            onClick={() => openUrl("https://base.org/builders/minikit")}
            className="text-text-secondary hover:text-text-primary text-sm transition-colors"
          >
            Built on Base with MiniKit
          </button>
        </footer>

        {/* Post Modal */}
        <PostModal
          isOpen={postModalOpen}
          onClose={() => setPostModalOpen(false)}
        />
      </div>
    </div>
  );
}
