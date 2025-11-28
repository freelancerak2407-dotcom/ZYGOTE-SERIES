#!/bin/bash
# ZYGOTE SERIES - Backend VM Deployment Script
# Usage: bash deploy-backend.sh [start|stop|restart|logs]

set -e

DEPLOY_DIR="/opt/zygote-backend"
NODE_ENV="production"
APP_USER="zygote"
APP_PORT=5000

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}ZYGOTE Backend - Deployment Script${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

# Function: Check if user is root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        echo -e "${RED}Error: This script must be run as root${NC}"
        exit 1
    fi
}

# Function: Install dependencies
install_dependencies() {
    echo -e "${YELLOW}📦 Installing system dependencies...${NC}"
    
    apt-get update
    apt-get install -y \
        nodejs \
        npm \
        postgresql \
        postgresql-contrib \
        nginx \
        certbot \
        python3-certbot-nginx \
        git \
        curl
    
    # Install Node.js 18+ (if not present)
    node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$node_version" -lt 18 ]; then
        echo -e "${YELLOW}Upgrading Node.js to 18+...${NC}"
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        apt-get install -y nodejs
    fi
    
    # Install PM2 globally
    npm install -g pm2
    
    echo -e "${GREEN}✅ Dependencies installed${NC}"
}

# Function: Setup application user
setup_app_user() {
    echo -e "${YELLOW}👤 Setting up application user...${NC}"
    
    if ! id "$APP_USER" &>/dev/null; then
        useradd -m -s /bin/bash "$APP_USER"
        echo -e "${GREEN}✅ User '$APP_USER' created${NC}"
    else
        echo -e "${GREEN}✅ User '$APP_USER' already exists${NC}"
    fi
}

# Function: Clone/update repository
setup_application() {
    echo -e "${YELLOW}📂 Setting up application...${NC}"
    
    mkdir -p "$DEPLOY_DIR"
    
    if [ ! -d "$DEPLOY_DIR/.git" ]; then
        git clone https://github.com/freelancerak2407-dotcom/ZYGOTE-SERIES.git "$DEPLOY_DIR"
    else
        cd "$DEPLOY_DIR"
        git pull origin main
    fi
    
    chown -R "$APP_USER:$APP_USER" "$DEPLOY_DIR"
    
    echo -e "${GREEN}✅ Application setup complete${NC}"
}

# Function: Setup environment
setup_environment() {
    echo -e "${YELLOW}🔧 Setting up environment...${NC}"
    
    cd "$DEPLOY_DIR/backend"
    
    # Create .env if not exists
    if [ ! -f .env ]; then
        cat > .env << EOF
NODE_ENV=$NODE_ENV
PORT=$APP_PORT
DATABASE_URL=postgresql://user:password@localhost:5432/zygote_prod
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRY=900
JWT_REFRESH_EXPIRY=604800
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=zygote-uploads
AWS_REGION=us-east-1
STRIPE_SECRET_KEY=your-stripe-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret
EOF
        chown "$APP_USER:$APP_USER" .env
        chmod 600 .env
        echo -e "${YELLOW}⚠️  .env created - UPDATE WITH YOUR ACTUAL VALUES${NC}"
    fi
    
    echo -e "${GREEN}✅ Environment configured${NC}"
}

# Function: Build application
build_application() {
    echo -e "${YELLOW}🔨 Building application...${NC}"
    
    cd "$DEPLOY_DIR/backend"
    
    sudo -u "$APP_USER" npm ci --legacy-peer-deps
    sudo -u "$APP_USER" npm run prisma:generate
    sudo -u "$APP_USER" npm run build
    
    echo -e "${GREEN}✅ Application built${NC}"
}

# Function: Setup database
setup_database() {
    echo -e "${YELLOW}🗄️  Setting up database...${NC}"
    
    # Create database if not exists
    sudo -u postgres psql << EOF
CREATE DATABASE zygote_prod;
CREATE USER zygote_user WITH PASSWORD 'your_secure_password';
ALTER ROLE zygote_user SET client_encoding TO 'utf8';
ALTER ROLE zygote_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE zygote_user SET default_transaction_deferrable TO on;
ALTER ROLE zygote_user SET default_transaction_read_committed TO on;
GRANT ALL PRIVILEGES ON DATABASE zygote_prod TO zygote_user;
EOF
    
    # Run migrations
    cd "$DEPLOY_DIR/backend"
    sudo -u "$APP_USER" npm run prisma:migrate
    sudo -u "$APP_USER" npm run prisma:seed
    
    echo -e "${GREEN}✅ Database setup complete${NC}"
}

