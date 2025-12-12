# Deployment Guide

## Quick Deploy to Render

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - ProTrader Terminal"
git branch -M main
git remote add origin https://github.com/yourusername/protrader-terminal.git
git push -u origin main
```

### Step 2: Deploy Backend on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: protrader-backend
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - ALPACA_API_KEY=PK5XZDGQ2YBMQ9QSM9DZ
     - ALPACA_SECRET_KEY=your_secret_here
     - GEMINI_API_KEY=your_key_here
     - GEMINI_API_SECRET=your_secret_here
     - PORT=5000

5. Click "Create Web Service"

### Step 3: Deploy Frontend on Render

1. Click "New +" → "Static Site"
2. Connect same repository
3. Configure:
   - **Name**: protrader-frontend
   - **Root Directory**: frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: build
   - **Environment Variable**:
     - REACT_APP_API_URL=https://protrader-backend.onrender.com

4. Click "Create Static Site"

## Deploy to Vercel (Alternative)

### Frontend Only

```bash
cd frontend
npm install -g vercel
vercel --prod
```

Add environment variable:
- `REACT_APP_API_URL`: Your backend URL

## Deploy Backend to Railway

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables
5. Deploy

## Environment Variables Checklist

✅ ALPACA_API_KEY
✅ ALPACA_SECRET_KEY
✅ GEMINI_API_KEY
✅ GEMINI_API_SECRET
✅ PORT (backend)
✅ REACT_APP_API_URL (frontend)

## Post-Deployment

1. Test API endpoints: `https://your-backend.onrender.com/health`
2. Test frontend: `https://your-frontend.onrender.com`
3. Check logs for any errors
4. Monitor API usage and limits

## Troubleshooting

**Backend not connecting?**
- Check environment variables are set correctly
- Verify API keys are valid
- Check Render logs for errors

**Frontend blank screen?**
- Check REACT_APP_API_URL is set
- Open browser console for errors
- Verify backend is running

**API rate limits?**
- Alpaca Paper: 200 requests/minute
- Gemini Sandbox: Varies by endpoint
- Implement caching if needed
