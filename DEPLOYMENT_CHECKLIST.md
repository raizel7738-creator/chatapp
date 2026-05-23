# 📋 Deployment Checklist

Use this checklist to ensure everything is configured correctly before and after deployment.

---

## Pre-Deployment Checklist

### Code Preparation
- [ ] All code committed to Git
- [ ] `.gitignore` includes `.env` files
- [ ] No hardcoded secrets in code
- [ ] Environment variables use `process.env` or `import.meta.env`
- [ ] CORS configured to use environment variable
- [ ] Socket.IO URL uses environment variable

### Configuration Files
- [ ] `backend/vercel.json` exists
- [ ] `frontend/vercel.json` exists
- [ ] `backend/.env.example` created
- [ ] `frontend/.env.example` created

### Dependencies
- [ ] All npm packages installed
- [ ] `package.json` has correct scripts
- [ ] No missing dependencies

---

## MongoDB Atlas Setup

### Account & Cluster
- [ ] MongoDB Atlas account created
- [ ] Free tier cluster created (M0)
- [ ] Cluster is active and running
- [ ] Cluster region selected

### Security
- [ ] Database user created
- [ ] Strong password generated and saved
- [ ] User has "Read and write" permissions
- [ ] IP whitelist configured (`0.0.0.0/0` for Vercel)

### Connection
- [ ] Connection string obtained
- [ ] Password replaced in connection string
- [ ] Database name added (`/chatapp`)
- [ ] Connection string tested locally
- [ ] Connection string saved securely

**Example Connection String:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/chatapp?retryWrites=true&w=majority
```

---

## Backend Deployment

### Vercel Setup
- [ ] Vercel account created
- [ ] Vercel CLI installed (`npm install -g vercel`)
- [ ] Logged into Vercel (`vercel login`)

### Deployment
- [ ] Backend deployed to Vercel
- [ ] Deployment successful (no errors)
- [ ] Backend URL obtained and saved
- [ ] Backend URL accessible in browser

### Environment Variables (Vercel Dashboard)
- [ ] `MONGO_URI` added (MongoDB connection string)
- [ ] `JWT_SECRET` added (64-character random string)
- [ ] `CLIENT_URL` added (frontend URL - update after frontend deploy)
- [ ] `PORT` added (5000)
- [ ] All variables saved
- [ ] Project redeployed after adding variables

### Testing Backend
- [ ] Visit `https://your-backend.vercel.app`
- [ ] Should see "API is running..."
- [ ] Check Vercel logs for errors
- [ ] MongoDB connection successful (check logs)

---

## Frontend Deployment

### Deployment
- [ ] Frontend deployed to Vercel
- [ ] Deployment successful (no errors)
- [ ] Frontend URL obtained and saved
- [ ] Frontend URL accessible in browser

### Environment Variables (Vercel Dashboard)
- [ ] `VITE_API_URL` added (backend URL + `/api`)
- [ ] Variable saved
- [ ] Project redeployed after adding variable

### Update Backend
- [ ] Backend `CLIENT_URL` updated with frontend URL
- [ ] Backend redeployed

### Testing Frontend
- [ ] Visit `https://your-frontend.vercel.app`
- [ ] Login page loads correctly
- [ ] No console errors (F12)
- [ ] Styles loading correctly
- [ ] Dark theme visible

---

## Integration Testing

### Authentication
- [ ] Can register new account
- [ ] Registration creates user in MongoDB
- [ ] Can login with credentials
- [ ] JWT token stored in localStorage
- [ ] Can logout
- [ ] Protected routes redirect to login

### Chat Features
- [ ] Can search for users
- [ ] Can start new chat
- [ ] Can send messages
- [ ] Messages save to database
- [ ] Messages appear in chat list

### Real-Time Features
- [ ] Socket.IO connects (check connection indicator)
- [ ] Messages deliver in real-time
- [ ] Typing indicator works
- [ ] No console errors for Socket.IO

### UI/UX
- [ ] All pages load correctly
- [ ] Animations working
- [ ] Responsive on mobile
- [ ] No broken images
- [ ] All icons displaying

---

## Post-Deployment Verification

### URLs Working
- [ ] Frontend URL: `https://_____.vercel.app`
- [ ] Backend URL: `https://_____.vercel.app`
- [ ] Both URLs accessible publicly

