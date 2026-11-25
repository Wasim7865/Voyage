# Voyage

A travel planning app I built to get comfortable with the MERN stack end to end. You browse a catalogue of destinations, save the ones you like, and build trips with a day-by-day itinerary and a budget. Prices are shown in each destination's local currency, so Tokyo is in yen and Banff is in Canadian dollars.

![Home page](docs/screenshots/home.png)

## A note on the "AI" parts

The planner, the chat assistant, the budget estimator and the packing list all run on rule-based logic in `server/controllers/aiController.js`. They read the destination's data (climate, best season, daily budget, highlights, activities) and build the answer from that. No language model is called.

I structured it so the destination summary the rules use (`buildDestinationBrief`) is the same block you would hand to an LLM as context. Plugging a real provider in is the next step, but it isn't done yet.

The flight search is also fake. It generates random prices for demo purposes.

## What's in it

- Destination explorer with search, filters and a detail page for each place
- Trip creation wizard, trip list and trip detail pages
- Itinerary view with activities, costs and a completed/not-completed toggle
- Budget planner and packing list generator
- Saved destinations (a wishlist)
- Register, login and JWT auth, with a separate admin role
- Admin dashboard for users and platform stats
- Light and dark theme, plus a settings page

## Stack

React 18, Vite, React Router, Tailwind CSS and Framer Motion on the front. Express and Mongoose 8 on the back, with MongoDB for storage. Auth uses JWT and bcryptjs, and the API is wrapped in Helmet, CORS and express-mongo-sanitize.

## Running it locally

You need Node 18 or newer. MongoDB is optional: if nothing is running on `localhost:27017`, the server falls back to an in-memory database and seeds it on startup. Data disappears when you stop the server in that mode.

```bash
git clone <your-repo-url>
cd voyage-ai

cd server
npm install
cp .env.example .env
npm run dev
```

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173. Vite proxies `/api` to the server on port 5000.

If you are using a real MongoDB instance, run `npm run seed` in `server/` once to load the destinations and demo data.

### Demo accounts

| Role  | Email                | Password   |
|-------|----------------------|------------|
| User  | demo@voyageai.com    | demo123    |
| Admin | admin@voyageai.com   | admin123   |

These only exist in the seed script. Change them before deploying anywhere public.

### Environment variables

Everything lives in `server/.env`, see `.env.example`. The only ones the app needs right now are `PORT`, `MONGODB_URI`, `JWT_SECRET` and `JWT_EXPIRE`. The OpenAI and Anthropic keys in the example file are placeholders for when a real model gets wired in.

## Project layout

```
client/src
  components/   layout, cards, assistant widget, shared UI
  context/      auth and settings state
  pages/        public/, dashboard/, admin/
  utils/        API wrapper, currency formatting
server
  controllers/  one file per resource, plus the AI logic
  models/       User, Destination, Trip, SavedDestination, Place, AIConversation
  routes/       Express routers
  middleware/   auth and error handling
  data/         destination catalogue and currency table
  seed/         demo data loader
```

## API overview

All routes are under `/api`. Everything except auth, destinations and `/health` needs a bearer token.

| Area         | Routes                                                                 |
|--------------|------------------------------------------------------------------------|
| Auth         | `POST /auth/register`, `POST /auth/login`, `GET /auth/me`, `PUT /auth/profile`, `PUT /auth/password` |
| Destinations | `GET /destinations`, `/featured`, `/trending`, `/:id` (admin can create, update, delete) |
| Trips        | CRUD on `/trips`, plus `/:id/itinerary`, `/:id/budget` and `/stats`    |
| Saved        | CRUD on `/saved-destinations`                                          |
| AI           | `POST /ai/chat`, `/plan-trip`, `/optimize-itinerary`, `/budget-plan`, `/packing-list` |
| Admin        | `GET /users`, `/users/stats`, `PUT` and `DELETE /users/:id`            |

## Things I'd do next

- Connect a real LLM behind the AI endpoints
- Replace the fake flight data with a real API
- Add tests, since there are none yet
- Deploy it and put the link at the top of this file

## License

MIT