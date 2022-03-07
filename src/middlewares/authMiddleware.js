// Usuario no logueado

function authMiddleware(req, res, next) {
    if (!req.session.userLogged) {
        return res.redirect("/users/login")  // redirecciona al login
    }
    next();
}


module.exports = authMiddleware;