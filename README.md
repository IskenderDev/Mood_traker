# MoodScribe
 MoodScribe is a user-friendly mental health journaling application designed to help individuals track their moods, reflect on their daily experiences, and gain insights into their emotional well-being. By recording daily journal entries and associating them with specific moods, users can visualize their emotional patterns over time and better understand the factors influencing their mental health.with specific moods, users can visualize their emotional patterns over time and better understand the factors influencing their mental health.

## Architecture Overview
***Frontend***: React + Vite + TS with Tailwind CSS for styling, Chart.js with react-chartjs-2 for mood visualization, React-hook-form with Yup validation, and Flowbite for components.

***Backend***: Node.js with Express framework for handling API requests, and Json Web Token (JWT) for authorization.

***Database***: MongoDB for storing user data and journal entries.

***State Management***: Redux toolkit for managing application state.

***APIs***: Integrated third-party APIs for fetching useful mental health articles.

## Technology Stack
***Frontend***: React - Vite, Tailwind CSS, Typescript

***Backend***: Node.js, Express

***Database***: MongoDB

***State Management***: Redux toolkit

***APIs***: News API

***Charts***: Chart.js with react-chartjs-2


### Prerequisites

***Ensure you have the following installed:***

    Node.js
    npm (Node Package Manager)
    MongoDB

### Steps for Backend

##### Clone the repository:
    git clone https://github.com/bammietop03/MoodScribe.git

##### Navigate to the project directory:
    cd /backend

##### Install the dependencies:
    npm install

##### Create a .env file in the root directory and add your MongoDB URL and database name:
    DB_URL=mongodb://localhost:27017
    DB_DATABASE=moodscribe
    JWT_SECRET=your_secret_key

##### Start the MongoDB server:
    mongod

##### Start the application:
    npm start or npm run dev
The server should be running on http://localhost:5000.

### Steps for Frontend

##### Clone the repository:
    git clone https://github.com/bammietop03/MoodScribe.git

##### Navigate to the project directory:
    cd /frontend/moodscribe

##### Install the dependencies:
    npm install

##### Start the application:
    npm run dev


### API Documentation
##### The API is documented using Swagger. After starting the server, you can access the Swagger UI at:
    http://localhost:5000/api-docs

### Testing
Running Tests
##### Ensure your database is running, then run the tests using the following command:
    npm test

### Contributing
##### Contributions are welcome! Please fork the repository and submit a pull request.
    Fork the repository
    Create a new branch (git checkout -b feature/your-feature)
    Commit your changes (git commit -m 'Add some feature')
    Push to the branch (git push origin feature/your-feature)
    Open a pull request

### License
This project is licensed under the MIT License.