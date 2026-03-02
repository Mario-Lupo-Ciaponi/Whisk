# Whisk - Lost Pet Reunification Platform

Whisk is a social media platform dedicated to the reunification of lost pets with their owners. Much like popular social media applications, Whisk allows pet owners to post information about their lost pets, connect with others in their community, and increase the chances of finding their beloved companions.

## Features

- **Lost Pet Postings**: Users can create and view postings for lost pets.
- **Community Support**: Connect with local pet lovers to aid in the search for lost pets.
- **Real-Time Notifications**: Get instant alerts when a new lost pet is reported in your area.
- **User Profiles**: Create and customize profiles to manage your lost pet reports.
- **Location Services**: Utilize location-based features to find pets nearby.

## Technology Stack

- **Frontend**: React, Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Hosting**: AWS, Heroku

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Mario-Lupo-Ciaponi/Whisk.git
   cd Whisk
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the root directory and specify the required variables.

4. Start the application:
   ```bash
   npm start
   ```

## API Documentation

- **GET /api/pets**: Retrieve a list of lost pets.
- **POST /api/pets**: Create a new lost pet report.
- **GET /api/pets/:id**: Get details of a specific lost pet report.
- **PUT /api/pets/:id**: Update information of a lost pet report.
- **DELETE /api/pets/:id**: Remove a lost pet report.

## Contributing Guidelines

We welcome contributions! Please follow these steps to contribute to Whisk:

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## Licensing Information

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.