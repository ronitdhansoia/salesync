#!/bin/bash

echo "🚀 Starting SaleSync India Platform..."
echo ""

# Start backend
echo "📦 Starting Backend API on port 3001..."
cd backend
nohup node src/index-simple.js > server.log 2>&1 &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
echo ""

# Start frontend
echo "🎨 Starting Frontend on port 3002..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
echo ""

echo "🎉 SaleSync India is running!"
echo ""
echo "📌 Access the platform:"
echo "   Frontend: http://localhost:3002"
echo "   Backend API: http://localhost:3001"
echo ""
echo "📧 Demo Login:"
echo "   Email: demo@salesync.in"
echo "   Password: demo123"
echo ""
echo "🛑 To stop all services, run: ./stop.sh"
echo ""
echo "📊 Backend logs: tail -f backend/server.log"