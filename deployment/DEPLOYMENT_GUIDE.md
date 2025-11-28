# Zygote Series - Production Deployment Guide

## 1. Infrastructure Setup (Ubuntu VPS)

1.  **Update System:**
    \`sudo apt update && sudo apt upgrade -y\`
2.  **Install Node.js (v18+):**
    \`curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -\`
    \`sudo apt install -y nodejs\`
3.  **Install PostgreSQL:**
    \`sudo apt install postgresql postgresql-contrib\`
    \`sudo systemctl start postgresql\`
4.  **Install PM2 & Nginx:**
    \`sudo npm install -g pm2\`
    \`sudo apt install nginx\`

## 2. Database Configuration

1.  **Create Database:**
    \`sudo -u postgres psql\`
    \`CREATE DATABASE zygote_db;\`
    \`ALTER USER postgres WITH PASSWORD 'your_secure_password';\`
    \`\\q\`

## 3. Backend Deployment

1.  **Clone & Install:**
    \`git clone <repo_url>\`
    \`cd backend\`
    \`yarn install\`
2.  **Environment:**
    \`cp .env.example .env\`
    (Edit .env with real DB credentials and AWS keys)
3.  **Migrate & Seed:**
    \`npx prisma migrate deploy\`
    \`npx prisma db seed\`
4.  **Build:**
    \`yarn build\`
5.  **Start with PM2:**
    \`pm2 start dist/server.js --name zygote-backend\`

## 4. Admin Deployment

1.  **Install:**
    \`cd ../admin\`
    \`npm install\`
2.  **Environment:**
    \`cp .env.example .env.local\`
    (Set NEXT_PUBLIC_API_URL to https://api.yourdomain.com/api)
3.  **Build:**
    \`npm run build\`
4.  **Start with PM2:**
    \`pm2 start npm --name zygote-admin -- start\`

## 5. Nginx & SSL

1.  **Config:** Copy \`deployment/nginx.conf\` to \`/etc/nginx/sites-available/zygote\`.
2.  **Enable:** \`sudo ln -s /etc/nginx/sites-available/zygote /etc/nginx/sites-enabled/\`
3.  **SSL (Certbot):**
    \`sudo apt install certbot python3-certbot-nginx\`
    \`sudo certbot --nginx -d api.zygoteseries.com -d admin.zygoteseries.com\`

## 6. Mobile App (Android)

1.  **Configure:** Update \`mobile/src/config.ts\` (create if missing) to point to production API.
2.  **Build:**
    \`cd mobile\`
    \`eas build --platform android\`
3.  **Upload:** Take the \`.aab\` file and upload to Google Play Console.
