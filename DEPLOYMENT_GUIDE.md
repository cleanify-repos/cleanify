# Cleanify - Deployment Guide

This guide will help you deploy your Cleanify app to the web using free/affordable services.

## 📋 Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 Your Web Application                     │
├─────────────────────────────────────────────────────────┤
│  Frontend (React/Vite)    │    Backend (Node/Express)   │
│  Deployed on: Vercel      │    Deployed on: Render      │
│  Auto-scaling             │    MongoDB Atlas (Cloud DB)  │
└─────────────────────────────────────────────────────────┘
```

## 🌍 Recommended Deployment Stack

| Component | Service | Cost | Reason |
|-----------|---------|------|--------|
| **Frontend** | Vercel | Free | Optimized for React/Vite, auto-scaling, CDN |
| **Backend** | Render or Railway | Free tier + $7/month | Easy Node.js deployment |
| **Database** | MongoDB Atlas | Free | 512MB free tier (enough for MVP) |
| **Email** | Gmail SMTP | Free | Already configured |

---

## 🚀 Deployment Steps

### **Phase 1: Database Setup (MongoDB Atlas)**

#### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and sign up
3. Create a new project named "cleanify"
4. Create a cluster (select "M0 Free" tier)

#### Step 2: Set Up Database User
1. In Atlas, go to **Database Access**
2. Click **Add New Database User**
3. Create user:
   - Username: `cleanify_user`
   - Password: (use strong password - save it!)
   - Role: `readWriteAnyDatabase`

#### Step 3: Get Connection String
1. Go to **Databases** → Click your cluster
2. Click **Connect** button
3. Choose **Drivers** (Node.js)
4. Copy the connection string
5. Replace:
   - `<username>` with `cleanify_user`
   - `<password>` with your password
   - `myFirstDatabase` with `cleanify`

**Example:**
```
mongodb+srv://cleanify_user:YOUR_PASSWORD@cluster.mongodb.net/cleanify?retryWrites=true&w=majority
```

#### Step 4: Whitelist IP
1. Go to **Network Access**
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (0.0.0.0/0) for now
4. Or add specific IPs later

---

### **Phase 2: Backend Deployment (Render or Railway)**

#### Option A: Deploy on Render (Recommended)

**Step 1: Prepare Backend**
```bash
cd "c:\Users\Vivek\final website 2\server"
npm install
```

**Step 2: Update Environment Variables**

Create `.env` file in server folder with:
```env
PORT=4000
MONGO_URI=mongodb+srv://cleanify_user:PASSWORD@cluster.mongodb.net/cleanify?retryWrites=true&w=majority
GMAIL_USER=cleanifyfeedback@gmail.com
GMAIL_PASSWORD=xsni vvdw qjfy zvet
NODE_ENV=production
```

**Step 3: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial Cleanify deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cleanify.git
git push -u origin main
```

**Step 4: Deploy on Render**
1. Go to https://render.com
2. Sign up with GitHub
3. Create new Web Service
4. Connect GitHub repository
5. Configuration:
   - **Name:** cleanify-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Root Directory:** server
6. Add Environment Variables:
   - MONGO_URI (from MongoDB Atlas)
   - GMAIL_USER
   - GMAIL_PASSWORD
   - NODE_ENV=production
7. Click **Create Web Service**

**After deployment, you'll get a URL like:**
```
https://cleanify-api.onrender.com
```

---

### **Phase 3: Frontend Deployment (Vercel)**

#### Step 1: Prepare Frontend

Update API URL in `client/src/api.js` or create `.env.production`:

Create `client/.env.production`:
```env
VITE_API_URL=https://cleanify-api.onrender.com
```

Update `client/src/api.js` to use:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
```

#### Step 2: Update All Fetch Calls

Find all `fetch('http://localhost:4000/...` and replace with:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
fetch(`${API_URL}/api/...`)
```

#### Step 3: Push to GitHub
```bash
git add .
git commit -m "Prepare for production deployment"
git push
```

#### Step 4: Deploy on Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click **New Project**
4. Select your repository
5. Configuration:
   - **Framework Preset:** Vite
   - **Root Directory:** client
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Add Environment Variable:
   - VITE_API_URL = https://cleanify-api.onrender.com
7. Click **Deploy**

**After deployment, you'll get a URL like:**
```
https://cleanify.vercel.app
```

---

### **Phase 4: Connect Everything**

#### Update Backend CORS

In `server/index.js`, update CORS:

```javascript
app.use(cors({
  origin: 'https://cleanify.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
```

---

## 📝 Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created and running
- [ ] Database user created with password
- [ ] Connection string obtained
- [ ] GitHub repository created and code pushed
- [ ] Environment variables configured on Render
- [ ] Backend deployed successfully
- [ ] Frontend environment variables set
- [ ] Frontend deployed successfully
- [ ] CORS updated in backend
- [ ] Tested feedback email sending
- [ ] Tested toilet CRUD operations

---

## 🧪 Testing After Deployment

### Test 1: Check Backend Health
```
https://cleanify-api.onrender.com/ 
Should show: { ok: true, msg: 'Cleanify API' }
```

### Test 2: Check Database Connection
```
https://cleanify-api.onrender.com/api/reports
Should return JSON array of reports
```

### Test 3: Test Frontend
```
https://cleanify.vercel.app
Should load the app without errors
```

### Test 4: Test Email Feature
1. Go to Feedback page
2. Enter valid email
3. Submit feedback
4. Check email inbox

### Test 5: Test Geolocation
1. Go to Post Complaint
2. Click "Auto Geolocation"
3. Should show your location

---

## 🔒 Security Considerations

1. **Environment Variables:** Never commit `.env` files
2. **MongoDB User:** Use strong passwords (16+ characters)
3. **IP Whitelist:** Consider limiting MongoDB access after setup
4. **Gmail Password:** Use App Passwords, not main password
5. **CORS:** Limit to your domain only
6. **HTTPS:** Both Vercel and Render provide SSL by default

---

## 📊 Monitoring & Logs

### View Backend Logs
- Render: Dashboard → Your Service → Logs

### View Frontend Logs
- Vercel: Dashboard → Your Project → Deployments → Logs

### Monitor Database
- MongoDB Atlas: Dashboard → Metrics

---

## 💡 Troubleshooting

### Problem: "Backend not found" error
**Solution:** Check VITE_API_URL in Vercel environment variables

### Problem: CORS error
**Solution:** Update frontend URL in server/index.js CORS config

### Problem: "MongoDB connection timeout"
**Solution:** Check IP whitelist in MongoDB Atlas Network Access

### Problem: Email not sending
**Solution:** Check GMAIL_USER and GMAIL_PASSWORD on Render

### Problem: File uploads not working
**Solution:** Render free tier has ephemeral storage. Use cloud storage (AWS S3, Cloudinary)

---

## 🎯 Next Steps

1. Follow the deployment steps in order
2. Test each component after deployment
3. Monitor logs for errors
4. Consider using custom domain (your-domain.com)
5. Set up monitoring and alerts

---

## 📞 Support Resources

- **Render:** https://render.com/docs
- **Vercel:** https://vercel.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Gmail App Passwords:** https://support.google.com/accounts/answer/185833

---

**Last Updated:** November 30, 2025
