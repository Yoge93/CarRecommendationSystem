const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS - Allow all origins by default
app.use(cors()); 

app.use(express.json());

// Route to handle car recommendations based on user input
app.post('/recommend-cars', async (req, res) => {
    const { city, carType } = req.body;

    if (!city || !carType) {
        return res.status(400).json({ error: 'City and Car Type are required.' });
    }

    try {
        // Call the CarQuery API to get car data
        const response = await axios.get('https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=all&year=2020&sold_in_india=1');
        const cars = response.data.models;

        // Filter the cars based on car type (Sedan, SUV, Hatchback)
        const filteredCars = cars.filter(car => car.body.toLowerCase() === carType.toLowerCase());

        res.json(filteredCars);
    } catch (error) {
        console.error('Error fetching data from CarQuery API:', error);
        res.status(500).json({ error: 'Failed to fetch car data.' });
    }
});

// Start the server on port 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
