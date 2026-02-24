import { useMemo, useState } from 'react'
import './App.css'

const API = 'https://api.deezer.com'
const PROXY = 'https://api.allorigins.win/raw?url='

const QUICK_PICK_ARTISTS = [
  'Playboi Carti',
  'Destroy Lonely',
  'Ken Carson',
  'Homixide Gang',
  'Yeat',
  'SoFaygo',
  'Cochise',
  'Lancey Foux',
  'Travis Scott',
  'Future',
  'Lil Uzi Vert',
  'Don Toliver',
  'Trippie Redd',
  'Lucki',
  'Young Thug',
  'Gunna',
  'Ski Mask The Slump God',
  'Pierre Bourne',
  'Yung Lean',
  'Bladee',
]

async function fetchDeezerJson(path) {
  const url = `${PROXY}${encodeURIComponent(`${API}${path}`)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('request-failed')
  return res.json()
}

function App() {
  const [query, setQuery] = useState('')
  const [quickPick, setQuickPick] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [selected, setSelected] = useState([])
  const [loadingRecs, setLoadingRecs] = useState(false)
  const [recommendations, setRecommendations] = useState([])
  const [error, setError] = useState('')

  const selectedIds = useMemo(() => new Set(selected.map((a) => a.id)), [selected])

  async function searchArtists(e, forcedQuery) {
    e?.preventDefault()
    const term = (forcedQuery ?? query).trim()
    if (!term) return
    setSearching(true)
    setError('')

    try {
      const data = await fetchDeezerJson(`/search/artist?q=${encodeURIComponent(term)}&limit=10`)
      setSearchResults(data.data || [])
    } catch {
      setError('Could not search artists right now.')
    } finally {
      setSearching(false)
    }
  }

  function addArtist(artist) {
    if (selectedIds.has(artist.id)) return
    if (selected.length >= 3) return
    setSelected((prev) => [...prev, artist])
  }

  async function handleQuickPick(name) {
    setQuickPick(name)
    if (!name) return
    setQuery(name)
    await searchArtists(undefined, name)
  }

  function removeArtist(id) {
    setSelected((prev) => prev.filter((a) => a.id !== id))
  }

  async function generateRecommendations() {
    if (selected.length === 0) return
    setLoadingRecs(true)
    setError('')

    try {
      const relatedResponses = await Promise.all(
        selected.map((artist) => fetchDeezerJson(`/artist/${artist.id}/related?limit=25`)),
      )

      const map = new Map()
      relatedResponses.forEach((payload, idx) => {
        const source = selected[idx]
        ;(payload.data || []).forEach((candidate) => {
          if (selectedIds.has(candidate.id)) return
          const prev = map.get(candidate.id) || {
            ...candidate,
            score: 0,
            reasons: [],
          }
          prev.score += 1
          prev.reasons.push(source.name)
          map.set(candidate.id, prev)
        })
      })

      const ranked = [...map.values()]
        .sort((a, b) => b.score - a.score)
        .slice(0, 15)
        .map((artist) => ({
          ...artist,
          why:
            artist.reasons.length >= 2
              ? `Similar to ${artist.reasons.slice(0, 2).join(' and ')}.`
              : `Similar to ${artist.reasons[0]}.`,
        }))

      setRecommendations(ranked)
    } catch {
      setError('Could not load recommendations right now.')
    } finally {
      setLoadingRecs(false)
    }
  }

  return (
    <div className="app">
      <h1>Artist Recommender</h1>
      <p>Search any artist, select up to 3, then get similar artist recommendations.</p>

      <section className="panel">
        <h2>1) Search artists</h2>
        <form className="searchRow" onSubmit={searchArtists}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any artist (e.g., Playboi Carti)"
          />
          <button type="submit" disabled={searching}>
            {searching ? 'Searching...' : 'Search'}
          </button>
        </form>

        <div className="quickPickRow">
          <label htmlFor="quick-pick">Quick pick</label>
          <select
            id="quick-pick"
            value={quickPick}
            onChange={(e) => handleQuickPick(e.target.value)}
          >
            <option value="">Select an artist…</option>
            {QUICK_PICK_ARTISTS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="selectedRow">
          <strong>Selected ({selected.length}/3):</strong>
          <div className="chips">
            {selected.map((artist) => (
              <button key={artist.id} className="chip active" onClick={() => removeArtist(artist.id)}>
                {artist.name} ✕
              </button>
            ))}
          </div>
        </div>

        <ul className="results">
          {searchResults.map((artist) => (
            <li key={artist.id}>
              <span>{artist.name}</span>
              <button disabled={selected.length >= 3 || selectedIds.has(artist.id)} onClick={() => addArtist(artist)}>
                Add
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>2) Recommendations</h2>
        <button onClick={generateRecommendations} disabled={loadingRecs || selected.length === 0}>
          {loadingRecs ? 'Loading...' : 'Get recommendations'}
        </button>

        {error && <p className="error">{error}</p>}

        <ul className="recommendations">
          {recommendations.map((artist, idx) => (
            <li key={artist.id}>
              <div>
                <strong>
                  #{idx + 1} {artist.name}
                </strong>
                <p>{artist.why}</p>
              </div>
              <div className="actions">
                <span className="score">Match {artist.score}</span>
                <a href={artist.link} target="_blank" rel="noreferrer">
                  Open music ↗
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
