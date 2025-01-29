const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - Allow only frontend URL
const allowedOrigins = [
    'https://yourfrontend-url.railway.app',  // Replace this with your frontend URL
    'http://localhost:3000'                  // You can also add local URL for local development
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow the request from allowed origins
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Endpoint to recommend cars based on the user's city and car type
app.post('/recommend-cars', async (req, res) => {
    const { city, carType } = req.body;

    if (!city || !carType) {
        return res.status(400).json({ error: 'City and Car Type are required.' });
    }

    try {
        // Fetch car data from an external API (e.g., CarQuery API)
        const response = await axios.get('https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=all&year=2020&sold_in_india=1');
        const cars = response.data.models;

        // Filter cars based on the selected car type (Sedan, SUV, Hatchback)
        const filteredCars = cars.filter(car => car.body.toLowerCase() === carType.toLowerCase());

        // Return the filtered list of cars
        res.json(filteredCars);
    } catch (error) {
        console.error('Error fetching car data:', error);
        res.status(500).json({ error: 'Failed to fetch car data.' });
    }
});

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});
