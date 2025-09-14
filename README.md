# Members Book - Aplicação Full-Stack

Este repositório contém a aplicação Members Book, um sistema completo com backend em Python (Flask/FastAPI) e frontend mobile em React Native (Expo). O objetivo é gerenciar membros, oferecer funcionalidades de AI, autenticação e comunicação em tempo real.

## Visão Geral da Arquitetura

-   **Frontend**: Desenvolvido com React Native, Expo e TypeScript, focado em uma experiência mobile fluida para iOS e Android.
-   **Backend**: Construído com Python (Flask/FastAPI) para desenvolvimento local, servindo como API para o frontend.
-   **Banco de Dados**: MongoDB Atlas (nuvem) para armazenamento de dados.
-   **Integração com IA**: Pontos de API para funcionalidades de inteligência artificial, como geração de bios.
-   **Autenticação**: Baseada em JWT (JSON Web Tokens) para segurança.
-   **Tempo Real**: Suporte básico a WebSockets para comunicação em tempo real (mensagens).

## Tecnologias Utilizadas

### Backend (Python)
-   **Python**: 3.11+
-   **Framework Web**: Flask 2.3+ (ou FastAPI para configurações leves)
-   **Banco de Dados**: MongoDB Atlas
-   **ODM (Object Document Mapper)**: PyMongo (ou Motor para operações assíncronas)
-   **Autenticação**: PyJWT (para tokens JWT), bcrypt (para hash de senhas)
-   **Validação**: Pydantic (para validação de requisições)
-   **AI**: Biblioteca `requests` (para chamadas externas), OpenAI API (para geração de bios)
-   **WebSockets**: Flask-SocketIO
-   **Ferramentas de Desenvolvimento**: pytest (para testes), python-dotenv (para configuração de ambiente)

### Frontend (React Native / Expo)
-   **Framework**: React Native
-   **Plataforma**: Expo (workflow gerenciado)
-   **Linguagem**: TypeScript
-   **Navegação**: React Navigation (bottom-tabs, stack)
-   **Armazenamento Local**: `@react-native-async-storage/async-storage`, `expo-secure-store`
-   **UI/UX**: `@expo/vector-icons`, `expo-linear-gradient`, `react-native-gesture-handler`, `react-native-screens`, `react-native-safe-area-context`
-   **Outros**: `expo-auth-session`, `expo-crypto`, `expo-font`, `expo-status-bar`, `merge-options`

## Estrutura do Projeto

```
.
├── backend/            # Contém todo o código do backend (Python)
│   ├── app/            # Aplicação Flask/FastAPI
│   ├── config.py       # Configurações do backend
│   ├── requirements.txt# Dependências do Python
│   └── tests/          # Testes do backend
├── frontend/           # Contém o código do frontend (React Native/Expo)
│   └── members-book/   # Projeto Expo
│       ├── src/        # Código fonte do aplicativo
│       ├── assets/     # Ativos como imagens e fontes
│       ├── package.json# Dependências do Node.js
│       └── App.tsx     # Componente principal do aplicativo
└── README.md           # Este arquivo
```

## Instalação e Configuração

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

-   **Git**: Para clonar o repositório.
-   **Python**: Versão 3.11 ou superior.
-   **Node.js**: Versão 18 ou superior (inclui npm).
-   **Expo CLI**: Instale globalmente via npm: `npm install -g expo-cli`.
-   **MongoDB Atlas**: Uma conta gratuita (tier gratuito disponível) para o banco de dados.
-   **OpenAI API Key**: Uma chave de API da OpenAI para funcionalidades de IA.

### Configuração do Backend

1.  **Clone o repositório**:
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd members-book
    ```

2.  **Navegue até o diretório do backend**:
    ```bash
    cd backend
    ```

3.  **Crie e ative um ambiente virtual Python**:
    ```bash
    python -m venv venv
    source venv/bin/activate # No Windows: .venv\Scripts\activate
    ```

4.  **Instale as dependências do Python**:
    ```bash
    pip install -r requirements.txt
    ```

5.  **Configure as variáveis de ambiente**:
    Crie um arquivo `.env` na raiz do diretório `backend` copiando o `.env.example`:
    ```bash
    cp .env.example .env
    ```
    Edite o arquivo `.env` com suas credenciais:
    ```
    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
    SECRET_KEY=sua_chave_secreta_aqui
    JWT_SECRET_KEY=sua_chave_secreta_jwt_aqui
    OPENAI_KEY=sk-proj-sua_chave_api_openai_aqui
    ```
    -   **MONGODB_URI**: Obtenha sua string de conexão no [MongoDB Atlas](https://www.mongodb.com/atlas). Lembre-se de criar um novo cluster, obter a string de conexão e liberar o acesso para seu IP.
    -   **SECRET_KEY** e **JWT_SECRET_KEY**: Use strings aleatórias e seguras.
    -   **OPENAI_KEY**: Sua chave de API da OpenAI.

6.  **Opcional: Popular o banco de dados com dados de teste (seed)**:
    ```bash
    python manage.py seed
    ```

7.  **Execute o servidor de desenvolvimento do Backend**:
    ```bash
    python manage.py runserver
    # Ou, se preferir usar o script direto:
    # python start_server.py
    ```
    O servidor estará disponível em `http://localhost:5000` (ou na porta configurada).

