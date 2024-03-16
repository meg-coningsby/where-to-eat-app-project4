const path = require('path');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({
        path: path.resolve(__dirname, '..', '..', '.env'),
    });
}

const express = require('express');
const logger = require('morgan');
const axios = require('axios');
const checkToken = require('./middleware/check-token');
const usersApi = require('./routes/api/users');
const listsApi = require('./routes/api/lists');
const restaurantsApi = require('./routes/api/restaurants');

// Connect to the database
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(checkToken);

app.get('/api/test', (req, res) => {
    res.json({ hello: 'There' });
});

app.use('/api/users', usersApi);
app.use('/api/lists', listsApi);
app.use('/api/myrestaurants', restaurantsApi);

app.get('/api/restaurants/:place_id', async (req, res) => {
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

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function (req, res) {
    res.sendFile(
        path.join(__dirname, '..', '..', 'client', 'dist', 'index.html')
    );
});

const port = +process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});
