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
    } catch (error) {}
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

async function updateList() {
    try {
    } catch (error) {}
}

async function deleteList() {
    try {
    } catch (error) {}
}
