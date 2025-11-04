# Pixabay Gallery App

Image gallery app using React + Redux + Node.js

## Setup

### Backend
```bash
cd server
npm install
npm run dev
```

Create `server/.env`:
```env
PIXABAY_API_KEY=your_api_key_here
PIXABAY_BASE_URL=https://pixabay.com/api/
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## How to Run

1. Start backend (Terminal 1):
```bash
cd server
npm run dev
```

2. Start frontend (Terminal 2):
```bash
cd client
npm run dev
```

3. Open browser: `http://localhost:5173`

## Features

- 3x3 image grid
- Previous/Next pagination
- Category selection
- Sort by ID or date
- Image details modal
- Redux state management

## Note on API calls

According to the assignment, the app should fetch data from Pixabay before rendering.
For security reasons (to protect the API key), the implementation uses a backend proxy
that calls the Pixabay API and returns data to the frontend.
This maintains the required functionality while keeping the key secure.

## Tech Stack

**Frontend:** React, Redux Toolkit, Vite, Axios  
**Backend:** Node.js, Express, Axios

## API Endpoints
```
GET /api/images?category=nature&page=1&sortBy=id
GET /api/images/:id
```

## Author
Developed by Rivki Asher