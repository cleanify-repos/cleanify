# Deploy Frontend to Vercel (Instead of Netlify)

## Why Vercel?
✅ **Better for React/Vite apps** - optimized build system  
✅ **Faster deployments** - especially for large projects  
✅ **Better free tier** - higher rate limits, better performance  
✅ **Automatic deployments** from GitHub  
✅ **Environment variables** work smoothly  

---

## Step-by-Step Setup

### Step 1: Create Vercel Account
1. Go to: https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. Complete signup

### Step 2: Import Your GitHub Repository
1. After login, click **"Add New"** → **"Project"**
2. Select **GitHub** as source
3. Find and select: `cleanify-repos/cleanify`
4. Click **"Import"**

### Step 3: Configure Build Settings
Vercel should auto-detect, but verify:
- **Framework:** Vite (or Next.js if auto-selected)
- **Build Command:** `cd client && npm install && npm run build`
- **Output Directory:** `client/dist`
- **Root Directory:** Leave blank (./

**If auto-detection is wrong:**
1. Click **"Edit"** button
2. Set values manually as above
3. Click **"Save"**

### Step 4: Set Environment Variables
1. Click **"Environment Variables"**
2. Add this variable:
   - **Key:** `VITE_API_BASE`
   - **Value:** `https://cleanify-2.onrender.com`
   - **Environments:** Select "Production", "Preview", "Development"
3. Click **"Save"**

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. ✅ You should see a green checkmark when done
4. **Your Vercel URL** will be shown at the top (looks like `cleanify-git-main-yourname.vercel.app`)

---

## Testing After Deployment

### ✅ Test on Desktop
1. Visit your **Vercel URL**
2. Try: Submit a report, send feedback, update profile
3. All should work with **production API**

### ✅ Test on Mobile
1. Open your **Vercel URL** on mobile device
2. Try: Feedback, profile update, report submission
3. **Should work perfectly now!** 🎉

### ✅ Verify Environment Variable
1. In browser, press **F12** (Developer Tools)
2. Go to **Console** tab
3. Paste and run:
```javascript
console.log("API_BASE:", import.meta.env.VITE_API_BASE)
```
Should show: `API_BASE: https://cleanify-2.onrender.com`

---

## Automatic Deployments

**Every time you push to GitHub, Vercel automatically:**
1. 🔄 Builds your project
2. 🧪 Deploys to staging preview URL (for testing)
3. ✅ Deploys to production URL (when merged to main)

---

## Disable Netlify

Since you're using Vercel now, you can disconnect Netlify:
1. Go to: https://app.netlify.com
2. Find your site → **Site settings**
3. Scroll to **Danger zone** → **Delete site**
4. Or just leave it (won't cause issues if both are deployed)

---

## Your Current Setup

| Component | Platform | URL |
|-----------|----------|-----|
| **Frontend** | **Vercel** | Your Vercel URL (coming soon) |
| **Backend** | Render | https://cleanify-2.onrender.com |
| **Database** | MongoDB Atlas | Connected ✅ |
| **Code** | GitHub | https://github.com/cleanify-repos/cleanify |

---

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| **Build fails** | Check Vercel build logs for errors. Common: missing env var |
| **API still not working on mobile** | Verify VITE_API_BASE is set in Vercel dashboard |
| **Old version showing** | Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on PC) |
| **Environment variable not working** | Redeploy after adding env var |

---

## Next Steps

1. ✅ Go to https://vercel.com/signup
2. ✅ Connect your GitHub repo `cleanify-repos/cleanify`
3. ✅ Set VITE_API_BASE environment variable
4. ✅ Deploy!
5. ✅ Test on mobile with new Vercel URL

**Share your Vercel URL once it's deployed, and I'll help verify everything works!** 🚀
