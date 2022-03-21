// Usuario logueado
const user = require('../models/user');

function guestMiddleware(req, res, next) {

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = user.match('email', emailInCookie);

    if (userFromCookie){
    req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged) {
        return res.redirect("/")  // vuelve al index 
    }

    next();
}


module.exports = guestMiddleware;