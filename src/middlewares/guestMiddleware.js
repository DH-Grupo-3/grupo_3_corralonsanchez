// Usuario logueado
const User = require('../models/user')

function guestMiddleware(req, res, next) {

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', emailInCookie);

    if (userFromCookie){
    req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged) {
        return res.redirect("/")  // vuelve al index 
    }

    next();
}


module.exports = guestMiddleware;