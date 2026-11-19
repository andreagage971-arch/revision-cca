import { byId, CHAPTERS, expectText, quizOf, themesOf } from './data'
import { IconCheck, IconMiss, IconPlay } from './Icons'
import { fmt, pts, reviewIds, STATUS_LABEL, statusOf, type useStore } from './store'

type Store = ReturnType<typeof useStore>

const GRADES = [
  { v: 1, label: 'Correct · 1' },
  { v: 0.5, label: 'Incomplete · 0.5' },
  { v: 0, label: 'Wrong · 0' },
]

export default function Quiz({ ch, store, goErrors }: { ch: number; store: Store; goErrors: () => void }) {
  const scope = `ch:${ch}`
  const QUIZ_NOTIONS = quizOf(ch)
  const THEMES = themesOf(ch)
  const chName = CHAPTERS.find((c) => c.n === ch)!.name
  const { state, start, setDraft, submit, override, next, abandon } = store
  const se = state.session

  if (!se) {
    return (
      <section aria-labelledby="t-quiz">
        <h1 id="t-quiz">Quiz</h1>
        <p className="lead">A series = 8 open questions, one definition at a time. Answer in your own words: rewordings are accepted.</p>
        {QUIZ_NOTIONS.length === 0 ? (
          <p className="empty">{chName} has no quiz questions yet. They will appear here as soon as its course is added.</p>
        ) : (
        <ul className="rows pick">
          <li>
            <button className="pick-btn" onClick={() => start('serie', scope)}>
              <span><strong>Whole {chName.toLowerCase()}</strong><small>{QUIZ_NOTIONS.length} testable terms</small></span><IconPlay />
            </button>
          </li>
          {THEMES.map((t) => (
            <li key={t.id}>
              <button className="pick-btn" onClick={() => start('serie', t.id)}>
                <span><strong>{t.name}</strong><small>{QUIZ_NOTIONS.filter((x) => x.theme === t.id).length} terms</small></span><IconPlay />
              </button>
            </li>
          ))}
        </ul>
        )}
        {reviewIds(state.attempts, scope).length > 0 && (
          <p className="hint">You have {reviewIds(state.attempts, scope).length} term(s) to review. <button className="link" onClick={goErrors}>See my mistakes</button></p>
        )}
      </section>
    )
  }

  const attemptsOf = se.attemptIds.map((id) => state.attempts.find((a) => a.id === id)!).filter(Boolean)
  const total = se.ids.length
  const answered = attemptsOf.length
  const score = attemptsOf.reduce((t, a) => t + a.score, 0)
  const progress = (
    <p className="progress" aria-live="polite">
      <strong>{answered}/{total} questions</strong> · {pts(score)} out of {answered}
    </p>
  )

  if (se.done) {
    const rows = attemptsOf.filter((a) => se.mode === 'erreurs' || a.score < 1)
    return (
      <section aria-labelledby="t-quiz">
        <h1 id="t-quiz">{se.mode === 'erreurs' ? 'Retry finished' : 'Series finished'}</h1>
        <p className="final"><strong>{fmt(score)}</strong> / {total}</p>
        {progress}
        {rows.length === 0 ? (
          <p className="empty">No mistakes in this series. Well done.</p>
        ) : (
          <div className="table" role="table" aria-label="Series summary">
            <div className="tr th" role="row">
              <span role="columnheader">Term</span><span role="columnheader">My mistake</span>
              <span role="columnheader">Definition to remember</span><span role="columnheader">Status</span>
            </div>
            {rows.map((a) => {
              const n = byId(a.notionId)
              const st = statusOf(n.id, state.attempts)
              return (
                <div className="tr" role="row" key={a.id}>
                  <span role="cell" data-l="Term"><strong>{n.term}</strong></span>
                  <span role="cell" data-l="My mistake">
                    {a.score === 1 ? '—' : (a.answer.trim() ? `« ${a.answer.trim()} »` : 'No answer')}
                    {a.score < 1 && a.missing.length > 0 && <em> Missing: {a.missing.join(' ; ')}</em>}
                  </span>
                  <span role="cell" data-l="To remember">{n.def}</span>
                  <span role="cell" data-l="Status"><span className={`badge ${st}`}>{STATUS_LABEL[st]}</span></span>
                </div>
              )
            })}
          </div>
        )}
        <div className="actions">
          {reviewIds(state.attempts, scope).length > 0 && (
            <button className="btn primary" onClick={() => { abandon(); start('erreurs', scope) }}>Redo my mistakes</button>
          )}
          <button className="btn" onClick={abandon}>New series</button>
        </div>
      </section>
    )
  }

  const notion = byId(se.ids[se.index])
  const current = attemptsOf[se.index]
  const prompt = se.mode === 'erreurs' ? notion.alt : notion.q
  const last = se.index + 1 === total

  return (
    <section aria-labelledby="t-quiz">
      <h1 id="t-quiz">{se.mode === 'erreurs' ? 'Redo my mistakes' : 'Quiz'}</h1>
      {progress}
      <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={answered}>
        <span style={{ width: `${(answered / total) * 100}%` }} />
      </div>

      <div className="question">
        <p className="qnum">Question {se.index + 1}/{total}</p>
        <h2 className="prompt">{prompt}</h2>
        <p className="expect">Expected: {expectText(notion)}.</p>

        {!current ? (
          <form onSubmit={(ev) => { ev.preventDefault(); submit(se.draft) }}>
            <label className="sr" htmlFor="answer">My answer</label>
            <textarea
              id="answer" className="field area" rows={4} value={se.draft} autoFocus
              placeholder="Write your answer in your own words…" onChange={(ev) => setDraft(ev.target.value)}
            />
            <div className="actions">
              <button className="btn primary" type="submit" disabled={!se.draft.trim()}>Submit my answer</button>
              <button className="btn" type="button" onClick={() => submit('')}>I don’t know</button>
            </div>
          </form>
        ) : (
          <div className="result" aria-live="polite">
            <p className={`verdict s${String(current.score).replace('.', '')}`}>
              {current.score === 1 ? 'Correct · 1 point' : current.score === 0.5 ? 'Incomplete · 0.5 point' : 'Wrong · 0 point'}
            </p>
            <p className="myanswer"><span className="muted">My answer:</span> {current.answer.trim() || '—'}</p>
            {current.uncertain && (
              <p className="note">Automatic marking is uncertain: compare your answer with the expected items and choose your mark.</p>
            )}
            <ul className="elements">
              {notion.el.filter((x) => !x.opt || current.matched.includes(x.label)).map((x) => {
                const ok = current.matched.includes(x.label)
                return (
                  <li key={x.label} className={ok ? 'ok' : 'ko'}>
                    {ok ? <IconCheck /> : <IconMiss />}<span>{x.label}</span>
                  </li>
                )
              })}
            </ul>
            <p className="retain"><strong>To remember</strong>{notion.def}</p>
            <p className="source">{notion.source}</p>
            <div className="grades" role="group" aria-label="Adjust my mark">
              {GRADES.map((g) => (
                <button key={g.v} className={`chip ${current.score === g.v ? 'on' : ''}`} aria-pressed={current.score === g.v} onClick={() => override(current.id, g.v)}>
                  {g.label}
                </button>
              ))}
            </div>
            <div className="actions">
              <button className="btn primary" autoFocus onClick={next}>{last ? 'See my score' : 'Next question'}</button>
            </div>
          </div>
        )}
      </div>
      <button className="link quit" onClick={() => { if (window.confirm('Abandon this series? Answers you already submitted are kept.')) abandon() }}>Abandon the series</button>
    </section>
  )
}
