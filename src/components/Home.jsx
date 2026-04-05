import './Home.css'

const parts = [
  {
    id: 'part1',
    label: 'Part 1',
    range: 'Lec 01 – 13',
    accent: '#06b6d4',
    icon: '⚡',
    topics: ['Web Architecture', 'Execution Context', 'Scope & Closures', 'var / let / const', 'Hoisting', 'DOM Manipulation'],
  },
  {
    id: 'part2',
    label: 'Part 2',
    range: 'Lec 14 – 18',
    accent: '#10b981',
    icon: '🎯',
    topics: ['classList API', 'Async JS & Event Loop', 'Higher Order Functions', 'Callbacks', 'Browser Events', 'removeEventListener'],
  },
  {
    id: 'part3',
    label: 'Part 3',
    range: 'Lec 19 – 21',
    accent: '#a78bfa',
    icon: '🚀',
    topics: ['Event Delegation', 'getModifierState', 'Event State Events', 'Form Validation', 'onChange Event', 'Keyboard Events'],
  },
]

function Home({ onSelect }) {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-hero-icon">JS</div>
        <h1>JavaScript Notes</h1>
        <p>PW Institute of Innovation · Interactive Study Guide</p>
      </div>

      <div className="home-grid">
        {parts.map((p) => (
          <button
            key={p.id}
            className="part-card"
            style={{ '--accent': p.accent }}
            onClick={() => onSelect(p.id)}
          >
            <div className="part-card-header">
              <span className="part-icon">{p.icon}</span>
              <div>
                <div className="part-label">{p.label}</div>
                <div className="part-range">{p.range}</div>
              </div>
            </div>
            <ul className="part-topics">
              {p.topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="part-cta">Open Notes →</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Home
