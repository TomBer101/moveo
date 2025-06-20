# Moveo Server - TypeScript Express with MongoDB Atlas

A TypeScript Express server with MongoDB Atlas integration and session management using `connect-mongo`.

## Features

- ✅ TypeScript with proper typing
- ✅ MongoDB Atlas integration with Mongoose
- ✅ Express sessions stored in MongoDB
- ✅ User authentication with bcrypt
- ✅ Structured project architecture
- ✅ Environment-based configuration
- ✅ Single entry point (server.ts)

## Project Structure

```
server/
├── src/
│   ├── lib/
│   │   ├── mongodb/
│   │   │   └── config.ts          # MongoDB connection configuration
│   │   └── sessions/
│   │       └── config.ts          # Session configuration with connect-mongo
│   ├── models/
│   │   ├── User.ts               # User model with TypeScript interfaces
│   │   └── Tag.ts                # Existing Tag model
│   ├── controllers/              # Route controllers
│   ├── routes/                   # Express routes
│   ├── middlewares/              # Custom middlewares
│   ├── services/                 # Business logic
│   ├── types/                    # TypeScript type definitions
│   ├── utils/                    # Utility functions
│   └── server.ts                 # Main server entry point (consolidated)
├── package.json
├── tsconfig.json
└── env.example                   # Environment variables template
```

## Setup Instructions

### 1. MongoDB Atlas Configuration

#### In MongoDB Atlas:

1. **Create a Cluster** (if you haven't already):
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new project or select existing one
   - Create a new cluster (M0 Free tier is fine for development)

2. **Set up Database Access**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Set privileges to "Read and write to any database"

3. **Set up Network Access**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your server's IP address

4. **Get Connection String**:
   - Go to "Database" in the left sidebar
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

### 2. Environment Configuration

1. **Create `.env` file**:
   ```bash
   cp env.example .env
   ```

2. **Update `.env` with your MongoDB Atlas credentials**:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   SESSION_SECRET=your-super-secret-session-key-change-this-in-production
   PORT=3000
   NODE_ENV=development
   ```

   Replace:
   - `<username>`: Your MongoDB Atlas username
   - `<password>`: Your MongoDB Atlas password
   - `<cluster>`: Your cluster name
   - `<database>`: Your database name (e.g., "moveo")

### 3. Install Dependencies

```bash
npm install
```

### 4. Development

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 5. Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user

### User Management
- `GET /profile` - Get user profile (protected)
- `GET /health` - Health check

### Example Usage

#### Register a new user:
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

#### Login:
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

#### Get profile (with session cookie):
```bash
curl -X GET http://localhost:3000/profile \
  -H "Cookie: sessionId=<your-session-cookie>"
```

## Session Management

Sessions are automatically stored in MongoDB Atlas in a `sessions` collection. The session configuration includes:

- **TTL**: 24 hours
- **Auto-removal**: Uses MongoDB's native TTL index
- **Encryption**: Session data is encrypted
- **Secure cookies**: In production with HTTPS

## TypeScript Features

- Full type safety for MongoDB models
- Express session typing
- Request/Response typing
- Custom middleware typing

## Architecture

The server uses a consolidated approach with `server.ts` as the single entry point that includes:

- **MongoDB Connection**: Automatic connection to Atlas
- **Session Configuration**: Express sessions with MongoDB store
- **Middleware Setup**: JSON parsing and session handling
- **Route Definitions**: All API endpoints in one place
- **Authentication**: Built-in auth middleware
- **Server Startup**: Proper initialization sequence

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**:
   - Check your connection string
   - Verify username/password
   - Ensure IP is whitelisted in Atlas

2. **Session Not Persisting**:
   - Check MongoDB connection
   - Verify session secret is set
   - Check cookie settings

3. **TypeScript Errors**:
   - Run `npm install` to ensure all types are installed
   - Check `tsconfig.json` configuration

### Debug Mode

Set `NODE_ENV=development` in your `.env` file for detailed logging.

## Security Notes

- Change `SESSION_SECRET` in production
- Use HTTPS in production
- Set `secure: true` for cookies in production
- Regularly rotate database passwords
- Use environment variables for all secrets 