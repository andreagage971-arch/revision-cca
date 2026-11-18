import { useMemo, useState } from 'react'
import { NOTIONS, THEMES, expectText } from './data'
import { normAnswer } from './grade'

export default function Fiches() {
  const [q, setQ] = useState('')
  const [theme, setTheme] = useState('all')
  const [hide, setHide] = useState(false)
  const [shown, setShown] = useState<Set<string>>(new Set())

  const list = useMemo(() => {
    const nq = normAnswer(q)
    return NOTIONS.filter((x) => {
      if (theme !== 'all' && x.theme !== theme) return false
      if (!nq) return true
      return normAnswer(`${x.term} ${x.def} ${x.q}`).includes(nq)
    })
  }, [q, theme])

  const toggle = (id: string) =>
    setShown((s) => {
      const n = new Set(s)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })

  return (
    <section aria-labelledby="t-fiches">
      <h1 id="t-fiches">Fiches</h1>
      <div className="toolbar">
        <input
          className="field"
          type="search"
          placeholder="Chercher un mot ou un sigle (APU, drag, galley…)"
          value={q}
          onChange={(ev) => setQ(ev.target.value)}
          aria-label="Chercher dans les fiches"
        />
        <label className="switch">
          <input type="checkbox" checked={hide} onChange={(ev) => { setHide(ev.target.checked); setShown(new Set()) }} />
          <span>Masquer les définitions (je les retrouve de mémoire)</span>
        </label>
        <div className="chips" role="group" aria-label="Filtrer par thème">
          <button className={`chip ${theme === 'all' ? 'on' : ''}`} aria-pressed={theme === 'all'} onClick={() => setTheme('all')}>Tout</button>
          {THEMES.map((t) => (
            <button key={t.id} className={`chip ${theme === t.id ? 'on' : ''}`} aria-pressed={theme === t.id} onClick={() => setTheme(t.id)}>{t.name}</button>
          ))}
        </div>
      </div>

      {list.length === 0 && <p className="empty">Aucune fiche ne correspond à « {q} ». Essaie un sigle ou un autre mot.</p>}

      {THEMES.map((t) => {
        const items = list.filter((x) => x.theme === t.id)
        if (!items.length) return null
        return (
          <div key={t.id} className="group">
            <h2>{t.name} <span className="count">{items.length}</span></h2>
            <ul className="rows">
              {items.map((x) => {
                const open = !hide || shown.has(x.id)
                return (
                  <li key={x.id} className="row">
                    <div className="row-head">
                      <strong className="term">{x.term}</strong>
                      {x.flag && <span className="badge warn">À vérifier</span>}
                    </div>
                    {open ? (
                      <p className="def">{x.def}</p>
                    ) : (
                      <button className="link" onClick={() => toggle(x.id)}>
                        Afficher la définition <span className="muted">({expectText(x)})</span>
                      </button>
                    )}
                    {open && x.flag && <p className="note">{x.flag}</p>}
                    {open && hide && <button className="link" onClick={() => toggle(x.id)}>Masquer à nouveau</button>}
                    <p className="source">{x.source}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </section>
  )
}
