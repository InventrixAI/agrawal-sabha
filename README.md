# 🏛️ Agarwal Sabha Platform

A modern, comprehensive community management platform built specifically for the Agarwal Sabha community. Connect thousands of families worldwide through tradition and innovation.

![Platform Overview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)

## ✨ Features

### 🔐 **Authentication & User Management**
- Secure JWT-based authentication
- Role-based access control (Super Admin, Admin, Moderator, Member)
- Email verification and password reset
- User profile management

### 👥 **Member Directory**
- Comprehensive member profiles with family details
- Advanced search and filtering (by name, gotra, location)
- Privacy controls for profile visibility
- Family tree management
- Photo galleries

### 💒 **Matrimonial Services**
- Detailed matrimonial profiles
- Partner preferences and matching
- Interest management system
- Privacy controls and contact preferences
- Photo galleries and bio sections

### 🏢 **Business Directory**
- Business listings with categories
- Company profiles with contact details
- Search functionality
- Business networking opportunities

### 📅 **Event Management**
- Event creation and management
- Online registration system
- Capacity management
- Payment integration
- Event galleries and media

### 📰 **News & Announcements**
- Community news and updates
- Categorized content
- Rich text editor
- Image galleries

### 🖼️ **Gallery System**
- Event photo galleries
- Community achievements
- Heritage preservation
- Categorized media management

### 🏛️ **Hall Booking System**
- Venue booking management
- Availability calendar
- Payment processing
- Booking confirmations

### 💰 **Payment Integration**
- Stripe payment gateway
- Multiple payment methods
- Donation system
- Event fee collection
- Transaction management

### 📱 **Modern UI/UX**
- Responsive design for all devices
- Dark/Light theme support
- Progressive Web App (PWA) capabilities
- Accessibility features
- Modern component library

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- Redis (optional, for caching)
- Git

### 🛠️ Installation

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd agarwal-sabha-platform
   ./scripts/setup.sh
   ```

2. **Configure environment variables:**
   
   **Frontend** (`frontend/.env.local`):
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

   **Backend** (`backend/.env`):
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/agarwal_sabha_db
   JWT_SECRET=your-super-secret-jwt-key
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Set up database:**
   ```bash
   # Create PostgreSQL database
   createdb agarwal_sabha_db
   
   # Run migrations
   npm run db:migrate
   
   # Seed with sample data
   npm run db:seed
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 🐳 Docker Deployment

For a complete Docker-based setup:

```bash
./scripts/docker-setup.sh
```

This will start all services including PostgreSQL and Redis.

## 📁 Project Structure

```
agarwal-sabha-platform/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/             # Utility functions
│   │   ├── hooks/           # Custom React hooks
│   │   └── types/           # TypeScript type definitions
│   └── public/              # Static assets
├── backend/                  # Express.js backend API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Custom middleware
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   └── tests/               # Test files
├── database/                 # Database schema and migrations
│   └── prisma/              # Prisma ORM files
├── deployment/               # Deployment configurations
│   ├── docker/              # Docker configurations
│   └── nginx/               # Nginx configs
├── docs/                     # Documentation
└── scripts/                  # Utility scripts
```

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/UI + Radix UI
- **State Management:** Zustand
- **Data Fetching:** TanStack Query
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database ORM:** Prisma
- **Authentication:** JWT
- **Validation:** Joi
- **File Upload:** Multer + Cloudinary
- **Email:** SendGrid
- **Payment:** Stripe

### Database
- **Primary:** PostgreSQL
- **Caching:** Redis
- **ORM:** Prisma

### DevOps
- **Containerization:** Docker & Docker Compose
- **Web Server:** Nginx
- **Process Manager:** PM2
- **Monitoring:** Winston Logger

## 📖 API Documentation

### Authentication Endpoints
```
POST /api/auth/register     # Register new user
POST /api/auth/login        # User login
POST /api/auth/logout       # User logout
GET  /api/auth/me          # Get current user
```

### Member Endpoints
```
GET    /api/members         # List all members
GET    /api/members/stats   # Get member statistics
GET    /api/members/:id     # Get member details
PUT    /api/members/:id     # Update member profile
```

### Event Endpoints
```
GET    /api/events          # List all events
GET    /api/events/:id      # Get event details
POST   /api/events/:id/register  # Register for event
```

## 🔐 Default Admin Access

**Email:** admin@agarwalsabha.com  
**Password:** Admin@123

⚠️ **Important:** Change the default admin password after first login.

## 🚀 Deployment

### Production Build
```bash
./scripts/build.sh
```

### Environment-specific Deployment
```bash
# Production
NODE_ENV=production ./scripts/deploy.sh

# Staging
NODE_ENV=staging ./scripts/deploy.sh
```

### Docker Production
```bash
cd deployment/docker
docker-compose -f docker-compose.prod.yml up -d
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Frontend tests
npm run test:frontend

# Backend tests
npm run test:backend

# Test coverage
npm run test:coverage
```

## 📝 Development

### Code Standards
- **Linting:** ESLint + Prettier
- **Type Checking:** TypeScript strict mode
- **Git Hooks:** Husky + lint-staged
- **Commit Convention:** Conventional Commits

### Available Scripts
```bash
npm run dev              # Start development servers
npm run build            # Build for production
npm run start            # Start production servers
npm run lint             # Lint all code
npm run type-check       # TypeScript type checking
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed database with sample data
npm run db:studio        # Open Prisma Studio
```

## 🔧 Configuration

### Environment Variables

See `.env.example` files in frontend and backend directories for all available configuration options.

### Feature Flags
Control features via environment variables:
```env
ENABLE_MATRIMONIAL=true
ENABLE_BUSINESS_DIRECTORY=true
ENABLE_HALL_BOOKING=true
ENABLE_PAYMENTS=true
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation:** [Full Documentation](docs/)
- **Issues:** [GitHub Issues](https://github.com/your-repo/issues)
- **Community:** [Discord Server](https://discord.gg/your-server)
- **Email:** support@agarwalsabha.com

## 🙏 Acknowledgments

- Agarwal Sabha community for inspiration and requirements
- Open source community for amazing tools and libraries
- Contributors who helped build this platform

---

**Built with ❤️ for the Agarwal Sabha community**

*Preserving heritage, building connections, embracing the future.*
