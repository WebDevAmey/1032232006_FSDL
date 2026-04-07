#!/bin/bash
set -e
echo ""
echo "  🌿 KARAGIRI V2"
echo "  Hyperlocal artisan marketplace"
echo ""

ROOT="$(cd "$(dirname "$0")" && pwd)"

lsof -ti:5001 | xargs kill -9 2>/dev/null; true
lsof -ti:5173 | xargs kill -9 2>/dev/null; true
sleep 1

cd "$ROOT/server"
[ ! -d node_modules ] && npm install --silent

cd "$ROOT/client"
[ ! -d node_modules ] && npm install --silent

echo "  → Seeding database..."
cd "$ROOT/server"
node utils/seed.js

echo "  → Starting API server..."
node server.js &
SERVER_PID=$!
sleep 2

curl -s http://localhost:5001/api/health > /dev/null && \
  echo "  ✓ Server healthy" || echo "  ✗ Server may have issues"

echo "  → Starting React app..."
cd "$ROOT/client"
npm run dev &

echo ""
echo "  ═══════════════════════════════════"
echo "  ✅  App:    http://localhost:5173"
echo "  ✅  API:    http://localhost:5001/api"
echo "  ═══════════════════════════════════"
echo ""
echo "  Test accounts:"
echo "  buyer@kg.in    / pass1234  (buyer)"
echo "  aryan@kg.in    / pass1234  (artisan)"
echo "  priya@kg.in    / pass1234  (artisan)"
echo ""
echo "  Innovation features:"
echo "  → Craft DNA quiz: click 'Take the Quiz' on Home"
echo "  → Festival mode: click '✦ Celebrate' in Navbar"
echo "  → Live board: bottom-left activity ticker"
echo ""
echo "  Press Ctrl+C to stop."
echo ""

trap "kill $SERVER_PID 2>/dev/null; pkill -f 'vite' 2>/dev/null; exit 0" INT TERM
wait
