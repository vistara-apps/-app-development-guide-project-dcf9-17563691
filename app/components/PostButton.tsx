"use client";

import { ButtonHTMLAttributes } from 'react';

interface PostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export function PostButton({ 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick, 
  children, 
  className = '',
  disabled,
  type = 'button',
  ...props
}: PostButtonProps) {
  // Base styles for all buttons
  const baseStyles = "font-medium rounded-lg transition-all duration-250 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
  
  // Size variations
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5",
    lg: "px-6 py-3 text-lg"
  };
  
  // Variant styles
  const variantStyles = {
    primary: "bg-primary hover:bg-primary-hover text-white shadow-button hover:shadow-none disabled:bg-primary/50",
    secondary: "bg-surface hover:bg-surface-hover text-text-primary border border-text-secondary/20 shadow-button hover:shadow-none disabled:bg-surface/80",
    outline: "bg-transparent hover:bg-primary-light text-primary border border-primary/20 hover:border-primary/40 disabled:border-primary/10 disabled:text-primary/50",
    text: "bg-transparent hover:bg-primary-light text-primary disabled:text-primary/50"
  };

  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";

  // Loading state
  const loadingState = loading ? "relative !text-transparent pointer-events-none" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${loadingState} ${className}`}
      {...props}
    >
      {/* Icon on the left */}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2 flex items-center">{icon}</span>
      )}
      
      {/* Button text */}
      {children}
      
      {/* Icon on the right */}
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2 flex items-center">{icon}</span>
      )}
      
      {/* Loading spinner */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
    </button>
  );
}
