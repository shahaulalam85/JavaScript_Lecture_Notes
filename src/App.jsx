import { useState } from 'react'
import Home from './components/Home'
import Part1 from './Part1/part1'
import Part2 from './Part2/part2'
import './App.css'
import './components/NavBar.css'

const parts = ['part1', 'part2']

function NavBar({ active, onBack, onForward, onHome, onNavigate, canBack, canForward }) {
  return (
    <div className="topnav">
      <button className="topnav-btn" onClick={onBack} disabled={!canBack} title="Back">‹</button>
      <button className="topnav-btn" onClick={onForward} disabled={!canForward} title="Forward">›</button>
      <button className="topnav-btn" onClick={onHome} title="Home">⌂</button>
      <div className="topnav-breadcrumb">
        <span className="topnav-crumb" onClick={onHome}>Home</span>
        {active && (
          <>
            <span className="topnav-sep">/</span>
            <span className="topnav-crumb active">
              {active === 'part1' ? 'Part 1 — Lec 01–13' : 'Part 2 — Lec 14–16'}
            </span>
          </>
        )}
      </div>
      {active && (
        <div className="topnav-parts">
          {parts.map((p, i) => (
            <button
              key={p}
              className={`topnav-part ${active === p ? 'active' : ''}`}
              onClick={() => onNavigate(p)}
            >
              {i === 0 ? '⚡ Part 1' : '🎯 Part 2'}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function App() {
  // history stack of page ids: null = home, 'part1', 'part2'
  const [history, setHistory] = useState([null])
  const [cursor, setCursor] = useState(0)

  const active = history[cursor]

  const navigate = (page) => {
    const next = history.slice(0, cursor + 1)
    next.push(page)
    setHistory(next)
    setCursor(next.length - 1)
  }

  const goBack = () => { if (cursor > 0) setCursor(c => c - 1) }
  const goForward = () => { if (cursor < history.length - 1) setCursor(c => c + 1) }
  const goHome = () => navigate(null)

  return (
    <>
      <NavBar
        active={active}
        onBack={goBack}
        onForward={goForward}
        onHome={goHome}
        onNavigate={navigate}
        canBack={cursor > 0}
        canForward={cursor < history.length - 1}
      />
      {active === null && <Home onSelect={navigate} />}
      {active === 'part1' && <Part1 />}
      {active === 'part2' && <Part2 />}
    </>
  )
}

export default App
