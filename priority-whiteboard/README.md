# Priority Whiteboard MVP

Collaborative-style idea board to capture opportunities, sort into **Do Now / Do Next / Later**, vote, and rank with a weighted priority score.

## Features (v1)

- Add idea cards with notes
- Score factors: Impact, Revenue, Urgency, Confidence, Effort
- Automatic priority score + Top 5 leaderboard
- Drag cards between columns
- Team voting (simple vote count)
- Assign owner and due date on cards
- Promote any card to **Do Now**
- Local persistence in browser (localStorage)

## Priority Formula

```text
Score =
  (Impact × 0.35)
+ (Revenue × 0.30)
+ (Urgency × 0.20)
+ (Confidence × 0.15)
- (Effort × 0.25)
+ (Votes × 0.40)
```

## Run locally

```bash
npm install
npm run dev
```

Open: http://localhost:5173

## Deploy

- Push this folder to GitHub
- Import to Vercel (Framework preset: Vite)
- Deploy

## Suggested v2 (true realtime multi-user)

- Supabase/Postgres tables for ideas + votes
- Realtime channel subscriptions per board
- User auth + vote limits per teammate
- Board sharing with invite links
- Activity feed + edit history
