const List = require('../models/list');
const Restaurant = require('../models/restaurant');

module.exports = {
    index,
    addToList,
    removeFromList,
    update,
};

async function index(req, res) {
    try {
        const userId = req.user.sub;
        const userLists = await List.find({ owner: userId });

        // Using set as a restaurant could be in multiple lists
        const restaurantIds = [
            ...new Set(userLists.flatMap((list) => list.restaurants)),
        ];

        // Find all restaurants with IDs that are in the user's lists
        const restaurants = await Restaurant.find({
            _id: { $in: restaurantIds },
        });

        res.json(restaurants);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function addToList(req, res) {
    try {
        const { listId, googlePlaceId, name, address } = req.body;
        const userId = req.user.sub;

        const list = await List.findOne({ _id: listId, owner: userId });
        if (!list) {
            return res
                .status(404)
                .json({ error: 'List not found or unauthorized access' });
        }

        let restaurant = await Restaurant.findOne({ googlePlaceId });

        // If the restaurant doesn't exist, create a new one
        if (!restaurant) {
            restaurant = new Restaurant({ googlePlaceId, name, address });
            await restaurant.save();
        }

        // Add the restaurant to the list if it's not already included
        if (!list.restaurants.includes(restaurant._id)) {
            list.restaurants.push(restaurant._id);
            await list.save();
            res.status(201).json(list);
        } else {
            // Instead of erroring, just return the current state of the list
            res.status(200).json(list);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function removeFromList(req, res) {
    try {
        const { listId, restaurantId } = req.params;
        const userId = req.user.sub;

        const list = await List.findOne({ _id: listId, owner: userId });
        if (!list) {
            return res
                .status(404)
                .json({ error: 'List not found or unauthorized access' });
        }

        // Remove the restaurant from the list
        const index = list.restaurants.indexOf(restaurantId);
        if (index > -1) {
            list.restaurants.splice(index, 1);
            await list.save();
        } else {
            return res
                .status(404)
                .json({ error: 'Restaurant not found in list' });
        }

        res.status(200).json(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function update(req, res) {
    try {
        // Retrieve the restaurantId from the request parameters
        const { restaurantId } = req.params;

        // Find the restaurant by its ID
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        // Toggle the visited status
        restaurant.visited = !restaurant.visited;

        // Save the updated restaurant
        await restaurant.save();

        // Respond with the updated restaurant
        res.status(200).json(restaurant);
    } catch (error) {
        // If an error occurs, send a 400 error response
        res.status(400).send(error.message);
    }
}
