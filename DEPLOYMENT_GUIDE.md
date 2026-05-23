# Complete Deployment Guide

## 🚀 Deploying to Vercel + MongoDB Atlas

This guide will walk you through deploying your MERN chat application to production.

---

## Part 1: MongoDB Atlas Setup (Database)

### Step 1: Create MongoDB Atlas Account

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Click "Try Free"

2. **Sign Up**
   - Use Google/GitHub account (easiest)
   - Or create with email
   - Complete verification

3. **Choose Free Tier**
   - Select "Shared" (Free tier)
   - Click "Create"

---

### Step 2: Create a Cluster

1. **Choose Cloud Provider**
   - Provider: AWS (recommended)
   - Region: Choose closest to your users
   - Cluster Tier: M0 Sandbox (FREE)
   - Click "Create Cluster"

2. **Wait for Cluster Creation**
   - Takes 3-5 minutes
   - You'll see "Cluster0" being created

---

### Step 3: Create Database User

1. **Security → Database Access**
   - Click "Add New Database User"

2. **Create User**
   - Authentication Method: Password
   - Username: `chatapp-user` (or any name)
   - Password: Click "Autogenerate Secure Password"
   - **COPY THIS PASSWORD** - You'll need it!
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

---

### Step 4: Whitelist IP Addresses

1. **Security → Network Access**
   - Click "Add IP Address"

2. **Allow Access from Anywhere** (for Vercel)
   - Click "Allow Access from Anywhere"
   - IP Address: `0.0.0.0/0`
   - Comment: "Vercel deployment"
   - Click "Confirm"

   ⚠️ **Note**: This allows all IPs. For production, you can restrict to Vercel IPs later.

---

### Step 5: Get Connection String

1. **Go to Database → Clusters**
   - Click "Connect" on your cluster

2. **Choose Connection Method**
   - Select "Connect your application"

3. **Copy Connection String**
   - Driver: Node.js
   - Version: 5.5 or later
   - Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

4. **Modify Connection String**
   - Replace `<username>` with your username (e.g., `chatapp-user`)
   - Replace `<password>` with the password you copied
   - Add database name before `?`:
   ```
   mongodb+srv://chatapp-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/chatapp?retryWrites=true&w=majority
   ```

5. **Save This Connection String** - You'll need it for Vercel!

---

## Part 2: Prepare Backend for Deployment

### Step 1: Update Backend Configuration

1. **Create `vercel.json` in backend folder**

Create file: `E:\Protfolio\backend\vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

### Step 2: Update CORS Configuration

Update `backend/server.js` to allow Vercel frontend:

```javascript
// Update CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Also update Socket.IO CORS
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  },
});
```

---

### Step 3: Create Production Environment Variables

Create `.env.production` in backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_super_secret_production_key_here
CLIENT_URL=https://your-frontend-app.vercel.app
```

⚠️ **Important**: Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## Part 3: Deploy Backend to Vercel

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Choose your preferred login method (GitHub, GitLab, Email)

---

### Step 3: Deploy Backend

1. **Navigate to backend folder**
```bash
cd backend
```

2. **Deploy**
```bash
vercel
```

3. **Answer Questions**
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N**
   - Project name? `chatapp-backend` (or any name)
   - Directory? `.` (current directory)
   - Override settings? **N**

4. **Wait for Deployment**
   - Vercel will deploy your backend
   - You'll get a URL like: `https://chatapp-backend.vercel.app`
   - **COPY THIS URL** - You'll need it!

---

### Step 4: Add Environment Variables to Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click on your backend project

2. **Settings → Environment Variables**
   - Add these variables:

   | Name | Value |
   |------|-------|
   | `MONGO_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | Your generated secret key |
   | `CLIENT_URL` | `https://your-frontend-app.vercel.app` (we'll get this next) |
   | `PORT` | `5000` |

3. **Save and Redeploy**
   - Click "Redeploy" to apply environment variables

---

## Part 4: Prepare Frontend for Deployment

### Step 1: Update API URLs

Update `frontend/src/utils/axios.js`:

```javascript
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Rest of the code...
```

---

### Step 2: Update Socket.IO URL

Update `frontend/src/hooks/useSocket.js`:

```javascript
const ENDPOINT = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
```

---

### Step 3: Create Environment Variables

Create `.env.production` in frontend folder:

```env
VITE_API_URL=https://your-backend-app.vercel.app/api
```

Replace `your-backend-app` with your actual backend URL from Step 3.

---

### Step 4: Create `vercel.json` for Frontend

Create file: `E:\Protfolio\frontend\vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures React Router works correctly.

---

## Part 5: Deploy Frontend to Vercel

### Step 1: Navigate to Frontend

```bash
cd ../frontend
```

### Step 2: Deploy

```bash
vercel
```

Answer questions:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? `chatapp-frontend` (or any name)
- Directory? `.` (current directory)
- Override settings? **N**

### Step 3: Get Frontend URL

- You'll get a URL like: `https://chatapp-frontend.vercel.app`
- **COPY THIS URL**

---

### Step 4: Add Environment Variables

1. **Go to Vercel Dashboard**
   - Click on your frontend project

2. **Settings → Environment Variables**
   - Add:

   | Name | Value |
   |------|-------|
   | `VITE_API_URL` | `https://your-backend-app.vercel.app/api` |

3. **Redeploy**

---

### Step 5: Update Backend CLIENT_URL

1. **Go to Backend Project in Vercel**
2. **Settings → Environment Variables**
3. **Update `CLIENT_URL`**
   - Value: `https://your-frontend-app.vercel.app`
