# GitHub Setup for Cleanify Deployment

This guide will help you push your code to GitHub, which is required for deployment on Vercel and Render.

## 📋 Prerequisites

1. **Git installed** - Download from https://git-scm.com/
2. **GitHub account** - Create at https://github.com
3. Your code ready to commit

## 🔑 Step 1: Create GitHub Account & Repository

### 1.1 Create Account
1. Go to https://github.com/signup
2. Sign up with your email
3. Verify email
4. Choose free plan

### 1.2 Create Repository
1. After login, click **+** (top right) → **New repository**
2. Repository name: `cleanify`
3. Description: `"Cleanify - Community Sanitation App"`
4. Select **Public** (required for free tier)
5. **DO NOT** initialize with README (we have our own)
6. Click **Create repository**

You'll see commands like:
```
git remote add origin https://github.com/YOUR_USERNAME/cleanify.git
```

## 🚀 Step 2: Set Up Git Locally

### 2.1 Configure Git

Open PowerShell and run:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### 2.2 Navigate to Project
```powershell
cd "c:\Users\Vivek\final website 2"
```

### 2.3 Initialize Git Repository
```powershell
git init
```

### 2.4 Create .gitignore File

Create a `.gitignore` file in your project root:

```
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Environment variables
.env
.env.local
.env.*.local

# Production
dist/
build/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Uploads
uploads/
```

### 2.5 Add Remote Repository
Replace `YOUR_USERNAME` with your GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/cleanify.git
git branch -M main
```

## 📝 Step 3: First Commit and Push

### 3.1 Stage All Files
```powershell
git add .
```

### 3.2 Create Initial Commit
```powershell
git commit -m "Initial commit: Cleanify app with toilet management, feedback system, and geolocation"
```

### 3.3 Push to GitHub

First push (enter GitHub credentials if prompted):
```powershell
git push -u origin main
```

For subsequent pushes, just use:
```powershell
git push
```

## ✅ Verification

1. Go to https://github.com/YOUR_USERNAME/cleanify
2. You should see all your files uploaded
3. Check that `.env` files are NOT visible (should be in .gitignore)

## 🔄 Workflow for Future Changes

After making changes locally:

```powershell
git add .
git commit -m "Description of changes"
git push
```

## 🚨 Important Notes

### Security - DO NOT commit:
- `.env` files with real passwords
- `node_modules/` folders
- API keys or secrets
- Database credentials

These should be in `.gitignore` or added as environment variables on Render/Vercel.

### After Connecting GitHub to Render/Vercel:
- Every push to `main` will automatically trigger a new deployment
- Check deployment logs if something breaks

## 🆘 Troubleshooting

### Problem: "Permission denied" error
**Solution:** 
1. Generate GitHub Personal Access Token: https://github.com/settings/tokens
2. Use token as password when Git prompts

### Problem: "fatal: not a git repository"
**Solution:**
```powershell
git init
git remote add origin https://github.com/YOUR_USERNAME/cleanify.git
```

### Problem: "Branch main does not exist"
**Solution:**
```powershell
git checkout -b main
git push -u origin main
```

### Problem: Accidentally committed .env file
**Solution:**
```powershell
git rm --cached .env
git commit -m "Remove .env file"
git push
```

Then go to GitHub and regenerate any exposed passwords.

## 📚 Useful Git Commands

```powershell
# Check status
git status

# See commit history
git log --oneline

# Undo last commit (before push)
git reset --soft HEAD~1

# View differences
git diff

# Switch to another branch
git checkout -b feature-branch

# Merge changes
git merge feature-branch
```

---

**Next Step:** Follow DEPLOYMENT_GUIDE.md to deploy on Render and Vercel