### Credenciais de Teste (Backend)

Para testar o backend, você pode usar as seguintes credenciais (criadas pelo comando `seed`):

-   **Admin:**
    -   **Email:** `admin@test.com`
    -   **Senha:** `password`
-   **Membro:**
    -   **Email:** `member@test.com`
    -   **Senha:** `password`
-   **Convidado:**
    -   **Email:** `guest@test.com`
    -   **Senha:** `password`

### Configuração e Execução do Frontend (Acesso via Túnel Expo)

1.  **Navegue até o diretório do frontend**:
    ```bash
    cd ../frontend/members-book
    ```

2.  **Instale as dependências do Node.js**:
    ```bash
    npm install
    # ou yarn install
    ```

3.  **Execute o aplicativo Expo via Túnel**:

    Para testar o aplicativo em dispositivos reais ou compartilhar o desenvolvimento fora da sua rede local, utilize os comandos de túnel do Expo. O túnel autenticado é o método recomendado para maior segurança.

    -   **Túnel Básico (menos seguro)**:
        ```bash
        npm run tunnel
        ```
    -   **Túnel Seguro com HTTPS**:
        ```bash
        npm run tunnel-secure
        ```
    -   **Túnel Autenticado e Seguro (recomendado)**:
        ```bash
        npm run tunnel-auth
        ```
    -   **Limpar cache e iniciar túnel**:
        ```bash
        npm run tunnel-clear
        ```

    Após executar um desses comandos, o Metro Bundler será iniciado e um QR code será exibido no seu terminal. Escaneie-o com o aplicativo Expo Go no seu dispositivo móvel.

**Importante**: Para o túnel autenticado, o arquivo `.env` na raiz do projeto Expo (`frontend/members-book/.env`) pode conter variáveis de ambiente para tokens de segurança (`TUNNEL_AUTH_TOKEN`, `API_KEY`, `ENCRYPTION_KEY`). **Nunca comite este arquivo em controle de versão.**

O projeto inclui configurações para acesso seguro via túnel Expo, útil para testar em dispositivos reais fora da sua rede local.

-   **Túnel Básico (menos seguro)**:
    ```bash
    npm run tunnel
    ```
-   **Túnel Seguro com HTTPS**:
    ```bash
    npm run tunnel-secure
    ```
-   **Túnel Autenticado e Seguro (recomendado)**:
    ```bash
    npm run tunnel-auth
    ```
-   **Limpar cache e iniciar túnel**:
    ```bash
    npm run tunnel-clear
    ```

**Importante**: Para o túnel autenticado, o arquivo `.env` na raiz do projeto Expo (`frontend/members-book/.env`) pode conter variáveis de ambiente para tokens de segurança (`TUNNEL_AUTH_TOKEN`, `API_KEY`, `ENCRYPTION_KEY`). **Nunca comite este arquivo em controle de versão.**

## Funcionalidades Principais

-   **Gerenciamento de Membros**: Listagem, visualização de perfil, atualização (com aprovação de admin).
-   **Autenticação**: Login, registro, logout, login de convidado.
-   **Mensagens**: Suporte básico a chat em tempo real.
-   **Recursos de IA**: Geração de bios profissionais para membros usando OpenAI.
-   **Gerenciamento de Formulários**: Admins podem criar formulários dinâmicos para coleta de informações de membros.
-   **Validação de Valores**: Fluxo de aprovação para alterações de valores de negócios dos membros.
-   **Painel Administrativo**: Gerenciamento de usuários, métricas do sistema e aprovações pendentes.
-   **Perfis Públicos**: Visualização de showcases de membros para convidados.

## Testes (Backend)

Para executar os testes do backend, certifique-se de estar no diretório `backend` e com o ambiente virtual ativado:

-   **Executar todos os testes**:
    ```bash
    python manage.py test
    ```
-   **Executar testes com cobertura de código**:
    ```bash
    coverage run --source='.' manage.py test
    coverage report
    coverage html
    ```

## Considerações de Segurança

-   **Autenticação**: Tokens JWT e hash de senhas com bcrypt.
-   **Proteção de Dados**: Variáveis de ambiente para dados sensíveis, CORS, validação de entrada.
-   **Túnel Expo**: Utiliza tokens de autenticação, chaves de criptografia e gerenciamento de sessão para acesso seguro durante o desenvolvimento. **Não use em produção sem hardening adicional.**
-   **Boas Práticas**: Nunca comite arquivos `.env`. Regenere tokens regularmente. Monitore conexões.

## Licença

Privado - Aplicação Corporativa Members Book.
