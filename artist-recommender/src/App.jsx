import { useMemo, useState } from 'react'
import './App.css'

const API = 'https://api.deezer.com'
const PROXY = 'https://api.allorigins.win/raw?url='

const QUICK_PICK_ARTISTS = [
  { name: 'Playboi Carti', id: 10002824 },
  { name: 'Destroy Lonely', id: 100106432 },
  { name: 'Ken Carson', id: 2568121 },
  { name: 'Homixide Gang', id: 180378737 },
  { name: 'Yeat', id: 13399323 },
  { name: 'SoFaygo', id: 10163447 },
  { name: 'Cochise', id: 10803990 },
  { name: 'Lancey Foux', id: 10071410 },
  { name: 'Travis Scott', id: 4495513 },
  { name: 'Future', id: 5258354 },
  { name: 'Lil Uzi Vert', id: 6013505 },
  { name: 'Don Toliver', id: 8633625 },
  { name: 'Trippie Redd', id: 4724218 },
  { name: 'Lucki', id: 14500251 },
  { name: 'Young Thug', id: 5313805 },
  { name: 'Gunna', id: 11372626 },
  { name: 'Ski Mask The Slump God', id: 4872688 },
  { name: 'Pi’erre Bourne', id: 8879588 },
  { name: 'Yung Lean', id: 4865131 },
  { name: 'Bladee', id: 7725524 },
]

async function fetchDeezerJson(path) {
  const url = `${PROXY}${encodeURIComponent(`${API}${path}`)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('request-failed')
  return res.json()
}

function App() {
  const [pick1, setPick1] = useState('')
  const [pick2, setPick2] = useState('')
  const [pick3, setPick3] = useState('')
  const [loadingRecs, setLoadingRecs] = useState(false)
  const [recommendations, setRecommendations] = useState([])
  const [error, setError] = useState('')

  const selected = useMemo(
    () => [pick1, pick2, pick3]
      .filter(Boolean)
      .filter((v, i, arr) => arr.indexOf(v) === i)
      .map((name) => QUICK_PICK_ARTISTS.find((a) => a.name === name))
      .filter(Boolean),
    [pick1, pick2, pick3],
  )

  const selectedIds = useMemo(() => new Set(selected.map((a) => a.id)), [selected])

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
          const prev = map.get(candidate.id) || { ...candidate, score: 0, reasons: [] }
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
      <p>Use up to 3 quick picks, then get similar artists with music links.</p>

      <section className="panel">
        <h2>Choose up to 3 artists</h2>
        <div className="quickPickGrid">
          {[{ label: 'Pick 1', value: pick1, set: setPick1 }, { label: 'Pick 2', value: pick2, set: setPick2 }, { label: 'Pick 3', value: pick3, set: setPick3 }].map((slot) => (
            <label key={slot.label}>
              {slot.label}
              <select value={slot.value} onChange={(e) => slot.set(e.target.value)}>
                <option value="">None</option>
                {QUICK_PICK_ARTISTS.map((artist) => (
                  <option key={artist.id} value={artist.name}>{artist.name}</option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <button onClick={generateRecommendations} disabled={loadingRecs || selected.length === 0}>
          {loadingRecs ? 'Loading...' : 'Get recommendations'}
        </button>

        {error && <p className="error">{error}</p>}
      </section>

      <section className="panel">
        <h2>Recommendations</h2>
        <ul className="recommendations">
          {recommendations.map((artist, idx) => (
            <li key={artist.id}>
              <div>
                <strong>#{idx + 1} {artist.name}</strong>
                <p>{artist.why}</p>
              </div>
              <div className="actions">
                <span className="score">Match {artist.score}</span>
                <a href={artist.link} target="_blank" rel="noreferrer">Open music ↗</a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
