const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    allButCurrentUser,
    create,
    login,
    checkToken,
};

async function allButCurrentUser(req, res) {
    try {
        const currentUser = req.user.sub;

        // Fetch all users excluding the current user
        const users = await User.find({ _id: { $ne: currentUser } }).select(
            'name'
        );
        res.json(users);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Create a new user
async function create(req, res) {
    const userData = req.body;
    try {
        const user = await User.create(userData);
        const token = createJWT(user);
        res.json(token);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: error,
        });
    }
}

// Login a user
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error(`User not found.`);
        if (!(await bcrypt.compare(password, user.password)))
            throw new Error(`Passwords don't match`);
        const token = createJWT(user);
        res.json(token);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: error,
        });
    }
}

// Check their token
function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    res.json(req.user.exp);
}

// Support function, createJWT
function createJWT(user) {
    return jwt.sign(
        {
            sub: user._id,
            name: user.name,
            email: user.email,
        },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}
