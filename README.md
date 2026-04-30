# Election Compass

Election Compass is a premium, interactive election-process assistant built as a monorepo with:

- `frontend`: Next.js 15 + Tailwind CSS + Framer Motion
- `backend`: Express API with a context-aware assistant, mock election data, and Google integration service hooks

## Highlights

- Interactive horizontal election timeline with expandable detail cards
- AI-style assistant sidebar with contextual answers based on stage, state, and user profile
- Personalized checklist with progress tracking and Google Tasks sync hooks
- FAQs, official resources, accessibility-first interactions, and premium motion design
- Jest + Testing Library + Supertest + Playwright scaffolding

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Copy environment values:

```bash
cp .env.example .env.local
```

3. Start both apps:

```bash
npm run dev
```

Frontend: `http://localhost:3000`
Backend: `http://localhost:4000`

## Project structure

```text
election-assistant/
  frontend/
  backend/
  .github/workflows/ci.yml
```

## Notes

- The current implementation uses seeded election data and in-memory user progress for a fast prototype.
- Google Calendar, Maps, Tasks, Drive, and Analytics hooks are implemented behind service abstractions for easy OAuth/database wiring.
- Production hardening should add a real database, OAuth token persistence, rate limiting, and live official election feeds.

