# Testing Guide - Frontend & Backend Connection

## Quick Test Steps

### 1. Check Backend is Running
```
Backend URL: https://cleanify-2.onrender.com
```
- Go to this URL in your browser
- You should see: `{"ok":true,"msg":"Cleanify API"}`

### 2. Check Frontend Environment Variable
After Netlify redeploy completes:
1. Open your Netlify site in browser
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Paste this and press Enter:
```javascript
console.log("API_BASE is:", import.meta.env.VITE_API_BASE)
```
- Should show: `API_BASE is: https://cleanify-2.onrender.com`
- If it shows `undefined`, redeploy hasn't completed yet

### 3. Test API Call from Browser Console
In the same Console, paste:
```javascript
fetch('https://cleanify-2.onrender.com/api/reports').then(r => r.json()).then(d => console.log(d))
```
- Should show a list of reports
- If error, backend isn't accessible

### 4. Try Submit Report
1. Click "Post Complaint"
2. Fill in the form
3. Click "Submit"
4. Check Console (F12) for errors

## Netlify Deployment Status Check

1. Go to: https://app.netlify.com
2. Click your Cleanify site
3. Click **Deploys** tab
4. Look for a deployment that shows ✓ (green checkmark)
5. Check the timestamp - is it recent (after you added the env var)?

## Common Issues

| Issue | Solution |
|-------|----------|
| Still seeing "Failed to submit report" | Redeploy hasn't completed. Wait longer or manually trigger again. |
| API_BASE shows `undefined` in console | Environment variable not set in Netlify. Go back to Site Settings → Build & deploy → Environment |
| Network error in console | Backend might be down. Check https://cleanify-2.onrender.com in browser. |

## Need More Help?

Share your **Netlify site URL** so I can help debug further!
