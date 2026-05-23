# 📋 Quick Reference Card

## 🚀 Deployment in 3 Steps

### 1️⃣ MongoDB Atlas (Database)
```
1. Sign up: https://mongodb.com/cloud/atlas/register
2. Create free cluster (M0)
3. Create user + password
4. Whitelist IP: 0.0.0.0/0
5. Get connection string
```

### 2️⃣ Deploy Backend
```bash
cd backend
vercel
# Add env vars in dashboard:
# - MONGO_URI
# - JWT_SECRET
# - CLIENT_URL
# - PORT
```

### 3️⃣ Deploy Frontend
```bash
cd frontend
vercel
# Add env var in dashboard:
# - VITE_API_URL
```

---

## 🔑 Environment Variables

### Backend
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/chatapp?retryWrites=true&w=majority
JWT_SECRET=<64-char-random-string>
CLIENT_URL=https://your-frontend.vercel.app
PORT=5000
```

### Frontend
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

---

## 📝 Important URLs

| Service | URL |
|---------|-----|
| MongoDB Atlas | https://cloud.mongodb.com |
| Vercel Dashboard | https://vercel.com/dashboard |
| Your Frontend | https://_____.vercel.app |
| Your Backend | https://_____.vercel.app |

---

## 🛠️ Common Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Check environment variables
vercel env ls
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS Error | Check `CLIENT_URL` in backend |
| MongoDB Error | Verify connection string |
| Socket.IO Error | Check `VITE_API_URL` in frontend |
| 404 on Refresh | Verify `vercel.json` exists |
| Env Vars Not Working | Redeploy after adding variables |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `QUICK_DEPLOY.md` | 15-minute deployment |
| `DEPLOYMENT_GUIDE.md` | Complete guide |
| `MONGODB_ATLAS_SETUP.md` | Database setup |
| `DEPLOYMENT_CHECKLIST.md` | Verification |
| `UI_REDESIGN.md` | Design system |
| `SECURITY_AUDIT.md` | Security info |

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Connection string obtained
- [ ] Backend deployed to Vercel
- [ ] Backend env vars set
- [ ] Frontend deployed to Vercel
- [ ] Frontend env vars set
- [ ] Backend CLIENT_URL updated
- [ ] Both URLs working
- [ ] Features tested
- [ ] No errors in logs

---

## 🎯 Test Your Deployment

1. Visit frontend URL
2. Register account
3. Login
4. Search users
5. Send messages
6. Verify real-time works

---

## 💡 Pro Tips

- Use GitHub integration for auto-deploy
- Monitor usage in dashboards
- Start with free tier
- Upgrade when needed
- Add custom domain later

---

## 🆘 Need Help?

1. Check documentation files
2. View Vercel logs: `vercel logs`
3. Check browser console (F12)
4. Verify all env vars are set

---

**Quick Links:**
- [Quick Deploy](./QUICK_DEPLOY.md)
- [Full Guide](./DEPLOYMENT_GUIDE.md)
- [MongoDB Setup](./MONGODB_ATLAS_SETUP.md)
