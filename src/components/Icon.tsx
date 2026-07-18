import type { ReactNode } from 'react'

type IconName =
  | 'construction'
  | 'logistics'
  | 'healthcare'
  | 'manufacturing'
  | 'retail'
  | 'professional'
  | 'training'
  | 'agents'
  | 'ops'
  | 'saudi'
  | 'platform'
  | 'roi'
  | 'human'
  | 'check'
  | 'menu'
  | 'close'

const paths: Record<IconName, ReactNode> = {
  construction: (
    <>
      <path d="M2 20h20" />
      <path d="M5 20V10l7-6 7 6v10" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  logistics: (
    <>
      <path d="M3 17h13v-7H3z" />
      <path d="M16 12h4l2 3v2h-6z" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="18.5" cy="17.5" r="1.5" />
    </>
  ),
  healthcare: (
    <>
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <rect x="4" y="4" width="16" height="16" rx="3" />
    </>
  ),
  manufacturing: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V10l5 3V10l5 3V8l4 2v11" />
    </>
  ),
  retail: (
    <>
      <path d="M6 7h12l1 13H5L6 7z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </>
  ),
  professional: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </>
  ),
  training: (
    <>
      <path d="M12 3 2 8l10 5 10-5-10-5z" />
      <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
    </>
  ),
  agents: (
    <>
      <rect x="5" y="8" width="14" height="10" rx="3" />
      <circle cx="9.5" cy="13" r="1" />
      <circle cx="14.5" cy="13" r="1" />
      <path d="M12 4v3" />
      <circle cx="12" cy="3" r="1" />
    </>
  ),
  ops: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
    </>
  ),
  saudi: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M12 8v8" />
    </>
  ),
  platform: (
    <>
      <path d="M14.5 4.5 19 9l-7 7-5-1-1-5 8.5-5.5z" />
      <path d="M12 19v2M8 21h8" />
    </>
  ),
  roi: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 15v-4M12 15V8M16 15v-6" />
    </>
  ),
  human: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  check: <path d="M5 12.5 9.5 17 19 7.5" />,
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
}

export function Icon({
  name,
  className = 'h-6 w-6',
}: {
  name: IconName
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
