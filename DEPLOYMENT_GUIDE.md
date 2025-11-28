# ZYGOTE SERIES - Production Deployment Guide

## 1. Infrastructure Setup (VPS/Cloud)
1. Provision a Ubuntu 20.04+ Server (AWS EC2, DigitalOcean Droplet, etc.).
2. Install dependencies:
   \`\`\`bash
   sudo apt update
   sudo apt install nodejs npm nginx git postgresql
   sudo npm install -g yarn pm2
   \`\`\`
3. Clone repository:
   \`\`\`bash
   git clone <your-repo-url> /var/www/zygote
   cd /var/www/zygote
   \`\`\`

## 2. Database (PostgreSQL)
1. Create database and user:
   \`\`\`sql
   CREATE DATABASE zygote_db;
   CREATE USER zygote_user WITH ENCRYPTED PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE zygote_db TO zygote_user;
   \`\`\`
2. Update \`backend/.env\` with \`DATABASE_URL\`.

## 3. Backend Deployment
1. \`cd backend\`
2. Create \`.env\` (copy from \`.env.example\` and fill secrets).
3. Install & Build:
   \`\`\`bash
   yarn install
   npx prisma migrate deploy
   npx prisma db seed
   yarn build
   \`\`\`

## 4. Admin Deployment
1. \`cd admin\`
2. Create \`.env.local\` with \`NEXT_PUBLIC_API_URL=https://api.zygote.com/api\`.
3. Install & Build:
   \`\`\`bash
   npm install
   npm run build
   \`\`\`

## 5. Process Management (PM2)
1. Go to root \`deployment\` folder.
2. Start processes:
   \`\`\`bash
   pm2 start pm2.json
   pm2 save
   pm2 startup
   \`\`\`

## 6. NGINX Configuration
1. Copy config:
   \`\`\`bash
   sudo cp deployment/nginx.conf /etc/nginx/sites-available/zygote
   sudo ln -s /etc/nginx/sites-available/zygote /etc/nginx/sites-enabled/
   \`\`\`
2. Test & Restart:
   \`\`\`bash
   sudo nginx -t
   sudo systemctl restart nginx
   \`\`\`
3. SSL (Certbot):
   \`\`\`bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.zygote.com -d admin.zygote.com
   \`\`\`

## 7. Mobile App (Android Play Store)
1. \`cd mobile\`
2. Install EAS CLI: \`npm install -g eas-cli\`
3. Login: \`eas login\`
4. Configure: \`eas build:configure\`
5. Build AAB: \`eas build --platform android\`
6. Download the \`.aab\` file and upload to Google Play Console -> Production Track.
