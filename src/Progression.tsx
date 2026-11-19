import { byId, chapterOf, CHAPTERS, notionsOf, quizOf, THEMES as ALL_THEMES, themeName, themesOf } from './data'
import { fmt, seriesScore, statusOf, type useStore } from './store'

type Store = ReturnType<typeof useStore>

const when = (ts: number) =>
  new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

// chapter a finished series belongs to ('all' = old series, from before chapters existed)
const seriesCh = (theme: string, firstNotion?: string) => {
  if (theme.startsWith('ch:')) return Number(theme.slice(3))
  if (theme === 'all') return firstNotion ? chapterOf(byId(firstNotion)) : 1
  return ALL_THEMES.find((t) => t.id === theme)?.ch ?? 1
}

export default function Progression({ ch, store }: { ch: number; store: Store }) {
  const { state, reset } = store
  const NOTIONS = notionsOf(ch)
  const QUIZ_NOTIONS = quizOf(ch)
  const THEMES = themesOf(ch)
  const chName = CHAPTERS.find((c) => c.n === ch)!.name
  const st = (id: string) => statusOf(id, state.attempts)
  const worked = QUIZ_NOTIONS.filter((x) => st(x.id) !== 'none').length
  const corrected = QUIZ_NOTIONS.filter((x) => st(x.id) === 'corrected').length
  const flagged = NOTIONS.filter((x) => x.flag).length
  const done = state.series.filter((s) => {
    if (s.attemptIds.length !== s.total) return false
    const first = state.attempts.find((a) => a.id === s.attemptIds[0])?.notionId
    return seriesCh(s.theme, first) === ch
  })

  return (
    <section aria-labelledby="t-prog">
      <h1 id="t-prog">Progress · {chName}</h1>

      <dl className="stats">
        <div><dt>Terms studied</dt><dd>{worked} <span>of {QUIZ_NOTIONS.length}</span></dd></div>
        <div><dt>Mistakes corrected</dt><dd>{corrected}</dd></div>
        <div><dt>Series finished</dt><dd>{done.length}</dd></div>
      </dl>

      <h2>Terms mastered by theme</h2>
      {THEMES.length === 0 && <p className="empty">{chName} has no themes yet.</p>}
      <ul className="rows">
        {THEMES.map((t) => {
          const all = QUIZ_NOTIONS.filter((x) => x.theme === t.id)
          const ok = all.filter((x) => ['mastered', 'corrected'].includes(st(x.id))).length
          const tw = all.filter((x) => st(x.id) !== 'none').length
          return (
            <li className="row theme-row" key={t.id}>
              <div className="row-head"><strong>{t.name}</strong><span>{ok} / {all.length} mastered</span></div>
              <div className="bar" role="progressbar" aria-label={`${t.name}: ${ok} of ${all.length}`} aria-valuemin={0} aria-valuemax={all.length} aria-valuenow={ok}>
                <span style={{ width: `${(ok / all.length) * 100}%` }} />
              </div>
              <p className="source">{tw} studied</p>
            </li>
          )
        })}
      </ul>
      {flagged > 0 && <p className="hint">{flagged} flashcards marked “To check” are not tested in the quizzes (contradictory or unreadable notes).</p>}

      <h2>My series</h2>
      {done.length === 0 ? (
        <p className="empty">No series finished yet. Start a quiz to see your scores here.</p>
      ) : (
        <ul className="rows">
          {[...done].reverse().map((s) => (
            <li className="row series" key={s.id}>
              <div className="row-head">
                <strong>{s.mode === 'erreurs' ? 'Retry' : s.theme === 'all' ? 'Whole course' : s.theme.startsWith('ch:') ? `Whole ${chName.toLowerCase()}` : themeName(s.theme)}</strong>
                <span className="final-s">{fmt(seriesScore(s, state.attempts))} / {s.total}</span>
              </div>
              <p className="source">{when(s.ts)}</p>
            </li>
          ))}
        </ul>
      )}

      <button
        className="link danger"
        onClick={() => { if (window.confirm('Erase all your progress on this device? This cannot be undone.')) reset() }}
      >
        Erase my progress
      </button>
    </section>
  )
}
