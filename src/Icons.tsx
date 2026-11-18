const base = {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true,
}

export const IconFiches = () => (
  <svg {...base}><path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z" /><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3" /><path d="M9 8h6M9 12h4" /></svg>
)
export const IconQuiz = () => (
  <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8" /><path d="M12 17h.01" /></svg>
)
export const IconErreurs = () => (
  <svg {...base}><path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5" /><path d="M20 4v4.5h-4.5" /><path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.5" /><path d="M4 20v-4.5h4.5" /></svg>
)
export const IconProgress = () => (
  <svg {...base}><path d="M4 20V10M10 20V4M16 20v-7M21 20H3" /></svg>
)
export const IconPlay = () => (
  <svg {...base} width={18} height={18}><path d="M7 5l12 7-12 7z" /></svg>
)
export const IconCheck = () => (
  <svg {...base} width={16} height={16}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)
export const IconMiss = () => (
  <svg {...base} width={16} height={16}><path d="M6 6l12 12M18 6L6 18" /></svg>
)
