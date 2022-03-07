// Usuario logueado

function guestMiddleware(req, res, next) {
    if (req.session.userLogged) {
        return res.redirect("/")  // vuelve al index 
    }
    next();
}


module.exports = guestMiddleware;