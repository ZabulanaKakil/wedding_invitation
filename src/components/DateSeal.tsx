type DateSealProps = {
  day: number
  className?: string
}

/** Wax-seal mark for the highlighted calendar day. */
export function DateSeal({ day, className = '' }: DateSealProps) {
  return (
    <span
      className={`relative inline-flex aspect-square w-full items-center justify-center ${className}`}
      aria-current="date"
    >
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-[-18%] h-[136%] w-[136%] drop-shadow-[0_6px_14px_rgba(13,26,20,0.42)]"
        aria-hidden
      >
        <defs>
          <radialGradient id="sealWax" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#3d6654" />
            <stop offset="45%" stopColor="#1f3a2e" />
            <stop offset="100%" stopColor="#12241c" />
          </radialGradient>
          <radialGradient id="sealShine" cx="35%" cy="28%" r="55%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.24" />
            <stop offset="55%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sealGold" x1="0" y1="0" x2="120" y2="120">
            <stop offset="0%" stopColor="#e8d7a8" />
            <stop offset="40%" stopColor="#c9a96e" />
            <stop offset="70%" stopColor="#a8884a" />
            <stop offset="100%" stopColor="#e8d7a8" />
          </linearGradient>
        </defs>

        <path
          fill="url(#sealWax)"
          d="M60 6
            C66 6 70 10 74 8 C79 5 84 8 86 13 C88 17 93 18 96 22
            C100 27 98 33 100 38 C102 43 106 46 106 52
            C106 58 102 61 100 66 C98 71 100 77 96 82
            C93 86 88 87 86 91 C84 96 79 99 74 96
            C70 94 66 98 60 98
            C54 98 50 94 46 96 C41 99 36 96 34 91
            C32 87 27 86 24 82 C20 77 22 71 20 66
            C18 61 14 58 14 52 C14 46 18 43 20 38
            C22 33 20 27 24 22 C27 18 32 17 34 13
            C36 8 41 5 46 8 C50 10 54 6 60 6Z"
        />

        <circle
          cx="60"
          cy="52"
          r="38"
          fill="none"
          stroke="url(#sealGold)"
          strokeWidth="2.4"
          opacity="0.95"
        />
        <circle
          cx="60"
          cy="52"
          r="33.5"
          fill="none"
          stroke="#c9a96e"
          strokeWidth="1"
          opacity="0.55"
        />

        <g fill="#e8d7a8" opacity="0.9">
          <circle cx="60" cy="21.5" r="1.35" />
          <circle cx="72" cy="23.5" r="1.35" />
          <circle cx="82" cy="30" r="1.35" />
          <circle cx="89" cy="40" r="1.35" />
          <circle cx="91.5" cy="52" r="1.35" />
          <circle cx="89" cy="64" r="1.35" />
          <circle cx="82" cy="74" r="1.35" />
          <circle cx="72" cy="80.5" r="1.35" />
          <circle cx="60" cy="82.5" r="1.35" />
          <circle cx="48" cy="80.5" r="1.35" />
          <circle cx="38" cy="74" r="1.35" />
          <circle cx="31" cy="64" r="1.35" />
          <circle cx="28.5" cy="52" r="1.35" />
          <circle cx="31" cy="40" r="1.35" />
          <circle cx="38" cy="30" r="1.35" />
          <circle cx="48" cy="23.5" r="1.35" />
        </g>

        <ellipse cx="48" cy="40" rx="22" ry="16" fill="url(#sealShine)" />

        <path
          d="M42 34 C48 30 54 30 60 34 C66 30 72 30 78 34"
          stroke="#c9a96e"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
      </svg>

      <span className="relative z-10 font-seal text-[1.25rem] font-semibold tracking-wide text-[var(--pearl)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]">
        {day}
      </span>
    </span>
  )
}