# Function: Setup PM2
setup_pm2() {
    echo -e "${YELLOW}🚀 Setting up PM2...${NC}"
    
    cd "$DEPLOY_DIR/backend"
    
    # Copy pm2.json and start
    sudo -u "$APP_USER" pm2 start pm2.json
    
    # Save PM2 config to restart on reboot
    pm2 save
    env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u "$APP_USER" --hp "/home/$APP_USER"
    
    echo -e "${GREEN}✅ PM2 configured${NC}"
}

# Function: Setup Nginx
setup_nginx() {
    echo -e "${YELLOW}🌐 Setting up Nginx...${NC}"
    
    # Copy nginx config
    cp "$DEPLOY_DIR/deployment/nginx.conf" /etc/nginx/sites-available/zygote-api
    ln -sf /etc/nginx/sites-available/zygote-api /etc/nginx/sites-enabled/zygote-api
    
    # Remove default site
    rm -f /etc/nginx/sites-enabled/default
    
    # Test and restart
    nginx -t
    systemctl restart nginx
    
    echo -e "${GREEN}✅ Nginx configured${NC}"
}

# Function: Setup SSL with Certbot
setup_ssl() {
    echo -e "${YELLOW}🔒 Setting up SSL certificate...${NC}"
    
    read -p "Enter domain name (e.g., api.zygote.com): " DOMAIN
    
    certbot certonly --standalone \
        -d "$DOMAIN" \
        --email admin@zygote.com \
        --agree-tos \
        --no-eff-email
    
    # Update nginx config with SSL paths
    sed -i "s|ssl_certificate /etc/letsencrypt/live/.*|ssl_certificate /etc/letsencrypt/live/$DOMAIN|g" /etc/nginx/sites-available/zygote-api
    sed -i "s|ssl_certificate_key /etc/letsencrypt/live/.*|ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem|g" /etc/nginx/sites-available/zygote-api
    
    nginx -t
    systemctl restart nginx
    
    echo -e "${GREEN}✅ SSL certificate installed${NC}"
}

# Function: Start/Stop/Restart services
manage_services() {
    local action=$1
    
    case $action in
        start)
            echo -e "${YELLOW}Starting services...${NC}"
            sudo -u "$APP_USER" pm2 start ecosystem.config.js
            systemctl start nginx
            echo -e "${GREEN}✅ Services started${NC}"
            ;;
        stop)
            echo -e "${YELLOW}Stopping services...${NC}"
            sudo -u "$APP_USER" pm2 stop all
            systemctl stop nginx
            echo -e "${GREEN}✅ Services stopped${NC}"
            ;;
        restart)
            echo -e "${YELLOW}Restarting services...${NC}"
            sudo -u "$APP_USER" pm2 restart all
            systemctl restart nginx
            echo -e "${GREEN}✅ Services restarted${NC}"
            ;;
        logs)
            sudo -u "$APP_USER" pm2 logs
            ;;
        *)
            echo -e "${RED}Unknown action: $action${NC}"
            exit 1
            ;;
    esac
}

# Main deployment flow
main() {
    local command=${1:-deploy}
    
    case $command in
        deploy)
            check_root
            install_dependencies
            setup_app_user
            setup_application
            setup_environment
            build_application
            setup_database
            setup_pm2
            setup_nginx
            read -p "Setup SSL certificates? (y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                setup_ssl
            fi
            echo -e "${GREEN}========================================${NC}"
            echo -e "${GREEN}✅ Deployment complete!${NC}"
            echo -e "${GREEN}========================================${NC}"
            ;;
        start|stop|restart|logs)
            manage_services "$command"
            ;;
        *)
            echo "Usage: $0 {deploy|start|stop|restart|logs}"
            exit 1
            ;;
    esac
}

main "$@"
