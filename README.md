# MERN Stack Real-Time Chat Application

A full-stack real-time chat application built with MongoDB, Express.js, React, and Node.js (MERN stack) featuring a modern dark glassmorphism UI and Socket.IO for real-time messaging.

![Chat App](https://img.shields.io/badge/MERN-Stack-green)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--time-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-FF0080)

---

## ✨ Features

### 🔐 Authentication
- User registration with email and password
- Secure login with JWT tokens
- Password hashing with bcryptjs
- Protected routes on frontend and backend
- Automatic session persistence

### 💬 Real-Time Chat
- One-on-one private messaging
- Group chat support
- Instant message delivery via Socket.IO
- Message history and persistence
- Typing indicators
- Online/offline status tracking
- Read receipts

### 🎨 Modern UI
- **Dark Glassmorphism** aesthetic
- Smooth animations with Framer Motion
- Responsive design (mobile, tablet, desktop)
- Custom scrollbars
- Loading and empty states
- Toast notifications
- Connection status indicator

### 🔍 User Features
- Search users by name or email
- User avatars with initials fallback
- Chat list with latest messages
- Message timestamps
- User presence indicators

---

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Socket.IO Client** - Real-time client
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **React Router DOM v6** - Routing
- **Context API** - State management

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd Protfolio
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run Application

**Start MongoDB:**
```bash
mongod
```

**Start Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Start Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

**Open Browser:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 🌐 Deployment

### 🚀 Ready to Deploy?

**👉 START HERE:** [START_HERE.md](./START_HERE.md)

Choose your deployment method:

1. **GitHub + Vercel** (Recommended) ⭐
   - [GITHUB_STEP_BY_STEP.md](./GITHUB_STEP_BY_STEP.md) - Easiest method
   - Visual interface, auto-deploy on push
   - Perfect for beginners

2. **Vercel CLI**
   - [DEPLOY_NOW.md](./DEPLOY_NOW.md) - 10-minute deployment
   - Command line deployment
   - Quick and direct

3. **Fix CORS Error** (If already deployed)
   - [FIX_CORS_NOW.md](./FIX_CORS_NOW.md) - 2-minute fix
   - Fixes current deployment issues

### 📚 Complete Deployment Documentation

- **[START_HERE.md](./START_HERE.md)** - Choose your path
- **[GITHUB_STEP_BY_STEP.md](./GITHUB_STEP_BY_STEP.md)** - GitHub deployment (recommended)
- **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** - CLI deployment
- **[FIX_CORS_NOW.md](./FIX_CORS_NOW.md)** - Fix CORS errors
- **[MY_DEPLOYMENT_INFO.md](./MY_DEPLOYMENT_INFO.md)** - Your MongoDB & secrets
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete guide
- **[MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)** - Database setup
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Verification steps

---

## 📚 Documentation

### Setup & Deployment
- [Quick Deploy Guide](./QUICK_DEPLOY.md) - 15-minute deployment
- [Complete Deployment Guide](./DEPLOYMENT_GUIDE.md) - Detailed instructions
- [MongoDB Atlas Setup](./MONGODB_ATLAS_SETUP.md) - Database setup
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Verification
- [Deployment Summary](./DEPLOYMENT_SUMMARY.md) - Overview

### Development
- [Installation Guide](./INSTALLATION.md) - Local setup
- [Quick Start](./QUICKSTART.md) - Get started quickly
- [Features Documentation](./FEATURES.md) - Complete feature list
- [Testing Checklist](./TESTING_CHECKLIST.md) - Test all features

### Technical
- [Security Audit](./SECURITY_AUDIT.md) - Security analysis
- [Implementation Verification](./IMPLEMENTATION_VERIFICATION.md) - Code verification
- [Socket.IO Fix](./SOCKET_FIX.md) - Real-time improvements
- [UI Redesign](./UI_REDESIGN.md) - Design system documentation

---

## 🎨 UI Design System

### Color Palette
```javascript
surface: {
  DEFAULT: '#0f0f0f',      // Background
  card: 'rgba(255,255,255,0.04)',  // Glass cards
  hover: 'rgba(255,255,255,0.07)', // Hover state
  border: 'rgba(255,255,255,0.08)', // Borders
}
accent: {
  DEFAULT: '#6366f1',      // Primary accent
  light: '#818cf8',        // Light variant
  glow: 'rgba(99,102,241,0.3)', // Glow effect
}
text: {
  primary: '#f1f5f9',      // Main text
  secondary: '#94a3b8',    // Secondary text
  muted: '#475569',        // Muted text
}
```

### Typography
- **Display Font:** Plus Jakarta Sans
- **Body Font:** Inter
- **Scale:** 11px → 24px

### Components
- Avatar with online status
- Glass morphism cards
- Gradient buttons
- Animated message bubbles
- Typing indicators
- Toast notifications

**See:** [UI Redesign Documentation](./UI_REDESIGN.md)

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register  - Register new user
POST   /api/auth/login     - Login user
GET    /api/auth/me        - Get current user (protected)
```

### Chats
```
GET    /api/chats          - Get all chats (protected)
POST   /api/chats          - Create/access chat (protected)
POST   /api/chats/group    - Create group chat (protected)
GET    /api/chats/users    - Search users (protected)
```

### Messages
```
GET    /api/messages/:id   - Get chat messages (protected)
POST   /api/messages       - Send message (protected)
```

---

## 🔌 Socket.IO Events

### Client → Server
- `setup` - Initialize user connection
- `join_chat` - Join chat room
- `send_message` - Send message
- `typing` - User typing
- `stop_typing` - Stop typing

### Server → Client
- `connected` - Connection established
- `message_received` - New message
- `typing` - User typing
- `stop_typing` - User stopped typing
- `user_online` - User came online
- `user_offline` - User went offline

---

## 🗄️ Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  isOnline: Boolean,
  lastSeen: Date,
  timestamps: true
}
```

### Chat
```javascript
{
  chatName: String,
  isGroupChat: Boolean,
  users: [ObjectId],
  latestMessage: ObjectId,
  groupAdmin: ObjectId,
  timestamps: true
}
```

### Message
```javascript
{
  sender: ObjectId,
  content: String,
  chat: ObjectId,
  readBy: [ObjectId],
  timestamps: true
}
```

---

## 🔒 Security

- ✅ JWT authentication with 30-day expiration
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ Protected API routes with middleware
- ✅ CORS configuration
- ✅ Input validation
- ✅ Environment variables for secrets
- ✅ No sensitive data in responses
- ✅ Secure Socket.IO connections

**See:** [Security Audit](./SECURITY_AUDIT.md)

---

## 🧪 Testing

### Manual Testing
1. Register two users
2. Login with both accounts
3. Search for users
4. Start a chat
5. Send messages
6. Verify real-time delivery
7. Test typing indicators
8. Check online status

**See:** [Testing Checklist](./TESTING_CHECKLIST.md)

---

## 📱 Responsive Design

- **Mobile** (< 768px): Full-screen chat, bottom navigation
- **Tablet** (768px - 1024px): Two-panel layout
- **Desktop** (> 1024px): Three-panel layout

All touch targets are minimum 44x44px for accessibility.

---

## ♿ Accessibility

- ✅ Keyboard navigation support
- ✅ Focus indicators on interactive elements
- ✅ ARIA labels where needed
- ✅ Color contrast 4.5:1 minimum
- ✅ Reduced motion support
- ✅ Screen reader friendly

---

## 🚀 Performance

- Framer Motion animations use GPU acceleration
- Backdrop blur uses CSS filters
- Optimized re-renders with React Context
- Efficient Socket.IO event handling
- Lazy loading ready
- Debounced search

---

## 📊 Project Structure

```
Protfolio/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # JWT authentication
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── socket/          # Socket.IO handlers
│   ├── .env             # Environment variables
│   ├── server.js        # Main server file
│   └── vercel.json      # Vercel config
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   │   └── ui/      # Reusable UI components
│   │   ├── context/     # State management
│   │   ├── hooks/       # Custom hooks
│   │   ├── pages/       # Route pages
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── .env             # Environment variables
│   ├── vite.config.js   # Vite configuration
│   ├── tailwind.config.js # Tailwind configuration
│   └── vercel.json      # Vercel config
│
└── Documentation files
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

- Design inspiration: Linear, Vercel, Notion
- Icons: Lucide React
- Animations: Framer Motion
- UI Framework: Tailwind CSS

---

## 📞 Support

For issues and questions:
- Check documentation files
- Review troubleshooting sections
- Open an issue on GitHub

---

## 🎉 Success!

Your chat application is ready to use! Follow the deployment guides to make it live.

**Happy Chatting! 💬**
