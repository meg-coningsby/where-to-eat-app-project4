const List = require('../models/list');

module.exports = {
    index,
    show,
    addList,
    updateList,
    deleteList,
};

async function index(req, res) {
    try {
        const lists = await List.find({ owner: req.user.sub });
        res.json(lists);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function show(req, res) {
    try {
        const list = await List.findById(req.params.id);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }
        res.json(list);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function addList(req, res) {
    try {
        const newList = await List.create({
            owner: req.user.sub,
            name: req.body.name,
            public: req.body.public,
        });
        res.json(newList);
    } catch (error) {
        res.status(400).send(error);
    }
}

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
        res.status(400).send({ error: 'Could not update the list' });
    }
}

async function deleteList(req, res) {
    try {
        const listId = req.params.id;
        const list = await List.findByIdAndDelete(listId);

        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        res.json({ message: 'List deleted successfully' });
    } catch (error) {
        console.error('Error deleting list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
