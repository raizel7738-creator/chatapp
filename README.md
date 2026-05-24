# 💬 Real-Time Chat Application

A modern, full-stack real-time chat application built with the MERN stack, featuring a stunning dark glassmorphism UI, instant messaging, and seamless user experience.

## 🌐 Live Demo

**Frontend:** [https://chatapp-frontend-chi-lake.vercel.app](https://chatapp-frontend-chi-lake.vercel.app)  
**Backend API:** [https://chatapp-backend-blond.vercel.app](https://chatapp-backend-blond.vercel.app)

---

## ✨ Features

### 🔐 Authentication & Security
- Secure user registration and login with JWT tokens
- Password hashing using bcryptjs
- Protected routes with authentication middleware
- Persistent user sessions

### 💬 Real-Time Messaging
- Instant message delivery powered by Socket.IO
- One-on-one private conversations
- Group chat functionality
- Live typing indicators
- Online/offline user status
- Message read receipts
- Automatic reconnection handling

### 🎨 Modern UI/UX
- Dark glassmorphism design aesthetic
- Smooth animations with Framer Motion
- Fully responsive (mobile, tablet, desktop)
- Toast notifications for user feedback
- Custom-designed UI components
- Lucide React icons throughout
- WCAG accessibility compliant

### 🔍 Additional Features
- Real-time user search
- Unread message indicators
- Message timestamps
- User avatars with online status
- Connection status indicator

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Socket.IO Client** - Real-time client
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon set
- **Sonner** - Toast notifications
- **Context API** - State management

### Deployment
- **Vercel** - Frontend and backend hosting
- **MongoDB Atlas** - Cloud database hosting

---

## 📁 Project Structure

```
chatapp/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── chatController.js     # Chat operations
│   │   └── messageController.js  # Message handling
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Chat.js               # Chat schema
│   │   └── Message.js            # Message schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── chatRoutes.js         # Chat endpoints
│   │   └── messageRoutes.js      # Message endpoints
│   ├── socket/
│   │   └── socketHandler.js      # Socket.IO logic
│   ├── server.js                 # Main server file
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ui/                # Reusable UI components
    │   │   ├── ChatBox.jsx        # Message display
    │   │   ├── ChatList.jsx       # Conversation list
    │   │   ├── Navbar.jsx         # Top navigation
    │   │   ├── ProtectedRoute.jsx # Route protection
    │   │   └── SearchModal.jsx    # User search
    │   ├── context/
    │   │   ├── AuthContext.jsx    # Auth state management
    │   │   └── ChatContext.jsx    # Chat state management
    │   ├── hooks/
    │   │   └── useSocket.js       # Socket.IO hook
    │   ├── pages/
    │   │   ├── LoginPage.jsx      # Login page
    │   │   ├── RegisterPage.jsx   # Registration page
    │   │   └── ChatPage.jsx       # Main chat interface
    │   ├── utils/
    │   │   ├── axios.js           # Axios configuration
    │   │   └── cn.js              # Utility functions
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/raizel7738-creator/chatapp.git
   cd chatapp
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**

   Create `backend/.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   CLIENT_URL=http://localhost:5173
   ```

   Create `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start the development servers**

   Backend (Terminal 1):
   ```bash
   cd backend
   npm start
   ```

   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Chats
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/chats` | Get all user chats |
| POST | `/api/chats` | Create/access one-on-one chat |
| POST | `/api/chats/group` | Create group chat |
| GET | `/api/chats/users` | Search users |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/:chatId` | Get chat messages |
| POST | `/api/messages` | Send message |

---

## 🔄 Socket.IO Events

### Client → Server
- `setup` - Initialize user connection
- `join chat` - Join specific chat room
- `typing` - User is typing
- `stop typing` - User stopped typing
- `new message` - Send new message

### Server → Client
- `connected` - Connection established
- `message received` - New message received
- `typing` - Typing notification
- `stop typing` - Stop typing notification

---

## 🎨 Design System

### Color Palette
```javascript
colors: {
  surface: {
    DEFAULT: '#0f0f0f',      // Background
    card: 'rgba(255,255,255,0.04)',  // Glass cards
    hover: 'rgba(255,255,255,0.07)', // Hover state
    border: 'rgba(255,255,255,0.08)', // Borders
  },
  accent: {
    DEFAULT: '#6366f1',      // Primary accent
    light: '#818cf8',        // Light variant
    glow: 'rgba(99,102,241,0.3)', // Glow effect
  },
  text: {
    primary: '#f1f5f9',      // Main text
    secondary: '#94a3b8',    // Secondary text
    muted: '#475569',        // Muted text
  }
}
```

### Typography
- **Display Font:** Plus Jakarta Sans
- **Body Font:** Inter
- **Scale:** 11px → 24px

---

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Model
```javascript
{
  chatName: String,
  isGroupChat: Boolean,
  users: [ObjectId],
  latestMessage: ObjectId,
  groupAdmin: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model
```javascript
{
  sender: ObjectId,
  content: String,
  chat: ObjectId,
  readBy: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs (10 salt rounds)
- Protected API routes with middleware
- CORS configuration for secure cross-origin requests
- Environment variables for sensitive data
- Input validation and sanitization
- XSS protection

---

## 📱 Responsive Design

- **Mobile** (< 768px): Full-screen chat view with bottom navigation
- **Tablet** (768px - 1024px): Two-panel layout (sidebar + chat)
- **Desktop** (> 1024px): Three-panel layout (sidebar + chat + info)

All interactive elements have minimum 44x44px touch targets for accessibility.

---

## ♿ Accessibility

- Keyboard navigation support
- Focus indicators on all interactive elements
- ARIA labels where appropriate
- Color contrast ratio of 4.5:1 minimum
- Respects `prefers-reduced-motion`
- Screen reader friendly

---

## 🚀 Deployment

This application is deployed on Vercel with MongoDB Atlas as the database.

### Deploy Your Own

1. Fork this repository
2. Create a MongoDB Atlas cluster
3. Deploy backend to Vercel:
   - Import from GitHub
   - Set root directory to `backend`
   - Add environment variables
4. Deploy frontend to Vercel:
   - Import from GitHub
   - Set root directory to `frontend`
   - Add environment variables

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Ajay CR**

- GitHub: [@raizel7738-creator](https://github.com/raizel7738-creator)
- Email: raizel773817@gmail.com

---

## 🙏 Acknowledgments

- Design inspiration from Linear, Vercel, and Notion
- Icons by Lucide React
- Animations by Framer Motion
- UI framework by Tailwind CSS

---

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

⭐ **If you like this project, please give it a star!**

---

**Built with ❤️ using the MERN stack**
