import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';
  
  const variants = {
    primary: 'bg-[var(--accent-color)] text-[var(--text-inverse)] hover:bg-[var(--accent-color-hover)]',
    secondary: 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-dashboard)]',
    ghost: 'text-[var(--text-primary)] hover:bg-[var(--bg-card)] hover:text-[var(--accent-color)]',
    danger: 'bg-[var(--color-down)] text-white hover:opacity-90',
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  const btnClass = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      disabled={disabled || isLoading}
      className={btnClass}
      style={{ cursor: disabled || isLoading ? 'not-allowed' : 'pointer' }}
      {...props}
    >
      {isLoading ? (
        <span
          className="animate-spin rounded-full border-2 border-current border-t-transparent"
          style={{ width: '1em', height: '1em' }}
          role="status"
          aria-label="loading"
        />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};

export default Button;
