const express = require('express');
const router = express.Router();
const axios = require('axios');

// Route to get restaurant details by place_id
router.get('/:place_id', async (req, res) => {
    const { place_id } = req.params;
    const apiKey = process.env.API_KEY;

    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json`,
            {
                params: {
                    key: apiKey,
                    place_id: place_id,
                    fields: 'name,formatted_address',
                },
            }
        );

        res.json(response.data.result);
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
        res.status(500).json({
            error: 'An error occurred while fetching restaurant details',
        });
    }
});

module.exports = router;
