import { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
  level?: 'h1' | 'h2' | 'h3';
  size?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
}

export function Title({ children, level = 'h1', size = '3xl' }: TitleProps) {
  const Tag = level;
  const sizeClasses = {
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    '7xl': 'text-7xl',
    '8xl': 'text-8xl',
    '9xl': 'text-9xl',
  };

  return (
    <Tag
      className={`${sizeClasses[size]} font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent`}
    >
      {children}
    </Tag>
  );
}