4. **Redeploy Backend**

---

## Part 6: Final Configuration

### Update Both .env Files Locally

**Backend `.env`:**
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/chatapp?retryWrites=true&w=majority
JWT_SECRET=your_production_secret_here
CLIENT_URL=https://your-frontend-app.vercel.app
```

**Frontend `.env`:**
```env
VITE_API_URL=https://your-backend-app.vercel.app/api
```

---

## Part 7: Test Your Deployment

### Step 1: Visit Your Frontend URL

Open: `https://your-frontend-app.vercel.app`

### Step 2: Test Features

1. ✅ Register a new account
2. ✅ Login
3. ✅ Search for users
4. ✅ Send messages
5. ✅ Real-time messaging works
6. ✅ Typing indicators work

---

## 🔧 Troubleshooting

### Issue: CORS Errors

**Solution:**
1. Check `CLIENT_URL` in backend environment variables
2. Make sure it matches your frontend URL exactly
3. Redeploy backend after changes

---

### Issue: MongoDB Connection Failed

**Solution:**
1. Check MongoDB Atlas connection string
2. Verify username and password are correct
3. Ensure IP whitelist includes `0.0.0.0/0`
4. Check if cluster is active

---

### Issue: Socket.IO Not Connecting

**Solution:**
1. Check `VITE_API_URL` in frontend
2. Ensure backend URL is correct
3. Check browser console for errors
4. Verify CORS settings in backend

---

### Issue: 404 on Page Refresh

**Solution:**
- Make sure `vercel.json` exists in frontend with rewrites configuration

---

### Issue: Environment Variables Not Working

**Solution:**
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Make sure all variables are set
4. Click "Redeploy" after adding variables

---

## 📱 Custom Domain (Optional)

### Add Custom Domain to Vercel

1. **Go to Project Settings**
2. **Domains Tab**
3. **Add Domain**
   - Enter your domain (e.g., `chat.yourdomain.com`)
4. **Follow DNS Instructions**
   - Add CNAME record to your DNS provider
5. **Wait for SSL Certificate**
   - Vercel automatically provisions SSL

---

## 🔒 Security Checklist

Before going live:

- [ ] Changed JWT_SECRET to strong random string
- [ ] MongoDB Atlas user has strong password
- [ ] Environment variables set in Vercel (not in code)
- [ ] CORS configured correctly
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Rate limiting added (optional but recommended)
- [ ] Input validation working
- [ ] Error messages don't expose sensitive data

---

## 📊 Monitoring

### Vercel Analytics

1. **Go to Project Dashboard**
2. **Analytics Tab**
3. **Enable Analytics**
   - Track page views
   - Monitor performance
   - See user locations

### MongoDB Atlas Monitoring

1. **Go to Cluster**
2. **Metrics Tab**
   - Monitor database operations
   - Check connection count
   - View query performance

---

## 🚀 Continuous Deployment

### Connect to GitHub (Recommended)

1. **Push Code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/chatapp.git
git push -u origin main
```

2. **Connect Vercel to GitHub**
   - Go to Vercel Dashboard
   - Import Project
   - Select GitHub repository
   - Configure settings
   - Deploy

3. **Auto-Deploy on Push**
   - Every push to `main` branch auto-deploys
   - Pull requests get preview deployments

---

## 💰 Cost Breakdown

### Free Tier Limits

**MongoDB Atlas (Free):**
- 512 MB storage
- Shared RAM
- No backup
- Good for: Development, small apps

**Vercel (Free):**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS
- Good for: Personal projects, demos

### When to Upgrade

**MongoDB Atlas:**
- Upgrade when you need:
  - More storage (> 512 MB)
  - Backups
  - Better performance
  - Dedicated resources

**Vercel:**
- Upgrade when you need:
  - More bandwidth
  - Team collaboration
  - Advanced analytics
  - Custom domains (multiple)

---

## 📝 Quick Reference

### Important URLs

- **MongoDB Atlas**: https://cloud.mongodb.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Backend**: `https://your-backend-app.vercel.app`
- **Your Frontend**: `https://your-frontend-app.vercel.app`

### Commands

```bash
# Deploy backend
cd backend
vercel

# Deploy frontend
cd frontend
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Remove deployment
vercel remove
```

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured
- [ ] Connection string obtained
- [ ] Backend deployed to Vercel
- [ ] Backend environment variables set
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variables set
- [ ] CORS configured correctly
- [ ] Socket.IO working
- [ ] Real-time messaging tested
- [ ] All features working
- [ ] Custom domain added (optional)
- [ ] Analytics enabled (optional)

---

## 🎉 Success!

Your chat application is now live and accessible worldwide!

**Share your app:**
- Frontend: `https://your-frontend-app.vercel.app`
- Anyone can register and start chatting!

**Next Steps:**
1. Share with friends to test
2. Monitor usage in Vercel/Atlas dashboards
3. Add more features
4. Consider upgrading if needed

---

## 📞 Support

If you encounter issues:

1. **Check Vercel Logs**
   ```bash
   vercel logs
   ```

2. **Check MongoDB Atlas Logs**
   - Cluster → Metrics → View Logs

3. **Browser Console**
   - F12 → Console tab
   - Look for errors

4. **Vercel Community**
   - https://github.com/vercel/vercel/discussions

5. **MongoDB Community**
   - https://www.mongodb.com/community/forums

---

**Good luck with your deployment! 🚀**
