# Task Management App

A full-stack task management application built with Next.js and Node.js, featuring modern UI design, robust authentication, and comprehensive task management capabilities.

## 🚀 Live Demo

- **Frontend**: (https://task-management-platform-k32c.vercel.app/)
- **Backend**: (https://task-management-platform-two.vercel.app/)

## 📋 Features

### Core Functionality
- ✅ **User Authentication** - Secure registration and login with JWT
- ✅ **Task Management** - Full CRUD operations for tasks
- ✅ **Search & Filter** - Real-time search and status filtering
- ✅ **Pagination** - Efficient data loading with pagination
- ✅ **Responsive Design** - Mobile-first responsive UI
- ✅ **Real-time Updates** - Optimistic UI updates for better UX

### Technical Features
- 🔐 **Security** - Password hashing, JWT tokens, rate limiting
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🎨 **Modern UI** - Clean design with smooth animations
- ⚡ **Performance** - Optimized for speed and efficiency
- 🛡️ **Type Safety** - Full TypeScript implementation
- 🎯 **Accessibility** - WCAG 2.1 AA compliant

## 🏗️ Architecture

```
task-management/
├── backend/                 # Node.js/Express API
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── server.js           # Entry point
└── frontend/               # Next.js React app
    ├── src/
    │   ├── app/            # Next.js 14 App Router
    │   ├── components/     # React components
    │   ├── contexts/       # React contexts
    │   ├── lib/            # Utilities
    │   └── types/          # TypeScript types
    └── public/             # Static assets
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **State**: React Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors, rate limiting

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd task-management
```

### 2. Backend Setup
```bash
cd backend
npm install
cp env.example .env
```

Configure your `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_very_secure_jwt_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp env.example .env.local
```

Configure your `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📖 API Documentation

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Task Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get tasks with pagination/search/filter | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| POST | `/api/tasks` | Create new task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |
| PATCH | `/api/tasks/:id/toggle` | Toggle task status | Yes |

### Query Parameters for GET /api/tasks
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `status`: Filter by status (`pending`, `done`, `all`)
- `search`: Search in title and description

Example: `/api/tasks?page=1&limit=10&status=pending&search=important`

## 🎨 UI Components

### Pages
- **Home** - Landing page with features overview
- **Login** - User authentication
- **Register** - User registration
- **Dashboard** - Main task management interface

### Key Components
- **TaskCard** - Individual task display with actions
- **TaskForm** - Create/edit task modal
- **TaskFilters** - Search and filter controls
- **Pagination** - Navigation for large datasets
- **Header** - Navigation and user menu

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev          # Start with nodemon
npm start           # Production start
```

### Frontend Development
```bash
cd frontend
npm run dev         # Development server
npm run build       # Production build
npm start          # Start production build
npm run lint       # Run ESLint
```

### Database Setup
1. **Local MongoDB**: Install and run MongoDB locally
2. **MongoDB Atlas**: Create a free cluster and get connection string
3. **Docker**: Run MongoDB in a container
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)
1. Create new project
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement
JWT_SECRET=your_very_secure_production_jwt_secret
FRONTEND_URL=https://your-frontend-domain.com
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

## 📱 Mobile Experience

The application is fully responsive and provides an excellent mobile experience:

- **Touch-friendly** interface with appropriate button sizes
- **Swipe gestures** for task actions
- **Responsive layouts** that adapt to screen size
- **Mobile-optimized** forms and modals
- **Fast loading** on mobile networks

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive data validation
- **CORS Protection**: Configured for specific origins
- **Security Headers**: Using helmet.js
- **XSS Protection**: Sanitized inputs and outputs

## 🎯 Performance Optimizations

### Frontend
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Caching**: Proper HTTP caching headers
- **Bundle Optimization**: Tree shaking and minification

### Backend
- **Database Indexing**: Optimized queries
- **Pagination**: Efficient data loading
- **Compression**: Gzip compression
- **Connection Pooling**: MongoDB connection optimization

## 🧪 Testing

### Frontend Testing
```bash
npm run test        # Run tests
npm run test:watch  # Watch mode
npm run test:coverage # Coverage report
```

### Backend Testing
```bash
npm test           # Run tests
npm run test:watch # Watch mode
```

## 📊 Monitoring & Analytics

- **Error Tracking**: Integration ready for Sentry
- **Performance Monitoring**: Web Vitals tracking
- **User Analytics**: Ready for Google Analytics
- **API Monitoring**: Health check endpoints

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Express.js** - Web framework for Node.js
- **MongoDB** - Database
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the documentation in each folder's README
2. Open an issue on GitHub
3. Contact: your-email@example.com

---

**Built with ❤️ using Next.js and Node.js**
