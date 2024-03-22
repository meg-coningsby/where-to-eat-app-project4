const List = require('../models/list');
const Restaurant = require('../models/restaurant');

module.exports = {
    index,
    addToList,
    removeFromList,
    update,
};

// Pull a list of all the user's saved restaurants (to be used in things like events)
async function index(req, res) {
    try {
        const userId = req.user.sub;
        const userLists = await List.find({ owner: userId });

        // Using set as a restaurant could be in multiple lists
        const restaurantIds = [
            ...new Set(userLists.flatMap((list) => list.restaurants)),
        ];

        const restaurants = await Restaurant.find({
            _id: { $in: restaurantIds },
        });

        res.json(restaurants);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Add a restaurant to a list
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
            // If the restaurant is already in the list, instead of erroring, just return the current state of the list
            res.status(200).json(list);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Remove a restaurant from a list
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

// Update the list
async function update(req, res) {
    try {
        const { restaurantId } = req.params;

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        restaurant.visited = !restaurant.visited;

        await restaurant.save();

        res.status(200).json(restaurant);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
