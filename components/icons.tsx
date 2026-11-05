// Icônes au trait fin, dessinées pour le site (1,25 px, bouts arrondis).
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.25, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const PhoneIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 4h3.2l1.6 4-2 1.3a10 10 0 0 0 6.9 6.9l1.3-2 4 1.6V19a1.8 1.8 0 0 1-1.9 1.8C10.4 20.3 3.7 13.6 3.2 5.9A1.8 1.8 0 0 1 5 4Z" />
  </svg>
);
export const InstagramIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
export const ArrowIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 12h15M14 7l5 5-5 5" />
  </svg>
);
export const CloseIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const MenuIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const PinIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);
export const StarIcon = ({ className = "size-3.5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="m12 3.2 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7Z" />
  </svg>
);
export const PlusIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const ChevronIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
export const FacebookIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M14 21v-7.5h2.6l.4-3H14V8.7c0-.9.3-1.5 1.5-1.5H17V4.5a19 19 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.2H8.3v3H11V21" />
  </svg>
);

/**
 * Le motif du salon : une paire de ciseaux et un coupe-choux croisés, au trait fin.
 * Dessinés droits puis tournés de ±32° autour du centre (24, 24).
 */
export function CrossedTools({ className = "size-10", strokeWidth = 1.1 }: P & { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} strokeWidth={strokeWidth}>
      <g transform="rotate(40 24 24)">
        <Scissors />
      </g>
      <g transform="rotate(-40 24 24)">
        <Razor />
      </g>
    </svg>
  );
}

/** Ciseaux droits, pointes en haut, pivot en (24, 22). */
export const Scissors = ({ open = 0 }: { open?: number }) => (
  <>
    <g style={{ transform: `rotate(${-open}deg)`, transformOrigin: "24px 22px" }} className="blade-a">
      <path d="M22.4 31.6 24 22l1.7-17.3c.1-.8.6-.9.7 0 .3 3.9-.3 10.3-1.8 17.6" />
      <circle cx="20.6" cy="36.4" r="4.4" />
    </g>
    <g style={{ transform: `rotate(${open}deg)`, transformOrigin: "24px 22px" }} className="blade-b">
      <path d="M25.6 31.6 24 22 22.3 4.7c-.1-.8-.6-.9-.7 0-.3 3.9.3 10.3 1.8 17.6" />
      <circle cx="27.4" cy="36.4" r="4.4" />
    </g>
    <circle cx="24" cy="22" r="0.7" fill="currentColor" stroke="none" />
  </>
);

/** Coupe-choux ouvert, lame en haut, manche en bas. */
export const Razor = () => (
  <>
    <path d="M22.3 21.5V6.8c0-1.2.8-2.1 2-2.1h3.4c.9 0 1.4.7 1.2 1.6l-2.4 13.1c-.3 1.4-1.5 2.1-2.8 2.1Z" />
    <path d="M22.3 9.2h2.2" />
    <path d="M22.6 23.4c-.5 6.4-.3 13.6.6 19.4.2 1 .9 1.5 1.6 1.5s1.3-.6 1.3-1.5c-.2-5.8-.5-12.8-1-19.2" />
    <circle cx="23.9" cy="22.6" r="0.7" fill="currentColor" stroke="none" />
  </>
);
