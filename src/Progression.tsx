import { NOTIONS, QUIZ_NOTIONS, THEMES, themeName } from './data'
import { fmt, seriesScore, statusOf, type useStore } from './store'

type Store = ReturnType<typeof useStore>

const when = (ts: number) =>
  new Date(ts).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

export default function Progression({ store }: { store: Store }) {
  const { state, reset } = store
  const st = (id: string) => statusOf(id, state.attempts)
  const worked = QUIZ_NOTIONS.filter((x) => st(x.id) !== 'none').length
  const corrected = QUIZ_NOTIONS.filter((x) => st(x.id) === 'corrected').length
  const flagged = NOTIONS.filter((x) => x.flag).length
  const done = state.series.filter((s) => s.attemptIds.length === s.total)

  return (
    <section aria-labelledby="t-prog">
      <h1 id="t-prog">Progression</h1>

      <dl className="stats">
        <div><dt>Notions travaillées</dt><dd>{worked} <span>sur {QUIZ_NOTIONS.length}</span></dd></div>
        <div><dt>Erreurs corrigées</dt><dd>{corrected}</dd></div>
        <div><dt>Séries terminées</dt><dd>{done.length}</dd></div>
      </dl>

      <h2>Notions réussies par thème</h2>
      <ul className="rows">
        {THEMES.map((t) => {
          const all = QUIZ_NOTIONS.filter((x) => x.theme === t.id)
          const ok = all.filter((x) => ['mastered', 'corrected'].includes(st(x.id))).length
          const tw = all.filter((x) => st(x.id) !== 'none').length
          return (
            <li className="row theme-row" key={t.id}>
              <div className="row-head"><strong>{t.name}</strong><span>{ok} / {all.length} réussies</span></div>
              <div className="bar" role="progressbar" aria-label={`${t.name} : ${ok} sur ${all.length}`} aria-valuemin={0} aria-valuemax={all.length} aria-valuenow={ok}>
                <span style={{ width: `${(ok / all.length) * 100}%` }} />
              </div>
              <p className="source">{tw} travaillées</p>
            </li>
          )
        })}
      </ul>
      <p className="hint">{flagged} fiches « À vérifier » ne sont pas évaluées dans les quiz (notes contradictoires ou illisibles).</p>

      <h2>Mes séries</h2>
      {done.length === 0 ? (
        <p className="empty">Aucune série terminée. Lance un quiz pour voir tes scores ici.</p>
      ) : (
        <ul className="rows">
          {[...done].reverse().map((s) => (
            <li className="row series" key={s.id}>
              <div className="row-head">
                <strong>{s.mode === 'erreurs' ? 'Rattrapage' : s.theme === 'all' ? 'Tout le cours' : themeName(s.theme)}</strong>
                <span className="final-s">{fmt(seriesScore(s, state.attempts))} / {s.total}</span>
              </div>
              <p className="source">{when(s.ts)}</p>
            </li>
          ))}
        </ul>
      )}

      <button
        className="link danger"
        onClick={() => { if (window.confirm('Effacer toute ta progression sur cet appareil ? Cette action est définitive.')) reset() }}
      >
        Effacer ma progression
      </button>
    </section>
  )
}
