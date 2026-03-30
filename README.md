# MERN Stack Workout Tutorial

This workspace now covers the Net Ninja MERN tutorial from video `7b` onward:

- `8` Making a React App
- `9` Fetching Data
- `10` New Workout Form
- `11` Adding React Context
- `12` Deleting Data
- `13` Handling Error Responses
- `14` Finishing Touches

## Setup

### Backend

```bash
cd MERN/backend
npm install
npm run dev
```

The backend listens on `http://localhost:4000`.

### Frontend

```bash
cd MERN/frontend
npm install
npm run dev
```

The frontend expects the API at `http://localhost:4000`. You can override that with:

```bash
VITE_API_URL=http://localhost:4000
```

## What’s included

- Workout list fetch on load
- New workout form
- Context-based shared workout state
- Delete workout actions
- API error handling
- Polished finishing-touch styling
