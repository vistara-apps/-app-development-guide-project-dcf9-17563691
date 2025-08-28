
"use client";

interface PostButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function PostButton({ 
  variant = 'primary', 
  onClick, 
  children, 
  className = '' 
}: PostButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105";
  
  const variantStyles = {
    primary: "bg-primary hover:bg-primary/90 text-white shadow-lg",
    secondary: "bg-surface hover:bg-surface/90 text-text-primary border border-text-secondary/20 shadow-card"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
