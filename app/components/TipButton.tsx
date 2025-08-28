"use client";

interface TipButtonProps {
  amount: number;
  onTip: (amount: number) => void;
}

export function TipButton({ amount, onTip }: TipButtonProps) {
  return (
    <button
      onClick={() => onTip(amount)}
      className="bg-accent/10 hover:bg-accent/20 text-accent text-xs px-3 py-1 rounded-md transition-colors font-medium"
    >
      ${amount} USDC
    </button>
  );
}
