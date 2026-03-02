# Whisk

Welcome to **Whisk**, the ultimate social media platform for sharing your culinary adventures! 

## Project Description
Whisk is designed to connect cooking enthusiasts from around the globe. Users can share recipes, cooking tips, and meal experiences, creating a vibrant community where food lovers can inspire and motivate each other. Whether you're a novice home chef or a seasoned culinary expert, Whisk offers you a space to express your passion for food.

## Features
- **User Profiles**: Create a personalized profile showcasing your culinary skills and favorite dishes.
- **Recipe Sharing**: Post your own recipes and explore those shared by others.
- **Interactive Comments**: Engage with other users by commenting on their posts and sharing insights.
- **Collections**: Save your favorite recipes into collections for easy access.
- **Notifications**: Get notified about comments, likes, and new followers.
- **Search Functionality**: Easily find recipes and users through our advanced search options.

## Technology Stack
- **Frontend**: React.js for a dynamic user interface.
- **Backend**: Node.js with Express for server-side logic.
- **Database**: MongoDB for flexible and scalable data storage.
- **Authentication**: JWT (JSON Web Tokens) to secure user access.
- **Hosting**: Deployed on Heroku for reliable and fast performance.

## Getting Started
To get started with Whisk, follow these simple steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Mario-Lupo-Ciaponi/Whisk.git
   ```
2. Navigate into the project directory:
   ```bash
   cd Whisk
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run start
   ```

## Installation
For a live version of the site,
1. Ensure you have Node.js and npm installed.
2. Follow the steps in the "Getting Started" section to get both frontend and backend running on your local machine.
3. Configure the environment variables as needed.

## API Documentation
Our RESTful API allows seamless interaction with the database. Available endpoints include:
- `GET /api/users`: Retrieve user information.
- `POST /api/recipes`: Add a new recipe.
- `GET /api/recipes/:id`: Get a specific recipe by ID.
- `PUT /api/recipes/:id`: Update a recipe.
- `DELETE /api/recipes/:id`: Delete a recipe.

Refer to the [API documentation](https://github.com/Mario-Lupo-Ciaponi/Whisk/wiki/API-Documentation) for more details.

## Contributing
We welcome contributions! Here’s how you can help:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

Thank you for helping make Whisk better!

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.