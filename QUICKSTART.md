# SaleSync India - Quick Start Guide

## 🚀 Running the Platform

### One-Command Start
```bash
./start.sh
```

This will start both:
- Backend API on http://localhost:3001
- Frontend Dashboard on http://localhost:3002

### Accessing the Platform

1. Open http://localhost:3002 in your browser
2. Login with demo credentials:
   - Email: `demo@salesync.in`
   - Password: `demo123`

## 🎯 Features Available

### Dashboard
- View overall statistics
- Quick actions for campaigns and contacts
- Platform features overview

### Contacts Management
- Add new contacts
- Search and filter contacts
- Import/Export functionality (UI ready)
- Contact details with Indian phone validation

### Campaign Management
- Create WhatsApp, Email, SMS campaigns
- Campaign templates with personalization
- Campaign status tracking
- Analytics view (UI ready)

## 🛠️ Development

### Backend API Endpoints
- `GET /health` - Health check
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/contacts` - List contacts (auth required)
- `POST /api/contacts` - Add contact (auth required)
- `GET /api/campaigns` - List campaigns (auth required)
- `POST /api/campaigns` - Create campaign (auth required)

### Tech Stack
- Backend: Node.js + Express
- Frontend: Next.js 15 + TypeScript + Tailwind CSS
- Database: In-memory (for demo)
- Auth: JWT tokens

## 🛑 Stopping the Platform
```bash
./stop.sh
```

## 📝 Next Steps

1. **Database Integration**: Connect PostgreSQL for persistent data
2. **WhatsApp Integration**: Implement WhatsApp Business API
3. **Email/SMS**: Add Twilio and Nodemailer integration
4. **Analytics**: Build real analytics dashboard
5. **Payments**: Integrate Razorpay for subscriptions

## 🐛 Troubleshooting

### Port Already in Use
If you see port conflicts:
```bash
# Kill specific port
lsof -ti :3001 | xargs kill
lsof -ti :3002 | xargs kill
```

### View Logs
```bash
# Backend logs
tail -f backend/server.log

# Frontend logs (shown in terminal)
```

## 🎉 Ready to Use!

The platform is now fully integrated and ready for use. You can:
1. Login and explore the dashboard
2. Add contacts
3. Create campaigns
4. View the responsive UI on mobile/desktop

Enjoy building your Indian sales automation empire! 🚀