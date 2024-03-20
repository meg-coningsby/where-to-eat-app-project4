const Visited = require('../models/visited');
const Restaurant = require('../models/restaurant');

module.exports = {
    index,
    addVisited,
    addVisitedFromSearch,
    deleteVisited,
};

async function index(req, res) {
    try {
        const visits = await Visited.find({ user: req.user.sub })
            .populate('restaurant')
            .sort({ visitDate: -1 });
        res.json(visits);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Marks a restaurant as visited (when it is already saved in one of their lists)
async function addVisited(req, res) {
    try {
        const { restaurantId, visitDate, comments, rating } = req.body;
        const userId = req.user.sub;

        const visited = new Visited({
            user: userId,
            restaurant: restaurantId,
            visitDate: visitDate || new Date(),
            comments: comments || '',
            rating: rating,
        });

        const savedVisited = await visited.save();

        res.status(201).json(savedVisited);
    } catch (error) {
        console.error('Error adding visited restaurant:', error);
        res.status(500).json({ error: 'Failed to add visited restaurant' });
    }
}

// Allows them to add a restaurant from the search page - it will check if they have saved the restaurant first, and if not, add it in.
async function addVisitedFromSearch(req, res) {
    try {
        const { googlePlaceId, visitDate, comments, rating, name, address } =
            req.body;
        const userId = req.user.sub;

        // Check if the restaurant exists in the database
        let restaurant = await Restaurant.findOne({ googlePlaceId });

        // If the restaurant doesn't exist, add it to the db
        if (!restaurant) {
            restaurant = new Restaurant({
                googlePlaceId,
                name,
                address,
            });
            await restaurant.save();
        }

        // Now mark it as visited
        const visited = new Visited({
            user: userId,
            restaurant: restaurant._id,
            visitDate: visitDate || new Date(),
            comments: comments || '',
            rating: rating,
        });

        const savedVisited = await visited.save();
        res.status(201).json(savedVisited);
    } catch (error) {
        console.error('Error adding visited restaurant:', error);
        res.status(500).json({ error: 'Failed to add visited restaurant' });
    }
}

async function deleteVisited(req, res) {
    try {
        const visitedId = req.params.id;
        const userId = req.user.sub;

        const visited = await Visited.findById(visitedId);

        if (!visited) {
            return res
                .status(404)
                .json({ error: 'Visited restaurant not found' });
        }

        if (visited.user.toString() !== userId) {
            return res
                .status(403)
                .json({ error: 'Unauthorised to delete this visited record' });
        }

        // Proceed to delete the visited document
        await Visited.findByIdAndDelete(visitedId);

        res.json({ message: 'Visited restaurant deleted successfully' });
    } catch (error) {
        console.error('Error deleting visited restaurant:', error);
        res.status(500).json({ error: 'Failed to delete visited restaurant' });
    }
}
