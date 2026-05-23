# Installation Guide

## Step-by-Step Installation

### Step 1: Verify Prerequisites

Check if you have the required software installed:

```bash
node --version    # Should be v16 or higher
npm --version     # Should be 7 or higher
mongod --version  # MongoDB should be installed
```

If any are missing:
- **Node.js**: Download from https://nodejs.org/
- **MongoDB**: Download from https://www.mongodb.com/try/download/community

### Step 2: Install Backend Dependencies

Open a terminal in the project root and run:

```bash
cd backend
npm install
```

This will install:
- express
- mongoose
- socket.io
- jsonwebtoken
- bcryptjs
- dotenv
- cors
- nodemon (dev dependency)

### Step 3: Install Frontend Dependencies

Open another terminal and run:

```bash
cd frontend
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- socket.io-client
- vite
- tailwindcss
- autoprefixer
- postcss

### Step 4: Configure MongoDB

**Option A: Local MongoDB**

1. Start MongoDB service:
   ```bash
   mongod
   ```

2. The default `.env` file is already configured for local MongoDB:
   ```
   MONGO_URI=mongodb://localhost:27017/chatapp
   ```

**Option B: MongoDB Atlas (Cloud)**

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update `backend/.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp?retryWrites=true&w=majority
   ```

### Step 5: Update Environment Variables (Optional)

Edit `backend/.env` if you want to change:

```env
PORT=5000                    # Backend port
MONGO_URI=mongodb://...      # MongoDB connection
JWT_SECRET=your_secret       # Change this for production!
CLIENT_URL=http://localhost:5173  # Frontend URL
```

### Step 6: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
Connected to socket.io
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 7: Test the Application

1. Open browser to `http://localhost:5173`
2. You should see the login page
3. Click "Register" to create an account
4. Fill in the form and submit
5. You should be redirected to the chat page

### Step 8: Test Real-Time Chat

1. Keep your first user logged in
2. Open a new incognito/private browser window
3. Go to `http://localhost:5173`
4. Register a second user
5. In the first window, click "Search Users"
6. Search for the second user
7. Click on them to start a chat
8. Send messages back and forth - they should appear instantly!

## Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
- Make sure MongoDB is running: `mongod`
- Check if port 27017 is available
- Verify MONGO_URI in `.env` file
- For Atlas, check your IP whitelist and credentials

### Issue: "Port 5000 already in use"

**Solution:**
- Change PORT in `backend/.env` to another port (e.g., 5001)
- Update the axios baseURL in `frontend/src/utils/axios.js`

### Issue: "Port 5173 already in use"

**Solution:**
- Change port in `frontend/vite.config.js`:
  ```javascript
  server: {
    port: 3000, // or any other port
  }
  ```
- Update CLIENT_URL in `backend/.env`

### Issue: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: Socket.IO not connecting

**Solution:**
- Make sure backend is running first
- Check browser console for errors
- Verify ENDPOINT in `frontend/src/hooks/useSocket.js` matches backend URL
- Check CORS settings in `backend/server.js`

### Issue: JWT token errors

**Solution:**
- Clear localStorage in browser (F12 → Application → Local Storage → Clear)
- Make sure JWT_SECRET is set in `.env`
- Try logging in again

### Issue: Tailwind styles not loading

**Solution:**
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

## Verification Checklist

- [ ] Node.js installed (v16+)
- [ ] MongoDB installed and running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] `.env` file configured
- [ ] Backend server running on port 5000
- [ ] Frontend dev server running on port 5173
- [ ] Can access login page
- [ ] Can register new user
- [ ] Can login
- [ ] Can search for users
- [ ] Can send messages
- [ ] Messages appear in real-time
- [ ] Typing indicator works
- [ ] Can logout

## Production Deployment

For production deployment, you'll need to:

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Set production environment variables
3. Use a process manager like PM2 for the backend
4. Use a reverse proxy like Nginx
5. Enable HTTPS
6. Use MongoDB Atlas for database
7. Deploy to platforms like:
   - Backend: Heroku, Railway, Render, DigitalOcean
   - Frontend: Vercel, Netlify, GitHub Pages

## Need More Help?

- Check `README.md` for detailed documentation
- Check `QUICKSTART.md` for quick reference
- Check `PROJECT_SUMMARY.md` for project overview

## Common Commands Reference

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
npm start            # Start production server

# Frontend
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# MongoDB
mongod               # Start MongoDB
mongo                # Open MongoDB shell
```

## Success!

If you can send messages between two users in real-time, congratulations! Your MERN chat application is working perfectly. 🎉
