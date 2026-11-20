type QuantumLogoProps = { className?: string; showWordmark?: boolean };

export function QuantumLogo({ className = "", showWordmark = true }: QuantumLogoProps) {
  return (
    <span className={`quantum-brand-lockup ${className}`.trim()} aria-label="Quantum">
      <svg className="quantum-brand-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path d="M46 45A21 21 0 1 1 46 19" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="square" strokeLinejoin="round" />
        <path d="m37 37 17 17" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="square" />
      </svg>
      {showWordmark && <span className="quantum-brand-word">QUANTUM</span>}
    </span>
  );
}
