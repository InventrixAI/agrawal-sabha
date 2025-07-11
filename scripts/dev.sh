#!/bin/bash

echo "🚀 Starting Agarwal Sabha Platform in development mode..."

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Check if Prisma client is generated
if [ ! -d "backend/node_modules/.prisma" ]; then
    echo "🗄️ Generating Prisma client..."
    cd database && npx prisma generate && cd ..
fi

# Start development servers
echo "🚀 Starting development servers..."
npm run dev
