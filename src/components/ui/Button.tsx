import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  id?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-maroon-700 text-white hover:bg-maroon-800 shadow-warm',
  secondary: 'bg-gold-500 text-white hover:bg-gold-600',
  ghost: 'bg-transparent text-maroon-700 hover:bg-cream-200 border border-maroon-700/20',
  whatsapp: 'bg-whatsapp text-white hover:brightness-110',
  outline: 'bg-transparent text-white border border-white/60 hover:bg-white/10',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className,
  external,
  type = 'button',
  disabled,
  id,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        id={id}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      id={id}
    >
      {children}
    </button>
  );
}
