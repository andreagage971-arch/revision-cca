import { byId, expectText, QUIZ_NOTIONS, THEMES } from './data'
import { IconCheck, IconMiss, IconPlay } from './Icons'
import { fmt, pts, reviewIds, STATUS_LABEL, statusOf, type useStore } from './store'

type Store = ReturnType<typeof useStore>

const GRADES = [
  { v: 1, label: 'Juste · 1' },
  { v: 0.5, label: 'Incomplète · 0,5' },
  { v: 0, label: 'Fausse · 0' },
]

export default function Quiz({ store, goErrors }: { store: Store; goErrors: () => void }) {
  const { state, start, setDraft, submit, override, next, abandon } = store
  const se = state.session

  if (!se) {
    return (
      <section aria-labelledby="t-quiz">
        <h1 id="t-quiz">Quiz</h1>
        <p className="lead">Une série = 8 questions ouvertes, une définition à la fois. Réponds avec tes mots : les reformulations sont acceptées.</p>
        <ul className="rows pick">
          <li>
            <button className="pick-btn" onClick={() => start('serie', 'all')}>
              <span><strong>Tout le cours</strong><small>{QUIZ_NOTIONS.length} notions évaluables</small></span><IconPlay />
            </button>
          </li>
          {THEMES.map((t) => (
            <li key={t.id}>
              <button className="pick-btn" onClick={() => start('serie', t.id)}>
                <span><strong>{t.name}</strong><small>{QUIZ_NOTIONS.filter((x) => x.theme === t.id).length} notions</small></span><IconPlay />
              </button>
            </li>
          ))}
        </ul>
        {reviewIds(state.attempts).length > 0 && (
          <p className="hint">Tu as {reviewIds(state.attempts).length} notion(s) à revoir. <button className="link" onClick={goErrors}>Voir mes erreurs</button></p>
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
      <strong>{answered}/{total} questions</strong> · {pts(score)} sur {answered}
    </p>
  )

  if (se.done) {
    const rows = attemptsOf.filter((a) => se.mode === 'erreurs' || a.score < 1)
    return (
      <section aria-labelledby="t-quiz">
        <h1 id="t-quiz">{se.mode === 'erreurs' ? 'Rattrapage terminé' : 'Série terminée'}</h1>
        <p className="final"><strong>{fmt(score)}</strong> / {total}</p>
        {progress}
        {rows.length === 0 ? (
          <p className="empty">Aucune erreur sur cette série. Bien joué.</p>
        ) : (
          <div className="table" role="table" aria-label="Récapitulatif de la série">
            <div className="tr th" role="row">
              <span role="columnheader">Notion</span><span role="columnheader">Mon erreur</span>
              <span role="columnheader">Définition à retenir</span><span role="columnheader">Statut</span>
            </div>
            {rows.map((a) => {
              const n = byId(a.notionId)
              const st = statusOf(n.id, state.attempts)
              return (
                <div className="tr" role="row" key={a.id}>
                  <span role="cell" data-l="Notion"><strong>{n.term}</strong></span>
                  <span role="cell" data-l="Mon erreur">
                    {a.score === 1 ? '—' : (a.answer.trim() ? `« ${a.answer.trim()} »` : 'Pas de réponse')}
                    {a.score < 1 && a.missing.length > 0 && <em> Manquait : {a.missing.join(' ; ')}</em>}
                  </span>
                  <span role="cell" data-l="À retenir">{n.def}</span>
                  <span role="cell" data-l="Statut"><span className={`badge ${st}`}>{STATUS_LABEL[st]}</span></span>
                </div>
              )
            })}
          </div>
        )}
        <div className="actions">
          {reviewIds(state.attempts).length > 0 && (
            <button className="btn primary" onClick={() => { abandon(); start('erreurs', 'all') }}>Refaire mes erreurs</button>
          )}
          <button className="btn" onClick={abandon}>Nouvelle série</button>
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
      <h1 id="t-quiz">{se.mode === 'erreurs' ? 'Refaire mes erreurs' : 'Quiz'}</h1>
      {progress}
      <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={answered}>
        <span style={{ width: `${(answered / total) * 100}%` }} />
      </div>

      <div className="question">
        <p className="qnum">Question {se.index + 1}/{total}</p>
        <h2 className="prompt">{prompt}</h2>
        <p className="expect">J’attends : {expectText(notion)}.</p>

        {!current ? (
          <form onSubmit={(ev) => { ev.preventDefault(); submit(se.draft) }}>
            <label className="sr" htmlFor="answer">Ma réponse</label>
            <textarea
              id="answer" className="field area" rows={4} value={se.draft} autoFocus
              placeholder="Écris ta réponse avec tes mots…" onChange={(ev) => setDraft(ev.target.value)}
            />
            <div className="actions">
              <button className="btn primary" type="submit" disabled={!se.draft.trim()}>Valider ma réponse</button>
              <button className="btn" type="button" onClick={() => submit('')}>Je ne sais pas</button>
            </div>
          </form>
        ) : (
          <div className="result" aria-live="polite">
            <p className={`verdict s${String(current.score).replace('.', '')}`}>
              {current.score === 1 ? 'Juste · 1 point' : current.score === 0.5 ? 'Incomplète · 0,5 point' : 'Fausse · 0 point'}
            </p>
            <p className="myanswer"><span className="muted">Ma réponse :</span> {current.answer.trim() || '—'}</p>
            {current.uncertain && (
              <p className="note">Correction automatique incertaine : compare ta réponse aux éléments attendus et choisis ta note.</p>
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
            <p className="retain"><strong>À retenir</strong>{notion.def}</p>
            <p className="source">{notion.source}</p>
            <div className="grades" role="group" aria-label="Ajuster ma note">
              {GRADES.map((g) => (
                <button key={g.v} className={`chip ${current.score === g.v ? 'on' : ''}`} aria-pressed={current.score === g.v} onClick={() => override(current.id, g.v)}>
                  {g.label}
                </button>
              ))}
            </div>
            <div className="actions">
              <button className="btn primary" autoFocus onClick={next}>{last ? 'Voir mon score' : 'Question suivante'}</button>
            </div>
          </div>
        )}
      </div>
      <button className="link quit" onClick={() => { if (window.confirm('Abandonner cette série ? Tes réponses déjà validées sont conservées.')) abandon() }}>Abandonner la série</button>
    </section>
  )
}
