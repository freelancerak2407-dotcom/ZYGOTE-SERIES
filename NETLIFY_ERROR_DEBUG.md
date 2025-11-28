# Netlify Build Error Diagnosis

## Current Status

**netlify.toml**: ✅ Minimal and valid
**Build command**: `npm --prefix admin ci && npm --prefix admin run build`  
**Publish directory**: `admin/out`  
**Node version**: 18

## What Could Cause "No Preview + Error"

1. **Build fails but doesn't show error**
   - Check Netlify build logs at: https://netlify.com/sites/{your-site}/deploys

2. **Missing dependencies**
   - admin/package.json might be missing packages
   - Next.js 14 compatibility issue

3. **Build times out**
   - Takes too long to build
   - Try: Build Settings → Increase timeout

4. **Out directory not created**
   - next.config.js `distDir: "out"` not working
   - next.config.js `output: "export"` not set

5. **Publish directory wrong**
   - netlify.toml publish path doesn't exist
   - Need `admin/out/` not `admin/dist/`

## Debugging Steps

### Step 1: Check Netlify Logs
Go to: https://netlify.com/sites/your-site-name/deploys

Look for:
- ❌ "Failed to build"
- ❌ "Command exited with non-zero status"
- ❌ "Cannot find module"
- ❌ "Timeout"

### Step 2: Verify Locally
```bash
cd admin
npm ci
npm run build
ls -la out/   # Should show files here
```

If `out/` is empty → Next.js not exporting correctly

### Step 3: Check next.config.js
Must have:
```js
output: "export",
distDir: "out",
images: { unoptimized: true }
```

### Step 4: Test Build Command
```bash
npm --prefix admin ci && npm --prefix admin run build
```

## Quick Fix Checklist

- [ ] Open Netlify logs and find exact error
- [ ] Share the error message
- [ ] Verify admin/package.json has all deps
- [ ] Check next.config.js has export settings
- [ ] Try manual redeploy on Netlify dashboard
- [ ] Check "Deploy preview" checkbox in settings

## Common Errors & Fixes

### "Cannot find module 'next'"
→ Missing dependency. Check admin/package.json

### "Output must be 'export' for static export"
→ Fix next.config.js:
```js
const nextConfig = {
  output: "export",  // <-- THIS IS REQUIRED
  distDir: "out",
  images: { unoptimized: true }
};
```

### "timeout" or "timed out"
→ Build taking too long
→ Try Netlify dashboard: Build & deploy → Build settings → Timeout (increase to 60+ min)

### "ENOSPC: no space left"
→ Server out of disk space
→ Netlify issue, contact support

### "admin/out directory not found"
→ Build didn't create output directory
→ next.config.js settings wrong
→ Build failed silently

## Next Action

**Paste the exact error message from Netlify build logs** and I'll provide specific fix.

To find logs:
1. Go to: https://netlify.com
2. Select your ZYGOTE SERIES site
3. Click "Deploys"
4. Find the failed deploy
5. Click on it
6. Scroll to "Deploy log"
7. Look for the error
8. Copy the error message and share it
