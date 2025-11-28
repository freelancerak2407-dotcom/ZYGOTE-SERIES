# ZYGOTE SERIES - DEPLOYMENT PLAN (OPTION C)

**Option C** separates the frontend (Next.js Admin Panel) from the backend (Express API):
- **Frontend**: Static export deployed to **Netlify** (admin/out directory)
- **Backend**: Express.js API deployed to a **Linux VM** or **container service**

---

## PART 1: FRONTEND DEPLOYMENT (Netlify)

### Prerequisites
- Netlify account
- GitHub repository linked to Netlify

### Steps

1. **Connect Repository to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Select repository and branch (main)

2. **Netlify Build Configuration**
   - Netlify auto-reads `netlify.toml` from root
   - Current config:
     ```toml
     build = "cd admin && npm ci && npm run build"
     publish = "admin/out"
     ```
   - This builds the admin Next.js app and deploys the static `out/` directory

3. **Deploy**
   - Push to main branch
   - Netlify automatically builds and deploys
   - Admin panel available at your Netlify URL (e.g., `https://zygote-admin.netlify.app`)

4. **Environment Variables (if needed)**
   - In Netlify UI: Settings → Build & Deploy → Environment
   - Add any `NEXT_PUBLIC_*` variables needed

---

## PART 2: BACKEND DEPLOYMENT (Linux VM)

### Prerequisites
- Ubuntu 20.04+ server (AWS EC2, DigitalOcean, Linode, etc.)
- SSH access
- Domain name for API (e.g., `api.zygote.com`)
- PostgreSQL database (managed or self-hosted)

### Steps

#### 1. Server Setup

```bash
# Connect to server
ssh root@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y curl wget git nodejs npm nginx postgresql postgresql-contrib

# Install Node.js 18 (if default is older)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2
```

#### 2. Clone Repository

```bash
cd /var/www
git clone https://github.com/your-username/zygote.git
cd zygote/backend
```

#### 3. Set Up Environment Variables

```bash
# Create .env file
nano .env
```

Add (replace with actual values):
```
NODE_ENV=production
PORT=5000

DATABASE_URL=postgresql://zygote_user:secure_password@localhost:5432/zygote_db

JWT_SECRET=your-secure-jwt-secret-min-32-chars
JWT_REFRESH_SECRET=your-secure-refresh-secret-min-32-chars

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_BUCKET_NAME=zygote-bucket

STRIPE_SECRET_KEY=sk_live_your-stripe-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

ADMIN_USERNAME=admin@zygote.com
ADMIN_PASSWORD=secure_admin_password_here
STUDENT_USERNAME=student@zygote.com
STUDENT_PASSWORD=secure_student_password_here
```

#### 4. Database Setup

```bash
# Create PostgreSQL user and database
sudo -u postgres psql << EOF
CREATE USER zygote_user WITH ENCRYPTED PASSWORD 'secure_password';
CREATE DATABASE zygote_db OWNER zygote_user;
GRANT ALL PRIVILEGES ON DATABASE zygote_db TO zygote_user;
\q
EOF
```

#### 5. Install Dependencies & Build

```bash
cd /var/www/zygote/backend
npm ci
npm run build
npx prisma migrate deploy
npm run prisma:seed
```

#### 6. Process Management with PM2

```bash
# Start backend with PM2
pm2 start dist/server.js --name "zygote-backend"

# Save PM2 config to auto-restart on reboot
pm2 save
pm2 startup

# Verify running
pm2 logs zygote-backend
```

#### 7. Nginx Reverse Proxy

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/zygote-api
```

Add:
```nginx
server {
    listen 80;
    server_name api.zygote.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable:
```bash
sudo ln -s /etc/nginx/sites-available/zygote-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 8. SSL with Certbot (HTTPS)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.zygote.com
```

Auto-renewal:
```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

#### 9. Configure CORS in Backend

Update `backend/src/server.ts`:
```typescript
app.use(cors({
  origin: ['https://zygote-admin.netlify.app', 'https://admin.zygote.com'],
  credentials: true
}));
```

Then rebuild:
```bash
npm run build
pm2 restart zygote-backend
```

---

## PART 3: ADMIN PANEL CONFIGURATION

### Connect Admin to Backend API

Update `admin/lib/api.ts`:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.zygote.com/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

In Netlify Environment Variables:
```
NEXT_PUBLIC_API_URL=https://api.zygote.com/api
```

---

## PART 4: MONITORING & MAINTENANCE

### Check Logs

**Backend logs:**
```bash
pm2 logs zygote-backend
```

**Nginx logs:**
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Database Backups

```bash
# Automatic daily backup
0 2 * * * pg_dump -U zygote_user zygote_db > /backups/zygote_db_$(date +\%Y\%m\%d).sql
```

### Updates

```bash
# Update backend code
cd /var/www/zygote/backend
git pull origin main
npm ci
npm run build
npx prisma migrate deploy
pm2 restart zygote-backend
```

---

## PART 5: DOMAIN SETUP (DNS)

Point your domains to:
- `admin.zygote.com` → Netlify's assigned domain (CNAME or A record)
- `api.zygote.com` → Your server's IP (A record)

Example DNS records:
```
admin.zygote.com  CNAME  zygote-admin.netlify.app
api.zygote.com    A      your-server-ip
```

---

## QA CHECKLIST POST-DEPLOYMENT

- [ ] Admin panel loads: `https://admin.zygote.com`
- [ ] Login endpoint works: `POST https://api.zygote.com/api/auth/login`
- [ ] CORS allows Netlify domain
- [ ] SSL certificate valid (green lock)
- [ ] Admin can import MCQs
- [ ] Prisma seeded: admin user exists
- [ ] PM2 processes auto-start on reboot
- [ ] Nginx logs show no errors
- [ ] Database backups scheduled

---

## COST ESTIMATE

- **Netlify**: Free tier (up to 300 build minutes/month) or Pro ($19/mo)
- **Server (Ubuntu 20.04)**: $5-10/mo (basic DigitalOcean droplet)
- **Database**: $15/mo (managed PostgreSQL) or free (self-hosted)
- **Domain**: ~$12/year per domain
- **SSL**: Free (Let's Encrypt via Certbot)

**Total**: ~$30-50/mo for production

---

## TROUBLESHOOTING

**Admin won't load:**
- Check Netlify build logs
- Verify `NEXT_PUBLIC_API_URL` env var
- Clear browser cache

**API returns 401:**
- Verify JWT secrets in `.env`
- Check token expiration in admin localStorage
- Ensure `Authorization: Bearer <token>` header sent

**Database connection error:**
- Test: `psql $DATABASE_URL`
- Verify PostgreSQL running: `sudo systemctl status postgresql`
- Check `.env` DATABASE_URL format

**Nginx 502 Bad Gateway:**
- Check PM2 process: `pm2 status`
- Verify backend listening: `sudo netstat -tlnp | grep 5000`
- Restart: `pm2 restart zygote-backend`

---

## NEXT STEPS

1. ✅ Ensure backend builds: `npm run build` → Check
2. ✅ Ensure admin builds: `npm run build` → Check
3. Next: Set up server infrastructure (VM, database)
4. Next: Deploy backend to VM with PM2
5. Next: Push GitHub → Auto-deploy admin to Netlify
6. Next: Configure DNS and SSL
7. Next: Run QA checklist

