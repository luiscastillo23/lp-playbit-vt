import React from 'react';

interface DisplayTextProps {
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const DisplayText: React.FC<DisplayTextProps> = ({
  children,
  align = 'left',
  className = '',
}) => {
  const stretchClass =
    align === 'right' ? 'font-display-stretched-right' : 'font-display-stretched';

  return (
    <div
      className={`${stretchClass} font-black text-[17vw] lg:text-[11.2vw] text-white leading-[0.85] tracking-wider uppercase select-none ${className}`}
    >
      {children}
    </div>
  );
};
