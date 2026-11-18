import { byId, QUIZ_NOTIONS } from './data'
import { lastAttempt, reviewIds, statusOf, type useStore } from './store'

type Store = ReturnType<typeof useStore>

const when = (ts: number) =>
  new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

export default function Erreurs({ store, goQuiz }: { store: Store; goQuiz: () => void }) {
  const { state, start } = store
  const review = reviewIds(state.attempts)
  const corrected = QUIZ_NOTIONS.filter((x) => statusOf(x.id, state.attempts) === 'corrected')

  return (
    <section aria-labelledby="t-err">
      <h1 id="t-err">My mistakes</h1>
      <div className="actions">
        <button
          className="btn primary" disabled={review.length === 0}
          onClick={() => { start('erreurs', 'all'); goQuiz() }}
        >
          Redo my mistakes{review.length > 0 ? ` (${Math.min(review.length, 8)}${review.length > 8 ? ` of ${review.length}` : ''})` : ''}
        </button>
      </div>

      <h2>To review <span className="count">{review.length}</span></h2>
      {review.length === 0 ? (
        <p className="empty">Nothing to review yet. Wrong or incomplete answers from your series will appear here.</p>
      ) : (
        <ul className="rows">
          {review.map((id) => {
            const n = byId(id)
            const a = lastAttempt(id, state.attempts)
            return (
              <li className="row" key={id}>
                <div className="row-head"><strong className="term">{n.term}</strong><span className="badge review">To review</span></div>
                <p><span className="muted">My answer:</span> {a.answer.trim() || 'No answer'}</p>
                {a.missing.length > 0 && <p><span className="muted">I was missing:</span> {a.missing.join(' ; ')}</p>}
                <p className="retain"><strong>To remember</strong>{n.def}</p>
                <p className="source">{n.source} · {when(a.ts)}</p>
              </li>
            )
          })}
        </ul>
      )}

      <h2>Corrected <span className="count">{corrected.length}</span></h2>
      {corrected.length === 0 ? (
        <p className="empty">When you get a definition right after missing it, it will appear here as “Corrected”.</p>
      ) : (
        <ul className="rows">
          {corrected.map((x) => {
            const a = lastAttempt(x.id, state.attempts)
            const first = state.attempts.filter((t) => t.notionId === x.id && t.score < 1).sort((p, q) => p.ts - q.ts)[0]
            return (
              <li className="row" key={x.id}>
                <div className="row-head"><strong className="term">{x.term}</strong><span className="badge corrected">Corrected</span></div>
                <p><span className="muted">Missed on {when(first.ts)} · got it on {when(a.ts)}</span></p>
                <p className="def">{x.def}</p>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
