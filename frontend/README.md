# Social Media App - Frontend Documentation

## Overview
This is the frontend of the Social Media App built using Next.js with the App Router. The application allows users to authenticate, create posts, follow other users, and view a timeline of posts from users they follow.

## Tech Stack
- **Frontend Framework**: Next.js
- **UI Library**: shadcn/ui
- **State Management**: React Context API (or any preferred state management solution)

## Features
1. **User Authentication**
   - Users can sign up and log in using JWT for secure authentication.
   
2. **Post Creation**
   - Authenticated users can create new posts with a title and description.

3. **Follow & Unfollow Users**
   - Users can follow and unfollow other users to manage their social connections.

4. **Timeline Page**
   - Users can view a timeline that displays posts from users they follow, sorted by the newest first.

## Project Structure
```
frontend
├── app
│   ├── layout.tsx          # Layout component for consistent structure
│   ├── page.tsx            # Main entry point for the application
│   ├── login
│   │   └── page.tsx        # Login page for user authentication
│   ├── signup
│   │   └── page.tsx        # Signup page for new user registration
│   ├── timeline
│   │   └── page.tsx        # Timeline page displaying posts
│   ├── create-post
│   │   └── page.tsx        # Page for creating new posts
│   └── profile
│       └── page.tsx        # User profile page
├── components
│   ├── PostCard.tsx        # Component for displaying individual posts
│   ├── Timeline.tsx        # Component for aggregating posts
│   ├── AuthForm.tsx        # Component for authentication forms
│   └── FollowButton.tsx     # Component for follow/unfollow actions
├── lib
│   └── api.ts              # API functions for backend communication
├── package.json             # NPM configuration for the frontend
├── next.config.js          # Next.js configuration settings
├── tsconfig.json           # TypeScript configuration for the frontend
└── README.md               # Documentation for the frontend project
```

## Getting Started
1. Clone the repository:
   ```
   git clone <repository-url>
   cd social-media-app/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.