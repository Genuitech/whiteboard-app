# Claude Project Context — Priority Whiteboard

## What this app is
Kanban-style priority board for Chea's team. Cards represent tasks/ideas with fields for priority scoring, assignee, pipeline value, status, notes, checklists, and activity logs.

- **Live URL:** https://priority-whiteboard.vercel.app
- **GitHub:** https://github.com/Genuitech/whiteboard-app (main branch → auto-deploys to Vercel)
- **Local path:** /Users/dexter/Desktop/whiteboard-app/priority-whiteboard/
- **Dev server:** `npm run dev` → port 5173

## Stack
- React + Vite (single-page app)
- Supabase (Postgres + realtime)
- Vercel (deployment)
- No TypeScript — plain JS/JSX

## Key files
- `src/App.jsx` — monolithic main component (~1600 lines), all state and UI
- `src/App.css` — all styles
- `.env.local` — Supabase URL + anon key (not committed)

## Supabase tables
- `ideas` — main task rows
- `task_meta` — supplemental per-task metadata (pipeline value, etc.)
  - Schema: `id text PRIMARY KEY, meta jsonb`
  - **Note:** This table must be created manually in Supabase dashboard if not yet done
- Falls back to `localStorage` if Supabase is not configured

## Team / assignee colors
```js
const ASSIGNEE_COLORS = {
  Chea: '#2563eb',
  Cory: '#7c3aed',
  Anthony: '#059669',
  Chadd: '#d97706',
  Zack: '#dc2626',
}
```
Cards render a colored left border based on the assigned owner.

## Drag and drop
- Uses HTML5 Drag and Drop API
- `didDragRef` prevents card click from firing after a drag completes
- Column highlights with `.column-drag-over` class on hover during drag

## Columns (status values)
Defined in `COLUMNS` constant in App.jsx — the board organizes cards by status into swimlane columns.

## Upgrade history
1. **Visual drag feedback** — column background + border highlights on dragover
2. **Pipeline total** — snapshot strip shows sum of `valuePropAmount` from active tasks
3. **Supabase task_meta sync** — task metadata upserted to `task_meta` table on change
4. **Mobile layout** — responsive breakpoints at 900px and 480px (stacked columns, adaptive snapshot grid)
5. **Assignee color coding** — colored left border on each card per owner

## Notifications
- Zapier webhook used for task assignment notifications (configured in app settings)

## Development notes
- When verifying changes, grep the source files directly — the preview screenshot tool doesn't capture React-rendered content reliably
- Push to `main` to deploy; Vercel picks it up automatically within ~1 minute
- Keep App.jsx monolithic for now (refactor only if explicitly requested)
