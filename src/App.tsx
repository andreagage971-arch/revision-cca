import { useEffect, useState } from 'react'
import { CHAPTERS } from './data'
import Erreurs from './Erreurs'
import Fiches from './Fiches'
import { IconErreurs, IconFiches, IconProgress, IconQuiz } from './Icons'
import Progression from './Progression'
import Quiz from './Quiz'
import { reviewIds, useStore } from './store'

type Tab = 'fiches' | 'quiz' | 'erreurs' | 'progression'

const TABS: { id: Tab; label: string; Icon: () => JSX.Element }[] = [
  { id: 'fiches', label: 'Flashcards', Icon: IconFiches },
  { id: 'quiz', label: 'Quiz', Icon: IconQuiz },
  { id: 'erreurs', label: 'My mistakes', Icon: IconErreurs },
  { id: 'progression', label: 'Progress', Icon: IconProgress },
]

const CH_KEY = 'cca-revision-chapter'
const loadCh = () => {
  try { return Number(localStorage.getItem(CH_KEY)) === 2 ? 2 : 1 } catch { return 1 }
}

export default function App() {
  const store = useStore()
  const [ch, setCh] = useState<number>(loadCh)
  useEffect(() => { try { localStorage.setItem(CH_KEY, String(ch)) } catch { /* pas de stockage */ } }, [ch])
  const [tab, setTab] = useState<Tab>(() => (store.state.session && !store.state.session.done ? 'quiz' : 'fiches'))
  const { state, start } = store
  const se = state.session
  const inProgress = se && !se.done
  const nErr = reviewIds(state.attempts, `ch:${ch}`).length
  const chap = CHAPTERS.find((c) => c.n === ch)!

  return (
    <div className="app">
      <header className="brand">
        <p className="logo">CCA Revision</p>
        <p className="sub">Cabin4You-Aero · {chap.title}</p>
        <div className="chapters" role="group" aria-label="Chapter">
          {CHAPTERS.map((c) => (
            <button key={c.n} className={`chapter ${ch === c.n ? 'on' : ''}`} aria-pressed={ch === c.n} onClick={() => setCh(c.n)}>
              {c.name}
            </button>
          ))}
        </div>
      </header>

      <nav className="tabs" aria-label="Sections">
        {TABS.map(({ id, label, Icon }) => (
          <button key={id} className={`tab ${tab === id ? 'on' : ''}`} aria-current={tab === id ? 'page' : undefined} onClick={() => setTab(id)}>
            <Icon /><span>{label}</span>
            {id === 'erreurs' && nErr > 0 && <b className="dot" aria-label={`${nErr} to review`}>{nErr}</b>}
          </button>
        ))}
      </nav>

      <main className="main">
        {tab !== 'quiz' && (inProgress || nErr > 0) && (
          <div className="strip">
            {inProgress && (
              <button className="btn primary" onClick={() => setTab('quiz')}>
                Resume my quiz <small>{se!.attemptIds.length}/{se!.ids.length}</small>
              </button>
            )}
            {nErr > 0 && (
              <button
                className={`btn ${inProgress ? '' : 'primary'}`}
                disabled={!!inProgress}
                title={inProgress ? 'Finish or abandon your current quiz first' : undefined}
                onClick={() => { start('erreurs', `ch:${ch}`); setTab('quiz') }}
              >
                Redo my mistakes <small>{nErr}</small>
              </button>
            )}
          </div>
        )}
        {tab === 'fiches' && <Fiches key={ch} ch={ch} />}
        {tab === 'quiz' && <Quiz ch={ch} store={store} goErrors={() => setTab('erreurs')} />}
        {tab === 'erreurs' && <Erreurs ch={ch} store={store} goQuiz={() => setTab('quiz')} />}
        {tab === 'progression' && <Progression ch={ch} store={store} />}
      </main>
    </div>
  )
}
