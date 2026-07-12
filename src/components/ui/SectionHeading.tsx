import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'text-xs font-semibold tracking-[0.2em] uppercase mb-3',
            light ? 'text-gold-400' : 'text-gold-500'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-display text-4xl lg:text-5xl font-semibold leading-tight',
          light ? 'text-cream-100' : 'text-maroon-700'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base lg:text-lg leading-relaxed max-w-2xl',
            centered && 'mx-auto',
            light ? 'text-cream-300/80' : 'text-charcoal-muted'
          )}
        >
          {subtitle}
        </p>
      )}
      <div className={cn('mt-5 flex items-center gap-3', centered && 'justify-center')}>
        <div className={cn('h-px flex-1 max-w-12', light ? 'bg-gold-500/40' : 'bg-gold-500/30')} />
        <svg className={cn('w-4 h-4 shrink-0', light ? 'text-gold-400' : 'text-gold-500')} viewBox="0 0 16 16" fill="none">
          <path d="M8 1L9.5 6.5H15L10.5 9.5L12 15L8 12L4 15L5.5 9.5L1 6.5H6.5L8 1Z" fill="currentColor" fillOpacity="0.4"/>
          <circle cx="8" cy="8" r="2" fill="currentColor"/>
        </svg>
        <div className={cn('h-px flex-1 max-w-12', light ? 'bg-gold-500/40' : 'bg-gold-500/30')} />
      </div>
    </div>
  );
}
