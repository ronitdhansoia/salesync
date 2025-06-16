#!/bin/bash

echo "🛑 Stopping SaleSync India Platform..."
echo ""

# Stop backend
echo "Stopping Backend..."
ps aux | grep "index-simple.js" | grep -v grep | awk '{print $2}' | xargs kill 2>/dev/null || true

# Stop frontend
echo "Stopping Frontend..."
ps aux | grep "next-server" | grep -v grep | awk '{print $2}' | xargs kill 2>/dev/null || true
lsof -ti :3002 | xargs kill 2>/dev/null || true

echo ""
echo "✅ All services stopped"