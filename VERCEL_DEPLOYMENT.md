# Vercel Deployment Guide

This project is configured for easy deployment on Vercel. Follow these steps to deploy:

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. MongoDB database (MongoDB Atlas recommended for cloud hosting)
3. All environment variables ready

## Deployment Steps

### 1. Push Your Code to GitHub/GitLab/Bitbucket

Make sure your code is in a Git repository:
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### 2. Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will automatically detect the project settings

### 3. Configure Environment Variables

In the Vercel project settings, add these environment variables:

**Required:**
- `DATABASE` - Your MongoDB connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`)
- `JWT_SECRET` - Secret key for JWT token generation
- `REACT_APP_API_URL` - **API Base URL for React App** (see below)

**Optional (if using Braintree):**
- `BRAINTREE_MERCHANT_ID` - Braintree merchant ID
- `BRAINTREE_PUBLIC_KEY` - Braintree public key
- `BRAINTREE_PRIVATE_KEY` - Braintree private key
- `AUTH_API_KEY` - Auth API key (if used)

### Setting REACT_APP_API_URL

Since your frontend and backend are on the same Vercel domain, you have two options:

**Option 1: Use Relative URLs (Recommended)**
- Set `REACT_APP_API_URL` to an **empty string** (leave it blank)
- This uses relative URLs and works automatically with your Vercel domain
- Example: `REACT_APP_API_URL=` (empty)

**Option 2: Use Full URL**
- Set `REACT_APP_API_URL` to your Vercel deployment URL
- Example: `REACT_APP_API_URL=https://your-project.vercel.app`
- Or use your custom domain: `REACT_APP_API_URL=https://yourdomain.com`

**Note:** After your first deployment, Vercel will give you a URL like `https://your-project.vercel.app`. You can use this URL or leave it empty for relative URLs.

**To add environment variables:**
1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add each variable with its value
4. Select the environments (Production, Preview, Development) where it should be available

### 4. Deploy

1. Click "Deploy" button
2. Vercel will automatically:
   - Install dependencies
   - Run the build script
   - Deploy your application

### 5. Verify Deployment

After deployment:
- Your frontend will be available at `https://your-project.vercel.app`
- Your API endpoints will be available at `https://your-project.vercel.app/api/*`

## Important Notes

### File Uploads Limitation

⚠️ **Important**: Vercel's serverless functions have an ephemeral file system. Files uploaded to the server will **NOT persist** between function invocations.

**Solutions:**
1. **Use Cloud Storage** (Recommended):
   - AWS S3
   - Cloudinary
   - Google Cloud Storage
   - Azure Blob Storage

2. **Update your upload handlers** to save files directly to cloud storage instead of the local filesystem.

### Database Connection

- Use MongoDB Atlas (cloud MongoDB) for production
- Ensure your MongoDB connection string is correct
- Whitelist Vercel's IP addresses in MongoDB Atlas if needed (or allow all IPs: `0.0.0.0/0`)

### Build Configuration

The project is configured with:
- `vercel.json` - Vercel configuration
- `api/index.js` - Serverless function wrapper for Express API
- `vercel-build` script in `package.json`

## Project Structure for Vercel

```
├── api/
│   └── index.js          # Serverless function (Express API)
├── server/               # Backend code
├── src/                  # React frontend
├── public/               # Static files
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies and scripts
```

## Troubleshooting

### Build Fails
- Check that all environment variables are set
- Verify MongoDB connection string is correct
- Check build logs in Vercel dashboard

### API Routes Not Working
- Ensure routes start with `/api/`
- Check serverless function logs in Vercel dashboard
- Verify CORS settings if accessing from different domain

### Database Connection Issues
- Verify MongoDB connection string
- Check MongoDB Atlas network access settings
- Ensure database credentials are correct

## Custom Domain (Optional)

1. Go to project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

