module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}
module.exports.isAdmin = (req, res, next) => {
    if (!req.user.manager.verify) {
        return res.redirect('/');
    }
    next();
}