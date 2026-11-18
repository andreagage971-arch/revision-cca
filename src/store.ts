import { useCallback, useEffect, useState } from 'react'
import { byId, QUIZ_NOTIONS } from './data'
import { grade } from './grade'

export type Mode = 'serie' | 'erreurs'

export type Attempt = {
  id: string
  notionId: string
  answer: string
  score: number
  auto: number
  ts: number
  sessionId: string
  mode: Mode
  matched: string[]
  missing: string[]
  uncertain: boolean
}

export type Session = {
  id: string
  mode: Mode
  theme: string
  ids: string[]
  attemptIds: string[]
  index: number
  draft: string
  done: boolean
  startedAt: number
}

export type Series = {
  id: string
  ts: number
  mode: Mode
  theme: string
  score: number
  total: number
  attemptIds: string[]
}

export type State = { attempts: Attempt[]; session: Session | null; series: Series[] }

const KEY = 'cca-revision-v1'
const EMPTY: State = { attempts: [], session: null, series: [] }

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return EMPTY
    const s = JSON.parse(raw) as State
    return { attempts: s.attempts ?? [], session: s.session ?? null, series: s.series ?? [] }
  } catch {
    return EMPTY
  }
}

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)

export type Status = 'none' | 'mastered' | 'corrected' | 'review'

export function statusOf(notionId: string, attempts: Attempt[]): Status {
  const list = attempts.filter((a) => a.notionId === notionId).sort((a, b) => a.ts - b.ts)
  if (!list.length) return 'none'
  const last = list[list.length - 1]
  if (last.score < 1) return 'review'
  return list.slice(0, -1).some((a) => a.score < 1) ? 'corrected' : 'mastered'
}

export const STATUS_LABEL: Record<Status, string> = {
  none: 'Non travaillée',
  mastered: 'Maîtrisée',
  corrected: 'Corrigée',
  review: 'À revoir',
}

export const lastAttempt = (notionId: string, attempts: Attempt[]) =>
  attempts.filter((a) => a.notionId === notionId).sort((a, b) => b.ts - a.ts)[0]

export const reviewIds = (attempts: Attempt[]) =>
  QUIZ_NOTIONS.filter((x) => statusOf(x.id, attempts) === 'review').map((x) => x.id)

const shuffle = <T,>(a: T[]) => {
  const r = [...a]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

export function useStore() {
  const [state, setState] = useState<State>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* stockage indisponible : l’appli reste utilisable sans sauvegarde */
    }
  }, [state])

  const start = useCallback((mode: Mode, theme: string) => {
    setState((s) => {
      let ids: string[]
      if (mode === 'erreurs') {
        const rev = reviewIds(s.attempts)
        // les plus anciennement ratées d’abord
        rev.sort((a, b) => (lastAttempt(a, s.attempts)?.ts ?? 0) - (lastAttempt(b, s.attempts)?.ts ?? 0))
        ids = shuffle(rev.slice(0, 8))
      } else {
        const pool = QUIZ_NOTIONS.filter((x) => theme === 'all' || x.theme === theme)
        // priorité aux notions jamais travaillées ou à revoir
        const score = (id: string) => ({ none: 0, review: 0, corrected: 1, mastered: 2 })[statusOf(id, s.attempts) === 'none' ? 'none' : statusOf(id, s.attempts)]
        const sorted = shuffle(pool).sort((a, b) => score(a.id) - score(b.id))
        ids = shuffle(sorted.slice(0, 8).map((x) => x.id))
      }
      if (!ids.length) return s
      return {
        ...s,
        session: { id: uid(), mode, theme, ids, attemptIds: [], index: 0, draft: '', done: false, startedAt: Date.now() },
      }
    })
  }, [])

  const setDraft = useCallback((draft: string) => {
    setState((s) => (s.session ? { ...s, session: { ...s.session, draft } } : s))
  }, [])

  const submit = useCallback((answer: string) => {
    setState((s) => {
      const se = s.session
      if (!se || se.done || se.attemptIds.length > se.index) return s
      const notion = byId(se.ids[se.index])
      const g = grade(notion.el, answer, notion.min)
      const a: Attempt = {
        id: uid(), notionId: notion.id, answer, score: g.score, auto: g.score, ts: Date.now(),
        sessionId: se.id, mode: se.mode, matched: g.matched, missing: g.missing, uncertain: g.uncertain,
      }
      return { ...s, attempts: [...s.attempts, a], session: { ...se, attemptIds: [...se.attemptIds, a.id] } }
    })
  }, [])

  const override = useCallback((attemptId: string, score: number) => {
    setState((s) => ({
      ...s,
      attempts: s.attempts.map((a) => (a.id === attemptId ? { ...a, score, uncertain: false } : a)),
    }))
  }, [])

  const next = useCallback(() => {
    setState((s) => {
      const se = s.session
      if (!se || se.attemptIds.length <= se.index) return s
      if (se.index + 1 >= se.ids.length) {
        const att = se.attemptIds.map((id) => s.attempts.find((a) => a.id === id)!).filter(Boolean)
        const series: Series = {
          id: se.id, ts: Date.now(), mode: se.mode, theme: se.theme,
          score: 0, total: se.ids.length, attemptIds: se.attemptIds,
        }
        // le score est recalculé à l’affichage (la note peut encore être ajustée)
        void att
        return { ...s, series: [...s.series, series], session: { ...se, done: true, draft: '' } }
      }
      return { ...s, session: { ...se, index: se.index + 1, draft: '' } }
    })
  }, [])

  const abandon = useCallback(() => setState((s) => ({ ...s, session: null })), [])
  const closeSummary = abandon
  const reset = useCallback(() => setState(EMPTY), [])

  return { state, start, setDraft, submit, override, next, abandon, closeSummary, reset }
}

export const seriesScore = (s: Series, attempts: Attempt[]) =>
  s.attemptIds.reduce((t, id) => t + (attempts.find((a) => a.id === id)?.score ?? 0), 0)

export const fmt = (n: number) => String(n).replace('.', ',')
export const pts = (n: number) => `${fmt(n)} ${n > 1 ? 'points' : 'point'}`
