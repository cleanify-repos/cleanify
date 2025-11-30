# 📋 Cleanify Deployment - Preparation Checklist

Complete this checklist before deployment to ensure smooth sailing!

---

## ✅ Pre-Deployment Checklist

### Code Ready
- [ ] All code is working locally (both servers running)
- [ ] No console errors in browser (F12 DevTools)
- [ ] No errors in terminal when running servers
- [ ] All features tested locally (feedback, toilets, chat, etc.)
- [ ] `.gitignore` file exists in project root
- [ ] Sensitive data removed from `.env` files

### GitHub Ready
- [ ] GitHub account created
- [ ] Git installed on your computer
- [ ] Repository created on GitHub
- [ ] All code pushed to main branch
- [ ] Verified: https://github.com/YOUR_USERNAME/cleanify shows all files

### MongoDB Ready
- [ ] MongoDB Atlas account created
- [ ] Free cluster (M0) created
- [ ] Database user created (`cleanify_user`)
- [ ] Connection string obtained and formatted correctly
- [ ] IP whitelist set to allow access
- [ ] Connection string saved in secure location

### Email Ready
- [ ] Gmail account active: `cleanifyfeedback@gmail.com`
- [ ] App Password generated: `xsni vvdw qjfy zvet`
- [ ] Email credentials saved

### Accounts Created
- [ ] GitHub account
- [ ] MongoDB Atlas account
- [ ] Render account (or Railway)
- [ ] Vercel account

---

## 🚀 Deployment Checklist

### Step 1: Render Backend
- [ ] Render account logged in
- [ ] GitHub repo connected to Render
- [ ] Web Service created with name `cleanify-api`
- [ ] Root Directory set to `server`
- [ ] Build Command: `npm install`
- [ ] Start Command: `node index.js`
- [ ] Environment variables added:
  - [ ] MONGO_URI
  - [ ] GMAIL_USER
  - [ ] GMAIL_PASSWORD
  - [ ] NODE_ENV=production
- [ ] Deployment successful (green checkmark)
- [ ] Health check passed: https://cleanify-api.onrender.com/
- [ ] API URL saved: `https://cleanify-api.onrender.com`

### Step 2: Vercel Frontend
- [ ] Vercel account logged in
- [ ] GitHub repo connected to Vercel
- [ ] Project created
- [ ] Framework: Vite
- [ ] Root Directory: `client`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Environment variables added:
  - [ ] VITE_API_BASE = your Render URL
- [ ] Deployment successful (green checkmark)
- [ ] App loads: https://cleanify.vercel.app/
- [ ] Frontend URL saved: `https://cleanify.vercel.app`

### Step 3: Update Backend CORS
- [ ] Updated `server/index.js` CORS origin
- [ ] Pushed changes to GitHub
- [ ] Render auto-deployed new version
- [ ] No CORS errors on frontend

---

## 🧪 Testing Checklist

### Frontend Loading
- [ ] Homepage loads without errors
- [ ] All navigation buttons work
- [ ] No 404 errors in console

### Database Connection
- [ ] Can post complaints
- [ ] Can view reports
- [ ] Can view toilet locator
- [ ] No "connection timeout" errors

### Geolocation Features
- [ ] Toilet Locator shows nearby toilets
- [ ] Post Complaint can set auto geolocation
- [ ] Coordinates are valid (lat -90 to 90, lng -180 to 180)

### Email Features
- [ ] Profile page: can enter and save email to database
- [ ] Feedback page: shows email from database
- [ ] Feedback submit: receives confirmation email (wait 30 seconds)
- [ ] No "email service not configured" errors

### Chat Feature
- [ ] Chat page loads
- [ ] Can type and send messages
- [ ] Messages appear in chat
- [ ] Last 100 messages show

### Toilet Management
- [ ] Can see toilet list on dashboard
- [ ] Can add new toilets (with valid coordinates)
- [ ] Can update toilet status
- [ ] Can delete toilets
- [ ] Map shows all toilets correctly

---

## 🔒 Security Checklist

