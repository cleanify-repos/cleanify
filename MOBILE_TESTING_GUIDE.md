# Mobile Testing Guide - Failed to Fetch Fix

## What Changed
✅ Improved CORS (Cross-Origin Resource Sharing) configuration on the backend
- Added PATCH method support
- Better headers handling
- Proper credential configuration

## How to Test on Mobile

### Step 1: Wait for Render to Redeploy
- Changes pushed to GitHub ✅
- Render will automatically rebuild backend
- **Wait 2-3 minutes** for deployment to complete
- Check: https://render.com (your Render dashboard)

### Step 2: Test on Mobile Device

**On WiFi (same network as your PC):**

1. **Find your PC's IP address** (on Windows):
   ```powershell
   ipconfig | Select-String "IPv4"
   ```
   Look for something like: `192.168.x.x` or `10.0.x.x`

2. **Connect mobile to same WiFi**

3. **Go to your Netlify site** on mobile (the deployed URL)

4. **Try sending feedback** from mobile
   - Should work if Netlify environment variable is set correctly

**On mobile data (different network):**

1. **Go to your Netlify site** (public URL)
2. **Try sending feedback**
3. **Should work now** with improved CORS

### Step 3: Check Browser Console on Mobile

If still getting "Failed to fetch":

1. Open your site on mobile
2. Press **F12** (or **Chrome menu → More tools → Developer tools**)
3. Go to **Console** tab
4. Look for error messages like:
   - `CORS policy: ...`
   - `Failed to fetch`
   - `Network error`

**Share the exact error message if still having issues!**

## Backend Status

**Before:** `https://cleanify-2.onrender.com/` ✅ Working
**After:** Same URL, but with better CORS ✅ Coming in 2-3 minutes

### Test Endpoint
```
POST https://cleanify-2.onrender.com/api/send-feedback
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "category": "feedback",
  "feedback": "This is a test message",
  "timestamp": "2025-11-30T00:00:00Z"
}
```

## Quick Checklist

- [ ] Render deployment completed (check dashboard)
- [ ] Netlify has `VITE_API_BASE=https://cleanify-2.onrender.com` set
- [ ] Mobile device can access your Netlify site
- [ ] Try sending feedback on mobile
- [ ] Check browser console for errors

## Still Having Issues?

1. **Share the exact error** from browser console
2. **Share your Netlify site URL** (the public URL)
3. **Let me know what device/browser** you're testing on

Example error to look for:
```
Failed to fetch: TypeError: Failed to fetch
TypeError: NetworkError when attempting to fetch resource.
```

---

**Backend changes deployed!** ✅ 
Waiting for Render to rebuild... Should be live in 2-3 minutes! 🚀
