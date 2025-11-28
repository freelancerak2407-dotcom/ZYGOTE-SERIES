# ZYGOTE SERIES - Netlify Frontend Deployment Guide

This guide covers deploying the admin frontend to Netlify for Option C deployment architecture.

## Quick Deploy (1 minute)

### Step 1: Connect GitHub Repository

1. Go to [https://netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click **"New site from Git"**
4. Select your GitHub repository: `freelancerak2407-dotcom/ZYGOTE-SERIES`
5. Click **"Deploy site"**

**That's it!** Netlify automatically detects `netlify.toml` and deploys.

---

## Configuration Details

The `netlify.toml` file in the root directory handles all deployment settings:

```toml
[build]
  command = "cd admin && npm ci && npm run build"
  publish = "admin/out"

[[redirects]]
  from = "/api/*"
  to = "https://api.zygote.com/api/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### What This Does:

- **Build Command**: Installs admin dependencies and creates static export to `admin/out/`
- **Publish Directory**: Deploys the `admin/out/` folder (static HTML/CSS/JS)
- **API Redirects**: Proxies `/api/*` requests to your backend API
- **Security Headers**: Adds XSS and clickjacking protection

---

## Auto-Deployment Setup

Once connected:

✅ Every push to `main` branch automatically deploys  
✅ Pull request previews created automatically  
✅ Automatic SSL certificate (HTTPS enabled)  
✅ CDN caching for fast global delivery  

---

## Environment Variables

1. In Netlify Dashboard → **Site Settings → Environment Variables**
2. Add these variables (match `admin/.env.example`):

```
REACT_APP_API_URL=https://api.zygote.com
REACT_APP_STRIPE_PUBLIC_KEY=pk_live_xxxxx
```

---

## DNS Configuration

After Netlify deployment, update your DNS records:

```
admin.zygote.com  CNAME  your-site.netlify.app
```

---

## Monitoring & Logs

- **Build Logs**: Netlify Dashboard → Deploys → View logs
- **Live Logs**: Netlify Dashboard → Functions (if using serverless)
- **Performance**: Netlify Analytics → Traffic and performance metrics

---

## Troubleshooting

### Build fails with "Cannot find module"
→ Check `admin/package.json` has all dependencies
→ Run locally: `cd admin && npm install && npm run build`

### Static export shows blank page
→ Verify `admin/next.config.js` has `output: "export"`
→ Check all dynamic imports use dynamic(() => import(), {ssr: false})

### API calls fail with 404
→ Verify backend URL in environment variables
→ Check CORS is enabled on backend
→ Verify `netlify.toml` redirects are correct

### Images not loading
→ Ensure `unoptimized: true` in `next.config.js`
→ Use standard `<img>` tags instead of Next.js Image component

---

## Production Checklist

- [ ] Connected GitHub repository
- [ ] `netlify.toml` configured with correct build command
- [ ] Static export builds locally: `cd admin && npm run build`
- [ ] Environment variables set in Netlify dashboard
- [ ] DNS records pointing to Netlify
- [ ] HTTPS enabled (automatic)
- [ ] Security headers configured
- [ ] API endpoint correctly set to backend VM

---

## Next Steps

1. **Frontend**: ✅ Deployed on Netlify
2. **Backend**: See `deploy-backend.sh` for VM deployment
3. **Database**: Configure PostgreSQL on backend VM
4. **SSL**: Configure Certbot on VM for backend API
5. **Monitoring**: Set up error tracking and logging

---

## Support

For issues, check:
- Netlify Build Logs: `Site Settings → Deploy notifications`
- GitHub Workflow: `.github/workflows/ci.yml`
- Backend Logs: `pm2 logs` on production VM
