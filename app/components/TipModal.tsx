
"use client";

import { useState } from "react";
import { Story } from "../types";
import { TipButton } from "./TipButton";

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story;
}

export function TipModal({ isOpen, onClose, story }: TipModalProps) {
  const [customAmount, setCustomAmount] = useState('');
  const [tipping, setTipping] = useState(false);

  if (!isOpen) return null;

  const handleTip = async (amount: number) => {
    setTipping(true);
    try {
      // Mock tip transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`Successfully tipped $${amount.toFixed(2)} USDC!`);
      onClose();
    } catch (error) {
      alert('Failed to send tip. Please try again.');
    } finally {
      setTipping(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg max-w-md w-full p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-heading text-text-primary">Tip This Story</h3>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary text-xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4 p-4 bg-bg rounded-md">
          <p className="text-sm text-text-secondary mb-1">Story:</p>
          <p className="text-body text-text-primary font-medium">{story.title}</p>
        </div>

        <div className="space-y-3 mb-4">
          <p className="text-body text-text-secondary">Choose tip amount:</p>
          
          <div className="grid grid-cols-3 gap-2">
            <TipButton amount={0.10} onClick={() => handleTip(0.10)} />
            <TipButton amount={0.25} onClick={() => handleTip(0.25)} />
            <TipButton amount={1.00} onClick={() => handleTip(1.00)} />
          </div>

          <div>
            <input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-3 py-2 border border-text-secondary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              step="0.01"
              min="0.01"
            />
            {customAmount && (
              <button
                onClick={() => handleTip(parseFloat(customAmount))}
                className="w-full mt-2 btn-primary"
                disabled={!customAmount || parseFloat(customAmount) <= 0}
              >
                Tip ${parseFloat(customAmount || '0').toFixed(2)} USDC
              </button>
            )}
          </div>
        </div>

        {tipping && (
          <div className="text-center text-text-secondary">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
            Processing tip...
          </div>
        )}
      </div>
    </div>
  );
}
