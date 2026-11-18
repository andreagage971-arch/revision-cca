import { NOTIONS, QUIZ_NOTIONS, THEMES, themeName } from './data'
import { fmt, seriesScore, statusOf, type useStore } from './store'

type Store = ReturnType<typeof useStore>

const when = (ts: number) =>
  new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

export default function Progression({ store }: { store: Store }) {
  const { state, reset } = store
  const st = (id: string) => statusOf(id, state.attempts)
  const worked = QUIZ_NOTIONS.filter((x) => st(x.id) !== 'none').length
  const corrected = QUIZ_NOTIONS.filter((x) => st(x.id) === 'corrected').length
  const flagged = NOTIONS.filter((x) => x.flag).length
  const done = state.series.filter((s) => s.attemptIds.length === s.total)

  return (
    <section aria-labelledby="t-prog">
      <h1 id="t-prog">Progress</h1>

      <dl className="stats">
        <div><dt>Terms studied</dt><dd>{worked} <span>of {QUIZ_NOTIONS.length}</span></dd></div>
        <div><dt>Mistakes corrected</dt><dd>{corrected}</dd></div>
        <div><dt>Series finished</dt><dd>{done.length}</dd></div>
      </dl>

      <h2>Terms mastered by theme</h2>
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
      <p className="hint">{flagged} flashcards marked “To check” are not tested in the quizzes (contradictory or unreadable notes).</p>

      <h2>My series</h2>
      {done.length === 0 ? (
        <p className="empty">No series finished yet. Start a quiz to see your scores here.</p>
      ) : (
        <ul className="rows">
          {[...done].reverse().map((s) => (
            <li className="row series" key={s.id}>
              <div className="row-head">
                <strong>{s.mode === 'erreurs' ? 'Retry' : s.theme === 'all' ? 'Whole course' : themeName(s.theme)}</strong>
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
