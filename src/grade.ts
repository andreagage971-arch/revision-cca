export type Element = { label: string; any: string[]; opt?: boolean }

export const e = (label: string, ...any: string[]): Element => ({ label, any })
export const o = (label: string, ...any: string[]): Element => ({ label, any, opt: true })

const strip = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/œ/g, 'oe')

export const normAnswer = (s: string) =>
  strip(s).replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()

const normSyn = (s: string) =>
  strip(s).replace(/[^a-z0-9*\s]/g, ' ').replace(/\s+/g, ' ').trim()

function lev(a: string, b: string): number {
  const m = a.length, n = b.length
  if (Math.abs(m - n) > 2) return 3
  const d: number[] = Array.from({ length: n + 1 }, (_, j) => j)
  for (let i = 1; i <= m; i++) {
    let prev = d[0]
    d[0] = i
    for (let j = 1; j <= n; j++) {
      const tmp = d[j]
      d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = tmp
    }
  }
  return d[n]
}

function tokenMatch(s: string, tokens: string[]): boolean {
  if (s.endsWith('*')) {
    const p = s.slice(0, -1)
    return tokens.some((t) => t.startsWith(p))
  }
  return tokens.some((t) => {
    if (t === s) return true
    if (s.length >= 4 && t.startsWith(s) && t.length <= s.length + 2) return true
    if (s.length >= 6 && lev(t, s) <= 1) return true
    if (s.length >= 9 && lev(t, s) <= 2) return true
    return false
  })
}

const synMatch = (syn: string, tokens: string[]) => {
  const parts = normSyn(syn).split(' ').filter(Boolean)
  return parts.length > 0 && parts.every((p) => tokenMatch(p, tokens))
}

export type Graded = {
  score: number
  matched: string[]
  missing: string[]
  uncertain: boolean
}

export function grade(
  elements: Element[],
  answer: string,
  min?: number,
): Graded {
  const text = normAnswer(answer)
  if (!text) {
    return { score: 0, matched: [], missing: elements.filter((x) => !x.opt).map((x) => x.label), uncertain: false }
  }
  const tokens = text.split(' ')
  const matched: string[] = []
  const missing: string[] = []
  let req = 0
  let reqHit = 0
  for (const el of elements) {
    const hit = el.any.some((s) => synMatch(s, tokens))
    if (hit) matched.push(el.label)
    else if (!el.opt) missing.push(el.label)
    if (!el.opt) {
      req++
      if (hit) reqHit++
    }
  }
  const need = Math.min(min ?? req, req)
  let score = 0
  if (reqHit >= need) score = 1
  else if (reqHit > 0 && reqHit >= Math.ceil(need / 2)) score = 0.5
  const uncertain = score === 0.5 || (score === 0 && text.length > 3)
  // Pour une liste : ne pas lister comme "manquants" plus que nécessaire une fois le seuil atteint
  return { score, matched, missing: score === 1 ? [] : missing, uncertain }
}
