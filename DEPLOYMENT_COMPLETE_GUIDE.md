# 🚀 Complete Deployment Guide: Cleanify App

## Architecture Overview
- **Frontend**: React + Vite → Netlify
- **Backend**: Express.js → Render
- **Database**: MongoDB → MongoDB Atlas
- **Code**: GitHub
- **Email**: Gmail SMTP

---

## Phase 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Cluster
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Create new project → "Cleanify"
4. Click "Create Deployment"
5. Choose **M0 (Free)** tier
6. Select your region
7. Click "Create"

### 1.2 Get Connection String
1. Click "Connect" button
2. Choose "Drivers" → "Node.js"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.mongodb.net/cleanify?retryWrites=true&w=majority
   ```
4. **Replace `<username>` and `<password>`** with your DB credentials

### 1.3 Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development/testing)
4. Click "Confirm"

---

## Phase 2: GitHub Setup

### 2.1 Create Repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `cleanify-app`
3. Description: "Municipal complaint & toilet locator system"
4. Choose **Public**
5. Click "Create repository"

### 2.2 Push Your Code
```powershell
cd "c:\Users\Vivek\final website 2"

# If not already done:
git init
git add .
git commit -m "Initial commit: Cleanify app"

# Add your repository URL
git remote add origin https://github.com/YOUR_USERNAME/cleanify-app.git
git branch -M main
git push -u origin main
```

> **Note**: You'll be prompted for GitHub credentials. If authentication fails, [create a Personal Access Token](https://github.com/settings/tokens) and use it as password.

---

## Phase 3: Render Deployment (Backend)

### 3.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Click "Sign up"
3. Choose "GitHub" to sign up
4. Authorize Render to access your GitHub account

### 3.2 Deploy Backend Service
1. Dashboard → "New +" → "Web Service"
2. Connect your GitHub repository
3. Select `cleanify-app` repo
4. Configure:
   - **Name**: `cleanify-api`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
5. Click "Create Web Service"

### 3.3 Add Environment Variables (Render)
1. In your service, go to "Environment" tab
2. Add these variables:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cleanify
   NODE_ENV=production
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=4000
   ```
3. Click "Save"
4. Service will auto-redeploy

### 3.4 Get Your Backend URL
- In Render dashboard, copy the URL (e.g., `https://cleanify-api.onrender.com`)
- **Save this URL** - you'll need it for frontend

---

## Phase 4: Netlify Deployment (Frontend)

### 4.1 Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Click "Sign up"
3. Choose "GitHub"
4. Authorize Netlify

### 4.2 Deploy Frontend
1. Click "Add new site" → "Import an existing project"
2. Choose GitHub → Select `cleanify-app`
3. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click "Deploy site"

### 4.3 Add Environment Variables (Netlify)
1. In Netlify dashboard → "Site settings" → "Build & deploy" → "Environment"
2. Add variable:
   ```
   VITE_API_URL=https://cleanify-api.onrender.com
   ```
3. Trigger a new deploy

### 4.4 Update Frontend Client
Update `client/src/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const apiClient = {
  async request(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },
  get: (endpoint) => apiClient.request(endpoint),
  post: (endpoint, body) => apiClient.request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => apiClient.request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => apiClient.request(endpoint, { method: 'DELETE' }),
};
```

---

## Phase 5: Gmail Email Setup (for notifications)

### 5.1 Generate App Password
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication (if not already)
3. Go to "App passwords"
4. Select "Mail" and "Windows Computer"
5. Copy the generated password
6. Use this in `EMAIL_PASS` environment variable

---

## Phase 6: Testing

### 6.1 Test Backend
```bash
curl https://cleanify-api.onrender.com/
# Should return: {"ok":true,"msg":"Cleanify API"}
```

### 6.2 Test Frontend
1. Visit `https://cleanify-app.netlify.app`
2. Test all features:
   - Post a complaint
   - View reports
   - Upload files
   - Chat functionality

### 6.3 Test Database
1. Create a report through the app
2. Check in MongoDB Atlas → Collections → see your data

---

## Troubleshooting

### Backend not connecting to MongoDB
- Verify IP whitelist in MongoDB Atlas
- Check connection string in Render environment variables
- Check Render logs for error messages

### Frontend can't reach backend
- Verify `VITE_API_URL` environment variable
- Check CORS settings in `server/index.js`
- Check Render backend URL is correct

### Uploads not working
- Ensure `/uploads` folder exists on Render (it should auto-create)
- Check multer configuration in `server/routes/uploads.js`

### Emails not sending
- Verify Gmail app password is correct
- Check "Less secure app access" is enabled
- Verify email configuration in `server/config/emailConfig.js`

---

## Important Notes

⚠️ **Do NOT commit `.env` file to GitHub!**
- Use `.env.example` as template
- Add real secrets only in platform's environment variables (Render, Netlify)

✅ **For production:**
- Use strong, unique passwords
- Enable HTTPS (automatic on Render/Netlify)
- Use environment-specific configurations
- Monitor logs regularly

---

## Quick Reference: Environment Variables

### Server (.env)
```
MONGO_URI=your_mongodb_atlas_url
NODE_ENV=production
PORT=4000
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```

### Client (.env)
```
VITE_API_URL=https://cleanify-api.onrender.com
```

---

## Support & Documentation
- [Render Docs](https://render.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Vite Docs](https://vitejs.dev)
