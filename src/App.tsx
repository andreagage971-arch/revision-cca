import { useState } from 'react'
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

export default function App() {
  const store = useStore()
  const [tab, setTab] = useState<Tab>(() => (store.state.session && !store.state.session.done ? 'quiz' : 'fiches'))
  const { state, start } = store
  const se = state.session
  const inProgress = se && !se.done
  const nErr = reviewIds(state.attempts).length

  return (
    <div className="app">
      <header className="brand">
        <p className="logo">CCA Revision</p>
        <p className="sub">Cabin4You-Aero · Aviation Indoctrination</p>
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
                onClick={() => { start('erreurs', 'all'); setTab('quiz') }}
              >
                Redo my mistakes <small>{nErr}</small>
              </button>
            )}
          </div>
        )}
        {tab === 'fiches' && <Fiches />}
        {tab === 'quiz' && <Quiz store={store} goErrors={() => setTab('erreurs')} />}
        {tab === 'erreurs' && <Erreurs store={store} goQuiz={() => setTab('quiz')} />}
        {tab === 'progression' && <Progression store={store} />}
      </main>
    </div>
  )
}
