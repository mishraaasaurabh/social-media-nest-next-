# Social Media App

## Overview
This project is a social media application built using NestJS for the backend and Next.js for the frontend. The application allows users to authenticate, create posts, follow other users, and view a timeline of posts from users they follow.

## Tech Stack
- **Backend**: NestJS
- **Database**: MongoDB
- **Frontend**: Next.js (with App Router)
- **UI Library**: shadcn/ui

## Features
1. **User Authentication**
   - Signup and login APIs using NestJS.
   - JWT for issuing access and refresh tokens.
   - Protected routes using NestJS AuthGuard middleware.

2. **Post Creation**
   - Authenticated users can create new posts.
   - Each post includes:
     - Title (string)
     - Description (string)

3. **Follow & Unfollow Users**
   - Authenticated users can follow another user.
   - Users can unfollow others via an unfollow API.

4. **Timeline Page**
   - Logged-in users can view a feed/timeline.
   - The timeline displays all posts made by users they follow, sorted by newest first.

## Project Structure
```
social-media-app
├── backend
│   ├── src
│   ├── package.json
│   ├── nest-cli.json
│   ├── tsconfig.json
│   └── README.md
├── frontend
│   ├── app
│   ├── components
│   ├── lib
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   └── README.md
└── README.md
```

## Getting Started

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm run start
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## License
This project is licensed under the MIT License.