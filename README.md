# One Minute Bio

A Next.js 14 application that provides short, engaging biographies of notable people with audio/video content.

## Features

- User authentication and authorization
- Browse and search biographies
- Favorite and save biographies
- Category-based organization
- Audio and video content
- Newsletter subscription
- Premium content access
- Bio request system

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with HTTP-only cookies
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd one-minute-bio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/one_minute_bio?schema=public"
   JWT_SECRET="your-secure-secret-key"
   ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

### Models

#### User
- `id`: UUID (Primary Key)
- `email`: String (Unique)
- `password`: String (Hashed)
- `name`: String
- `avatar`: String (Optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- Relations: favorites, bioRequests, newsletterSubscriptions, purchases

#### Bio
- `id`: UUID (Primary Key)
- `name`: String
- `image`: String (Optional)
- `summary`: String
- `story`: String (Text)
- `audioUrl`: String (Optional)
- `videoUrl`: String (Optional)
- `categories`: Category[] (Many-to-Many)
- `popularity`: Integer
- `featured`: Boolean
- `createdAt`: DateTime
- `updatedAt`: DateTime
- Relations: categories, favorites

#### Category
- `id`: UUID (Primary Key)
- `name`: String (Unique)
- `description`: String (Optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- Relations: bios

#### Favorite
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key)
- `bioId`: UUID (Foreign Key)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- Relations: user, bio

#### Plan
- `id`: UUID (Primary Key)
- `name`: String
- `description`: String
- `price`: Float
- `type`: PlanType (Enum)
- `credits`: Integer (Optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- Relations: purchases

#### Purchase
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key)
- `planId`: UUID (Foreign Key)
- `status`: PurchaseStatus (Enum)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- Relations: user, plan

#### BioRequest
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key)
- `name`: String
- `description`: String (Text)
- `status`: RequestStatus (Enum)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- Relations: user

#### NewsletterSubscription
- `id`: UUID (Primary Key)
- `email`: String (Unique)
- `userId`: UUID (Foreign Key, Optional)
- `status`: SubscriptionStatus (Enum)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- Relations: user

## API Endpoints

### Authentication

#### POST /api/auth/signup
Create a new user account.
```typescript
Request:
{
  "email": string,
  "password": string,
  "name": string
}

Response:
{
  "id": string,
  "email": string,
  "name": string,
  "createdAt": string
}
```

#### POST /api/auth/login
Authenticate user and get JWT token.
```typescript
Request:
{
  "email": string,
  "password": string
}

Response:
{
  "user": {
    "id": string,
    "email": string,
    "name": string
  },
  "message": string
}
```

### Bios

#### GET /api/bios
Get all bios with optional filtering.
```typescript
Query Parameters:
- category: string (optional)
- featured: boolean (optional)

Response:
{
  "bios": [
    {
      "id": string,
      "name": string,
      "summary": string,
      "story": string,
      "categories": Category[],
      "popularity": number,
      "featured": boolean
    }
  ]
}
```

#### POST /api/bios
Create a new bio (requires authentication).
```typescript
Request:
{
  "name": string,
  "summary": string,
  "story": string,
  "categories": string[],
  "image": string (optional),
  "audioUrl": string (optional),
  "videoUrl": string (optional)
}
```

### Favorites

#### GET /api/favorites
Get user's favorite bios (requires authentication).
```typescript
Query Parameters:
- userId: string

Response:
{
  "favorites": [
    {
      "id": string,
      "bio": Bio
    }
  ]
}
```

#### POST /api/favorites
Add a bio to favorites (requires authentication).
```typescript
Request:
{
  "userId": string,
  "bioId": string
}
```

## Authentication Flow

1. User signs up or logs in
2. Server validates credentials
3. JWT token is generated and stored in HTTP-only cookie
4. Middleware validates token for protected routes
5. User information is added to request headers

## Security Features

- Password hashing with bcrypt
- JWT stored in HTTP-only cookies
- CSRF protection with SameSite cookie policy
- Secure headers in production
- Input validation
- Rate limiting (to be implemented)

## Development

### Running Tests
```bash
npm test
```

### Database Migrations
```bash
# Create a new migration
npx prisma migrate dev --name <migration-name>

# Apply migrations
npx prisma migrate deploy
```

### Seeding Data
```bash
npx prisma db seed
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern web trends
- Icons from [Tabler Icons](https://tabler-icons.io/)
- UI components from [Aceternity UI](https://ui.aceternity.com/)
