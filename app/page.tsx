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
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { StoryFeed } from "./components/StoryFeed";
import { PostStoryModal } from "./components/PostStoryModal";
import { FilterTabs } from "./components/FilterTabs";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'rekt' | 'rich'>('all');

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
          className="text-accent text-sm font-medium hover:text-accent/80 transition-colors"
        >
          + Save
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-rich animate-fade-in">
          <span>✓ Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="w-full max-w-xl mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-text-primary">Crypto Confessions</h1>
              <p className="text-xs text-text-secondary">Anonymous crypto stories</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit text-sm" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
            {saveFrameButton}
          </div>
        </header>

        <main className="flex-1 space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-heading text-text-primary">Share Your Story</h2>
            <p className="text-body text-text-secondary">
              Anonymous crypto wins and losses, stored forever on-chain
            </p>
            <button
              onClick={() => setShowPostModal(true)}
              className="btn-primary text-sm px-6 py-3 rounded-lg font-medium"
            >
              Share Your Story
            </button>
          </div>

          <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          
          <StoryFeed filter={activeFilter} />
        </main>

        <footer className="mt-8 pt-4 flex justify-center">
          <button
            className="text-text-secondary text-xs hover:text-text-primary transition-colors"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </button>
        </footer>
      </div>

      {showPostModal && (
        <PostStoryModal onClose={() => setShowPostModal(false)} />
      )}
    </div>
  );
}
