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
- **Bio Generation**: OpenAI API for generating professional member bios

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

## Forms and Bio Generation
The application includes a feature that allows administrators to create dynamic forms for members. These forms are used to collect specific information from members, which is then used to generate a professional and standardized bio using the OpenAI API.

**How it works:**
1.  An admin creates a form, selecting the fields they want the member to fill out (e.g., "Main Achievements", "Areas of Expertise", "Personal Mission").
2.  The member fills out the form with their information.
3.  The submitted information is sent to a service that constructs a prompt for the OpenAI API.
4.  The OpenAI API generates a professional bio based on the provided information.
5.  The generated bio is then saved to the member's profile.

This ensures that all member bios maintain a high standard of quality and consistency, reflecting the professionalism of the community.

## 🚀 Guia Completo de Instalação e Configuração

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Python 3.11+** - [Download aqui](https://www.python.org/downloads/)
- **Git** - [Download aqui](https://git-scm.com/downloads)
- **Conta MongoDB Atlas** (gratuita) - [Criar conta](https://www.mongodb.com/atlas)
- **Editor de código** (recomendado: VS Code)

### 🛠️ Configuração Passo a Passo

#### **Passo 1: Clonar o Repositório**
```bash
# Clone o repositório
git clone <repository-url>
cd members-book/backend
```

#### **Passo 2: Criar Ambiente Virtual**
```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# No Windows:
venv\Scripts\activate
# No macOS/Linux:
source venv/bin/activate

# Verificar se o ambiente está ativo (deve aparecer (venv) no prompt)
```

#### **Passo 3: Instalar Dependências**
```bash
# Instalar todas as dependências necessárias
pip install -r requirements.txt

# Verificar se a instalação foi bem-sucedida
pip list
```

#### **Passo 4: Configurar MongoDB Atlas**

1. **Criar conta no MongoDB Atlas:**
   - Acesse [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Crie uma conta gratuita
   - Faça login no painel

2. **Criar um cluster:**
   - Clique em "Build a Database"
   - Escolha "M0 Sandbox" (gratuito)
   - Selecione uma região próxima
   - Clique em "Create Cluster"

3. **Configurar acesso:**
   - Vá em "Database Access" → "Add New Database User"
   - Crie um usuário com senha
   - Vá em "Network Access" → "Add IP Address"
   - Adicione "0.0.0.0/0" (permite acesso de qualquer IP)

4. **Obter string de conexão:**
   - Clique em "Connect" no seu cluster
   - Escolha "Connect your application"
   - Copie a string de conexão
   - Substitua `<password>` pela senha do usuário

#### **Passo 5: Configurar Variáveis de Ambiente**

```bash
# Copiar arquivo de exemplo
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Configurações básicas
SECRET_KEY=sua_chave_secreta_aqui_123456
JWT_SECRET=sua_jwt_secret_aqui_789012

# Configurações do banco de dados (OBRIGATÓRIO)
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/members_book

# Configurações de APIs externas (opcional)
OPENAI_KEY=sk-proj-sua_chave_openai_aqui

# Configurações do servidor
SERVER_HOST=0.0.0.0
SERVER_PORT=5002
DEBUG=True

# Configurações de CORS (adicione as URLs do seu frontend)
CORS_ORIGINS=http://localhost:8081,http://localhost:8082,http://localhost:8083,http://10.20.192.127:8081,http://10.20.192.127:8082,http://10.20.192.127:8083

# Configurações de segurança
JWT_ACCESS_TOKEN_EXPIRES=3600
BCRYPT_LOG_ROUNDS=12

# Configurações de rate limiting
RATE_LIMIT_ENABLED=True
RATE_LIMIT_DEFAULT=100 per hour
```

#### **Passo 6: Popular o Banco de Dados (Seed)**

```bash
# Executar script de seed para criar usuários de teste
python seed.py
```

Este comando criará os seguintes usuários de teste:
- **Admin:** `admin@test.com` / `password`
- **Membro:** `member@test.com` / `password`
- **Convidado:** `guest@test.com` / `password`

#### **Passo 7: Iniciar o Servidor**

```bash
# Método recomendado - usando o script start_server.py
python start_server.py

# Ou com opções personalizadas:
python start_server.py --host 0.0.0.0 --port 5002 --debug

# Método alternativo:
python app/main.py
```

**✅ Servidor iniciado com sucesso!**
- URL local: `http://localhost:5002`
- URL da rede: `http://10.20.192.127:5002` (substitua pelo seu IP)
- API Docs: `http://localhost:5002/api/docs`

### 🔐 Credenciais de Teste

Após executar o seed, você pode usar as seguintes credenciais para testar:

- **👑 Admin:**
  - **Email:** `admin@test.com`
  - **Senha:** `password`
  - **Permissões:** Acesso total ao sistema

- **👤 Membro:**
  - **Email:** `member@test.com`
  - **Senha:** `password`
  - **Permissões:** Acesso de membro padrão

- **🎫 Convidado:**
  - **Email:** `guest@test.com`
  - **Senha:** `password`
  - **Permissões:** Acesso limitado

### 🔧 Troubleshooting - Problemas Comuns

#### **❌ Erro: "ModuleNotFoundError"**
```bash
# Solução: Verificar se o ambiente virtual está ativo
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# Reinstalar dependências
pip install -r requirements.txt
```

#### **❌ Erro: "pymongo.errors.ServerSelectionTimeoutError"**
```bash
# Problema: Não consegue conectar ao MongoDB
# Soluções:
# 1. Verificar se a string MONGODB_URI está correta no .env
# 2. Verificar se o IP está liberado no MongoDB Atlas
# 3. Verificar se o usuário/senha estão corretos
# 4. Verificar conexão com a internet
```

#### **❌ Erro: "Port already in use"**
```bash
# Solução: Usar uma porta diferente
python start_server.py --port 5003

# Ou matar o processo que está usando a porta
# Windows:
netstat -ano | findstr :5002
taskkill /PID <PID_NUMBER> /F

# macOS/Linux:
lsof -ti:5002 | xargs kill -9
```

#### **❌ Erro: "CORS policy"**
```bash
# Solução: Adicionar a URL do frontend no .env
# Editar CORS_ORIGINS no arquivo .env:
CORS_ORIGINS=http://localhost:8081,http://localhost:8082,http://localhost:8083,http://SEU_IP:PORTA_FRONTEND

# Reiniciar o servidor após alterar
```

#### **❌ Erro: "JWT decode error"**
```bash
# Solução: Verificar se JWT_SECRET está configurado no .env
# Limpar tokens salvos no frontend/browser
# Fazer login novamente
```

#### **❌ Servidor não responde na rede**
```bash
# Verificar se o servidor está rodando com host 0.0.0.0
python start_server.py --host 0.0.0.0 --port 5002

# Verificar firewall do Windows
# Permitir Python através do firewall

# Verificar IP da máquina
ipconfig  # Windows
ifconfig  # macOS/Linux
```

### 📱 Testando a API

#### **Teste rápido com curl:**
```bash
# Testar se o servidor está respondendo
curl http://localhost:5002/api/health

# Testar login de convidado
curl -X POST http://localhost:5002/api/auth/guest-login \
  -H "Content-Type: application/json" \
  -d '{"device_id": "test-device"}'
```

#### **Teste no navegador:**
- Acesse: `http://localhost:5002/api/docs`
- Deve abrir a documentação da API
- Teste os endpoints diretamente na interface

### 🔄 Comandos Úteis

```bash
# Parar o servidor
Ctrl + C

# Reativar ambiente virtual
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# Atualizar dependências
pip install -r requirements.txt --upgrade

# Verificar logs do servidor
# Os logs aparecem no terminal onde o servidor está rodando

# Resetar banco de dados
python seed.py

# Verificar se todas as dependências estão instaladas
pip check
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