### Database
- [ ] MongoDB Atlas cluster active
- [ ] Can see collections in Atlas dashboard
- [ ] Users collection has data
- [ ] Messages collection has data
- [ ] Chats collection has data

### Monitoring
- [ ] Vercel Analytics enabled (optional)
- [ ] MongoDB Atlas monitoring checked
- [ ] No errors in Vercel logs
- [ ] No errors in MongoDB logs

---

## Security Verification

### Secrets
- [ ] JWT_SECRET is strong and random
- [ ] MongoDB password is strong
- [ ] No secrets in Git repository
- [ ] `.env` files in `.gitignore`

### Access Control
- [ ] CORS configured correctly
- [ ] Only frontend URL allowed
- [ ] Protected routes require authentication
- [ ] JWT tokens expire (30 days)

### HTTPS
- [ ] Frontend uses HTTPS (automatic with Vercel)
- [ ] Backend uses HTTPS (automatic with Vercel)
- [ ] MongoDB uses SSL (automatic with Atlas)

---

## Performance Check

### Load Times
- [ ] Frontend loads in < 3 seconds
- [ ] Backend responds in < 1 second
- [ ] Images load quickly
- [ ] No slow queries

### Optimization
- [ ] Frontend build optimized
- [ ] Assets minified
- [ ] Images optimized
- [ ] No console warnings

---

## User Testing

### Create Test Accounts
- [ ] Register User 1
- [ ] Register User 2
- [ ] Both users can login

### Test Chat Flow
- [ ] User 1 searches for User 2
- [ ] User 1 starts chat with User 2
- [ ] User 1 sends message
- [ ] User 2 receives message in real-time
- [ ] User 2 replies
- [ ] User 1 receives reply in real-time

### Test Edge Cases
- [ ] Long messages display correctly
- [ ] Special characters work
- [ ] Emojis work
- [ ] Multiple chats work
- [ ] Page refresh maintains state

---

## Documentation

### Update README
- [ ] Add live demo URL
- [ ] Update deployment instructions
- [ ] Add screenshots
- [ ] Update tech stack

### Share Links
- [ ] Frontend URL documented
- [ ] Backend URL documented
- [ ] MongoDB cluster name documented
- [ ] Vercel project names documented

---

## Maintenance Setup

### Monitoring
- [ ] Set up Vercel notifications
- [ ] Set up MongoDB Atlas alerts
- [ ] Check logs regularly
- [ ] Monitor usage metrics

### Backups
- [ ] MongoDB Atlas backups enabled (paid tier)
- [ ] Code backed up to GitHub
- [ ] Environment variables documented

### Updates
- [ ] Plan for dependency updates
- [ ] Plan for feature additions
- [ ] Plan for bug fixes

---

## Troubleshooting Reference

### Common Issues

**Issue: CORS Error**
- Check `CLIENT_URL` in backend
- Verify it matches frontend URL exactly
- Redeploy backend

**Issue: MongoDB Connection Failed**
- Verify connection string
- Check username/password
- Confirm IP whitelist

**Issue: Socket.IO Not Connecting**
- Check `VITE_API_URL` in frontend
- Verify backend URL
- Check CORS settings

**Issue: 404 on Refresh**
- Verify `vercel.json` in frontend
- Check rewrites configuration

**Issue: Environment Variables Not Working**
- Verify variables in Vercel dashboard
- Check variable names (case-sensitive)
- Redeploy after adding variables

---

## Success Criteria

Your deployment is successful when:

✅ Frontend loads without errors
✅ Users can register and login
✅ Messages send and receive in real-time
✅ All features work as expected
✅ No console errors
✅ Mobile responsive
✅ HTTPS enabled
✅ Database connected
✅ Socket.IO connected

---

## Final Steps

- [ ] Share app with friends for testing
- [ ] Collect feedback
- [ ] Monitor for issues
- [ ] Plan next features
- [ ] Celebrate! 🎉

---

## Quick Reference

### Important URLs
- MongoDB Atlas: https://cloud.mongodb.com
- Vercel Dashboard: https://vercel.com/dashboard
- Frontend: `https://_____.vercel.app`
- Backend: `https://_____.vercel.app`

### Commands
```bash
# View logs
vercel logs

# Redeploy
vercel --prod

# Check environment variables
vercel env ls
```

---

**Deployment Complete! ✅**

Your chat application is now live and ready to use!
