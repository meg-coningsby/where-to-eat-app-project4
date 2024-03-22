const List = require('../models/list');

module.exports = {
    index,
    indexPublic,
    show,
    addList,
    updateList,
    deleteList,
};

// Get all a user's lists
async function index(req, res) {
    try {
        const lists = await List.find({ owner: req.user.sub });
        res.json(lists);
    } catch (error) {
        console.error('Error in index list function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Retrieve all lists marked 'public
async function indexPublic(req, res) {
    try {
        const lists = await List.find({ public: true });
        res.json(lists);
    } catch (error) {
        console.error('Error in indexPublic list function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Show a list details
async function show(req, res) {
    try {
        const list = await List.findById(req.params.id).populate('restaurants');
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }
        res.json(list);
    } catch (error) {
        console.error('Error in show list function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Add a new list
async function addList(req, res) {
    try {
        const newList = await List.create({
            owner: req.user.sub,
            name: req.body.name,
            public: req.body.public,
        });
        res.json(newList);
    } catch (error) {
        console.error('Error in addList function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update a list's details
async function updateList(req, res) {
    try {
        const listId = req.params.id;
        const updateData = req.body;
        const updatedList = await List.findByIdAndUpdate(listId, updateData, {
            new: true,
        });

        if (!updatedList) {
            return res.status(404).json({ message: 'List not found' });
        }
        res.json(updatedList);
    } catch (error) {
        console.error('Error in updateList function:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete a list
async function deleteList(req, res) {
    try {
        const listId = req.params.id;
        const list = await List.findByIdAndDelete(listId);

        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        res.json({ message: 'List deleted successfully' });
    } catch (error) {
        console.error('Error deleteList function:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
