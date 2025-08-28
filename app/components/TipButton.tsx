
"use client";

interface TipButtonProps {
  variant?: 'usdc';
  amount: number;
  onClick?: () => void;
  className?: string;
}

export function TipButton({ 
  variant = 'usdc', 
  amount, 
  onClick, 
  className = '' 
}: TipButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 ${className}`}
    >
      💰 ${amount.toFixed(2)} USDC
    </button>
  );
}
