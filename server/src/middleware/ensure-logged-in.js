module.exports = function (req, res, next) {
    // Status code of 401 is Unauthorised
    if (!req.user) return res.status(401).json('Unauthorized');
    // A okay
    next();
};
