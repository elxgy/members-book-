# Members Book - Backend

This is the backend service for the Members Book application, built with Python Flask/FastAPI for local development and designed to serve the React Native Expo frontend.

## Simple Architecture Overview

- **Frontend**: React Native + Expo + TypeScript
- **Backend**: Python Flask/FastAPI (local development)
- **Database**: MongoDB Atlas (cloud database)
- **AI Integration**: Simple API endpoints for AI features
- **Authentication**: JWT-based authentication
- **Real-time**: Basic WebSocket support for messaging

## Technology Stack

### Core Backend
- **Python**: 3.11+
- **Web Framework**: Flask 2.3+ or FastAPI (lightweight setup)
- **Database**: MongoDB Atlas (cloud database)
- **ODM**: PyMongo or Motor for async operations

### Authentication & Security
- **JWT**: PyJWT for token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Pydantic for request validation

### AI Integration
- **Simple API**: Basic endpoints for AI features
- **HTTP Client**: requests library for external AI calls

### Real-time Communication
- **WebSockets**: Flask-SocketIO for real-time messaging

### Development Tools
- **Testing**: pytest for unit testing
- **Environment**: python-dotenv for configuration
- **API Documentation**: Basic Swagger documentation

## Database Schema (MongoDB Collections)

### Members Collection
```javascript
// members collection
{
  _id: ObjectId,
  name: String,
  email: String, // unique index
  password_hash: String,
  tier: String, // 'Disruption', 'Infinity', 'Sócio'
  contact_info: {
    phone: String,
    company: String,
    position: String
  },
  profile_image_url: String,
  user_type: String, // 'member', 'admin'
  created_at: Date,
  updated_at: Date,
  last_login: Date,
  is_active: Boolean
}
```

### Messages Collection
```javascript
// messages collection
{
  _id: ObjectId,
  sender_id: ObjectId, // reference to members
  receiver_id: ObjectId, // reference to members
  content: String,
  created_at: Date,
  status: String, // 'sent', 'delivered', 'read'
  read_at: Date
}
```

### AI Recommendations Collection
```javascript
// ai_recommendations collection
{
  _id: ObjectId,
  user_id: ObjectId, // reference to members
  recommendation_type: String,
  recommendation_data: Object,
  confidence_score: Number,
  created_at: Date,
  is_applied: Boolean
}
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/logout` - User logout

### Member Management
- `GET /api/members` - Get member list
- `GET /api/members/{id}` - Get member profile
- `PUT /api/members/{id}` - Update member profile
- `GET /api/members/search` - Search members

### Messaging
- `POST /api/messages` - Send message
- `GET /api/messages/conversation/{user_id}` - Get conversation
- `PUT /api/messages/{id}/read` - Mark as read
- `GET /api/messages/unread` - Get unread count

### AI Features
- `GET /api/ai/recommendations` - Get AI recommendations
- `POST /api/ai/profile/optimize` - Profile optimization suggestions

### Admin (Admin only)
- `GET /api/admin/members` - Member management
- `PUT /api/admin/members/{id}/tier` - Update member tier

## Installation & Setup

### Prerequisites
- Python 3.11+
- MongoDB Atlas account (free tier available)
- Git

### Local Development Setup

1. **Clone and Setup Environment**
```bash
git clone <repository-url>
cd members-book/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **MongoDB Atlas Setup**
- Create a free MongoDB Atlas account at https://www.mongodb.com/atlas
- Create a new cluster
- Get your connection string
- Whitelist your IP address

3. **Environment Configuration**
```bash
cp .env.example .env
# Edit .env with your configuration:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/members_book
# SECRET_KEY=your-secret-key
# JWT_SECRET=your-jwt-secret
```

4. **Run Development Server**
```bash
# Flask
python app/main.py
# Server will run on http://localhost:5000
```

## Security Features

### Authentication
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Request validation using Pydantic

### Data Protection
- **Secure Database**: MongoDB Atlas with built-in security
- **Environment Variables**: Sensitive data in environment files
- **CORS Protection**: Cross-origin request security

### Basic Security
- **Rate Limiting**: Basic API rate limiting
- **Input Sanitization**: Clean user inputs
- **Error Handling**: Secure error responses

## Development Guidelines

### Code Quality
- **Type Hints**: Use Python type hints
- **Code Formatting**: Follow PEP 8 standards
- **Testing**: Write unit tests with pytest

### API Documentation
- **Clear Endpoints**: Well-documented API routes
- **Request/Response**: Clear examples for each endpoint
- **Error Handling**: Consistent error responses

### Local Development
- **Environment Variables**: Use .env for configuration
- **Hot Reload**: Flask development server with auto-reload
- **Simple Logging**: Basic logging for debugging

### AI Integration
- **Simple Endpoints**: Basic AI feature endpoints
- **Error Handling**: Graceful handling of AI service failures
- **Response Format**: Consistent AI response structure

## Testing

```bash
# Run all tests
python manage.py test

# Run with coverage
coverage run --source='.' manage.py test
coverage report
coverage html

# Integration tests
pytest tests/integration/

# Load testing
locust -f tests/load/locustfile.py
```

## Deployment

### Production Environment
- **Platform**: AWS ECS/EKS or similar container orchestration
- **Database**: AWS RDS PostgreSQL with Multi-AZ
- **Cache**: AWS ElastiCache Redis
- **Storage**: AWS S3 for file uploads
- **Monitoring**: CloudWatch + Prometheus + Grafana

### Environment Variables
```bash
# Core Configuration
DATABASE_URL=postgresql://user:pass@host:5432/members_book
REDIS_URL=redis://host:6379/0
SECRET_KEY=your-secret-key
DEBUG=False

# AI Integration
OPENAI_API_KEY=your-openai-key
AI_SERVICE_URL=http://ai-service:8000

# Security
JWT_SECRET_KEY=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key

# External Services
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_STORAGE_BUCKET_NAME=members-book-storage
```

### CI/CD Pipeline
- Automated testing on pull requests
- Security scanning with Bandit and Safety
- Docker image building and scanning
- Automated deployment to staging/production
- Database migration automation

## API Documentation

API documentation is available at:
- **Development**: http://localhost:8000/api/docs/
- **Swagger UI**: http://localhost:8000/api/swagger/
- **ReDoc**: http://localhost:8000/api/redoc/

## Contributing

1. Follow PEP 8 style guidelines
2. Write comprehensive tests for new features
3. Update API documentation
4. Ensure security best practices
5. Run security scans before committing

## License

Private - Members Book Enterprise Application