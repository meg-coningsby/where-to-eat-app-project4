const List = require('../models/list');
const Restaurant = require('../models/restaurant');

module.exports = {
    addToList,
    removeFromList,
};

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
            res.status(400).json({ error: 'Restaurant already in list' });
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

        // Check if the restaurant is associated with any other lists
        const otherLists = await List.find({ restaurants: restaurantId });
        if (otherLists.length === 0) {
            // If not associated with any other lists, delete the restaurant from the database
            await Restaurant.findByIdAndDelete(restaurantId);
        }

        res.status(200).json(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
