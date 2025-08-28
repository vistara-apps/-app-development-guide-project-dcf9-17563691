
"use client";

interface PostButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function PostButton({ 
  variant = 'primary', 
  children, 
  onClick, 
  disabled = false,
  className = ''
}: PostButtonProps) {
  const baseClasses = "font-medium px-4 py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
