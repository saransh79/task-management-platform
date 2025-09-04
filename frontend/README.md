# Task Management Frontend

A modern, responsive React/Next.js frontend for the Task Management application with beautiful UI, smooth animations, and real-time interactions.

## Features

- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- ⚡ **Fast**: Built with Next.js 14 and App Router
- 🔐 **Authentication**: JWT-based auth with form validation
- 📱 **Mobile-First**: Responsive design for all screen sizes
- 🎭 **Animations**: Smooth transitions with Framer Motion
- 🔍 **Search & Filter**: Real-time task filtering and search
- 📄 **Pagination**: Efficient data loading with pagination
- 🎯 **TypeScript**: Full type safety throughout the app
- 🚀 **Optimistic Updates**: Instant UI feedback for better UX

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios with interceptors
- **State Management**: React Context + Local State
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running the Application

#### Development Mode
```bash
npm run dev
```

#### Production Build
```bash
npm run build
npm start
```

The application will start on `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── register/         # Register page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── forms/           # Form components
│   ├── layout/          # Layout components
│   ├── tasks/           # Task-related components
│   └── ui/              # Reusable UI components
├── contexts/            # React contexts
├── hooks/               # Custom hooks
├── lib/                 # Utility functions
├── types/               # TypeScript type definitions
└── styles/              # Additional styles
```

## Key Components

### Authentication
- **LoginForm**: Email/password login with validation
- **RegisterForm**: User registration with password confirmation
- **AuthContext**: Global authentication state management

### Task Management
- **TaskCard**: Individual task display with actions
- **TaskForm**: Create/edit task modal with validation
- **TaskList**: Task grid with animations and empty states
- **TaskFilters**: Search and filter controls
- **Pagination**: Navigation for large task lists

### UI Components
- **Button**: Consistent button component with variants
- **Input**: Form input with validation states
- **Card**: Container component for content sections
- **Badge**: Status indicators and labels

## Features in Detail

### Responsive Design
- Mobile-first approach with breakpoints
- Adaptive layouts for all screen sizes
- Touch-friendly interactions on mobile
- Optimized typography scaling

### Authentication Flow
- Secure JWT token storage
- Automatic token refresh handling
- Protected route navigation
- Form validation with error handling

### Task Management
- Real-time CRUD operations
- Optimistic UI updates
- Search by title/description
- Filter by status (All, Pending, Done)
- Pagination for performance
- Bulk status updates

### UI/UX Enhancements
- Smooth page transitions
- Loading states and skeletons
- Error boundaries and handling
- Toast notifications
- Keyboard accessibility
- Screen reader support

## Styling System

### Design Tokens
```css
/* Primary Colors */
--primary: 221.2 83.2% 53.3%
--primary-foreground: 210 40% 98%

/* Status Colors */
--success: 142.1 76.2% 36.3%
--warning: 47.9 95.8% 53.1%
--destructive: 0 84.2% 60.2%

/* Neutral Colors */
--background: 0 0% 100%
--foreground: 222.2 84% 4.9%
--muted: 210 40% 96%
--border: 214.3 31.8% 91.4%
```

### Component Variants
- Button: default, outline, ghost, destructive
- Badge: default, secondary, success, warning
- Card: elevated, flat, interactive

### Animations
- Page transitions: 0.3s ease-out
- Component states: 0.2s ease-in-out
- Hover effects: 0.15s ease
- Loading spinners: 1s linear infinite

## API Integration

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user

### Task Endpoints
- `GET /tasks` - Get tasks with pagination/filtering
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `PATCH /tasks/:id/toggle` - Toggle task status

### Request/Response Handling
- Automatic JWT token attachment
- Request/response interceptors
- Error handling and user feedback
- Loading state management

## Development

### Code Quality
- ESLint configuration for code consistency
- TypeScript strict mode enabled
- Prettier for code formatting
- Husky pre-commit hooks (optional)

### Component Development
```typescript
// Example component structure
interface ComponentProps {
  // Props definition
}

export default function Component({ }: ComponentProps) {
  // Component logic
  return (
    // JSX with proper TypeScript typing
  );
}
```

### State Management Pattern
```typescript
// Context pattern for global state
const Context = createContext<ContextType | undefined>(undefined);

export const useContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error('useContext must be used within Provider');
  return context;
};
```

## Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Font Loading**: Optimized Google Fonts loading
- **Bundle Analysis**: Built-in bundle analyzer
- **Caching**: Proper HTTP caching headers
- **Lazy Loading**: Component lazy loading where appropriate

## Deployment

### Environment Variables for Production
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Build Commands
```bash
# Production build
npm run build

# Start production server
npm start

# Export static files (if needed)
npm run export
```

### Deployment Platforms
- **Vercel** (recommended): Zero-config deployment
- **Netlify**: Static site hosting
- **Docker**: Containerized deployment
- **AWS S3 + CloudFront**: Static hosting with CDN

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast ratios
- Alt text for images

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@taskflow.com or create an issue in the repository.