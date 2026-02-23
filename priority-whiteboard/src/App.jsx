import { useEffect, useMemo, useState } from 'react'
import './App.css'

const COLUMNS = ['Do Now', 'Do Next', 'Later']
const SCORE_WEIGHTS = {
  impact: 0.35,
  revenue: 0.3,
  urgency: 0.2,
  confidence: 0.15,
  effortPenalty: 0.25,
}

const seedIdeas = [
  {
    id: crypto.randomUUID(),
    title: 'Automate client onboarding packet',
    notes: 'Forms + e-sign + CRM handoff',
    column: 'Do Now',
    votes: 1,
    owner: '',
    dueDate: '',
    metrics: { impact: 5, revenue: 4, urgency: 5, confidence: 4, effort: 2 },
  },
  {
    id: crypto.randomUUID(),
    title: 'Build tax-savings lead magnet quiz',
    notes: 'Capture W-2 and owner leads',
    column: 'Do Next',
    votes: 0,
    owner: '',
    dueDate: '',
    metrics: { impact: 4, revenue: 5, urgency: 3, confidence: 3, effort: 3 },
  },
]

function priorityScore(idea) {
  const { impact, revenue, urgency, confidence, effort } = idea.metrics
  return (
    impact * SCORE_WEIGHTS.impact +
    revenue * SCORE_WEIGHTS.revenue +
    urgency * SCORE_WEIGHTS.urgency +
    confidence * SCORE_WEIGHTS.confidence -
    effort * SCORE_WEIGHTS.effortPenalty +
    idea.votes * 0.4
  )
}

function App() {
  const [ideas, setIdeas] = useState(() => {
    const raw = localStorage.getItem('priority-whiteboard-ideas')
    return raw ? JSON.parse(raw) : seedIdeas
  })

  const [newIdea, setNewIdea] = useState({
    title: '',
    notes: '',
    column: 'Do Next',
    metrics: { impact: 3, revenue: 3, urgency: 3, confidence: 3, effort: 3 },
  })

  const [draggedId, setDraggedId] = useState(null)

  useEffect(() => {
    localStorage.setItem('priority-whiteboard-ideas', JSON.stringify(ideas))
  }, [ideas])

  const groupedIdeas = useMemo(() => {
    const grouped = Object.fromEntries(COLUMNS.map((column) => [column, []]))
    ideas
      .map((idea) => ({ ...idea, score: priorityScore(idea) }))
      .sort((a, b) => b.score - a.score)
      .forEach((idea) => grouped[idea.column].push(idea))
    return grouped
  }, [ideas])

  function addIdea(e) {
    e.preventDefault()
    if (!newIdea.title.trim()) return

    const idea = {
      id: crypto.randomUUID(),
      title: newIdea.title.trim(),
      notes: newIdea.notes.trim(),
      column: newIdea.column,
      votes: 0,
      owner: '',
      dueDate: '',
      metrics: newIdea.metrics,
    }

    setIdeas((prev) => [idea, ...prev])
    setNewIdea({
      title: '',
      notes: '',
      column: 'Do Next',
      metrics: { impact: 3, revenue: 3, urgency: 3, confidence: 3, effort: 3 },
    })
  }

  function updateIdea(id, updateFn) {
    setIdeas((prev) => prev.map((idea) => (idea.id === id ? updateFn(idea) : idea)))
  }

  function onDropColumn(column) {
    if (!draggedId) return
    updateIdea(draggedId, (idea) => ({ ...idea, column }))
    setDraggedId(null)
  }

  function promoteToTask(id) {
    updateIdea(id, (idea) => ({ ...idea, column: 'Do Now' }))
  }

  const leaderboard = [...ideas]
    .map((idea) => ({ ...idea, score: priorityScore(idea) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  return (
    <div className="app">
      <header>
        <h1>Priority Whiteboard</h1>
        <p>Capture ideas, vote, and rank what the team should build now.</p>
      </header>

      <section className="composer">
        <form onSubmit={addIdea}>
          <input
            value={newIdea.title}
            onChange={(e) => setNewIdea((p) => ({ ...p, title: e.target.value }))}
            placeholder="Idea title"
          />
          <input
            value={newIdea.notes}
            onChange={(e) => setNewIdea((p) => ({ ...p, notes: e.target.value }))}
            placeholder="Notes / context"
          />
          <select
            value={newIdea.column}
            onChange={(e) => setNewIdea((p) => ({ ...p, column: e.target.value }))}
          >
            {COLUMNS.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>

          {Object.keys(newIdea.metrics).map((metric) => (
            <label key={metric}>
              {metric}
              <input
                type="range"
                min="1"
                max="5"
                value={newIdea.metrics[metric]}
                onChange={(e) =>
                  setNewIdea((p) => ({
                    ...p,
                    metrics: { ...p.metrics, [metric]: Number(e.target.value) },
                  }))
                }
              />
              <span>{newIdea.metrics[metric]}</span>
            </label>
          ))}

          <button type="submit">Add idea</button>
        </form>
      </section>

      <main className="board">
        {COLUMNS.map((column) => (
          <div
            key={column}
            className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDropColumn(column)}
          >
            <h2>{column}</h2>
            {groupedIdeas[column].map((idea) => (
              <article
                key={idea.id}
                className="card"
                draggable
                onDragStart={() => setDraggedId(idea.id)}
              >
                <h3>{idea.title}</h3>
                {idea.notes && <p>{idea.notes}</p>}
                <p className="score">Score: {priorityScore(idea).toFixed(2)}</p>

                <div className="meta">
                  <button onClick={() => updateIdea(idea.id, (i) => ({ ...i, votes: i.votes + 1 }))}>
                    👍 Vote ({idea.votes})
                  </button>
                  <button onClick={() => promoteToTask(idea.id)}>Promote to Do Now</button>
                </div>

                <div className="task-fields">
                  <input
                    placeholder="Owner"
                    value={idea.owner}
                    onChange={(e) =>
                      updateIdea(idea.id, (i) => ({ ...i, owner: e.target.value }))
                    }
                  />
                  <input
                    type="date"
                    value={idea.dueDate}
                    onChange={(e) =>
                      updateIdea(idea.id, (i) => ({ ...i, dueDate: e.target.value }))
                    }
                  />
                </div>
              </article>
            ))}
          </div>
        ))}
      </main>

      <section className="leaderboard">
        <h2>Top 5 by priority score</h2>
        <ol>
          {leaderboard.map((idea) => (
            <li key={idea.id}>
              {idea.title} — {idea.score.toFixed(2)}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

export default App
