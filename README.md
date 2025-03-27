# Blog Web App

A **Blog Web Application** built using **Node.js**, **Express.js**, **PostgreSQL**, **EJS**, and **Passport.js** for authentication. This application allows users to create, edit, and delete blog posts while supporting local and OAuth-based authentication with **Google** and **Facebook**.

## Features

- 📝 **User Authentication**
  - Local authentication with **email/password**
  - OAuth authentication via **Google** and **Facebook**
  - Secure password hashing using **bcrypt.js**
- 🏠 **User Dashboard**
  - View personal blog posts after login
- ✍ **Create, Edit, and Delete Posts**
  - Users can write, modify, and remove blog posts
- 🔐 **Session Management**
  - Maintains login sessions using **express-session**
- 🎨 **Templating with EJS**
  - Dynamic page rendering
- 📂 **Persistent Storage**
  - Stores users and posts in **PostgreSQL**

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Setup Instructions

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/your-username/blog-app.git
   cd blog-app
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Set Up PostgreSQL Database:**

   - Create a database and required tables:

   ```sql
   CREATE DATABASE blog_app;

   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       email TEXT UNIQUE NOT NULL,
       password TEXT NOT NULL
   );

   CREATE TABLE posts (
       post_id SERIAL PRIMARY KEY,
       title TEXT NOT NULL,
       post_details TEXT NOT NULL,
       user_id INTEGER REFERENCES users(id)
   );
   ```

4. **Configure Environment Variables:**

   - Create a `.env` file in the root directory and add:

   ```env
   PG_USER=your_username
   PG_HOST=localhost
   PG_DATABASE=blog_app
   PG_PASSWORD=your_password
   PG_PORT=5432

   SESSION_SECRET=your_secret_key
   NODE_ENV=development

   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   FACEBOOK_CLIENT_ID=your_facebook_client_id
   FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
   ```

5. **Start the Server:**

   ```sh
   npm start
   ```

6. **Access the App:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── modules/         # Helper functions (password validation, DB queries)
├── public/          # Static assets (CSS, images)
├── views/           # EJS templates
├── .env             # Environment variables
├── app.js         # Main server file
├── package.json     # Dependencies and scripts
└── README.md        # Project documentation
```

## Routes

| Route            | Method | Description          |
| ---------------- | ------ | -------------------- |
| `/`              | GET    | Landing Page         |
| `/register`      | GET    | Register Page        |
| `/login`         | GET    | Login Page           |
| `/home`          | GET    | User Dashboard       |
| `/new`           | GET    | New Post Page        |
| `/edit/:id`      | GET    | Edit Post Page       |
| `/delete/:id`    | GET    | Delete a Post        |
| `/auth/google`   | GET    | Google OAuth Login   |
| `/auth/facebook` | GET    | Facebook OAuth Login |
| `/posts`         | POST   | Create New Post      |
| `/edit/:id`      | POST   | Update Post          |
| `/register`      | POST   | Register User        |
| `/login`         | POST   | Login User           |

## Future Enhancements

- ✅ Comments system for posts
- 📆 Add timestamps to posts
- 👥 User profiles with avatars
- 📱 API endpoints for mobile integration
- 🔔 Email notifications for new posts

## License

This project is licensed under the MIT License.

---

**Made with ❤️ by Emediong Uyobong Eshiet**
