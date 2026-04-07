# Karagiri V2

## Setup
cd server && npm install
cd ../client && npm install

## Seed database
cd server && node utils/seed.js

## Run
chmod +x ../start.sh && ../start.sh
# OR separately:
# Terminal 1: cd server && node server.js
# Terminal 2: cd client && npm run dev

## Credentials (after seed)
Buyer:   buyer@kg.in  / pass1234
Artisan: aryan@kg.in  / pass1234

## Routes
Frontend: http://localhost:5173
API:      http://localhost:5001/api
Health:   http://localhost:5001/api/health
