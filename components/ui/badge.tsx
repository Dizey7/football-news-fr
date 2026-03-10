import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'border-transparent bg-emerald-500 text-white',
    secondary: 'border-transparent bg-white/10 text-white/80',
    destructive: 'border-transparent bg-red-500 text-white',
    outline: 'border-white/20 text-white/70 bg-transparent',
  };
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
