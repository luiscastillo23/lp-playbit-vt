import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseClasses =
    'font-display font-bold text-[11px] sm:text-xs tracking-[0.18em] uppercase px-8 sm:px-11 py-4 sm:py-5 rounded-full transition-all duration-200 active:scale-95 whitespace-nowrap';

  const variants = {
    primary:
      'bg-[#F85E10] text-white shadow-[0_12px_24px_-6px_rgba(248,94,16,0.55)] hover:bg-[#e04f06] hover:shadow-[0_16px_30px_-6px_rgba(248,94,16,0.7)]',
    secondary:
      'bg-white text-[#F85E10] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] hover:bg-gray-50 hover:shadow-[0_14px_28px_-5px_rgba(0,0,0,0.12)]',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
