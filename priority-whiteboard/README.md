# Priority Whiteboard MVP (Realtime Team Edition)

Collaborative idea board to capture opportunities, sort into **Do Now / Do Next / Later**, vote, and rank with a weighted priority score.

## Features

- Add idea cards with notes
- Score factors: Impact, Revenue, Urgency, Confidence, Effort
- Automatic priority score + Top 5 leaderboard
- Drag cards between columns
- Team voting
- Assign owner and due date
- Promote any card to **Do Now**
- **Realtime collaboration (Supabase Postgres + Realtime)**
- Local-mode fallback if env vars aren’t configured

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

## 1) Supabase setup

1. Create a Supabase project
2. In Supabase SQL editor, run: `supabase/schema.sql`
3. Copy `.env.example` to `.env`
4. Fill:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 2) Run locally

```bash
npm install
npm run dev
```

Open: http://localhost:5173

## 3) Deploy (Vercel)

- Push this folder to GitHub
- Import repo/project in Vercel (Framework: Vite)
- Add env vars in Vercel project settings
- Deploy

## Notes

- Current policies are open for fast team demo usage.
- For production, add auth and per-user vote limits.
