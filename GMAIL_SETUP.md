# 📧 Gmail Setup for Feedback Feature

## Important: Your Gmail Account Setup

To send feedback emails from the application, you need to configure a Gmail App Password. This is more secure than using your actual Gmail password.

### Step-by-Step Instructions:

#### 1. Enable 2-Factor Authentication (Required)
- Go to: https://myaccount.google.com/security
- Look for "2-Step Verification"
- Click "Enable" and follow the prompts
- This is required for App Passwords to work

#### 2. Generate App Password
- After 2FA is enabled, go to: https://myaccount.google.com/apppasswords
- Select: **Mail** 
- Select: **Windows Computer** (or your device type)
- Click "Generate"
- Google will show you a 16-character password

#### 3. Copy the Password
- The generated password will look like: `abcd efgh ijkl mnop`
- Copy this exactly (without spaces or with spaces - both work)

#### 4. Create .env File in Server
Create a file at: `c:\Users\Vivek\final website 2\server\.env`

Add these lines:
```
GMAIL_FROM=your-email@gmail.com
GMAIL_PASSWORD=abcdefghijklmnop
FEEDBACK_RECIPIENT=your-email@gmail.com
```

Replace:
- `your-email@gmail.com` with your actual Gmail address
- `abcdefghijklmnop` with the 16-character App Password from step 2
- `FEEDBACK_RECIPIENT` can be the same email or a different one

#### 5. Restart the Server
Stop the current server and restart it:
```powershell
cd "c:\Users\Vivek\final website 2\server"
npm start
```

#### 6. Test the Feature
- Open the app at http://localhost:5173/
- Go to Home and click "Provide Feedback"
- Fill in the form and submit
- Check your Gmail inbox for the feedback confirmation

---

## What Happens When You Submit Feedback?

1. **Email to Admin** - Your feedback is sent to the configured recipient
2. **Confirmation to User** - You receive a confirmation email
3. **Database** - Feedback is logged in the server console

## Troubleshooting

### If you get "Email service not configured":
- Make sure 2FA is enabled on your Gmail account
- Double-check the .env file values
- Restart the server after creating .env
- Check console for "✅ Email service is ready to send"

### If emails aren't sending:
- Gmail might be blocking less secure apps
- Try generating a new App Password
- Make sure there are no extra spaces in the password

## Security Notes

- ✅ Your App Password is separate from your main Gmail password
- ✅ You can revoke App Passwords anytime
- ✅ This method is more secure than using your actual password
- ✅ Store .env file securely (it's already in .gitignore)

---

## Example .env File Content:

```env
MONGO_URI=mongodb://localhost:27017/swachhata
PORT=4000
GMAIL_FROM=vivek.admin@gmail.com
GMAIL_PASSWORD=xyzt qwer asdf ghjk
FEEDBACK_RECIPIENT=vivek.admin@gmail.com
```

After setup, the feedback feature will be fully functional!
