# ✅ Deployment Checklist

## Prerequisites
- [ ] GitHub account created
- [ ] MongoDB Atlas account created
- [ ] Render account created
- [ ] Netlify account created
- [ ] Gmail account with 2FA enabled

## Phase 1: GitHub
- [ ] Local git repository initialized
- [ ] `.gitignore` created
- [ ] All files committed
- [ ] GitHub repository created
- [ ] Code pushed to GitHub main branch
- [ ] Repository is PUBLIC

## Phase 2: MongoDB Atlas
- [ ] Cluster created (M0 free tier)
- [ ] Connection string copied
- [ ] Database user credentials created
- [ ] Network access configured (allow all IPs for now)
- [ ] Connection tested locally

## Phase 3: Backend (Render)
- [ ] Render account linked to GitHub
- [ ] Repository connected
- [ ] Web Service created with correct build command
- [ ] Build command: `cd server && npm install`
- [ ] Start command: `cd server && npm start`
- [ ] Environment variables set:
   - [ ] MONGO_URI
   - [ ] NODE_ENV=production
   - [ ] EMAIL_USER
   - [ ] EMAIL_PASS
   - [ ] PORT=4000
- [ ] Service deployed successfully
- [ ] Backend URL obtained (e.g., cleanify-api.onrender.com)
- [ ] Test endpoint accessible: `https://cleanify-api.onrender.com/`

## Phase 4: Frontend (Netlify)
- [ ] Netlify account linked to GitHub
- [ ] Site created from GitHub repository
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Base directory: `client`
- [ ] Environment variables set:
   - [ ] VITE_API_URL=https://cleanify-api.onrender.com
- [ ] Frontend deployed successfully
- [ ] Frontend URL obtained (e.g., cleanify-app.netlify.app)

## Phase 5: Configuration Updates
- [ ] `client/src/api.js` updated with production API URL
- [ ] `server/index.js` CORS updated for production domain
- [ ] Email configuration verified
- [ ] Database seeders run (if applicable)

## Phase 6: Testing
- [ ] Backend health check: `GET /` returns 200
- [ ] Frontend loads without errors
- [ ] User signup/login works
- [ ] Report submission works
- [ ] File uploads work
- [ ] Chat functionality works
- [ ] Email notifications send
- [ ] Mobile responsive design verified

## Phase 7: Monitoring
- [ ] Render logs monitored for errors
- [ ] Netlify build logs checked
- [ ] MongoDB Atlas metrics observed
- [ ] Error tracking set up (optional)

## Production Hardening
- [ ] CORS restricted to production domains only
- [ ] Rate limiting enabled (if available)
- [ ] Input validation on all endpoints
- [ ] HTTPS enforced everywhere
- [ ] Sensitive data never logged
- [ ] Database backups configured (MongoDB Atlas automated)
- [ ] Monitoring/alerting set up

---

## Deployment Timeline
- **Step 1-2**: 10 minutes (GitHub + MongoDB)
- **Step 3**: 10 minutes (Render backend)
- **Step 4**: 10 minutes (Netlify frontend)
- **Step 5-6**: 20 minutes (Testing & fixes)
- **Total**: ~50 minutes

## Support Resources
- Render Documentation: https://render.com/docs
- Netlify Documentation: https://docs.netlify.com
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- GitHub: https://github.com/docs