- [ ] `.env` file in `.gitignore`
- [ ] No passwords in GitHub repository
- [ ] MONGO_URI not visible in public code
- [ ] GMAIL_PASSWORD only in environment variables
- [ ] GitHub repo is Public (OK for this project)
- [ ] MongoDB IP whitelist set (0.0.0.0/0 for now, can restrict later)
- [ ] Both apps use HTTPS (automatic on Render and Vercel)

---

## 📊 Performance Checklist

- [ ] Frontend page loads in < 3 seconds
- [ ] API responses in < 1 second
- [ ] No broken images or resources
- [ ] Mobile responsive (test on phone)
- [ ] No memory leaks (console clean)

---

## 🔄 Post-Deployment Checklist

### Monitoring
- [ ] Set up Render monitoring alerts
- [ ] Check logs regularly for errors
- [ ] Monitor MongoDB usage (should be < 512MB)

### Domain (Optional)
- [ ] Consider custom domain (your-domain.com)
- [ ] Set up DNS records
- [ ] Enable auto-renewal

### Backups
- [ ] Download MongoDB backup instructions
- [ ] Know how to restore data if needed

### Documentation
- [ ] Deployment guide saved
- [ ] GitHub URL: https://github.com/YOUR_USERNAME/cleanify
- [ ] Vercel URL: https://cleanify.vercel.app
- [ ] Render URL: https://cleanify-api.onrender.com
- [ ] Support links saved

---

## 🆘 Common Issues & Solutions

### Issue: Backend shows 500 error
**Check:**
- [ ] MONGO_URI is correct
- [ ] MongoDB Atlas cluster is running
- [ ] IP whitelist includes Render IPs
- [ ] Database user credentials are correct

**Fix:** Check Render logs for specific error

### Issue: Frontend shows "CORS error"
**Check:**
- [ ] VITE_API_BASE is correct
- [ ] Backend CORS origin includes your Vercel URL
- [ ] Both apps are using HTTPS

**Fix:** 
```javascript
// In server/index.js
origin: 'https://cleanify.vercel.app'
```

### Issue: Email not sending
**Check:**
- [ ] GMAIL_USER is exactly: `cleanifyfeedback@gmail.com`
- [ ] GMAIL_PASSWORD is exactly: `xsni vvdw qjfy zvet`
- [ ] User has entered valid email in profile
- [ ] Firebase/Render has 30-second timeout for email

**Fix:** Add 10-second delay in email to account for network latency

### Issue: File uploads not working
**Note:** Render free tier has ephemeral storage
**Solution:** Use Cloudinary or AWS S3 instead

### Issue: Geolocation not working
**Check:**
- [ ] Using HTTPS (automatic on Render/Vercel)
- [ ] Browser permissions set for location
- [ ] Valid coordinates format (lat,lng)

### Issue: Messages/Reports not showing
**Check:**
- [ ] Database connection is working
- [ ] MONGO_URI includes database name `cleanify`
- [ ] MongoDB collections exist

**Fix:** Check MongoDB Atlas directly to see if data is there

---

## 📈 Next Steps After Deployment

1. **Get feedback from friends**
   - Share URL: https://cleanify.vercel.app
   - Ask them to test all features
   - Note any bugs or issues

2. **Monitor for 24 hours**
   - Check logs regularly
   - Fix any critical issues
   - Ensure email is sending reliably

3. **Optimize**
   - Add custom domain
   - Set up monitoring/alerts
   - Consider paid tiers if needed

4. **Share on social media**
   - Instagram, Twitter, LinkedIn
   - Show off your project!

5. **Consider adding features**
   - User authentication/accounts
   - Better reporting interface
   - Admin dashboard
   - Analytics and statistics

---

## 📞 Getting Help

If something goes wrong:

1. **Check logs**
   - Render: Dashboard → Your Service → Logs
   - Vercel: Dashboard → Your Project → Deployments
   - MongoDB: Dashboard → Metrics

2. **Google the error**
   - Copy exact error message
   - Search with service name

3. **Ask on forums**
   - StackOverflow
   - Render community
   - Vercel community

4. **Check documentation**
   - https://render.com/docs
   - https://vercel.com/docs
   - https://docs.atlas.mongodb.com

---

**Last Updated:** November 30, 2025

**Status:** 🟢 Ready for Deployment
