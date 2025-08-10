# 🚀 Raspberry Pi Deployment Guide

Complete step-by-step guide to deploy the mBuff Robot Control Interface on your Raspberry Pi using Docker.

## 📋 Prerequisites

- Raspberry Pi 4 (recommended) with Raspberry Pi OS
- Docker and Docker Compose installed
- mBuff robot connected to the same network
- At least 2GB free space

## 🔧 Step 1: Install Docker (if not already installed)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose -y

# Reboot to apply group changes
sudo reboot
```

## 📁 Step 2: Prepare Project Directory

```bash
# Create project directory
mkdir -p ~/mbuff-robot-control
cd ~/mbuff-robot-control

# Create API directory
mkdir -p api
```

## 📝 Step 3: Copy Project Files

You'll need to copy all the project files to your Raspberry Pi. You can do this via:

### Option A: Using SCP (from your computer)
```bash
# Copy entire project to Pi
scp -r /path/to/your/project/* pi@your-pi-ip:~/mbuff-robot-control/
```

### Option B: Using Git (if you've uploaded to GitHub)
```bash
# Clone your repository
git clone https://github.com/yourusername/mbuff-robot-control.git
cd mbuff-robot-control
```

### Option C: Manual file creation
Create each file manually using the provided content in the deployment files.

## ⚙️ Step 4: Configure Environment

```bash
# Copy environment file
cp .env.production .env

# Edit environment variables if needed
nano .env
```

Update the `.env` file with your robot's settings:
```bash
# Robot API Configuration
VITE_ROBOT_API_URL=http://localhost:5000

# Robot Connection Settings
MBOT_HOST=robot-mbot  # Your robot's hostname or IP
MBOT_PORT=9000        # Your robot's port
```

## 🏗️ Step 5: Build and Deploy

```bash
# Build and start all services
docker-compose up --build -d

# Check if containers are running
docker-compose ps

# View logs if needed
docker-compose logs -f
```

## 🌐 Step 6: Access Your Application

Once deployed, you can access:

- **Robot Control Interface**: `http://your-pi-ip:3000`
- **Robot API**: `http://your-pi-ip:5000`
- **API Health Check**: `http://your-pi-ip:5000/health`

## 🔍 Step 7: Verify Deployment

```bash
# Check container status
docker-compose ps

# Test API connection
curl http://localhost:5000/health

# Test robot status
curl http://localhost:5000/api/status

# View container logs
docker-compose logs mbuff-control
docker-compose logs mbuff-api
```

## 🛠️ Management Commands

### Start/Stop Services
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Update and rebuild
docker-compose up --build -d
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f mbuff-control
docker-compose logs -f mbuff-api
```

### Update Application
```bash
# Pull latest changes (if using Git)
git pull

# Rebuild and restart
docker-compose up --build -d
```

## 🔧 Troubleshooting

### Container Won't Start
```bash
# Check logs
docker-compose logs

# Check system resources
docker system df
free -h
```

### Robot Connection Issues
```bash
# Test robot connectivity
ping robot-mbot

# Check if robot port is open
telnet robot-mbot 9000

# Verify environment variables
docker-compose exec mbuff-api env | grep MBOT
```

### Port Conflicts
```bash
# Check what's using ports
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :5000

# Change ports in docker-compose.yml if needed
```

### Performance Issues
```bash
# Monitor resource usage
docker stats

# Check Pi temperature
vcgencmd measure_temp

# Free up space
docker system prune -a
```

## 🚀 Production Optimizations

### Enable Auto-Start on Boot
```bash
# Create systemd service
sudo nano /etc/systemd/system/mbuff-robot.service
```

Add this content:
```ini
[Unit]
Description=mBuff Robot Control
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/pi/mbuff-robot-control
ExecStart=/usr/bin/docker-compose up -d
ExecStop=/usr/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

Enable the service:
```bash
sudo systemctl enable mbuff-robot.service
sudo systemctl start mbuff-robot.service
```

### Setup Reverse Proxy (Optional)
```bash
# Install nginx
sudo apt install nginx -y

# Configure nginx
sudo nano /etc/nginx/sites-available/mbuff
```

Add nginx configuration:
```nginx
server {
    listen 80;
    server_name your-pi-ip;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/mbuff /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 📊 Monitoring

### Check Application Health
```bash
# API health
curl http://localhost:5000/health

# Robot status
curl http://localhost:5000/api/status

# Container health
docker-compose ps
```

### Log Rotation
```bash
# Configure log rotation
sudo nano /etc/logrotate.d/docker-compose
```

Add:
```
/home/pi/mbuff-robot-control/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    notifempty
    create 644 pi pi
}
```

## 🔄 Updates and Maintenance

### Regular Maintenance
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Clean Docker resources
docker system prune -f

# Update application
cd ~/mbuff-robot-control
git pull  # if using Git
docker-compose up --build -d
```

### Backup Configuration
```bash
# Backup important files
tar -czf mbuff-backup-$(date +%Y%m%d).tar.gz \
    docker-compose.yml \
    .env \
    api/ \
    src/config/
```

## 🆘 Support

If you encounter issues:

1. **Check logs**: `docker-compose logs -f`
2. **Verify robot connection**: `ping robot-mbot`
3. **Test API endpoints**: `curl http://localhost:5000/health`
4. **Check system resources**: `free -h` and `df -h`
5. **Restart services**: `docker-compose restart`

## 🎉 Success!

Your mBuff Robot Control Interface should now be running on your Raspberry Pi! 

Access it at: `http://your-pi-ip:3000`

The interface will automatically connect to your robot and provide full control capabilities through the beautiful web interface.