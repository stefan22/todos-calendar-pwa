# TODO Calendar PWA

A Node 16-compatible Next.js starter for a user-owned TODO app with responsive views, calendar browsing, GraphQL integration, Hygraph-ready API routes, and PWA configuration.

## Stack

- Next.js 13 Pages Router
- TypeScript
- Tailwind CSS
- GraphQL with `graphql-request`
- Hygraph-ready API routes
- PWA manifest and `next-pwa`

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Hygraph Setup

Create these models in Hygraph:

### User

- `email`: Single line text, unique
- `name`: Single line text

### Todo

- `title`: Single line text
- `description`: Multi-line text
- `status`: Enumeration: `TODO`, `IN_PROGRESS`, `DONE`
- `priority`: Enumeration: `LOW`, `MEDIUM`, `HIGH`
- `dueDate`: Date
- `ownerEmail`: Single line text

Copy `.env.example` to `.env.local` and set:

```bash
HYGRAPH_ENDPOINT=...
HYGRAPH_TOKEN=...
```

The included API route shows the server-side GraphQL pattern. Keep the Hygraph token server-only.
