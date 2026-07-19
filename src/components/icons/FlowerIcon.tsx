export function FlowerIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      <path d="M12 6v12" />
      <path d="M6 12h12" />
      <circle cx="12" cy="12" r="3" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
      <path d="M7.76 7.76a6 6 0 0 0 0 8.49" />
      <path d="M16.24 16.24a6 6 0 0 1 0-8.49" />
      <path d="M7.76 16.24a6 6 0 0 0 0-8.49" />
    </svg>
  );
}