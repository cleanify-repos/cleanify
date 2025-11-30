# 🚀 Deploy Backend to Render

## Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Click "Sign up" 
3. Choose "GitHub" to sign up with your GitHub account
4. Authorize Render to access your GitHub repositories

## Step 2: Create Web Service

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Select your repository: **`cleanify`** (cleanify-repos/cleanify)
3. Fill in the configuration:

| Field | Value |
|-------|-------|
| **Name** | `cleanify-api` |
| **Environment** | `Node` |
| **Region** | Choose closest to your location |
| **Branch** | `main` |
| **Build Command** | `cd server && npm install` |
| **Start Command** | `cd server && npm start` |
| **Plan** | `Free` |

4. Click **"Create Web Service"**

⏳ Render will start building (takes 2-3 minutes)

## Step 3: Add Environment Variables

While the service is building, set up environment variables:

1. In the Render dashboard, go to your service
2. Click on **"Environment"** tab
3. Add these variables:

```
MONGO_URI=mongodb+srv://cleanify_user:<YOUR_PASSWORD>@cleanify.z2vb0ms.mongodb.net/?appName=Cleanify
NODE_ENV=production
PORT=4000
GMAIL_FROM=cleanifyfeedback@gmail.com
GMAIL_PASSWORD=xsni vvdw qjfy zvet
FEEDBACK_RECIPIENT=cleanifyfeedback@gmail.com
HOST_URL=<YOUR_RENDER_URL>  (e.g., https://cleanify-api.onrender.com)
```

⚠️ **Replace `<YOUR_PASSWORD>` with your actual MongoDB password!**

4. Click **"Save Changes"**
5. Service will auto-redeploy with new environment variables

## Step 4: Verify Backend is Running

1. Wait for deployment to complete (check logs)
2. Copy your Render URL (e.g., `https://cleanify-api.onrender.com`)
3. Test it:
```bash
curl https://cleanify-api.onrender.com/
# Should return: {"ok":true,"msg":"Cleanify API"}
```

If successful ✅, you'll see the JSON response!

## Step 5: Update Client Environment

Now update your client `.env` file:

```
VITE_API_BASE=https://cleanify-api.onrender.com
```

Then commit and push to GitHub:
```powershell
cd "c:\Users\Vivek\final website 2"
git add client/.env.example
git commit -m "Update client API endpoint for production"
git push
```

## Troubleshooting

### Service won't start
- Check Render logs for errors
- Verify MONGO_URI environment variable is correct
- Make sure MongoDB Atlas cluster is running

### Can't connect to MongoDB
- Check MongoDB password in MONGO_URI
- Go to MongoDB Atlas → Network Access → verify your IP is whitelisted
- Try connecting locally first to verify connection string

### Crashes after deploy
- Check logs in Render dashboard (Logs tab)
- Ensure all dependencies are in `server/package.json`
- Verify NODE_ENV is set to production

---

## ✅ Done!

Your backend is now running on Render! 🚀

**Save your Render URL**: You'll need it for the frontend deployment.

**Next Step**: Deploy frontend to Netlify
