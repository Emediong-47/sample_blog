# Blog Web Application

This repository contains a simple yet functional Blog web application built using **Node.js**, **Express.js**, and **EJS**. The application is designed to demonstrate dynamic content rendering, basic routing, and a clean, user-friendly interface.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Homepage**: Displays all blog posts in an elegant, responsive layout.
- **Create New Post**: Users can submit blog posts through a simple form.
- **Dynamic Rendering**: Utilizes EJS templates for rendering content dynamically.
- **Responsive Design**: Ensures compatibility across various devices for an optimal user experience.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework for routing and middleware.
- **EJS**: Template engine for rendering dynamic HTML.
- **CSS**: Custom styles for professional and polished UI.

## Installation

To set up this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone 'https://github.com/Emediong-47/sample_blog.git'
   cd <repository_directory>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   *For development, use:*

   ```bash
   npm run dev
   ```

   *(Requires ************`nodemon`************ for automatic restarts during code changes.)*

4. Access the application in your browser at:

   ```
   http://localhost:3000
   ```

## Usage

1. Visit the homepage to view existing blog posts.
2. Click "Create New Post" to add a new blog entry.
3. Fill out the form with the blog title and content, then submit.
4. View your post displayed on the homepage.

## Project Structure

```
├── public
│   └── styles.css      # Styling for the application
├── views
│   ├── index.ejs       # Homepage template
│   └── new.ejs         # Form template for creating new posts
├── app.js              # Main server logic
├── package.json        # Project metadata and dependencies
└── README.md           # Documentation
```

## Roadmap

- **Database Integration**: Add persistent storage using MongoDB or another database.
- **Authentication**: Implement user registration and login functionality.
- **Post Management**: Allow users to edit and delete posts.
- **Enhanced UI/UX**: Further improve responsiveness and aesthetic appeal.
- **Deployment**: Host the application using services like Heroku or Vercel.

## Contributing

Contributions are welcome! If you have suggestions or find bugs, please:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add YourFeatureName"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this project as per the license terms.

---

### Contact

For questions or feedback, please reach out via [GitHub Issues](https://github.com/yourusername/repository/issues).

---

Thank you for checking out this Blog Web Application. We hope you enjoy working with it!

