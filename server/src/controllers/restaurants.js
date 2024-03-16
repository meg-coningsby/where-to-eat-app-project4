const List = require('../models/list');
const Restaurant = require('../models/restaurant');

module.exports = {
    show,
    addToList,
    removeFromList,
};

async function show(req, res) {
    try {
    } catch (error) {
        res.status(400).send(error);
    }
}

async function addToList(req, res) {
    try {
        const { listId, googlePlaceId } = req.body;
        const userId = req.user.sub;

        const list = await List.findOne({ _id: listId, owner: userId });
        if (!list) {
            return res
                .status(404)
                .json({ error: 'List not found or unauthorized access' });
        }

        let restaurant = await Restaurant.findOne({ googlePlaceId });
        if (!restaurant) {
            restaurant = new Restaurant({ googlePlaceId });
            await restaurant.save();
        }

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
        const { listId, restaurantId } = req.body;
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
            res.status(200).json(list);
        } else {
            res.status(404).json({ error: 'Restaurant not found in list' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
