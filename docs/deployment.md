# Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 12+
- Redis (optional)
- Nginx (for production)
- SSL certificate (for HTTPS)

## Environment Setup

### 1. Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Install Redis
sudo apt-get install redis-server

# Install Nginx
sudo apt-get install nginx
```

### 2. Database Setup

```bash
sudo -u postgres psql
CREATE DATABASE agarwal_sabha_db;
CREATE USER agarwal_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE agarwal_sabha_db TO agarwal_user;
\q
```

### 3. Application Deployment

```bash
# Clone repository
git clone <repository-url>
cd agarwal-sabha-platform

# Install dependencies
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# Build application
npm run build

# Setup environment
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Start with PM2
npm install -g pm2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### 4. Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Docker Deployment

Use the provided Docker setup for easier deployment:

```bash
./scripts/docker-setup.sh
```

## Monitoring

Setup monitoring with PM2:

```bash
pm2 monit
pm2 logs
pm2 status
```

## Backup Strategy

### Database Backup
```bash
pg_dump -U agarwal_user -h localhost agarwal_sabha_db > backup.sql
```

### File Backup
```bash
tar -czf app-backup.tar.gz /path/to/application
```

## Security Checklist

- [ ] Change default admin password
- [ ] Setup SSL/HTTPS
- [ ] Configure firewall
- [ ] Setup fail2ban
- [ ] Regular security updates
- [ ] Environment variable security
- [ ] Database access restrictions
