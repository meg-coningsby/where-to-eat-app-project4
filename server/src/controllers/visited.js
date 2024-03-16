const Visited = require('../models/visited');

module.exports = {
    index,
    addVisited,
    deleteVisited,
};

async function index(req, res) {
    try {
        const visits = await Visited.find({ user: req.user.sub });
        res.json(visits);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function addVisited(req, res) {
    try {
        const { restaurantId } = req.body;
        const userId = req.user.sub;

        // Create a new visited document
        const visited = new Visited({
            user: userId,
            restaurant: restaurantId,
            visitDate: new Date(),
            comments: req.body.comments || '',
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
        const userId = req.user.sub; // Assuming you're using req.user.sub to identify the user

        // Find the visited document by ID and ensure the user is the owner
        const visited = await Visited.findById(visitedId);

        // Check if the visited document exists
        if (!visited) {
            return res
                .status(404)
                .json({ error: 'Visited restaurant not found' });
        }

        // Check if the user making the request is the owner of the visited restaurant
        if (visited.user.toString() !== userId) {
            // If the user IDs don't match, respond with an unauthorized error
            return res
                .status(403)
                .json({ error: 'Unauthorized to delete this visited record' });
        }

        // Proceed to delete the visited document
        await Visited.findByIdAndDelete(visitedId);

        res.json({ message: 'Visited restaurant deleted successfully' });
    } catch (error) {
        console.error('Error deleting visited restaurant:', error);
        res.status(500).json({ error: 'Failed to delete visited restaurant' });
    }
}
