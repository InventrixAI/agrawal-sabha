#!/bin/bash

echo "🚀 Setting up Agarwal Sabha Platform..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Setup frontend
echo "🎨 Setting up frontend..."
cd frontend
npm install
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "✅ Created frontend/.env.local - Please update with your configuration"
fi
cd ..

# Setup backend
echo "⚙️ Setting up backend..."
cd backend
npm install
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Created backend/.env - Please update with your configuration"
fi
cd ..

# Setup database
echo "🗄️ Setting up database..."
cd database
npx prisma generate
echo "✅ Generated Prisma client"
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env files with your configuration"
echo "2. Set up your PostgreSQL database"
echo "3. Run 'npm run db:migrate' to create database tables"
echo "4. Run 'npm run db:seed' to add sample data"
echo "5. Run 'npm run dev' to start development servers"
echo ""
echo "🌐 Access points:"
echo "   Frontend: http://localhost:3000"
echo "   Backend: http://localhost:5000"
echo "   Health Check: http://localhost:5000/health"
echo ""
echo "📧 Default Admin Login:"
echo "   Email: admin@agarwalsabha.com"
echo "   Password: Admin@123"
