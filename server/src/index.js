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
const restaurantDetailsApi = require('./routes/api/restaurantDetails');
const visitedApi = require('./routes/api/visited');
const eventsApi = require('./routes/api/events');
const eventNotificationsApi = require('./routes/api/eventNotifications');

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
app.use('/api/visited', visitedApi);
app.use('/api/events', eventsApi);
app.use('/api/restaurants', restaurantDetailsApi);
app.use('/api/notifications', eventNotificationsApi);

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
