#!/bin/bash

echo "🔨 Building Agarwal Sabha Platform..."

# Build frontend
echo "🎨 Building frontend..."
cd frontend
npm run build
cd ..

# Build backend
echo "⚙️ Building backend..."
cd backend
npm run build
cd ..

echo "✅ Build complete!"
echo ""
echo "Built files:"
echo "   Frontend: frontend/.next/"
echo "   Backend: backend/dist/"
