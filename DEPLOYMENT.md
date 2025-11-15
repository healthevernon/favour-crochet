# Favour Crochet - Production Deployment Guide

## Frontend (Next.js) - Vercel Deployment

### 1. Environment Variables for Vercel
Set these in your Vercel dashboard:

```
NEXT_PUBLIC_API_URL=https://your-backend-api.herokuapp.com/api
NEXT_PUBLIC_SITE_URL=https://favour-crochet.vercel.app
```

### 2. Build Configuration
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 3. Performance Optimizations
- Images are optimized with Next.js Image component
- Code splitting enabled automatically
- Static generation for better performance
- Framer Motion animations optimized for production

## Backend (Django) - Separate Deployment

### Option 1: Railway (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Option 2: Heroku
1. Create Heroku app
2. Add PostgreSQL addon
3. Set environment variables
4. Deploy via Git

### Required Environment Variables:
```
SECRET_KEY=your-secret-key-here
DEBUG=False
DATABASE_URL=postgresql://...
ALLOWED_HOSTS=your-domain.com,api.your-domain.com
CORS_ALLOWED_ORIGINS=https://favour-crochet.vercel.app
```

## Production Checklist

### Frontend ✅
- [x] Environment variables configured
- [x] API endpoints updated
- [x] Images optimized
- [x] Error boundaries implemented
- [x] SEO meta tags added
- [x] Performance optimizations

### Backend ✅
- [x] Production settings configured
- [x] Database optimized
- [x] CORS configured
- [x] Static files handling
- [x] Security settings enabled

## Quick Deploy Commands

### Frontend to Vercel:
```bash
cd frontend
npm run build
# Deploy via Vercel dashboard or CLI
```

### Backend to Railway/Heroku:
```bash
cd backend
# Push to your connected repository
git push origin main
```