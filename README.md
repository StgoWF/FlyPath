
# FlyPath

FlyPath is a user-friendly flight search engine that helps users find and compare flights quickly and easily. We provide essential flight details to enable informed travel decisions.

## Deployed Link

Check out the deployed application [here](https://flypath-1c59fc52be15.herokuapp.com/).

## Screenshots

### Home Page
![Home Page](./client/public/image.png)



## Features

- **Search Flights**: Users can search for flights by entering the departure city, destination city, and travel dates.
- **Compare Prices**: View and compare flight prices from different airlines.
- **Save Flights**: Save flight details for future reference.

## Technologies Used

### Frontend
- **React.js**: Interactive user interfaces.
- **Apollo Client**: Manage GraphQL data and state.
- **CSS Modules**: Scoped and maintainable styles.
- **Third-Party API**: Fetch flight data.

### Backend
- **Node.js with Express.js**: Server setup and backend logic.
- **GraphQL**: Flexible data querying.
- **MongoDB**: Storing user and flight data.
- **Stripe**: Payment processing.

### Tools
- **Git**: Version control.
- **Webpack**: Module bundling.
- **ESLint**: Code quality.
- **Jest**: Unit testing.
- **Postman**: Testing API endpoints.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/FlyPath.git
   cd FlyPath
   ```

2. **Install server dependencies:**

   ```bash
   npm install
   ```

3. **Install client dependencies:**

   ```bash
   cd client
   npm install
   ```

4. **Create a .env file in the root directory and add the following environment variables:**

   ```env
   REACT_APP_RAPIDAPI_KEY=your_rapidapi_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

5. **Run the application:**

   ```bash
   cd ..
   npm run dev
   ```

6. **Build and run the client:**

   ```bash
   cd client
   npm run build
   npm start
   ```

## Usage

1. Open your browser and go to http://localhost:3000 to view the application.
2. Use the search functionality to find and compare flights.
3. Save flights for future reference.

## Future Development

- Comment feature: Allow users to post comments on other individuals' saved flights.
- Social/Friend feature: Allow users to follow each other.
- Booking Hotels: Allow users to book hotels and flights through our website.
- Things-to-do page: Add a page or section that provides activities and places to visit.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact



Project Link: https://github.com/StgoWF/FlyPath
