# 🚀 Cleanify Deployment - Quick Start (5 Steps)

Complete deployment in ~30 minutes following these steps exactly.

---

## ⏱️ Time Estimate: 30 minutes

| Step | Action | Time |
|------|--------|------|
| 1 | MongoDB Atlas Setup | 5 min |
| 2 | GitHub Push | 5 min |
| 3 | Render Backend Deploy | 5 min |
| 4 | Vercel Frontend Deploy | 5 min |
| 5 | Testing | 5 min |

---

## 🎯 Step 1: MongoDB Atlas Setup (5 minutes)

### 1.1 Create Account
- Go to https://www.mongodb.com/cloud/atlas
- Click **Try Free**
- Sign up with email
- Verify email

### 1.2 Create Cluster
- Click **Create Deployment**
- Choose **M0 Free** tier
- Click **Create**
- Wait 2-3 minutes for cluster to start

### 1.3 Create Database User
1. Left sidebar → **Security** → **Database Access**
2. Click **+ Add New Database User**
3. Fill in:
   - Username: `cleanify_user`
   - Password: `YourStrongPassword123!` (save this!)
4. Click **Add User**

### 1.4 Get Connection String
1. Left sidebar → **Deployment** → **Databases**
2. Click your cluster **Connect** button
3. Choose **Drivers** → **Node.js**
4. Copy the connection string
5. Replace:
   - `<username>` → `cleanify_user`
   - `<password>` → your password
   - `myFirstDatabase` → `cleanify`

**Example result:**
```
mongodb+srv://cleanify_user:YourPassword123@cluster0.12345.mongodb.net/cleanify?retryWrites=true&w=majority
```

**✅ Save this! You'll need it in Step 3.**

### 1.5 Whitelist IP
1. Left sidebar → **Security** → **Network Access**
2. Click **+ Add IP Address**
3. Click **Allow access from anywhere**
4. Confirm

---

## 🎯 Step 2: GitHub Push (5 minutes)

### 2.1 Install Git
- Download from https://git-scm.com/download/win
- Install with default options
- Open PowerShell and test: `git --version`

### 2.2 Create GitHub Account
- Go to https://github.com/signup
- Sign up with email
- Verify email

### 2.3 Create Repository
1. After login, click **+** → **New repository**
2. Name: `cleanify`
3. Public
4. Click **Create repository**

### 2.4 Push Code
Open PowerShell and run:

```powershell
cd "c:\Users\Vivek\final website 2"
git init
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git add .
git commit -m "Initial Cleanify deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cleanify.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

**Enter your GitHub email and create a Personal Access Token:**
1. Go to https://github.com/settings/tokens
2. Click **Generate new token**
3. Select scopes: `repo`, `read:repo_hook`
4. Copy token and use as password when Git asks

**✅ Check:** Visit `https://github.com/YOUR_USERNAME/cleanify` - you should see all files

---

## 🎯 Step 3: Render Backend Deploy (5 minutes)

### 3.1 Create Render Account
- Go to https://render.com
- Click **Sign up**
- Choose **Sign up with GitHub**
- Authorize Render

### 3.2 Deploy Backend Service
1. Dashboard → **New +** → **Web Service**
2. Select your `cleanify` repository
3. Fill in settings:
   - **Name:** `cleanify-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Root Directory:** `server`

### 3.3 Add Environment Variables
Click **Advanced** and add:

| Key | Value |
|-----|-------|
| MONGO_URI | `mongodb+srv://cleanify_user:PASSWORD@cluster0.xxx.mongodb.net/cleanify?retryWrites=true&w=majority` |
| GMAIL_USER | `cleanifyfeedback@gmail.com` |
| GMAIL_PASSWORD | `xsni vvdw qjfy zvet` |
| NODE_ENV | `production` |

### 3.4 Deploy
- Click **Create Web Service**
- Wait 3-5 minutes for build and deployment
- You'll get a URL like: `https://cleanify-api.onrender.com`

**✅ Test it:**
Visit `https://cleanify-api.onrender.com/` - you should see:
```json
{"ok": true, "msg": "Cleanify API"}
```

**✅ Save this URL! You need it for Step 4.**

---

## 🎯 Step 4: Vercel Frontend Deploy (5 minutes)

### 4.1 Create Vercel Account
- Go to https://vercel.com
- Click **Sign up**
- Choose **Sign up with GitHub**
- Authorize Vercel

### 4.2 Deploy Frontend
1. Dashboard → **Add New...** → **Project**
2. Select your `cleanify` repository
3. Click **Import**
4. Fill in:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 4.3 Add Environment Variable
Click **Environment Variables**

| Key | Value |
|-----|-------|
| VITE_API_BASE | `https://cleanify-api.onrender.com` |

*(Use your actual Render URL from Step 3)*

### 4.4 Deploy
- Click **Deploy**
- Wait 2-3 minutes
- You'll get a URL like: `https://cleanify.vercel.app`

**✅ Test it:** Visit your Vercel URL - the app should load!

---

## 🎯 Step 5: Testing (5 minutes)

### 5.1 Test Home Page
- Visit your Vercel URL
- Should see Cleanify homepage
- All buttons should work

### 5.2 Test Feedback Email
1. Go to **Profile** page
2. Enter your real email address
3. Click **Save**
4. Go to **Home** → **Provide Feedback**
5. Click star to rate
6. Click **Send Feedback**
7. Check your email for confirmation (wait 10-30 seconds)

### 5.3 Test Toilet Locator
1. Go to **Toilet Locator**
2. Click **Allow** for geolocation
3. Should show nearby toilets with distance

### 5.4 Test Post Complaint
1. Go to **Post Complaint**
2. Click **Auto Geolocation**
3. Should show your coordinates
4. Click **Verify on Google Maps** to confirm
5. (Optional: Submit a test report)

### 5.5 Test Chat
1. Go to **Chat** page
2. Type a message
3. Message should appear in the app

---

## ✅ Success Checklist

- [ ] MongoDB cluster running
- [ ] GitHub repository with all code
- [ ] Render backend deployed and accessible
- [ ] Vercel frontend deployed and accessible
- [ ] Email confirmation received for feedback
- [ ] Geolocation working on Toilet Locator
- [ ] Chat messages sending/receiving

---

## 🎉 Congratulations! 

Your Cleanify app is now live on the web! 🚀

**URLs to share:**
- **Website:** https://cleanify.vercel.app
- **API:** https://cleanify-api.onrender.com

---

## 🔄 For Future Updates

After you make changes locally:

```powershell
git add .
git commit -m "Your change description"
git push
```

This automatically triggers new deployments on Render and Vercel!

---

## 🆘 Troubleshooting

### ❌ "Backend not found" error on frontend
**Fix:** Update `VITE_API_BASE` on Vercel with correct Render URL

### ❌ "CORS error"
**Fix:** Update backend CORS in `server/index.js`:
```javascript
origin: 'https://cleanify.vercel.app'
```

### ❌ "Email not sending"
**Fix:** Check GMAIL_USER and GMAIL_PASSWORD on Render are correct

### ❌ "Database connection timeout"
**Fix:** Check MongoDB Atlas Network Access IP whitelist

### ❌ Render/Vercel shows "deployment failed"
**Fix:** Check deployment logs for specific error

---

## 📞 Support

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs  
- **MongoDB Docs:** https://docs.atlas.mongodb.com
- **GitHub Help:** https://docs.github.com

---

**You're all set!** 🎊
