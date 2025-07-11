#!/bin/bash

echo "🐳 Setting up Agarwal Sabha Platform with Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Navigate to Docker directory
cd deployment/docker

# Build and start services
echo "🔨 Building and starting Docker services..."
docker-compose up --build -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run database migrations
echo "🗄️ Running database migrations..."
docker-compose exec backend npx prisma migrate deploy

# Run database seeding
echo "🌱 Seeding database..."
docker-compose exec backend npx prisma db seed

echo ""
echo "✅ Docker setup complete!"
echo ""
echo "🌐 Services running:"
echo "   Frontend: http://localhost:3000"
echo "   Backend: http://localhost:5000"
echo "   Database: localhost:5432"
echo "   Redis: localhost:6379"
echo ""
echo "📧 Default Admin Login:"
echo "   Email: admin@agarwalsabha.com"
echo "   Password: Admin@123"
echo ""
echo "🐳 Docker commands:"
echo "   Stop: docker-compose down"
echo "   View logs: docker-compose logs -f"
echo "   Restart: docker-compose restart"
