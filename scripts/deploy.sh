#!/bin/bash

echo "🚀 Deploying Agarwal Sabha Platform..."

# Build the application
echo "🔨 Building application..."
npm run build

# Run database migrations
echo "🗄️ Running database migrations..."
cd database
npx prisma migrate deploy
cd ..

# Start production servers
echo "🌐 Starting production servers..."
npm start

echo "✅ Deployment complete!"
