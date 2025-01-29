const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from the frontend
const allowedOrigins = [
    'https://yourfrontend-url.railway.app',  // Replace with your actual frontend URL
    'http://localhost:3000',                 // Local development URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow the request if it's from an allowed origin
        } else {
            callback(new Error('Not allowed by CORS')); // Reject if not allowed
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json()); // For parsing application/json

// Endpoint to recommend cars based on the user's city and car type
app.post('/recommend-cars', async (req, res) => {
    const { city, carType } = req.body;

    if (!city || !carType) {
        return res.status(400).json({ error: 'City and Car Type are required.' });
    }

    try {
        // Fetch product data from the third-party API (FakeStoreAPI)
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;

        // Filter products based on the car type (SUV, Sedan, Hatchback)
        const filteredCars = products.filter(product => {
            return product.category.toLowerCase() === carType.toLowerCase();
        });

        // Return the filtered list of cars
        res.json(filteredCars);
    } catch (error) {
        console.error('Error fetching data from third-party API:', error);
        res.status(500).json({ error: 'Failed to fetch car data.' });
    }
});

// Start the backend server on the specified port
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});
