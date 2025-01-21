# TalkToPDF

A smart document interaction platform that allows users to have natural conversations with their PDF documents using AI technology.

## Description

TalkToPDF is an innovative web application that transforms the way users interact with PDF documents. By combining vector database technology with OpenAI's powerful language models, users can upload PDFs and engage in natural conversation about their content. The application processes the PDF content, stores it efficiently in a vector database, and enables users to ask questions and receive accurate, context-aware responses.

## Table of Contents

- [Features](#features)
- [Tech Stack & Services](#tech-stack--services)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features

- User Authentication and Authorization

  - Secure signup and login system
  - Protected routes and user-specific content access

- PDF Management

  - Easy PDF upload functionality
  - Secure storage in AWS S3
  - Automatic content extraction and processing

- Interactive Chat Interface

  - Real-time conversation with PDF content
  - Context-aware responses
  - Natural language query processing

- Vector Search Capabilities
  - Efficient content indexing
  - Fast and accurate response retrieval
  - Semantic search functionality

## Tech Stack & Services

- Frontend

  - React.js with TypeScript
  - Tailwind CSS for styling
  - HTML5

- Backend

  - Node.js
  - PostgreSQL for user data and metadata
  - Vector database for document embeddings

- Cloud Services

  - AWS S3 for PDF storage
  - OpenAI API for natural language processing

- DevOps
  - Docker
  - Docker Compose for containerization
  - Environment-based configuration

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/ram-jadiya/talk-to-pdf.git
   cd talk-to-pdf
   ```

2. Install dependencies:

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables (see Environment Variables section)

4. Start the development environment:

   ```bash
   # Start all services using Docker Compose
   docker-compose up --build
   ```

5. Access the application:
   ```
   Frontend: http://localhost
   Backend: http://localhost:3000
   ```

## Environment Variables

Create `.env` files in both frontend and backend directories:

```env
# Frontend (.env)
VITE_API_URL="http://localhost:3000/api/v1"

# Backend (.env)
# Server configuration
PORT=3000
HOST="localhost"

# JWT configuration
ACCESS_TOKEN_SECRET="your-access-token-secret"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
ACCESS_TOKEN_EXPIRATION="1d"
REFRESH_TOKEN_EXPIRATION="1d"

# Database configuration
DB_HOST="your-db-host"
DB_PORT=5432
DB_NAME="your-db-name"
DB_USER="your-db-user"
DB_PASSWORD="your-db-password"
DB_POOL_MAX=20
DB_SSL_CA="your-ssl-ca-file"

# Redis configuration
REDIS_URL="your-redis-url"

# Pinecone configuration
PINECONE_API_KEY="your-pinecone-api-key"

# OpenAI configuration
OPENAI_API_KEY="your-openai-api-key"

# AWS configuration
AWS_REGION="your-aws-region"
AWS_ACCESS_KEY_ID="your-aws-access-key-id"
AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"
AWS_LOG_GROUP_NAME="your-log-group-name"
AWS_S3_BUCKET_NAME="your-s3-bucket-name"
AWS_S3_BASE_URL="your-s3-base-url"

# Google configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_REDIRECT_URI="your-google-redirect-uri"

# SMTP configuration
SMTP_HOST="your-smtp-host"
SMTP_USER="your-smtp-user"
SMTP_PASS="your-smtp-pass"

# Stripe Credentials
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
PAYMENT_SUCCESS_URL="your-payment-success-url"
PAYMENT_CANCEL_URL="your-payment-cancel-url"
```

## How It Works

1. User Authentication

   - Users create an account or log in
   - JWT tokens are used for session management

2. PDF Processing

   - User uploads a PDF
   - Document is stored in AWS S3
   - Content is extracted and processed

3. Vector Storage

   - PDF content is converted into vectors
   - Vectors are stored in the vector database
   - Efficient indexing for quick retrieval

4. Chat Interface
   - User enters questions in natural language
   - Questions are processed using OpenAI's API
   - Relevant content is retrieved from vector database
   - Coherent responses are generated and displayed

## Future Enhancements

1. User Interface Improvements

   - Enhanced responsive design for all devices
   - Improved animations and transitions
   - Better visual feedback for user actions

2. Performance Optimization

   - Enhanced quality of AI responses
   - Optimized vector search algorithms
   - Improved content processing speed

3. Additional Features
   - Support for multiple document formats
   - Collaborative document sharing
   - Advanced document analytics
   - Custom training for specific domains

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
