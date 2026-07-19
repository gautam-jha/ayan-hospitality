export function HelicopterIcon({ className = "w-6 h-6" }: { className?: string }) {
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
      <path d="M19 8V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v3" />
      <path d="M3 11v2c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2" />
      <path d="M5 11v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
      <path d="M9 11v6" />
      <path d="M15 11v6" />
      <path d="M8 5h8" />
      <path d="M12 5v-2" />
    </svg>
  );
}