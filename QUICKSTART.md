# Quick Start Guide

## Prerequisites Check

Make sure you have these installed:
- Node.js (v16+): `node --version`
- MongoDB: `mongod --version`
- npm: `npm --version`

## Installation Steps

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 3. Configure Environment

The `.env` file is already created in the backend folder. Update if needed:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CLIENT_URL=http://localhost:5173
```

**For MongoDB Atlas:**
Replace `MONGO_URI` with your Atlas connection string:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp?retryWrites=true&w=majority
```

## Running the App

### Option 1: Run in Separate Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Windows Quick Start (PowerShell)

Create a file `start.ps1` in the root directory:

```powershell
# Start MongoDB (if local)
Start-Process mongod

# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
```

Then run: `.\start.ps1`

## Testing the Application

1. Open browser to `http://localhost:5173`
2. Register a new account (e.g., user1@test.com)
3. Open an incognito/private window
4. Register another account (e.g., user2@test.com)
5. In one window, search for the other user
6. Start chatting in real-time!

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod`
- Check if port 27017 is available
- Verify MONGO_URI in .env file

### Port Already in Use
- Backend (5000): Change PORT in .env
- Frontend (5173): Change port in vite.config.js

### Socket.IO Connection Failed
- Ensure backend is running first
- Check CORS settings in server.js
- Verify CLIENT_URL in .env matches frontend URL

### Module Not Found Errors
- Delete node_modules and package-lock.json
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Default Ports

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017

## Next Steps

- Customize the UI in frontend/src/components
- Add more features (file upload, emojis, etc.)
- Deploy to production (Heroku, Vercel, etc.)
- Add more socket events for enhanced features

## Need Help?

Check the main README.md for detailed documentation.
