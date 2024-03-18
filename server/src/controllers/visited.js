const Visited = require('../models/visited');

module.exports = {
    index,
    addVisited,
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

async function addVisited(req, res) {
    try {
        const { restaurantId, visitDate, comments, rating } = req.body;
        const userId = req.user.sub;

        // Create a new visited document including the rating
        const visited = new Visited({
            user: userId,
            restaurant: restaurantId,
            visitDate: visitDate || new Date(), // Assuming you want to use the date from the request or the current date
            comments: comments || '',
            rating: rating, // Include the rating field
        });

        // Save the visited document
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
