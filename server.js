const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Endpoint to get car recommendations based on city and car type
app.post('/recommend-cars', async (req, res) => {
    const { city, carType } = req.body;

    if (!city || !carType) {
        return res.status(400).json({ error: 'City and Car Type are required.' });
    }

    try {
        // Request to NHTSA API for vehicle makes (this is just an example)
        const makesResponse = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
        const makes = makesResponse.data.Results;

        // Filter makes based on car type (you can enhance this logic)
        const filteredMakes = makes.filter(make => make.MakeName.toLowerCase().includes(carType.toLowerCase()));

        // Get models of the selected car type from NHTSA API (filter by make)
        const carModelsPromises = filteredMakes.map(async (make) => {
            const modelsResponse = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make.MakeName}?format=json`);
            return { make: make.MakeName, models: modelsResponse.data.Results };
        });

        const carModels = await Promise.all(carModelsPromises);

        // Return filtered car models
        res.json(carModels);
    } catch (error) {
        console.error('Error fetching data from NHTSA API:', error);
        res.status(500).json({ error: 'Failed to fetch car data.' });
    }
});

// Start the backend server on the specified port
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});
